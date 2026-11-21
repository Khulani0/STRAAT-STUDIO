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
| M4 | Slow trades strip | DONE | Trade names only. Pauses on hover and has a visible Pause button. |
| M5 | Header shrinks and gets a border after first scroll | DONE | The header is fixed on a spacer, so nothing jumps. |
| M6 | Active process step highlighted | DONE | |
| M7 | Hover lift, smooth accordion, tile tilt | DONE | Tilt only on a laptop with a mouse. |
| M8 | Motion checks in the test report | DONE | Reduced motion, JavaScript off, 375 px, layout shift 0.0002. |

## Needs your decision

1. **Plain terms: "cancel with 30 days notice".** The existing /terms/ page says monthly plans can be cancelled at any time, with no notice period. The wording was later changed to: "You can cancel at any time. Cancellation takes effect at the end of the month you have already paid for." No notice period is mentioned.
2. **Photography.** Say if you want up to 4 licensed photos, and I will source and log them.
3. **Fazila and Thandeka tiles.** They show drawn mock-ups in the site palette instead of the concept-site screenshots, which are cream.
