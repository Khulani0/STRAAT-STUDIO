// Usage: node tools/shoot-work.mjs <outDir>. First screen of the homepage Work section at 375 and 1280.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import { serve, chrome } from './serve.mjs';
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });
const server = await serve(4399);
const browser = await puppeteer.launch({ executablePath: chrome, args: ['--no-sandbox'], headless: true });
for (const [w, h] of [[375, 812], [1280, 900]]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h });
  await page.goto('http://localhost:4399/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => { const y = document.querySelector('#work').getBoundingClientRect().top + scrollY - 80; scrollTo(0, y); });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: `${out}/home-work-${w}.png` });
  await page.close();
}
await browser.close(); server.close();
