// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 4 + 'px';
  cursor.style.top  = my - 4 + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx - 16 + 'px';
  ring.style.top  = ry - 16 + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.transform   = 'scale(1.6)';
    cursor.style.transform = 'scale(0.5)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.transform   = 'scale(1)';
    cursor.style.transform = 'scale(1)';
  });
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(r => revealObs.observe(r));

// ── SKILL BAR ANIMATION ──
const bars = document.querySelectorAll('.skill-bar');
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width;
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

bars.forEach(b => {
  b.style.width = '0%';
  barObs.observe(b);
});

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--accent)'
      : '';
  });
});
