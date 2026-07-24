---
title: 'About 2FACode'
description: 'Learn why 2FACode exists, how browser-only TOTP generation works, and where its privacy and security boundaries are.'
layout: '~/layouts/PageLayout.astro'
---

# About 2FACode

_A small, privacy-first TOTP utility_

## Why this project exists

Many online 2FA tools make a sensitive task harder to trust. Some surround the input with unrelated advertising, some ask users to save secrets by default, and some never explain whether a key is sent to a server.

2FACode exists to make the temporary browser workflow calm and explicit: paste one secret or a batch, generate the current codes locally, copy what you need, and clear the workspace.

## What the tool does

- Generates standards-based TOTP codes from Base32 secrets
- Reads supported settings from `otpauth://totp` URIs
- Handles up to 50 labeled entries in one temporary batch
- Refreshes codes and countdowns in the browser
- Stores no 2FA secrets or generated codes

It does not receive SMS messages, recover lost keys, bypass two-factor authentication, or provide an account-sharing service.

## How it works

The site is built as static files. TOTP generation uses the open-source `otplib` library with Web Crypto when available and an audited Noble implementation as a local compatibility fallback. The behavior follows RFC 6238, and automated tests include an official RFC test vector.

There is no generation API. Authentication data remains in the current tab's memory until the user clears, reloads, or closes it. Optional page analytics may measure traffic; they do not calculate codes and are not a secret database.

## Our product principles

### Privacy should be inspectable

Specific behavior—no generation request and no secret storage—is more useful than a vague “secure” badge.

### The common path should stay simple

The generator presents the normal six-digit, 30-second TOTP workflow first. Extra settings travel through a standard otpauth URI instead of filling the interface with controls most people do not need.

### Security claims need boundaries

Browser-only processing removes server-upload risk, but it cannot protect a secret from a compromised device, malicious extension, look-alike domain, or altered future build. Long-lived secrets usually belong in a trusted authenticator, hardware-backed solution, or encrypted vault.

## Project status

The [2FACode source repository](https://github.com/wxin11011-ship-it/2FACode.im) is public so users can inspect the browser-only implementation, dependencies, tests, and build process. The code is source-available under the [PolyForm Noncommercial License 1.0.0](https://github.com/wxin11011-ship-it/2FACode.im/blob/main/LICENSE): learning, research, and other noncommercial uses are permitted, but commercial use is not granted.
