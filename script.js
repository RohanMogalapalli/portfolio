document.getElementById('year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Single orchestrated reveal: observe sections once, no per-card stagger.
const targets = document.querySelectorAll('.hero__copy, .console, .feature, .dossier, .background-grid, .contact__grid');
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
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
    targets.forEach((el) => observer.observe(el));
}

// One deliberate motion moment: typed status line in the console.
const typedEl = document.getElementById('typed-line');
const phrases = ['reasoning over repo…', 'shard map rebuilt · 9 nodes', 'answer ready · 0 cloud calls'];
if (typedEl && !reduceMotion) {
    let i = 0;
    window.setInterval(() => {
        i = (i + 1) % phrases.length;
        typedEl.textContent = phrases[i];
    }, 2600);
}
