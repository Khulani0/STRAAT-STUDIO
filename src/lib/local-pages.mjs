// Rules for local service pages (the page type behind Straat Growth). A page is only built when "approved" is true.
// The same rules run in the Astro page (the build fails if an approved page breaks them) and in tools/local-page.mjs.
export const MIN_WORDS = 500;
const BANNED = ['best', 'fastest', 'guaranteed', 'number 1', 'no. 1', 'leading', 'trusted by', 'cheapest', 'first page of google', 'unhackable'];

export function wordsOf(p) {
  const parts = [p.h1, p.lead, ...(p.sections || []).flatMap((s) => [s.heading, ...(s.paragraphs || [])]), ...(p.services || []).flatMap((s) => [s.name, s.text]), ...(p.faqs || []).flat()];
  return parts.join(' ').split(/\s+/).filter(Boolean).length;
}

export function problemsWith(p) {
  const e = [];
  const need = (k) => { if (!p[k] || (typeof p[k] === 'string' && !p[k].trim())) e.push(`missing ${k}`); };
  ['slug', 'title', 'description', 'h1', 'lead', 'waMessage'].forEach(need);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug || '')) e.push('slug must be lowercase letters, numbers and hyphens');
  if (p.title && p.title.length > 60) e.push(`title is ${p.title.length} characters, limit 60`);
  if (p.description && p.description.length > 155) e.push(`description is ${p.description.length} characters, limit 155`);
  if (!Array.isArray(p.sections) || p.sections.length < 2) e.push('needs at least 2 sections');
  if (!Array.isArray(p.faqs) || p.faqs.length < 3 || p.faqs.length > 5) e.push('needs 3 to 5 FAQs');
  if (!Array.isArray(p.services) || p.services.length < 2) e.push('needs at least 2 services');
  const w = wordsOf(p);
  if (w < MIN_WORDS) e.push(`only ${w} words of original text, minimum ${MIN_WORDS}`);
  const all = JSON.stringify(p).toLowerCase();
  if (all.includes('—') || all.includes('–')) e.push('contains an em dash or en dash');
  for (const b of BANNED) if (new RegExp('\\b' + b.replace(/\./g, '\\.') + '\\b').test(all)) e.push(`contains the banned claim "${b}"`);
  if (/\bR\s?\d/.test(JSON.stringify(p)) && !p.pricesChecked) e.push('mentions a price: set "pricesChecked": true after checking it against src/config/business.ts');
  return e;
}
