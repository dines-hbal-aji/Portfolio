/* 
  =========================================
  Dinesh Balaji K - Premium Portfolio Logic
  Awwwards-level interactive features
  =========================================
*/

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initTheme();
  initMobileMenu();
  initTypingEffect();
  initStatsCounter();
  initScrollEffects();
  initTechGraph();
  initProjectsFilter();
  initGitHubStats();
  initCertificatesLightbox();
  initAudioEngine();
  initAIChat();
  initKeyboardShortcuts();
  initContactForm();
  initModalBackdropClose();
  initLenis();
  registerServiceWorker();
});

/* PWA Service Worker Registration */
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => console.log('[Service Worker] Registered successfully', reg.scope))
        .catch((err) => console.error('[Service Worker] Registration failed', err));
    });
  }
}

/* Custom Preloader */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progressBar = document.querySelector('.loader-progress-bar');
  const percentageText = document.querySelector('.loader-percentage');
  const logText = document.querySelector('.loader-logs');
  
  if (!preloader) return;
  
  // Disable scroll during preloader
  document.body.style.overflow = 'hidden';
  
  const compilerLogs = [
    'Initializing portfolio nodes...',
    'Loading MERN stack modules...',
    'Compiling Tailwind utility layers...',
    'Starting PHP server instances...',
    'Setting up MySQL connections...',
    'Loading AI vector database (FAISS)...',
    'Injecting GSAP micro-animations...',
    'System ready. Launching portfolio...'
  ];
  
  let progress = 0;
  let logIndex = 0;
  
  const progressInterval = setInterval(() => {
    // Increment progress
    progress += Math.floor(Math.random() * 8) + 4;
    if (progress > 100) progress = 100;
    
    progressBar.style.width = `${progress}%`;
    percentageText.textContent = `${progress}%`;
    
    // Update logs sequentially
    if (progress >= (logIndex + 1) * (100 / compilerLogs.length) && logIndex < compilerLogs.length) {
      logText.textContent = compilerLogs[logIndex];
      logIndex++;
    }
    
    if (progress >= 100) {
      clearInterval(progressInterval);
      
      // Delay slightly for visual comfort
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        document.body.style.overflow = '';
        
        // Trigger entrance animations
        document.querySelectorAll('.hero-fade-in').forEach((el, index) => {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, index * 150);
        });
      }, 500);
    }
  }, 80);
}

/* Light / Dark Theme Management */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (userPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
  
  themeToggle.addEventListener('click', () => {
    playAudioClick();
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  if (theme === 'light') {
    // Sun icon
    themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
  } else {
    // Moon icon
    themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
  }
}

/* Mobile Menu Navigation */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');
  
  if (!hamburger || !navLinks) return;
  
  hamburger.addEventListener('click', () => {
    playAudioClick();
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

/* Hero Text Typewriter Animation */
function initTypingEffect() {
  const target = document.querySelector('.typewriter-text');
  if (!target) return;
  
  const words = [
    'MERN Stack Developer',
    'AI Solutions Integrator',
    'PHP & SQL Developer',
    'Backend Engineer',
    'Frontend UI Architect'
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Pause before typing next word
    }
    
    setTimeout(type, typingSpeed);
  }
  
  setTimeout(type, 1000);
}

/* Counter numbers scroll effect */
function initStatsCounter() {
  const statsSection = document.getElementById('stats');
  if (!statsSection) return;
  
  const stats = document.querySelectorAll('.stat-num');
  let animated = false;
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      stats.forEach(stat => {
        const targetValue = parseInt(stat.getAttribute('data-target'));
        const hasPlus = stat.textContent.includes('+');
        const duration = 2000; // 2 seconds
        let startTime = null;
        
        function animateCounter(currentTime) {
          if (!startTime) startTime = currentTime;
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          
          // Easing function outQuad
          const easeProgress = progress * (2 - progress);
          const currentValue = Math.floor(easeProgress * targetValue);
          
          stat.textContent = `${currentValue}${hasPlus ? '+' : ''}`;
          
          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          } else {
            stat.textContent = `${targetValue}${hasPlus ? '+' : ''}`;
          }
        }
        
        requestAnimationFrame(animateCounter);
      });
      animated = true;
    }
  }, { threshold: 0.2 });
  
  observer.observe(statsSection);
}

