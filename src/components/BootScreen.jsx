import { useState, useEffect } from 'react';

const BOOT_SEQUENCE = [
  { text: 'BIOS Date 04/15/26 14:32:00 Ver 1.4.2', delay: 200 },
  { text: 'CPU: Quantum Core Processor', delay: 400 },
  { text: 'Memory Testing: 16384K OK', delay: 700 },
  { text: 'Detecting Primary Master... PORTFOLIO_DRIVE', delay: 1000 },
  { text: 'Booting from network server...', delay: 1400 },
  { text: 'Loading kernel assets [.............] OK', delay: 1900 },
  { text: 'Mounting file systems... OK', delay: 2100 },
  { text: 'Decrypting: identity.txt ...', delay: 2600 },
  { text: 'ACCESS GRANTED.', delay: 3200, type: 'success' },
  { text: 'Initializing GUI...', delay: 3500 }
];

export default function BootScreen({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let timeouts = [];

    BOOT_SEQUENCE.forEach((item, index) => {
      const t = setTimeout(() => {
        setLines(prev => [...prev, item]);

        // Finish sequence
        if (index === BOOT_SEQUENCE.length - 1) {
          setTimeout(() => setIsFading(true), 500);
          setTimeout(onComplete, 1200);
        }
      }, item.delay);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className={`boot-screen ${isFading ? 'fade-out' : ''}`}>
      <div className="boot-terminal">
        {lines.map((line, i) => (
          <div key={i} className={`boot-line ${line.type || ''}`}>
            {line.text}
          </div>
        ))}
        {!isFading && <div className="boot-cursor">_</div>}
      </div>
    </div>
  );
}
