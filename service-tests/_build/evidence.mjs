import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { OUT, page, C, browser, png } from './lib.mjs';

const tmp = '/tmp/claude-1000/-home-sojama-STRAAT-STUDIO/187b30fa-4dbb-4b69-87d4-22cd247057f9/scratchpad/ev';
fs.mkdirSync(tmp, { recursive: true });
fs.mkdirSync(path.join(OUT, 'evidence'), { recursive: true });
const rast = (pdfFile, name, dpi) => execFileSync('pdftoppm', ['-r', String(dpi), '-png', path.join(OUT, pdfFile), path.join(tmp, name)]);
rast('logo-pack/straat-studio-logo-guide.pdf', 'guide', 110);
rast('poster-pack/straat-studio-poster-a4.pdf', 'poster', 110);
rast('poster-pack/straat-studio-business-card-90x50mm.pdf', 'card', 250);
rast('review-kit/thank-you-card-a5.pdf', 'ty', 130);

const b = await browser();
// review kit messages as an image
const msg = (f) => fs.readFileSync(path.join(OUT, 'review-kit', f), 'utf8').replace(/&/g, '&amp;').replace(/</g, '&lt;');
const html = page(`body{width:1200px;background:${C.grey};padding:30px;display:grid;grid-template-columns:1fr 1fr;gap:24px;font-size:19px;line-height:1.5}
.m{background:#fff;border:1px solid ${C.line};border-radius:14px;padding:22px;white-space:pre-wrap}h3{font-size:15px;color:${C.blue};text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px}`,
  `<div class="m"><h3>01 Review request</h3>${msg('01-whatsapp-review-request.txt')}</div><div class="m"><h3>02 Follow-up</h3>${msg('02-whatsapp-follow-up.txt')}</div>`);
await png(b, html, path.join(tmp, 'messages.png'), 1260, 560);
await b.close();
console.log('ok');
