# Service audit: Straat Leads and Straat Care (28 November 2026)

Audit only. Nothing was changed in /home/sojama/straatos or on the site. Evidence is what I read and ran: the files below, `npm run test:script` in straatos (re-run today: 27 checks, 27 PASS, 0 FAIL), a GET to the deployed Apps Script address in `src/config/straatos.ts` (HTTP 200, `{"ok":true,"service":"StraatOS","business":"Test Business",...}`), and the service card and build log in `straatos/docs/`. The 71 browser checks (`test/run-e2e.sh`) are reported in the build log from 15 November; I did not re-run them.

Key fact: the tests run Code.gs against fakes of the Google services. The service card says "Not yet run on real Google or a real phone." No client site has the quote form live. straatstudio.co.za itself has no form. The Ndlovu concept site has a demo form that sends nothing.

## What exists today

| Item | Status | Where and evidence |
| --- | --- | --- |
| Enquiry form (job, area, problem, name, phone, optional email, optional photos, POPIA consent, WhatsApp fallback) | Partly working | `straatos/src/components/QuoteForm.astro`, `src/scripts/quote-form.js`. 71 browser checks in the build log. A real Apps Script web app is deployed and answers a GET. Not tested on a real phone, not on any live client site. |
| Owner email alert | Partly working | `apps-script/Code.gs` `sendOwnerAlert_` (subject "New enquiry: JOB, AREA", tap-to-call and WhatsApp reply links). 27 logic checks pass against fakes. Not verified on real Google (delivery, spam folder). |
| Automatic reply to the customer | Partly working | `sendCustomerCopy_`. Sent by email only if the customer typed an email address. Every customer sees an on-screen thank-you with a WhatsApp button. Tested against fakes only. There is no automatic WhatsApp reply. |
| Photos (up to 3) | Partly working | `handlePhoto_`, Drive folder, links in the sheet, not attached to the email. Tested with synthetic photos only. The service card says "Unknown until you test it on a real phone". HEIC (iPhone) in older browsers unverified. |
| Enquiry list or inbox | Partly working | A Google Sheet "Enquiries" tab with reference, Status dropdown (New, Contacted, Quote sent, Won, Lost). Created by `setup()`. Since 18 November the client does not get access to the sheet, so there is no inbox for the client, only the email alerts. No dashboard exists. |
| Monthly report | Partly working | `monthlyReport()` with a trigger on the 1st at 08:00. Counts last month, top jobs and areas (logic test passes). Trigger firing on real Google is listed as not verified. |
| Daily quote reminder and review link | Partly working | `dailyReminder()` (quotes marked "Quote sent" for over 3 days) and a review link formula on Won rows. Logic tests pass. Not claimed on the site. |
| Backups (Straat Care) | Partly working, manual only | Process only: the checklist says to download each client sheet monthly as xlsx (`straatos/docs/setup-checklist.md` line 71). The website files are in GitHub and Cloudflare Pages keeps deployments. No automatic backup of client sheets exists. |
| Uptime checks (Straat Care) | Not built | Only a "Site up" column to fill by hand in `straatos/tools/care-register.xlsx` (formulas not yet opened in Google Sheets, per the build log). No monitoring tool or script exists. |
| One small change a month (Straat Care) | Process only | A WhatsApp request, done by hand. Nothing built or tested. |
| 2 Google posts a month and a new service or area page every quarter (Straat Growth) | Not built | A sample month of posts exists in `service-tests/posts-sample-month`, but no Google Business Profile exists to post to, and no process has been run. |

Other finding: `straatos/src/config/straatos.ts` line 7 (and three test files) still use the OLD number 27682264586 for the WhatsApp fallback and links. It must change to 27846946588 before any client site uses the form. The uncommitted changes in straatos also have not been committed.

## Which site wording is true today

True means it matches what is built and tested. "True in tests" means it works against fakes but is not yet proven live.

| Wording | Where | Verdict |
| --- | --- | --- |
| "with Straat Leads you get an email alert when a customer sends a quote request" | Home hero | True in tests, not proven live. |
| "A quote form on your site and an email alert to you for each enquiry. R249 a month." | Home, /enquiry-system/ | True in tests, not proven live. No live client site has the form yet. |
| "an automatic reply to the customer" | Home, /prices/, /terms/, /enquiry-system/, electrician, plumber and salon pages | Overstated. By email it only happens if the customer gave an email address. Everyone sees an on-screen thank-you. |
| "a monthly report" | Same pages | True in tests, trigger not proven on real Google. |
| "job, suburb, phone, photos and an optional email" | Home | True in tests. Photos unproven on a real phone. |
| "We do not send WhatsApp alerts or WhatsApp auto-replies" | /enquiry-system/ | True. |
| "Backups, uptime checks and 1 small change a month" (Straat Care) | Home, /prices/, /terms/, /enquiry-system/, FAQs, electrician and bakers pages | Not fully true. Uptime checks are not built. Backups are manual. One small change a month is a manual process. |
| "2 Google posts a month and a new service or area page every quarter" (Straat Growth) | Home, /prices/, /enquiry-system/ | Not true today. Not built. |
| Phone mock-up (quote form, email alert, automatic reply) | Home, /enquiry-system/, trade pages | True as a picture of the designed flow, labelled "Example with made-up data". The real alert subject is "New enquiry: JOB, AREA" with no "photos added", so the made-up card is richer than the real email. |
| "A monthly report of the enquiries that came in" | /enquiry-system/ step 3 | Same as the monthly report above. |
