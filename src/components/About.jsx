import { useLanguage } from '../context/LanguageContext';
import useSound from '../hooks/useSound';

export default function About() {
  const { t } = useLanguage();
  const { hoverSound } = useSound();

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="fade-in">
          <p className="sec-overline">// about</p>
          <h2 className="sec-heading">{t.about.title}</h2>
        </div>

        <div className="about-layout">
          <div className="about-visual fade-in d1">
            <div className="about-portrait">
              <span className="initials">LM</span>
            </div>
            <div className="about-tag pos-1" onMouseEnter={hoverSound}>React</div>
            <div className="about-tag pos-2" onMouseEnter={hoverSound}>Node.js</div>
            <div className="about-tag pos-3" onMouseEnter={hoverSound}>Full Stack</div>
          </div>

          <div className="fade-in d2">
            <p className="about-bio">{t.about.description}</p>
            <p className="about-bio">{t.about.description2}</p>

            <div className="stats-grid">
              <div className="stat" onMouseEnter={hoverSound}>
                <div className="stat-value">10+</div>
                <div className="stat-name">{t.about.stats.projects}</div>
              </div>
              <div className="stat" onMouseEnter={hoverSound}>
                <div className="stat-value">15+</div>
                <div className="stat-name">{t.about.stats.technologies}</div>
              </div>
              <div className="stat" onMouseEnter={hoverSound}>
                <div className="stat-value">∞</div>
                <div className="stat-name">{t.about.stats.coffee}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
