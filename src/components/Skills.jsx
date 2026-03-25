import { useLanguage } from '../context/LanguageContext';
import useSound from '../hooks/useSound';
import useTilt from '../hooks/useTilt';

const skillsData = {
  frontend: { abbr: 'FE', skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design', 'SASS', 'Bootstrap', 'Tailwind'] },
  backend: { abbr: 'BE', skills: ['Node.js', 'Python', 'Java', 'Express.js', 'REST APIs', 'Django', 'Spring Boot'] },
  database: { abbr: 'DB', skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase', 'SQL Server'] },
  tools: { abbr: 'DX', skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Docker', 'Postman', 'npm', 'Linux'] }
};

function Card({ keyName, data, idx, t }) {
  const { hoverSound } = useSound();
  const tilt = useTilt();
  return (
    <div className={`skill-card fade-in d${idx + 1}`} ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} onMouseEnter={hoverSound}>
      <div className="skill-icon">{data.abbr}</div>
      <h3 className="skill-name">{t.skills.categories[keyName]}</h3>
      <div className="skill-chips">
        {data.skills.map(s => <span key={s} className="chip" onMouseEnter={hoverSound}>{s}</span>)}
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="fade-in">
          <p className="sec-overline">// skills</p>
          <h2 className="sec-heading">{t.skills.title}</h2>
          <p className="sec-sub">{t.skills.subtitle}</p>
        </div>
        <div className="skills-grid">
          {Object.entries(skillsData).map(([key, data], i) => (
            <Card key={key} keyName={key} data={data} idx={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
