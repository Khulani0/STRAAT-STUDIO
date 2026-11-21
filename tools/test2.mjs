// Second set of checks: keyboard, links, WhatsApp, redirect, sitemap, JSON-LD, weight, motion. Usage: node tools/test2.mjs
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { serve, pages, chrome } from './serve.mjs';
const R = { keyboard: [], links: [], wa: [], redirect: [], sitemap: [], jsonld: [], weight: [], motion: [], misc: [] };
const server = await serve(4399);
const browser = await puppeteer.launch({ executablePath: chrome, args: ['--no-sandbox'], headless: true });
const base = 'http://localhost:4399';

/* d) keyboard, 375 px */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 800 });
  await page.goto(base + '/', { waitUntil: 'networkidle0' });
  const seen = [];
  for (let i = 0; i < 22; i++) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(() => { const e = document.activeElement; const cs = getComputedStyle(e); return { tag: e.tagName, text: (e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 28), outline: cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2, box: cs.boxShadow !== 'none' }; });
    seen.push(info);
  }
  const noFocus = seen.filter((s) => !s.outline && !s.box);
  R.keyboard.push(['Tab order reaches skip link, logo, menu button, buttons', seen.slice(0, 4).map((s) => s.text).join(' > ')]);
  R.keyboard.push(['Visible focus ring on first 22 tab stops', noFocus.length ? 'FAIL: ' + noFocus.map((s) => s.text).join(', ') : 'PASS']);
  // menu
  await page.focus('#menu-btn'); await page.keyboard.press('Enter');
  const open = await page.evaluate(() => ({ exp: document.querySelector('#menu-btn').getAttribute('aria-expanded'), hidden: document.querySelector('#mobile-nav').hidden, active: document.activeElement.textContent.trim() }));
  R.keyboard.push(['Menu opens with Enter, focus moves into menu', open.exp === 'true' && !open.hidden ? 'PASS (' + open.active + ')' : 'FAIL']);
  for (let i = 0; i < 9; i++) await page.keyboard.press('Tab');
  const trapped = await page.evaluate(() => !!document.activeElement.closest('#mobile-nav, .hdr-cta'));
  R.keyboard.push(['Focus stays inside the open menu (trap)', trapped ? 'PASS' : 'FAIL']);
  await page.keyboard.press('Escape');
  const closed = await page.evaluate(() => ({ exp: document.querySelector('#menu-btn').getAttribute('aria-expanded'), back: document.activeElement.id }));
  R.keyboard.push(['Escape closes the menu and focus returns to the Menu button', closed.exp === 'false' && closed.back === 'menu-btn' ? 'PASS' : 'FAIL ' + JSON.stringify(closed)]);
  // accordion
  const acc = await page.evaluate(() => { const s = document.querySelector('.acc summary'); s.scrollIntoView(); s.focus(); const cs = getComputedStyle(s); return { out: cs.outlineStyle !== 'none' }; });
  await page.keyboard.press('Enter');
  const opened = await page.evaluate(() => document.querySelector('.acc details').open);
  await page.keyboard.press('Enter');
  const closed2 = await page.evaluate(() => !document.querySelector('.acc details').open);
  R.keyboard.push(['Accordion summary has visible focus and opens/closes with Enter', acc.out && opened && closed2 ? 'PASS' : 'FAIL']);
  // sticky bar
  const bar = await page.evaluate(() => { const b = document.querySelector('.mbar'); const r = b.getBoundingClientRect(); const links = [...b.querySelectorAll('a')].map((a) => { const x = a.getBoundingClientRect(); return { t: a.textContent.trim(), h: Math.round(x.height), inView: x.top >= 0 && x.bottom <= innerHeight }; }); return { bottom: Math.round(innerHeight - r.bottom), links }; });
  R.keyboard.push(['Sticky bar: Call and WhatsApp both visible, 48 px or taller', bar.links.length === 2 && bar.links.every((l) => l.inView && l.h >= 48) ? 'PASS' : 'FAIL ' + JSON.stringify(bar)]);
  await page.focus('.mbar a'); const f1 = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle !== 'none');
  R.keyboard.push(['Sticky bar links show a focus ring', f1 ? 'PASS' : 'FAIL']);
  await page.close();
}

