import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readSource = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('third-party analytics are opt-in and excluded from sensitive tool routes', async () => {
  const [layout, ...toolPages] = await Promise.all([
    readSource('../src/layouts/Layout.astro'),
    readSource('../src/pages/index.astro'),
    readSource('../src/pages/2fa-qr-code-generator.astro'),
    readSource('../src/pages/totp-verifier.astro'),
    readSource('../src/pages/totp-secret-key-generator.astro'),
  ]);

  assert.match(layout, /enableThirdPartyAnalytics = false/);
  assert.match(layout, /enableThirdPartyAnalytics && <Analytics \/>/);
  toolPages.forEach((page) => assert.doesNotMatch(page, /enableThirdPartyAnalytics/));
});

test('clear actions reset each form to its declared defaults', async () => {
  const [verifier, secretGenerator] = await Promise.all([
    readSource('../src/components/TotpVerifierTool.astro'),
    readSource('../src/components/TotpSecretGeneratorTool.astro'),
  ]);

  assert.match(verifier, /\[data-verifier-clear\][\s\S]*?form\.reset\(\)/);
  assert.match(secretGenerator, /\[data-secret-clear\][\s\S]*?form\.reset\(\)/);
});

test('the thin guides hub is noindex and excluded from the sitemap', async () => {
  const [guidesHub, astroConfig] = await Promise.all([
    readSource('../src/pages/guides/index.astro'),
    readSource('../astro.config.ts'),
  ]);

  assert.match(guidesHub, /robots:\s*\{\s*index: false,\s*follow: true,/);
  assert.match(astroConfig, /pathname\.replace\(\/\\\/\$\/, ''\) !== '\/guides'/);
});

test('the tools hub metadata describes all four tool jobs', async () => {
  const toolsHub = await readSource('../src/pages/tools/index.astro');

  assert.match(toolsHub, /2FA Tools — TOTP Generator, QR & Verifier/);
  assert.match(toolsHub, /four browser-only 2FA tools/);
  assert.match(toolsHub, /secret keys and QR codes, or verify a code/);
});
