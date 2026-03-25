import { useState, useEffect, useRef } from 'react';
import useSound from '../hooks/useSound';

export default function Terminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'info', text: 'Luis Angel OS [Version 1.0.42]' },
    { type: 'info', text: '(c) 2026 Maza Corp. All rights reserved.' },
    { type: 'info', text: 'Type "help" for a list of commands.' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const { typeSound, clickSound } = useSound();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'command', text: `> ${input}` }];
      
      clickSound();

      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'info', text: 'Available commands: about, skills, projects, contact, themes, whoami, clear, exit' });
          break;
        case 'about':
          newHistory.push({ type: 'info', text: 'Luis Angel Maza - Software Engineer & Full Stack Developer.' });
          break;
        case 'skills':
          newHistory.push({ type: 'info', text: 'Frontend: React, JS, CSS | Backend: Node, Python, Java | DB: SQL, Mongo' });
          break;
        case 'projects':
          newHistory.push({ type: 'info', text: '1. ShoeStyle Pro | 2. UrbanWear | 3. FreshMarket' });
          break;
        case 'contact':
          newHistory.push({ type: 'info', text: 'Email: luisangelmaza32@gmail.com | WhatsApp: +57 301 135 5799' });
          break;
        case 'themes':
          newHistory.push({ type: 'info', text: 'Switch themes using the navbar icons for Cyber, Matrix, or Blood modes.' });
          break;
        case 'whoami':
          newHistory.push({ type: 'info', text: 'root@portfolio ~ You are a curious developer inspecting my source code. Welcome.' });
          break;
        case 'sudo rm -rf /':
          newHistory.push({ type: 'error', text: 'CRITICAL ERROR: SYSTEM DELETION INITIATED... just kidding.' });
          setTimeout(() => { document.body.style.display = 'none'; setTimeout(() => document.body.style.display = 'block', 2000); }, 1000);
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'exit':
          onClose();
          break;
        case '':
          break;
        default:
          newHistory.push({ type: 'error', text: `Command not found: ${cmd}. Type "help" for assistance.` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal-window" onClick={e => e.stopPropagation()}>
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red" onClick={onClose}></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="terminal-title">system_terminal.exe</div>
        </div>
        <div className="terminal-body" ref={scrollRef}>
          {history.map((line, i) => (
            <div key={i} className={`terminal-line ${line.type}`}>
              {line.text}
            </div>
          ))}
          <div className="terminal-input-line">
            <span className="prompt">&gt;</span>
            <input 
              ref={inputRef}
              type="text" 
              value={input} 
              onChange={e => { setInput(e.target.value); typeSound(); }}
              onKeyDown={handleCommand}
              spellCheck="false"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
