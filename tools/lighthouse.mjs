// Lighthouse, mobile mode, on the built site. Usage: node tools/lighthouse.mjs
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'node:fs';
import { serve } from './serve.mjs';
const server = await serve(4399);
const chrome = await chromeLauncher.launch({ chromePath: '/usr/bin/google-chrome', chromeFlags: ['--headless=new', '--no-sandbox'] });
const rows = [];
for (const p of ['/', '/prices/', '/websites-for-electricians/', '/websites-for-plumbers/', '/websites-for-salons/', '/websites-for-home-bakers/', '/examples/', '/examples/fazilas-kitchen/', '/examples/thandeka-hair-studio/', '/examples/ndlovu-electrical/', '/enquiry-system/', '/contact/']) {
  const r = await lighthouse('http://localhost:4399' + p, { port: chrome.port, output: 'json', logLevel: 'error', formFactor: 'mobile', screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false } });
  const c = r.lhr.categories, a = r.lhr.audits;
  rows.push({ page: p, performance: Math.round(c.performance.score * 100), accessibility: Math.round(c.accessibility.score * 100), bestPractices: Math.round(c['best-practices'].score * 100), seo: Math.round(c.seo.score * 100), lcp: a['largest-contentful-paint'].displayValue, cls: a['cumulative-layout-shift'].displayValue, tbt: a['total-blocking-time'].displayValue });
}
await chrome.kill(); server.close();
fs.writeFileSync('docs/lighthouse-results.json', JSON.stringify(rows, null, 1));
console.table(rows);