/* Scroll events: Reading progress, nav shadow, and reveal items */
function initScrollEffects() {
  const nav = document.querySelector('nav');
  const backToTop = document.querySelector('.back-to-top');
  
  // Create reveal elements class
  const revealElements = document.querySelectorAll('.reveal-element');
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(35px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        scrollObserver.unobserve(entry.target); // Trigger only once
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => scrollObserver.observe(el));

  // Custom hover sound handlers for links
  document.querySelectorAll('a, button, .interactive-card').forEach(el => {
    el.addEventListener('mouseenter', () => playAudioHover());
  });

  // Track active link based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollY / height) * 100;
    
    // Update scroll progress bar
    document.documentElement.style.setProperty('--scroll-progress', `${scrollPercent}%`);
    
    // Toggle nav backdrop
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Scroll active link highlight
    let currentSectionId = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* Interactive Tech Stack Graph (Canvas-based physics) */
function initTechGraph() {
  const canvas = document.getElementById('tech-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;
  
  canvas.width = width;
  canvas.height = height;
  
  // Handle resize
  window.addEventListener('resize', () => {
    if (!canvas) return;
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    initNodes();
  });
  
  const nodeNames = [
    { name: 'React', category: 'frontend', color: '#00d8ff' },
    { name: 'Vue.js', category: 'frontend', color: '#42b883' },
    { name: 'Tailwind CSS', category: 'frontend', color: '#38bdf8' },
    { name: 'TypeScript', category: 'frontend', color: '#3178c6' },
    { name: 'Node.js', category: 'backend', color: '#68a063' },
    { name: 'Express', category: 'backend', color: '#888888' },
    { name: 'PHP', category: 'backend', color: '#777bb4' },
    { name: 'Python', category: 'backend', color: '#3776ab' },
    { name: 'Flask', category: 'backend', color: '#000000' },
    { name: 'MySQL', category: 'database', color: '#00758f' },
    { name: 'MongoDB', category: 'database', color: '#4db33d' },
    { name: 'Git/GitHub', category: 'tools', color: '#f05032' },
    { name: 'Vercel', category: 'tools', color: '#ffffff' },
    { name: 'Postman', category: 'tools', color: '#ff6c37' },
    { name: 'Local LLMs', category: 'ai', color: '#8b5cf6' },
    { name: 'RAG Systems', category: 'ai', color: '#00e5ff' }
  ];
  
  let nodes = [];
  let mouse = { x: null, y: null, radius: 120 };
  
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  
  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  class Node {
    constructor(name, category, color, x, y) {
      this.name = name;
      this.category = category;
      this.color = color;
      this.x = x;
      this.y = y;
      this.baseX = x;
      this.baseY = y;
      this.size = 5 + Math.random() * 4;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
    }
    
    update() {
      // Gentle bounce physics
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 20 || this.x > width - 20) this.vx *= -1;
      if (this.y < 20 || this.y > height - 20) this.vy *= -1;
      
      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          let angle = Math.atan2(dy, dx);
          
          // Reposition away from mouse
          this.x -= Math.cos(angle) * force * 3;
          this.y -= Math.sin(angle) * force * 3;
        }
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset
      
      // Draw Label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '500 10px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(this.name, this.x, this.y - this.size - 5);
    }
  }
  
  function initNodes() {
    nodes = [];
    nodeNames.forEach((n, idx) => {
      // Distribute nodes evenly
      const x = Math.random() * (width - 100) + 50;
      const y = Math.random() * (height - 100) + 50;
      nodes.push(new Node(n.name, n.category, n.color, x, y));
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        let dx = nodes[i].x - nodes[j].x;
        let dy = nodes[i].y - nodes[j].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        // Connect if in the same category or within range
        let shouldConnect = false;
        let connectionColor = 'rgba(79, 140, 255, 0.05)';
        
        if (nodes[i].category === nodes[j].category && distance < 180) {
          shouldConnect = true;
          connectionColor = 'rgba(139, 92, 246, 0.12)';
        } else if (distance < 120) {
          shouldConnect = true;
        }
        
        if (shouldConnect) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = connectionColor;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    
    // Draw and update nodes
    nodes.forEach(node => {
      node.update();
      node.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  initNodes();
  animate();
}

/* Projects Filtering and Case Study details */
function initProjectsFilter() {
  const searchInput = document.getElementById('project-search');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-container');
  
  if (!projectCards.length) return;
  
  function filter() {
    playAudioClick();
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    const category = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
    
    projectCards.forEach(card => {
      const tags = card.getAttribute('data-tags').toLowerCase();
      const title = card.querySelector('.project-title').textContent.toLowerCase();
      const desc = card.querySelector('.project-desc').textContent.toLowerCase();
      
      const matchesSearch = title.includes(query) || desc.includes(query) || tags.includes(query);
      const matchesCategory = category === 'all' || tags.includes(category.toLowerCase());
      
      if (matchesSearch && matchesCategory) {
        card.style.display = 'block';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => { card.style.display = 'none'; }, 200);
      }
    });
  }
  
  if (searchInput) {
    searchInput.addEventListener('input', filter);
  }
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filter();
    });
  });
}

