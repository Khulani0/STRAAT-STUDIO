// Usage: node tools/shoot.mjs <outDir> <width> [path ...]. Full-page screenshots of the built site. Add --fold for the first screen only (with the sticky bar).
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import { serve, pages, chrome } from './serve.mjs';
const [out, width, ...rest] = process.argv.slice(2);
const fold = rest.includes('--fold');
const only = rest.filter((x) => x !== '--fold');
fs.mkdirSync(out, { recursive: true });
const server = await serve(4399);
const browser = await puppeteer.launch({ executablePath: chrome, args: ['--no-sandbox'], headless: true });
const name = (p) => (p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace('.html', '').replace(/\//g, '_'));
for (const p of (only.length ? only : pages)) {
  const page = await browser.newPage();
  await page.setViewport({ width: Number(width), height: fold ? 812 : 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:4399' + p, { waitUntil: 'networkidle0' });
  if (fold) { await new Promise((r) => setTimeout(r, 1200)); await page.screenshot({ path: `${out}/${name(p)}-${width}-fold.png` }); await page.close(); continue; }
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); });
  await page.addStyleTag({ content: '[data-reveal]{opacity:1!important;translate:none!important;transition:none!important}.float,.marquee-track{animation:none!important}' });
  await new Promise((r) => setTimeout(r, 200));
  await page.screenshot({ path: `${out}/${name(p)}-${width}.png`, fullPage: true });
  await page.close();
}
await browser.close(); server.close();
