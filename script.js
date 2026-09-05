document.getElementById('year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fluid Island nav — hamburger morph + massive overlay expansion
const toggle = document.getElementById('nav-toggle');
const overlay = document.getElementById('nav-overlay');

function setMenu(open) {
    toggle.classList.toggle('is-open', open);
    overlay.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    overlay.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
}

if (toggle && overlay) {
    toggle.addEventListener('click', () => {
        setMenu(!overlay.classList.contains('is-open'));
    });
    overlay.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => setMenu(false));
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('is-open')) setMenu(false);
    });
}

// Scroll interpolation — IntersectionObserver only, never scroll listeners
const targets = document.querySelectorAll('.hero__copy, .shell, .section__head, .site-footer');
if (reduceMotion) {
    targets.forEach((el) => el.classList.add('is-visible'));
} else {
    targets.forEach((el) => el.classList.add('reveal'));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    targets.forEach((el) => observer.observe(el));
}

// One deliberate motion moment: typed status line in the console
const typedEl = document.getElementById('typed-line');
const phrases = ['reasoning over repo…', 'shard map rebuilt · 9 nodes', 'answer ready · 0 cloud calls'];
if (typedEl && !reduceMotion) {
    let i = 0;
    window.setInterval(() => {
        i = (i + 1) % phrases.length;
        typedEl.textContent = phrases[i];
    }, 2600);
}
