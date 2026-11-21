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
  { slug: 'fazila', name: "Fazila's Kitchen", blurb: 'Home baker in Mitchells Plain. Sample menu with an Order on WhatsApp button on every product.', pkgKey: 'catalogue',
    desktopAlt: "Concept site for Fazila's Kitchen on a laptop: a sample menu of three products, each with an Order on WhatsApp button.",
    phoneAlt: "Concept site for Fazila's Kitchen on a phone: two sample products with Order on WhatsApp buttons." },
  { slug: 'thandeka', name: 'Thandeka Hair Studio', blurb: 'Salon in Soweto. Sample prices, hours, areas and WhatsApp booking, all on one page.', pkgKey: 'onePage',
    desktopAlt: 'Home page of the Thandeka Hair Studio concept site on a laptop: the headline Braids, twists and natural hair, done with care, and a photo of copper-coloured twists.',
    phoneAlt: 'Home page of the Thandeka Hair Studio concept site on a phone, with a Book on WhatsApp button.' },
  { slug: 'ndlovu', name: 'Ndlovu Electrical', blurb: 'Five pages for an electrician in Athlone: services, areas served and a demo quote form.', pkgKey: 'business',
    desktopAlt: 'Home page of the Ndlovu Electrical concept site on a laptop: the headline Lights on. Breakers steady. Done right., and a photo of an open junction box.',
    phoneAlt: 'Home page of the Ndlovu Electrical concept site on a phone, with a Chat on WhatsApp button.' },
] as const;
