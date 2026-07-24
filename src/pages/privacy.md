---
title: 'Privacy Policy'
description: 'Read how 2FACode handles TOTP secrets, generated codes, theme preferences, hosting logs, cookies, and third-party services.'
layout: '~/layouts/PageLayout.astro'
---

# Privacy Policy

_Last updated: July 24, 2026_

## Summary

2FACode is designed so that TOTP secrets and generated codes do not leave the browser during normal use. The site does not require an account and does not include analytics or advertising scripts.

## 2FA secrets and generated codes

The 2FA code generator processes Base32 secrets and otpauth TOTP URIs in the current browser tab. It does not send that input to a generation API, server database, analytics provider, or advertising service.

The generator does not write secrets or generated codes to LocalStorage, SessionStorage, IndexedDB, cookies, URL parameters, or the browser history. Active data exists in page memory and is removed when the workspace is cleared, the page is reloaded, or the tab is closed.

## Theme preference

The light or dark theme preference may be stored in LocalStorage so the visual choice can persist between visits. That value is limited to the theme name and contains no 2FA secret, account label, or generated code.

## Hosting logs

Like most static websites, the hosting or network provider may process ordinary request information such as an IP address, timestamp, requested path, user agent, and security events to deliver and protect the site. The 2FA generator does not add a secret to those requests.

The production hosting provider has not yet been locked in. This policy will name the provider before public release if its role materially affects visitors.

## Third-party services

The production page does not load a TOTP library, font, analytics script, advertisement, or code-generation service from a third-party CDN at runtime. Build dependencies are bundled into the site's static assets.

Links to external standards and the [public source repository](https://github.com/wxin11011-ship-it/2FACode.im) are normal outbound links. Visiting them is subject to those sites' own policies.

## Cookies

2FACode does not set tracking cookies. The current implementation does not set an application cookie.

## Security limitations

Local processing cannot protect a secret from a compromised device, malicious browser extension, look-alike website, screen capture, clipboard monitor, or another person with access to the tab. Use a trusted device, verify `2facode.im`, and clear the workspace after use.

## Changes and contact

Material changes will be reflected on this page with a real updated date. Use [GitHub Issues](https://github.com/wxin11011-ship-it/2FACode.im/issues) for ordinary privacy questions and [GitHub Private Vulnerability Reporting](https://github.com/wxin11011-ship-it/2FACode.im/security/advisories/new) for sensitive security concerns. Never submit 2FA secrets, live codes, passwords, recovery codes, or session tokens.
