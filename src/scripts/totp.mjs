import { base32 } from '@otplib/plugin-base32-scure';
import { crypto as nobleCrypto } from '@otplib/plugin-crypto-noble';
import { crypto as webCrypto } from '@otplib/plugin-crypto-web';
import { generate } from 'otplib';

export const MAX_ENTRIES = 50;
export const MAX_LINE_LENGTH = 2048;
export const MAX_LABEL_LENGTH = 80;
export const MAX_INPUT_LENGTH = MAX_ENTRIES * (MAX_LINE_LENGTH + 1);

const MIN_SECRET_BYTES = 16;
const MAX_SECRET_BYTES = 64;
export const DEFAULT_SECRET_BYTES = 20;
export const NON_CANONICAL_BASE32_WARNING =
  'Non-standard Base32 padding was normalized locally. Verify this code with the account provider.';

const supportedAlgorithms = new Set(['sha1', 'sha256', 'sha512']);
const supportedDigits = new Set([6, 7, 8]);
const supportedUnpaddedLengthRemainders = new Set([0, 2, 4, 5, 7]);
const base32Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export class TotpInputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TotpInputError';
  }
}

function decodeBase32Compat(secret) {
  const bytes = [];
  let buffer = 0;
  let bits = 0;

  for (const character of secret) {
    buffer = (buffer << 5) | base32Alphabet.indexOf(character);
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((buffer >>> bits) & 0xff);
      buffer &= bits ? (1 << bits) - 1 : 0;
    }
  }

  return new Uint8Array(bytes);
}

export function normalizeSecretWithInfo(value) {
  const secret = String(value ?? '')
    .replace(/[\s-]+/g, '')
    .replace(/=+$/g, '')
    .toUpperCase();

  if (!secret) throw new TotpInputError('Add a Base32 secret or an otpauth URI.');
  if (!/^[A-Z2-7]+$/.test(secret)) {
    throw new TotpInputError('This line is not a valid Base32 secret.');
  }

  if (!supportedUnpaddedLengthRemainders.has(secret.length % 8)) {
    throw new TotpInputError('This line is not a valid Base32 secret.');
  }

  let decoded;
  let canonicalSecret;
  try {
    decoded = decodeBase32Compat(secret);
    canonicalSecret = base32.encode(decoded).replace(/=+$/g, '');
    base32.decode(canonicalSecret);
  } catch {
    throw new TotpInputError('This line is not a valid Base32 secret.');
  }

  const secretBytes = decoded.length;
  if (secretBytes < MIN_SECRET_BYTES) {
    throw new TotpInputError('The secret must contain at least 26 Base32 characters (128 bits).');
  }
  if (secretBytes > MAX_SECRET_BYTES) {
    throw new TotpInputError('The secret must not exceed 64 bytes.');
  }

  return {
    secret: canonicalSecret,
    wasCanonicalized: canonicalSecret !== secret,
  };
}

export function normalizeSecret(value) {
  return normalizeSecretWithInfo(value).secret;
}

function normalizeLabel(value, fallback) {
  const label = String(value || '').trim() || fallback;
  if (label.length > MAX_LABEL_LENGTH) {
    throw new TotpInputError(`Labels must not exceed ${MAX_LABEL_LENGTH} characters.`);
  }
  return label;
}

function parseAlgorithm(value) {
  const algorithm = String(value || 'sha1')
    .toLowerCase()
    .replace('-', '');
  if (!supportedAlgorithms.has(algorithm)) {
    throw new TotpInputError('This otpauth URI uses an unsupported algorithm.');
  }
  return algorithm;
}

function parseDigits(value) {
  const digits = Number(value || 6);
  if (!Number.isInteger(digits) || !supportedDigits.has(digits)) {
    throw new TotpInputError('This otpauth URI uses an unsupported digit count.');
  }
  return digits;
}

