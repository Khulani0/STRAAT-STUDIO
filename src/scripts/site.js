// Vanilla JS only: menu, package builder, enquiry demo, floating WhatsApp button.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rand = (n) => 'R' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/* ---------- Menu: real button, aria-expanded, focus trap, Escape, focus returns ---------- */
(() => {
  const btn = $('#menu-button');
  const panel = $('#menu-panel');
  if (!btn || !panel) return;
  const focusables = () => [btn, ...$$('a', panel)];
  const close = (refocus) => {
    panel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Menu';
    document.removeEventListener('keydown', onKey);
    if (refocus) btn.focus();
  };
  const onKey = (e) => {
    if (e.key === 'Escape') return close(true);
    if (e.key !== 'Tab') return;
    const f = focusables();
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  btn.addEventListener('click', () => {
    if (panel.hidden) {
      panel.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      btn.textContent = 'Close';
      document.addEventListener('keydown', onKey);
      $('a', panel).focus();
    } else close(true);
  });
  $$('a', panel).forEach((a) => a.addEventListener('click', () => close(false)));
})();

/* ---------- Package builder ---------- */
(() => {
  const root = $('#builder');
  if (!root) return;
  const state = { site: 'business', plan: 'leads', extras: new Set() };
  const out = {
    once: $('#b-once'),
    monthly: $('#b-monthly'),
    extras: $('#b-extras'),
    note: $('#b-launch-note'),
    cta: $('#b-cta'),
  };
  const pick = (group, key) => {
    $$(`[data-group="${group}"]`, root).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.key === key)));
  };
  const render = () => {
    const siteBtn = $(`[data-group="site"][data-key="${state.site}"]`, root);
    const planBtn = $(`[data-group="plan"][data-key="${state.plan}"]`, root);
    const launch = state.site === 'launchPack';
    let once = Number(siteBtn.dataset.price);
    const picked = [];
    if (!launch) {
      $$('[data-group="extra"]', root).forEach((b) => {
        const on = state.extras.has(b.dataset.key);
        b.setAttribute('aria-pressed', String(on));
        if (on) {
          once += Number(b.dataset.price);
          picked.push(b.dataset.name);
        }
      });
    }
    out.extras.hidden = launch;
    out.note.hidden = !launch;
    out.once.textContent = rand(once);
    const planPrice = Number(planBtn.dataset.price);
    out.monthly.textContent = planPrice ? rand(planPrice) + ' a month' : 'No monthly plan';
    const parts = [`${siteBtn.dataset.name} website (${rand(once)} once-off)`];
    if (picked.length) parts.push('extras: ' + picked.join(', '));
    if (planPrice) parts.push(`${planBtn.dataset.name} (${rand(planPrice)} a month)`);
    const msg = `Hi Straat Studio, I'd like this package: ${parts.join('; ')}. Please send my free homepage preview.`;
    out.cta.href = out.cta.dataset.base + encodeURIComponent(msg);
  };
  root.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-group]');
    if (!b) return;
    const g = b.dataset.group;
    if (g === 'extra') {
      state.extras.has(b.dataset.key) ? state.extras.delete(b.dataset.key) : state.extras.add(b.dataset.key);
    } else {
      state[g] = b.dataset.key;
      pick(g, b.dataset.key);
    }
    render();
  });
  pick('site', state.site);
  pick('plan', state.plan);
  render();
})();

/* ---------- Enquiry demo (made-up data) ---------- */
(() => {
  const root = $('#demo');
  if (!root) return;
  const labels = ['New', 'Contacted', 'Quote sent', 'Won'];
  const s = { job: 'DB board upgrade', area: 'Bellville', sent: false, status: 0 };
  const el = {
    form: $('#d-form', root),
    thanks: $('#d-thanks', root),
    thanksText: $('#d-thanks-text', root),
    count: $('#d-count', root),
    alert: $('#d-alert', root),
    newRow: $('#d-new', root),
    newJob: $('#d-new-job', root),
    newMeta: $('#d-new-meta', root),
    status: $('#d-status', root),
    advance: $('#d-advance', root),
    review: $('#d-review', root),
    won: $('#d-won-note', root),
  };
  const render = () => {
    el.form.hidden = s.sent;
    el.thanks.hidden = !s.sent;
    el.newRow.hidden = !s.sent;
    el.alert.hidden = !s.sent;
    el.thanksText.textContent = `Ndlovu Electrical has your ${s.job} request for ${s.area} and replies within an hour. A copy is in your email.`;
    el.newJob.textContent = s.job;
    el.newMeta.textContent = `${s.area}, just now, 2 photos`;
    el.alert.textContent = `New enquiry: ${s.job}, ${s.area}. Sent to your phone.`;
    el.status.textContent = labels[s.status];
    const won = s.sent && s.status === 3;
    el.count.textContent = `${s.sent ? 3 : 2} this month, ${1 + (won ? 1 : 0)} won`;
    el.advance.hidden = !s.sent || won;
    el.review.hidden = !won;
    el.won.hidden = !won;
  };
  root.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.job) {
      s.job = b.dataset.job;
      $$('[data-job]', root).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    } else if (b.dataset.area) {
      s.area = b.dataset.area;
      $$('[data-area]', root).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    } else if (b.id === 'd-send') {
      s.sent = true;
      s.status = 0;
    } else if (b.id === 'd-advance') {
      s.status = Math.min(3, s.status + 1);
    } else if (b.id === 'd-reset') {
      s.sent = false;
      s.status = 0;
    } else return;
    render();
  });
  render();
})();

/* ---------- Floating WhatsApp button: never covers the contact section or footer ---------- */
(() => {
  const fab = $('#wa-float');
  const targets = [$('#contact'), $('#site-footer')].filter(Boolean);
  if (!fab || !('IntersectionObserver' in window)) return;
  const visible = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)));
    fab.hidden = visible.size > 0;
  });
  targets.forEach((t) => io.observe(t));
})();

/* ---------- Analytics events (Cloudflare Web Analytics beacon is added in step 7) ---------- */
document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-event]');
  if (a && window.__straatTrack) window.__straatTrack(a.dataset.event);
});
