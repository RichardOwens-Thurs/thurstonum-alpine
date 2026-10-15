THURSTON ALPINE — RECONCILED FILES

This package combines the latest frontend from FrontEnd Branch.zip with the latest standalone backend from Thurston Alpine Backend Backend.zip.
The older booking implementation in thurstonum-alpine-git.zip was not used to overwrite the newer booking flow.

Important:
- Keep the backend .env file local and private. It is intentionally NOT included.
- Do not upload credentials, Google OAuth tokens, or SMTP app passwords to GitHub.
- The frontend currently points to the temporary Cloudflare Quick Tunnel:
  https://quilt-partial-powell-orientation.trycloudflare.com
  This URL only works while that tunnel is running and can change when a new tunnel is started.
- The frontend repo contains a Backend folder for continuity, but GitHub Pages will only serve the static frontend; it does not run the Node backend.
- Backend code is updated to include express-rate-limit and the latest booking/calendar logic.
- No Google Calendar events were read or modified by this file reconciliation.

Checks performed:
- Node syntax checks passed for script.js and Backend/server.js.
- Compared frontend files between the Branch and Git-connected ZIPs; the Git-connected script.js was older and did not contain the current hold-based booking flow.