function parsePeriod(value) {
  const period = Number(value || 30);
  if (!Number.isInteger(period) || period < 15 || period > 120) {
    throw new TotpInputError('This otpauth URI uses an unsupported time period.');
  }
  return period;
}

function parseOtpauth(line, lineNumber) {
  let uri;
  try {
    uri = new URL(line);
  } catch {
    throw new TotpInputError('This otpauth URI could not be read.');
  }

  if (uri.protocol !== 'otpauth:' || uri.hostname.toLowerCase() !== 'totp') {
    throw new TotpInputError('Only otpauth TOTP URIs are supported.');
  }

  let rawLabel;
  try {
    rawLabel = decodeURIComponent(uri.pathname.replace(/^\//, '')).trim();
  } catch {
    throw new TotpInputError('This otpauth URI contains an invalid encoded label.');
  }
  const issuer = (uri.searchParams.get('issuer') || '').trim();
  const label = normalizeLabel(rawLabel || issuer, `Code ${lineNumber}`);
  const normalizedSecret = normalizeSecretWithInfo(uri.searchParams.get('secret'));

  return {
    id: `entry-${lineNumber}`,
    lineNumber,
    label,
    secret: normalizedSecret.secret,
    algorithm: parseAlgorithm(uri.searchParams.get('algorithm')),
    digits: parseDigits(uri.searchParams.get('digits')),
    period: parsePeriod(uri.searchParams.get('period')),
    ...(normalizedSecret.wasCanonicalized ? { warning: NON_CANONICAL_BASE32_WARNING } : {}),
  };
}

export function parseLine(line, lineNumber) {
  const value = String(line).trim();
  if (value.length > MAX_LINE_LENGTH) {
    throw new TotpInputError(`Each line must not exceed ${MAX_LINE_LENGTH.toLocaleString('en-US')} characters.`);
  }
  if (value.toLowerCase().startsWith('otpauth://')) return parseOtpauth(value, lineNumber);

  const separatorIndex = value.indexOf('|');
  const hasLabel = separatorIndex >= 0;
  const label = hasLabel ? value.slice(0, separatorIndex).trim() : `Code ${lineNumber}`;
  const secret = hasLabel ? value.slice(separatorIndex + 1) : value;
  const normalizedSecret = normalizeSecretWithInfo(secret);

  return {
    id: `entry-${lineNumber}`,
    lineNumber,
    label: normalizeLabel(label, `Code ${lineNumber}`),
    secret: normalizedSecret.secret,
    algorithm: 'sha1',
    digits: 6,
    period: 30,
    ...(normalizedSecret.wasCanonicalized ? { warning: NON_CANONICAL_BASE32_WARNING } : {}),
  };
}

export function parseInput(value) {
  const input = String(value ?? '');
  if (input.length > MAX_INPUT_LENGTH) {
    throw new TotpInputError('This batch is too large. Use up to 50 lines with 2,048 characters per line.');
  }

  const lines = input
    .split(/\r?\n/)
    .map((line, index) => ({ value: line.trim(), lineNumber: index + 1 }))
    .filter((line) => line.value);

  if (!lines.length) throw new TotpInputError('Paste at least one Base32 secret or otpauth URI.');
  if (lines.length > MAX_ENTRIES) {
    throw new TotpInputError(`Use up to ${MAX_ENTRIES} non-empty lines at a time.`);
  }

  const entries = [];
  const errors = [];
  const warnings = [];

  for (const line of lines) {
    try {
      const entry = parseLine(line.value, line.lineNumber);
      entries.push(entry);
      if (entry.warning) warnings.push({ lineNumber: line.lineNumber, message: entry.warning });
    } catch (error) {
      errors.push({
        lineNumber: line.lineNumber,
        message: error instanceof TotpInputError ? error.message : 'This line could not be read.',
      });
    }
  }

  return { entries, errors, warnings };
}

export function maskSecret(secret) {
  return `•••• ${String(secret).slice(-4)}`;
}

/**
 * Build a standard otpauth://totp URI for QR encoding (local only).
 * @param {{ secret: string, label?: string, issuer?: string, algorithm?: string, digits?: number, period?: number }} options
 */
export function buildOtpauthUri(options = {}) {
  const secret = normalizeSecret(options.secret);
  const algorithm = parseAlgorithm(options.algorithm);
  const digits = parseDigits(options.digits);
  const period = parsePeriod(options.period);
  const issuer = String(options.issuer || '')
    .trim()
    .slice(0, MAX_LABEL_LENGTH);
  const label = normalizeLabel(options.label || issuer || 'Account', 'Account');

  const pathLabel = issuer ? `${issuer}:${label}` : label;
  const params = new URLSearchParams();
  params.set('secret', secret);
  if (issuer) params.set('issuer', issuer);
  if (algorithm !== 'sha1') params.set('algorithm', algorithm.toUpperCase());
  if (digits !== 6) params.set('digits', String(digits));
  if (period !== 30) params.set('period', String(period));

  // Path segment: encodeURIComponent keeps ":" between issuer and account usable by apps
  return `otpauth://totp/${encodeURIComponent(pathLabel).replace(/%3A/gi, ':')}?${params.toString()}`;
}

export function getSecondsRemaining(period = 30, epoch = Date.now() / 1000) {
  const elapsed = Math.floor(epoch) % period;
  return elapsed === 0 ? period : period - elapsed;
}

export function getCryptoPlugin(hasWebCrypto = Boolean(globalThis.crypto?.subtle)) {
  return hasWebCrypto ? webCrypto : nobleCrypto;
}

export async function generateTotp(entry, epoch = Date.now() / 1000, cryptoPlugin = getCryptoPlugin()) {
  try {
    return await generate({
      secret: entry.secret,
      algorithm: entry.algorithm,
      digits: entry.digits,
      period: entry.period,
      epoch,
      crypto: cryptoPlugin,
      base32,
    });
  } catch {
    throw new Error('A code could not be generated for this entry.');
  }
}

export function generateRandomSecret(byteLength = DEFAULT_SECRET_BYTES, cryptoSource = globalThis.crypto) {
  if (!Number.isInteger(byteLength) || byteLength < DEFAULT_SECRET_BYTES || byteLength > MAX_SECRET_BYTES) {
    throw new TotpInputError(`Generate a secret between ${DEFAULT_SECRET_BYTES} and ${MAX_SECRET_BYTES} bytes.`);
  }
  if (!cryptoSource || typeof cryptoSource.getRandomValues !== 'function') {
    throw new Error('Secure random generation is unavailable in this browser.');
  }

  const bytes = new Uint8Array(byteLength);
  cryptoSource.getRandomValues(bytes);
  return base32.encode(bytes).replace(/=+$/g, '');
}

export async function verifyTotp(
  entry,
  candidate,
  { epoch = Date.now() / 1000, window = 1, cryptoPlugin = getCryptoPlugin() } = {}
) {
  const token = String(candidate ?? '').replace(/[\s-]+/g, '');
  if (!new RegExp(`^\\d{${entry.digits}}$`).test(token)) {
    throw new TotpInputError(`Enter exactly ${entry.digits} digits for this TOTP setup.`);
  }
  if (!Number.isInteger(window) || window < 0 || window > 2) {
    throw new TotpInputError('The verification window must be between 0 and 2 time steps.');
  }

  for (let delta = -window; delta <= window; delta += 1) {
    const expected = await generateTotp(entry, epoch + delta * entry.period, cryptoPlugin);
    let mismatch = expected.length ^ token.length;
    for (let index = 0; index < Math.max(expected.length, token.length); index += 1) {
      mismatch |= (expected.charCodeAt(index) || 0) ^ (token.charCodeAt(index) || 0);
    }
    if (mismatch === 0) return { valid: true, delta };
  }

  return { valid: false, delta: null };
}
