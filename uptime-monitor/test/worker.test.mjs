import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { runChecks, runTestMode } from '../src/monitor.js';

const results = [];
const test = async (name, fn) => { try { await fn(); results.push('PASS ' + name); } catch (e) { results.push('FAIL ' + name + ' :: ' + e.message); } };
const kv = () => { const m = new Map(); return { get: async (k) => m.get(k) ?? null, put: async (k, v) => { m.set(k, v); }, delete: async (k) => { m.delete(k); }, m }; };
const mkEnv = () => ({ STATE: kv(), ALERT_URL: 'https://alerts.test/x', ALERT_SECRET: 's3cret', TARGETS: JSON.stringify([{ name: 'main', url: 'https://main.test/' }, { name: 'concept', url: 'https://concept.test/' }]) });
// fake network: a map of url -> status number or 'error'; alert posts are recorded
const net = (map) => { const posts = []; const fn = async (url, o = {}) => { if (url === 'https://alerts.test/x') { posts.push(JSON.parse(o.body)); return { status: 200 }; } const v = map[url]; if (v === 'error') throw new Error('fetch failed'); return { status: v ?? 200 }; }; return { fn, posts }; };

await test('all sites up: no alert, failure counts stay at 0', async () => {
  const env = mkEnv(), n = net({}); const r = await runChecks(env, { fetchFn: n.fn });
  assert.equal(n.posts.length, 0); assert.ok(r.every((x) => x.ok && x.fails === 0));
});
await test('one failure: no alert yet', async () => {
  const env = mkEnv(), n = net({ 'https://main.test/': 500 }); const r = await runChecks(env, { fetchFn: n.fn });
  assert.equal(n.posts.length, 0); assert.equal(r[0].fails, 1); assert.equal(r[0].action, 'none');
});
await test('two failures in a row: exactly one alert, with the site, address and secret', async () => {
  const env = mkEnv(), n = net({ 'https://main.test/': 'error' });
  await runChecks(env, { fetchFn: n.fn }); const r = await runChecks(env, { fetchFn: n.fn });
  assert.equal(n.posts.length, 1); assert.equal(r[0].action, 'alert-sent');
  assert.equal(n.posts[0].site, 'main'); assert.equal(n.posts[0].type, 'down'); assert.equal(n.posts[0].url, 'https://main.test/'); assert.equal(n.posts[0].secret, 's3cret'); assert.equal(n.posts[0].fails, 2);
});
await test('a third and fourth failure do not send more alerts', async () => {
  const env = mkEnv(), n = net({ 'https://main.test/': 503 });
  for (let i = 0; i < 4; i++) await runChecks(env, { fetchFn: n.fn });
  assert.equal(n.posts.length, 1);
});
await test('failure, success, failure: the count resets, so no alert', async () => {
  const env = mkEnv(); let n = net({ 'https://main.test/': 500 }); await runChecks(env, { fetchFn: n.fn });
  n = net({}); await runChecks(env, { fetchFn: n.fn }); n = net({ 'https://main.test/': 500 }); await runChecks(env, { fetchFn: n.fn });
  assert.equal(n.posts.length, 0);
});
await test('recovery: one "up" message after an alert, then quiet', async () => {
  const env = mkEnv(); let n = net({ 'https://main.test/': 500 });
  await runChecks(env, { fetchFn: n.fn }); await runChecks(env, { fetchFn: n.fn });
  n = net({}); await runChecks(env, { fetchFn: n.fn }); await runChecks(env, { fetchFn: n.fn });
  assert.equal(n.posts.length, 1); assert.equal(n.posts[0].type, 'up');
});
await test('a 404 counts as down, a 301 followed to 200 counts as up', async () => {
  const env = mkEnv(), n = net({ 'https://main.test/': 404 }); const r = await runChecks(env, { fetchFn: n.fn });
  assert.equal(r[0].ok, false); assert.equal(r[1].ok, true);
});
await test('each site is tracked on its own: a concept site down does not alert for the main site', async () => {
  const env = mkEnv(), n = net({ 'https://concept.test/': 'error' });
  await runChecks(env, { fetchFn: n.fn }); await runChecks(env, { fetchFn: n.fn });
  assert.equal(n.posts.length, 1); assert.equal(n.posts[0].site, 'concept');
});
await test('if the alert address is down, the alert is retried on the next check (not lost)', async () => {
  const env = mkEnv(); const posts = []; let alertUp = false;
  const fn = async (url, o = {}) => { if (url === 'https://alerts.test/x') { if (!alertUp) return { status: 500 }; posts.push(JSON.parse(o.body)); return { status: 200 }; } if (url === 'https://main.test/') return { status: 500 }; return { status: 200 }; };
  await runChecks(env, { fetchFn: fn }); const r2 = await runChecks(env, { fetchFn: fn }); assert.equal(r2[0].action, 'alert-failed'); alertUp = true;
  const r3 = await runChecks(env, { fetchFn: fn }); assert.equal(r3[0].action, 'alert-sent'); assert.equal(posts.length, 1);
});
await test('test mode: a deliberately broken address alerts on the 2nd check, marked as a test, and cleans up after itself', async () => {
  const env = mkEnv(), n = net({ 'https://straatstudio.co.za/uptime-test-this-page-does-not-exist/': 404 }); const r = await runTestMode(env, { fetchFn: n.fn });
  assert.equal(r.first[0].action, 'none'); assert.equal(r.second[0].action, 'alert-sent');
  assert.equal(n.posts.length, 1); assert.equal(n.posts[0].test, true); assert.equal(n.posts[0].site, 'TEST broken address');
  assert.equal([...env.STATE.m.keys()].length, 0);
});
await test('test mode does not touch the real site state', async () => {
  const env = mkEnv(), n = net({ 'https://main.test/': 500 }); await runChecks(env, { fetchFn: n.fn }); await runTestMode(env, { fetchFn: n.fn });
  assert.equal(JSON.parse(env.STATE.m.get('site:main')).fails, 1);
});

