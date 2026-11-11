# Straat Studio: preview, intake and SEO rules (11 Nov 2026)

These are the working rules for how Straat Studio shows previews, collects client details and wins on Google. CLAUDE.md has been updated to match this file.

Note: `02-quick-reference.md` and the Master Plan are mentioned below. They live in the Claude project, not in this repo.

## 1. The free preview

**Rule: every package gets a free homepage preview. One preview per business. No changes before payment.**

What the client gets:
- One homepage only, built from our template using public information (their Google listing, Facebook page, reviews). About 30 to 45 minutes of work.
- A view-only link on our own address, for example preview.straatstudio.co.za/ndlovu-electrical/. Never a file, never a zip, never their own domain.
- The link stays live for 7 days, then we switch it off.

How we stop them stealing it:
- They never get the files. A preview link is a page on our hosting, not their website.
- Every preview shows a thin banner: "Preview by Straat Studio. Not yet live." The page is hidden from Google (noindex) and every button (Call, WhatsApp, form) goes to us, not to them. A stolen screenshot cannot take a single enquiry.
- The domain is only registered after payment, in their name.
- Honest note: nobody can stop someone taking a screenshot to a cheaper builder. That is fine. A screenshot is not a working site, and the preview cost us 30 minutes, not a day.

How we stop the endless-changes problem:
- The preview is shown once, as it is. If they ask for changes, the answer is: "Happy to. Changes start once you approve and pay to start. Your package includes 2 rounds of changes."
- One-Page: paid in full to start. Business, Catalogue, Launch Pack: 50% to start, 50% before going live.
- After payment: 2 rounds of changes, each sent as one list, within 7 days of each version. Extra changes during the build are R150 each.
- If the client goes silent for 30 days after payment, the project closes. The deposit covers the work done. This goes in the written agreement.

Who gets a preview (so we do not waste time):
- Only businesses that replied YES to the permission message, or contacted us first.
- Priority: businesses with 10 or more Google reviews and no website.
- Follow up 3 times (day 1, day 3, day 7), then stop.

## 2. Collecting client details

**Rule: one online form with branching, not four separate forms.** The client picks their package at the top, and the form only shows the questions for that package. This is standard practice: one link to send, one sheet of answers, no wrong form.

Tool: Google Forms (free, file uploads go to our Drive, answers land in a Google Sheet). Send the link only after payment.

### Section A: every package
1. Business name, exactly as it should appear
2. Your name and role
3. WhatsApp number, phone number, email for enquiries
4. Physical address, or "service area only" (we will not show a home address)
5. Towns and suburbs you serve (list up to 15)
6. Days and hours
7. Your services, one per line, with a starting price if you want prices shown
8. What makes you different (2 to 3 sentences, your own words)
9. Logo upload, or "I do not have one"
10. 6 to 15 photos of your real work, team or premises (upload)
11. Links: Google listing, Facebook, Instagram, TikTok
12. Domain you want (we check it is free)
13. Colours you like or must avoid
14. Websites you like (optional)
15. Tick: "These photos are mine or I have permission to use them"
16. Tick: POPIA consent to process these details for building the site

### Section B: Business package (adds)
17. For each service (up to 4): what it is, who it is for, typical price, how long it takes
18. 3 to 5 questions customers always ask, with your answers
19. Before and after photos (optional)
20. Certificates or registrations to show (for example COC, PIRB, CIDB)
21. Google Business Profile: "I have one" (share access) or "please create one"

### Section C: Catalogue package (adds)
22. Product list on our Google Sheet template: name, price, size or option, short description, category
23. One photo per product (upload, named the same as the product)
24. Delivery or collection: areas, fees, order cut-off day
25. Payment: WhatsApp orders only, or PayFast or Yoco (they open the account in their own name)

### Section D: Launch Pack (adds Section B plus)
26. Logo: words to use, one symbol idea, 3 logos you like
27. Poster messages: 3 offers or messages for the 3 posters
28. WhatsApp Business: greeting message, away message, 5 quick replies, catalogue items

### Section E: Straat Leads (adds)
29. Job types for the quote form (5 to 8)
30. Email that gets the instant alert
31. The reply customers get automatically
32. Sign the one-page POPIA data agreement

## 3. Prices: checked

All prices on the new homepage match 02-quick-reference.md. Fixes made on 11 Nov:
- "Most chosen by trades" changed to "Recommended for trades". We have no sales yet, so "most chosen" was an untrue claim.
- JSON-LD price range now R999 to R3,299 (it left out the Launch Pack).
- Extra changes: the Master Plan said R100 in one place and R150 in another. Confirmed by the owner: R150 for each change beyond the 2 included rounds during the build, and R100 for a single change after launch without Straat Care. Both are in `business.ts`.
- Pay-monthly costs R5,887 over 12 months against R5,487 for paying upfront (Business plus 12 months of Leads). The R400 difference is fair for spreading the cost.
- Launch Pack R3,299 is R100 cheaper than buying Business plus logo, posters and WhatsApp setup separately (R3,399). Correct.

## 4. National, not Cape Town only

- All copy now says South Africa. Cape Town appears only as "Based in Cape Town, serving all of South Africa".
- No claims about team size. The site speaks as "we", the registered company, with written promises. We do not say how many people work here, and we do not invent staff.
- Concept examples now come from different places: Athlone (Cape Town), Soweto (Johannesburg), Mitchells Plain (Cape Town). Add a Durban or Pretoria example next.

## 5. SEO plan

No one can promise first place on Google. This is what gives us the best chance, in order.

Done on the homepage:
- One H1, logical headings, title under 60 characters, description under 155
- JSON-LD: ProfessionalService (area served: South Africa, price range) and FAQPage
- Fast: about 60 KB page, self-hosted fonts, almost no JavaScript
- Works on phones, built with accessibility in mind; a full accessibility check is still to be run

Still to do:
1. Register straatstudio.co.za and connect Google Search Console on day 1.
2. Google Business Profile as a service-area business in Cape Town. This wins Cape Town searches first.
3. Trade pages that work nationally: "Websites for electricians", "Websites for plumbers", "Websites for salons", "Websites for home bakers". Each 700+ words of original content. These win searches from anywhere in South Africa.
4. Guides, our national engine: "How much does a website cost in South Africa", "Google Business Profile: free setup guide", "Website or Facebook page". 1 new guide every 2 weeks.
5. City pages (Johannesburg, Durban, Pretoria) only when we have a real client or genuinely different content there. Copy-paste city pages get penalised by Google.
6. Every client site has "Website by Straat Studio" in the footer, linking back. This is free, honest SEO that grows with every client.
7. Ask every client for a Google review.

Realistic timing: guides and trade pages start bringing visitors after 3 to 6 months. The first clients still come from direct outreach.

## 6. Real examples

Rule: examples are labelled "Concept project, not commissioned client work" until real clients replace them. That label stays. Showing a made-up business as a real client would break consumer law and destroy trust once found out.

What changes: each concept becomes a full, clickable website with real licensed photography (Pexels or Unsplash, credited in docs/image-credits.md), never AI images. The homepage tiles then show real screenshots and a "View the live example" button. The client sees exactly what they will pay for.
