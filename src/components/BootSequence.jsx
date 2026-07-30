import { useState, useEffect, useRef } from 'react';
import useSound from '../hooks/useSound';

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
  const soundPlayed = useRef(false);
  const { playBootSound } = useSound();

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

  useEffect(() => {
    if (!soundPlayed.current) {
      soundPlayed.current = true;
      const timer = setTimeout(() => playBootSound(), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[99998] bg-dark flex items-center justify-center transition-opacity duration-1000 ${fading ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="relative">
        {/* CRT Monitor Body */}
        <div className="relative bg-gray-800 rounded-t-3xl rounded-b-2xl px-6 pt-5 pb-8 shadow-[0_0_60px_rgba(0,255,65,0.1)]">
          {/* Monitor Top Bezel */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-700 rounded-b-sm" />
          {/* Screen Bezel */}
          <div className="bg-gray-900 rounded-2xl p-3 shadow-inner">
            {/* Screen */}
            <div className="relative w-[420px] max-w-[85vw] h-56 bg-black rounded-xl overflow-hidden">
              {/* Scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.04) 2px, rgba(0,255,65,0.04) 4px)',
                }}
              />
              {/* Screen glow */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,255,65,0.06) 100%)',
                }}
              />
              {/* Content */}
              <div className="relative z-[1] font-mono text-xs md:text-sm p-4 pt-6 h-full flex flex-col justify-center">
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
          </div>
          {/* Monitor Base/Stand */}
          <div className="flex justify-center mt-2">
            <div className="w-24 h-2 bg-gray-700 rounded-b" />
          </div>
        </div>
        {/* Power LED */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-2 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_4px_#00ff41] animate-pulse" />
          <span className="text-[8px] text-gray-600 font-mono tracking-widest">POWER</span>
        </div>
      </div>
    </div>
  );
}
