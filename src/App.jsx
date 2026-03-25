import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from './context/LanguageContext';
import { useTheme } from './context/ThemeContext';
import useSound from './hooks/useSound';
import useGlitchText from './hooks/useGlitchText';

import BootScreen from './components/BootScreen';
import CustomCursor from './components/CustomCursor';
import ParticleCanvas from './components/ParticleCanvas';
import Terminal from './components/Terminal';
import RadarScanner from './components/RadarScanner';
import SkillChartModal from './components/SkillChartModal';
import ContactTerminal from './components/ContactTerminal';
import HoloProfile from './components/HoloProfile';

const ASCII_NAME = `
██╗     ██╗   ██╗██╗███████╗     █████╗ ███╗   ██╗ ██████╗ ███████╗██╗
██║     ██║   ██║██║██╔════╝    ██╔══██╗████╗  ██║██╔════╝ ██╔════╝██║
██║     ██║   ██║██║███████╗    ███████║██╔██╗ ██║██║  ███╗█████╗  ██║
██║     ██║   ██║██║╚════██║    ██╔══██║██║╚██╗██║██║   ██║██╔══╝  ██║
███████╗╚██████╔╝██║███████║    ██║  ██║██║ ╚████║╚██████╔╝███████╗███████╗
╚══════╝ ╚═════╝ ╚═╝╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝`;

const skillsData = {
  'FRONT-END': ['HTML5', 'CSS3', 'JavaScript', 'React', 'SASS', 'Bootstrap', 'Tailwind'],
  'BACK-END': ['Node.js', 'Python', 'Java', 'Express', 'Django', 'Spring Boot', 'REST APIs'],
  'DATABASE': ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase', 'SQL Server'],
  'DEV-TOOLS': ['Git', 'GitHub', 'Docker', 'Figma', 'VS Code', 'Postman', 'Linux', 'npm']
};

