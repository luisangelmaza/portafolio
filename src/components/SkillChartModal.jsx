import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import useSound from '../hooks/useSound';

export default function SkillChartModal({ skill, onClose }) {
  const { clickSound } = useSound();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!skill) return;

    // Simulate different profiles based on skill name length/hash to look dynamic
    const baseVal = (skill.length * 10) % 40 + 50; 
    
    setData([
      { subject: 'Syntax', A: baseVal + Math.random() * 20, fullMark: 100 },
      { subject: 'Architecture', A: baseVal - 10 + Math.random() * 30, fullMark: 100 },
      { subject: 'Debugging', A: baseVal + 5 + Math.random() * 15, fullMark: 100 },
      { subject: 'Performance', A: baseVal - 15 + Math.random() * 40, fullMark: 100 },
      { subject: 'Security', A: baseVal + Math.random() * 25, fullMark: 100 },
      { subject: 'Ecosystem', A: baseVal + 10 + Math.random() * 10, fullMark: 100 },
    ]);
  }, [skill]);

  if (!skill) return null;

  return (
    <div className="chart-overlay" onClick={onClose}>
      <div className="chart-window" onClick={e => e.stopPropagation()}>
        <div className="chart-header">
          <span style={{ color: 'var(--green)' }}>$ analyze_skill --target="{skill}"</span>
          <button className="chart-close" onClick={() => { clickSound(); onClose(); }}>[X]</button>
        </div>
        
        <div className="chart-body">
          <div className="chart-title">
            ASSIMILATION_PROFILE: <span style={{ color: '#fff' }}>{skill}</span>
          </div>
          
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                <PolarGrid stroke="rgba(0,255,65,0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--cyan)', fontSize: 10, fontFamily: 'monospace' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name={skill} dataKey="A" stroke="var(--green)" fill="var(--green-glow-strong)" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chart-footer">
            {'// STATUS: '} <span style={{ color: 'var(--yellow)' }}>OPTIMAL</span>
            <br />
            {'// LAST_UPDATE: '} {new Date().toISOString().split('T')[0]}
          </div>
        </div>
      </div>
    </div>
  );
}
