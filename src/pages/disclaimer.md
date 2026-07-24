---
title: 'Disclaimer'
description: 'Understand what 2FACode can and cannot do, its browser-only security boundary, TOTP compatibility limits, and non-affiliation.'
layout: '~/layouts/PageLayout.astro'
---

# Disclaimer

_Last updated: July 24, 2026_

## Not an account recovery service

2FACode generates a TOTP only when the user already has the correct shared secret. It cannot discover a lost secret, receive an SMS code, bypass two-factor authentication, or unlock an account.

If you have lost access to an authenticator, use the account provider's backup codes, recovery process, or official support channel.

## Security boundary

Browser-only processing means the normal generation workflow does not upload a secret to a 2FACode API. It does not mean every browser, device, extension, network, future build, or copied version of the site is safe.

High-value, long-lived secrets are usually better stored in a trusted authenticator, hardware-backed solution, or encrypted vault. Use this tool for a deliberate temporary workflow and clear the tab when finished.

## Compatibility

The generator targets TOTP as described by RFC 6238 and supports the common Base32 setup format plus selected parameters from an otpauth TOTP URI. A provider can use a different 2FA method, custom settings, or recovery policy, so compatibility is not guaranteed for every login system.

## No affiliation

2FACode is not affiliated with, endorsed by, or sponsored by Google, Microsoft, GitHub, Facebook, Discord, Amazon, Authy, or any other service mentioned for compatibility context.

## No professional advice

Information on this site is general technical information, not legal, compliance, or professional security advice for a particular organization.
