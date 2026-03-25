import { useCallback } from 'react';

// Web Audio API para sonidos ultra-rápidos sin descargar archivos

const playSound = (type) => {
  // Ignorar en móviles para no molestar ni bloquear audio
  if (window.matchMedia('(max-width: 768px)').matches) return;
  
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'hover') {
      // Sutil 'tick' futurista
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.05);
    } 
    else if (type === 'click') {
      // Sonido de confirmación brillante
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    }
    else if (type === 'terminal') {
      // Teclado mecánico hacky
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(150 + Math.random() * 50, audioCtx.currentTime);
      
      gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.03);
    }
  } catch (error) {
    console.log("Audio not supported or blocked");
  }
};

export default function useSound() {
  const hoverSound = useCallback(() => playSound('hover'), []);
  const clickSound = useCallback(() => playSound('click'), []);
  const typeSound = useCallback(() => playSound('terminal'), []);

  return { hoverSound, clickSound, typeSound };
}
