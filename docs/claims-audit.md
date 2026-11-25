# Claims audit, 25 November 2026 (report only, nothing on the site was changed)

Wording that offers or implies a service that may not be built or tested yet. Each line is file and line in `src/`, then the page it appears on.

## Not found anywhere on the site
Straat Posts, Review kit, Google Check, analytics reports, "setup call" as a phrase.

## Straat Leads (email alert, automatic reply, monthly report) written as live
CLAUDE.md section 14 says Phase 1 runs on Google Sheets plus Apps Script, and a monthly report is a template filled by hand. Check each of these is true before launch.
- `pages/index.astro:60` (home hero): "with Straat Leads you get an email alert when a customer sends a quote request."
- `pages/index.astro:92, 148, 160, 163-165` (home): "An email alert to you for each enquiry", "an automatic reply to the customer and a monthly report", "A monthly report".
- `pages/enquiry-system.astro:29, 37, 43, 56, 57, 67-69, 90` (/enquiry-system/): email alert, automatic reply, "A report of your enquiries, sent to you every month."
- `pages/prices.astro:136` (/prices/) and `pages/terms.astro:87` (/terms/): "an email alert to you for each enquiry, an automatic reply to the customer, and a monthly report."
- `pages/websites-for-plumbers.astro:42, 53, 59`, `websites-for-electricians.astro:43, 54`, `websites-for-salons.astro:50` (trade pages): Straat Leads email alert, automatic reply and monthly report.
- `components/PhoneMock.astro:12-13` (home, /enquiry-system/, trade pages): labelled "Example with made-up data".
- `components/SiteHeader.astro:9`, `SiteFooter.astro:12, 28`: "Enquiry alerts", "Websites and enquiry alerts for small businesses".

## Straat Growth (not built, Phase 2 and later in CLAUDE.md)
- "Everything in Leads, plus 2 Google posts a month and a new service or area page every quarter." at `pages/index.astro:149`, `enquiry-system.astro:91`, `prices.astro:137`.

## Straat Care
- "Backups, uptime checks and 1 small change a month. From year 2, hosting and your domain are included." at `index.astro:147`, `prices.astro:135`, `enquiry-system.astro:89`, `terms.astro:86`; also `index.astro:28`, `how-it-works.astro:21`, `websites-for-electricians.astro:54`, `websites-for-home-bakers.astro:50` ("keeps it backed up").

## WhatsApp Business setup (including the guided call)
- `config/packages.ts:15, 21`: "WhatsApp Business setup (ready-to-paste texts plus one guided call)", shown on the home page, /websites/ and /prices/.
- `config/packages.ts:9`: "WhatsApp Business starter sheet (ready-to-paste texts)".
- `pages/websites.astro:79`: "Greeting and away messages and quick replies, ready to paste. Included in Business, Catalogue and the Launch Pack."
- `pages/prices.astro:164`, `config/packages.ts:27-28`, `pages/index.astro:95-96` ("WhatsApp, logo and posters": "WhatsApp Business setup with ready-to-paste texts, a name logo and 3 posters for Facebook and Instagram.").
- Trade pages: `websites-for-electricians.astro:51`, `websites-for-plumbers.astro:50`, `websites-for-salons.astro:48`.

## Logo and poster pack
- `config/business.ts:92-93`: Logo R300, "Poster pack (3)" R350 (add-on prices on /prices/ and /websites/).
- `config/packages.ts:27-28`: Launch Pack "Logo, 3 options", "3 social media posters".
- `pages/websites.astro:81, 95`: "Poster pack: 3 posters sized for Facebook and Instagram. In the Launch Pack."
- `pages/prices.astro:23`, `pages/websites-for-electricians.astro:52`: "a logo and 3 social media posters, the Launch Pack is ... and includes all of that."

## Google Business Profile setup
- `config/packages.ts:15-16`: "Google Business Profile set up" (Business, Catalogue, Launch Pack).
- `pages/index.astro:27, 40, 87`, `websites.astro:78, 95`, `prices.astro:164, 182`, `terms.astro:72`, `about.astro:51`, `websites-for-salons.astro:40`, `websites-for-plumbers.astro:50`, `websites-for-electricians.astro:51, 53`: Google Business Profile created or cleaned up, linked to the site, "We are added as a manager".
- `config/business.ts:94`: add-on "Google Business Profile setup or fix", R250.

## Catalogue
- Product sheet and automatic refresh within minutes (`packages.ts:21`, home bakers page, /prices/): CLAUDE.md section 10 says do not sell or promise Catalogue until the owner product sheet is built.
