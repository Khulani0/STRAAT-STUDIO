import fs from 'node:fs';
import path from 'node:path';
import { OUT, svg, inline, page, C, browser, png, pdf, write, PHONE, SITE } from './lib.mjs';

const dir = 'logo-pack';
const b = await browser();
const issues = [];

// 1. SVG files
write(`${dir}/svg/straat-studio-logo-colour.svg`, svg.colour);
write(`${dir}/svg/straat-studio-logo-white.svg`, svg.white);
write(`${dir}/svg/straat-studio-logo-dark.svg`, svg.dark);
write(`${dir}/svg/straat-studio-mark-colour.svg`, svg.mark);
write(`${dir}/svg/straat-studio-mark-white.svg`, svg.markWhite);
write(`${dir}/svg/straat-studio-mark-dark.svg`, svg.markDark);
write(`${dir}/svg/straat-studio-square-640.svg`, svg.square);
write(`${dir}/svg/favicon.svg`, svg.favicon);

// 2. PNG files: the wide logo at 3 sizes in 3 versions, transparent background
const versions = { colour: svg.colour, white: svg.white, dark: svg.dark };
for (const [name, s] of Object.entries(versions)) {
  for (const w of [300, 600, 1200]) {
    const h = Math.round((w * 40) / 263);
    const html = page(`html,body{background:transparent}`, inline(s, `width:${w}px;height:${h}px`));
    issues.push(...(await png(b, html, path.join(OUT, `${dir}/png/straat-studio-logo-${name}-${w}w.png`), w, h, { transparent: true })));
  }
}
// square 640 (blue background, for WhatsApp and Google profile pictures)
issues.push(...(await png(b, page('', inline(svg.square, 'width:640px;height:640px')), path.join(OUT, `${dir}/png/straat-studio-square-640.png`), 640, 640)));
// mark alone, 3 sizes
for (const w of [128, 256, 512]) {
  const h = Math.round((w * 40) / 64);
  issues.push(...(await png(b, page('html,body{background:transparent}', inline(svg.mark, `width:${w}px;height:${h}px`)), path.join(OUT, `${dir}/png/straat-studio-mark-${w}w.png`), w, h, { transparent: true })));
}
// favicon PNGs, apple touch icon and .ico
for (const s of [16, 32, 48, 180, 512]) {
  issues.push(...(await png(b, page('html,body{background:transparent}', inline(svg.favicon, `width:${s}px;height:${s}px`)), path.join(OUT, `${dir}/favicon/favicon-${s}.png`), s, s, { transparent: true })));
}
fs.copyFileSync(path.join(OUT, `${dir}/favicon/favicon-180.png`), path.join(OUT, `${dir}/favicon/apple-touch-icon.png`));
// .ico (PNG-compressed entries for 16, 32, 48)
{
  const sizes = [16, 32, 48];
  const imgs = sizes.map((s) => fs.readFileSync(path.join(OUT, `${dir}/favicon/favicon-${s}.png`)));
  const head = Buffer.alloc(6); head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4);
  let offset = 6 + 16 * sizes.length; const entries = [];
  sizes.forEach((s, i) => { const e = Buffer.alloc(16); e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(imgs[i].length, 8); e.writeUInt32LE(offset, 12); offset += imgs[i].length; entries.push(e); });
  fs.writeFileSync(path.join(OUT, `${dir}/favicon/favicon.ico`), Buffer.concat([head, ...entries, ...imgs]));
}

