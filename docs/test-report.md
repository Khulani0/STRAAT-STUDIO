# Test report

Run with `npm run build` then `npm run test:all` (scripts in `tools/`). Results below are from the built site served locally.

| Item | Check | Result | Notes |
| --- | --- | --- | --- |
| a1 | npm run build, no warnings | PASS | 19 pages built |
| a2 | Link checker, zero broken links | PASS | PASS: 56 distinct links checked on 19 pages, zero broken |
| a3 | No em dashes in src/ | PASS |  |
| b | axe, 19 pages at 375 px and 1280 px (WCAG 2.0 to 2.2 A and AA plus best practice) | PASS | 0 violations |
| c | Lighthouse mobile: performance, accessibility, best practices, SEO (target 95 or more each) | PASS | /: 100/100/100/100; /prices/: 100/100/100/100; /websites-for-electricians/: 100/100/100/100; /websites-for-plumbers/: 100/100/100/100; /websites-for-salons/: 100/100/100/100; /websites-for-home-bakers/: 100/100/100/100; /examples/: 100/100/100/100; /examples/fazilas-kitchen/: 100/100/100/100; /examples/thandeka-hair-studio/: 100/100/100/100; /examples/ndlovu-electrical/: 100/100/100/100; /enquiry-system/: 100/100/100/100; /contact/: 100/100/100/100 |
| d | Keyboard test at 375 px (header, menu, accordion, sticky bar) | PASS | 8 checks |
| e | Colour contrast WCAG AA | PASS | Covered by axe color-contrast on every page (item b) |
| f1 | No leftover serif fonts (computed font on every element) | PASS | 0 found |
| f2 | No cream, beige or yellow colours (computed colours) | PASS | 0 found |
| f3 | Green only on buttons labelled WhatsApp | PASS | 0 found |
| f4 | No empty gap over about 110 px inside a section | PASS | 0 found |
| f5 | No orphan words in H1 and H2 headings | PASS | 0 found |
| f6 | Tap targets at least 44 px (48 px for buttons by CSS) | PASS | 0 found |
| f7 | No sideways scroll at 320, 375, 390, 768, 1280 and 1536 px | PASS | 0 found |
| g | Every button and link opens the right place; WhatsApp links use the existing number and a message | PASS | wa.me/27846946588 and tel:+27846946588 only |
| h1 | Indexing: no noindex except 404; robots.txt allows all; /work/ 301 to /examples/ | PASS | The /work/ 301 lives in public/_redirects (Cloudflare) |
| h2 | Sitemap lists every public page and no test page | PASS | PASS (18 URLs) |
| i | JSON-LD valid on the home page (and every page) | PASS | ProfessionalService, FAQPage, BreadcrumbList |
| m | Motion: reduced motion, JavaScript off, 375 px layout, loop timing, no layout shift | PASS | 10 checks |

## j) Page weight at 375 px (all files fetched while scrolling the whole page)

| Page | Total KB | Largest image | JS KB (external) |
| --- | --- | --- | --- |
| / | 236 | /work/thandeka-desktop-800.webp 41 KB | 0 |
| /websites/ | 106 | /brand/logo-light.svg 7 KB | 0 |
| /enquiry-system/ | 101 | /brand/logo-light.svg 7 KB | 0 |
| /prices/ | 117 | /brand/logo-light.svg 7 KB | 0 |
| /examples/ | 200 | /work/thandeka-desktop-800.webp 41 KB | 0 |
| /examples/fazilas-kitchen/ | 197 | /work/ndlovu-desktop-600.webp 26 KB | 0 |
| /examples/thandeka-hair-studio/ | 203 | /work/thandeka-desktop-800.webp 41 KB | 0 |
| /examples/ndlovu-electrical/ | 205 | /work/ndlovu-desktop-800.webp 40 KB | 0 |
| /how-it-works/ | 97 | /brand/logo-light.svg 7 KB | 0 |
| /about/ | 96 | /brand/logo-light.svg 7 KB | 0 |
| /contact/ | 96 | /brand/logo-light.svg 7 KB | 0 |
| /websites-for-electricians/ | 105 | /brand/logo-light.svg 7 KB | 0 |
| /websites-for-plumbers/ | 105 | /brand/logo-light.svg 7 KB | 0 |
| /websites-for-salons/ | 104 | /brand/logo-light.svg 7 KB | 0 |
| /websites-for-home-bakers/ | 105 | /brand/logo-light.svg 7 KB | 0 |
| /privacy/ | 94 | /brand/logo-light.svg 7 KB | 0 |
| /terms/ | 95 | /brand/logo-light.svg 7 KB | 0 |
| /paia-manual/ | 104 | /brand/logo-light.svg 7 KB | 0 |
| /404.html | 90 | /brand/logo-light.svg 7 KB | 0 |

The small script is inlined by the build, so external JS shows as 0. Its source is under 5 KB.

