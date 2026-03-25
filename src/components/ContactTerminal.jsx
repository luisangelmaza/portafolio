import React, { useState, useRef, useEffect } from 'react';
import useSound from '../hooks/useSound';
import emailjs from 'emailjs-com';

export default function ContactTerminal() {
  const { typeSound, clickSound } = useSound();
  const [step, setStep] = useState(0); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'
  
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);

  const steps = [
    { prompt: 'Enter your name/alias:', key: 'name' },
    { prompt: 'Enter your email:', key: 'email' },
    { prompt: 'Type your message (Press Enter to send):', key: 'message' },
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      clickSound();
      const val = inputVal.trim();
      if (!val) return;

      if (step === 0) setName(val);
      else if (step === 1) setEmail(val);
      else if (step === 2) {
        setMessage(val);
        sendEmail(name, email, val);
      }
      
      setInputVal('');
      if (step < 2) setStep(step + 1);
    }
  };

  const sendEmail = (n, e, m) => {
    setStatus('sending');

    const templateParams = {
      from_name: n,
      reply_to: e,
      message: m,
    };

    emailjs.send(
      'service_l6l65mm', 
      'template_5g2x38t', 
      templateParams, 
      'IDB_nY7d_NpHmy8tT'
    )
    .then((response) => {
      setStatus('success');
      setTimeout(() => resetForm(), 4000);
    })
    .catch((error) => {
      setStatus('error');
      console.error('Email failed...', error);
      setTimeout(() => resetForm(), 4000);
    });
  };

  const resetForm = () => {
    setStep(0);
    setName('');
    setEmail('');
    setMessage('');
    setStatus('');
    setInputVal('');
  };

  return (
    <div className="contact-cli" onClick={() => inputRef.current?.focus()}>
      <div className="cli-history">
        {step > 0 && <div className="cli-line"><span className="cli-prompt">{'> '}</span> {steps[0].prompt} <span className="cli-answer">{name}</span></div>}
        {step > 1 && <div className="cli-line"><span className="cli-prompt">{'> '}</span> {steps[1].prompt} <span className="cli-answer">{email}</span></div>}
        {step > 2 && <div className="cli-line"><span className="cli-prompt">{'> '}</span> {steps[2].prompt} <span className="cli-answer">{message}</span></div>}
      </div>

      {status === 'sending' && <div className="cli-line warning">[System] Encrypting and transmitting payload... Please wait.</div>}
      {status === 'success' && <div className="cli-line success">[System] Payload delivered successfully. I will contact you soon. Connection closed.</div>}
      {status === 'error' && <div className="cli-line error">[System] Transmission failed. Connection refused. Try again.</div>}

      {status === '' && (
        <div className="cli-input-row">
          <span className="cli-prompt">{'> '}</span>
          <span style={{color: 'var(--dim)', marginRight: '10px'}}>{steps[step].prompt}</span>
          <input
            ref={inputRef}
            type={step === 1 ? "email" : "text"}
            value={inputVal}
            onChange={(e) => { setInputVal(e.target.value); typeSound(); }}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      )}
      
      {status === '' && <div className="cli-help">// Type your answer and press ENTER</div>}
    </div>
  );
}
