# Build tracker: Stage 2, Stage 3 and motion

DONE means built and passing the tests in `docs/test-report.md`. Branch: `stage-2-redesign`.

| # | Item | Status | Notes |
| --- | --- | --- | --- |
| 1 | Logo files in `public/brand/` (wordmark, mark, combined logo, light logo for navy, 640 px square, favicon) | DONE | Street-sign plate with a small notch in brand blue. Lettering is outlined from Inter. Used in header, footer and favicon. |
| 2 | Design tokens in one place | DONE | `src/styles/tokens.css`. White, grey, navy, one blue, a light tint. No cream, beige or yellow. Inter only, serif font file deleted. 1120 px width, 96 px / 56 px sections. |
| 3 | Components | DONE | SiteHeader, SiteFooter, Button, Card, PriceCard, ProcessStep (with "You get"), DarkBand, Accordion, StickyMobileBar, SectionLabel, Icon, TrustStrip, plus PageHero, ExampleTile, TradeMarquee. |
| 3a | Icons credited as MIT in docs/image-credits.md | NOT DONE as written | The icons are original drawings, not a third-party set, so there is no MIT credit to give. `docs/image-credits.md` says so. Decision needed only if you want a named icon set instead. |
| 4 | PhoneMock and LaptopMock on every page; phone in the home hero on phones | DONE | One phone look everywhere. The Thandeka and Fazila tiles use drawn mock-ups because their screenshots are cream. |
| 5 | Page structure: hero, TrustStrip, alternating bands, DarkBand on every page | DONE | All 16 pages. |
| 5 | Home | DONE | Hero, what we do (icon cards), 3-step process, trades row, price summary, Straat Leads phone, 3 example tiles, 6 FAQs, DarkBand. |
| 5 | Websites | DONE | Four package cards, add-ons table, what we will ask you for, FAQ. |
| 5 | Enquiry alerts | DONE | 3 ProcessSteps with the phone mock, what you get, what we do not do, price, FAQ. |
| 5 | Prices | DONE | Cards, pay once and pay monthly side by side, included in every package, add-ons, monthly plans, working price builder, plain terms. |
| 5 | Examples | DONE | Three tiles with laptop and phone mocks, label once per tile. |
| 5 | How it works | DONE | Five stages, each with an icon and a "You get" line, then a FAQ. |
| 5 | About | DONE | Company details card, four "How we work" cards, no people or photos. |
| 5 | Contact | DONE | Three contact cards, hours, what to send. |
| 5 | Four trade pages | DONE | Icon cards, phone mock, price cards, FAQ, DarkBand. Content kept, split into short cards. |
| 5 | Privacy, Terms, PAIA, 404 | DONE | New header, footer and typography. Content unchanged. |
| 5 | Photography (at most 4 licensed photos) | NOT DONE | None added. I could not confirm licences or who is shown. The limit is "at most 4", so zero is within it. Decision needed. |
| 6 | Phone first (full-width primary buttons, 48 px targets, no sideways scroll at 320 to 1536 px) | DONE | Tested at 320, 375, 390, 768, 1280 and 1536 px. |
| 7a | Build, links, em dashes | DONE | |
| 7b | axe, 16 pages, 375 and 1280 px | DONE | Zero violations. |
| 7c | Lighthouse mobile on 4 pages | DONE | 100 on all four scores for all four pages, in a local lab run. Re-run on the live preview. |
| 7d | Keyboard test | DONE | |
| 7e | Colour contrast | DONE | Via axe. |
| 7f | Serif, cream, green, gaps, orphans | DONE | |
| 7g | Buttons and links, WhatsApp number | DONE | Phone number unchanged (the swap is a later step). |
| 7h | /work/ redirect, sitemap | DONE | |
| 7i | JSON-LD on home | DONE | |
| 7j | Page weight and largest image per page | DONE | In the test report. |
| 8 | Temporary /design-check/ page | DONE | Built, axe-checked, noindex, not in sitemap or menu, then deleted before the final push. |
| 9 | Screenshots, 16 pages at 375 and 1280 px | DONE | `docs/screens/`, named page-width.png. |
| 10 | This tracker | DONE | |
| 11 | Final report | DONE | In the chat message. |
| M1 | Scroll reveal, 80 ms stagger | DONE | CSS plus IntersectionObserver. |
| M2 | Hero mock-ups drift | DONE | 7 second slow float. |
| M3 | Phone demo loop (home, Enquiry alerts, trade pages) | DONE | Form, alert, reply. Loop 9 seconds, pauses when the tab is hidden or off screen. Labelled "Example with made-up data". |
| M4 | Slow trades strip | DONE | Pauses on hover and has a visible Pause button. |
| M5 | Header shrinks and gets a border after first scroll | DONE | The header is fixed on a spacer, so nothing jumps. |
| M6 | Active process step highlighted | DONE | |
| M7 | Hover lift, smooth accordion | DONE | The Examples tiles now use a soft hover lift. The 3D tilt was dropped with the old tiles. |
| M8 | Motion checks in the test report | DONE | Reduced motion, JavaScript off, 375 px, layout shift 0.0002. |

