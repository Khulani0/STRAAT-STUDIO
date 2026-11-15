// Shared script, every page: mobile menu, floating WhatsApp button, click events.
// Vanilla JS only.
const find = (s, r = document) => r.querySelector(s);
const findAll = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- Mobile menu: real button, aria-expanded, focus trap, Escape, focus returns ---------- */
(() => {
  const btn = find('#menu-btn');
  const panel = find('#mobile-nav');
  if (!btn || !panel) return;

  const onKey = (e) => {
    if (e.key === 'Escape') return close(true);
    if (e.key !== 'Tab') return;
    const items = [btn, ...findAll('a', panel)];
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };
  function open() {
    panel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    btn.textContent = 'Close';
    document.addEventListener('keydown', onKey);
    find('a', panel).focus();
  }
  function close(refocus) {
    panel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Menu';
    document.removeEventListener('keydown', onKey);
    if (refocus) btn.focus();
  }
  btn.addEventListener('click', () => (panel.hidden ? open() : close(true)));
  findAll('a', panel).forEach((a) => a.addEventListener('click', () => close(false)));
})();

/* ---------- Floating WhatsApp button (phones) ----------
   Shows only after the hero has scrolled out of view. Hides over the contact band and the footer, and while it
   would sit on top of prices, card text, form buttons or links, so it never covers anything you need to read or press. */
(() => {
  const fab = find('#wa-float');
  if (!fab || !('IntersectionObserver' in window)) return;
  const hero = find('.hero');
  const zones = new Set(); // contact band and footer currently on screen
  let heroOnScreen = !!hero;
  const CONTROLS = 'a, button, input, select, textarea, label, summary, img, svg';
  const hits = (a, b) => !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
  // True when the button would sit on real text (measured line by line), a control, or a picture.
  const coversSomething = () => {
    const r = fab.getBoundingClientRect();
    const box = { left: r.left - 6, right: r.right + 6, top: r.top - 6, bottom: r.bottom + 6 };
    const seen = new Set();
    for (const fx of [0, 0.25, 0.5, 0.75, 1]) {
      for (const fy of [0, 0.25, 0.5, 0.75, 1]) {
        const x = Math.min(innerWidth - 1, Math.max(0, r.left + r.width * fx));
        const y = Math.min(innerHeight - 1, Math.max(0, r.top + r.height * fy));
        for (const el of document.elementsFromPoint(x, y)) {
          if (el === fab || fab.contains(el) || seen.has(el)) continue;
          seen.add(el);
          if (el.matches(CONTROLS)) return true;
          for (const n of el.childNodes) {
            if (n.nodeType !== 3 || !n.textContent.trim()) continue;
            const range = document.createRange();
            range.selectNodeContents(n);
            for (const lr of range.getClientRects()) if (hits(lr, box)) return true;
          }
        }
      }
    }
    return false;
  };
  let queued = false;
  const update = () => {
    queued = false;
    const past = hero ? !heroOnScreen : window.scrollY > 400;
    if (!past || zones.size > 0) { fab.hidden = true; return; }
    fab.hidden = false; // measure it in place before deciding
    if (coversSomething()) fab.hidden = true;
  };
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.target === hero) heroOnScreen = en.isIntersecting;
      else (en.isIntersecting ? zones.add(en.target) : zones.delete(en.target));
    });
    queue();
  });
  [hero, find('#contact'), find('footer')].forEach((el) => el && io.observe(el));
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
  fab.hidden = true;
  queue();
})();

/* ---------- Anchor links ----------
   Links to another page's section (for example Prices from the Privacy page) jump instantly, because the browser
   does that by default. Links to a section on the same page scroll quickly (0.35 s), or jump instantly when the
   visitor prefers reduced motion. */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const DURATION = 350;
  const top = (el) => Math.max(0, el.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(el).scrollMarginTop) || 0));
  const settle = (el, hash) => {
    history.pushState(null, '', hash);
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  };
  const go = (el, hash) => {
    const from = window.scrollY;
    const to = top(el);
    if (reduce.matches || Math.abs(to - from) < 2) { window.scrollTo(0, to); settle(el, hash); return; }
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      window.scrollTo(0, from + (to - from) * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(step); else settle(el, hash);
    };
    requestAnimationFrame(step);
  };
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href*="#"]');
    if (!a) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || u.pathname !== location.pathname || u.hash.length < 2) return;
    const el = document.getElementById(decodeURIComponent(u.hash.slice(1)));
    if (!el) return;
    e.preventDefault();
    go(el, u.hash);
  });
})();

/* ---------- Analytics events (Cloudflare Web Analytics beacon is added later) ---------- */
document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-event]');
  if (a && window.__straatTrack) window.__straatTrack(a.dataset.event);
});
