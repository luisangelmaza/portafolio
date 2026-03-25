import { useState, useEffect } from 'react';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/\\";

export default function useGlitchText(originalText, speed = 30) {
  const [text, setText] = useState(originalText);
  const [isAnimating, setIsAnimating] = useState(false);

  const trigger = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    let iterations = 0;

    const interval = setInterval(() => {
      setText((prev) => 
        originalText
          .split("")
          .map((letter, index) => {
            if (index < iterations) return originalText[index];
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          })
          .join("")
      );

      if (iterations >= originalText.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
      iterations += 1 / 3; // slower reveal
    }, speed);
  };

  return { text, trigger };
}
