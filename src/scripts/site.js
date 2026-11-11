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

/* ---------- Floating WhatsApp button: hidden while the contact band or footer is on screen ---------- */
(() => {
  const fab = find('#wa-float');
  if (!fab || !('IntersectionObserver' in window)) return;
  const visible = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => (en.isIntersecting ? visible.add(en.target) : visible.delete(en.target)));
    fab.hidden = visible.size > 0;
  });
  [find('#contact'), find('footer')].forEach((el) => el && io.observe(el));
})();

/* ---------- Analytics events (Cloudflare Web Analytics beacon is added later) ---------- */
document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-event]');
  if (a && window.__straatTrack) window.__straatTrack(a.dataset.event);
});
