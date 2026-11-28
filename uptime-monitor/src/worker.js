// Straat Studio uptime monitor: a Cloudflare Worker that runs every 5 minutes.
// It fetches each site. After 2 failures in a row it POSTs one alert to an Apps Script web app that sends the email.
// When the site comes back it sends one "back up" message. State is kept in a KV namespace called STATE.

import { runChecks, runTestMode, targetsFrom } from './monitor.js';

export default {
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(runChecks(env));
  },
  // GET /status?key=SECRET shows the saved state. GET /test?key=SECRET runs test mode. Anything else says nothing.
  async fetch(req, env) {
    const u = new URL(req.url);
    if (!env.ALERT_SECRET || u.searchParams.get('key') !== env.ALERT_SECRET) return new Response('Not found', { status: 404 });
    if (u.pathname === '/test') return Response.json(await runTestMode(env));
    if (u.pathname === '/status') {
      const rows = {};
      for (const t of targetsFrom(env)) rows[t.name] = JSON.parse((await env.STATE.get('site:' + t.name)) || 'null');
      return Response.json(rows);
    }
    return new Response('Not found', { status: 404 });
  },
};