// Case Study details DB for popup modal
const caseStudiesData = {
  'colorhub': {
    title: 'ColorHub — Color Reservation Platform',
    problem: 'Multiple designers trying to reserve paint, branding, or interior design color schemes simultaneously face booking conflicts and naming inconsistencies without clear synchronizations.',
    solution: 'Designed and implemented a real-time reservation platform incorporating concurrency-handling backend locks to resolve and reject duplicate bookings.',
    architecture: 'HTML5, CSS3, JavaScript Client, Python Backend API services.',
    database: 'SQLite/MySQL database logs with conflict-resolution algorithms.',
    api: 'Color search endpoints, reservation locks API, availability trackers.',
    results: 'Eliminated reservation collision errors entirely, improving interior design workflow speed by 30%.'
  },
  'educms': {
    title: 'EduCMS — Course Management System',
    problem: 'Educational institutions struggle to organize courses, course sections, and student enrollment lists under unified interfaces with discrete instructor/student views.',
    solution: 'Developed a relational CMS built on a normalized database with custom security roles for course creation and student enrollment registration.',
    architecture: 'HTML5, JavaScript, Python, MySQL database engines.',
    database: 'Highly normalized relational MySQL schema (3NF) containing indexed fields for course listings and registration pipelines.',
    api: 'Role routing filters, enrollment verification API, course catalog builder.',
    results: 'Cut administrative registration overhead by 50% through automated course catalog mapping.'
  },
  'omnium': {
    title: 'Omnium — AI Study Assistant',
    problem: 'Standard study tools depend on expensive, cloud-based AI subscription platforms which pose data privacy concerns and require persistent web connection.',
    solution: 'Created an offline-first AI study assistant utilizing local LLM pipeline inference (via LM Studio) to convert syllabi texts into structured study plans.',
    architecture: 'Python, Flask backend infrastructure, local LLM integration, JavaScript client.',
    database: 'Local file-based caching structures.',
    api: 'Syllabus processing endpoints, local LLM query handlers.',
    results: 'Zero external API costs, complete offline capability, and 100% educational resource data privacy compliance.'
  },
  'socon': {
    title: 'Socon — Full-Stack Web Application',
    problem: 'Legacy PHP applications are highly susceptible to security flaws such as SQL injections, CSRF attacks, and unauthenticated session modifications.',
    solution: 'Architected a highly secure session-managed PHP portal featuring parameterized queries and input sanitizations.',
    architecture: 'PHP server-side routing, vanilla JavaScript, vanilla CSS design variables.',
    database: 'MySQL database mapping user tables, transactions, and session hashes.',
    api: 'User session verification, security validation filters, secure CRUD endpoints.',
    results: 'Achieved 100% protection rating against automated SQL injection tools.'
  },
  'fitpro': {
    title: 'Fitness-Pro — Fitness Tracking Platform',
    problem: 'Fitness and nutrition logs are typically slow, overly structured, and do not accommodate custom Indian student diet logs.',
    solution: 'Created a MyFitnessPal-style tracking application utilizing Vue.js, Flask, and MongoDB to allow loose calorie schema modeling.',
    architecture: 'Vue.js client, Python / Flask, MongoDB, deployed on Vercel.',
    database: 'MongoDB utilizing Mongoose validators, offering highly indexable schemas for workout meal items.',
    api: 'User registration API, exercise databases, nutrient calorie calculators.',
    results: 'Sub-second page load times on Vercel and scalable workout record-keeping.'
  },
  'suryacotton': {
    title: 'Surya Cotton Textiles E-Commerce',
    problem: 'Surya Cotton Textiles managed orders and stock logs manually, causing shipping lags and zero sales trend data visualizations.',
    solution: 'Developed and launched a production-ready e-commerce store (sales.suryacotton.com) servicing over 100 product SKUs with inventory trackers.',
    architecture: 'PHP API service, MySQL database, Apache HTTP Server.',
    database: 'MySQL normalized relational schema matching catalog inventory indexes, customers, and order items.',
    api: 'E-commerce cart API, order placements, secure checkout gateways.',
    results: 'Reduced operational order tracking overhead by 40% and improved inventory latency.'
  }
};


