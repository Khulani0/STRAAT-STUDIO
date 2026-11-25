import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { OUT, svg, inline, page, C, browser, png, pdf, PHONE, SITE, LINE, EMAIL, prices, R } from './lib.mjs';

const dir = 'poster-pack';
const b = await browser();
const issues = [];
const fromPrice = R(prices.websites.onePage.price);

// 1. A4 poster, white, plain. 210 x 297 mm = 794 x 1123 px at 96 dpi. Text and logo are vector, so print resolution is unlimited.
const posterCss = `
@page { size: 210mm 297mm; margin: 0 }
body { width: 210mm; height: 297mm; display: flex; flex-direction: column; background: #fff; }
.in { padding: 20mm 18mm 0; flex: 1; }
h1 { font-size: 64px; margin-top: 26mm; max-width: 15ch; }
.lead { font-size: 21px; line-height: 1.5; color: ${C.muted}; margin-top: 9mm; max-width: 30ch; }
ul { list-style: none; padding: 0; margin-top: 11mm; display: grid; gap: 10px; }
li { font-size: 20px; font-weight: 600; display: flex; gap: 12px; align-items: center; }
li i { width: 22px; height: 22px; border-radius: 50%; background: ${C.blue}; flex: none; display: grid; place-items: center; }
li i::after { content: ''; width: 6px; height: 11px; border: solid #fff; border-width: 0 2.5px 2.5px 0; transform: rotate(45deg) translate(-1px, -1px); }
.price { margin-top: 12mm; display: inline-block; background: ${C.tint}; color: ${C.blueDark}; font-weight: 800; font-size: 22px; padding: 8px 16px; border-radius: 10px; }
.band { background: ${C.navy}; color: #fff; padding: 14mm 18mm; }
.band small { color: ${C.tintOnNavy}; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; font-size: 13px; }
.band .num { font-size: 54px; font-weight: 800; letter-spacing: -0.03em; margin-top: 4px; }
.band .site { font-size: 22px; color: ${C.onNavy}; margin-top: 4px; }
`;
const posterHtml = page(posterCss, `
<div class="in">
  ${inline(svg.colour, 'width:72mm;height:auto')}
  <h1>${LINE}</h1>
  <p class="lead">Websites for trades and small businesses across South Africa. See your homepage free, before you pay anything.</p>
  <ul><li><i></i>Free homepage preview before you pay</li><li><i></i>Final prices, no VAT</li><li><i></i>You own your domain</li></ul>
  <div class="price">Websites from ${fromPrice}</div>
</div>
<div class="band"><small>WhatsApp or call</small><div class="num">${PHONE}</div><div class="site">${SITE}</div></div>
`, 'Straat Studio poster A4');
fs.writeFileSync(path.join(OUT, '_build/poster-a4.html'), posterHtml);
issues.push(...(await pdf(b, posterHtml, path.join(OUT, `${dir}/straat-studio-poster-a4.pdf`), 210, 297)));

