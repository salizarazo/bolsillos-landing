#!/usr/bin/env node
/**
 * Embed editorial PNGs as base64 into index.html.
 * Reemplaza in-place src="../../appstore/iphone/es/6.9/{slug}.png" → data: URI.
 *
 * Run: node embed-images.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(here, 'index.html');
const imgDir   = resolve(here, '../../appstore/iphone/es/6.9');

const slugs = ['home', 'bolsillos', 'pace', 'debts', 'dreams'];

let html = readFileSync(htmlPath, 'utf8');
let replaced = 0;

for (const slug of slugs) {
  const imgPath = resolve(imgDir, `${slug}.png`);
  const buf = readFileSync(imgPath);
  const b64 = buf.toString('base64');
  const dataUri = `data:image/png;base64,${b64}`;

  const relPath = `../../appstore/iphone/es/6.9/${slug}.png`;
  const before = html;
  html = html.replace(`src="${relPath}"`, `src="${dataUri}"`);
  if (html !== before) {
    replaced++;
    console.log(`  ✓ embedded ${slug}.png (${(buf.length / 1024).toFixed(0)} KB → ${(b64.length / 1024).toFixed(0)} KB base64)`);
  } else {
    console.warn(`  ⚠ no replacement made for ${slug} (may already be embedded)`);
  }
}

if (replaced > 0) {
  writeFileSync(htmlPath, html);
  console.log(`\n✔ ${replaced}/${slugs.length} embedded → ${htmlPath}`);
  console.log(`  Resulting HTML size: ${(html.length / 1024 / 1024).toFixed(2)} MB`);
}
