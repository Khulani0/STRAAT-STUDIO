// Shared helpers for the service tests. Reads brand files, tokens and business facts from the site's own source.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const OUT = path.join(ROOT, 'service-tests');
export const cfg = await import(path.join(ROOT, 'src/config/business.ts'));
export const { business, prices, formatRand: R, deliveryDays, deliveryLine, maxPages } = cfg;

export const PHONE = business.phoneDisplay; // 084 694 6588
export const SITE = 'straatstudio.co.za';
export const SITE_URL = business.siteUrl;
export const EMAIL = business.email;
export const LINE = 'A website that helps customers find you and call you.';

export const C = { blue: '#2F54EB', blueDark: '#2443C4', navy: '#0F1B2D', navy2: '#172640', white: '#FFFFFF', grey: '#F3F5F8', ink: '#14161A', muted: '#4D545C', line: '#DDE2EA', tint: '#E8EDFF', tintOnNavy: '#8EA8FF', onNavy: '#C9D1DC' };

const read = (f) => fs.readFileSync(path.join(ROOT, 'public/brand', f), 'utf8');
export const svg = {
  colour: read('logo.svg'),
  white: read('logo-light.svg'),
  dark: read('logo.svg').replace(/#2F54EB/g, C.navy),
  mark: read('mark.svg'),
  markWhite: read('mark.svg').replace(/#2F54EB/g, '#FFFFFF').replace(/fill="#fff"/, `fill="${C.blue}"`),
  markDark: read('mark.svg').replace(/#2F54EB/g, C.navy),
  favicon: fs.readFileSync(path.join(ROOT, 'public/favicon.svg'), 'utf8'),
  square: read('logo-square-640.svg'),
};
// Inline svg for use inside HTML (strips fixed width and height so CSS controls the size).
export const inline = (s, css = '') => s.replace(/ width="\d+" height="\d+"/, '').replace('<svg ', `<svg style="display:block;${css}" `);

export const fontFile = path.join(ROOT, 'public/fonts/inter.woff2');
export const baseCss = `
@font-face { font-family: 'InterBrand'; src: url('data:font/woff2;base64,${fs.readFileSync(fontFile).toString('base64')}') format('woff2'); font-weight: 100 900; }
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family: 'InterBrand', Arial, sans-serif; color: ${C.ink}; -webkit-font-smoothing: antialiased; }
h1, h2, h3, p, ul { margin: 0; }
h1, h2, h3 { font-weight: 800; letter-spacing: -0.03em; line-height: 1.08; text-wrap: balance; }
p { text-wrap: pretty; }
`;

export const page = (css, body, title = 'Straat Studio') => `<!doctype html><html lang="en-ZA"><head><meta charset="utf-8"><title>${title}</title><style>${baseCss}${css}</style></head><body>${body}</body></html>`;

export async function browser() {
  return puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'], headless: true });
}

/** Renders html to a PNG file at exact CSS pixel size (scale = device scale factor). */
export async function png(b, html, file, w, h, { scale = 1, transparent = false } = {}) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const p = await b.newPage();
  await p.setViewport({ width: w, height: h, deviceScaleFactor: scale });
  await p.setContent(html, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: file, omitBackground: transparent, clip: { x: 0, y: 0, width: w, height: h } });
  const issues = await overflowIssues(p, w, h);
  await p.close();
  return issues;
}

/** Renders html to a PDF of an exact size in millimetres. */
export async function pdf(b, html, file, wmm, hmm) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const p = await b.newPage();
  const pxW = Math.round((wmm / 25.4) * 96), pxH = Math.round((hmm / 25.4) * 96);
  await p.setViewport({ width: pxW, height: pxH });
  await p.setContent(html, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  const issues = await overflowIssues(p, pxW, pxH);
  await p.pdf({ path: file, width: `${wmm}mm`, height: `${hmm}mm`, printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, preferCSSPageSize: true });
  await p.close();
  return issues;
}

/** Finds text that is cut off (scroll size bigger than box) or sits outside the page. */
async function overflowIssues(p, w, h) {
  return p.evaluate((w, h) => {
    const out = [];
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || el.closest('svg')) continue;
      const r = el.getBoundingClientRect();
      const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (hasText && (r.right > w + 0.5 || r.bottom > h + 0.5 || r.left < -0.5 || r.top < -0.5)) out.push(`outside page: "${el.textContent.trim().slice(0, 40)}"`);
      if (hasText && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1) && cs.overflow !== 'visible') out.push(`clipped: "${el.textContent.trim().slice(0, 40)}"`);
    }
    // overlap of text boxes (siblings that both hold text)
    const boxes = [...document.querySelectorAll('body *')].filter((el) => !el.closest('svg') && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())).map((el) => ({ el, r: el.getBoundingClientRect() })).filter((b) => b.r.width > 0 && b.r.height > 0);
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i].r, b = boxes[j].r;
      if (boxes[i].el.contains(boxes[j].el) || boxes[j].el.contains(boxes[i].el)) continue;
      const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (ox > 2 && oy > 2) out.push(`overlap: "${boxes[i].el.textContent.trim().slice(0, 25)}" and "${boxes[j].el.textContent.trim().slice(0, 25)}"`);
    }
    return out;
  }, w, h);
}

export const write = (rel, content) => { fs.mkdirSync(path.dirname(path.join(OUT, rel)), { recursive: true }); fs.writeFileSync(path.join(OUT, rel), content); };
