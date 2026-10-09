// ================= LOADING SCREEN =================
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  setTimeout(() => loader.classList.add('hidden'), 800);
});

// ================= THEME TOGGLE =================
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
root.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ================= MOBILE MENU =================
const mobileBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

mobileBtn.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  mobileBtn.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    mobileBtn.setAttribute('aria-expanded', 'false');
  });
});

// ================= STICKY NAVBAR + ACTIVE LINK =================
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navAnchors.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

// ================= SCROLL TO TOP =================
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ================= TYPING ANIMATION =================
const typingEl = document.getElementById('typing-text');
const phrases = [
  'TECH LEAD',
  'SOFTWARE ENGINEERING & ARCHITECTURE',
  'DATA ENGINEERING & REGULATORY TECHNOLOGY',
  'AI-ASSISTED ENGINEERING'
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  if (!isDeleting) {
    typingEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, isDeleting ? 40 : 70);
}
typeLoop();

// ================= INTERSECTION OBSERVER (SCROLL ANIMATIONS) =================
const animatedEls = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay') || 0;
      setTimeout(() => entry.target.classList.add('in-view'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

animatedEls.forEach(el => observer.observe(el));

// ================= ANIMATED COUNTERS =================
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1400;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(update);
}

counters.forEach(el => counterObserver.observe(el));

// ================= PARTICLES BACKGROUND =================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 25000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.8 + 0.5
  }));
}

function getParticleColor() {
  return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#2563EB';
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const color = getParticleColor();

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.4;
    ctx.fill();
  });

  // connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.08;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
  animationFrame = requestAnimationFrame(animateParticles);
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initParticles() {
  resizeCanvas();
  createParticles();
  if (!prefersReducedMotion) {
    cancelAnimationFrame(animationFrame);
    animateParticles();
  }
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});

initParticles();

// ================= PARALLAX HERO =================
const heroVisual = document.querySelector('.hero-visual');
window.addEventListener('scroll', () => {
  if (heroVisual && window.scrollY < window.innerHeight) {
    heroVisual.style.transform = `translateY(${window.scrollY * 0.15}px)`;
  }
}, { passive: true });

// ================= FOOTER YEAR =================
document.getElementById('year').textContent = new Date().getFullYear();
