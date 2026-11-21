# Straat Studio: production website build brief (CLAUDE.md)

Put this file in the root of the repo as `CLAUDE.md`. Claude Code reads it at the start of every session.

## 0. Mission

Build straatstudio.co.za: a world-class, fast, honest website for a web studio based in Cape Town that sells fixed-price websites to trades and small businesses across South Africa. It must look hand-crafted, never template-made or AI-made, and it must be technically perfect for SEO. Copy, titles and structured data say South Africa, with Cape Town only as "based in".

The homepage is design v3 (`src/pages/index.astro`). The earlier canvas in `design/` is the source for the words, sections, prices, package builder and enquiry demo only. The look follows section 3.

See also `docs/08-preview-intake-seo-rules.md` for the free preview, client intake and SEO plan. This file (CLAUDE.md) has been updated to match it. `02-quick-reference.md` and the Master Plan live in the Claude project, not in this repo.

## 1. Non-negotiable rules

1. No invented facts. No fake clients, reviews, star ratings, logos, awards, stats or testimonials. Concept projects are always labelled "Concept project, not commissioned client work".
2. No AI-generated images. Photography is either the owner's own or licensed (Unsplash or Pexels licence), with the source logged in `/docs/image-credits.md`.
3. No em dashes anywhere in copy.
4. No placeholder links. Every link goes to a real page or is removed. `#top` links are a build failure.
5. No claims that cannot be proven ("number 1", "guaranteed first page", "unhackable").
6. Copy is plain South African English, sentence case, short sentences.

## 2. Stack

- Astro (latest stable) + Tailwind CSS, static output.
- Hosted on Cloudflare Pages (free plan allows commercial use). Never Vercel Hobby.
- Fonts: Inter only, for all text, self-hosted as `public/fonts/inter.woff2` with `font-display: swap` and a metric-matched system fallback. Preload it. No serif font anywhere. No Google Fonts request at runtime.
- Forms: Web3Forms or Formspree free tier, with a honeypot field and a POPIA consent line.
- Analytics: Cloudflare Web Analytics (no cookies, no banner needed). Track clicks on WhatsApp, phone and form submit as events.
- Zero client-side framework. Vanilla JS only (menu, header state, scroll reveal, step highlight, phone demo loop, trades strip pause). Total JS under 15 KB. Every effect is optional: with JavaScript off, or with reduced motion on, all content is visible.

## 3. Design system

| Token | Value |
| --- | --- |
| Ink | #14161A |
| White | #FFFFFF |
| Cool grey (alternate light sections, was Sand) | #F3F5F8 |
| Line (borders) | #DDE2EA |
| Muted text on white and sand | #555B63 (passes 4.5:1) |
| Straat blue (buttons and links) | #2F54EB, hover #2443C4 |
| Blue soft (badges) | #E8EDFF |
| Night navy (dark sections, footer) | #0F1B2D, alt #172640 |
| Text on night | #C9D1DC |
| Accent tint (small marks, focus ring on navy) | #8EA8FF, a light tint of the brand blue. No yellow, cream or beige anywhere |
| WhatsApp green (WhatsApp buttons only) | #25D366 with dark text #06210F (8.6:1 measured). Where the button text is white or small, use dark green #0E7038 (about 6:1). #128C4A is retired: it gives only 4.3:1 with white text |

