Thurston Alpine frontend — v1.2.7 (five-day calendar integration draft)

This package contains the website frontend, including the current pricing table, booking UI, shared lesson selection, translations, privacy page and assets.

Changes in v1.2.7:
- The five-day package uses the availability calendar instead of an email-only enquiry.
- Start dates are enabled only when the backend reports the complete five-day range available for the selected lesson preference and group size.
- The package reserves 09:00 on the selected date through 15:00 four calendar days later, in Swiss local time.
- Booking summary and hidden enquiry details show the full date range.
- Calendar cache is invalidated across all five days after creating/releasing a hold or submitting a booking.
- Shared lesson selection remains available for groups of 1–3; it is disabled at 4 riders.

The matching backend release is required. This package has passed JavaScript syntax and ZIP integrity checks, but still requires functional testing against Google Calendar before production deployment.
