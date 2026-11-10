# Straat Studio: production website build brief (CLAUDE.md)

Put this file in the root of the repo as `CLAUDE.md`. Claude Code reads it at the start of every session.

## 0. Mission

Build straatstudio.co.za: a world-class, fast, honest website for a Cape Town web studio that sells fixed-price websites to trades and small businesses. It must look hand-crafted, never template-made or AI-made, and it must be technically perfect for local SEO.

The approved design reference is the "Straat Studio homepage v2" canvas. Match its structure, copy, type and colour. Improve craft wherever you can, never generic it down.

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
- Fonts: Bricolage Grotesque (headings), DM Sans (body), self-hosted as woff2 subsets with `font-display: swap`. No Google Fonts request at runtime.
- Forms: Web3Forms or Formspree free tier, with a honeypot field and a POPIA consent line.
- Analytics: Cloudflare Web Analytics (no cookies, no banner needed). Track clicks on WhatsApp, phone and form submit as events.
- Zero client-side framework. Vanilla JS only for the menu and FAQ. Total JS under 15 KB.

## 3. Design system

| Token | Value |
| --- | --- |
| Ink | #15171A |
| Black (footer only) | #000000 |
| White | #FFFFFF |
| Mist (alternate sections) | #F3F4F6 |
| Accent (Straat blue) | #2F54EB |
| Accent light (links on the black footer only) | #8EA8FF |
| WhatsApp green (WhatsApp button only, nowhere else) | #25D366 |
| Muted text on white | #4A5058 (passes 4.5:1) |
| Muted text on black | #C3C8CE |

- Type scale: the largest heading on the site is 64px. H1 clamp(38px, 5.5vw, 64px), H2 clamp(30px, 4vw, 44px), H3 22 to 28px, body 17 to 20px, line-height 1.6.
- Headings: Bricolage Grotesque 800, letter-spacing -0.03em.
- Layout: max-width 1240px, 24px side padding, 96px section padding (64px on mobile).
- Backgrounds: white and Mist only, from the header down to the footer. Black is used for the footer only.
- Colour: Straat blue is the only brand colour, used for buttons and links. Green appears only on the WhatsApp button. Never show a row of buttons in three different colours. No gradients, no glow.
- Buttons: 6px corner radius (never pills), min height 48px, visible focus ring 3px accent.
- Icons: plain line icons, 2.5px stroke, in Ink. Never inside coloured circles or badges. Use them sparingly.
- Motion: none. No fade-ins, no entrance animations, no scroll effects. Respect `prefers-reduced-motion`.
- Personal touch: the homepage has a clear space for a real photo of Khulani with a short note signed by Khulani. It is marked as a placeholder until the photo is supplied. Copy says "Cape Town small businesses", not only trades.

## 4. Site map

| URL | Purpose |
| --- | --- |
| `/` | Homepage (canvas design) |
| `/prices/` | Full package comparison, add-ons, year 2 costs |
| `/work/` | Concept projects index |
| `/work/[slug]/` | One case study per concept project |
| `/web-design-electricians-cape-town/` | Trade page |
| `/web-design-plumbers-cape-town/` | Trade page |
| `/web-design-salons-cape-town/` | Trade page |
| `/web-design-home-bakers-cape-town/` | Trade page |
| `/guides/` | Guides index |
| `/guides/website-cost-cape-town/` | Guide |
| `/guides/google-business-profile-free/` | Guide |
| `/guides/website-vs-facebook-page/` | Guide |
| `/about/` | Who runs Straat Studio, how we work |
| `/contact/` | WhatsApp, email, enquiry form |
| `/privacy/` | POPIA privacy notice |
| `/terms/` | Terms of service |
| `/paia-manual/` | PAIA manual for STRAATTECH (PTY) LTD |
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
  - Homepage: `ProfessionalService` with name, url, telephone, email, areaServed (Cape Town), address only if the owner approves showing it, priceRange "R999 to R2999".
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
- `/paia-manual/`: PAIA manual for STRAATTECH (PTY) LTD.
- Footer: "Straat Studio is a trading name of STRAATTECH (PTY) LTD, Reg. [REG NUMBER]".
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
