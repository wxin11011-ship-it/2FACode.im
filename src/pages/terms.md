---
title: 'Terms of Service'
description: 'Read the terms for using 2FACode, including authorized use, user responsibilities, service limits, warranties, and liability.'
layout: '~/layouts/PageLayout.astro'
---

# Terms of Service

_Last updated: July 24, 2026_

## Service

2FACode is a free browser-based utility that generates time-based one-time passwords from secrets supplied by the user. It supports standard TOTP inputs and temporary batches of up to 50 entries.

The service does not provide SMS codes, account recovery, secret-key recovery, login bypasses, or access to any third-party account.

## Acceptable use

Use 2FACode only with secrets and accounts that you own or are authorized to administer. Do not use the site to attempt unauthorized access, distribute stolen authentication material, impersonate another person, or interfere with the service.

## Your responsibility

A TOTP secret can generate future valid codes and should be protected like a password. You are responsible for:

- Verifying that you are on the intended `2facode.im` domain
- Using a trusted browser and device
- Keeping secrets away from screen capture, clipboard monitors, and untrusted extensions
- Clearing the workspace after a temporary task
- Maintaining provider recovery codes and an appropriate long-term authenticator

## Accuracy and availability

The implementation is tested against RFC 6238 behavior, but the service is provided “as is” and may contain errors or become unavailable. A generated code can be rejected because of clock drift, a wrong secret, unsupported provider settings, account changes, or service-specific rules outside 2FACode's control.

## No warranty

To the extent permitted by law, 2FACode makes no warranty that the service will be uninterrupted, error-free, compatible with every provider, or suitable as the sole storage or recovery method for authentication credentials.

## Limitation of liability

To the extent permitted by law, the project and its operators are not liable for indirect, incidental, special, consequential, or punitive damages arising from use of or inability to use the service, including loss of account access or data.

## Third-party names

Names such as Google, Microsoft, GitHub, Facebook, Discord, Amazon, Authy, and other services may appear only to explain standards compatibility. 2FACode is independent and is not affiliated with, endorsed by, or sponsored by those companies.

## Source code license

These service terms govern use of the hosted website. The published source code is separately licensed under the [PolyForm Noncommercial License 1.0.0](https://github.com/wxin11011-ship-it/2FACode.im/blob/main/LICENSE), which permits noncommercial purposes but does not grant commercial use.

## Changes

Terms may change when the product, hosting arrangement, or legal requirements change. Material revisions will receive a real updated date rather than an automatic date bump.
