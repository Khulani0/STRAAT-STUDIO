import fs from 'node:fs';
import path from 'node:path';
import { OUT, svg, inline, page, C, browser, pdf, PHONE, SITE, EMAIL } from './lib.mjs';

const b = await browser();
const css = `
@page { size: 148mm 210mm; margin: 0 }
body { width: 148mm; height: 210mm; padding: 16mm 15mm 0; position: relative; }
h1 { font-size: 34px; margin-top: 18mm; max-width: 11ch; }
.lead { font-size: 15px; line-height: 1.55; color: ${C.muted}; margin-top: 7mm; max-width: 34ch; }
.qr { margin: 12mm auto 0; width: 50mm; height: 50mm; border: 2px dashed ${C.blue}; border-radius: 4mm; display: grid; place-items: center; text-align: center; color: ${C.blueDark}; font-weight: 700; font-size: 13px; line-height: 1.3; padding: 4mm; }
.scan { text-align: center; font-size: 13px; color: ${C.muted}; margin-top: 4mm; }
.foot { position: absolute; left: 0; right: 0; bottom: 0; background: ${C.navy}; color: #fff; padding: 7mm 15mm; display: flex; justify-content: space-between; align-items: center; }
.foot b { font-size: 17px; letter-spacing: -0.02em; } .foot span { color: ${C.onNavy}; font-size: 12px; }
`;
const html = page(css, `
${inline(svg.colour, 'width:56mm;height:auto')}
<h1>Thank you for choosing Straat Studio.</h1>
<p class="lead">If you are happy with your website, a short Google review helps other business owners know what to expect. An honest review is all we ask for.</p>
<div class="qr">QR code<br>goes here</div>
<p class="scan">Scan with your phone camera to leave a review.</p>
<div class="foot"><div><b>${PHONE}</b><br><span>WhatsApp or call</span></div><span>${SITE}</span></div>
`, 'Thank-you card A5');
fs.writeFileSync(path.join(OUT, '_build/thank-you-card.html'), html);
const issues = await pdf(b, html, path.join(OUT, 'review-kit/thank-you-card-a5.pdf'), 148, 210);
await b.close();
console.log('ISSUES', JSON.stringify(issues));
