// Mobile navigation
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');

if (reveals.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('is-visible'));
}

// Rotating word in contact section
const rotatingEl = document.querySelector('.rotating-word');
if (rotatingEl) {
  const words = rotatingEl.dataset.words.split(',');
  let index = 0;

  const inner = document.createElement('span');
  inner.className = 'rotating-word-inner';
  inner.textContent = rotatingEl.textContent;
  rotatingEl.textContent = '';
  rotatingEl.appendChild(inner);

  setInterval(() => {
    inner.classList.add('scroll-out');

    setTimeout(() => {
      index = (index + 1) % words.length;
      inner.textContent = words[index];
      inner.classList.remove('scroll-out');
      inner.classList.add('scroll-in');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          inner.classList.remove('scroll-in');
          inner.classList.add('scroll-reset');
          setTimeout(() => inner.classList.remove('scroll-reset'), 600);
        });
      });
    }, 600);
  }, 4000);
}

