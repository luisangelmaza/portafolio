import { useLanguage } from '../context/LanguageContext';
import useSound from '../hooks/useSound';

export default function Contact() {
  const { t } = useLanguage();
  const { hoverSound } = useSound();

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="fade-in">
          <p className="sec-overline">// contact</p>
          <h2 className="sec-heading">{t.contact.title}</h2>
        </div>

        <div className="contact-layout fade-in d1">
          <p className="contact-msg">{t.contact.cta}</p>

          <div className="contact-grid">
            <a href="mailto:luisangelmaza32@gmail.com" className="contact-item" onMouseEnter={hoverSound}>
              <div className="contact-label">{t.contact.email}</div>
              <div className="contact-value">luisangelmaza32@gmail.com</div>
            </a>

            <a href="https://wa.me/573011355799" target="_blank" rel="noreferrer" className="contact-item" onMouseEnter={hoverSound}>
              <div className="contact-label">{t.contact.whatsapp}</div>
              <div className="contact-value">+57 301 135 5799</div>
            </a>

            <a href="https://github.com/luisangelmaza" target="_blank" rel="noreferrer" className="contact-item" onMouseEnter={hoverSound}>
              <div className="contact-label">{t.contact.github}</div>
              <div className="contact-value">github.com/luisangelmaza</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
