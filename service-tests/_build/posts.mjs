import fs from 'node:fs';
import path from 'node:path';
import { OUT, svg, inline, page, C, browser, png, write, PHONE, SITE, prices, R, deliveryDays } from './lib.mjs';

const w = prices.websites;
const wa = `WhatsApp ${PHONE}`;
const cta = `Message us on ${wa}.`;
// Twelve plain posts for December 2026 (Monday, Wednesday and Friday). Nothing here is a result, a client or a statistic.
const posts = [
  { date: '2026-12-02', ch: 'Facebook', theme: 'white', label: 'Free preview', h: 'See your homepage free, before you pay.', b: 'Send us your business name, what you do and where. We aim to send your preview within 2 working days after you send us your business details.', cap: `See your homepage free, before you pay. Send us your business name, what you do and where. We aim to send your preview within 2 working days after you send us your business details. ${cta}` },
  { date: '2026-12-04', ch: 'Instagram', theme: 'navy', label: 'Prices', h: 'Prices on the page, not after a meeting.', b: 'Once-off and final, with no VAT added. Every package includes a .co.za domain, first-year hosting, the words written for you and 2 rounds of changes.', cap: `Prices on the page, not after a meeting. Once-off and final, with no VAT added. Every package includes a .co.za domain, first-year hosting, the words written for you and 2 rounds of changes. Websites from ${R(w.onePage.price)}. See every price at ${SITE}/prices/` },
  { date: '2026-12-07', ch: 'Facebook', theme: 'blue', label: 'How it works', h: 'What a WhatsApp button does.', b: 'A customer taps it. WhatsApp opens with your number and a message already typed. They only press send.', cap: `What a WhatsApp button on your website does: a customer taps it, WhatsApp opens with your number and a message already typed, and they only press send. Every website we build has one. ${cta}` },
  { date: '2026-12-09', ch: 'Instagram', theme: 'grey', label: 'Small things', h: 'Make your phone number tap to call.', b: 'On a phone, a number that is only text has to be copied by hand. A number that taps to call does not.', cap: `On a phone, a number that is only text has to be copied by hand. A number that taps to call does not. Every website we build has call and WhatsApp buttons. See how at ${SITE}` },
  { date: '2026-12-11', ch: 'Facebook', theme: 'white', label: `One-Page, ${R(w.onePage.price)}`, h: 'One page with everything customers ask.', b: `Your services, prices, hours and a map, call and WhatsApp buttons and an enquiry form. We aim to have it live within ${deliveryDays.onePage} working days after we have all your content.`, cap: `One-Page website, ${R(w.onePage.price)}, once-off and final. Your services, prices, hours and a map, call and WhatsApp buttons and an enquiry form on one page. We aim to have it live within ${deliveryDays.onePage} working days after we have all your content. ${cta}` },
  { date: '2026-12-14', ch: 'Instagram', theme: 'navy', label: `Business, ${R(w.business.price)}`, h: 'Up to 5 pages for your trade.', b: `A photo gallery, a quote form, your Google Business Profile set up and WhatsApp Business set up. We aim to have it live within ${deliveryDays.business} working days after we have all your content.`, cap: `Business website, ${R(w.business.price)}, once-off and final. Up to 5 pages, a photo gallery, a quote form, your Google Business Profile set up and WhatsApp Business set up. We aim to have it live within ${deliveryDays.business} working days after we have all your content. ${cta}` },
  { date: '2026-12-16', ch: 'Facebook', theme: 'blue', label: `Launch Pack, ${R(w.launchPack.price)}`, h: 'Starting from nothing? Start here.', b: 'The Business website plus a logo with 3 options, 3 social media posters and WhatsApp Business setup.', cap: `Launch Pack, ${R(w.launchPack.price)}, once-off and final. The Business website plus a logo with 3 options, 3 social media posters and WhatsApp Business setup. We aim to have it live within ${deliveryDays.launchPack} working days after we have all your content. ${cta}` },
  { date: '2026-12-18', ch: 'WhatsApp status', theme: 'concept', label: 'Concept project, not commissioned client work', h: 'Concept example: Ndlovu Electrical.', b: 'A made-up electrician in Athlone, built to show our standard. Five pages, services, areas served and a demo quote form.', cap: `Concept example: Ndlovu Electrical. This is a concept project, not commissioned client work. A made-up electrician in Athlone, built to show our standard: five pages, services, areas served and a demo quote form. See it at https://ndlovu-electrical-concept.pages.dev/` },
  { date: '2026-12-21', ch: 'Facebook', theme: 'grey', label: 'Delivery', h: 'How long does it take?', b: 'We aim to have it live within 3 to 7 working days after we have all your content, depending on the package. The clock starts when your content arrives.', cap: `How long does a website take? We aim to have it live within 3 to 7 working days after we have all your content, depending on the package. The clock starts when your content arrives. ${cta}` },
  { date: '2026-12-23', ch: 'Instagram', theme: 'white', label: 'Ownership', h: 'You own your domain.', b: 'Your domain is registered in your name. The website and its files become yours when the final payment is made, with a handover guide.', cap: `You own your domain. It is registered in your name. The website and its files become yours when the final payment is made, with a handover guide. Read our terms at ${SITE}/terms/` },
  { date: '2026-12-28', ch: 'Facebook', theme: 'navy', label: 'Who we build for', h: 'Websites for trades and small businesses.', b: 'Electricians, plumbers, salons and home bakers. We have a separate page for each of them on our website.', cap: `We build websites for trades and small businesses across South Africa. We have a separate page for electricians, plumbers, salons and home bakers at ${SITE}. ${cta}` },
  { date: '2026-12-30', ch: 'Instagram', theme: 'blue', label: 'Free preview', h: 'Get your free homepage preview.', b: `Message us on WhatsApp with your business name, what you do and where. Number: ${PHONE}.`, cap: `Get your free homepage preview. Message us on ${wa} with your business name, what you do and where. You see your homepage before you pay anything.` },
];