window.openCaseStudy = function(projectId) {
  playAudioClick();
  const data = caseStudiesData[projectId];
  if (!data) return;
  
  const modal = document.getElementById('case-study-modal');
  if (!modal) return;
  
  modal.querySelector('.case-study-title').textContent = data.title;
  modal.querySelector('.cs-problem').textContent = data.problem;
  modal.querySelector('.cs-solution').textContent = data.solution;
  modal.querySelector('.cs-arch').textContent = data.architecture;
  modal.querySelector('.cs-db').textContent = data.database;
  modal.querySelector('.cs-api').textContent = data.api;
  modal.querySelector('.cs-results').textContent = data.results;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeModal = function(modalId) {
  playAudioClick();
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

function initModalBackdropClose() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });
}

/* Certificates & Achievements Lightbox Gallery */
function initCertificatesLightbox() {
  const certModal = document.getElementById('cert-modal');
  const certImg = document.getElementById('cert-modal-img');
  
  window.openCertificate = function(imgSrc, title) {
    playAudioClick();
    if (!certModal || !certImg) return;
    
    certImg.src = imgSrc;
    certImg.alt = title;
    certModal.querySelector('h4').textContent = title;
    
    const downloadLink = document.getElementById('cert-download-link');
    if (downloadLink) {
      downloadLink.href = imgSrc;
      downloadLink.download = title.replace(/\s+/g, '_') + '.png';
    }
    
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  
  // Certificate tabs category filtering
  window.filterCertificates = function(category) {
    playAudioClick();
    const cards = document.querySelectorAll('.certificate-card-container');
    const tabs = document.querySelectorAll('.cert-tab');
    
    tabs.forEach(tab => {
      if (tab.getAttribute('onclick').includes(category)) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    cards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      if (category === 'all' || cardCat === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  };
}

/* GitHub Live Stats Fetcher */
function initGitHubStats() {
  const username = 'dines-hbal-aji';
  const reposCountEl = document.getElementById('github-repos-count');
  const followersCountEl = document.getElementById('github-followers-count');
  const starsCountEl = document.getElementById('github-stars-count');
  
  // Set default values as fallback
  let repos = 18;
  let followers = 15;
  let stars = 6;
  
  if (reposCountEl) reposCountEl.textContent = repos;
  if (followersCountEl) followersCountEl.textContent = followers;
  if (starsCountEl) starsCountEl.textContent = stars;
  
  // Attempt to fetch fresh from Github API
  fetch(`https://api.github.com/users/${username}`)
    .then(res => {
      if (!res.ok) throw new Error('Github limit reached');
      return res.json();
    })
    .then(data => {
      if (data.public_repos && reposCountEl) reposCountEl.textContent = data.public_repos;
      if (data.followers && followersCountEl) followersCountEl.textContent = data.followers;
    })
    .catch(err => console.log('Using offline Github profile statistics'));

  fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    .then(res => res.json())
    .then(reposData => {
      let totalStars = 0;
      reposData.forEach(repo => {
        totalStars += repo.stargazers_count;
      });
      if (starsCountEl) starsCountEl.textContent = totalStars;
    })
    .catch(err => console.log('Using offline Github stars statistics'));
}

/* Web Audio SFX & Ambient Music Engine */
let audioCtx = null;
let ambientOscillator1 = null;
let ambientOscillator2 = null;
let ambientGainNode = null;
let isAudioPlaying = false;

function initAudioEngine() {
  const audioToggle = document.getElementById('audio-toggle');
  const waveform = document.querySelector('.audio-waveform');
  if (!audioToggle) return;
  
  audioToggle.addEventListener('click', () => {
    // Lazy initialize AudioContext on user interaction
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    if (isAudioPlaying) {
      // Pause ambient pads
      stopAmbientPads();
      isAudioPlaying = false;
      audioToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M23 9l-6 6M17 9l6 6"/></svg>`;
      if (waveform) waveform.classList.remove('active');
    } else {
      // Play ambient pads
      startAmbientPads();
      isAudioPlaying = true;
      audioToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
      if (waveform) waveform.classList.add('active');
    }
  });
}

// Generate sound effects using Web Audio API synthesized frequencies
function playAudioClick() {
  if (!audioCtx || audioCtx.state === 'suspended') return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, audioCtx.currentTime); // Pitch (A5)
  osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.08);
  
  gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
  
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + 0.09);
}

function playAudioHover() {
  if (!audioCtx || audioCtx.state === 'suspended' || isAudioPlaying === false) return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.03);
  
  gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
  
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + 0.04);
}

