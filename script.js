/* Interactive JavaScript Engine - Thunga Kavya Yadav Portfolio */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initProjectFilters();
  initSmoothScroll();
  initContactForm();
});

/* 1. Theme Switcher (Dark/Light Mode) */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  
  // Check for saved user theme preference, default to dark mode for modern developer vibe
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.className = 'fas fa-sun';
    } else {
      themeIcon.className = 'fas fa-moon';
    }
  }
}

/* 2. Mobile Menu Toggle */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        const icon = mobileBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }
}

/* 3. Project Filter Buttons */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 4. Smooth Scroll Active Nav Highlight */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* 5. Project Detail Modal */
const projectData = {
  aviora: {
    title: "Aviora — Smart Bus Reservation System",
    category: "Full Stack Java & React",
    tech: ["Java 21", "Spring Boot 3", "MongoDB", "React 19", "JWT Security", "Swagger UI"],
    duration: "8 Weeks | Team Size: 4",
    highlights: [
      "Engineered an enterprise-level bus ticket booking system with real-time seat lock mechanism (5-minute transient locks with live visual countdown timers).",
      "Implemented multi-role JWT Security supporting Customer, Driver, and Admin authentication & authorization flows.",
      "Built interactive 2D seat matrix grid rendering layout configurations dynamically.",
      "Integrated PNR E-ticket generator with client-side SVG barcode rendering.",
      "Added live journey assistant for estimated arrival & departure tracking."
    ]
  },
  student: {
    title: "Student Management System",
    category: "Java & MySQL",
    tech: ["Java 17/21", "OOPs Design", "MySQL", "Collections Framework", "File I/O", "CSV Export"],
    duration: "6 Weeks | Team Size: 4",
    highlights: [
      "Built a desktop & CLI management application utilizing Object-Oriented Design Principles (Encapsulation, Inheritance, Polymorphism).",
      "Automated grade calculation logic (A+ through F) based on multi-parameter weighted scoring.",
      "Developed fast multi-field search and dynamic multi-criteria sorting algorithms.",
      "Integrated automated CSV analytical report exporter and binary file serialization for robust persistent storage."
    ]
  },
  course: {
    title: "Online Course Management Portal",
    category: "MERN / Frontend",
    tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "LocalStorage API", "Responsive Web Design"],
    duration: "4 Weeks | Team Size: 4",
    highlights: [
      "Designed an interactive E-Learning management platform with user registration and session management via LocalStorage API.",
      "Features course catalog search, dynamic category filtering, and course detail preview modals.",
      "Implements milestone progress tracking bars with automatic printable certificate generation upon 100% course completion."
    ]
  }
};

function openProjectModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  const modalOverlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');

  modalBody.innerHTML = `
    <span class="section-subtitle">${data.category}</span>
    <h2 class="section-title" style="margin-bottom: 0.5rem;">${data.title}</h2>
    <p style="color: var(--accent-primary); font-weight: 600; margin-bottom: 1.5rem;"><i class="far fa-clock"></i> ${data.duration}</p>
    
    <h4 style="margin-bottom: 0.75rem; color: var(--text-primary);">Technologies Used:</h4>
    <div class="project-tech-tags" style="margin-bottom: 1.75rem;">
      ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
    </div>

    <h4 style="margin-bottom: 0.75rem; color: var(--text-primary);">Key Architectural Highlights:</h4>
    <ul class="timeline-bullets" style="margin-bottom: 2rem;">
      ${data.highlights.map(h => `<li>${h}</li>`).join('')}
    </ul>

    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <a href="https://github.com/kavyayadav05/My_portfolio.git" target="_blank" class="btn-primary">
        <i class="fab fa-github"></i> View GitHub Code
      </a>
      <button onclick="closeModal()" class="btn-secondary">Close Window</button>
    </div>
  `;

  modalOverlay.classList.add('active');
}

function openResumeModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');

  modalBody.innerHTML = `
    <div style="text-align: center; margin-bottom: 2rem;">
      <h2 style="font-size: 2rem; font-weight: 800; color: var(--text-primary);">THUNGA KAVYA YADAV</h2>
      <p style="color: var(--accent-primary); font-weight: 600;">B.Tech Computer Science & Engineering (2023–2027)</p>
      <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.25rem;">
        Kadapa, AP | +91 9014754672 | kavyayadavthunga@gmail.com | 23691A0580@mits.ac.in
      </p>
    </div>

    <div style="margin-bottom: 1.75rem; background: var(--bg-surface); padding: 1.25rem; border-radius: 8px; border-left: 4px solid var(--accent-primary);">
      <h4 style="font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">PROFESSIONAL SUMMARY</h4>
      <p style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.6;">
        Motivated and detail-oriented Computer Science & Engineering undergraduate (B.Tech 2023–2027) with hands-on expertise in Java Full Stack development, Spring Boot micro-frameworks, and modern frontend technologies including React 19 and the MERN stack. Demonstrated track record of building production-grade web applications—such as a real-time smart bus reservation engine with JWT security and transient seat locks—supported by strong fundamentals in Data Structures, Algorithms, and Object-Oriented System Design. Adept at collaborative team environments, rapid problem-solving, and continuous learning, seeking an entry-level Software Development Engineer (SDE) or Full Stack Web Developer role for Campus Placements 2027.
      </p>
    </div>

    <div style="margin-bottom: 1.75rem;">
      <h4 style="font-weight: 700; color: var(--accent-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 0.4rem; margin-bottom: 0.75rem;">
        TECHNICAL COMPETENCIES
      </h4>
      <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.3rem;"><strong>Languages:</strong> Java 21, C, Python (Basic), JavaScript (ES6+), HTML5, CSS3</p>
      <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.3rem;"><strong>Frameworks & Stack:</strong> Spring Boot 3, Spring MVC, React 19, Node.js, Express, MERN Stack</p>
      <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.3rem;"><strong>Databases & Tools:</strong> MySQL, MongoDB, JWT, REST APIs, Git/GitHub, VS Code</p>
      <p style="font-size: 0.9rem; color: var(--text-secondary);"><strong>Core Areas:</strong> Data Structures & Algorithms (DSA), OOPs, Cloud Computing, Generative AI, DevOps</p>
    </div>

    <div style="margin-bottom: 1.75rem;">
      <h4 style="font-weight: 700; color: var(--accent-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 0.4rem; margin-bottom: 0.75rem;">
        EDUCATION
      </h4>
      <p style="font-size: 0.925rem; font-weight: 700; color: var(--text-primary);">B.Tech in Computer Science Engineering — Madanapalle Institute of Technology & Science (MITS)</p>
      <p style="font-size: 0.85rem; color: var(--text-secondary);">Session: 2023–2027 | CGPA: 7.5</p>
    </div>

    <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 2rem;">
      <button onclick="window.print()" class="btn-primary"><i class="fas fa-print"></i> Print / Save as PDF</button>
      <button onclick="closeModal()" class="btn-secondary">Close Preview</button>
    </div>
  `;

  modalOverlay.classList.add('active');
}

function closeModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
  }
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* 6. Contact Form Handling */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all fields before submitting.');
      return;
    }

    // Simulate successful form dispatch
    showToast(`Thank you, ${name}! Your message has been sent successfully.`);
    form.reset();
  });
}

/* 7. Toast Notification */
function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--accent-primary);"></i> ${message}`;
  
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
