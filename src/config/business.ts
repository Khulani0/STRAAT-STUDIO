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
  phoneDigits: '27846946588',
  phoneDisplay: '084 694 6588',

  email: 'hello@straatstudio.co.za',
  // hello@straatstudio.co.za is live (Cloudflare Email Routing, tested on 18 November 2026),
  // so this flag is true.
  emailForwardingReady: true,

  // Business hours (confirmed by the owner, 18 November 2026). Times are 24-hour, South African time.
  hours: {
    openDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '08:00',
    closes: '18:00',
    closedDays: ['Sunday'],
  },

  // Owner must approve before an address is shown or put in JSON-LD.
  address: null as null | {
    street: string;
    suburb: string;
    postalCode: string;
  },
} as const;

/**
 * True: the PAIA manual is published (owner confirmed on 18 November 2026), so the footer link and sitemap entry show and the page is indexable.
 * Set to false to hide the link and sitemap entry and mark the page noindex.
 */
export const paiaPublished = true;

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
    launchPack: { name: 'Launch Pack', price: 3099 },
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
    posters: { name: 'Poster pack (3)', price: 350 },
    googleBusinessProfile: { name: 'Google Business Profile setup or fix', price: 250 },
    mailbox: { name: 'Mailbox setup', price: 250 },
    extraPage: { name: 'Extra page', price: 250 },
  },
  /** Extra change beyond the 2 included rounds, during the build. */
  extraChangeDuringBuild: 150,
  /** Single change after launch, for sites without Straat Care. */
  singleChangeAfterLaunch: 100,
  /** Year 2 hosting and domain without a plan, per year. */
  year2HostingAndDomain: 999,
  /** Lowest and highest website price, used for JSON-LD priceRange. */
  priceRange: 'R999 to R3,099',
} as const;

/** Working days we aim to take to go live, counted from when we have all of the client's content. */
export const deliveryDays = { onePage: 3, business: 5, catalogue: 7, launchPack: 5 } as const;

/** One sentence for every delivery line on the site. Pass a number, or a range such as '3 to 7'. */
export function deliveryLine(days: number | string): string {
  return `We aim to have it live within ${days} working days after we have all your content`;
}

/** Maximum number of pages in each website package. */
export const maxPages = { onePage: 1, business: 5, catalogue: 8, launchPack: 5 } as const;

export function formatRand(amount: number): string {
  // Comma thousands separator, matching the approved copy: R2,499
  const digits = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `R${digits}`;
}
