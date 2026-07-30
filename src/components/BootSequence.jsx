import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [ready, setReady] = useState(false);
  const [fading, setFading] = useState(false);
  const doneRef = useRef(false);
  const { playBootSound } = useSound();

  const handleInteract = useCallback(() => {
    if (!ready || doneRef.current) return;
    doneRef.current = true;
    playBootSound();
    setFading(true);
    setTimeout(() => onComplete(), 1000);
  }, [ready, playBootSound, onComplete]);

  useEffect(() => {
    const timers = bootLines.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
        if (i === bootLines.length - 1) {
          setTimeout(() => setReady(true), 600);
        }
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const handleKey = (e) => { if (e.key === 'Enter') handleInteract(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [ready, handleInteract]);

  return (
    <div
      className={`fixed inset-0 z-[99998] bg-dark flex items-center justify-center transition-opacity duration-1000 ${fading ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleInteract}
    >
      <div className="relative flex flex-col items-center">
        {/* Monitor Body */}
        <div
          className="relative rounded-t-2xl rounded-b-lg px-8 pt-6 pb-4"
          style={{
            background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
            boxShadow: '0 0 60px rgba(0,255,65,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* Top ridge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-gray-600 rounded-b" />

          {/* Screen Bezel */}
          <div
            className="rounded-xl p-5"
            style={{
              background: 'linear-gradient(135deg, #222, #111)',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Screen */}
            <div className="relative w-[420px] max-w-[85vw] h-72 bg-black rounded-lg overflow-hidden">
              {/* Scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.03) 2px, rgba(0,255,65,0.03) 4px)',
                }}
              />
              {/* Screen glow */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,255,65,0.05) 100%)',
                }}
              />
              {/* Content */}
              <div className="relative z-[1] font-mono text-xs md:text-sm px-4 py-5 h-full flex flex-col justify-center">
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
                {ready && (
                  <p className="text-terminal-dim/60 mt-2 animate-pulse">
                    [ PRESS ENTER OR CLICK TO CONTINUE ]
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bezel with Brand + LED */}
          <div className="flex items-center justify-between mt-3 px-1">
            {/* Brand badge */}
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-gray-600 font-mono tracking-[0.15em]">IBM</span>
              <span className="text-[7px] text-gray-700 font-mono">z/OS</span>
            </div>
            {/* Power LED */}
            <div className="flex items-center gap-2">
              <span className="text-[8px] text-gray-700 font-mono tracking-[0.15em]">POWER</span>
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_#00ff41] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Stand neck */}
        <div className="w-12 h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b" />
        {/* Stand base */}
        <div className="w-36 h-3 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg shadow-lg" />
      </div>
    </div>
  );
}
