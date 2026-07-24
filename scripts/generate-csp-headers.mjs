import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
    if (entry.isDirectory()) files.push(...(await findHtmlFiles(url)));
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(url);
  }

  return files;
}

export function cspHash(content) {
  return `'sha256-${createHash('sha256').update(content).digest('base64')}'`;
}

export function collectInlineHashes(html, file = 'HTML input') {
  const scriptHashes = [];
  const styleHashes = [];
  const unsafeAttribute = html.match(/<[a-z][^>]*\s((?:on[a-z]+|style))\s*=/i);

  if (unsafeAttribute) {
    const filename = file instanceof URL ? file.pathname : String(file);
    throw new Error(`CSP cannot protect inline attribute ${unsafeAttribute[1]} in ${filename}`);
  }

  for (const match of html.matchAll(/<script\b(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi)) {
    if (match[1]) scriptHashes.push(cspHash(match[1]));
  }

  for (const match of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    if (match[1]) styleHashes.push(cspHash(match[1]));
  }

  return { scriptHashes, styleHashes };
}

export function buildPolicy(scriptHashes, styleHashes) {
  const scripts = [...new Set(scriptHashes)].sort();
  const styles = [...new Set(styleHashes)].sort();

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    ["script-src 'self'", ...scripts].join(' '),
    ["style-src 'self'", ...styles].join(' '),
    "img-src 'self' data:",
    "font-src 'self'",
    // Feedback modal posts JSON to the shared Feedback Hub only.
    "connect-src https://feedback.remixtranslator.com",
    "media-src 'none'",
    "frame-src 'none'",
    "worker-src 'none'",
    "manifest-src 'self'",
    'upgrade-insecure-requests',
  ].join('; ');
}

export function upsertCspHeader(originalHeaders, policy) {
  const headerLines = originalHeaders
    .split('\n')
    .filter((line) => !line.trimStart().startsWith('Content-Security-Policy:'));
  const rootRule = headerLines.findIndex((line) => line.trim() === '/*');

  if (rootRule === -1) throw new Error('The root /* rule is missing from dist/_headers.');

  headerLines.splice(rootRule + 1, 0, `  Content-Security-Policy: ${policy}`);
  return `${headerLines.join('\n').trimEnd()}\n`;
}

export async function generateCspHeaders(distDirectory = new URL('../dist/', import.meta.url)) {
  const headersFile = new URL('_headers', distDirectory);
  const htmlFiles = await findHtmlFiles(distDirectory);
  const scriptHashes = new Set();
  const styleHashes = new Set();

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const hashes = collectInlineHashes(html, file);
    hashes.scriptHashes.forEach((hash) => scriptHashes.add(hash));
    hashes.styleHashes.forEach((hash) => styleHashes.add(hash));
  }

  const policy = buildPolicy(scriptHashes, styleHashes);
  if (policy.includes("'unsafe-inline'")) throw new Error('Generated CSP unexpectedly allows unsafe-inline.');

  const originalHeaders = await readFile(headersFile, 'utf8');
  await writeFile(headersFile, upsertCspHeader(originalHeaders, policy));

  return { htmlFiles: htmlFiles.length, scriptHashes: scriptHashes.size, styleHashes: styleHashes.size };
}

const isMainModule = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMainModule) {
  const result = await generateCspHeaders();
  console.log(
    `CSP generated for ${result.htmlFiles} HTML files with ${result.scriptHashes} script hashes and ${result.styleHashes} style hashes.`
  );
}
