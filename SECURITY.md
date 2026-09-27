# BlueFort Cyber Solutions — Security Deployment Notes

This site is a static frontend. The source has been hardened with:
- Content Security Policy (CSP)
- `object-src 'none'`
- `base-uri 'self'`
- `form-action 'self'`
- `frame-ancestors 'none'`
- `upgrade-insecure-requests`
- strict referrer policy
- restrictive Permissions Policy
- `rel="noopener noreferrer"` on external WhatsApp links
- input sanitization / output encoding in the client-side inquiry flow

Important: GitHub Pages does not provide arbitrary custom HTTP response headers for a static site. Therefore server-only headers such as HSTS, `X-Content-Type-Options`, and HTTP-level `X-Frame-Options` must be configured at the hosting/CDN layer if the site is moved behind a platform that supports them.

No public website can be guaranteed to be impossible to hack. Security should be maintained through secure code, dependency updates, access controls, hosting/CDN configuration, monitoring, backups, and regular authorized security testing.
