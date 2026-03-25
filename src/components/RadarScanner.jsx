import { useEffect } from 'react';

export default function RadarScanner() {
  return (
    <div className="radar-wrapper">
      <div className="radar">
        <div className="radar-sweep"></div>
        <div className="radar-grid"></div>
        
        {/* Radar Blips (Threats / Skills) */}
        <div className="blip b1"></div>
        <div className="blip b2"></div>
        <div className="blip b3"></div>
      </div>
      <div className="radar-text">SCANNING LOCAL NETWORK...</div>
    </div>
  );
}
