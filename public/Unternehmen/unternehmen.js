const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

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
const header = document.querySelector('[data-header]');
const logo = header?.querySelector('.brand-logo');

if (header) {
  header.style.backgroundColor = '#fff';
  header.style.borderBottomColor = '#686863';
  header.style.color = '#20201e';
  if (logo) logo.style.filter = 'brightness(0)';
}

/* Jahr im Footer */
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = String(new Date().getFullYear());
});

/* ---------- Projekte rendern (wie renderProjects in main.js) ---------- */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid || !Array.isArray(window.projects)) return;

  const esc = value => String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const src = path => (/^(https?:)?\/\//.test(path) || path.startsWith('../')) ? path : '../' + path;

  grid.innerHTML = window.projects.map(p => `
  <a class="project-card reveal" href="${esc(p.url ? src(p.url) : '../Projekte/projekte.html')}" aria-label="${esc(p.title)} – zum Projekt">   <!-- GEÄNDERT: <article> → <a> -->
    <div class="project-image">
      ${p.image ? `<img src="${esc(src(p.image))}" alt="${esc(p.imageAlt || p.title)}" style="object-position:${esc(p.imagePosition || 'center')}" loading="lazy" decoding="async" onerror="this.remove()">` : ''}
    </div>
    <div class="project-meta">${esc(p.category)} · ${esc(p.location)}</div>
    <h3>${esc(p.title)}</h3>
  </a>
`).join('');
}
renderProjects(); 

/* Einblenden beim Scrollen */
function initRevealObserver() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  items.forEach(el => observer.observe(el));
}

initRevealObserver();

/* ---------- Zahl hochzählen, sobald sichtbar ---------- */
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const DURATION = 2700; // Dauer in ms – kleiner = schneller

  const run = el => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 7); // startet schnell, bremst am Ende
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return; // Endwert bleibt stehen

  counters.forEach(el => { el.textContent = '0' + (el.dataset.suffix || ''); });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      run(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  counters.forEach(el => observer.observe(el));
}

initCountUp();