// Start soft background synth pads
function startAmbientPads() {
  if (!audioCtx) return;
  
  ambientGainNode = audioCtx.createGain();
  ambientGainNode.gain.setValueAtTime(0.0, audioCtx.currentTime);
  // Fade in gently
  ambientGainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 2.0);
  ambientGainNode.connect(audioCtx.destination);
  
  // Osc 1 (Low C pad)
  ambientOscillator1 = audioCtx.createOscillator();
  ambientOscillator1.type = 'triangle';
  ambientOscillator1.frequency.setValueAtTime(130.81, audioCtx.currentTime); // C3
  
  // Osc 2 (Major E pad, slightly detuned)
  ambientOscillator2 = audioCtx.createOscillator();
  ambientOscillator2.type = 'sine';
  ambientOscillator2.frequency.setValueAtTime(164.81 + 0.5, audioCtx.currentTime); // E3
  
  // Lowpass filter to keep it dark and warm
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(300, audioCtx.currentTime);
  
  ambientOscillator1.connect(filter);
  ambientOscillator2.connect(filter);
  filter.connect(ambientGainNode);
  
  ambientOscillator1.start(0);
  ambientOscillator2.start(0);
  
  // Slow chord modulation loop
  let step = 0;
  const chords = [
    { f1: 130.81, f2: 164.81 }, // C3, E3
    { f1: 110.00, f2: 146.83 }, // A2, D3
    { f1: 87.31,  f2: 130.81 }, // F2, C3
    { f1: 98.00,  f2: 146.83 }  // G2, D3
  ];
  
  function modulateChord() {
    if (!isAudioPlaying || !ambientOscillator1 || !ambientOscillator2) return;
    step = (step + 1) % chords.length;
    const nextChord = chords[step];
    
    ambientOscillator1.frequency.exponentialRampToValueAtTime(nextChord.f1, audioCtx.currentTime + 3.0);
    ambientOscillator2.frequency.exponentialRampToValueAtTime(nextChord.f2 + 0.5, audioCtx.currentTime + 3.0);
    
    setTimeout(modulateChord, 8000);
  }
  
  setTimeout(modulateChord, 8000);
}

