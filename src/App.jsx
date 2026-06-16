import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from './context/LanguageContext';
import profileImg from './assets/profile.jpg';

// Elegant cascading vertical particle effect (Rain/Hilos de luz)
function CanvasCascades() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate falling droplets
    const dropletCount = Math.floor((width * height) / 16000); // density
    const droplets = [];

    for (let i = 0; i < dropletCount; i++) {
      droplets.push({
        x: Math.random() * width,
        y: Math.random() * -height, // start above screen
        length: 15 + Math.random() * 30, // streak length
        speed: 1.2 + Math.random() * 3.5, // falling speed
        opacity: 0.03 + Math.random() * 0.14, // transparency
        thickness: 0.8 + Math.random() * 1.2, // fine lines
      });
    }

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      droplets.forEach((drop) => {
        ctx.beginPath();
        // Modern crisp white/grey streaks falling vertically
        ctx.strokeStyle = `rgba(255, 255, 255, ${drop.opacity})`;
        ctx.lineWidth = drop.thickness;
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        // Increment vertical movement
        drop.y += drop.speed;

        // Reset if falling off screen
        if (drop.y > height) {
          drop.y = -drop.length - Math.random() * 40;
          drop.x = Math.random() * width;
          drop.speed = 1.2 + Math.random() * 3.5;
          drop.opacity = 0.03 + Math.random() * 0.14;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-container" />;
}

export default function AppContent() {
  const { t, language, toggleLanguage } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Typing animation
  const [typed, setTyped] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const role = t.hero.roles[roleIdx];
    if (!role) return;
    if (!isDeleting) {
      setTyped(role.substring(0, typed.length + 1));
      if (typed === role) { setTimeout(() => setIsDeleting(true), 2200); return; }
    } else {
      setTyped(role.substring(0, typed.length - 1));
      if (typed === '') { setIsDeleting(false); setRoleIdx(p => (p + 1) % t.hero.roles.length); return; }
    }
  }, [typed, isDeleting, roleIdx, t.hero.roles]);

  useEffect(() => {
    const timer = setTimeout(tick, isDeleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  // Scroll logic
  useEffect(() => {
    const onScroll = () => {
      const s = document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((s / h) * 100);
      setScrollOffset(s);
      setNavScrolled(s > 50);

      // Determine active section
      const sections = ['contact', 'skills', 'projects', 'services', 'about'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 250) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection Observer for slide animations on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('show');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    const timer = setTimeout(() => {
      document.querySelectorAll('.scroll-slide').forEach(el => obs.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      obs.disconnect();
    };
  }, []);

  // Interactive 3D tilt effect on hover
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Limits of rotation (max 10 degrees for elegant subtle tilt)
    const angle = 8;
    const rx = ((yc - y) / yc) * angle; 
    const ry = ((x - xc) / xc) * angle; 
    
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.015, 1.015, 1.015)`;

    // Move glare shine
    const glare = card.querySelector('.glare-shine');
    if (glare) {
      glare.style.opacity = '1';
      glare.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0)`;
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    
    const glare = card.querySelector('.glare-shine');
    if (glare) {
      glare.style.opacity = '0';
    }
  };

  // Parse highlight tags in text
  const renderHighlightedText = (text) => {
    const parts = text.split(/<highlight>(.*?)<\/highlight>/g);
    return parts.map((part, i) =>
      i % 2 === 1
        ? <span key={i} className="highlight">{part}</span>
        : <span key={i}>{part}</span>
    );
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'projects', label: t.nav.projects },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <>
      {/* Background effects */}
      <div className="bg-gradient-overlay" />
      <div className="bg-grid" />
      
      {/* Cascading falling hilos effect */}
      <CanvasCascades />

      {/* Parallax scrolling watermarks */}
      <div 
        className="parallax-watermark watermark-1" 
        style={{ transform: `translateX(${scrollOffset * -0.15}px) rotate(-4deg)` }}
      >
        Artificial Intelligence
      </div>
      <div 
        className="parallax-watermark watermark-2" 
        style={{ transform: `translateX(${scrollOffset * 0.12}px) rotate(2deg)` }}
      >
        Workflow Automation
      </div>
      <div 
        className="parallax-watermark watermark-3" 
        style={{ transform: `translateX(${scrollOffset * -0.08}px) rotate(-1deg)` }}
      >
        Full Stack Dev
      </div>

      {/* Scroll progress */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Navbar */}
      <nav className={`navbar ${navScrolled ? 'scrolled' : ''}`} id="nav">
        <a className="nav-logo" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          LM<span style={{ color: 'var(--text-white)' }}>.</span>dev
        </a>

        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button className="nav-lang" onClick={toggleLanguage}>
            {language === 'es' ? '🌐 EN' : '🌐 ES'}
          </button>
        </div>

        <button className="nav-toggle" onClick={() => setMobileMenuOpen(p => !p)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Main content */}
      <div className="main-content">

        {/* ===== HERO ===== */}
        <section className="hero section" id="hero">
          <div className="hero-grid">
            <div className="hero-content scroll-slide scroll-slide-left show">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                {t.hero.badge}
              </div>

              <h1 className="hero-name">
                {t.hero.greeting}{' '}
                <span className="gradient-text">{t.hero.name}</span>
              </h1>

              <p className="hero-role">
                <span className="typed-text">{typed}</span>
                <span className="cursor" />
              </p>

              <p className="hero-description">
                {t.hero.description}
              </p>

              <div className="hero-actions">
                <a href="#projects" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>
                  {t.hero.cta} →
                </a>
                <a href="#contact" className="btn-secondary" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                  {t.hero.contact}
                </a>
              </div>

              <div className="hero-socials">
                <a href="https://github.com/luisangelmaza" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://wa.me/573011355799" target="_blank" rel="noreferrer" className="social-link" aria-label="WhatsApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </a>
                <a href="mailto:luisangelmaza32@gmail.com" className="social-link" aria-label="Email">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
              </div>
            </div>

            <div className="hero-image-wrapper scroll-slide scroll-slide-right show">
              <div 
                className="hero-image-container tilt-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img src={profileImg} alt="Luis Angel Maza Fontalvo" />
                <div className="glare-wrapper">
                  <div className="glare-shine" />
                </div>
              </div>
              {t.hero.floatingCards.map((card, i) => (
                <div key={i} className="hero-floating-card">
                  {card}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <section className="section" id="about">
          <div className="scroll-slide scroll-slide-left">
            <span className="section-label">✦ {t.about.label}</span>
            <h2 className="section-title">{t.about.title}</h2>
          </div>
          <div className="about-grid">
            <div className="about-text scroll-slide scroll-slide-left">
              <p>{renderHighlightedText(t.about.description1)}</p>
              <p>{renderHighlightedText(t.about.description2)}</p>
            </div>
            <div className="about-stats scroll-slide scroll-slide-right">
              <div 
                className="stat-card tilt-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="stat-number">10+</div>
                <div className="stat-label">{t.about.stats.projects}</div>
                <div className="glare-wrapper"><div className="glare-shine" /></div>
              </div>
              <div 
                className="stat-card tilt-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="stat-number">6+</div>
                <div className="stat-label">{t.about.stats.automations}</div>
                <div className="glare-wrapper"><div className="glare-shine" /></div>
              </div>
              <div 
                className="stat-card tilt-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="stat-number">15+</div>
                <div className="stat-label">{t.about.stats.apis}</div>
                <div className="glare-wrapper"><div className="glare-shine" /></div>
              </div>
              <div 
                className="stat-card tilt-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="stat-number">∞</div>
                <div className="stat-label">{t.about.stats.coffee}</div>
                <div className="glare-wrapper"><div className="glare-shine" /></div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section className="section" id="services">
          <div className="scroll-slide scroll-slide-left">
            <span className="section-label">✦ {t.services.label}</span>
            <h2 className="section-title">{t.services.title}</h2>
            <p className="section-subtitle">{t.services.subtitle}</p>
          </div>
          <div className="services-grid">
            {t.services.items.map((service, i) => (
              <div 
                key={i} 
                className={`service-card tilt-card scroll-slide ${i % 2 === 0 ? 'scroll-slide-left' : 'scroll-slide-right'}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="glare-wrapper"><div className="glare-shine" /></div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== PROJECTS ===== */}
        <section className="section" id="projects">
          <div className="scroll-slide scroll-slide-left">
            <span className="section-label">✦ {t.projects.label}</span>
            <h2 className="section-title">{t.projects.title}</h2>
            <p className="section-subtitle">{t.projects.subtitle}</p>
          </div>
          <div className="projects-grid">
            {t.projects.items.map((project, i) => (
              <div 
                key={i} 
                className={`project-card tilt-card scroll-slide ${i % 2 === 0 ? 'scroll-slide-left' : 'scroll-slide-right'}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="project-info">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-name">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <p className="project-process">{project.process}</p>
                  <div className="project-tech">
                    {project.tech.map(techName => <span key={techName} className="tech-badge">{techName}</span>)}
                  </div>
                </div>
                <div className="project-visual">
                  <div className="project-visual-pattern" />
                  <span className="project-visual-icon">{project.icon}</span>
                </div>
                <div className="glare-wrapper"><div className="glare-shine" /></div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SKILLS ===== */}
        <section className="section" id="skills">
          <div className="scroll-slide scroll-slide-left">
            <span className="section-label">✦ {t.skills.label}</span>
            <h2 className="section-title">{t.skills.title}</h2>
            <p className="section-subtitle">{t.skills.subtitle}</p>
          </div>
          <div className="skills-container">
            <div className="skills-categories">
              {Object.entries(t.skills.categories).map(([key, cat], i) => (
                <div 
                  key={key} 
                  className={`skill-category scroll-slide ${i % 2 === 0 ? 'scroll-slide-left' : 'scroll-slide-right'}`}
                >
                  <div className="skill-category-name">{cat.name}</div>
                  <div className="skill-tags">
                    {cat.items.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section className="section" id="contact">
          <div className="scroll-slide scroll-slide-left">
            <span className="section-label">✦ {t.contact.label}</span>
            <h2 className="section-title">{t.contact.title}</h2>
            <p className="section-subtitle">{t.contact.subtitle}</p>
          </div>
          <div className="contact-wrapper">
            <div className="contact-info scroll-slide scroll-slide-left">
              <div className="contact-links">
                <a href="mailto:luisangelmaza32@gmail.com" className="contact-link">
                  <div className="contact-link-icon">📧</div>
                  <div className="contact-link-info">
                    <span className="contact-link-label">{t.contact.links.email.label}</span>
                    <span className="contact-link-value">{t.contact.links.email.value}</span>
                  </div>
                </a>
                <a href="https://wa.me/573011355799" target="_blank" rel="noreferrer" className="contact-link">
                  <div className="contact-link-icon">💬</div>
                  <div className="contact-link-info">
                    <span className="contact-link-label">{t.contact.links.whatsapp.label}</span>
                    <span className="contact-link-value">{t.contact.links.whatsapp.value}</span>
                  </div>
                </a>
                <a href="https://github.com/luisangelmaza" target="_blank" rel="noreferrer" className="contact-link">
                  <div className="contact-link-icon">🐙</div>
                  <div className="contact-link-info">
                    <span className="contact-link-label">{t.contact.links.github.label}</span>
                    <span className="contact-link-value">{t.contact.links.github.value}</span>
                  </div>
                </a>
              </div>
            </div>
            <div 
              className="contact-cta-card tilt-card scroll-slide scroll-slide-right"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <h3>{t.contact.ctaTitle}</h3>
              <p>{t.contact.ctaText}</p>
              <a href="mailto:luisangelmaza32@gmail.com" className="btn-primary">
                {t.contact.ctaButton} →
              </a>
              <div className="glare-wrapper"><div className="glare-shine" /></div>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="footer">
        <p>
          {t.footer.designed} <a href="#">Luis Angel Maza</a>. {t.footer.rights}
        </p>
      </footer>
    </>
  );
}
