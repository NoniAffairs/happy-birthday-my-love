/* MUSIC */
const music      = document.getElementById('bgMusic');
const musicBtn   = document.getElementById('musicBtn');
const musicLabel = musicBtn.querySelector('.music-label');
const musicIcon  = musicBtn.querySelector('.music-icon');

function toggleMusic() {
  if (music.paused) {
    music.play().then(() => {
      musicLabel.textContent = 'Pause';
      musicIcon.style.animationPlayState = 'running';
    }).catch(err => {
      console.log('Play blocked:', err);
    });
  } else {
    music.pause();
    musicLabel.textContent = 'Play';
    musicIcon.style.animationPlayState = 'paused';
  }
}

/* HERO PARALLAX */
const heroBg      = document.getElementById('heroBg');
const heroSection = document.getElementById('hero');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY < heroSection.offsetHeight * 1.2) {
    heroBg.style.transform = `scale(1.07) translateY(${scrollY * 0.32}px)`;
  }
}, { passive: true });

/* FINAL BG PARALLAX */
const finalBg      = document.getElementById('finalBg');
const finalSection = document.querySelector('.final-section');

window.addEventListener('scroll', () => {
  const rect = finalSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    const progress = 1 - (rect.bottom / (window.innerHeight + rect.height));
    finalBg.style.transform = `scale(1.07) translateY(${progress * -45}px)`;
  }
}, { passive: true });

/* SCROLL REVEAL */
const allReveal = document.querySelectorAll('.reveal-up, .reveal-item');

function showAll() {
  allReveal.forEach(el => el.classList.add('visible'));
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  window.addEventListener('load', () => {
    /* Hero fires immediately on load */
    document.querySelectorAll('.hero .reveal-up').forEach(el => {
      const delay = parseFloat(getComputedStyle(el).getPropertyValue('--delay') || '0') * 1000;
      setTimeout(() => el.classList.add('visible'), delay);
    });

    /* Everything else revealed on scroll */
    allReveal.forEach(el => {
      if (!el.closest('.hero')) observer.observe(el);
    });
  });

  /* Safety net — force show everything after 3 seconds */
  setTimeout(showAll, 3000);

} else {
  showAll();
}

/* BOKEH PARTICLES */
function createParticles() {
  const container = document.getElementById('particles');
  const count = window.innerWidth < 600 ? 10 : 20;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      bottom:${Math.random()*30}%;
      animation-delay:${Math.random()*10}s;
      animation-duration:${Math.random()*12+10}s;
      opacity:${Math.random()*0.5+0.1};
    `;
    container.appendChild(p);
  }
}

/* FLOATING HEARTS */
function createHearts() {
  const container = document.getElementById('hearts');
  const emojis = ['❤️','🤍','✨','💛','🌸'];
  const count = window.innerWidth < 600 ? 10 : 18;
  for (let i = 0; i < count; i++) {
    const h = document.createElement('div');
    h.className = 'floating-heart';
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const size = Math.random() * 0.8 + 0.6;
    h.style.cssText = `
      left:${Math.random()*100}%;
      font-size:${size}rem;
      animation-delay:${Math.random()*12}s;
      animation-duration:${Math.random()*10+12}s;
    `;
    container.appendChild(h);
  }
}

/* GALLERY LIGHTBOX */
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    const lb = document.createElement('div');
    lb.style.cssText = `
      position:fixed; inset:0; z-index:9998;
      background:rgba(0,0,0,0.95);
      display:flex; align-items:center; justify-content:center;
      padding:20px; cursor:zoom-out;
      backdrop-filter:blur(14px);
      animation:lbIn 0.3s ease;
    `;
    const clone = document.createElement('img');
    clone.src = img.src;
    clone.style.cssText = `
      max-width:100%; max-height:90svh;
      border-radius:12px; object-fit:contain;
      box-shadow:0 30px 80px rgba(0,0,0,0.8);
    `;
    lb.appendChild(clone);
    lb.addEventListener('click', () => lb.remove());
    document.body.appendChild(lb);
  });
});

const s = document.createElement('style');
s.textContent = `@keyframes lbIn { from { opacity:0 } to { opacity:1 } }`;
document.head.appendChild(s);

createParticles();
createHearts();