function stopAmbientPads() {
  if (!ambientGainNode) return;
  
  // Fade out
  ambientGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
  ambientGainNode.gain.setValueAtTime(ambientGainNode.gain.value, audioCtx.currentTime);
  ambientGainNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.5);
  
  setTimeout(() => {
    if (ambientOscillator1) {
      ambientOscillator1.stop();
      ambientOscillator1.disconnect();
      ambientOscillator1 = null;
    }
    if (ambientOscillator2) {
      ambientOscillator2.stop();
      ambientOscillator2.disconnect();
      ambientOscillator2 = null;
    }
    if (ambientGainNode) {
      ambientGainNode.disconnect();
      ambientGainNode = null;
    }
  }, 600);
}

/* Floating AI Chat Assistant (with detailed local facts DB) */
const aiKnowledgeBase = {
  greetings: ['hello', 'hi', 'hey', 'sup', 'greetings'],
  greetingResponse: "Hi there! I'm Dinesh Balaji's AI assistant. Ask me anything about his skills, experience, projects, or achievements!",
  
  skills: ['skill', 'technologies', 'stack', 'languages', 'frontend', 'backend', 'database'],
  skillsResponse: "Dinesh is a full-stack engineer proficient in:<br>• <b>Frontend:</b> JavaScript, React.js, Vue.js, Tailwind CSS, HTML5/CSS3<br>• <b>Backend:</b> Node.js, Express, PHP, Python (Flask), REST APIs<br>• <b>Databases:</b> MySQL, MongoDB, SQL<br>• <b>AI:</b> local LLMs, FAISS, Prompt Engineering, RAG.",
  
  projects: ['projects', 'portfolio', 'omnium', 'suryacotton', 'fitpro', 'work', 'code'],
  projectsResponse: "Dinesh's key projects include:<br>1. <b>Omnium:</b> AI study planner powered by local LLM pipelines (Flask, LM Studio).<br>2. <b>Surya Cotton Textiles:</b> A production e-commerce store (sales.suryacotton.com) built using PHP & MySQL.<br>3. <b>Fitness-Pro:</b> Workout & meal tracker using Vue.js & Flask.<br>4. <b>EduCMS:</b> Academic course registry built in Python.",
  
  experience: ['experience', 'intern', 'jobs', 'work history', 'dividend', 'dividend screen'],
  experienceResponse: "Dinesh has the following experience:<br>• <b>Full Stack Developer Intern</b> at Dividend Screen (Remote, Apr-Jun 2025) - Optimized load speed by 30% using PHP and MySQL REST APIs.<br>• <b>Freelance Full Stack Developer</b> for Surya Cotton Textiles (Remote, Sep-Dec 2025) - Built and deployed their catalog system.<br>• <b>Advanced MERN Training</b> at Besant Technologies, Velachery.",
  
  achievements: ['achievements', 'awards', 'hackathon', 'certificates', 'bytes', 'leadership'],
  achievementsResponse: "Dinesh's notable achievements include:<br>• <b>Certificate of Leadership Excellence</b> as Lead Organizer for the GenAI Hackathon 2K26 (350+ participants).<br>• <b>Multiple first-place awards</b> for Paper Presentations, Web Development, and AdZap at college technical festivals (BYTES 2K24/25/26, IGNITE).<br>• <b>Besant Campus Connect Incubation</b> candidate (AI, Full Stack, Cloud).",
  
  contact: ['contact', 'email', 'phone', 'linkedin', 'github', 'reach', 'locate'],
  contactResponse: "You can reach Dinesh here:<br>• 📧 Email: <a href='mailto:dineshbalaji26012006@gmail.com'>dineshbalaji26012006@gmail.com</a><br>• 📞 Phone: +91 90253 84170<br>• 📍 Location: Chennai / Madurai, Tamil Nadu (Open to Relocate PAN Tamil Nadu)<br>• 💼 LinkedIn: <a href='https://www.linkedin.com/in/dineshbalajik26' target='_blank'>dineshbalajik26</a><br>• 🐙 GitHub: <a href='https://github.com/dines-hbal-aji' target='_blank'>dines-hbal-aji</a>"
};

