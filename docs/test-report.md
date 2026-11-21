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
