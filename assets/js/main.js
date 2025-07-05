// Minimal Light/Dark Mode Toggle with SVG Icons

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('mode-toggle');
  const iconSpan = document.getElementById('mode-icon');
  const root = document.documentElement;
  let dark = false;

  // Minimal SVG icons (simple line style)
  const sunSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const moonSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>`;

  function setTheme(isDark) {
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    iconSpan.innerHTML = isDark ? sunSVG : moonSVG;
  }
  btn.addEventListener('click', () => {
    dark = !dark;
    setTheme(dark);
  });
  // Always set initial mode to light
  dark = false;
  setTheme(false);

  // Section nav logic
  const sections = Array.from(document.querySelectorAll('.page-section'));
  const navLinks = Array.from(document.querySelectorAll('.dot-link'));
  const siteTitle = document.querySelector('.site-title');

  // Helper: get current section index
  function getSectionIndex() {
    const scroll = window.scrollY + window.innerHeight / 2;
    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = sections[i];
      if (scroll >= sec.offsetTop) return i;
    }
    return 0;
  }

  // Update nav active state and title visibility
  function updateNavAndTitle() {
    const idx = getSectionIndex();
    navLinks.forEach((link, i) => {
      if (i === idx) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'true');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
    // Hide title if not in first section
    if (idx > 0) {
      siteTitle.classList.add('hide');
    } else {
      siteTitle.classList.remove('hide');
    }
  }

  // Smooth scroll on nav click
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Listen to scroll
  window.addEventListener('scroll', updateNavAndTitle);
  window.addEventListener('resize', updateNavAndTitle);
  updateNavAndTitle();

  // About image tilt effect
  const aboutImg = document.querySelector('.about-image');
  // Removed pop/tilt effect on about-image for static display

  // Typewriter effect for about section
  const typewriterEl = document.querySelector('.typewriter-text');
  if (typewriterEl) {
    const lines = [
      'clean portfolios.',
      'simple websites.',
      'modern interfaces.',
      'pixel-perfect designs.'
    ];
    let lineIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let delay = 60;

    function type() {
      const currentLine = lines[lineIdx];
      if (!isDeleting) {
        typewriterEl.textContent = currentLine.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === currentLine.length) {
          isDeleting = true;
          delay = 1200; // Pause at end of line
        } else {
          delay = 60;
        }
      } else {
        typewriterEl.textContent = currentLine.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          lineIdx = (lineIdx + 1) % lines.length;
          delay = 400;
        } else {
          delay = 30;
        }
      }
      setTimeout(type, delay);
    }
    type();
  }
});

// --- Minimal Circle Cursor Tracker ---
(function() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-tracker';
  document.body.appendChild(cursor);

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let currentX = mouseX, currentY = mouseY;
  function animate() {
    currentX += (mouseX - currentX) * 0.22;
    currentY += (mouseY - currentY) * 0.22;
    cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Helper: is interactive element
  function isInteractive(el) {
    if (!el) return false;
    const tag = el.tagName;
    if (['A','BUTTON','INPUT','TEXTAREA','SELECT','LABEL'].includes(tag)) return true;
    if (el.hasAttribute('tabindex') && el.tabIndex >= 0) return true;
    return false;
  }

  // Expand and fade on interactive hover
  let lastInteractive = null;
  document.addEventListener('mouseover', e => {
    const el = e.target.closest('a,button,input,textarea,select,label,[tabindex]');
    if (isInteractive(el)) {
      cursor.classList.add('link-hover');
      lastInteractive = el;
    }
  });
  document.addEventListener('mouseout', e => {
    const el = e.target.closest('a,button,input,textarea,select,label,[tabindex]');
    if (isInteractive(el) && el === lastInteractive) {
      cursor.classList.remove('link-hover');
      lastInteractive = null;
    }
  });
})(); 