import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import useSound from '../hooks/useSound';

export default function Navbar() {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { hoverSound, clickSound } = useSound();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const themes = [
    { id: 'cyberpunk', label: 'I' },
    { id: 'matrix', label: 'II' },
    { id: 'blood', label: 'III' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a href="#hero" className="nav-logo" onMouseEnter={hoverSound}>
          luis<span className="accent">.</span>dev
        </a>

        <div className="nav-links">
          <a href="#about" onMouseEnter={hoverSound}>{t.nav.about}</a>
          <a href="#skills" onMouseEnter={hoverSound}>{t.nav.skills}</a>
          <a href="#projects" onMouseEnter={hoverSound}>{t.nav.projects}</a>
          <a href="#contact" onMouseEnter={hoverSound}>{t.nav.contact}</a>
        </div>

        <div className="nav-controls">
          <div className="theme-selector">
            {themes.map(th => (
              <button key={th.id} className={`theme-btn ${theme === th.id ? 'active' : ''}`}
                onClick={() => { clickSound(); toggleTheme(th.id); }} onMouseEnter={hoverSound}>
                {th.label}
              </button>
            ))}
          </div>

          <button className="lang-toggle" onClick={() => { clickSound(); toggleLanguage(); }} onMouseEnter={hoverSound}>
            <span className={language === 'es' ? 'active' : ''}>ES</span>
            <span> / </span>
            <span className={language === 'en' ? 'active' : ''}>EN</span>
          </button>
        </div>

        <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
