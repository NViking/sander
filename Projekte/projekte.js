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
const DETAIL_PAGE = 'projekt.html';
const IMAGE_PATH = '../assets/images/';
const DEFAULT_HERO = 'Buero_gruen.jpg';

const alleProjekte = () => (Array.isArray(window.projekte) ? window.projekte : []);   /* GEÄNDERT: neuer Name */
const imageSrc = name => encodeURI(IMAGE_PATH + name);

const ICON = {
  ort:       '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  objektart: '<rect x="3" y="8" width="18" height="12" rx="1.5"/><path d="M9 8V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>',
  groesse:   '<path d="M3 17.5 17.5 3l3.5 3.5L6.5 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',
  zimmer:    '<path d="M3 18V8M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.5"/>',
  datum:     '<rect x="3.5" y="5" width="17" height="15.5" rx="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  dauer:     '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
  phase:     '<path d="M5 21V4M5 5h12l-2 4 2 4H5"/>',
  standard:  '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19c2-4 5-7 9-9"/>',
  anzahl:    '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',
  gebaeude:  '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>'
};

const ICON_FOR = {
  'ort': 'ort', 'standort': 'ort', 'lage': 'ort',
  'objektart': 'objektart', 'art': 'objektart', 'nutzung': 'objektart',
  'größe': 'groesse', 'fläche': 'groesse', 'grundstück': 'groesse', 'hallenfläche': 'groesse',
  'bürofläche': 'groesse', 'labor': 'groesse', 'wohnfläche': 'groesse', 'laborfläche': 'groesse',
  'zimmer': 'zimmer',
  'fertigstellung': 'datum', 'baubeginn': 'datum', 'bezug': 'datum',
  'bauzeit': 'dauer',
  'status': 'phase', 'phase': 'phase',
  'standard': 'standard', 'energie': 'standard',
  'umfang': 'anzahl', 'wohnungen': 'anzahl', 'einheiten': 'anzahl',
  'etagen': 'gebaeude', 'geschosse': 'gebaeude'
};

function iconSvg(label) {
  const key = ICON_FOR[String(label).toLowerCase()] || 'gebaeude';
  return `<svg class="fact__icon" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[key]}</svg>`;
}

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

/* Unterseite: Header ist immer hell und lesbar */
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

/* ---------- Übersicht (projekte.html) ---------- */

const grid = $('#projekte-grid');
const empty = $('#no-projekte');

function cardHtml(p) {
  const image = p.image
    ? `<img
         src="${esc(imageSrc(p.image))}"
         alt="${esc(p.imageAlt || p.title)}"
         style="object-position: ${esc(p.imagePosition || 'center')}"
         loading="lazy"
         decoding="async"
         onerror="this.remove()"
       >`
    : '';

   return `
    <article class="project-card reveal">                                   
      <div class="project-image">
        ${image}
        <span class="project-meta">${esc(p.category)} · ${esc(p.status)}</span>
      </div>
      <h3>${esc(p.title)}</h3>
      ${p.teaser ? `<p class="project-card__text">${esc(p.teaser)}</p>` : ''}
      <a class="project-card__more" href="${DETAIL_PAGE}?id=${encodeURIComponent(p.id)}">Zum Projekt →</a> 
    </article>
  `;

}

function renderProjekte(filter = 'alle') {
  if (!grid) return;

  const list = filter === 'alle'
    ? alleProjekte()                                              /* GEÄNDERT */
    : alleProjekte().filter(p => p.category === filter);          /* GEÄNDERT */

  grid.innerHTML = list.map(cardHtml).join('');
  if (empty) empty.hidden = list.length > 0;

  $$('.reveal', grid).forEach(el => {
    if (observer) observer.observe(el);
    else el.classList.add('is-visible');
  });
}

$$('.project-filter__btn').forEach(btn =>
  btn.addEventListener('click', () => {
    $$('.project-filter__btn').forEach(b => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    renderProjekte(btn.dataset.filter);
  })
);

/* ---------- Unterseite (projekt.html?id=…) ---------- */

function renderProjektDetail() {
  const root = $('#projekt-detail');
  if (!root) return;

  const id = new URLSearchParams(window.location.search).get('id');
  const p = alleProjekte().find(item => item.id === id);          /* GEÄNDERT */

  if (!p) {
    document.title = `Projekt nicht gefunden | ${SITE_NAME}`;
    root.innerHTML = `
      <section class="section container">
        <div class="project-missing">
          <h1>Dieses Projekt wurde nicht gefunden.</h1>
          <p>Schauen Sie gern in unsere Projektübersicht.</p>
          <a class="button button-primary" href="projekte.html">Alle Projekte ansehen <span>→</span></a>
        </div>
      </section>
    `;
    return;
  }

  document.title = `${p.title} | ${SITE_NAME}`;

  const heroImage = imageSrc(p.heroImage || p.image || DEFAULT_HERO);

  const facts = [
    ...(Array.isArray(p.facts) ? p.facts : []),
    { label: 'Status', value: p.status }
  ].filter(f => f && f.value);

  const paragraphs = (Array.isArray(p.text) ? p.text : [p.text]).filter(Boolean);

  root.innerHTML = `
    <!-- GEÄNDERT: Hero zeigt nur noch den Namen -->
    <section class="firm-hero firm-hero--title">
      <div class="firm-hero__media">
        <img
          src="${esc(heroImage)}"
          alt="${esc(p.imageAlt || '')}"
          style="object-position: ${esc(p.imagePosition || 'center')}"
          onerror="this.remove()"
        >
      </div>
      <div class="container firm-hero__content">
        <h1>${esc(p.title)}</h1>
      </div>
    </section>

    <!-- NEU: Rahmendaten direkt unter dem Bild -->
    <section class="project-facts-bar" aria-label="Rahmendaten">
      ${facts.map(f => `
        <div class="fact">
          ${iconSvg(f.label)}
          <div>
            <div class="fact__label">${esc(f.label)}</div>
            <div class="fact__value">${esc(f.value)}</div>
          </div>
        </div>
      `).join('')}
    </section>

    <section class="section container">
      <a class="project-back" href="projekte.html">← Alle Projekte</a>

      <div class="project-detail">
        <div class="project-detail__text">
          ${paragraphs.map(t => `<p>${esc(t)}</p>`).join('')}
        </div>

        <aside class="project-contact">
          <h2>Interesse?</h2>
          <p>Sprechen Sie uns gern zu diesem Projekt an.</p>
          <a class="button button-primary" href="../index.html#kontakt">Kontakt aufnehmen <span>→</span></a>
        </aside>
      </div>
    </section>
  `;
}

/* ---------- Start ---------- */

renderProjekte();
renderProjektDetail();