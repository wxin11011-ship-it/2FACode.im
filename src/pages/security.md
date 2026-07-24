---
title: 'Security Model'
description: 'Review the 2FACode browser-only TOTP security model, secret lifecycle, supported inputs, tests, reduced threats, and limits.'
layout: '~/layouts/PageLayout.astro'
---

# 2FACode Security Model

_What the browser-only claim covers—and what it does not_

## Architecture

2FACode is built as a static website. The generator runs in the browser and does not call a server endpoint to calculate a TOTP code.

The implementation uses `otplib` with its Web Crypto, Noble, and Base32 plugins. Modern browsers use Web Crypto; environments without `crypto.subtle` use the bundled Noble implementation as a local compatibility fallback. Those packages are included during the site build rather than loaded from a third-party CDN at runtime.

The generated deployment artifact also includes a hash-based Content Security Policy. Its script and style hashes are calculated from the final static HTML, `connect-src` is set to `none`, framing is denied, and the policy does not use `unsafe-inline`. This is a defense-in-depth control; the hosting platform must serve the generated `_headers` rules for the response header to take effect.

## Secret lifecycle

When a user submits the generator form:

1. The browser parses each non-empty line.
2. A normalized Base32 secret and supported TOTP parameters are held in page memory.
3. A browser-local cryptography backend calculates the current HMAC-based token.
4. The result is rendered with DOM text nodes, and the displayed secret is masked.
5. Clear, reload, or closing the tab removes the in-memory workspace.

The generator does not write authentication data to LocalStorage, SessionStorage, IndexedDB, cookies, URLs, console logs, analytics, or a 2FACode database.

## Standards and tests

TOTP behavior follows [RFC 6238](https://www.rfc-editor.org/info/rfc6238/). Automated tests include the RFC SHA-1 vector for timestamp 59 seconds, where the expected eight-digit token is `94287082`.

The input parser also tests labeled Base32 values, otpauth parameters, line-scoped error redaction, the 50-entry cap, and time-window countdown behavior.

## Supported inputs

- Base32 secret using the common SHA-1, six-digit, 30-second defaults
- `Label | BASE32SECRET`
- `otpauth://totp` URI using SHA-1, SHA-256, or SHA-512; six, seven, or eight digits; and a reasonable 15–120 second period

HOTP counter values, SMS codes, push approvals, FIDO2, U2F, passkeys, and provider-specific recovery flows are outside this tool's scope.

## Threats this design reduces

- Accidental server-side collection of a TOTP secret during generation
- Secret retention in application databases or browser storage
- Third-party analytics and advertising scripts reading the generator page
- Accidental disclosure through shareable secret URLs
- Copying a secret when the user only intended to copy a generated code

## Threats this design does not eliminate

- A compromised operating system or browser
- Malicious or over-permissioned browser extensions
- Clipboard monitoring, screen recording, or physical observation
- A phishing domain or modified copy of the project
- A future supply-chain compromise or malicious deployment
- User error, clock drift, provider configuration changes, or lost recovery data

For high-value accounts, use a dedicated, trusted authenticator or hardware-backed system and keep tested recovery codes offline. Browser-only generation is a useful property, not a substitute for endpoint security.

## Verification

Inspect the [public source repository](https://github.com/wxin11011-ship-it/2FACode.im), including the TOTP implementation, tests, dependency lockfile, CSP generation script, and CI workflow. The README documents the exact local install, test, and build commands.

Anyone can still inspect the browser Network panel during generation: there should be no code-generation request. Reloading the page should also remove the workspace.

## Reporting a security issue

Report suspected vulnerabilities privately through [GitHub Private Vulnerability Reporting](https://github.com/wxin11011-ship-it/2FACode.im/security/advisories/new). Never include a real TOTP secret, live code, password, backup code, or session token in a report. Use test-only credentials when reproduction data is necessary.