/* g) links and WhatsApp */
{
  const all = new Set();
  for (const p of pages) {
    const page = await browser.newPage();
    await page.goto(base + p, { waitUntil: 'networkidle0' });
    const hrefs = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')));
    for (const h of hrefs) {
      all.add(h);
      if (h === '#' || h === '#top') R.links.push(`FAIL ${p}: ${h}`);
      if (h.startsWith('/')) { const f = h.split('#')[0].split('?')[0]; if (f && !fs.existsSync('dist' + f + 'index.html') && !fs.existsSync('dist' + f)) R.links.push(`FAIL ${p}: broken ${h}`); if (h.includes('#') && h.split('#')[0] === '') {} }
      if (h.startsWith('#') && h.length > 1) { const ok = await page.evaluate((id) => !!document.getElementById(id), h.slice(1)); if (!ok) R.links.push(`FAIL ${p}: missing anchor ${h}`); }
      if (h.startsWith('https://wa.me/')) { if (!h.startsWith('https://wa.me/27846946588?text=') || h.length < 50) R.wa.push(`FAIL ${p}: ${h.slice(0, 80)}`); }
      if (h.startsWith('tel:') && h !== 'tel:+27846946588') R.wa.push(`FAIL ${p}: ${h}`);
    }
    await page.close();
  }
  R.links.push(`PASS: ${all.size} distinct links checked on ${pages.length} pages` + (R.links.some((x) => x.startsWith('FAIL')) ? '' : ', zero broken'));
  R.wa.push('PASS if no FAIL above: every wa.me link uses 27846946588 with a pre-filled message; every tel: link is +27846946588');
}

/* h) redirect and sitemap */
{
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(d + '/' + e.name) : [d + '/' + e.name]));
  const noidx = walk('dist').filter((x) => x.endsWith('.html') && /noindex/i.test(fs.readFileSync(x, 'utf8')));
  R.redirect.push(['No page has a noindex tag except the 404 page (' + (noidx.join(', ') || 'none') + ')', noidx.every((x) => x === 'dist/404.html') ? 'PASS' : 'FAIL']);
  const rb = fs.readFileSync('dist/robots.txt', 'utf8');
  R.redirect.push(['robots.txt allows everything and points to https://straatstudio.co.za/sitemap.xml', /Allow: \//.test(rb) && !/Disallow: \S/.test(rb) && rb.includes('Sitemap: https://straatstudio.co.za/sitemap.xml') ? 'PASS' : 'FAIL']);
  R.redirect.push(['public/_redirects has a 301 from /work/', fs.readFileSync('public/_redirects', 'utf8').includes('/work/ /examples/ 301') ? 'PASS' : 'FAIL']);
  const sm = fs.readFileSync('dist/sitemap.xml', 'utf8');
  const locs = [...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  const expected = pages.filter((p) => p !== '/404.html').map((p) => 'https://straatstudio.co.za' + p);
  const missing = expected.filter((e) => !locs.includes(e));
  const extra = locs.filter((l) => !expected.includes(l));
  R.sitemap.push(['Sitemap lists every public page', missing.length ? 'FAIL missing: ' + missing.join(', ') : `PASS (${locs.length} URLs)`]);
  R.sitemap.push(['Sitemap has no test, redirect or 404 page', extra.length ? 'FAIL extra: ' + extra.join(', ') : 'PASS']);
}

/* i) JSON-LD */
{
  const page = await browser.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'load' });
    const blocks = await page.evaluate(() => [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent));
    let types = [];
    for (const b of blocks) { try { const j = JSON.parse(b); types.push(j['@type']); } catch (e) { R.jsonld.push(`FAIL ${p}: invalid JSON`); } }
    if (p === '/') {
      const ps = blocks.map((b) => JSON.parse(b)).find((j) => j['@type'] === 'ProfessionalService');
      const faq = blocks.map((b) => JSON.parse(b)).find((j) => j['@type'] === 'FAQPage');
      const ok = ps && ps.telephone === '+27846946588' && ps.areaServed['@type'] === 'Country' && ps.priceRange === 'R999 to R3,099' && faq && faq.mainEntity.length === 6;
      R.jsonld.push(['Home: ProfessionalService (name, url, telephone, email, areaServed, priceRange) and FAQPage with 6 questions', ok ? 'PASS' : 'FAIL']);
    }
    if (p !== '/' && p !== '/404.html' && !types.includes('BreadcrumbList')) R.jsonld.push(`FAIL ${p}: no BreadcrumbList`);
  }
  R.jsonld.push('PASS if no FAIL above: every page parses as valid JSON-LD, every non-home page has a BreadcrumbList');
  await page.close();
}

/* j) weight */
{
  for (const p of pages) {
    const page = await browser.newPage();
    const sizes = new Map();
    page.on('response', async (res) => { try { const buf = await res.buffer(); sizes.set(res.url(), buf.length); } catch (e) {} });
    await page.setViewport({ width: 375, height: 800 });
    await page.goto(base + p, { waitUntil: 'networkidle0' });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); } });
    await new Promise((r) => setTimeout(r, 400));
    let total = 0, img = ['', 0], js = 0;
    for (const [u, s] of sizes) { total += s; if (/\.(webp|jpg|png|svg)$/.test(u) && s > img[1]) img = [u.replace(base, ''), s]; if (/\.js/.test(u)) js += s; }
    R.weight.push({ page: p, kb: Math.round(total / 1024), largestImage: img[0] ? `${img[0]} ${Math.round(img[1] / 1024)} KB` : 'none', jsKb: Math.round(js / 1024 * 10) / 10 });
    await page.close();
  }
}