export default function AppContent() {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { hoverSound, clickSound } = useSound();
  const [booting, setBooting] = useState(true);
  const [scrollWidth, setScrollWidth] = useState('0%');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [githubProjects, setGithubProjects] = useState([]);

  // Typing
  const [typed, setTyped] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [del, setDel] = useState(false);

  // Fetch GitHub Projects
  useEffect(() => {
    fetch('https://api.github.com/users/luisangelmaza/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const formatted = data.map(repo => ({
            title: repo.name,
            description: repo.description || 'No description provided.',
            tech: repo.language ? [repo.language] : ['Unknown'],
            url: repo.html_url
          }));
          setGithubProjects(formatted);
        }
      })
      .catch(err => console.error("Error fetching GitHub repos", err));
  }, []);

  const tick = useCallback(() => {
    const role = t.hero.roles[roleIdx];
    if (!role) return;
    if (!del) {
      setTyped(role.substring(0, typed.length + 1));
      if (typed === role) { setTimeout(() => setDel(true), 2000); return; }
    } else {
      setTyped(role.substring(0, typed.length - 1));
      if (typed === '') { setDel(false); setRoleIdx(p => (p + 1) % t.hero.roles.length); return; }
    }
  }, [typed, del, roleIdx, t.hero.roles]);

  useEffect(() => {
    if (booting) return;
    const timer = setTimeout(tick, del ? 30 : 60);
    return () => clearTimeout(timer);
  }, [tick, del, booting]);

  // Scroll Progress
  useEffect(() => {
    const onScroll = () => {
      const s = document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollWidth(`${(s / h) * 100}%`);
    };
    const onKey = (e) => {
      if (e.ctrlKey && e.key === 'k') { e.preventDefault(); clickSound(); setTerminalOpen(p => !p); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); };
  }, [clickSound]);

  // Intersection Observer for Fade In
  useEffect(() => {
    if (booting) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
    }, { threshold: 0.05 });
    setTimeout(() => document.querySelectorAll('.fade-in').forEach(el => obs.observe(el)), 100);
    return () => obs.disconnect();
  }, [booting]);

  // Glitch Text Hooks
  const nameGlitch = useGlitchText("Luis Angel Maza Fontalvo", 30);
  const emailGlitch = useGlitchText("luisangelmaza32@gmail.com", 25);
  const phoneGlitch = useGlitchText("+57 301 135 5799", 25);

  if (booting) return <BootScreen onComplete={() => setBooting(false)} />;

  const themes = [
    { id: 'cyberpunk', label: 'CYBER' },
    { id: 'matrix', label: 'MTRX' },
    { id: 'blood', label: 'BLOOD' },
  ];

  return (
    <>
      <div className="scanlines" />
      <div className="vignette" />
      <CustomCursor />
      <div className="scroll-bar" style={{ width: scrollWidth }} />
      <ParticleCanvas />

      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-left">
          <span className="topbar-path"><span>root</span>@portfolio:~$</span>
        </div>
        <div className="topbar-right">
          <div className="theme-pills">
            {themes.map(th => (
              <button key={th.id} className={`t-pill ${theme === th.id ? 'active' : ''}`}
                onClick={() => { clickSound(); toggleTheme(th.id); }} onMouseEnter={hoverSound}>
                {th.label}
              </button>
            ))}
          </div>
          <button className="topbar-btn" onClick={() => { clickSound(); toggleLanguage(); }} onMouseEnter={hoverSound}>
            <span className={language === 'es' ? 'active' : ''}>ES</span> / <span className={language === 'en' ? 'active' : ''}>EN</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main">

        {/* ===== HERO ===== */}
        <div className="block fade-in">
          <div className="block-header">
            <span className="prompt">$</span>
            <span className="cmd">cat</span>
            <span className="flag">identity.txt</span>
          </div>
          <pre className="hero-ascii">{ASCII_NAME}</pre>
          <div className="hero-info">
            <div className="hero-name" onMouseEnter={() => { hoverSound(); nameGlitch.trigger(); }}>
              {nameGlitch.text}
            </div>
            <div className="hero-sub">// Full Stack Developer & Software Engineer</div>
            <div className="hero-typed">
              {'> '}{typed}<span className="caret" />
            </div>
          </div>
          <div className="hero-links">
            <a href="#projects" className="hero-link" onMouseEnter={hoverSound} onClick={clickSound}>[{t.hero.cta}]</a>
            <a href="#contact" className="hero-link" onMouseEnter={hoverSound} onClick={clickSound}>[{t.hero.contact}]</a>
            <button className="hero-link" onClick={() => { clickSound(); setTerminalOpen(true); }} onMouseEnter={hoverSound}>[OPEN_TERMINAL]</button>
          </div>
        </div>

        {/* ===== ABOUT ===== */}
        <div className="block fade-in" id="about">
          <div className="block-header">
            <span className="prompt">$</span>
            <span className="cmd">cat</span>
            <span className="flag">about.md</span>
            <span className="comment"># {t.about.tag}</span>
          </div>
          
          <HoloProfile />

          <p className="bio-text">{t.about.description}</p>
          <p className="bio-text">{t.about.description2}</p>
          <div className="stats-row">
            <div className="stat-item" onMouseEnter={hoverSound}>
              <span className="stat-val">10+</span>
              <span className="stat-key">{t.about.stats.projects}</span>
            </div>
            <div className="stat-item" onMouseEnter={hoverSound}>
              <span className="stat-val">15+</span>
              <span className="stat-key">{t.about.stats.technologies}</span>
            </div>
            <div className="stat-item" onMouseEnter={hoverSound}>
              <span className="stat-val">∞</span>
              <span className="stat-key">{t.about.stats.coffee}</span>
            </div>
          </div>
        </div>

        {/* ===== SKILLS & RADAR ===== */}
        <div className="block fade-in" id="skills">
          <div className="block-header">
            <span className="prompt">$</span>
            <span className="cmd">run</span>
            <span className="flag">scanner.exe</span>
          </div>
          
          <RadarScanner />

          <div className="skills-grid">
            {Object.entries(skillsData).map(([cat, items]) => (
              <div key={cat} className="skill-group" onMouseEnter={hoverSound}>
                <div className="skill-group-name">{cat}</div>
                <div className="skill-list">
                  {items.map(s => (
                    <button 
                      key={s} 
                      className="skill-item" 
                      onMouseEnter={hoverSound} 
                      onClick={() => { clickSound(); setActiveSkill(s); }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== PROJECTS ===== */}
        <div className="block fade-in" id="projects">
          <div className="block-header">
            <span className="prompt">$</span>
            <span className="cmd">curl</span>
            <span className="flag">https://api.github.com/users/luisangelmaza/repos</span>
          </div>
          <div className="projects-list">
            {githubProjects.length > 0 ? githubProjects.map((p, i) => (
              <div key={i} className="proj-item" onMouseEnter={hoverSound}>
                <div className="proj-head">
                  <span className="proj-idx">[{String(i).padStart(2, '0')}]</span>
                  <span className="proj-name">{p.title}</span>
                </div>
                <p className="proj-desc">{p.description}</p>
                <div className="proj-tech">
                  {p.tech.map(t => <span key={t}>{t}</span>)}
                </div>
                <div className="proj-btns">
                  <a href={p.url} target="_blank" rel="noreferrer" className="proj-btn" onMouseEnter={hoverSound} onClick={clickSound}>[FETCH_CODE]</a>
                </div>
              </div>
            )) : <div style={{color:'var(--dim)'}}>Fetching payload from GitHub servers...</div>}
          </div>
        </div>

        {/* ===== CONTACT ===== */}
        <div className="block fade-in" id="contact">
          <div className="block-header">
            <span className="prompt">$</span>
            <span className="cmd">telnet</span>
            <span className="flag">mail.luisangel.dev 25</span>
          </div>
          
          {/* Functional Email Terminal */}
          <ContactTerminal />
          
          <div className="contact-list" style={{ marginTop: '20px' }}>
            <a href="https://wa.me/573011355799" target="_blank" rel="noreferrer" className="contact-row" onMouseEnter={() => { hoverSound(); phoneGlitch.trigger(); }}>
              <span className="contact-key">"whatsapp":</span>
              <span className="contact-val">"{phoneGlitch.text}"</span>
            </a>
            <a href="https://github.com/luisangelmaza" target="_blank" rel="noreferrer" className="contact-row" onMouseEnter={hoverSound}>
              <span className="contact-key">"github":</span>
              <span className="contact-val">"github.com/luisangelmaza"</span>
            </a>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="block fade-in" style={{ textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '30px', margin: '60px 0 40px' }}>
          <p style={{ color: 'var(--dim)', fontSize: '0.78rem' }}>
            {t.footer.designed} <a href="#hero">Luis Angel Maza</a>. {t.footer.rights}
          </p>
          <button style={{ color: 'var(--dim)', fontSize: '0.7rem', marginTop: '12px' }}
            onClick={() => { clickSound(); setTerminalOpen(true); }} onMouseEnter={hoverSound}>
            {'>'} system_terminal (Ctrl+K)
          </button>
        </div>

      </div>

      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <SkillChartModal skill={activeSkill} onClose={() => setActiveSkill(null)} />
    </>
  );
}
