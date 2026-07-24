# Contributing to 2FACode

2FACode is a small, privacy-sensitive TOTP utility. Keep changes narrow, reviewable, and consistent with the browser-only architecture.

By submitting a contribution, you agree that it may be distributed under the project's [PolyForm Noncommercial License 1.0.0](LICENSE). The published source is available for noncommercial use; commercial use is not granted.

## Local setup

Use Node.js 22.12 or newer and the pnpm version declared in `package.json`.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Required checks

Run these commands before opening a pull request:

```bash
pnpm check
pnpm test
pnpm build
```

The build must finish its CSP postbuild step. Do not commit a deployment artifact that falls back to `unsafe-inline`.

## Security and privacy invariants

- Never add a generation API, analytics, telemetry, advertising script, or runtime third-party CDN without an explicit project decision.
- Never persist a TOTP secret or generated code in LocalStorage, SessionStorage, IndexedDB, cookies, URLs, logs, or analytics.
- Never include a real secret, password, recovery code, session token, or live TOTP in source, tests, issues, screenshots, or pull requests.
- Keep `connect-src 'none'` unless a reviewed product requirement changes the architecture.
- Render user-controlled labels and errors with DOM text APIs, not raw HTML.
- Preserve explicit input limits and error redaction.

## Behavior changes

Add or update tests when parsing, cryptography selection, supported otpauth parameters, limits, or error behavior changes. RFC 6238 vectors must continue to pass for SHA-1, SHA-256, and SHA-512.

For interface work, keep the primary task in the first viewport, preserve keyboard and screen-reader semantics, support reduced motion, and avoid decorative motion that delays input.

## Content and SEO

Do not invent rankings, traffic, reviews, security audits, partners, or affiliations. New indexable pages require evidence of a distinct search intent; do not create thin pages for spelling or platform variants.
