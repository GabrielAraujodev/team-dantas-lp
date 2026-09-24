/* ==========================================================================
   TEAM DANTAS - INTERACTIVE & ANIMATION SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. HTML5 CANVAS PARTICLES ENGINE
  initCanvasParticles();

  // 2. GSAP & SCROLLTRIGGER ANIMATIONS
  initGSAPAnimations();

  // 3. NAVBAR SCROLL EFFECT
  initNavbarScroll();

  // 4. FAQ ACCORDION INTERACTION
  initFAQAccordion();
});

/* FAQ Accordion Toggle */
function initFAQAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const btn = item.querySelector('.accordion-btn');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      accordionItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   1. LIGHTWEIGHT CANVAS SPARK PARTICLES
   -------------------------------------------------------------------------- */
function initCanvasParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resizeCanvas() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const colors = ['#00F0FF', '#FF6B00', '#2563EB'];
  const particleCount = window.innerWidth < 768 ? 25 : 55;

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.radius = Math.random() * 1.8 + 0.6;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.speedY = Math.random() * 0.8 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.7 + 0.3;
      this.decay = Math.random() * 0.005 + 0.002;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.opacity -= this.decay;

      if (this.y < -10 || this.opacity <= 0) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   2. GSAP & SCROLLTRIGGER ANIMATIONS
   -------------------------------------------------------------------------- */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Floating 3D Shield (Continuous Y-axis Float)
  gsap.to('#shield-img', {
    y: -16,
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });

  // Floating 3D App Mockup Phone (Continuous Y-axis Float)
  gsap.to('#app-mockup', {
    y: -14,
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });

  // Hero Section Staggered Entrance
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
  heroTl.from('.hero-badge', { y: 30, opacity: 0, delay: 0.2 })
        .from('.hero-title', { y: 40, opacity: 0 }, '-=0.7')
        .from('.hero-subtitle', { y: 30, opacity: 0 }, '-=0.7')
        .from('.hero-cta-wrapper', { y: 30, opacity: 0 }, '-=0.7')
        .from('.hero-visual', { scale: 0.9, opacity: 0, duration: 1.2 }, '-=1');

  // Section 1: Plan Cards Stagger Reveal
  gsap.from('.plan-card', {
    scrollTrigger: {
      trigger: '.plans-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  });

  // Section 2: Step Items Stagger Reveal
  gsap.from('.step-item', {
    scrollTrigger: {
      trigger: '.how-it-works-section',
      start: 'top 75%',
      toggleActions: 'play none none none'
    },
    x: -40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out'
  });

  // Section 2: App Mockup Entrance
  gsap.from('.app-mockup-wrapper', {
    scrollTrigger: {
      trigger: '.how-it-works-section',
      start: 'top 75%',
      toggleActions: 'play none none none'
    },
    scale: 0.85,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  // Section 3: Final Conversion Box Scale Reveal
  gsap.from('.conversion-card', {
    scrollTrigger: {
      trigger: '.cta-final-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
}

/* --------------------------------------------------------------------------
   3. NAVBAR SCROLL BACKDROP ADJUSTMENT
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.padding = '14px 0';
      navbar.style.background = 'rgba(11, 12, 14, 0.95)';
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.8)';
    } else {
      navbar.style.padding = '20px 0';
      navbar.style.background = 'rgba(11, 12, 14, 0.75)';
      navbar.style.boxShadow = 'none';
    }
  });
}
