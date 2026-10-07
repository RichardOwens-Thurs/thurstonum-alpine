import express from "express";
import helmet from "helmet";
import { google } from "googleapis";
import { DateTime } from "luxon";

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json({ limit: "32kb" }));

const PORT = Number(process.env.PORT || 8080);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5500";
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const TIME_ZONE = process.env.TIME_ZONE || "Europe/Zurich";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;


const ALLOWED_ORIGINS = new Set([
  FRONTEND_ORIGIN,
  "http://localhost:5500",
  "http://127.0.0.1:5500"
]);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

function requireConfig() {
  const missing = [];
  for (const [name, value] of Object.entries({
    GOOGLE_CLIENT_ID: CLIENT_ID,
    GOOGLE_CLIENT_SECRET: CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: REFRESH_TOKEN,
    GOOGLE_CALENDAR_ID: CALENDAR_ID
  })) {
    if (!value) missing.push(name);
  }
  if (missing.length) {
    const error = new Error(`Missing backend configuration: ${missing.join(", ")}`);
    error.statusCode = 503;
    throw error;
  }
}

function getOAuthClient() {
  requireConfig();
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET
  );
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  return oauth2Client;
}

function getCalendar() {
  return google.calendar({
    version: "v3",
    auth: getOAuthClient()
  });
}

function isValidDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function parseDateParts(date) {
  if (!isValidDate(date)) throw badRequest("date must be YYYY-MM-DD");
  const [year, month, day] = date.split("-").map(Number);
  const check = new Date(Date.UTC(year, month - 1, day));
  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day
  ) {
    throw badRequest("date is not a real calendar date");
  }
  return { year, month, day };
}

function badRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function dateTime(date, hour, minute) {
  // Build the timestamp in the configured IANA timezone so Swiss DST is
  // handled automatically: Europe/Zurich is UTC+01 in winter and UTC+02
  // in summer.
  const [year, month, day] = date.split("-").map(Number);
  return DateTime.fromObject(
    { year, month, day, hour, minute, second: 0 },
    { zone: TIME_ZONE }
  ).toISO({ suppressMilliseconds: true });
}


/*
 * The site currently uses fixed Swiss teaching hours:
 * 09:00–16:00.
 *
 * Products:
 * 1h:
 *   09:00, 09:30, 10:00, 10:30, 11:00
 *   13:00, 13:30, 14:00, 14:30, 15:00
 * Half day:
 *   09:00–12:00
 *   13:00–16:00
 * Full day:
 *   09:00–15:00
 *
 * Times are generated with Luxon in Europe/Zurich so Swiss DST (+01/+02)
 * is handled correctly.
 */
const SLOT_DEFINITIONS = [
  ...[
    [9, 0], [9, 30], [10, 0], [10, 30], [11, 0],
    [13, 0], [13, 30], [14, 0], [14, 30], [15, 0]
  ].map(([hour, minute]) => ({
    id: `1h-${String(hour).padStart(2, "0")}${String(minute).padStart(2, "0")}`,
    type: "1h",
    label: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    startHour: hour,
    startMinute: minute,
    endHour: minute === 0 ? hour + 1 : hour + 1,
    endMinute: minute
  })),
  {
    id: "half-am",
    type: "half-day",
    label: "09:00–12:00",
    startHour: 9,
    startMinute: 0,
    endHour: 12,
    endMinute: 0
  },
  {
    id: "half-pm",
    type: "half-day",
    label: "13:00–16:00",
    startHour: 13,
    startMinute: 0,
    endHour: 16,
    endMinute: 0
  },
  {
    id: "full-day",
    type: "full-day",
    label: "09:00–15:00",
    startHour: 9,
    startMinute: 0,
    endHour: 15,
    endMinute: 0
  }
];

function slotsForDate(date) {
  parseDateParts(date);
  return SLOT_DEFINITIONS.map(slot => ({
    ...slot,
    start: dateTime(date, slot.startHour, slot.startMinute),
    end: dateTime(date, slot.endHour, slot.endMinute)
  }));
}

function overlaps(aStart, aEnd, bStart, bEnd) {
  return new Date(aStart).getTime() < new Date(bEnd).getTime() &&
         new Date(aEnd).getTime() > new Date(bStart).getTime();
}

