# Service tests A: log

Branch: service-tests-a. All outputs are in this folder. Nothing here is published on the site.
Brand: logo files from public/brand, colours from src/styles/tokens.css, Inter from public/fonts/inter.woff2, number 084 694 6588 and website straatstudio.co.za from src/config/business.ts, prices from the same config.
Build scripts: _build/ (node _build/logo-pack.mjs, poster-pack.mjs, review-kit.mjs, posts.mjs, evidence.mjs, then python3 _build/sheets.py).
Times are from the computer clock on 25 November 2026 (South African time) and cover Claude Code's command running time recorded at the start and end of each service. They do not include time spent waiting for you.

Overall: start 21:50:59, end 21:58:44. Claude Code minutes for all four services plus checks: about 8 (the whole run, branch creation to final check).
Khulani minutes (all four): ____

## 1. logo-pack
- Start 21:52:46, end 21:53:19. Claude Code minutes: about 1.
- Produced: 8 SVG files (colour, white and dark versions of the full logo and the mark, square 640, favicon), 13 PNG files (the full logo in colour, white and dark at 300, 600 and 1200 px wide with a transparent background; the mark at 128, 256 and 512 px; the 640 px square for WhatsApp and Google), 7 favicon files (16, 32, 48, 180, 512 px, apple-touch-icon.png and favicon.ico), and a one-page A4 PDF usage guide.
- Paths: logo-pack/svg/, logo-pack/png/, logo-pack/favicon/, logo-pack/straat-studio-logo-guide.pdf
- Needed fixing: the PNG and PDF helpers did not create their output folders (fixed). The clear-space diagram used a 14 px gap where the rule says x is the height of the blue plate, which is 17 px at that size (fixed to 17 px).
- Note: the "dark" version is the logo in Night navy with a white S. It is not a black and white version. If a one-colour black logo is needed for printing, say so.
- Khulani minutes: ____

## 2. poster-pack
- Start 21:53:19, end 21:54:54. Claude Code minutes: about 2.
- Produced: A4 poster PDF (210 x 297 mm), WhatsApp status 1080 x 1080 PNG, WhatsApp status 1080 x 1920 PNG, business card PDF (90 x 50 mm, front and back as 2 pages).
- Paths: poster-pack/straat-studio-poster-a4.pdf, poster-pack/whatsapp-status-1080x1080.png, poster-pack/whatsapp-status-1080x1920.png, poster-pack/straat-studio-business-card-90x50mm.pdf
- Print notes: the PDFs are vector, so text and logo print sharp at any resolution (this is better than 300 dpi). Inter is embedded as Type 3 fonts, because the font file is a variable font. Most printers accept this, but a print shop may ask for outlined text. There is no bleed: the poster has a white margin and the navy band at the bottom runs to the page edge, so a print shop would need 3 mm bleed added. The card measures 90 x 50.1 mm because of rounding in the PDF export. The 1080 x 1920 image keeps its content 260 px from the top and bottom so the WhatsApp screen does not cover it.
- Needed fixing: the Inter font was not loading in the renderer, so the first version showed a fallback font (fixed by embedding the font in the page). The poster headline left the word "you." alone on a line (fixed with balanced line breaks).
- Khulani minutes: ____

## 3. review-kit
- Start 21:54:54, end 21:55:44. Claude Code minutes: about 1.
- Produced: a review request message, one follow-up message, a short how-to-use file, and an A5 thank-you card PDF (148 x 210 mm) with an empty dashed square marked "QR code goes here".
- Paths: review-kit/01-whatsapp-review-request.txt, review-kit/02-whatsapp-follow-up.txt, review-kit/README.txt, review-kit/thank-you-card-a5.pdf
- Placeholders left on purpose: [Customer name] and [Google review link]. The QR square is empty until the Google Business Profile exists.
- Needed fixing: nothing.
- Khulani minutes: ____

## 4. posts-sample-month
- Start 21:55:44, end 21:56:21. Claude Code minutes: about 1.
- Produced: 12 posts for December 2026 (Monday, Wednesday and Friday, from 2 December to 30 December, skipping 25 December), each with text and a 1080 x 1080 PNG, a posting calendar CSV (date, channel, text, image_file) and a plain text copy of all posts.
- Topics: free preview (3 posts), what is on a price page, how a WhatsApp button works, why a phone number should tap to call, One-Page, Business and Launch Pack (one post each), a concept example (Ndlovu Electrical, labelled "Concept project, not commissioned client work", with its real concept address in the caption), delivery times, domain ownership, who we build for.
- Paths: posts-sample-month/posting-calendar.csv, posts-sample-month/posts.txt, posts-sample-month/images/post-01-2026-12-02.png to post-12-2026-12-30.png
- Not included on purpose: a Catalogue post, because CLAUDE.md says not to sell or promise Catalogue until the product sheet is built.
- Needed fixing: on the first version the body text of two posts sat close to the footer. Text sizes were reduced and the images regenerated.
- Khulani minutes: ____

## Checks (21:56:44 to 21:58:21, about 2 minutes)
- Opened every PDF and PNG as images. Contact sheets are in evidence/: logo-pack, poster-pack, review-kit, posts-sample-month and phone-size-check (the files shown at 390 px wide, a phone screen width).
- Automatic check on every page and image before saving: no text outside the page, no clipped text, no overlapping text. Result: no issues on any file.
- Text extracted from every PDF and the posts and messages: zero em dashes or en dashes; zero banned words (best, fastest, guaranteed, leading, trusted by, number 1, most, cheapest, top-rated); the number 084 694 6588 appears and no other phone number appears anywhere (23 matches, all the same number); no old number (068 226 4586 in any form).
- Facts used: prices, delivery days and package contents come from src/config; sentences come from the live site wording. No clients, reviews, statistics, years or team size.
- Not checked: the text inside the PNG images was checked from its source strings, not by reading the pixels. The look of the PDFs on a physical printer.

