/**
 * Single source of truth for every business fact on the site.
 * Change a value here and it updates everywhere.
 *
 * PLACEHOLDERS: phone, email and regNumber below must be replaced by the
 * owner before launch. Search for "PLACEHOLDER" to find them.
 */

export const business = {
  name: 'Straat Studio',
  legalName: 'STRAATTECH (PTY) LTD',
  regNumber: 'PLACEHOLDER-REG-NUMBER', // PLACEHOLDER: company registration number
  siteUrl: 'https://straatstudio.co.za',
  locale: 'en-ZA',
  city: 'Cape Town',
  region: 'Western Cape',
  country: 'ZA',

  // PLACEHOLDER: digits only, international format, no plus. Example shape: 27821234567
  phoneDigits: '27XXXXXXXXX',
  // PLACEHOLDER: real business email
  email: 'hello@example.invalid',

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
  business.email.endsWith('.invalid') ||
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
  /** Year 2 hosting and domain without a plan, per year. */
  year2HostingAndDomain: 999,
  /** Lowest and highest website price, used for JSON-LD priceRange. */
  priceRange: 'R999 to R2999',
} as const;

export function formatRand(amount: number): string {
  // Non-breaking space as thousands separator, South African style: R2 499
  const digits = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `R${digits}`;
}
