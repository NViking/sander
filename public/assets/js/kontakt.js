// assets/js/kontakt.js  (NEUE DATEI)

const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => Array.from(ctx.querySelectorAll(selector));

/* ---------- Menü ---------- */

const menu = $('.menu-toggle');
const nav = $('.main-nav');

menu?.addEventListener('click', () => {
  if (!nav || !menu) return;
  const open = nav.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menu?.setAttribute('aria-expanded', 'false');
  })
);

/* ---------- Header immer hell und lesbar ---------- */

const header = $('[data-header]');
const logo = header?.querySelector('.brand-logo');

if (header) {
  header.style.backgroundColor = '#fff';
  header.style.borderBottomColor = '#686863';
  header.style.color = '#20201e';
  if (logo) logo.style.filter = 'brightness(0)';
}

/* ---------- Jahr im Footer ---------- */

$$('[data-year]').forEach(el => {
  el.textContent = String(new Date().getFullYear());
});

/* ---------- Einblenden beim Scrollen ---------- */

const items = $$('.reveal');

if (!('IntersectionObserver' in window)) {
  items.forEach(el => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  items.forEach(el => observer.observe(el));
}
