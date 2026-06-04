// ==================== GSAP & SCROLLTRIGGER SETUP ====================
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ==================== CUSTOM SMOOTH SCROLL ====================
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: target, offsetY: 80 },
        ease: "power3.inOut",
      });
    }
    // Close mobile menu
    document.getElementById("mobile-menu").classList.add("hidden");
  });
});

// ==================== NAVBAR ACTIVE STATE ====================
const sections = document.querySelectorAll("section[id]");
const navLinksArr = document.querySelectorAll(".nav-link");

sections.forEach((section) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => updateNav(section.id),
    onEnterBack: () => updateNav(section.id),
  });
});

function updateNav(id) {
  navLinksArr.forEach((link) => {
    link.classList.toggle("active", link.dataset.section === id);
  });
}

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener(
  "scroll",
  () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 100) {
      navbar.style.background = "rgba(13, 0, 16, 0.9)";
    } else {
      navbar.style.background = "rgba(13, 0, 16, 0.7)";
    }
    lastScroll = currentScroll;
  },
  { passive: true },
);

// ==================== MOBILE MENU ====================
document.getElementById("mobile-menu-btn").addEventListener("click", () => {
  document.getElementById("mobile-menu").classList.toggle("hidden");
});

// ==================== CUSTOM CURSOR ====================
const cursorDot = document.getElementById("cursor-dot");
const cursorTrail = document.getElementById("cursor-trail");
let mouseX = 0,
  mouseY = 0;
let trailX = 0,
  trailY = 0;

const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

