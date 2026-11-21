import { prices, maxPages, deliveryDays } from './business';

/** What each website package includes. Prices, page limits and delivery days all come from business.ts. */
const w = prices.websites;
export const packages = [
  {
    key: 'onePage', pkg: w.onePage, pages: `${maxPages.onePage} page`, live: deliveryDays.onePage, pay: 'Paid in full to start',
    forWho: 'New businesses and sellers who need one link that explains everything.',
    items: ['Services, prices, hours, map', 'Call, WhatsApp and enquiry form', 'info@ email address that can forward to your Gmail', 'WhatsApp Business starter sheet (ready-to-paste texts)'],
    description: 'A one-page website with services, prices, hours, a map, call and WhatsApp buttons, an enquiry form and a WhatsApp Business starter sheet.',
  },
  {
    key: 'business', pkg: w.business, pages: `Up to ${maxPages.business} pages`, live: deliveryDays.business, pay: '50% to start, 50% before it goes live', featured: true,
    forWho: 'Trades and service businesses that want a page for every service, so Google can match each search to the right page.',
    items: [`Up to ${maxPages.business} pages`, 'Photo gallery and quote form', 'Google Business Profile set up', 'WhatsApp Business setup (ready-to-paste texts plus one guided call)', 'Everything in One-Page'],
    description: `A website of up to ${maxPages.business} pages with a photo gallery, a quote form, Google Business Profile set up and WhatsApp Business setup.`,
  },
  {
    key: 'catalogue', pkg: w.catalogue, pages: `Up to ${maxPages.catalogue} pages`, live: deliveryDays.catalogue, pay: '50% to start, 50% before it goes live',
    forWho: 'Bakers, caterers and shops who change products and prices often.',
    items: [`Up to ${maxPages.catalogue} pages`, 'Up to 30 products you update in a Google Sheet, live within minutes', 'WhatsApp order buttons', 'Optional PayFast or Yoco', 'WhatsApp Business setup (ready-to-paste texts plus one guided call)', 'Everything in Business'],
    description: `A website of up to ${maxPages.catalogue} pages with a product catalogue of up to 30 products that you update in a Google Sheet, WhatsApp order buttons and WhatsApp Business setup.`,
  },
  {
    key: 'launchPack', pkg: w.launchPack, pages: `Up to ${maxPages.launchPack} pages`, live: deliveryDays.launchPack, pay: '50% to start, 50% before it goes live',
    forWho: 'Starting from scratch? The Business website plus everything around it.',
    items: [`Business website, up to ${maxPages.launchPack} pages`, 'Logo, 3 options', '3 social media posters', 'WhatsApp Business setup'],
    description: `The Business website (up to ${maxPages.launchPack} pages) plus a logo with 3 options, 3 social media posters and WhatsApp Business setup.`,
  },
] as const;

/** The three concept projects. Concept projects, not commissioned client work. */
export const examples = [
  { slug: 'fazilas-kitchen', liveUrl: 'https://fazilas-kitchen-concept.pages.dev/', img: 'fazila', name: "Fazila's Kitchen", line: 'A home baker in Mitchells Plain with a catalogue and Order on WhatsApp buttons.', pkgKey: 'catalogue',
    brief: "Fazila's Kitchen is a made-up home baker in Mitchells Plain, Cape Town. She sells cakes, cupcakes, savoury platters and treats boxes, and customers currently ask for prices in chats. The site needed to show every product with a price, let a customer order in one tap on WhatsApp, and say clearly when orders close.",
    includes: ['5 pages: Home, Our cakes and treats, How to order, About and Contact', '16 sample products in 4 categories, with a filter to show one category at a time', 'An Order on WhatsApp button on every product that names the product', 'A How to order page with the order cut-off and sample delivery areas and fees', 'Credited stock photos, each captioned as an illustrative photo'],
    desktopAlt: "Home page of the Fazila's Kitchen concept site on a laptop: the headline Baked fresh, made for sharing, and a photo of a chocolate ring cake.",
    phoneAlt: "Home page of the Fazila's Kitchen concept site on a phone, with a Chat on WhatsApp button." },
  { slug: 'thandeka-hair-studio', liveUrl: 'https://thandeka-hair-studio-concept.pages.dev/', img: 'thandeka', name: 'Thandeka Hair Studio', line: 'A Soweto salon on one page: prices, hours, area and booking by WhatsApp.', pkgKey: 'onePage',
    brief: 'Thandeka Hair Studio is a made-up hair salon in Soweto, Johannesburg. It does braids, twists and natural hair care by appointment. The site needed to put prices, opening hours and the areas served in one place, and make booking as simple as sending a WhatsApp message.',
    includes: ['One page with anchored sections: Services and sample prices, Gallery, Hours and area, Book on WhatsApp', 'A sample price list of 7 services, each with its own Book on WhatsApp button that names the service', 'A gallery of 14 credited stock photos', 'Opening hours and 9 areas served', 'A one-page menu that works on a phone'],
    desktopAlt: 'Home page of the Thandeka Hair Studio concept site on a laptop: the headline Braids, twists and natural hair, done with care, and a photo of copper-coloured twists.',
    phoneAlt: 'Home page of the Thandeka Hair Studio concept site on a phone, with a Book on WhatsApp button.' },
  { slug: 'ndlovu-electrical', liveUrl: 'https://ndlovu-electrical-concept.pages.dev/', img: 'ndlovu', name: 'Ndlovu Electrical', line: 'An Athlone electrician with service pages, areas served and a demo quote form.', pkgKey: 'business',
    brief: 'Ndlovu Electrical is a made-up electrician in Athlone, Cape Town. It does fault finding, DB board upgrades and certificates of compliance. The site needed to explain each job in plain words, show which suburbs it covers, and make asking for a quote easy.',
    includes: ['5 pages: Home, Services, About, Our work and Contact', '6 service descriptions, including fault finding, DB board upgrades and certificates of compliance', 'Athlone and 8 nearby suburbs listed as areas served', 'A four-step "how we work" section', 'A demo quote form with job type, suburb, description, name, phone, preferred contact and a consent box. It says "Demo form. Nothing is sent." and sends nothing'],
    desktopAlt: 'Home page of the Ndlovu Electrical concept site on a laptop: the headline Lights on. Breakers steady. Done right., and a photo of an open junction box.',
    phoneAlt: 'Home page of the Ndlovu Electrical concept site on a phone, with a Chat on WhatsApp button.' },
] as const;