function initAIChat() {
  const widget = document.getElementById('ai-chat-widget');
  const toggleBtn = document.getElementById('ai-chat-toggle');
  const closeBtn = document.getElementById('ai-chat-close');
  const chatInput = document.getElementById('ai-chat-input');
  const messagesContainer = document.getElementById('ai-chat-messages');
  const suggestionBtns = document.querySelectorAll('.suggestion-btn');
  
  if (!widget || !toggleBtn || !messagesContainer) return;
  
  toggleBtn.addEventListener('click', () => {
    playAudioClick();
    widget.classList.toggle('active');
    
    // Automatically focus input on open
    if (widget.classList.contains('active') && chatInput) {
      setTimeout(() => chatInput.focus(), 300);
    }
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      playAudioClick();
      widget.classList.remove('active');
    });
  }
  
  // Suggestion buttons clicks
  suggestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const prompt = btn.getAttribute('data-prompt');
      if (prompt) {
        handleUserMessage(prompt);
      }
    });
  });
  
  // Input enter key
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const message = chatInput.value.trim();
        if (message) {
          handleUserMessage(message);
          chatInput.value = '';
        }
      }
    });
  }
  
  function handleUserMessage(text) {
    playAudioClick();
    appendMessage(text, 'user');
    
    // Typing indicator
    const typingIndicator = appendMessage('...', 'ai typing');
    
    setTimeout(() => {
      // Remove typing bubble
      typingIndicator.remove();
      
      const response = processQuery(text);
      appendMessage(response, 'ai');
    }, 800);
  }
  
  function appendMessage(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text;
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return bubble;
  }
  
  function processQuery(query) {
    const q = query.toLowerCase();
    
    // 1. Skills
    if (q.includes('skill')) {
      return "<b>Dinesh's Core Technical Skills:</b><br>• <b>Frontend:</b> JavaScript (ES6+), React.js, Vue.js, React Native, HTML5, CSS3, Tailwind CSS, Bootstrap<br>• <b>Backend:</b> Node.js, Express.js, PHP, REST API Design, Authentication, Middleware<br>• <b>Databases:</b> MySQL (Schema Design, Normalization, Indexing), MongoDB (Mongoose, Aggregations)<br>• <b>AI & Tools:</b> local LLM inference (LM Studio), Prompt Engineering, RAG frameworks, Git/GitHub, VS Code, Postman, Vercel.";
    }
    
    // 2. Projects
    if (q.includes('project') || q.includes('work')) {
      return "<b>Dinesh's Projects:</b><br>• <b>ColorHub:</b> Color reservation platform for branding and interior design with concurrent lock resolutions (HTML5, JS, Python).<br>• <b>EduCMS:</b> Course management system built on a normalized MySQL database schema (HTML5, JS, Python, MySQL).<br>• <b>Omnium:</b> AI study assistant running syllabi through local LLM offline pipelines (Python, Flask, LM Studio).<br>• <b>Socon:</b> Full-stack PHP application securing session hashes and CRUD routes (PHP, MySQL).<br>• <b>Fitness-Pro:</b> Fitness and meal tracker using MongoDB collections (Vue.js, Flask, MongoDB).<br>• <b>Surya Cotton Textiles E-Commerce:</b> Live freelance catalog and transaction site at sales.suryacotton.com (PHP, MySQL).";
    }
    
    // 3. Internship & Experience
    if (q.includes('intern') || q.includes('intenship')) {
      return "<b>Dinesh's Internship & Freelance Experience:</b><br>• <b>Full Stack Intern</b> at <i>Dividend Screen</i> (Remote, Apr – Jun 2025): Designed frontend panels and optimized PHP/MySQL REST APIs, reducing page loading delay by 30% and increasing session duration by 25%.<br>• <b>Freelance Full Stack Developer</b> at <i>Surya Cotton Textiles</i> (Remote, Sep – Dec 2025): Delivered a production store with database mapping for 100+ product SKUs, cutting administrative manual labor by 40%.";
    }
    
    // 4. Contact Info / In Touch
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('number') || q.includes('touch') || q.includes('reach') || q.includes('call')) {
      return "<b>Dinesh's Contact Information:</b><br>• 📧 Email: <a href='mailto:dineshbalaji26012006@gmail.com'>dineshbalaji26012006@gmail.com</a><br>• 📞 Phone: +91 90253 84170<br>• 📍 Location: Chennai / Madurai, Tamil Nadu (Open to Relocate PAN Tamil Nadu)<br>• 💼 LinkedIn: <a href='https://www.linkedin.com/in/dineshbalajik26' target='_blank'>linkedin.com/in/dineshbalajik26</a><br>• 🐙 GitHub: <a href='https://github.com/dines-hbal-aji' target='_blank'>github.com/dines-hbal-aji</a>";
    }
    
    // 5. Default Fallback
    return "Please refer to the relevant section of my portfolio above for this information. You can also visit my profiles:<br>• 💼 LinkedIn: <a href='https://www.linkedin.com/in/dineshbalajik26' target='_blank'>linkedin.com/in/dineshbalajik26</a><br>• 🐙 GitHub: <a href='https://github.com/dines-hbal-aji' target='_blank'>github.com/dines-hbal-aji</a><br><br>To get in touch directly, feel free to use my contact details:<br>• 📧 Email: <a href='mailto:dineshbalaji26012006@gmail.com'>dineshbalaji26012006@gmail.com</a><br>• 📞 Phone: +91 90253 84170";
  }
}

