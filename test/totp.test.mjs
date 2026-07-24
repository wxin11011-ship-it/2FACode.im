import assert from 'node:assert/strict';
import test from 'node:test';

import { base32 } from '@otplib/plugin-base32-scure';

import {
  MAX_ENTRIES,
  MAX_INPUT_LENGTH,
  MAX_LABEL_LENGTH,
  MAX_LINE_LENGTH,
  TotpInputError,
  generateTotp,
  getCryptoPlugin,
  getSecondsRemaining,
  maskSecret,
  parseInput,
  parseLine,
} from '../src/scripts/totp.mjs';

const textEncoder = new TextEncoder();
const encodeSecret = (value) => base32.encode(textEncoder.encode(value)).replace(/=+$/g, '');
const RFC_SHA1_SECRET = encodeSecret('12345678901234567890');
const RFC_SHA256_SECRET = encodeSecret('12345678901234567890123456789012');
const RFC_SHA512_SECRET = encodeSecret('1234567890123456789012345678901234567890123456789012345678901234');

test('matches the RFC 6238 SHA-1 test vector at 59 seconds', async () => {
  const entry = {
    secret: RFC_SHA1_SECRET,
    algorithm: 'sha1',
    digits: 8,
    period: 30,
  };

  assert.equal(await generateTotp(entry, 59), '94287082');
});

test('matches the RFC vector with the Noble compatibility backend', async () => {
  const entry = {
    secret: RFC_SHA1_SECRET,
    algorithm: 'sha1',
    digits: 8,
    period: 30,
  };

  assert.equal(getCryptoPlugin(false).name, 'noble');
  assert.equal(await generateTotp(entry, 59, getCryptoPlugin(false)), '94287082');
});

test('matches the RFC 6238 SHA-256 test vector through an otpauth URI', async () => {
  const entry = parseLine(
    `otpauth://totp/Acme%3Aalice?secret=${RFC_SHA256_SECRET}&issuer=Acme&algorithm=SHA256&digits=8&period=30`,
    1
  );

  assert.equal(await generateTotp(entry, 59, getCryptoPlugin(false)), '46119246');
});

test('matches the RFC 6238 SHA-512 test vector through an otpauth URI', async () => {
  const entry = parseLine(
    `otpauth://totp/Acme%3Aalice?secret=${RFC_SHA512_SECRET}&issuer=Acme&algorithm=SHA512&digits=8&period=30`,
    1
  );

  assert.equal(await generateTotp(entry, 59, getCryptoPlugin(false)), '90693936');
});

test('parses a labeled Base32 secret without persisting the original line', () => {
  const entry = parseLine(`Work account | ${RFC_SHA1_SECRET}`, 2);

  assert.deepEqual(entry, {
    id: 'entry-2',
    lineNumber: 2,
    label: 'Work account',
    secret: RFC_SHA1_SECRET,
    algorithm: 'sha1',
    digits: 6,
    period: 30,
  });
  assert.equal(maskSecret(entry.secret), '•••• QOJQ');
});

test('reads standard parameters from an otpauth TOTP URI', () => {
  const entry = parseLine(
    `otpauth://totp/Acme%3Aalice%40example.com?secret=${RFC_SHA256_SECRET}&issuer=Acme&algorithm=SHA256&digits=8&period=60`,
    1
  );

  assert.equal(entry.label, 'Acme:alice@example.com');
  assert.equal(entry.algorithm, 'sha256');
  assert.equal(entry.digits, 8);
  assert.equal(entry.period, 60);
});

test('returns line-scoped errors without echoing invalid input', () => {
  const result = parseInput(`Valid | ${RFC_SHA1_SECRET}\nnot a secret!`);

  assert.equal(result.entries.length, 1);
  assert.deepEqual(result.errors, [{ lineNumber: 2, message: 'This line is not a valid Base32 secret.' }]);
  assert.doesNotMatch(result.errors[0].message, /not a secret/i);
});

test('limits a batch to the documented maximum', () => {
  const input = Array.from({ length: MAX_ENTRIES + 1 }, () => RFC_SHA1_SECRET).join('\n');

  assert.throws(() => parseInput(input), TotpInputError);
});

test('accepts exactly 50 valid entries in a batch', () => {
  const input = Array.from({ length: MAX_ENTRIES }, (_, index) => `Account ${index + 1} | ${RFC_SHA1_SECRET}`).join(
    '\n'
  );

  const result = parseInput(input);
  assert.equal(result.entries.length, MAX_ENTRIES);
  assert.equal(result.errors.length, 0);
});

test('rejects a secret shorter than the RFC minimum before generation', () => {
  assert.throws(() => parseLine('JBSWY3DPEHPK3PXP', 1), /at least 26 Base32 characters \(128 bits\)/);
});

test('rejects secrets above the otplib maximum', () => {
  assert.throws(() => parseLine(encodeSecret('A'.repeat(65)), 1), /must not exceed 64 bytes/);
});

test('rejects oversized labels and lines without echoing them', () => {
  const longLabel = 'L'.repeat(MAX_LABEL_LENGTH + 1);
  const longLine = 'S'.repeat(MAX_LINE_LENGTH + 1);

  assert.throws(() => parseLine(`${longLabel} | ${RFC_SHA1_SECRET}`, 1), /Labels must not exceed 80 characters/);
  assert.throws(() => parseLine(longLine, 1), /Each line must not exceed 2,048 characters/);
});

test('rejects oversized batches before splitting them', () => {
  assert.throws(() => parseInput('A'.repeat(MAX_INPUT_LENGTH + 1)), /This batch is too large/);
});

test('rejects HOTP and malformed encoded labels', () => {
  assert.throws(
    () => parseLine(`otpauth://hotp/Test?secret=${RFC_SHA1_SECRET}&counter=1`, 1),
    /Only otpauth TOTP URIs are supported/
  );
  assert.throws(() => parseLine(`otpauth://totp/%E0%A4%A?secret=${RFC_SHA1_SECRET}`, 1), /invalid encoded label/);
});

test('calculates the current period countdown', () => {
  assert.equal(getSecondsRemaining(30, 59), 1);
  assert.equal(getSecondsRemaining(30, 60), 30);
});
