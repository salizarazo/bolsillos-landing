#!/usr/bin/env node
/**
 * Export pixel-perfect 1080×1350 PNGs of all 6 Top 5 carrusel slides.
 *
 * Setup (una vez):
 *   cd bolsillos-landing/screenshots
 *   npm install --save-dev playwright
 *   npx playwright install chromium
 *
 * Run:
 *   node carrusel-top5/export.mjs
 *
 * Output: bolsillos-landing/screenshots/carrusel-top5/exports/top5-slide-{1..6}.png
 */

import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

const here    = dirname(fileURLToPath(import.meta.url));
const htmlURL = 'file://' + resolve(here, 'index.html');
const outDir  = resolve(here, 'exports');

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 1500 },
  deviceScaleFactor: 1,
});

console.log('→ loading', htmlURL);
await page.goto(htmlURL);

// Wait for webfonts (DM Serif Display + Source Serif + Inter) and editorial PNGs
await page.evaluate(() => document.fonts.ready);
await page.waitForLoadState('networkidle');

// Small extra settle for any layout re-flow after font load
await page.waitForTimeout(400);

for (let i = 1; i <= 6; i++) {
  const locator = page.locator(`#slide-${i}`);
  const path = resolve(outDir, `top5-slide-${i}.png`);
  await locator.screenshot({ path, omitBackground: false });
  console.log(`  ✓ slide-${i}.png`);
}

await browser.close();
console.log(`✔ done → ${outDir}`);