- Type scale (tokens in `src/styles/tokens.css`): H1 clamp(36px, 5.2vw, 58px), H2 clamp(28px, 3.4vw, 40px), H3 clamp(19px, 1.8vw, 22px), body 17px (18px from 768px wide), line-height 1.6.
- Headings: Inter, weight 800 (H3 700), letter-spacing -0.03em. Body and UI text: Inter.
- Layout: max content width 1120px plus 24px side padding. Section padding 96px on desktop and 56px on phones. No empty gap larger than that.
- Backgrounds: white and cool grey (#F3F5F8) for light sections, Night navy for dark sections and the footer. Dark sections are allowed, but keep them to a few and never two in a row.
- Colour: Straat blue for buttons and links, the light blue tint #8EA8FF for small marks. Green only on WhatsApp buttons. Never show a row of buttons in three different colours.
- Shape and depth: 14px corners on cards and panels, thin 1px borders, no heavy shadows. Buttons have 10px corners, min height 48px (52px for primary), visible focus ring 3px (light blue tint on navy). Primary buttons are full width under 640px.
- Icons: simple line icons, 2px stroke, drawn for this site (`src/components/Icon.astro`). No third-party icon set.
- Motion (light and tasteful, CSS plus a few lines of IntersectionObserver): scroll reveal (fade and rise once, 80 ms stagger), a slow float on the hero mock-ups, a phone demo loop (quote form, email alert, automatic reply, made-up data, no faster than every 6 seconds, pauses when the tab is hidden), a slow trades strip (trade names only, with a pause button), a header that shrinks after the first scroll, highlighted process steps, hover lift on cards and buttons, a smooth accordion. Not allowed: parallax, auto-playing carousels that hide content, video, animation libraries, text that moves while being read, motion that delays or blocks content. Everything switches off under `prefers-reduced-motion`.
- Hero: headline on the left, a picture of a concept site on the right. Until the concept sites are built it is an HTML mock-up labelled "Concept project, not commissioned client work". Replace it with real screenshots.
- Presentation: the site presents Straat Studio as a company. No photos of individuals, no personal details and no address on the site. Copy says South Africa, with Cape Town only as "based in".

## 3b. Components and tests

Components live in `src/components/`: SiteHeader, SiteFooter, Button (primary, secondary, whatsapp), Card, PriceCard, ProcessStep, DarkBand, Accordion, StickyMobileBar, SectionLabel, Icon, TrustStrip, PhoneMock, LaptopMock, ExampleTile, TradeMarquee, PageHero. Every page: white hero with headline, one paragraph, two buttons and the TrustStrip; then alternating white, grey and navy bands; it ends with a DarkBand. Brand files are in `public/brand/` (logo, logo-light, mark, wordmark, 640px square for WhatsApp and Google). Test scripts are in `tools/` (`npm run test:all` after `npm run build`): axe, Lighthouse, keyboard, links, motion. Results are in `docs/test-report.md`.

## 4. Site map

| URL | Purpose |
| --- | --- |
| `/` | Homepage (canvas design) |
| `/prices/` | Full package comparison, add-ons, year 2 costs |
| `/websites/` | The four website packages |
| `/enquiry-system/` | Enquiry alerts (Straat Leads): quote form, email alert, automatic reply, monthly report |
| `/how-it-works/` | The four steps and what we ask for |
| `/examples/` | Concept projects index (`/work/` redirects here) |
| `/examples/[slug]/` | One case study per concept project |
| `/websites-for-electricians/` | Trade page |
| `/websites-for-plumbers/` | Trade page |
| `/websites-for-salons/` | Trade page |
| `/websites-for-home-bakers/` | Trade page |
| `/guides/` | Guides index |
| `/guides/website-cost-south-africa/` | Guide |
| `/guides/google-business-profile-free/` | Guide |
| `/guides/website-vs-facebook-page/` | Guide |
| `/about/` | Who runs Straat Studio, how we work |
| `/contact/` | WhatsApp, email, enquiry form |
| `/privacy/` | POPIA privacy notice |
| `/terms/` | Terms of service |
| `/paia-manual/` | PAIA manual for STRAATTECH (Pty) Ltd |
| `/404` | Helpful not-found page |

Start with 4 trade pages and 3 guides. Add more only when each one has genuinely different, useful content. Never clone a page and swap the trade name; that is doorway-page spam and Google penalises it.

## 5. Trade page content rules

Each trade page must answer, specifically for that trade:
- What customers in that trade search for (for example "COC certificate Bellville").
- Which pages their site needs (for an electrician: COCs, DB boards, fault finding, solar, areas).
- What the site does for them (calls, WhatsApp, quote requests).
- Which package fits and the price.
- A concept example for that trade, if one exists.
- 3 to 5 FAQs unique to that trade.
Minimum 700 words of original content per page.

## 6. Technical SEO (every page)

- Unique `<title>` (under 60 characters) and meta description (under 155).
- Canonical URL, absolute, with trailing slash.
- Open Graph and Twitter tags, plus a 1200x630 share image per page type.
- `lang="en-ZA"`.
- One H1, logical H2 and H3 order.
- Descriptive image filenames and alt text. Width and height on every image.
- Images in AVIF and WebP via Astro `<Image>`, lazy below the fold, hero image preloaded.
- `sitemap.xml` (via @astrojs/sitemap) and `robots.txt` pointing to it.
- JSON-LD structured data, true facts only:
  - Homepage: `ProfessionalService` with name, url, telephone, email, areaServed (South Africa, as a Country), address only if the owner approves showing it, priceRange "R999 to R3,099" (taken from `prices.priceRange` in business.ts).
  - Prices page: `Offer` entries per package.
  - FAQ sections: `FAQPage`.
  - Guides: `Article` with author and date.
  - Every page: `BreadcrumbList` except home.
- Internal links: every trade page links to prices and contact; every guide links to one trade page and prices.
- 301 redirect `www` to non-www, and http to https.

## 7. Performance budget (fail the build if exceeded)

| Metric | Budget |
| --- | --- |
| Lighthouse mobile performance | 95 or higher |
| Lighthouse accessibility, best practices, SEO | 100 |
| LCP | under 2.0 s on a mid-range phone, 4G |
| CLS | under 0.05 |
| Page weight, homepage | under 500 KB |
| JS | under 15 KB |

## 8. Accessibility

- WCAG 2.2 AA. All text contrast 4.5:1 or better.
- Menu: real `<button>`, `aria-expanded`, focus trapped while open, Escape closes, focus returns to the button.
- FAQ: native `<details>` and `<summary>`.
- Sticky mobile bar: phones only (under 768px), Call and WhatsApp side by side, both always visible, 48px or taller. There is no floating bubble.
- Anchor links: links to a section on another page jump instantly. Same-page smooth scroll is 0.4 seconds or less and is instant under `prefers-reduced-motion`. No CSS `scroll-behavior: smooth`.
- Every form field has a visible label.

## 9. Contact links

- WhatsApp: `https://wa.me/27XXXXXXXXX?text=` with a pre-filled message per page, for example "Hi Straat Studio, I'd like a free homepage preview for my electrical business."
- Phone: `tel:+27XXXXXXXXX`.
- Replace XXXXXXXXX with the real number from `/src/config/business.ts`. All business facts (name, number, email, reg number, prices) live in that one file.

## 10. Concept portfolio (separate repos, separate subdomains)

Build 3 complete concept websites, each with its own look, as proof of standard:
1. `ndlovu-electrical` (Business package): 5 pages, service pages, areas, quote form.
2. `fazilas-kitchen` (Catalogue package): product catalogue driven by a simple product Google Sheet that we set up (no CMS), WhatsApp order buttons with the product name pre-filled.

**Before the first Catalogue sale, the owner product sheet must be built.** This is the Google Sheet template (one row per product: name, description, price, photo, category, available) and the automatic refresh that republishes the site within minutes of an edit. Until it exists, do not sell or promise Catalogue.
3. `thandeka-hair` (One-Page package): prices, hours, map, booking by WhatsApp.

Host each at `concepts.straatstudio.co.za/[name]/` or its own Pages project. Each gets a case study on `/examples/[slug]/`: the brief, design choices, features, mobile and desktop screenshots, Lighthouse scores, and the concept label.

## 11. Legal (POPIA)

- `/privacy/`: what the form collects, why, where it is stored, how long, who to contact, the right to access and delete.
- `/terms/`: scope, payment (50/50 or full for One-Page), 2 revision rounds, delivery clock starts on content received, ownership passes on final payment, no ranking guarantees, Straat Care terms, cancellation.
- `/paia-manual/`: PAIA manual for STRAATTECH (Pty) Ltd.
- Footer: "Straat Studio is a trading name of STRAATTECH (Pty) Ltd, Reg. 2026/409104/07".
Each page shows "Last updated" with the date of the last real change. These pages have not been reviewed by a lawyer; see `docs/legal-review.md`.

## 12. Quality gates before every deploy

- [ ] `npm run build` passes with no warnings
- [ ] Link checker: zero broken or `#top` links
- [ ] Lighthouse CI meets section 7 on `/`, `/prices/`, one trade page, one guide
- [ ] Rich Results Test passes for each JSON-LD type
- [ ] Tested on a real Android phone over mobile data
- [ ] Form test submission received by email
- [ ] WhatsApp links open the right number with the right message
- [ ] No em dashes: `grep -r "—" src/` returns nothing

## 13. Build order (one session per step)

1. Scaffold Astro + Tailwind, design tokens, fonts, `business.ts`, base layout with SEO component.
2. Homepage from the canvas design.
3. Prices, contact, about, 404.
4. Legal pages.
5. 4 trade pages.
6. 3 guides.
7. Sitemap, robots, JSON-LD, redirects, analytics events.
8. Quality gates, then deploy to Cloudflare Pages.
9. Concept sites, one per session, then their case studies.

At the end of each step: commit with a clear message, list what was done, list anything that needs the owner's input.

## 14. StraatOS (enquiry system), built in phases

Wording rule: the site may only claim what Phase 1 does. Say "email alert" to the owner, an on-screen thank-you with a WhatsApp button for the customer, an email copy only if the customer gave an email address, and a Google Sheet with a Status column. Never promise WhatsApp alerts, WhatsApp auto-replies, dashboards, review requests or reminders before their phase is built. The homepage shows the flow as a static picture labelled "Example with made-up data", not an interactive demo.

Never build a phase before the business trigger is met. Ask the owner to confirm the trigger first.

### Phase 1: now, no custom backend
- A reusable `QuoteForm` component on every client site: job type (dropdown per trade), suburb, description, up to 3 photos, name, phone, preferred contact (WhatsApp or call), POPIA consent tick box.
- Submissions go to a Google Sheet through a Google Apps Script web app (one script per client). Decision (15 Nov 2026): Phase 1 runs under Straat Studio's own dedicated Google account ("Execute as me"). Each client's sheet and photo folder live in a shared Drive folder and are transferred to the client if they cancel. Switch to an email service or per-client accounts at 8 clients, or earlier if the daily email quota (100 recipients on a consumer account) is near. Back up every client sheet monthly (download as xlsx).
- The sheet has a Status column with a dropdown: New, Contacted, Quote sent, Won, Lost.
- The script emails the owner for every enquiry. It emails the customer a copy only if they gave an email address.
- Photos go to a Google Drive folder next to the client's sheet (see the decision above), with links in the sheet. Photos are links in the sheet, never attachments to the email.
- Monthly report: a simple template filled from the sheet plus Cloudflare Web Analytics (visits, enquiries, top job types, won and lost).

### Phase 2: after 5 paying Straat Leads clients
- Supabase (Postgres, Auth, Storage) with Row Level Security on every table. One client can never read another client's rows. Write tests that prove it.
- Dashboard at `app.straatstudio.co.za`: login per client, enquiry pipeline board, enquiry detail with photos, notes, status history.
- Customer acknowledgement and owner alerts by email (Resend). A "Message on WhatsApp" button that opens a `wa.me` link with a pre-filled reply. No unofficial WhatsApp automation.
- "Ask for a review" button on Won enquiries: opens WhatsApp with the client's Google review link pre-filled.
- Data export to CSV for every client, and a delete-my-data process (POPIA).
- Daily database backups, and a tested restore.

### Phase 3: after 20 clients
- Quote follow-up reminders (email to the owner when a quote has sat for 3 and 7 days).
- Reporting screen per client.
- An embeddable form script so businesses with websites built elsewhere can subscribe to Straat Leads.

## 15. Current prices (put these in business.ts)

Websites: One-Page R999, Business R2,499, Catalogue R2,999, Launch Pack R3,099.
Page limits (in `maxPages` in business.ts): One-Page 1 page, Business up to 5 pages, Catalogue up to 8 pages, Launch Pack up to 5 pages (same as Business).
Monthly: Straat Care R99, Straat Leads R249, Straat Growth R449.
Pay-monthly: R499 setup, then R449 a month for 12 months (Business + Leads), then R249.
Year 2 hosting and domain without a plan: R999 a year.

## 16. Who edits what

Catalogue clients edit their own product names, descriptions and prices in the product sheet (a simple Google Sheet that we set up), and the site refreshes automatically within minutes. There is no CMS. We change everything else on the site (pages, text, photos and our package prices): the client sends a WhatsApp and it is done within 48 hours. Straat Care includes one small change a month. A single change without a plan is R100. Keep the homepage Catalogue card, the FAQ "Can I edit the website myself?", "What we will ask you for", /prices/ and the home bakers page saying the same thing.
