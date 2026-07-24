import assert from 'node:assert/strict';
import test from 'node:test';

import { buildPolicy, collectInlineHashes, cspHash, upsertCspHeader } from '../scripts/generate-csp-headers.mjs';

test('generates a stable SHA-256 CSP hash', () => {
  assert.equal(cspHash('alert(1)'), "'sha256-bhHHL3z2vDgxUt0W3dWQOrprscmda2Y5pLsLg4GF+pI='");
});

test('collects inline scripts and styles but ignores external scripts', () => {
  const html = [
    '<script src="/app.js"></script>',
    '<script>alert(1)</script>',
    '<style>body{color:black}</style>',
  ].join('');

  assert.deepEqual(collectInlineHashes(html, 'fixture.html'), {
    scriptHashes: [cspHash('alert(1)')],
    styleHashes: [cspHash('body{color:black}')],
  });
});

test('rejects inline event handlers and style attributes', () => {
  assert.throws(() => collectInlineHashes('<button onclick="run()">Run</button>'), /inline attribute onclick/);
  assert.throws(() => collectInlineHashes('<div style="color:red">Text</div>'), /inline attribute style/);
});

test('builds a strict policy without unsafe-inline', () => {
  const policy = buildPolicy([cspHash('alert(1)')], [cspHash('body{color:black}')]);

  assert.match(policy, /frame-ancestors 'none'/);
  assert.match(policy, /connect-src https:\/\/feedback\.remixtranslator\.com/);
  assert.doesNotMatch(policy, /connect-src[^;]*'none'/);
  assert.match(policy, /script-src 'self' 'sha256-/);
  assert.doesNotMatch(policy, /unsafe-inline/);
});

test('replaces an existing CSP inside the root headers rule', () => {
  const headers = '/*\n  Content-Security-Policy: old-policy\n  X-Frame-Options: DENY\n';
  const result = upsertCspHeader(headers, "default-src 'self'");

  assert.equal(result.match(/Content-Security-Policy:/g)?.length, 1);
  assert.match(result, /Content-Security-Policy: default-src 'self'/);
  assert.match(result, /X-Frame-Options: DENY/);
  assert.throws(() => upsertCspHeader('/assets/*\n', "default-src 'self'"), /root \/\* rule is missing/);
});
