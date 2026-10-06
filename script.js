/**
 * ============================================================================
 * USAID HUSSAIN — AI & SOFTWARE ENGINEER PORTFOLIO
 * Modular Data Architecture & Interactive Behaviors
 * ============================================================================
 */

// ===== Portfolio Data Architecture (Requirement #17 - Easy Maintenance) =====
const portfolioData = {
  profile: {
    name: 'Usaid Hussain',
    role: 'AI & Software Engineer',
    headline: 'Building intelligent products, modern web applications, and AI-powered solutions that solve real-world problems.',
    status: 'Available for Full-Time Roles & Freelance',
    location: 'India / Remote Worldwide',
    email: 'usaidhussainit2020@gmail.com',
    phone: '+91 88705 01622',
    github: 'https://github.com/usaidhussain',
    linkedin: 'https://linkedin.com/in/usaidhussain',
    resumeUrl: 'Usaidhussain_AIML_Engineer_Resume.pdf'
  },
  stats: [
    { label: 'Years Experience', value: 1.9, suffix: '+', note: 'AI & Software' },
    { label: 'Freelance Projects', value: 5, suffix: '+', note: 'Delivered successfully', highlight: true },
    { label: 'Engineering Focus', text: 'AI / GenAI', note: 'RAG, LLMs & Agents' },
    { label: 'Development', text: 'Full-Stack', note: 'FastAPI, React, SQL' }
  ],
  services: [
    {
      id: 'ai-solutions',
      title: 'AI & GenAI Solutions',
      icon: 'fas fa-brain',
      desc: 'End-to-end LLM applications, custom RAG retrieval pipelines, intelligent AI agents, and custom OpenAI/Gemini API integrations tailored to business workflows.'
    },
    {
      id: 'web-apps',
      title: 'Modern Web Applications',
      icon: 'fas fa-laptop-code',
      desc: 'Robust, fast, and scalable full-stack web applications built with Python (FastAPI/Flask), Node.js, modern JavaScript, and reactive frontends.'
    },
    {
      id: 'business-websites',
      title: 'Business & Brand Websites',
      icon: 'fas fa-globe',
      desc: 'High-converting, responsive websites for startups, consulting agencies, and enterprises with premium dark aesthetics and search engine optimization.'
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce & Showcases',
      icon: 'fas fa-store',
      desc: 'Bespoke product catalog platforms, customized e-commerce solutions, seamless customer ordering flows, and automated inventory systems.'
    },
    {
      id: 'automation',
      title: 'Automation & API Integrations',
      icon: 'fas fa-bolt',
      desc: 'Large-scale web scraping pipelines, automated data extraction, document OCR processing, and seamless third-party API connectivity.'
    }
  ]
};

// ===== Dynamic Role Typewriter =====
const rolesList = [
  'AI Engineer',
  'Generative AI Engineer',
  'Agentic AI Engineer',
  'Applied AI Engineer',
  'LLM Engineer',
  'Backend Developer',
  'AI Full-Stack Engineer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextElement = document.getElementById('typed-text');

function typeEffect() {
  if (!typedTextElement) return;

  const currentRole = rolesList[roleIndex];
  typedTextElement.textContent = isDeleting
    ? currentRole.substring(0, charIndex--)
    : currentRole.substring(0, charIndex++);

  let typingSpeed = isDeleting ? 35 : 75;

  if (!isDeleting && charIndex > currentRole.length) {
    typingSpeed = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % rolesList.length;
    typingSpeed = 400;
  }
  setTimeout(typeEffect, typingSpeed);
}

// ===== Subtle Ambient Particle Canvas =====
const canvas = document.getElementById('particle-canvas');
let ctx = null;
let particles = [];
let mouse = { x: null, y: null };
let animationFrameId = null;

if (canvas) {
  ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.25;
      this.speedY = (Math.random() - 0.5) * 0.25;
      this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Soft mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          this.x += (dx / dist) * 0.4;
          this.y += (dy / dist) * 0.4;
        }
      }

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(50, Math.floor((canvas.width * canvas.height) / 22000));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }
  initParticles();

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.06 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    animationFrameId = requestAnimationFrame(animateParticles);
  }

  // Only run canvas if not in reduced motion mode
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animateParticles();
  }

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
}

// ===== Custom Cursor (Desktop Only) =====
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

if (cursorDot && cursorOutline && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', e => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    cursorOutline.style.left = `${e.clientX}px`;
    cursorOutline.style.top = `${e.clientY}px`;
  });

  const interactiveElements = document.querySelectorAll(
    'a, button, input, textarea, select, .project-card, .stat-card, .service-card, .tech-chip, .filter-btn, .cred-card'
  );

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
  });
}

// ===== Navbar Scroll & Active Section Spy =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const trackedSections = document.querySelectorAll('section[id], header[id]');

