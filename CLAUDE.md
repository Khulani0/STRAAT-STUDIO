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
- Fonts: Source Serif 4 (headings) and Inter (body), self-hosted as woff2 in `public/fonts/` (`source-serif-4.woff2`, `inter.woff2`) with `font-display: swap` and a system fallback. Preload both. No Google Fonts request at runtime.
- Forms: Web3Forms or Formspree free tier, with a honeypot field and a POPIA consent line.
- Analytics: Cloudflare Web Analytics (no cookies, no banner needed). Track clicks on WhatsApp, phone and form submit as events.
- Zero client-side framework. Vanilla JS only for the menu and FAQ. Total JS under 15 KB.

## 3. Design system

| Token | Value |
| --- | --- |
| Ink | #14161A |
| White | #FFFFFF |
| Sand (alternate light sections) | #F5F3EF |
| Line (borders) | #E4E1DA |
| Muted text on white and sand | #555B63 (passes 4.5:1) |
| Straat blue (buttons and links) | #2F54EB, hover #2443C4 |
| Blue soft (badges) | #E8EDFF |
| Night navy (dark sections, footer) | #0F1B2D, alt #172640 |
| Text on night | #C9D1DC |
| Sign yellow (accent) | #FFC629, soft #FFF4CC |
| WhatsApp green (WhatsApp buttons only) | #25D366, dark #128C4A |

- Type scale: H1 clamp(38px, 5.4vw, 64px), H2 clamp(30px, 3.8vw, 46px), H3 clamp(21px, 2vw, 26px), body 17px (18px from 768px wide), line-height 1.6. No heading above 64px.
- Headings: Source Serif 4, weight 600, letter-spacing -0.012em. Body and UI text: Inter.
- Layout: max-width 1200px plus 24px side padding, section padding 112px on desktop and 72px on mobile.
- Backgrounds: white and Sand for light sections, Night navy for dark sections and the footer. Dark sections are allowed, but keep them to a few and never two in a row.
- Colour: Straat blue for buttons and links, sign yellow #FFC629 as the accent (highlights, tags, small marks). Green only on WhatsApp buttons. Never show a row of buttons in three different colours.
- Shape and depth: 14px corners on cards and panels. Soft shadows only (for example 0 30px 60px -30px rgba(15,27,45,.35)). Buttons are 8px corners as built in the design, min height 48px, visible focus ring 3px accent (yellow on dark sections).
- Icons: plain line icons, 2.5px stroke. Use them sparingly.
- Motion: no entrance animations, no fade-ins, no scroll effects. Respect `prefers-reduced-motion`.
- Hero: headline on the left, a picture of a concept site on the right. Until the concept sites are built it is an HTML mock-up labelled "Concept project, not commissioned client work". Replace it with real screenshots.
- Presentation: the site presents Straat Studio as a company. No photos of individuals, no personal details and no address on the site. Copy says South Africa, with Cape Town only as "based in".

## 4. Site map

| URL | Purpose |
| --- | --- |
| `/` | Homepage (canvas design) |
| `/prices/` | Full package comparison, add-ons, year 2 costs |
| `/work/` | Concept projects index |
| `/work/[slug]/` | One case study per concept project |
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
  - Homepage: `ProfessionalService` with name, url, telephone, email, areaServed (South Africa, as a Country), address only if the owner approves showing it, priceRange "R999 to R3299" (taken from `prices.priceRange` in business.ts).
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
- Floating WhatsApp button never covers form fields or the footer links on mobile.
- Every form field has a visible label.

## 9. Contact links

- WhatsApp: `https://wa.me/27XXXXXXXXX?text=` with a pre-filled message per page, for example "Hi Straat Studio, I'd like a free homepage preview for my electrical business."
- Phone: `tel:+27XXXXXXXXX`.
- Replace XXXXXXXXX with the real number from `/src/config/business.ts`. All business facts (name, number, email, reg number, prices) live in that one file.

## 10. Concept portfolio (separate repos, separate subdomains)

Build 3 complete concept websites, each with its own look, as proof of standard:
1. `ndlovu-electrical` (Business package): 5 pages, service pages, areas, quote form.
2. `fazilas-kitchen` (Catalogue package): product catalogue with Sveltia CMS, WhatsApp order buttons with the product name pre-filled.
3. `thandeka-hair` (One-Page package): prices, hours, map, booking by WhatsApp.

Host each at `concepts.straatstudio.co.za/[name]/` or its own Pages project. Each gets a case study on `/work/[slug]/`: the brief, design choices, features, mobile and desktop screenshots, Lighthouse scores, and the concept label.

## 11. Legal (POPIA)

- `/privacy/`: what the form collects, why, where it is stored, how long, who to contact, the right to access and delete.
- `/terms/`: scope, payment (50/50 or full for One-Page), 2 revision rounds, delivery clock starts on content received, ownership passes on final payment, no ranking guarantees, Straat Care terms, cancellation.
- `/paia-manual/`: PAIA manual for STRAATTECH (Pty) Ltd.
- Footer: "Straat Studio is a trading name of STRAATTECH (Pty) Ltd, Reg. 2026/409104/07".
Mark these pages "Draft, review before launch" until the owner confirms.

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

Never build a phase before the business trigger is met. Ask the owner to confirm the trigger first.

### Phase 1: now, no custom backend
- A reusable `QuoteForm` component on every client site: job type (dropdown per trade), suburb, description, up to 3 photos, name, phone, preferred contact (WhatsApp or call), POPIA consent tick box.
- Submissions go to the client's own Google Sheet through a Google Apps Script web app (one script per client, deployed under the client's Google account, Straat Studio as editor).
- The sheet has a Status column with a dropdown: New, Contacted, Quote sent, Won, Lost.
- The script emails the owner instantly and emails the customer an acknowledgement.
- Photos go to a Google Drive folder owned by the client, with links in the sheet.
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

Websites: One-Page R999, Business R2,499, Catalogue R2,999, Launch Pack R3,299.
Monthly: Straat Care R99, Straat Leads R249, Straat Growth R449.
Pay-monthly: R499 setup, then R449 a month for 12 months (Business + Leads), then R249.
Year 2 hosting and domain without a plan: R999 a year.
