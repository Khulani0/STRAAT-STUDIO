// Builds service-tests/starter-sheet/ for Straat Studio itself. Facts come from src/config/business.ts and the live site wording only.
import { business, prices, R, deliveryLine, maxPages, cfg, write } from './lib.mjs';
const { defaultWhatsappMessage, whatsappHref } = cfg;

const w = prices.websites;
const m = prices.monthly;
const h = business.hours;
const hoursText = `Monday to Saturday, ${h.opens} to ${h.closes}. Closed on Sunday. South African time.`;
const site = business.siteUrl.replace('https://', '');

const short = `Websites for trades and small businesses across South Africa. See your homepage free before you pay. Final prices from ${R(w.onePage.price)}, no VAT. Based in Cape Town.`;
const long = `Straat Studio builds fixed-price websites for trades and small businesses across South Africa, such as electricians, plumbers, salons and home bakers. You see your homepage free, before you pay anything. Every package includes a .co.za domain, first-year hosting, the words written for you and 2 rounds of changes. Prices are once-off and final, with no VAT added: One-Page ${R(w.onePage.price)}, Business ${R(w.business.price)} and Launch Pack ${R(w.launchPack.price)}. You own your domain. Message us on WhatsApp on ${business.phoneDisplay} with your business name, what you do and where. Straat Studio is a trading name of ${business.legalName}, based in Cape Town.`;

const services = [
  `Free homepage preview: you see your homepage before you pay`,
  `One-Page website, ${R(w.onePage.price)}: your services, prices, hours and a map, call and WhatsApp buttons and an enquiry form on one page`,
  `Business website, ${R(w.business.price)}: up to ${maxPages.business} pages, a photo gallery and a quote form`,
  `Launch Pack, ${R(w.launchPack.price)}: the Business website plus extras for a business starting from scratch (ask us what is included)`,
  `Catalogue website, ${R(w.catalogue.price)}: coming soon, ask us on WhatsApp`,
  `Enquiry alerts (Straat Leads), ${R(m.leads.price)} a month, optional: a quote form on your site and an email alert to you for each enquiry`,
];

const faqs = [
  ['How much does a website cost?', `${w.onePage.name} is ${R(w.onePage.price)}, ${w.business.name} is ${R(w.business.price)} and ${w.launchPack.name} is ${R(w.launchPack.price)}. Prices are once-off and final, with no VAT added. Every package includes a .co.za domain, first-year hosting, the words written for you and 2 rounds of changes. The ${w.catalogue.name} package (${R(w.catalogue.price)}) is coming soon.`],
  ['How does the free preview work?', `Send us your business name, what you do and where. We aim to send your homepage preview within 2 working days after you send us your business details. You see it before you pay anything, and you decide whether to carry on.`],
  ['How long does a website take?', `${deliveryLine('3 to 7')}, depending on the package. The clock starts when we have received everything we asked for.`],
  ['Do I own my domain and website?', `Yes. Your domain is registered in your name after you pay. The website and its files become yours when the final payment is made, with a handover guide.`],
  ['Can I cancel a monthly plan?', `Monthly plans are optional. You can cancel at any time. Cancellation takes effect at the end of the month you have already paid for. Your website stays yours either way.`],
];

let profile = `STRAAT STUDIO: BUSINESS PROFILE TEXT
Use for the Google Business Profile, WhatsApp Business profile and social media bios. Every fact comes from ${site} and src/config/business.ts. Check the prices there before you paste.

SHORT DESCRIPTION (${short.length} characters, fits the WhatsApp Business limit of 256)
${short}

LONG DESCRIPTION (${long.length} characters, fits the Google Business Profile limit of 750)
${long}

SERVICES
${services.map((s) => '- ' + s).join('\n')}

HOURS
${hoursText}

PHONE AND WHATSAPP
${business.phoneDisplay} (WhatsApp and calls)

WEBSITE AND EMAIL
${business.siteUrl}
${business.email}

LOCATION TEXT
Based in Cape Town. Serving all of South Africa. No street address is shown.

FIVE FAQ ANSWERS
${faqs.map(([q, a], i) => `${i + 1}. ${q}\n${a}`).join('\n\n')}
`;
write('starter-sheet/business-profile.txt', profile);

const clickLink = whatsappHref(defaultWhatsappMessage);
const plainLink = `https://wa.me/${business.phoneDigits}`;
const wa = `STRAAT STUDIO: WHATSAPP BUSINESS TEXTS
Paste each text into WhatsApp Business. Greeting and away message: Settings, Business tools. Quick replies: Settings, Business tools, Quick replies (type the shortcut after a slash in a chat).

GREETING MESSAGE (sent to new customers)
Hi, thank you for messaging Straat Studio. We build fixed-price websites for trades and small businesses in South Africa. Tell us your business name, what you do and where, and we will prepare your free homepage preview.

AWAY MESSAGE (sent outside our hours)
Thank you for your message. We are away right now. Our hours are ${hoursText} We will read your message when we are back.

QUICK REPLY 1: shortcut /preview
Here is how the free preview works. Send us your business name, what you do and where. We aim to send your homepage preview within 2 working days after you send us your business details. You see it before you pay anything.

QUICK REPLY 2: shortcut /prices
Our website prices are once-off and final, with no VAT added: ${w.onePage.name} ${R(w.onePage.price)}, ${w.business.name} ${R(w.business.price)} and ${w.launchPack.name} ${R(w.launchPack.price)}. Every package includes a .co.za domain, first-year hosting, the words written for you and 2 rounds of changes. All prices: ${business.siteUrl}/prices/

QUICK REPLY 3: shortcut /time
${deliveryLine('3 to 7')}, depending on the package. The clock starts when we have received everything we asked for.

QUICK REPLY 4: shortcut /ownership
Your domain is registered in your name after you pay. The website and its files become yours when the final payment is made, with a handover guide.

QUICK REPLY 5: shortcut /hours
Our hours are ${hoursText}

CLICK-TO-CHAT LINK (opens WhatsApp with this message typed in, ready to send)
${clickLink}
Message in the link: "${defaultWhatsappMessage}"

PLAIN LINK (opens a chat with no message)
${plainLink}
`;
write('starter-sheet/whatsapp-business-texts.txt', wa);

write('starter-sheet/README.txt', `Starter sheet for Straat Studio

Files:
- business-profile.txt: short and long description, services list, hours text and 5 FAQ answers.
- whatsapp-business-texts.txt: greeting, away message, 5 quick replies and the click-to-chat link.

Where each fact comes from: prices, hours, phone number and delivery wording from src/config/business.ts; the free preview, domain ownership and cancellation wording from the pages /prices/, /terms/, /how-it-works/ and the call-to-action band on the site. Nothing here is a year, a result, a number of clients or a promise of reply speed.

Before you paste: 1) check the Catalogue is still marked coming soon; 2) the Launch Pack line says "ask us what is included" and the Enquiry alerts line describes the service as the site does, so drop those two if you do not want to offer them yet (see docs/service-audit.md); 3) the Business package line says up to 5 pages, a photo gallery and a quote form only.
`);
console.log(profile.length, wa.length, short.length, long.length);