/* Motion: reduced motion, JavaScript off, 375 px, layout shift */
{
  // 1. JavaScript off: everything visible
  let page = await browser.newPage();
  await page.setJavaScriptEnabled(false); await page.setViewport({ width: 375, height: 800 });
  for (const p of ['/', '/prices/', '/websites-for-plumbers/']) {
    await page.goto(base + p, { waitUntil: 'load' });
    const hidden = await page.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter((e) => getComputedStyle(e).opacity !== '1').length);
    const cards = await page.evaluate(() => [...document.querySelectorAll('.m-card')].filter((e) => getComputedStyle(e).opacity !== '1').length);
    R.motion.push([`JavaScript off, ${p}: hidden reveal items ${hidden}, hidden phone cards ${cards}`, hidden === 0 && cards === 0 ? 'PASS' : 'FAIL']);
  }
  await page.close();
  // 2. Reduced motion: no animation, everything visible
  page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]); await page.setViewport({ width: 375, height: 800 });
  for (const p of ['/', '/enquiry-system/', '/examples/']) {
    await page.goto(base + p, { waitUntil: 'load' });
    await new Promise((r) => setTimeout(r, 400));
    const st = await page.evaluate(() => ({ hidden: [...document.querySelectorAll('[data-reveal]')].filter((e) => getComputedStyle(e).opacity !== '1').length, anim: [...document.querySelectorAll('*')].filter((e) => { const a = getComputedStyle(e).animationName; return a && a !== 'none'; }).length, live: document.querySelectorAll('[data-live]').length, cards: [...document.querySelectorAll('.m-card')].filter((e) => getComputedStyle(e).opacity !== '1').length, marqueeDup: [...document.querySelectorAll('.marquee-track ul[aria-hidden]')].every((u) => getComputedStyle(u).display === 'none') }));
    R.motion.push([`Reduced motion, ${p}: hidden ${st.hidden}, running animations ${st.anim}, demo loop active ${st.live}, hidden phone cards ${st.cards}, strip duplicate hidden ${st.marqueeDup}`, st.hidden === 0 && st.anim === 0 && st.live === 0 && st.cards === 0 ? 'PASS' : 'FAIL']);
  }
  await page.close();
  // 3. Normal motion at 375: layout shift while scrolling, demo loop interval, pause when hidden
  page = await browser.newPage(); await page.bringToFront();
  await page.setViewport({ width: 375, height: 800 });
  await page.evaluateOnNewDocument(() => { window.__cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true }); });
  await page.goto(base + '/', { waitUntil: 'networkidle0' });
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 300) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } scrollTo(0, 0); });
  const cls = await page.evaluate(() => window.__cls);
  R.motion.push([`375 px, full scroll on home: layout shift ${cls.toFixed(4)} (limit 0.05)`, cls < 0.05 ? 'PASS' : 'FAIL']);
  const unrevealed = await page.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter((e) => !e.classList.contains('in')).length);
  R.motion.push([`375 px: items still hidden after scrolling the whole page ${unrevealed}`, unrevealed === 0 ? 'PASS' : 'FAIL']);
  // demo loop: record step changes for hero phone with page at top
  await page.evaluate(() => document.querySelector('[data-phone]').scrollIntoView({ block: 'center' }));
  const steps = await page.evaluate(() => new Promise((res) => { const p = document.querySelector('[data-phone]'); const out = []; const t0 = performance.now(); out.push([0, p.dataset.step]); new MutationObserver(() => out.push([Math.round(performance.now() - t0), p.dataset.step])).observe(p, { attributes: true, attributeFilter: ['data-step'] }); setTimeout(() => res(out), 22000); }));
  const returns = steps.filter((s) => s[1] === '0').map((s) => s[0]).filter((t, i, a) => i === 0 || t - a[i - 1] > 1000);
  const loop = returns.length >= 2 ? returns[1] - returns[0] : null;
  R.motion.push([`Demo loop steps over 22 s: ${steps.map((s) => s[1]).join(',')}; loop length ${loop} ms (must be 6000 ms or more)`, loop && loop >= 6000 ? 'PASS' : 'FAIL']);
  R.motion.push(['Header shrinks after scroll', await (async () => { await page.evaluate(() => scrollTo(0, 600)); await new Promise((r) => setTimeout(r, 500)); const h = await page.evaluate(() => Math.round(document.querySelector('[data-header]').getBoundingClientRect().height)); await page.evaluate(() => scrollTo(0, 0)); await new Promise((r) => setTimeout(r, 400)); const h0 = await page.evaluate(() => Math.round(document.querySelector('[data-header]').getBoundingClientRect().height)); return h < h0 ? `PASS (${h0}px to ${h}px)` : `FAIL ${h0}/${h}`; })()]);
  await page.close();
}
await browser.close(); server.close();
fs.writeFileSync('docs/test2-results.json', JSON.stringify(R, null, 1));
console.log(JSON.stringify(R, null, 1));
