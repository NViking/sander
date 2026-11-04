/* =========================================================
   KARRIERE – Funktionen für karriere.html UND stelle.html
   Benötigt: jobs-data.js (window.jobs) vor diesem Skript
   ========================================================= */

const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => Array.from(ctx.querySelectorAll(selector));

/* Texte aus jobs-data.js sicher in HTML einsetzen */
const esc = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/* ---------- Einstellungen ---------- */

const SITE_NAME = 'Sander Immobiliengruppe';
const DETAIL_PAGE = 'stelle.html';
const ICON_PATH = '../assets/images/benefits/';

/* Standard-Bewerbungsadresse, falls eine Stelle keine eigene hat */
const DEFAULT_APPLY_EMAIL = 'info@sander-projekt.de';

/* Standardtext „Wer wir sind“, falls eine Stelle keinen eigenen hat */
const DEFAULT_ABOUT =
  'Wir sind ein inhabergeführtes Familienunternehmen (Planungsbüro & Projektentwickler) ' +
  'mit Standorten in Detmold und Ulm. Unser Team ist eine bunte Mischung aus jungem Elan ' +
  'und geballter Erfahrung – hochmotiviert, innovativ und immer bereit, anzupacken.';

/* Benefit-Kacheln (wie in der Präsentation) */
const BENEFITS = {
  flexibel:      { label: 'Flexible Arbeitszeiten & Home Office Möglichkeit', icon: 'benefit-flexibel.png' },
  weiterbildung: { label: 'Weiterbildungsmöglichkeiten',                      icon: 'benefit-weiterbildung.png' },
  verguetung:    { label: 'Leistungsgerechte Bezahlung',                      icon: 'benefit-verguetung.png' },
  dienstwagen:   { label: 'Dienstwagen & Firmenhandy',                        icon: 'benefit-dienstwagen.png' },
  familie:       { label: 'Familiäres Umfeld mit Duz-Kultur',                 icon: 'benefit-familie.png' },
  team:          { label: 'Team-Mittagessen & kostenlose Getränke',           icon: 'benefit-team.png' },
  camper:        { label: 'Camper-Van zu Vorzugskonditionen',                 icon: 'benefit-camper.png' } 
};

const DEFAULT_BENEFITS = ['flexibel', 'weiterbildung', 'verguetung', 'dienstwagen', 'familie', 'team'];

/* ---------- Header / Navigation ---------- */

const menu = $('.menu-toggle');
const nav = $('.main-nav');

function toggleMenu() {
  if (!nav || !menu) return;
  const open = nav.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', String(open));
}

menu?.addEventListener('click', toggleMenu);

nav?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menu?.setAttribute('aria-expanded', 'false');
  })
);

/* Unterseite: Header ist immer hell und lesbar */
const header = $('[data-header]');
const logo = header?.querySelector('.brand-logo');

function updateHeader() {
  if (!header) return;

  header.style.backgroundColor = '#fff';
  header.style.borderBottomColor = '#686863';
  header.style.color = '#20201e';

  if (logo) logo.style.filter = 'brightness(0)';
}

updateHeader();

/* ---------- Jahr im Footer ---------- */

$$('[data-year]').forEach(el => {
  el.textContent = String(new Date().getFullYear());
});

/* ---------- Hilfsfunktionen ---------- */

const activeJobs = () =>
  (Array.isArray(window.jobs) ? window.jobs : []).filter(job => job.active);

const asList = (value) => (Array.isArray(value) ? value : []).filter(Boolean);

function listBlock(title, items) {
  const entries = asList(items);
  if (!entries.length) return '';

  return `
    <div>
      <h2>${esc(title)}</h2>
      <ul class="job-list">
        ${entries.map(item => `<li>${esc(item)}</li>`).join('')}
      </ul>
    </div>
  `;
}

/* Eintrag ist entweder ein Schlüssel ('flexibel') oder { label, icon } */
function benefitItem(entry) {
  const data = typeof entry === 'string' ? BENEFITS[entry] : entry;
  if (!data || !data.label) return '';

  const icon = data.icon
    ? `<img src="${esc(data.icon.includes('/') ? data.icon : ICON_PATH + data.icon)}" alt="" width="72" height="72" loading="lazy">`
    : '';

  return `<li class="benefit-item">${icon}<span>${esc(data.label)}</span></li>`;
}

/* ---------- Stellenübersicht (karriere.html) ---------- */

function renderJobs() {
  const jobsGrid = $('#jobs-grid');
  const noJobs = $('#no-jobs');
  if (!jobsGrid) return;

  const jobs = activeJobs();

  jobsGrid.innerHTML = jobs.map(job => `
    <article class="job-card">
      <div class="job-meta">
        ${esc(job.department)} · ${esc(job.type)}${job.location ? ' · ' + esc(job.location) : ''}
      </div>
      <h3>${esc(job.title)}</h3>
      <p>${esc(job.description)}</p>
      <a href="${DETAIL_PAGE}?id=${encodeURIComponent(job.id)}">Details &amp; Bewerbung →</a>
    </article>
  `).join('');

  if (noJobs) noJobs.hidden = jobs.length > 0;
}

