// Automated checks on the built site. Usage: node tools/test.mjs
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { serve, pages, chrome } from './serve.mjs';
const require = createRequire(import.meta.url);
const axeSrc = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const server = await serve(4399);
const browser = await puppeteer.launch({ executablePath: chrome, args: ['--no-sandbox'], headless: true });
const out = { overflow: [], axe: [], fonts: [], gaps: [], orphans: [], colours: [], weight: [], greens: [], tap: [] };
const widths = [320, 375, 390, 768, 1280, 1536];
for (const p of pages) {
  for (const w of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: 900 });
    await page.goto('http://localhost:4399' + p, { waitUntil: 'networkidle0' });
    await page.addStyleTag({ content: '[data-reveal]{opacity:1!important;translate:none!important;transition:none!important}' });
    const r = await page.evaluate(() => {
      const d = document.documentElement;
      return { sw: d.scrollWidth, cw: d.clientWidth };
    });
    if (r.sw > r.cw) out.overflow.push(`${p} @${w}: ${r.sw} > ${r.cw}`);
    if (w === 375 || w === 1280) {
      await page.evaluate(axeSrc);
      const res = await page.evaluate(async () => await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }));
      for (const v of res.violations) out.axe.push(`${p} @${w}: ${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes[0].target.join(' ')} | ${v.nodes[0].failureSummary.split('\n')[1] || ''}`);
      const audit = await page.evaluate(() => {
        const res = { fonts: [], gaps: [], orphans: [], colours: [], greens: [], tap: [] };
        const serif = /serif/i;
        const used = new Set();
        document.querySelectorAll('body *').forEach((el) => { const f = getComputedStyle(el).fontFamily; used.add(f); });
        used.forEach((f) => { if (!/^Inter/i.test(f.replace(/["']/g, ''))) res.fonts.push(f); });
        const bad = (c) => { const m = c.match(/\d+/g); if (!m) return false; const [r, g, b] = m.map(Number); return (r > 235 && g > 215 && b < 215 && r - b > 25) || (r > 240 && g > 225 && b > 190 && b < 235 && r - b > 12 && g - b > 8); };
        document.querySelectorAll('body *').forEach((el) => { const cs = getComputedStyle(el); if (bad(cs.backgroundColor) || bad(cs.color)) res.colours.push(el.tagName + '.' + el.className + ' ' + cs.backgroundColor + ' ' + cs.color); });
        document.querySelectorAll('.btn').forEach((b) => { const bg = getComputedStyle(b).backgroundColor; if (bg === 'rgb(37, 211, 102)' && !/whatsapp/i.test(b.textContent)) res.greens.push(b.textContent.trim()); });
        document.querySelectorAll('a, button, summary, label.opt').forEach((el) => { const r = el.getBoundingClientRect(); if (r.width > 4 && r.height > 4 && el.offsetParent !== null && (r.height < 44 || r.width < 44) && getComputedStyle(el).display !== 'inline') res.tap.push(`${el.tagName} ${el.textContent.trim().slice(0, 30)} ${Math.round(r.width)}x${Math.round(r.height)}`); });
        document.querySelectorAll('h1, h2').forEach((h) => {
          const words = []; const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT); let n;
          while ((n = walker.nextNode())) { const re = /\S+/g; let m; while ((m = re.exec(n.textContent))) { const rg = document.createRange(); rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length); const rc = rg.getClientRects()[0]; if (rc) words.push(Math.round(rc.top)); } }
          if (words.length > 3) { const lastTop = words[words.length - 1]; const onLast = words.filter((t) => Math.abs(t - lastTop) < 4).length; if (onLast === 1 && new Set(words.map((t) => Math.round(t / 4))).size > 1) res.orphans.push(h.textContent.trim().slice(0, 60)); }
        });
        const sy = scrollY;
        document.querySelectorAll('main > section, main > div').forEach((s) => {
          const sr = s.getBoundingClientRect(); const kids = [...s.querySelectorAll('*')].filter((k) => { const r = k.getBoundingClientRect(); if (!(r.height > 0 && r.width > 0) || k.closest('[aria-hidden="true"]:not(.err-code)')) return false; const own = [...k.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim()); return own || k.matches('.card, .ex-tile, .tile, .step, .acc details, .laptop, .phone, .tbl, .builder-l, .builder-r, .facts, .marquee, img'); });
          if (!kids.length) return;
          const top = Math.min(...kids.map((k) => k.getBoundingClientRect().top)); const bot = Math.max(...kids.map((k) => k.getBoundingClientRect().bottom));
          if (top - sr.top > 110) res.gaps.push(`top ${Math.round(top - sr.top)}px in ${s.className.slice(0, 30)} ${s.querySelector('h1,h2')?.textContent.slice(0, 30)}`);
          if (sr.bottom - bot > 110) res.gaps.push(`bottom ${Math.round(sr.bottom - bot)}px in ${s.className.slice(0, 30)} ${s.querySelector('h1,h2')?.textContent.slice(0, 30)}`);
        });
        return res;
      });
      for (const k of ['fonts', 'colours', 'greens', 'tap', 'orphans', 'gaps']) audit[k].forEach((x) => out[k].push(`${p} @${w}: ${x}`));
    }
    await page.close();
  }
}
await browser.close(); server.close();
fs.writeFileSync('docs/test-results.json', JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out)) console.log(k.toUpperCase(), v.length); 
for (const [k, v] of Object.entries(out)) { if (v.length) { console.log('--', k); console.log([...new Set(v)].slice(0, 40).join('\n')); } }
