import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import useSound from '../hooks/useSound';

export default function Hero() {
  const { t } = useLanguage();
  const { hoverSound, clickSound } = useSound();
  const [typed, setTyped] = useState('');
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);

  const tick = useCallback(() => {
    const role = t.hero.roles[idx];
    if (!role) return;
    if (!del) {
      setTyped(role.substring(0, typed.length + 1));
      if (typed === role) { setTimeout(() => setDel(true), 2500); return; }
    } else {
      setTyped(role.substring(0, typed.length - 1));
      if (typed === '') { setDel(false); setIdx(p => (p + 1) % t.hero.roles.length); return; }
    }
  }, [typed, del, idx, t.hero.roles]);

  useEffect(() => {
    const timer = setTimeout(tick, del ? 35 : 70);
    return () => clearTimeout(timer);
  }, [tick, del]);

  const statusText = t.hero.greeting === 'Hola, soy' ? 'Disponible para proyectos' : 'Available for projects';

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-status fade-in">
          <span className="pulse" />
          {statusText}
        </div>

        <h1 className="hero-headline fade-in d1">
          {t.hero.name}<br />
          <span className="thin">{t.hero.lastname}</span>
        </h1>

        <div className="hero-typed-wrap fade-in d2">
          {typed}<span className="caret" />
        </div>

        <div className="hero-actions fade-in d3">
          <a href="#projects" className="btn-fill" onMouseEnter={hoverSound} onClick={clickSound}>
            {t.hero.cta}
          </a>
          <a href="#contact" className="btn-outline" onMouseEnter={hoverSound} onClick={clickSound}>
            {t.hero.contact}
          </a>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-line" />
      </div>
    </section>
  );
}
