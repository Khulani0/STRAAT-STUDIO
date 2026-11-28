#!/usr/bin/env bash
# Deploys the Straat Studio uptime monitor (Cloudflare Worker, checks every 5 minutes).
# Run it yourself in a terminal where you are logged in to Cloudflare:
#   bash /home/sojama/STRAAT-STUDIO/uptime-monitor/deploy-uptime.sh
# Before you run it, do the Apps Script part in uptime-monitor/README.txt (steps A1 to A5) and keep the web app address and the secret ready.
# It never deletes anything. It asks before it changes your account.
set -euo pipefail
cd "$(dirname "$0")"
fail() { echo; echo "STOPPED: $1" >&2; exit 1; }

echo "== Cloudflare account =="
npx wrangler whoami || fail "not logged in. Run: npx wrangler login"
read -r -p "Is this the right Cloudflare account? Type yes to continue: " ok
[ "$ok" = "yes" ] || fail "you did not type yes"

echo; echo "== Offline tests (must all pass) =="
node test/worker.test.mjs | tail -3 || fail "tests failed, nothing deployed"

if grep -q REPLACE_BY_DEPLOY_SCRIPT wrangler.toml; then
  echo; echo "== Creating the small store the monitor uses to remember failures =="
  out=$(npx wrangler kv namespace create STATE 2>&1) || { echo "$out"; fail "could not create the KV namespace"; }
  echo "$out"
  id=$(echo "$out" | grep -oE '[0-9a-f]{32}' | head -1)
  [ -n "$id" ] || fail "could not read the new namespace id from the output above. Copy it into wrangler.toml by hand."
  sed -i "s/REPLACE_BY_DEPLOY_SCRIPT/$id/" wrangler.toml
  echo "Saved the store id in wrangler.toml"
fi

echo; echo "== Secrets (typed here, never saved in a file) =="
read -r -p "Paste the Apps Script web app address (ends in /exec): " url
read -r -s -p "Paste the same ALERT_SECRET you set in Apps Script (hidden): " secret; echo
[ -n "$url" ] && [ -n "$secret" ] || fail "both are needed"
echo "== Deploying =="
npx wrangler deploy
printf '%s' "$url" | npx wrangler secret put ALERT_URL
printf '%s' "$secret" | npx wrangler secret put ALERT_SECRET

echo; echo "== Done. Now run the test mode =="
echo "Open this address in your phone browser (replace WORKER_ADDRESS with the *.workers.dev address printed above, and SECRET with your secret):"
echo "  https://WORKER_ADDRESS/test?key=SECRET"
echo "Within a minute you should get one email whose subject starts with TEST: DOWN. If you do, the monitor is working."
echo "Status page: https://WORKER_ADDRESS/status?key=SECRET"
echo "To stop the monitor later: npx wrangler delete  (run in this folder)."