// 3. One-page usage guide (A4 PDF)
const swatch = (name, hex, use, dark = false) => `<div class="sw"><div class="chip" style="background:${hex};${hex === '#FFFFFF' ? 'border:1px solid ' + C.line : ''}"></div><div><b>${name}</b><br><span class="mono">${hex}</span><br><span class="sm">${use}</span></div></div>`;
const dont = (label, inner, bg = '#fff') => `<div class="dont"><div class="dbox" style="background:${bg}">${inner}</div><div class="dlab"><span class="no">No</span> ${label}</div></div>`;
const L = (extra = '') => inline(svg.colour, `width:110px;height:auto;${extra}`);
const css = `
@page { size: 210mm 297mm; margin: 0 }
body { width: 210mm; height: 297mm; padding: 14mm 15mm; font-size: 10.5px; line-height: 1.45; position: relative; }
h1 { font-size: 26px; } h2 { font-size: 13px; margin: 0 0 6px; letter-spacing: -0.01em; }
.top { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid ${C.navy}; padding-bottom: 9px; }
.top p { color: ${C.muted}; font-size: 10px; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 22px; margin-top: 14px; }
.box { border: 1px solid ${C.line}; border-radius: 8px; padding: 11px 12px; }
.full { grid-column: 1 / -1; }
.sw { display: flex; gap: 8px; align-items: center; margin-bottom: 6px; } .chip { width: 30px; height: 30px; border-radius: 6px; flex: none; }
.mono { font-family: 'Courier New', monospace; font-size: 10px; } .sm { color: ${C.muted}; font-size: 9.5px; }
.cs { background: ${C.grey}; display: grid; place-items: center; height: 118px; border-radius: 6px; margin-bottom: 8px; }
.csin { position: relative; padding: 17px; border: 1px dashed ${C.blue}; background: #fff; }
.csin::before { content: 'x'; position: absolute; top: 2px; left: 5px; color: ${C.blue}; font-size: 9px; font-weight: 700; }
.donts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.dbox { height: 62px; border: 1px solid ${C.line}; border-radius: 6px; display: grid; place-items: center; overflow: hidden; }
.dlab { margin-top: 4px; font-size: 9.5px; line-height: 1.3; } .no { display: inline-block; background: ${C.ink}; color: #fff; font-weight: 700; font-size: 8.5px; padding: 0 4px; border-radius: 3px; margin-right: 2px; }
.foot { position: absolute; left: 15mm; right: 15mm; bottom: 10mm; display: flex; justify-content: space-between; color: ${C.muted}; font-size: 9.5px; border-top: 1px solid ${C.line}; padding-top: 6px; }
.on { display: flex; gap: 8px; } .on > div { flex: 1; height: 50px; border-radius: 6px; display: grid; place-items: center; }
ul { padding-left: 14px; } li { margin-bottom: 2px; }
`;
const html = page(css, `
<div class="top"><div>${inline(svg.colour, 'width:190px;height:auto')}</div><div style="text-align:right"><h1>Logo guide</h1><p>Straat Studio. One page, plain rules.</p></div></div>
<div class="grid">
  <div class="box"><h2>The logo</h2><p>A blue sign-shaped plate with a white S, and the words Straat Studio in Night navy. Use the files in this pack. Do not redraw it or retype the name.</p><p style="margin-top:6px"><b>Files:</b> colour, white and dark versions, as SVG and PNG. The mark alone is for small squares such as profile pictures.</p></div>
  <div class="box"><h2>Which version to use</h2><div class="on"><div style="background:#fff;border:1px solid ${C.line}">${inline(svg.colour, 'width:86px;height:auto')}</div><div style="background:${C.navy}">${inline(svg.white, 'width:86px;height:auto')}</div><div style="background:${C.grey}">${inline(svg.dark, 'width:86px;height:auto')}</div></div><p style="margin-top:6px" class="sm">Colour on white or light grey. White version on Night navy, Straat blue or dark photos. Dark version when you can print only one colour.</p></div>
  <div class="box"><h2>Clear space</h2><div class="cs"><div class="csin">${L()}</div></div><p>Keep a space of at least <b>x</b> around the logo on every side. x is the height of the blue plate. Put nothing inside it: no text, edges or other logos.</p></div>
  <div class="box"><h2>Minimum size</h2><div class="cs" style="height:118px;display:flex;gap:26px;align-items:center;justify-content:center">${inline(svg.colour, 'width:100px;height:auto')}${inline(svg.mark, 'width:32px;height:auto')}</div><ul><li>Full logo: <b>100 px</b> wide on screen, <b>25 mm</b> wide in print.</li><li>Mark alone: <b>24 px</b> on screen, <b>8 mm</b> in print.</li></ul></div>
  <div class="box"><h2>Colours</h2>${swatch('Straat blue', '#2F54EB', 'The plate, buttons and links')}${swatch('Night navy', '#0F1B2D', 'The wordmark and dark backgrounds')}${swatch('White', '#FFFFFF', 'The S and light backgrounds')}</div>
  <div class="box"><h2>Support colours and type</h2>${swatch('Ink', '#14161A', 'Body text on white')}${swatch('Cool grey', '#F3F5F8', 'Light background bands')}${swatch('Light blue tint', '#8EA8FF', 'Small marks on Night navy')}<p class="sm" style="margin-top:2px">Typeface: <b>Inter</b>. Headings in weight 800, body text in weight 400.</p></div>
  <div class="box full"><h2>What not to do</h2><div class="donts">
    ${dont('Do not stretch or squash it', inline(svg.colour, 'width:120px;height:46px;transform:scaleX(1.0);') .replace('<svg ', '<svg preserveAspectRatio="none" '))}
    ${dont('Do not change the colours', inline(svg.colour.replace(/#2F54EB/g, '#E4572E').replace(/#0F1B2D/g, '#7A3FD0'), 'width:100px;height:auto'))}
    ${dont('Do not rotate it', inline(svg.colour, 'width:100px;height:auto;transform:rotate(-14deg)'))}
    ${dont('Do not place it on a busy or low-contrast background', inline(svg.colour, 'width:100px;height:auto'), 'repeating-linear-gradient(45deg,#3a5bd9 0 8px,#2a46b8 8px 16px)')}
    ${dont('Do not add shadows or outlines', inline(svg.colour, 'width:100px;height:auto;filter:drop-shadow(3px 3px 2px rgba(0,0,0,.6))'))}
    ${dont('Do not crop the plate or the name', `<div style="width:60px;overflow:hidden">${inline(svg.colour, 'width:120px;height:auto')}</div>`)}
    ${dont('Do not use the white version on white', inline(svg.white, 'width:100px;height:auto'))}
    ${dont('Do not add new words next to it', `<div style="display:flex;align-items:center;gap:6px">${inline(svg.mark, 'width:30px;height:auto')}<span style="font-weight:800;font-size:13px">Straat Studio Pro</span></div>`)}
  </div></div>
</div>
<div class="foot"><span>Straat Studio is a trading name of STRAATTECH (Pty) Ltd.</span><span>${SITE} · ${PHONE}</span></div>
`, 'Straat Studio logo guide');
fs.writeFileSync(path.join(OUT, '_build/logo-guide.html'), html);
issues.push(...(await pdf(b, html, path.join(OUT, `${dir}/straat-studio-logo-guide.pdf`), 210, 297)));
await b.close();
console.log('ISSUES', JSON.stringify(issues, null, 1));
