import { useState, useEffect } from 'react';

const bootLines = [
  { text: 'IBM z/OS 02.04.00 INITIALIZING...', delay: 300 },
  { text: 'SYSTEM IPL IN PROGRESS', delay: 600 },
  { text: 'JES2 ACTIVE — READER/MONITOR', delay: 900 },
  { text: 'VTAM STARTED — NETWORK ACTIVE', delay: 1200 },
  { text: 'TCAS ACTIVE — TSO READY', delay: 1500 },
  { text: 'LOADING USER PROFILE...', delay: 1800 },
  { text: '  VIKRAMADITYA SWAIN', delay: 2200 },
  { text: '  ROLE: SOFTWARE ENGINEER', delay: 2500 },
  { text: '  ACCESS LEVEL: MAINFRAME', delay: 2800 },
  { text: 'ACCESS GRANTED — SYSTEM READY', delay: 3200 },
];

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timers = bootLines.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
        if (i === bootLines.length - 1) {
          setTimeout(() => setFading(true), 800);
          setTimeout(() => onComplete(), 2000);
        }
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[99998] bg-dark flex items-center justify-center transition-opacity duration-1000 ${fading ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="font-mono text-sm md:text-base max-w-lg px-4">
        {bootLines.map((line, i) => (
          <p
            key={i}
            className={`transition-opacity duration-300 ${visibleLines.includes(i) ? 'opacity-100' : 'opacity-0'} ${line.text.startsWith('  ') ? 'text-terminal-dim' : line.text.includes('GRANTED') ? 'text-terminal font-bold' : 'text-gray-400'}`}
          >
            {line.text.startsWith('  ') ? line.text : `> ${line.text}`}
            {i === bootLines.length - 1 && visibleLines.includes(i) && (
              <span className="animate-pulse ml-1">_</span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
