/* ---------- Header Navigation ---------- */
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

/* ---------- Projekte rendern (wie in unternehmen.js) ---------- */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid || !Array.isArray(window.projects)) return;

  const esc = value => String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const src = path => (/^(https?:)?\/\//.test(path) || path.startsWith('../')) ? path : '../' + path;

  grid.innerHTML = window.projects.map(p => `
    <a class="project-card reveal" href="${esc(p.url ? src(p.url) : '../Projekte/projekte.html')}" aria-label="${esc(p.title)} – zum Projekt">
      <div class="project-image">
        ${p.image ? `<img src="${esc(src(p.image))}" alt="${esc(p.imageAlt || p.title)}" style="object-position:${esc(p.imagePosition || 'center')}" loading="lazy" decoding="async" onerror="this.remove()">` : ''}
      </div>
      <div class="project-meta">${esc(p.category)} · ${esc(p.location)}</div>
      <h3>${esc(p.title)}</h3>
    </a>
  `).join('');
}

/* ---------- Einblenden beim Scrollen ---------- */
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

renderProjects();      // muss vor initRevealObserver() stehen
initRevealObserver();