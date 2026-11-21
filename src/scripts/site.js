// Shared script, every page. Vanilla JS, no libraries. Every effect is optional: with JavaScript off, or with
// reduced motion on, all content is visible and nothing moves.
const find = (s, r = document) => r.querySelector(s);
const findAll = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)');

/* Mobile menu: real button, aria-expanded, focus trap, Escape closes, focus returns to the button. */
(() => {
  const btn = find('#menu-btn');
  const panel = find('#mobile-nav');
  if (!btn || !panel) return;
  const onKey = (e) => {
    if (e.key === 'Escape') return close(true);
    if (e.key !== 'Tab') return;
    const items = [btn, ...findAll('a', panel)];
    const a = document.activeElement;
    if (e.shiftKey && a === items[0]) { e.preventDefault(); items[items.length - 1].focus(); }
    else if (!e.shiftKey && a === items[items.length - 1]) { e.preventDefault(); items[0].focus(); }
  };
  function open() { panel.hidden = false; btn.setAttribute('aria-expanded', 'true'); btn.textContent = 'Close'; document.addEventListener('keydown', onKey); find('a', panel).focus(); }
  function close(refocus) { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.textContent = 'Menu'; document.removeEventListener('keydown', onKey); if (refocus) btn.focus(); }
  btn.addEventListener('click', () => (panel.hidden ? open() : close(true)));
  findAll('a', panel).forEach((a) => a.addEventListener('click', () => close(false)));
})();

/* Header gets a little smaller and a thin border after the first scroll. */
(() => {
  const h = find('[data-header]');
  if (!h) return;
  const set = () => h.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', set, { passive: true });
  set();
})();

/* Scroll reveal: fade and rise once. Cards in a row are staggered by about 80 ms. */
(() => {
  const els = findAll('[data-reveal]');
  if (!els.length) return;
  if (reduce.matches || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
  const groups = new Map();
  els.forEach((e) => { const g = groups.get(e.parentElement) || []; g.push(e); groups.set(e.parentElement, g); });
  groups.forEach((g) => g.forEach((e, i) => e.style.setProperty('--d', Math.min(i, 5) * 80 + 'ms')));
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  els.forEach((e) => io.observe(e));
})();

/* Process steps: the step near the middle of the screen is highlighted. */
(() => {
  const steps = findAll('[data-step]');
  if (!steps.length || reduce.matches || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => entries.forEach((en) => en.target.classList.toggle('active', en.isIntersecting)), { rootMargin: '-40% 0px -40% 0px' });
  steps.forEach((s) => io.observe(s));
})();

/* Phone demo: quote form, email alert, automatic reply. Loops about every 9 seconds, only while on screen and the tab is visible. */
(() => {
  const phones = findAll('[data-phone]');
  if (!phones.length || reduce.matches) return;
  phones.forEach((p) => {
    p.setAttribute('data-live', '');
    p.setAttribute('data-step', '0');
    let step = 0, timer = null, visible = false;
    const delays = [1800, 1800, 1800, 3600]; // form, alert, reply, hold. Whole loop: 9 seconds.
    const tick = () => { step = (step + 1) % 4; p.setAttribute('data-step', String(step)); schedule(); };
    const schedule = () => { clearTimeout(timer); if (visible && !document.hidden) timer = setTimeout(tick, delays[step]); };
    new IntersectionObserver((e) => { visible = e[0].isIntersecting; if (visible) { step = 0; p.setAttribute('data-step', '0'); } schedule(); }).observe(p);
    document.addEventListener('visibilitychange', schedule);
  });
})();

/* Trades strip: pause button for people who want the strip to stop. */
(() => {
  const m = find('[data-marquee]');
  const b = find('[data-marquee-btn]');
  if (!m || !b) return;
  b.addEventListener('click', () => {
    const paused = m.classList.toggle('paused');
    b.setAttribute('aria-pressed', String(paused));
    b.textContent = paused ? 'Resume scrolling' : 'Pause scrolling';
  });
})();
