// Straat Studio uptime monitor: a Cloudflare Worker that runs every 5 minutes.
// It fetches each site. After 2 failures in a row it POSTs one alert to an Apps Script web app that sends the email.
// When the site comes back it sends one "back up" message. State is kept in a KV namespace called STATE.

export const FAILS_BEFORE_ALERT = 2;
export const TIMEOUT_MS = 10000;

export function targetsFrom(env) {
  return JSON.parse(env.TARGETS);
}

/** Fetch one URL. Up means a final status below 400. Anything else (error, timeout, 4xx, 5xx) is down. */
export async function checkOne(url, fetchFn = fetch) {
  const started = Date.now();
  try {
    const res = await fetchFn(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(TIMEOUT_MS), headers: { 'user-agent': 'StraatStudioUptime/1.0' } });
    const ok = res.status < 400;
    return { ok, status: res.status, ms: Date.now() - started, error: ok ? '' : 'HTTP ' + res.status };
  } catch (e) {
    return { ok: false, status: 0, ms: Date.now() - started, error: String(e && e.message ? e.message : e).slice(0, 120) };
  }
}

async function sendAlert(env, payload, fetchFn) {
  if (!env.ALERT_URL) return { sent: false, reason: 'ALERT_URL is not set' };
  const res = await fetchFn(env.ALERT_URL, { method: 'POST', redirect: 'follow', headers: { 'content-type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ secret: env.ALERT_SECRET, ...payload }) });
  return { sent: res.status < 400, status: res.status };
}

/** One pass over all sites. Returns a list of what happened, so tests and the status page can show it. */
export async function runChecks(env, { fetchFn = fetch, now = () => new Date(), targets = targetsFrom(env), stateKeyPrefix = 'site:', test = false } = {}) {
  const out = [];
  for (const t of targets) {
    const key = stateKeyPrefix + t.name;
    const raw = await env.STATE.get(key);
    const prev = JSON.parse(raw || '{"fails":0,"alerted":false}');
    const r = await checkOne(t.url, fetchFn);
    const st = { fails: r.ok ? 0 : prev.fails + 1, alerted: prev.alerted, last: now().toISOString(), lastStatus: r.status, lastError: r.error };
    let action = 'none';
    if (!r.ok && st.fails >= FAILS_BEFORE_ALERT && !prev.alerted) {
      const a = await sendAlert(env, { type: 'down', test, site: t.name, url: t.url, fails: st.fails, status: r.status, error: r.error, time: st.last }, fetchFn);
      if (a.sent) { st.alerted = true; action = 'alert-sent'; } else action = 'alert-failed';
    } else if (r.ok && prev.alerted) {
      const a = await sendAlert(env, { type: 'up', test, site: t.name, url: t.url, status: r.status, time: st.last }, fetchFn);
      if (a.sent) { st.alerted = false; action = 'recovery-sent'; } else { st.alerted = true; action = 'recovery-failed'; }
    }
    // Free KV plan allows 1,000 writes a day, and 4 sites every 5 minutes would be 1,152. So write only on the first run or when something changed.
    if (raw === null || st.fails !== prev.fails || st.alerted !== prev.alerted) await env.STATE.put(key, JSON.stringify(st));
    out.push({ site: t.name, url: t.url, ok: r.ok, status: r.status, error: r.error, fails: st.fails, action });
  }
  return out;
}

/** Test mode: checks a deliberately broken address twice (so the 2-failure rule fires), then clears its own state. */
export async function runTestMode(env, opts = {}) {
  const broken = [{ name: 'TEST broken address', url: env.TEST_BROKEN_URL || 'https://straatstudio.co.za/uptime-test-this-page-does-not-exist/' }];
  const first = await runChecks(env, { ...opts, targets: broken, stateKeyPrefix: 'test:', test: true });
  const second = await runChecks(env, { ...opts, targets: broken, stateKeyPrefix: 'test:', test: true });
  await env.STATE.delete('test:' + broken[0].name);
  return { first, second };
}