function updateNavbarOnScroll() {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }

  let currentActive = '';
  const scrollPosition = window.scrollY + 180;

  trackedSections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    if (scrollPosition >= top && scrollPosition < top + height) {
      currentActive = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${currentActive}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });

// ===== Mobile Navigation Drawer =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-links');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isExpanded);
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', false);
    });
  });

  document.addEventListener('click', e => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', false);
    }
  });
}

// ===== Project Filter Functionality =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length && projectCards.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'grid';
          setTimeout(() => {
            card.classList.add('visible');
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ===== Scroll Reveal Animations =====
const animateElements = document.querySelectorAll('[data-animate]');
if (animateElements.length && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animateElements.forEach(el => revealObserver.observe(el));
} else {
  // Fallback for older browsers
  animateElements.forEach(el => el.classList.add('visible'));
}

// ===== Stat Counters Animation =====
const statValues = document.querySelectorAll('.stat-count');
if (statValues.length && 'IntersectionObserver' in window) {
  const countObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetNumber = parseFloat(entry.target.getAttribute('data-target'));
        const isDecimal = targetNumber % 1 !== 0;
        let current = 0;
        const steps = 35;
        const increment = targetNumber / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= targetNumber) {
            current = targetNumber;
            clearInterval(timer);
          }
          entry.target.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
        }, 30);

        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => countObserver.observe(el));
}

// ===== Scroll To Top Button =====
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Contact Inquiry Form Handler (Direct Web Submission) =====
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('form-submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const service = document.getElementById('form-service')?.value.trim();
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !email || !message) {
      if (formStatus) {
        formStatus.className = 'form-status error';
        formStatus.innerHTML = `
          <i class="fas fa-exclamation-circle"></i>
          <div class="form-status-content">
            <span class="form-status-title">Missing Required Fields</span>
            <span class="form-status-body">Please provide your name, email, and project message.</span>
          </div>
        `;
        formStatus.style.display = 'flex';
      }
      return;
    }

    // Set Loading State
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending Message...</span>';

    if (formStatus) {
      formStatus.className = 'form-status loading';
      formStatus.innerHTML = `
        <i class="fas fa-circle-notch fa-spin"></i>
        <div class="form-status-content">
          <span class="form-status-title">Sending Inquiry...</span>
          <span class="form-status-body">Transmitting your message directly to Usaid's inbox.</span>
        </div>
      `;
      formStatus.style.display = 'flex';
    }

    try {
      // Direct Web Submission to Usaid's email
      const response = await fetch('https://formsubmit.co/ajax/usaidhussainit2020@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          service: service,
          message: message,
          _subject: `New Portfolio Inquiry from ${name} [${service}]`,
          _template: 'table'
        })
      });

      const result = await response.json();

      if (response.ok || result.success === 'true' || result.success === true) {
        // Success Message (Structured Format)
        submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <div class="form-status-content">
              <span class="form-status-title">Inquiry Sent Successfully!</span>
              <span class="form-status-body">Thank you, <strong>${name}</strong>. Your message has been delivered directly to my inbox. I will reply to <strong>${email}</strong> shortly.</span>
            </div>
          `;
          formStatus.style.display = 'flex';
        }

        contactForm.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
          submitBtn.style.background = '';
        }, 7000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.warn('Direct web dispatch fallback triggered:', err);

      // Graceful fallback to email client
      if (formStatus) {
        formStatus.className = 'form-status error';
        formStatus.innerHTML = `
          <i class="fas fa-info-circle"></i>
          <div class="form-status-content">
            <span class="form-status-title">Redirecting to Email App</span>
            <span class="form-status-body">Opening your default email client to complete transmission directly...</span>
          </div>
        `;
        formStatus.style.display = 'flex';
      }

      const subject = encodeURIComponent(`Project Inquiry from ${name} [${service}]`);
      const body = encodeURIComponent(`Hi Usaid,\n\nName: ${name}\nEmail: ${email}\nService: ${service}\n\nProject Details:\n${message}`);
      window.location.href = `mailto:usaidhussainit2020@gmail.com?subject=${subject}&body=${body}`;

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  });
}

// ===== FAQ Accordion Behavior =====
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQ items (accordion behavior)
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherBtn = other.querySelector('.faq-question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        const otherIcon = other.querySelector('.faq-icon i');
        if (otherIcon) {
          otherIcon.classList.remove('fa-minus');
          otherIcon.classList.add('fa-plus');
        }
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        const icon = item.querySelector('.faq-icon i');
        if (icon) {
          icon.classList.remove('fa-plus');
          icon.classList.add('fa-minus');
        }
      }
    });
  });
}

// ===== Initialize on DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
  typeEffect();
  updateNavbarOnScroll();
  initFaqAccordion();
});
