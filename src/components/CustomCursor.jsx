import { useEffect, useRef } from 'react';

// Cursor personalizado con efecto magnético y neon
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let isMagnetic = false;
    let magneticTarget = null;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!isMagnetic) {
        dot.style.transform = `translate(-50%, -50%) translate(${mouseX}px, ${mouseY}px)`;
      } else if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // El punto se pega al centro pero se mueve un poco con el mouse (limitado)
        const pullX = (mouseX - centerX) * 0.15;
        const pullY = (mouseY - centerY) * 0.15;
        
        dot.style.transform = `translate(-50%, -50%) translate(${centerX + pullX}px, ${centerY + pullY}px) scale(1.5)`;
        
        // Aplicar fuerza magnetica al elemento real tambien
        magneticTarget.style.transform = `translate(${pullX}px, ${pullY}px)`;
      }
    };

    const animateRing = () => {
      const lerp = 0.15;
      ringX += (mouseX - ringX) * lerp;
      ringY += (mouseY - ringY) * lerp;
      ring.style.transform = `translate(-50%, -50%) translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    };

    const handleOver = (e) => {
      const target = e.target.closest('a, button, .project-card, .skill-tag, .contact-card, .stat-card, .theme-btn');
      if (target) {
        dot.classList.add('hovering');
        ring.classList.add('hovering');
        
        // Activar magnetismo en elementos pequeños y circulares para mejor feeling
        if (target.classList.contains('theme-btn') || target.classList.contains('lang-toggle') || target.tagName === 'A') {
          isMagnetic = true;
          magneticTarget = target;
          target.style.transition = 'transform 0.1s ease-out';
        }
      }
    };

    const handleOut = (e) => {
      const target = e.target.closest('a, button, .project-card, .skill-tag, .contact-card, .stat-card, .theme-btn');
      if (target) {
        dot.classList.remove('hovering');
        ring.classList.remove('hovering');
        
        if (isMagnetic && magneticTarget === target) {
          isMagnetic = false;
          magneticTarget.style.transform = '';
          magneticTarget = null;
        }
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    const animId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ position: 'fixed', top: 0, left: 0, zIndex: 10000, pointerEvents: 'none' }} />
      <div ref={ringRef} className="cursor-ring" style={{ position: 'fixed', top: 0, left: 0, zIndex: 10000, pointerEvents: 'none' }} />
    </>
  );
}