## Fix list (21 November 2026)

| Item | What | Status | Notes |
| --- | --- | --- | --- |
| F1 | Phone number now 084 694 6588 (27846946588) | DONE | Only in `src/config/business.ts`. Whole-repo search for the old number: 0 matches. |
| F2 | Indexing check | DONE | No noindex anywhere except the 404 page. Removed the Astro `/work/` stub page, which carried noindex. `/work/` still 301s through `public/_redirects`. robots.txt allows all and lists `https://straatstudio.co.za/sitemap.xml`. |
| F3 | Phone mock hugs its content | DONE | Fixed aspect ratio removed. All three cards keep their space, so layout shift stays 0. Checked at 375, 768, 1280. |
| F4 | Fazila and Thandeka tile mock-ups | DONE | Made-up names, prices, WhatsApp buttons. |
| F5 | "Trade names only" removed | DONE | |
| F6 | About paperwork line and POPIA data agreement wording | DONE | |
| F7 | Speed | DONE | CSS inlined, font preloaded, smaller WebP sizes added, header scroll script uses requestAnimationFrame with a passive listener. |
| F8 | Full test suite | DONE | See `docs/test-report.md`. |
| F9 | Screenshots and zip | DONE | `docs/screens/` has 48 images. |

## Examples fix (21 November 2026)

| Item | What | Status | Notes |
| --- | --- | --- | --- |
| E1 | Real concept screenshots back on the Examples tiles | DONE | The 12 original WebP files from commit 47303ef were never deleted, only unused, so they are used again unchanged. New 1600 px versions added. |
| E2 | New ExampleTile: whole screenshot, no crop, no overlap | DONE | Laptop screenshot only on the tile. Both screenshots on the detail page. |
| E3 | Detail pages /examples/fazilas-kitchen/, /thandeka-hair-studio/, /ndlovu-electrical/ | DONE | In the sitemap. No "View the live example" button because no concept site is deployed. |
| E4 | Drawn mock-ups deleted | DONE | Component code, CSS and the extra Ndlovu phone-200 image removed. |

## Live example links (21 November 2026)

| Item | What | Status | Notes |
| --- | --- | --- | --- |
| L1 | View the live example button on the three detail pages | DONE | New tab, rel noopener, with the made-up business note. |
| L2 | Small link on the Examples tiles | NOT DONE | Left out on purpose: the tile is already full. |

## Production (21 November 2026)

| Item | What | Status | Notes |
| --- | --- | --- | --- |
| P1 | examples-live-links merged into main and deployed | DONE | Fast-forward, production checks pass. |

## Live domain (25 November 2026)

| Item | What | Status | Notes |
| --- | --- | --- | --- |
| D1 | straatstudio.co.za serves the site, http redirects to https | DONE | All 18 pages 200. |
| D2 | www.straatstudio.co.za | DONE, with a note | Returns 200, canonical points to the apex. Not redirected. |
| D3 | straat-studio.pages.dev redirects to the custom domain or is noindex | NOT DONE | Waiting for your decision. |

## Needs your decision

0. **Duplicate address.** straat-studio.pages.dev is indexable and not redirected. See docs/test-report.md for the options.

1. **Plain terms: "cancel with 30 days notice".** The existing /terms/ page says monthly plans can be cancelled at any time, with no notice period. The wording was later changed to: "You can cancel at any time. Cancellation takes effect at the end of the month you have already paid for." No notice period is mentioned.
2. **Photography.** Say if you want up to 4 licensed photos, and I will source and log them.
3. **Concept sites.** Deployed at fazilas-kitchen-concept.pages.dev, thandeka-hair-studio-concept.pages.dev and ndlovu-electrical-concept.pages.dev. They use the new number and are noindex.
4. **404 page noindex.** I kept it on the 404 page only, which is standard. Say if you want it removed.
