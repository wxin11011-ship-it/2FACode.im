---
title: 'Privacy Policy'
description: 'Read how 2FACode.im handles TOTP secrets, generated codes, theme preferences, hosting logs, cookies, and analytics.'
layout: '~/layouts/PageLayout.astro'
---

# Privacy Policy

_Last updated: July 28, 2026_

## Summary

2FACode.im is designed so that **TOTP secrets and generated codes do not leave the browser during normal generation**. The site does not require an account and does not run advertising scripts. Sensitive generator and verifier pages do not load PageView or Microsoft Clarity; lightweight analytics may run only on non-tool content and directory pages.

## 2FA secrets and generated codes

The 2FA code generator processes Base32 secrets and otpauth TOTP URIs in the current browser tab. It does not send that input to a generation API, server database, or advertising service. Sensitive tool routes do not load third-party analytics scripts.

The generator does not write secrets or generated codes to LocalStorage, SessionStorage, IndexedDB, cookies, URL parameters, or the browser history. Active data exists in page memory and is removed when the workspace is cleared, the page is reloaded, or the tab is closed.

## Theme preference

The light or dark theme preference may be stored in LocalStorage so the visual choice can persist between visits. That value is limited to the theme name and contains no 2FA secret, account label, or generated code.

## Hosting logs

Like most static websites, the hosting or network provider may process ordinary request information such as an IP address, timestamp, requested path, user agent, and security events to deliver and protect the site. The 2FA generator does not add a secret to those requests.

## Analytics

Non-tool content and directory pages may load:

- **PageView** (`app.pageview.app`) for privacy-oriented page analytics (domain-scoped pageviews).
- **Microsoft Clarity** for delayed, aggregated session insights such as heatmaps and interaction patterns.

These scripts are for product and traffic measurement and are excluded from pages that accept or generate TOTP secrets. They are not a TOTP generation backend. Do not paste secrets into feedback or support channels; keep secrets in the generator workspace only.

## Third-party services

Build dependencies for TOTP generation are bundled into the site's static assets rather than loaded from a third-party CDN at runtime for cryptography. Feedback submissions (when you choose to send feedback) go to the project's Feedback Hub endpoint.

Links to external standards and the [public source repository](https://github.com/wxin11011-ship-it/2FACode.im) are normal outbound links. Visiting them is subject to those sites' own policies.

## Cookies

2FACode.im does not set its own application tracking cookies for generation. On non-tool pages where analytics are enabled, third-party analytics providers may set or use their own storage according to their policies (especially Clarity).

## Security limitations

Local generation cannot protect a secret from a compromised device, malicious browser extension, look-alike website, screen capture, clipboard monitor, or another person with access to the tab. Use a trusted device, verify `2facode.im`, and clear the workspace after use.

## Changes and contact

Material changes will be reflected on this page with a real updated date. Use [GitHub Issues](https://github.com/wxin11011-ship-it/2FACode.im/issues) for ordinary privacy questions and [GitHub Private Vulnerability Reporting](https://github.com/wxin11011-ship-it/2FACode.im/security/advisories/new) for sensitive security concerns. Never submit 2FA secrets, live codes, passwords, recovery codes, or session tokens.
