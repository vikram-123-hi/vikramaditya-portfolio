import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ABENDS = [
  { code: 'S0C4', reason: 'PROTECTION EXCEPTION', desc: 'UNAUTHORIZED STORAGE ACCESS' },
  { code: 'S0C7', reason: 'DATA EXCEPTION', desc: 'INVALID OPERAND DATA' },
  { code: 'S0C1', reason: 'OPERATION EXCEPTION', desc: 'INVALID OPERATION CODE' },
  { code: 'S0C5', reason: 'ADDRESSING EXCEPTION', desc: 'ADDRESS BOUNDARY VIOLATION' },
  { code: 'S0CB', reason: 'MONITOR EVENT', desc: 'MONITOR CALL INTERRUPT' },
  { code: 'S0C3', reason: 'ADDRESSING EXCEPTION', desc: 'SEGMENT TRANSLATION FAILURE' },
  { code: 'S0C6', reason: 'SPECIFICATION EXCEPTION', desc: 'INVALID INSTRUCTION FORMAT' },
];

function randomHex(len) {
  return Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('');
}

function generateDump(code) {
  const psw = `${randomHex(4)} ${randomHex(4)} ${randomHex(4)} ${randomHex(4)}`;
  const regs = Array.from({ length: 16 }, (_, i) =>
    `R${i.toString(16).toUpperCase().padStart(2, '0')}  ${randomHex(8)}`
  );
  const dump = Array.from({ length: 4 }, () => randomHex(32));
  return { psw, regs, dump, code };
}

export default function AbendOverlay({ show, onNext }) {
  const [abend, setAbend] = useState(null);
  const [dump, setDump] = useState(null);

  const nextAbend = useCallback(() => {
    const next = ABENDS[Math.floor(Math.random() * ABENDS.length)];
    setAbend(next);
    setDump(generateDump(next.code));
  }, []);

  useEffect(() => {
    if (show) {
      nextAbend();
      const timer = setTimeout(() => onNext(), 2800);
      return () => clearTimeout(timer);
    }
  }, [show, nextAbend, onNext]);

  return (
    <AnimatePresence>
      {show && abend && dump && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 z-20 flex items-center justify-center bg-dark/95"
        >
          <div className="font-mono text-[10px] leading-tight tracking-wide select-none">
            <p className="text-red-400 font-bold text-xs mb-1">SYSTEM ABEND {dump.code}</p>
            <p className="text-terminal-dim mb-0.5">COMPLETION CODE: <span className="text-red-400">{abend.code}</span></p>
            <p className="text-terminal-dim mb-0.5">REASON: <span className="text-yellow-400">{abend.reason}</span></p>
            <p className="text-terminal-dim mb-0.5">DESCRIPTION: {abend.desc}</p>
            <p className="text-terminal-dim mb-0.5">PSW: {dump.psw}</p>
            <p className="text-terminal-dim mb-0.5">REGS:</p>
            <div className="grid grid-cols-2 gap-x-2 mb-0.5">
              {dump.regs.map((r, i) => (
                <p key={i} className="text-terminal-dim">{r}</p>
              ))}
            </div>
            <p className="text-terminal-dim mb-0.5">DUMP:</p>
            {dump.dump.map((line, i) => (
              <p key={i} className="text-terminal-dim/60">{line}</p>
            ))}
            <p className="text-red-400/70 mt-1 animate-pulse">ABEND DUMP CAPTURED — SYSTEM WAITING</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
