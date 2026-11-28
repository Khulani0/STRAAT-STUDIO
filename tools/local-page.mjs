// Local service pages (Straat Growth). Usage:
//   node tools/local-page.mjs list
//   node tools/local-page.mjs add draft.json     adds a draft (approved false). Nothing is built or published.
//   node tools/local-page.mjs check <slug>       runs every rule on the draft
//   node tools/local-page.mjs publish <slug>     ONLY after Khulani approves: sets approved, builds, checks the built page and the sitemap
// Publishing to the live site is done by committing and pushing the branch you merge to main (the site deploys through GitHub).
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { problemsWith, wordsOf } from '../src/lib/local-pages.mjs';

const FILE = new URL('../src/data/local-pages.json', import.meta.url);
const [cmd, arg] = process.argv.slice(2);
const read = () => JSON.parse(fs.readFileSync(FILE, 'utf8'));
const save = (d) => fs.writeFileSync(FILE, JSON.stringify(d, null, 2) + '\n');
const find = (d, slug) => d.find((p) => p.slug === slug) || (console.error('No page with slug ' + slug), process.exit(1));
const today = () => new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Johannesburg' });

if (cmd === 'list') { for (const p of read()) console.log(`${p.approved ? 'PUBLISHED' : 'draft    '} ${p.slug} (${wordsOf(p)} words)`); }
else if (cmd === 'add') {
  const d = read(); const p = JSON.parse(fs.readFileSync(arg, 'utf8'));
  if (d.some((x) => x.slug === p.slug)) { console.error('That slug already exists'); process.exit(1); }
  p.approved = false; d.push(p); save(d); console.log('Added draft ' + p.slug + '. Not published.');
  const pr = problemsWith(p); console.log(pr.length ? 'Still to fix:\n- ' + pr.join('\n- ') : 'All rules pass.');
} else if (cmd === 'check') {
  const pr = problemsWith(find(read(), arg)); console.log(pr.length ? 'Not ready:\n- ' + pr.join('\n- ') : 'All rules pass. Ready for your approval.'); process.exit(pr.length ? 1 : 0);
} else if (cmd === 'publish') {
  const d = read(); const p = find(d, arg); const pr = problemsWith(p);
  if (pr.length) { console.error('Not published. Fix first:\n- ' + pr.join('\n- ')); process.exit(1); }
  p.approved = true; p.updated = today(); save(d);
  execSync('npm run build', { stdio: 'inherit' });
  const html = fs.readFileSync(`dist/local/${p.slug}/index.html`, 'utf8');
  const sm = fs.readFileSync('dist/sitemap.xml', 'utf8');
  const checks = [
    ['one H1', (html.match(/<h1[ >]/g) || []).length === 1],
    ['canonical is absolute with trailing slash', html.includes(`<link rel="canonical" href="https://straatstudio.co.za/local/${p.slug}/"`)],
    ['title and description present', html.includes('<title>') && html.includes('name="description"')],
    ['in sitemap.xml', sm.includes(`/local/${p.slug}/`)],
    ['FAQ and breadcrumb structured data', html.includes('FAQPage') && html.includes('BreadcrumbList')],
    ['links to /prices/ and /contact/', html.includes('href="/prices/"') && html.includes('href="/contact/"')],
  ];
  for (const [n, ok] of checks) console.log((ok ? 'PASS ' : 'FAIL ') + n);
  console.log('\nBuilt locally. To put it on the live site: commit, push, and merge to main when you are happy.');
  process.exit(checks.every(([, ok]) => ok) ? 0 : 1);
} else console.log('Commands: list, add <file>, check <slug>, publish <slug>');