## Change on 28 November 2026 (branch fix-round-1)
- Two posts rewritten so they no longer mention Google Business Profile setup, WhatsApp Business setup or "logo with 3 options" (posts 06 on 14 December and 07 on 16 December). Their dates and image file names are unchanged and the images, posts.txt, posting-calendar.csv and the contact sheets were regenerated. Post 06 now describes the Business website as up to 5 pages, a photo gallery and a quote form. Post 07 is now a free preview post.
- The Launch Pack and Catalogue are no longer promoted in the sample month. The Catalogue package is marked "Coming soon" on the site.

---

# Service tests batch B (28 November 2026)

Branch: service-tests-batch-b, made from launch-polish (the launch-polish branch had not yet been merged to main when this started). Times are the computer clock (South African time) and cover Claude Code's command running time only. Evidence files are in service-tests/evidence/batch-b/.
Overall: 14:00 to 14:06, about 6 minutes.

## 1. Uptime monitor
- Minutes: about 3 (14:02 to 14:05). Khulani minutes: ____
- Built: uptime-monitor/ (Cloudflare Worker with a cron every 5 minutes, checks straatstudio.co.za and the three concept sites; after 2 failures in a row it POSTs once to an Apps Script web app that emails Khulani, plus CLIENT_TO if set; one "Back up" email on recovery; test mode at /test checks a deliberately broken address twice). Run-it-yourself script: uptime-monitor/deploy-uptime.sh. Steps: uptime-monitor/README.txt.
- Tests: 19 offline logic checks pass (01a-uptime-logic-tests.txt): 2-failure rule, no repeat alerts, reset on success, recovery message, per-site tracking, lost-alert retry, test mode, free-plan KV write limit, Apps Script secret, recipients, TEST marking.
- Local run with real network (01b, 01c, 01d): `wrangler dev --local` with a mock alert address. A scheduled run checked all 4 live sites: all returned 200, no alert. Test mode sent one POST marked test=true after the 2nd failed check of a broken straatstudio.co.za address (404). A wrong key returned 404.
- Needed fixing: Cloudflare Workers refuse a main file that exports anything except the handler, so the logic moved to src/monitor.js. The first design wrote to KV on every check (1,152 writes a day, free limit 1,000); it now writes only when something changes (tested).
- NOT tested: the real Apps Script web app, the real Cloudflare deployment, a real email arriving, and the cron firing on Cloudflare. Those need your Google and Cloudflare logins.
- Not covered: if Cloudflare itself is down the monitor may not tell you; a 5-minute interval can miss a very short outage.

## 2. Customer automatic reply (StraatOS)
- Minutes: about 1 (14:01). Khulani minutes: ____
- Finding: StraatOS already sent a copy to the customer when an email was given. It is now a proper automatic reply that names the business: "Thank you. <business> has your request and will be in touch.", says it is an automatic reply, repeats the reference, job, area and problem, and the reply-to is the business. The owner alert is unchanged (checked by a test).
- Files: straatos/apps-script/Code.gs (sendCustomerCopy_), straatos/test/code-gs.test.mjs.
- Tests: 29 of 29 pass (02-customer-reply-test-output.txt), including: no email gives exactly one email (to the owner) and no other recipient; with an email the reply goes only to the customer, uses the business name in the text, sender name and subject, and does not contain the owner address.
- NOT tested on real Google (the tests use fakes of Google services).

## 3. Monthly report
- Minutes: about 1 (14:01). Khulani minutes: ____
- Ran the real monthlyReport() from Code.gs on a made-up sheet of 12 enquiries (service-tests/_build/monthly-report-run.mjs). Output: 03-monthly-report-email.txt. Counts checked by hand: 12 received, 6 quotes (3 Quote sent and 3 Won), 3 Won, 2 Lost, 4 still New or Contacted, top jobs and areas ranked.
- The email was NOT sent: the Google test sheet cannot be reached from here, and the tests use a fake mail service. The saved file is the email text the function builds. The month label shows 2026-09 only because the test fake formats dates in UTC; real Google gives the month name.
- Needed fixing (my script, not the product): the first run put the first row in the header row and counted 11, not 12.

## 4. Growth page template (one local service page)
- Minutes: about 2 (14:04 to 14:06). Khulani minutes: ____
- Built: src/pages/local/[slug].astro (template), src/data/local-pages.json (empty list, so nothing is built), src/data/local-pages.template.json (field guide), src/lib/local-pages.mjs (rules), tools/local-page.mjs (list, add, check, publish).
- A page is built only when "approved" is true. Rules enforced at add, check and build: title under 61 characters, description under 156, at least 2 sections, 3 to 5 FAQs, at least 2 services, at least 500 words, no em or en dashes, no banned claims (best, guaranteed, leading and so on), prices flagged for checking.
- Test with made-up text (04-growth-page-test.txt): a draft is not built and not in the sitemap; a short draft and a draft with a long title, dashes and banned words are refused; the good draft built as /local/test-template-page/ with one H1, absolute canonical, FAQ and breadcrumb data, in the sitemap, links to /prices/ and /contact/, Lighthouse 100/100/100/100. The test data was then removed: the data file is an empty list again and the site has no /local/ pages.
- Nothing published. Waiting for your text and your approval.