if (!isTouchDevice) {
  document.addEventListener(
    "mousemove",
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    },
    { passive: true },
  );

  // Hover detection
  const hoverables = document.querySelectorAll(
    "a, button, .glow-btn, .social-icon, .skill-badge",
  );
  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () =>
      cursorTrail.classList.add("hovering"),
    );
    el.addEventListener("mouseleave", () =>
      cursorTrail.classList.remove("hovering"),
    );
  });

  // Cursor animation loop
  function animateCursor() {
    cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;

    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    cursorTrail.style.transform = `translate(${trailX - 16}px, ${trailY - 16}px)`;

    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

// ==================== PARTICLE SYSTEM ====================
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
const particleCount = isTouchDevice ? 30 : 60;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.hue = Math.random() * 40 + 260; // Purple range
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.02 + 0.01;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.pulse += this.pulseSpeed;

    if (this.x < -50 || this.x > canvas.width + 50) this.speedX *= -1;
    if (this.y < -50 || this.y > canvas.height + 50) this.speedY *= -1;
  }

  draw() {
    const pulseOpacity = this.opacity + Math.sin(this.pulse) * 0.1;
    const glowSize = this.size * (2 + Math.sin(this.pulse) * 0.5);

    // Glow
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      glowSize * 4,
    );
    gradient.addColorStop(
      0,
      `hsla(${this.hue}, 100%, 60%, ${pulseOpacity * 0.3})`,
    );
    gradient.addColorStop(1, `hsla(${this.hue}, 100%, 60%, 0)`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, glowSize * 4, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Core
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 100%, 75%, ${pulseOpacity})`;
    ctx.fill();
  }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// Draw connections
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        const opacity = (1 - dist / 150) * 0.08;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(139, 0, 255, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ==================== TYPEWRITER EFFECT ====================
const subtitleEl = document.getElementById("hero-subtitle");
const cursorEl = document.getElementById("typewriter-cursor");
const phrases = [
  "Building the future, one line at a time.",
  "Code. Create. Conquer.",
  "Where logic meets imagination.",
  "Crafting digital experiences.",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 60;

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    subtitleEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 30;
  } else {
    subtitleEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 60;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500; // Pause before new phrase
  }

  setTimeout(typeWriter, typeSpeed);
}

// ==================== GSAP ANIMATIONS ====================

// Hero entrance
const heroTl = gsap.timeline({ delay: 0.3 });

heroTl
  .to("#hero-label", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
  .to(
    "#hero-headline",
    { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
    "-=0.5",
  )
  .add(() => typeWriter(), "-=0.3")
  .to(
    "#hero-cta",
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    "-=0.2",
  )
  .to(
    "#scroll-indicator",
    { opacity: 1, duration: 1, ease: "power2.out" },
    "-=0.3",
  );

// Set initial states
gsap.set("#hero-label", { y: 30 });
gsap.set("#hero-headline", { y: 50 });
gsap.set("#hero-cta", { y: 30 });

// Hero parallax on scroll
gsap.to(".hero-content", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
  y: -100,
  opacity: 0.3,
  ease: "none",
});

// About section
gsap.to("#about-label", {
  scrollTrigger: {
    trigger: "#about-label",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  opacity: 1,
  y: 0,
  duration: 0.6,
  ease: "power3.out",
});
gsap.set("#about-label", { y: 20 });

gsap.to("#about-title", {
  scrollTrigger: {
    trigger: "#about-title",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: "power3.out",
  delay: 0.1,
});
gsap.set("#about-title", { y: 30 });

gsap.to("#about-card", {
  scrollTrigger: {
    trigger: "#about-card",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power3.out",
  delay: 0.2,
});
gsap.set("#about-card", { y: 40 });

// Skills section
gsap.to("#skills-label", {
  scrollTrigger: {
    trigger: "#skills-label",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  opacity: 1,
  y: 0,
  duration: 0.6,
  ease: "power3.out",
});
gsap.set("#skills-label", { y: 20 });

gsap.to("#skills-title", {
  scrollTrigger: {
    trigger: "#skills-title",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: "power3.out",
  delay: 0.1,
});
gsap.set("#skills-title", { y: 30 });

gsap.to("#skills-desc", {
  scrollTrigger: {
    trigger: "#skills-desc",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: "power3.out",
  delay: 0.15,
});
gsap.set("#skills-desc", { y: 20 });

// Skill panels stagger
gsap.utils.toArray(".skill-panel").forEach((panel, i) => {
  gsap.to(panel, {
    scrollTrigger: {
      trigger: panel,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    delay: i * 0.1,
  });
  gsap.set(panel, { y: 40 });
});

// Stats section
gsap.to("#stats-label", {
  scrollTrigger: {
    trigger: "#stats-label",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  opacity: 1,
  y: 0,
  duration: 0.6,
  ease: "power3.out",
});
gsap.set("#stats-label", { y: 20 });

gsap.to("#stats-title", {
  scrollTrigger: {
    trigger: "#stats-title",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: "power3.out",
  delay: 0.1,
});
gsap.set("#stats-title", { y: 30 });

gsap.to("#stats-desc", {
  scrollTrigger: {
    trigger: "#stats-desc",
    start: "top 85%",
    toggleActions: "play none none none",
  },
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: "power3.out",
  delay: 0.15,
});
gsap.set("#stats-desc", { y: 20 });

// Stat tiles with counter animation
gsap.utils.toArray(".stat-tile").forEach((tile, i) => {
  gsap.to(tile, {
    scrollTrigger: {
      trigger: tile,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    delay: i * 0.2,
    onComplete: () => {
      // Animate number counter
      const numEl = tile.querySelector(".stat-number");
      const target = parseInt(numEl.dataset.target);
      let current = 0;
      const increment = target / 60;
      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(counter);
        }
        numEl.textContent = Math.floor(current);
      }, 25);
    },
  });
  gsap.set(tile, { y: 50 });
});

// ==================== AMBIENT ORB FLOAT ====================
gsap.utils.toArray(".ambient-orb").forEach((orb, i) => {
  gsap.to(orb, {
    x: `random(-30, 30)`,
    y: `random(-30, 30)`,
    duration: `random(8, 15)`,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: i * 2,
  });
});

// ==================== VANILLA TILT ====================
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
  glare: true,
  "max-glare": 0.15,
  scale: 1.02,
  speed: 400,
});

// ==================== SCROLL VELOCITY TILT ====================
let scrollVelocity = 0;
let lastScrollY = window.scrollY;

window.addEventListener(
  "scroll",
  () => {
    scrollVelocity = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
  },
  { passive: true },
);
