# Thurston Alpine Calendar Backend

Private backend for the Thurston Alpine booking calendar.

This package is the **GitHub/Cloud Run version** of the backend. Google OAuth authorization has already been completed separately on the administrator's local machine. No `.env` file, OAuth client secret, refresh token, or OAuth helper script is included in this package.

## What this does

The public GitHub Pages website calls this backend for:

- `GET /api/availability?date=YYYY-MM-DD`
- `POST /api/book`

The backend talks to the private **Thurston Alpine** Google Calendar.

The browser never receives:

- Google client secret
- Google refresh token
- Google access token

The backend:

1. Generates the fixed Thurston Alpine teaching slots.
2. Queries Google Calendar free/busy data.
3. Removes slots that overlap a calendar event.
4. Re-checks availability immediately before booking.
5. Creates the booking as a Google Calendar event.

## Fixed teaching slots

### 1 hour
- 09:00
- 09:30
- 10:00
- 10:30
- 11:00
- 13:00
- 13:30
- 14:00
- 14:30
- 15:00

### Half day
- 09:00–12:00
- 13:00–16:00

### Full day
- 09:00–15:00

## Timezone handling

All booking times use the IANA timezone `Europe/Zurich`.

The backend uses Luxon's timezone rules rather than a hard-coded UTC offset, so Swiss daylight saving time is handled automatically:

- winter: UTC+01:00
- summer: UTC+02:00

The customer-facing booking times therefore remain correct Swiss local time throughout the year.

## Security architecture

```text
Customer browser
      |
      | HTTPS
      v
GitHub Pages frontend
      |
      | HTTPS API call
      v
Google Cloud Run backend
      |
      | Secret Manager
      v
Secrets:
  GOOGLE_CLIENT_ID
  GOOGLE_CLIENT_SECRET
  GOOGLE_REFRESH_TOKEN
  GOOGLE_CALENDAR_ID
      |
      | OAuth 2.0
      v
Google Calendar API
      |
      v
Thurston Alpine calendar
```

## Secrets and GitHub

**Never commit secrets to GitHub.**

This repository/package intentionally contains:

- no `.env` file
- no `.env.example` containing credential fields
- no OAuth JSON files
- no client secret
- no refresh token
- no access token
- no OAuth authorization helper

`.gitignore` also blocks `.env`, credential files, token files, and common secret directories.

For production, store the Google credentials in **Google Secret Manager** and inject them into Cloud Run.

The non-secret Google Calendar ID may be supplied as normal Cloud Run configuration.

## Cloud Run configuration

Set these environment variables/secrets in Cloud Run:

```text
PORT=8080
FRONTEND_ORIGIN=https://richardowens-thurs.github.io
GOOGLE_CALENDAR_ID=<Thurston Alpine calendar ID>
TIME_ZONE=Europe/Zurich
GOOGLE_CLIENT_ID=<from Secret Manager>
GOOGLE_CLIENT_SECRET=<from Secret Manager>
GOOGLE_REFRESH_TOKEN=<from Secret Manager>
```

The `GOOGLE_REDIRECT_URI` variable is no longer required by this deployment package because the one-time OAuth authorization helper has been removed after authorization was completed.

## Local development

A local `.env` may still be used on the administrator's machine if desired, but it must remain outside GitHub. The existing local setup can continue using:

```bash
node --env-file=.env server.js
```

Do **not** copy the local `.env` into the repository.

## API

Health check:

```text
GET /health
```

Availability:

```text
GET /api/availability?date=YYYY-MM-DD
```

Booking:

```text
POST /api/book
```

Example request body:

```json
{
  "date": "2027-01-15",
  "slotId": "1h-0900",
  "name": "Example Customer",
  "email": "customer@example.com",
  "phone": "+41 79 123 45 67",
  "notes": "Beginner"
}
```

## Current production hardening still to do

Before accepting real customer bookings, we should still add:

- booking rate limiting / abuse protection
- a honeypot or CAPTCHA
- email confirmation
- duplicate/idempotency protection
- proper frontend error handling
- logging/monitoring without exposing customer secrets
- a clear privacy policy
- final booking confirmation flow

These are separate from the Google Calendar integration, which has now been tested successfully locally.
