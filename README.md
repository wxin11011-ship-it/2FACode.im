# 2FACode.im

[2facode.im](https://2facode.im) is a static, browser-only 2FA / TOTP code generator. It supports a single Base32 secret, labeled bulk input, and standard `otpauth://totp` URIs. By default it does not save any secret or generated code.

- Website: <https://2facode.im>
- Source: <https://github.com/wxin11011-ship-it/2FACode.im>

## Features

- Process 1–50 TOTP entries at once
- Accepts `BASE32SECRET`, `Label | BASE32SECRET`, and `otpauth://totp/...`
- Supports SHA-1 / SHA-256 / SHA-512, 6–8 digits, and 15–120 second periods
- Auto-refreshes codes and countdowns
- Copy one code, copy all, or clear the workspace
- No generation API, analytics, ad scripts, or secret storage
- Web Crypto first, with a Noble pure-JS crypto fallback
- RFC 6238 test vectors and input-boundary tests

## Stack

- Astro 7 + Tailwind CSS 3
- `otplib` 13
- `@otplib/plugin-crypto-web`
- `@otplib/plugin-crypto-noble`
- `@otplib/plugin-base32-scure`
- Node’s built-in test runner

Third-party packages are bundled into the static build. They are not loaded from a runtime CDN.

## Local development

Requires Node.js 22.12+ and the pnpm version pinned in `package.json`.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

The default local URL is `http://localhost:4321`.

## Verification

```bash
pnpm test
pnpm check
pnpm build
```

After the static build, `postbuild` hashes every inline script and style from the final HTML and writes a Content Security Policy without `unsafe-inline` into `dist/_headers`. If the output includes inline event handlers or `style=` attributes, the build fails instead of silently loosening CSP.

## Input formats

One entry per line, up to 50 lines:

```text
GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ
Work | GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ
otpauth://totp/Example:account?secret=...
```

To meet the minimum secret strength from RFC 4226 / 6238, a Base32 secret must decode to at least 128 bits (typically at least 26 unpadded Base32 characters).

## Privacy and security boundaries

Normal generation does not send secrets to a server and does not write them to LocalStorage, SessionStorage, IndexedDB, cookies, URLs, or the console. The theme preference may be stored separately in LocalStorage and never contains authentication data.

Browser-only computation is not absolute safety. A compromised device, malicious extension, look-alike domain, screen/clipboard monitoring, or a tampered future build can still read what you type. Keep long-lived secrets for high-value accounts in a trusted authenticator, hardware solution, or encrypted vault.

See [`src/pages/security.md`](src/pages/security.md) and [`src/pages/privacy.md`](src/pages/privacy.md) for details.

## License

The source is published for security review, learning, research, and other noncommercial use under the [PolyForm Noncommercial License 1.0.0](LICENSE). Commercial use is not granted. This project is therefore **source-available**, not Open Source as defined by the OSI.

## Repository map

```text
src/components/TwoFactorTool.astro  # Tool UI and browser interaction
src/scripts/totp.mjs                # Input parsing, crypto backend, TOTP generation
test/totp.test.mjs                  # RFC and input-boundary tests
src/pages/index.astro               # Homepage, FAQ, schema
docs/research/                      # SERP, keywords, and page planning notes
public/_headers                     # Baseline security response headers
scripts/generate-csp-headers.mjs    # Final HTML hash CSP generation
vercel.json                         # Vercel baseline headers (no loose CSP)
```

## Before you ship

- Confirm HTTPS, apex/www redirects, and HSTS on the host
- Keep a hash-based CSP on the final artifact; do not fall back to `unsafe-inline`
- After Google Search Console is connected, use impressions to prioritize new pages

The site does not publish guessed emails, ratings, user counts, or security-audit badges. Use [GitHub Issues](https://github.com/wxin11011-ship-it/2FACode.im/issues) for ordinary feedback and [GitHub Private Vulnerability Reporting](https://github.com/wxin11011-ship-it/2FACode.im/security/advisories/new) for sensitive security reports. Never submit real authentication material.

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a change. CI runs lint/type checks, tests, the static build, the CSP postbuild step, and dependency audits.
