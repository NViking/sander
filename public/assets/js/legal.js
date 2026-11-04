// assets/js/legal.js  (NEUE DATEI – Menü, heller Header, Jahr im Footer)

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

const menu = $('.menu-toggle');
const nav = $('.main-nav');

menu?.addEventListener('click', () => {
  if (!nav) return;
  const open = nav.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menu?.setAttribute('aria-expanded', 'false');
  })
);

const header = $('[data-header]');
const logo = header?.querySelector('.brand-logo');

if (header) {
  header.style.backgroundColor = '#fff';
  header.style.borderBottomColor = '#686863';
  header.style.color = '#20201e';
  if (logo) logo.style.filter = 'brightness(0)';
}

$$('[data-year]').forEach(el => {
  el.textContent = String(new Date().getFullYear());
});
