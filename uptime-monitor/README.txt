Straat Studio uptime monitor

What it does: a Cloudflare Worker checks straatstudio.co.za and the three concept sites every 5 minutes. A site counts as down if it does not answer within 10 seconds or answers with an error (400 or higher). After 2 checks in a row that fail, it sends ONE alert email to you. When the site is back it sends one "Back up" email.

Parts
- src/monitor.js, src/worker.js: the Worker.
- apps-script/Alert.gs: the Google Apps Script web app that receives the alert and sends the email.
- test/worker.test.mjs: 19 offline tests (node uptime-monitor/test/worker.test.mjs from the repo root).
- deploy-uptime.sh: the script you run to deploy.

A. Apps Script (about 5 minutes, on your phone or computer)
A1. Go to script.google.com, New project, name it "Straat uptime alerts". Paste the whole of apps-script/Alert.gs into Code.gs.
A2. Project settings, Script properties, add: ALERT_SECRET (make up a long random text), ALERT_TO (your email). Optional later: CLIENT_TO (a client email, it is added to every alert).
A3. Deploy, New deployment, type Web app, Execute as: Me, Who has access: Anyone. Authorise when asked.
A4. Copy the web app address (ends in /exec).
A5. Keep the address and the secret for the deploy script.

B. Cloudflare: run the deploy script (see its first lines).

C. Test mode: open https://WORKER_ADDRESS/test?key=SECRET on your phone. The Worker checks a deliberately broken address twice and the email arrives with the subject "TEST: DOWN: TEST broken address".

Free plan limits: the Worker runs 288 times a day, well inside the free limits for Workers and KV writes (a healthy site is saved once and not rewritten, because the free plan allows 1,000 KV writes a day).
Limits to know: the monitor runs on Cloudflare, so if Cloudflare itself is down it may not tell you. Checks every 5 minutes mean a short outage can be missed. It checks that the page answers, not that every page works.
