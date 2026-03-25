import { useLanguage } from '../context/LanguageContext';
import useSound from '../hooks/useSound';
import useTilt from '../hooks/useTilt';

const gradients = ['g1', 'g2', 'g3'];

function Card({ project, idx, t }) {
  const { hoverSound, clickSound } = useSound();
  const tilt = useTilt();
  return (
    <div className={`project fade-in d${idx + 1}`} ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} onMouseEnter={hoverSound}>
      <div className="project-cover">
        <div className={`project-gradient ${gradients[idx]}`}>
          <span className="project-number">0{idx + 1}</span>
        </div>
      </div>
      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-stack">
          {project.tech.map(t => <span key={t}>{t}</span>)}
        </div>
        <div className="project-actions">
          <a href="#" className="project-btn" onClick={clickSound} onMouseEnter={hoverSound}>{t.projects.viewProject}</a>
          <a href="#" className="project-btn" onClick={clickSound} onMouseEnter={hoverSound}>{t.projects.viewCode}</a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="fade-in">
          <p className="sec-overline">// portfolio</p>
          <h2 className="sec-heading">{t.projects.title}</h2>
          <p className="sec-sub">{t.projects.subtitle}</p>
        </div>
        <div className="projects-grid">
          {t.projects.items.map((p, i) => <Card key={i} project={p} idx={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}
