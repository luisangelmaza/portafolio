import { useState, useEffect } from 'react';

// Pantalla de carga estilo terminal/boot del sistema
const steps = [
  { prefix: '>', text: ' Initializing system...', delay: 200 },
  { prefix: '>', text: ' Loading modules...', delay: 600 },
  { prefix: '>', text: ' Compiling assets...', delay: 1000 },
  { prefix: '>', text: ' Connecting to server...', delay: 1400 },
  { prefix: '✓', text: ' System ready.', delay: 1800, success: true },
];

export default function Loader({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    steps.forEach((step, index) => {
      setTimeout(() => {
        setVisibleLines(index + 1);
        setProgress(((index + 1) / steps.length) * 100);
      }, step.delay);
    });

    setTimeout(() => setFadeOut(true), 2400);
    setTimeout(() => onComplete(), 3000);
  }, [onComplete]);

  return (
    <div className={`loader-overlay ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loader-terminal">
        {steps.slice(0, visibleLines).map((step, i) => (
          <div key={i} className="loader-line" style={{ animationDelay: `${i * 0.1}s` }}>
            <span className={step.success ? 'success' : 'prefix'}>{step.prefix}</span>
            {step.text}
          </div>
        ))}
        <div className="loader-progress">
          <div className="loader-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