## c) Lighthouse, mobile mode

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| / | 100 | 100 | 100 | 100 | 0.9 s | 0 | 0 ms |
| /prices/ | 100 | 100 | 100 | 100 | 0.9 s | 0 | 10 ms |
| /websites-for-electricians/ | 100 | 100 | 100 | 100 | 0.9 s | 0 | 50 ms |
| /websites-for-plumbers/ | 100 | 100 | 100 | 100 | 0.9 s | 0 | 50 ms |
| /websites-for-salons/ | 100 | 100 | 100 | 100 | 0.9 s | 0 | 40 ms |
| /websites-for-home-bakers/ | 100 | 100 | 100 | 100 | 0.9 s | 0 | 0 ms |
| /examples/ | 100 | 100 | 100 | 100 | 0.8 s | 0 | 40 ms |
| /examples/fazilas-kitchen/ | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| /examples/thandeka-hair-studio/ | 100 | 100 | 100 | 100 | 0.8 s | 0 | 70 ms |
| /examples/ndlovu-electrical/ | 100 | 100 | 100 | 100 | 0.8 s | 0 | 70 ms |
| /enquiry-system/ | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |
| /contact/ | 100 | 100 | 100 | 100 | 0.8 s | 0 | 0 ms |

These are lab scores from a local server with Lighthouse's simulated slow 4G. Re-run them on the live preview address before launch.

## d) Keyboard test details

- Tab order reaches skip link, logo, menu button, buttons: Skip to content > Straat Studio, home > Menu > Get my free homepage
- Visible focus ring on first 22 tab stops: PASS
- Menu opens with Enter, focus moves into menu: PASS (Websites)
- Focus stays inside the open menu (trap): PASS
- Escape closes the menu and focus returns to the Menu button: PASS
- Accordion summary has visible focus and opens/closes with Enter: PASS
- Sticky bar: Call and WhatsApp both visible, 48 px or taller: PASS
- Sticky bar links show a focus ring: PASS

## Motion test details

- JavaScript off, /: hidden reveal items 0, hidden phone cards 0: **PASS**
- JavaScript off, /prices/: hidden reveal items 0, hidden phone cards 0: **PASS**
- JavaScript off, /websites-for-plumbers/: hidden reveal items 0, hidden phone cards 0: **PASS**
- Reduced motion, /: hidden 0, running animations 0, demo loop active 0, hidden phone cards 0, strip duplicate hidden true: **PASS**
- Reduced motion, /enquiry-system/: hidden 0, running animations 0, demo loop active 0, hidden phone cards 0, strip duplicate hidden true: **PASS**
- Reduced motion, /examples/: hidden 0, running animations 0, demo loop active 0, hidden phone cards 0, strip duplicate hidden true: **PASS**
- 375 px, full scroll on home: layout shift 0.0002 (limit 0.05): **PASS**
- 375 px: items still hidden after scrolling the whole page 0: **PASS**
- Demo loop steps over 22 s: 0,0,1,2,3,0,1,2,3,0,1,2; loop length 9006 ms (must be 6000 ms or more): **PASS**
- Header shrinks after scroll: **PASS (76px to 62px)**

## Live example links (21 November 2026)

- The three detail pages now have a View the live example button (new tab, rel noopener) and the line about the concept site's WhatsApp buttons.
- Live addresses: https://fazilas-kitchen-concept.pages.dev/, https://thandeka-hair-studio-concept.pages.dev/, https://ndlovu-electrical-concept.pages.dev/
- Re-run: build no warnings, 56 links zero broken, axe zero violations on 19 pages at 375 and 1280, Lighthouse mobile 100/100/100/100 on /examples/ and the three detail pages.
- The Examples tiles were left as they are, because a third link would crowd them.

## Production check after the live-links merge (21 November 2026, https://straat-studio.pages.dev)

- main at the merge: 9addf77 (fast-forward from examples-live-links).
- The three detail pages return 200. Each has a View the live example link to the correct concept address with target="_blank" and rel="noopener".
- The three concept addresses return 200. / and /examples/ return 200.
- No noindex meta tag and no X-Robots-Tag header on the 18 pages. The 404 page has noindex.
- The old number (068 226 4586 and its other forms) appears on none of the 18 pages, and not in robots.txt or sitemap.xml.
- Lighthouse mobile on production (performance / accessibility / best practices / SEO): / 99/100/100/100, /examples/ 100/100/100/100, /examples/ndlovu-electrical/ 100/100/100/100.

## Live custom domain check (25 November 2026, https://straatstudio.co.za)

