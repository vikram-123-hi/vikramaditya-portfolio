import { useCallback, useRef } from 'react';

export default function useSound() {
  const ctxRef = useRef(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return null;
      ctxRef.current = new Ctor();
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const playBootSound = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const tones = [
      { freq: 440, start: 0, dur: 0.12 },
      { freq: 554.37, start: 0.18, dur: 0.12 },
      { freq: 659.25, start: 0.36, dur: 0.12 },
      { freq: 880, start: 0.54, dur: 0.35 },
    ];
    tones.forEach(({ freq, start, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.06, now + start);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + dur);
    });
  }, [getCtx]);

  const playHoverSound = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 800;
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }, [getCtx]);

  return { playBootSound, playHoverSound };
}
