import React, { useRef, useState } from 'react';
import useSound from '../hooks/useSound';

export default function HoloProfile() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { hoverSound } = useSound();
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const multiplier = 20;
    const xCalc = ((x / rect.width) - 0.5) * multiplier;
    const yCalc = ((y / rect.height) - 0.5) * -multiplier;
    
    setTilt({ x: xCalc, y: yCalc });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={ref}
      className="holo-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={hoverSound}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.05, 1.05, 1.05)`,
        transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease-out' : 'transform 0.1s linear'
      }}
    >
      <div className="holo-content">
        <div className="holo-scanline"></div>
        <div className="holo-ascii">
{`    _,.---._    
  ,-'   _   \`-. 
 /        _    \\
|    .     .    |
|   / \\   / \\   |
\\  |   | |   |  /
 '. \\_/   \\_/ .'
   \`---___---'`}
        </div>
        <div className="holo-overlay"></div>
      </div>
      <div className="holo-data">
        TARGET: L.A. MAZA<br/>
        STATUS: ONLINE<br/>
        UPLINK: ACTIVE
      </div>
    </div>
  );
}