async function getBusyPeriods(date) {
  const slots = slotsForDate(date);
  const dayStart = dateTime(date, 9, 0);
  const dayEnd = dateTime(date, 16, 0);

  const calendar = getCalendar();
  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: dayStart,
      timeMax: dayEnd,
      timeZone: TIME_ZONE,
      items: [{ id: CALENDAR_ID }]
    }
  });

  return response.data.calendars?.[CALENDAR_ID]?.busy || [];
}

async function getAvailableSlots(date) {
  const slots = slotsForDate(date);
  const busy = await getBusyPeriods(date);

  return slots
    .filter(slot => !busy.some(period =>
      overlaps(slot.start, slot.end, period.start, period.end)
    ))
    .map(slot => ({
      id: slot.id,
      type: slot.type,
      label: slot.label,
      start: slot.start,
      end: slot.end
    }));
}

function validateBooking(body) {
  const { date, slotId, name, email, phone, notes } = body || {};

  if (!date || !slotId || !name || !email) {
    throw badRequest("date, slotId, name and email are required");
  }
  parseDateParts(date);

  if (typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
    throw badRequest("name is invalid");
  }

  if (
    typeof email !== "string" ||
    email.length > 200 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    throw badRequest("email is invalid");
  }

  if (phone && (typeof phone !== "string" || phone.length > 40)) {
    throw badRequest("phone is invalid");
  }

  if (notes && (typeof notes !== "string" || notes.length > 2000)) {
    throw badRequest("notes are too long");
  }

  const slot = slotsForDate(date).find(item => item.id === slotId);
  if (!slot) throw badRequest("slotId is not a valid Thurston Alpine slot");

  return {
    slot,
    name: name.trim(),
    email: email.trim(),
    phone: phone?.trim() || "",
    notes: notes?.trim() || ""
  };
}

async function createBooking({ slot, name, email, phone, notes }) {
  const calendar = getCalendar();

  // Final availability check immediately before insertion.
  const busy = await getBusyPeriods(slot.start.slice(0, 10));
  const conflict = busy.some(period =>
    overlaps(slot.start, slot.end, period.start, period.end)
  );

  if (conflict) {
    const error = new Error("That time has just been booked or blocked.");
    error.statusCode = 409;
    throw error;
  }

  const description = [
    "Thurston Alpine private snowboard lesson",
    `Customer: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "",
    notes ? `Notes: ${notes}` : ""
  ].filter(Boolean).join("\n");

  const event = await calendar.events.insert({
    calendarId: CALENDAR_ID,
    requestBody: {
      summary: `Thurston Alpine – Private Lesson – ${name}`,
      description,
      start: {
        dateTime: slot.start,
        timeZone: TIME_ZONE
      },
      end: {
        dateTime: slot.end,
        timeZone: TIME_ZONE
      },
      extendedProperties: {
        private: {
          source: "thurston-alpine-website",
          customerEmail: email
        }
      }
    }
  });

  return {
    id: event.data.id,
    htmlLink: event.data.htmlLink
  };
}

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "thurston-alpine-calendar-backend" });
});

app.get("/api/availability", async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date || typeof date !== "string") {
      throw badRequest("date is required");
    }

    const slots = await getAvailableSlots(date);

    res.json({
      date,
      timeZone: TIME_ZONE,
      slots
    });
  } catch (error) {
    next(error);
  }
});

app.post("/api/book", async (req, res, next) => {
  try {
    const booking = validateBooking(req.body);
    const created = await createBooking(booking);

    res.status(201).json({
      ok: true,
      booking: {
        id: created.id,
        date: booking.slot.start.slice(0, 10),
        start: booking.slot.start,
        end: booking.slot.end,
        type: booking.slot.type,
        label: booking.slot.label
      }
    });
  } catch (error) {
    next(error);
  }
});


app.use((error, req, res, next) => {
  console.error(error.message);
  const status = error.statusCode || 500;
  res.status(status).json({
    error: status >= 500 ? "Internal server error" : error.message
  });
});

app.listen(PORT, () => {
  console.log(`Thurston Alpine backend listening on port ${PORT}`);
});