await test('KV writes: a healthy site is written once, then not again (stays under the free 1,000 writes a day)', async () => {
  const env = mkEnv(); let puts = 0; const put = env.STATE.put; env.STATE.put = async (k, v) => { puts++; return put(k, v); };
  const n = net({}); for (let i = 0; i < 288; i++) await runChecks(env, { fetchFn: n.fn });
  assert.equal(puts, 2, 'two sites, one first write each'); });

// Alert.gs against fakes
const gs = fs.readFileSync(new URL('../apps-script/Alert.gs', import.meta.url), 'utf8');
const gsWorld = (props) => { const mails = []; const ctx = { JSON, String, MailApp: { sendEmail: (o) => mails.push(o) }, PropertiesService: { getScriptProperties: () => ({ getProperty: (k) => props[k] ?? null }) }, ContentService: { MimeType: { JSON: 'j' }, createTextOutput: (t) => ({ getContent: () => t, setMimeType() { return this; } }) } }; vm.createContext(ctx); vm.runInContext(gs, ctx); return { ctx, mails, post: (b) => JSON.parse(ctx.doPost({ postData: { contents: typeof b === 'string' ? b : JSON.stringify(b) } }).getContent()) }; };
const down = { secret: 'k', type: 'down', site: 'main', url: 'https://x/', fails: 2, status: 500, error: 'HTTP 500', time: 't' };
await test('Apps Script: wrong secret sends nothing', async () => { const g = gsWorld({ ALERT_SECRET: 'k', ALERT_TO: 'me@example.test' }); assert.equal(g.post({ ...down, secret: 'no' }).ok, false); assert.equal(g.mails.length, 0); });
await test('Apps Script: bad JSON sends nothing', async () => { const g = gsWorld({ ALERT_SECRET: 'k', ALERT_TO: 'me@example.test' }); assert.equal(g.post('nope').ok, false); assert.equal(g.mails.length, 0); });
await test('Apps Script: a down alert goes to Khulani only when no client address is set', async () => { const g = gsWorld({ ALERT_SECRET: 'k', ALERT_TO: 'me@example.test' }); assert.equal(g.post(down).ok, true); assert.equal(g.mails[0].to, 'me@example.test'); assert.equal(g.mails[0].subject, 'DOWN: main'); });
await test('Apps Script: when a client address is set, both get the email', async () => { const g = gsWorld({ ALERT_SECRET: 'k', ALERT_TO: 'me@example.test', CLIENT_TO: 'client@example.test' }); g.post(down); assert.equal(g.mails[0].to, 'me@example.test,client@example.test'); });
await test('Apps Script: a test alert is clearly marked TEST and says nothing is wrong', async () => { const g = gsWorld({ ALERT_SECRET: 'k', ALERT_TO: 'me@example.test' }); g.post({ ...down, test: true }); assert.match(g.mails[0].subject, /^TEST: DOWN/); assert.match(g.mails[0].body, /Nothing is wrong with your site/); });
await test('Apps Script: an "up" message says Back up', async () => { const g = gsWorld({ ALERT_SECRET: 'k', ALERT_TO: 'me@example.test' }); g.post({ ...down, type: 'up' }); assert.equal(g.mails[0].subject, 'Back up: main'); });
await test('No em dashes in the monitor files', async () => { for (const f of ['../src/worker.js', '../src/monitor.js', '../apps-script/Alert.gs', '../wrangler.toml']) assert.ok(!fs.readFileSync(new URL(f, import.meta.url), 'utf8').includes('—'), f); });

console.log(results.join('\n'));
const bad = results.filter((r) => r.startsWith('FAIL')).length;
console.log(`\n${results.length - bad} PASS, ${bad} FAIL`);
process.exit(bad ? 1 : 0);
