const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => Array.from(ctx.querySelectorAll(selector));

/* --- Header / Navigation --- */
const menu = $('.menu-toggle');
const nav = $('.main-nav');

function toggleMenu() {
	if (!nav || !menu) return;
	const open = nav.classList.toggle('is-open');
	menu.setAttribute('aria-expanded', String(open));
}

menu?.addEventListener('click', toggleMenu);
// Close menu on internal nav link click (mobile)
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
	nav.classList.remove('is-open');
	menu.setAttribute('aria-expanded', 'false');
}));


/* --- Small utilities --- */
// Current year in footer
const yearEl = $('#year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

/* --- Render Projects --- */
function renderProjects() {
    const projectsGrid = $('#projects-grid');
    if (!projectsGrid || !Array.isArray(window.projects)) return;

    projectsGrid.innerHTML = projects.map(p => {
        const tag = p.url ? 'a' : 'article';                                           
        const href = p.url ? ` href="${p.url}"` : '';                                 

        return `
        <${tag} class="project-card reveal"${href}>                                     
            <div class="project-image">
                ${p.image ? `
                <img
                    src="${p.image}"
                    alt="${p.imageAlt || p.title}"
                    style="object-position: ${p.imagePosition || 'center'}"
                    loading="lazy"
                    decoding="async"
                    onerror="this.remove()"
                >` : ''}
            </div>
            <div class="project-meta">${p.category} · ${p.location}</div>
            <h3>${p.title}</h3>
        </${tag}>
        `;                                                                              
    }).join('');
}

/* --- Render Jobs --- */
function renderJobs() {
	const jobsGrid = $('#jobs-grid');
	if (!jobsGrid || !Array.isArray(window.jobs)) return;

	const activeJobs = (window.jobs || []).filter(j => j.active);
	jobsGrid.innerHTML = activeJobs.map(j => `
		<article class="job-card">
			<div class="job-meta">${j.department} · ${j.type}</div>
			<h3>${j.title}</h3>
			<p>${j.description}</p>
			<a href="#kontakt">Details & Bewerbung →</a>
		</article>
	`).join('');

	const noJobs = $('#no-jobs');
	if (noJobs) noJobs.hidden = activeJobs.length > 0;
}

/* --- Reveal on scroll --- */
function initRevealObserver() {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });

	document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* --- Contact form --- */
function initContactForm() {
	const form = $('#contact-form');
	const status = $('#form-status');
	if (!form) return;

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		if (!form.checkValidity()) {
			if (status) status.textContent = 'Bitte prüfen Sie die markierten Pflichtfelder.';
			form.reportValidity();
			return;
		}

		if (status) status.textContent = 'Vielen Dank. Ihre Nachricht wurde geprüft und kann nun versendet werden.';
		// TODO: Vor Livegang: POST an serverseitigen Endpunkt mit Spam-Schutz einrichten.
		form.reset();
	});
}

/* Menü scroll */
/* Fester Header: nur das Design wechselt */
const header = document.querySelector("[data-header]");
const logo = header.querySelector(".brand-logo");

function updateHeader() {
  const isAtTop = window.scrollY <= 8;

  /*
    Sichtbarkeit wird direkt als Inline-Style erzwungen.
    Das setzt sich gegen alte CSS-Klassen durch.
  */
  header.style.setProperty("position", "fixed", "important");
  header.style.setProperty("top", "0", "important");
  header.style.setProperty("right", "0", "important");
  header.style.setProperty("left", "0", "important");
  header.style.setProperty("z-index", "99999", "important");
  header.style.setProperty("display", "flex", "important");
  header.style.setProperty("visibility", "visible", "important");
  header.style.setProperty("opacity", "1", "important");
  header.style.setProperty("transform", "translateY(0)", "important");

  if (isAtTop) {
    header.style.backgroundColor = "transparent";
    header.style.borderBottomColor = "transparent";
    header.style.color = "#fff";

    if (logo) {
      logo.style.filter = "brightness(0) invert(1)";
    }
  } else {
    header.style.backgroundColor = "#fff";
    header.style.borderBottomColor = "#686863";
    header.style.color = "#20201e";

    if (logo) {
      logo.style.filter = "brightness(0)";
    }
  }
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

/* --- Init --- */
function init() {
	renderProjects();
	renderJobs();
	initRevealObserver();
	initContactForm();
}

init();