// 2. WhatsApp status images
const statusCss = (w, h, pad) => `
body { width: ${w}px; height: ${h}px; background: ${C.navy}; color: #fff; position: relative; overflow: hidden; }
.in { position: absolute; inset: ${pad.t}px ${pad.s}px ${pad.b}px; display: flex; flex-direction: column; justify-content: space-between; }
h1 { font-size: ${h > w ? 92 : 76}px; max-width: 14ch; color: #fff; }
.sub { font-size: ${h > w ? 38 : 33}px; line-height: 1.45; color: ${C.onNavy}; margin-top: 30px; max-width: 24ch; }
.tags { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 34px; }
.tags span { border: 2px solid ${C.tintOnNavy}; color: ${C.tintOnNavy}; font-weight: 700; font-size: ${h > w ? 30 : 27}px; padding: 9px 20px; border-radius: 999px; }
.contact small { color: ${C.tintOnNavy}; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; font-size: ${h > w ? 28 : 25}px; }
.contact .num { font-size: ${h > w ? 84 : 72}px; font-weight: 800; letter-spacing: -0.03em; margin-top: 6px; }
.contact .site { font-size: ${h > w ? 38 : 33}px; color: ${C.onNavy}; margin-top: 6px; }
`;
const statusBody = (w, h) => `<div class="in"><div>${inline(svg.white, `width:${h > w ? 440 : 380}px;height:auto`)}<h1 style="margin-top:${h > w ? 90 : 50}px">${LINE}</h1><p class="sub">See your homepage free, before you pay anything.</p><div class="tags"><span>Final prices, no VAT</span><span>From ${fromPrice}</span></div></div><div class="contact"><small>WhatsApp or call</small><div class="num">${PHONE}</div><div class="site">${SITE}</div></div></div>`;
issues.push(...(await png(b, page(statusCss(1080, 1080, { t: 80, s: 80, b: 80 }), statusBody(1080, 1080)), path.join(OUT, `${dir}/whatsapp-status-1080x1080.png`), 1080, 1080)));
// 1080 x 1920: WhatsApp covers about 250 px at the top and bottom, so content stays inside that safe area.
issues.push(...(await png(b, page(statusCss(1080, 1920, { t: 260, s: 80, b: 260 }), statusBody(1080, 1920)), path.join(OUT, `${dir}/whatsapp-status-1080x1920.png`), 1080, 1920)));

// 3. Business card 90 x 50 mm, front and back as two pages in one PDF
const cardCss = `
@page { size: 90mm 50mm; margin: 0 }
body { width: 90mm; height: 50mm; position: relative; overflow: hidden; }
.f { background: #fff; display: flex; flex-direction: column; justify-content: center; padding: 0 7mm; height: 50mm; }
.f p { font-size: 8.4pt; font-weight: 600; line-height: 1.35; margin-top: 4.5mm; max-width: 56mm; color: ${C.ink}; }
.bk { background: ${C.navy}; color: #fff; height: 50mm; padding: 7mm; display: flex; flex-direction: column; justify-content: space-between; }
.bk .t { font-size: 7pt; color: ${C.tintOnNavy}; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.bk .n { font-size: 17pt; font-weight: 800; letter-spacing: -0.03em; margin-top: 1mm; }
.bk .l { font-size: 8.4pt; line-height: 1.55; color: ${C.onNavy}; }
.bk .l b { color: #fff; font-weight: 600; }
`;
const front = page(cardCss, `<div class="f">${inline(svg.colour, 'width:50mm;height:auto')}<p>${LINE}</p></div>`, 'Business card front');
const back = page(cardCss, `<div class="bk"><div><div class="t">WhatsApp or call</div><div class="n">${PHONE}</div></div><div class="l"><b>${SITE}</b><br>${EMAIL}<br>Based in Cape Town. Serving all of South Africa.</div></div>`, 'Business card back');
issues.push(...(await pdf(b, front, '/tmp/claude-1000/-home-sojama-STRAAT-STUDIO/187b30fa-4dbb-4b69-87d4-22cd247057f9/scratchpad/card-front.pdf', 90, 50)));
issues.push(...(await pdf(b, back, '/tmp/claude-1000/-home-sojama-STRAAT-STUDIO/187b30fa-4dbb-4b69-87d4-22cd247057f9/scratchpad/card-back.pdf', 90, 50)));
execFileSync('pdfunite', ['/tmp/claude-1000/-home-sojama-STRAAT-STUDIO/187b30fa-4dbb-4b69-87d4-22cd247057f9/scratchpad/card-front.pdf', '/tmp/claude-1000/-home-sojama-STRAAT-STUDIO/187b30fa-4dbb-4b69-87d4-22cd247057f9/scratchpad/card-back.pdf', path.join(OUT, `${dir}/straat-studio-business-card-90x50mm.pdf`)]);
await b.close();
console.log('ISSUES', JSON.stringify(issues, null, 1));