/* ---------- Stellenanzeige (stelle.html?id=…) ---------- */

function renderJobDetail() {
  const root = $('#job-detail');
  if (!root) return;

  const id = new URLSearchParams(window.location.search).get('id');
  const job = activeJobs().find(j => j.id === id);

  if (!job) {
    document.title = `Stelle nicht gefunden | ${SITE_NAME}`;
    root.innerHTML = `
      <section class="section container">
        <div class="job-missing">
          <h1>Diese Stelle ist nicht mehr verfügbar.</h1>
          <p>Schauen Sie gern in unsere aktuellen Stellenanzeigen.</p>
          <a class="button button-primary" href="karriere.html">Alle Stellen ansehen <span>→</span></a>
        </div>
      </section>
    `;
    return;
  }

  document.title = `${job.title} | ${SITE_NAME}`;

  const email = job.contactEmail || DEFAULT_APPLY_EMAIL;
  const subject = encodeURIComponent(`Bewerbung: ${job.title}`);
  const contactName = job.contactName ? ` an ${esc(job.contactName)}` : '';

  const facts = [job.department, job.type, job.location].filter(Boolean);
  const heroImage = job.heroImage || '';
  const heroImageAlt = job.heroImageAlt || '';
  const benefits = (asList(job.benefits).length ? job.benefits : DEFAULT_BENEFITS)
    .map(benefitItem).join('');

  const aboutImage = job.aboutImage || DEFAULT_ABOUT_IMAGE;
  const aboutImageAlt = job.aboutImageAlt || DEFAULT_ABOUT_IMAGE_ALT;

  root.innerHTML = `
     <!-- NEU: Hero Stage mit Bild(platzhalter) und Text darüber -->
    <section class="job-hero">
      <div class="job-hero__media">
        ${heroImage ? `<img src="${esc(assetUrl(heroImage))}" alt="${esc(heroImageAlt)}" loading="eager" onerror="this.remove()">` : ''}
      </div>
      <div class="container job-hero__content">
        <a class="back-link" href="karriere.html">← Alle Stellen</a>
        <h1>${esc(job.title)}</h1>
        <ul class="job-facts">${facts.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
      </div>
    </section>

    <!-- GEÄNDERT: Intro beginnt jetzt erst unter dem Bild -->
    <section class="section container">
      ${job.intro ? `<p class="job-intro">${esc(job.intro)}</p>` : ''}
      <div class="job-columns">
        ${listBlock('Deine Aufgaben', job.tasks)}
        ${listBlock('Das bringst du mit', job.requirements)}
      </div>
    </section>

    ${benefits ? `
    <section class="job-benefits" aria-labelledby="benefits-title">
      <div class="container">
        <h2 id="benefits-title">Deine Benefits auf einen Blick</h2>
        <ul class="benefit-grid">${benefits}</ul>
      </div>
    </section>` : ''}

    <section class="section container">
            <div class="job-about">
        <div class="job-about__text">
          <h2>Wer wir sind</h2>
          <p>${esc(job.about || DEFAULT_ABOUT)}</p>
        </div>

        <figure class="job-about__media">
          ${aboutImage ? `
          <img
            src="${esc(assetUrl(aboutImage))}"
            alt="${esc(aboutImageAlt)}"
            loading="lazy"
            onerror="this.remove()"
          >` : ''}
        </figure>
      </div>

      <div class="job-apply">
        <h2>Lust, mit uns durchzustarten?</h2>
        <p>Schick uns deine Bewerbung &amp; Fragen gern${contactName}.</p>
        <a class="button button-primary" href="mailto:${esc(email)}?subject=${subject}">
          ${esc(email)} <span>→</span>
        </a>
      </div>
    </section>
  `;
}

/* Bild neben „Wer wir sind“ (leer = Platzhalter anzeigen) */
const DEFAULT_ABOUT_IMAGE = '';
const DEFAULT_ABOUT_IMAGE_ALT = 'Die Geschäftsführer der Sander Immobiliengruppe';

/* Pfade in jobs-data.js gelten ab Hauptordner (z. B. assets/images/team.jpg) */
const assetUrl = (path) =>
  /^(https?:)?\/\/|^\/|^\.\.\//.test(path) ? path : '../' + path;

/* ---------- Einblenden beim Scrollen ---------- */

function initRevealObserver() {
  const items = $$('.reveal');

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  items.forEach(el => observer.observe(el));
}

/* ---------- Start ---------- */

renderJobs();
renderJobDetail();
initRevealObserver();