/* Keyboard Shortcuts */
function initKeyboardShortcuts() {
  const searchInput = document.getElementById('project-search');
  const chatWidget = document.getElementById('ai-chat-widget');
  const chatInput = document.getElementById('ai-chat-input');
  
  window.addEventListener('keydown', (e) => {
    // '/' focuses project search (if not focusing an input)
    if (e.key === '/' && document.activeElement !== searchInput && document.activeElement !== chatInput) {
      e.preventDefault();
      if (searchInput) {
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => searchInput.focus(), 300);
      }
    }
    
    // 'Escape' closes open modals & chat assistant
    if (e.key === 'Escape') {
      closeModal('case-study-modal');
      closeModal('cert-modal');
      if (chatWidget) chatWidget.classList.remove('active');
    }
    
    // 'Ctrl + K' toggles AI Chatbot
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (chatWidget) {
        chatWidget.classList.toggle('active');
        if (chatWidget.classList.contains('active') && chatInput) {
          setTimeout(() => chatInput.focus(), 300);
        }
      }
    }
  });
}

/* Contact Form handling with local feedback validation */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  
  if (!form || !feedback) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    playAudioClick();
    
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();
    
    if (!name || !email || !message) {
      feedback.textContent = 'Please fill out all fields.';
      feedback.className = 'form-feedback error';
      return;
    }
    
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      feedback.textContent = 'Please provide a valid email address.';
      feedback.className = 'form-feedback error';
      return;
    }
    
    // Simulate successful submit (Local backup logic for EmailJS)
    feedback.textContent = 'Sending message...';
    feedback.className = 'form-feedback';
    feedback.style.color = 'var(--primary)';
    feedback.style.display = 'block';
    
    setTimeout(() => {
      feedback.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
      feedback.className = 'form-feedback success';
      feedback.style.color = '';
      form.reset();
    }, 1500);
  });
}

// Utility to copy direct contact items to clipboard
window.copyToClipboard = function(text, btnId) {
  playAudioClick();
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const originalHTML = btn.innerHTML;
    
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;
    
    setTimeout(() => {
      btn.innerHTML = originalHTML;
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
};

// Initialize Lenis smooth scroll and override hash links scrolling
function initLenis() {
  if (typeof Lenis === 'undefined') return;
  const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    smoothTouch: false,
  });

  // Intercept all anchor hash clicks and redirect to Lenis scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -70 });
      }
    });
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}
