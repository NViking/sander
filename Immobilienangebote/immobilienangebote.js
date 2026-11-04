
const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => Array.from(ctx.querySelectorAll(selector));

const esc = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/* ---------- Einstellungen ---------- */

const SITE_NAME = 'Sander Immobiliengruppe';
const DETAIL_PAGE = 'angebot.html';
const IMAGE_PATH = '../assets/images/immoangebote/';
const alleAngebote = () => (Array.isArray(window.angebote) ? window.angebote : []);
const imageSrc = name => encodeURI(IMAGE_PATH + name);
const asList = v => (Array.isArray(v) ? v : [v]).filter(Boolean);

/* ---------- Header / Navigation ---------- */

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

/* ---------- Einblenden beim Scrollen ---------- */

const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

/* ---------- Übersicht ---------- */

const grid = $('#angebote-grid');
const empty = $('#no-angebote');

function cardHtml(a) {
  const image = a.image
    ? `<img
         src="${esc(imageSrc(a.image))}"
         alt="${esc(a.imageAlt || a.title)}"
         style="object-position: ${esc(a.imagePosition || 'center')}"
         loading="lazy"
         decoding="async"
         onerror="this.remove()"
       >`
    : '';

  const meta = [a.type, a.location].filter(Boolean).map(esc).join(' · ');

  return `
    <article class="project-card reveal">
      <div class="project-image">
        ${image}
        ${meta ? `<span class="project-meta">${meta}</span>` : ''}
      </div>
      <h3>${esc(a.title)}</h3>
      ${a.teaser ? `<p class="project-card__text">${esc(a.teaser)}</p>` : ''}
      <a class="project-card__more" href="${DETAIL_PAGE}?id=${encodeURIComponent(a.id)}">Zum Angebot →</a>
    </article>
  `;
}

function renderAngebote() {
  if (!grid) return;
  const list = alleAngebote();
  grid.innerHTML = list.map(cardHtml).join('');
  if (empty) empty.hidden = list.length > 0;

  $$('.reveal', grid).forEach(el => {
    if (observer) observer.observe(el);
    else el.classList.add('is-visible');
  });
}

/* ---------- Detailseite (angebot.html?id=…) ---------- */
/* Aufbau immer gleich: Hero mit Titel → Text → "Lage" + Text → Galerie */

function renderAngebotDetail() {
  const root = $('#angebot-detail');
  if (!root) return;

  const id = new URLSearchParams(window.location.search).get('id');
  const a = alleAngebote().find(item => item.id === id);

  if (!a) {
    document.title = `Angebot nicht gefunden | ${SITE_NAME}`;
    root.innerHTML = `
      <section class="section container">
        <div class="project-missing">
          <h1>Dieses Angebot ist nicht mehr verfügbar.</h1>
          <p>Schauen Sie gern in unsere aktuellen Immobilienangebote.</p>
          <a class="button button-primary" href="immobilienangebote.html">Alle Angebote ansehen <span>→</span></a>
        </div>
      </section>
    `;
    return;
  }

  document.title = `${a.title} | ${SITE_NAME}`;

  const gallery = asList(a.gallery).map(g => (typeof g === 'string' ? { src: g, alt: '' } : g));

  root.innerHTML = `
    <section class="firm-hero firm-hero--title">
      <div class="firm-hero__media">
        <img
          src="${esc(imageSrc(a.heroImage || a.image))}"
          alt="${esc(a.imageAlt || '')}"
          style="object-position: ${esc(a.imagePosition || 'center')}"
          onerror="this.remove()"
        >
      </div>
      <div class="container firm-hero__content">
        <h1>${esc(a.title)}</h1>
      </div>
    </section>

    <section class="section container">
      <a class="project-back" href="immobilienangebote.html">← Alle Angebote</a>

      <div class="angebot-text">
        ${asList(a.text).map(t => `<p>${esc(t)}</p>`).join('')}
      </div>

      ${asList(a.lage).length ? `
      <div class="angebot-text angebot-lage">
        <h2>Lage</h2>
        ${asList(a.lage).map(t => `<p>${esc(t)}</p>`).join('')}
      </div>` : ''}

      ${gallery.length ? `
      <div class="angebot-gallery">
        ${gallery.map(g => `
          <figure>
            <img
              src="${esc(imageSrc(g.src))}"
              alt="${esc(g.alt || a.title)}"
              loading="lazy"
              decoding="async"
              onerror="this.closest('figure').remove()"
            >
          </figure>
        `).join('')}
      </div>` : ''}

      <div class="angebot-cta">
        <a class="button button-primary" href="../index.html#kontakt">Kontakt aufnehmen <span>→</span></a>
      </div>
    </section>
  `;
}

/* ---------- Start ---------- */

renderAngebote();
renderAngebotDetail();