| Check | Result | Notes |
| --- | --- | --- |
| 1. All 18 sitemap pages return 200 | PASS | |
| 1. http redirects to https | PASS | 301 to the https address, also for inner pages. The very first request in the run failed to connect (a one-off); three repeats all gave 301. |
| 2. www.straatstudio.co.za returns 200 | PASS | https://www answers 200 and http://www gives 301 to https://www. It does not redirect to the apex, but its canonical tag points to straatstudio.co.za. |
| 3. Canonical tags | PASS | All 18 pages point to their own https://straatstudio.co.za/ address. None points to pages.dev or www. |
| 4. robots.txt and sitemap.xml served | PASS | Sitemap lists 18 URLs, all on straatstudio.co.za. |
| 4. No noindex meta or X-Robots-Tag header except the 404 page | PASS | The 404 page has noindex. |
| 5. Open Graph and Twitter tags | PASS | og:url, og:image and twitter:image use straatstudio.co.za. The share image returns 200. |
| 6. Lighthouse mobile (performance / accessibility / best practices / SEO) | PASS | / 96/100/100/100, /prices/ 100/100/100/100, /examples/ 100/100/100/100 |
| 7. straat-studio.pages.dev redirects or is noindex | FAIL | Neither. It serves the full site with index, follow. The canonical tags point to the custom domain, which tells Google which copy to use, but a redirect is cleaner. |

## One address (25 November 2026)

Merged one-address into main (fast-forward, 02531b1). Tested on the real hosts after the deploy:

| Request | Result |
| --- | --- |
| https://straat-studio.pages.dev/ | 301 to https://straatstudio.co.za/ |
| https://straat-studio.pages.dev/prices/ | 301 to https://straatstudio.co.za/prices/ |
| https://straat-studio.pages.dev/examples/?x=1 | 301 to https://straatstudio.co.za/examples/?x=1 |
| https://www.straatstudio.co.za/ and /prices/ | 301 to the apex, same path |
| https://straatstudio.co.za/, /prices/, /examples/, /robots.txt, /sitemap.xml | 200 |
| https://one-address.straat-studio.pages.dev/ and https://stage-2-redesign.straat-studio.pages.dev/ | 200 (previews still work) |
| /work/ and /work on straatstudio.co.za | 301 to /examples/ |
| http:// on both redirect hosts | 301 to https first, then to the apex |
| Redirect loops | None. Every chain ended on straatstudio.co.za with 200 after 1 or 2 redirects. |

Lighthouse mobile on the live domain (performance / accessibility / best practices / SEO): / 92/100/100/100 (LCP 1.6 s, CLS 0), /prices/ 99/100/100/100 (LCP 1.3 s, CLS 0). The home page performance is under the 95 target on this run.

Claims audit: see docs/claims-audit.md (report only).

## Fix round 1 (28 November 2026, branch fix-round-1)

- Catalogue marked Coming soon (label and Ask on WhatsApp button) on the home page, /prices/, /websites/, /websites-for-home-bakers/ and /terms/. The Fazila's Kitchen concept project is unchanged.
- Two sample posts rewritten (service-tests/posts-sample-month, 14 and 16 December) so they no longer mention untested services.
- public/_routes.json: the redirect function now runs only for page requests. Excluded: /_astro/*, /brand/*, /fonts/*, /og/*, /work/*, /favicon.svg.
- Local Host-header test (wrangler pages dev, no login): straat-studio.pages.dev and www.straatstudio.co.za give 301 to https://straatstudio.co.za with the same path and query for /, /prices/ and /examples/?x=1. On the same two hosts /brand/logo.svg, /fonts/inter.woff2, /og/straat-studio-share.jpg, /work/ndlovu-desktop-800.webp and /favicon.svg return 200. The apex, a branch preview host and localhost return 200 for pages and assets. /robots.txt and /sitemap.xml on a redirect host still give 301.
- Build no warnings (19 pages). Link check: 56 distinct links, zero broken. axe: 0 violations on all 19 pages at 375 and 1280 px (includes /, /prices/ and /websites/). No sideways scroll.
- Lighthouse mobile (local): / 100/100/100/100 (LCP 0.9 s, CLS 0), /prices/ 100/100/100/100 (LCP 0.9 s, CLS 0).
- service-tests/ is merged into this branch and is not in public/ or the Astro output: dist has no service-tests files.

## Production check after fix round 1 (28 November 2026, main b76e887)

| Request | Result |
| --- | --- |
| https://straat-studio.pages.dev/prices/ | 301 to https://straatstudio.co.za/prices/ |
| https://straat-studio.pages.dev/ and /examples/?x=1 | 301 to the apex, same path and query |
| https://www.straatstudio.co.za/ | 301 to https://straatstudio.co.za/ |
| https://straatstudio.co.za/, /prices/, /examples/, /robots.txt, /sitemap.xml | 200 |
| Catalogue "Coming soon" label on /prices/ | Present |
| /brand/logo.svg, /fonts/inter.woff2, /work/ndlovu-desktop-800.webp, /favicon.svg on the apex, pages.dev, www and two previews | 200 on every host |
| Previews one-address, stage-2-redesign and fix-round-1 (/ and /prices/) | 200 |

Note: the built site has no /_astro/ folder, because the CSS is inlined into each page, so there were no /_astro files to test. The /_astro/* exclusion in public/_routes.json is a guard for later.

Service audit (Straat Leads and Straat Care): docs/service-audit.md. Starter sheet for Straat Studio: service-tests/starter-sheet/ (checked: no em dashes, no banned words, only 084 694 6588 and 27846946588).