const themes = {
  white: { bg: '#fff', fg: C.ink, sub: C.muted, label: C.blue, logo: svg.colour, chip: C.tint, chipFg: C.blueDark },
  grey: { bg: C.grey, fg: C.ink, sub: C.muted, label: C.blue, logo: svg.colour, chip: C.tint, chipFg: C.blueDark },
  navy: { bg: C.navy, fg: '#fff', sub: C.onNavy, label: C.tintOnNavy, logo: svg.white, chip: 'rgba(255,255,255,.12)', chipFg: '#fff' },
  blue: { bg: C.blue, fg: '#fff', sub: '#EAF0FF', label: '#DCE5FF', logo: svg.white, chip: 'rgba(255,255,255,.18)', chipFg: '#fff' },
  concept: { bg: C.navy2, fg: '#fff', sub: C.onNavy, label: C.navy, logo: svg.white, chip: C.tintOnNavy, chipFg: C.navy },
};
const card = (p) => {
  const t = themes[p.theme];
  return page(`
body { width: 1080px; height: 1080px; background: ${t.bg}; color: ${t.fg}; position: relative; overflow: hidden; }
.in { position: absolute; inset: 90px; display: flex; flex-direction: column; justify-content: space-between; }
.label { display: inline-block; align-self: flex-start; background: ${t.chip}; color: ${p.theme === 'concept' ? t.chipFg : t.label === C.blue || t.label === C.tintOnNavy ? t.chipFg : t.chipFg}; font-weight: 800; font-size: ${p.theme === 'concept' ? 34 : 30}px; letter-spacing: ${p.theme === 'concept' ? 0 : '.06em'}; text-transform: ${p.theme === 'concept' ? 'none' : 'uppercase'}; padding: 12px 24px; border-radius: 999px; line-height: 1.25; }
h1 { font-size: 96px; margin-top: 48px; max-width: 12ch; color: ${t.fg}; }
.b { font-size: 38px; line-height: 1.42; color: ${t.sub}; margin-top: 38px; max-width: 30ch; }
.ft { display: flex; justify-content: space-between; align-items: center; }
.ft span { font-size: 32px; font-weight: 600; color: ${t.sub}; }
`, `<div class="in"><div><div class="label">${p.label}</div><h1>${p.h}</h1><p class="b">${p.b}</p></div><div class="ft">${inline(t.logo, 'width:330px;height:auto')}<span>${SITE}</span></div></div>`);
};

const b = await browser();
const issues = [];
const rows = [['date', 'channel', 'text', 'image_file']];
let txt = '';
for (let i = 0; i < posts.length; i++) {
  const p = posts[i];
  const n = String(i + 1).padStart(2, '0');
  const file = `post-${n}-${p.date}.png`;
  issues.push(...(await png(b, card(p), path.join(OUT, `posts-sample-month/images/${file}`), 1080, 1080)).map((x) => `${file}: ${x}`));
  rows.push([p.date, p.ch, p.cap, `images/${file}`]);
  txt += `POST ${n} | ${p.date} | ${p.ch}\n${p.cap}\nImage: images/${file}\n\n`;
}
const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n') + '\r\n';
write('posts-sample-month/posting-calendar.csv', csv);
write('posts-sample-month/posts.txt', txt);
await b.close();
console.log('ISSUES', JSON.stringify(issues, null, 1));
