/**
 * Single source of truth for every business fact on the site.
 * Change a value here and it updates everywhere.
 *
 * PLACEHOLDER that blocks `npm run build` until resolved:
 *  - emailForwardingReady: set to true once Cloudflare email routing for
 *    hello@straatstudio.co.za is set up and tested.
 */

export const business = {
  name: 'Straat Studio',
  legalName: 'STRAATTECH (Pty) Ltd',
  regNumber: '2026/409104/07',
  siteUrl: 'https://straatstudio.co.za',
  locale: 'en-ZA',
  city: 'Cape Town',
  region: 'Western Cape',
  country: 'ZA',

  // WhatsApp and phone: same number. Digits only, international format, no plus.
  phoneDigits: '27682264586',
  phoneDisplay: '068 226 4586',

  email: 'hello@straatstudio.co.za',
  // PLACEHOLDER FLAG: the email address is a placeholder until Cloudflare email
  // routing is set up. Change to true once forwarding works. The build fails until then.
  emailForwardingReady: false,

  // Owner must approve before an address is shown or put in JSON-LD.
  address: null as null | {
    street: string;
    suburb: string;
    postalCode: string;
  },
} as const;

/** True while any placeholder contact detail is still in place. */
export const hasPlaceholders =
  business.phoneDigits.includes('X') ||
  !business.emailForwardingReady ||
  business.regNumber.startsWith('PLACEHOLDER');

export const phoneHref = `tel:+${business.phoneDigits}`;

/** WhatsApp link with a pre-filled message. Pass a message per page. */
export function whatsappHref(message: string): string {
  return `https://wa.me/${business.phoneDigits}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage =
  "Hi Straat Studio, I'd like a free homepage preview for my business.";

export const emailHref = `mailto:${business.email}`;

export const footerLegalLine = `${business.name} is a trading name of ${business.legalName}, Reg. ${business.regNumber}`;

/** Prices in rand. Format with formatRand(). */
export const prices = {
  websites: {
    onePage: { name: 'One-Page', price: 999 },
    business: { name: 'Business', price: 2499 },
    catalogue: { name: 'Catalogue', price: 2999 },
    launchPack: { name: 'Launch Pack', price: 3299 },
  },
  monthly: {
    care: { name: 'Straat Care', price: 99 },
    leads: { name: 'Straat Leads', price: 249 },
    growth: { name: 'Straat Growth', price: 449 },
  },
  payMonthly: {
    setup: 499,
    monthlyFor12Months: 449, // Business + Leads
    monthlyAfter: 249,
    months: 12,
    includes: 'Business + Leads',
  },
  extras: {
    logo: { name: 'Logo', price: 300 },
    posters: { name: '3 posters', price: 350 },
    whatsappSetup: { name: 'WhatsApp setup', price: 250 },
    googleBusinessProfile: { name: 'Google Business Profile', price: 250 },
    mailbox: { name: 'Full email mailbox', price: 250 },
  },
  /** Founding offer: Business website price for the first 3 clients. */
  foundingOfferPrice: 1249,
  foundingOfferClients: 3,
  /** Extra change beyond the 2 included rounds, during the build. */
  extraChangeDuringBuild: 150,
  /** Single change after launch, for sites without Straat Care. */
  singleChangeAfterLaunch: 100,
  /** Year 2 hosting and domain without a plan, per year. */
  year2HostingAndDomain: 999,
  /** Lowest and highest website price, used for JSON-LD priceRange. */
  priceRange: 'R999 to R3299',
} as const;

export function formatRand(amount: number): string {
  // Comma thousands separator, matching the approved copy: R2,499
  const digits = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `R${digits}`;
}
