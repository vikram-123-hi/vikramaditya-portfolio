import { useState, useEffect, useCallback } from 'react';

const ABENDS = [
  { code: 'S0C4', reason: 'PROTECTION EXCEPTION', desc: 'UNAUTHORIZED STORAGE ACCESS' },
  { code: 'S0C7', reason: 'DATA EXCEPTION', desc: 'INVALID OPERAND DATA' },
  { code: 'S0C1', reason: 'OPERATION EXCEPTION', desc: 'INVALID OPERATION CODE' },
  { code: 'S0C5', reason: 'ADDRESSING EXCEPTION', desc: 'ADDRESS BOUNDARY VIOLATION' },
  { code: 'S0CB', reason: 'MONITOR EVENT', desc: 'MONITOR CALL INTERRUPT' },
  { code: 'S0C3', reason: 'ADDRESSING EXCEPTION', desc: 'SEGMENT TRANSLATION FAILURE' },
  { code: 'S0C6', reason: 'SPECIFICATION EXCEPTION', desc: 'INVALID INSTRUCTION FORMAT' },
];

const JOBNAMES = ['VIKRAM', 'COBOL01', 'MAINDEV', 'SYSPROG', 'TSOUSER'];
const STEPS = ['COBOL', 'LINKEDIT', 'COMPILE', 'EXECUTE', 'ASSEMBLE'];
const USERS = ['SWAIN', 'VSWAIN', 'SYSTEM'];

function pad(n) { return String(n).padStart(2, '0'); }

function timestamp() {
  const h = 0|Math.random()*24;
  const m = 0|Math.random()*60;
  const s = 0|Math.random()*60;
  return `${pad(h)}.${pad(m)}.${pad(s)}`;
}

function randomHex(len) {
  return Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('');
}

export default function AbendOverlay({ show, onNext }) {
  const [abend, setAbend] = useState(null);
  const [lines, setLines] = useState([]);

  const nextAbend = useCallback(() => {
    const ab = ABENDS[Math.floor(Math.random() * ABENDS.length)];
    setAbend(ab);
    const jobname = JOBNAMES[0|Math.random() * JOBNAMES.length];
    const step = STEPS[0|Math.random() * STEPS.length];
    const user = USERS[0|Math.random() * USERS.length];
    const ts = timestamp();
    const tsEnd = timestamp();
    const addr = randomHex(8);
    setLines([
      'J E S 2  J O B  L O G  --  S Y S T E M  A B E N D',
      '',
      ` JOBNAME: ${jobname.padEnd(8)} STEP: ${step.padEnd(10)} PROCSTEP: ${step.padEnd(10)}`,
      ` ABEND CODE: ${ab.code.padEnd(8)} REASON: ${ab.reason}`,
      ` USER: ${user.padEnd(10)}    TIME: ${ts}   DATE: 2026.${pad(1+0|Math.random()*365)}`,
      '',
      ` IEF403I ${jobname} - STARTED - TIME=${ts}`,
      ` IEF404I ${jobname} - ENDED   - TIME=${tsEnd}  - ABEND=${ab.code}`,
      ` IEF452I ${jobname} - ABEND CODE ${ab.code} - ${ab.reason}`,
      ` IEF453I ${jobname} - ${ab.desc} AT ADDRESS ${addr}`,
      ` IEC031I ${jobname} - ABEND DUMP CAPTURED - JOB TERMINATED`,
      '',
      ` ***  JOB ${jobname} ABENDED - CODE ${ab.code}  ***`,
    ]);
  }, []);

  useEffect(() => {
    if (show) {
      nextAbend();
      const timer = setTimeout(() => onNext(), 2800);
      return () => clearTimeout(timer);
    }
  }, [show, nextAbend, onNext]);

  return (
    <div
      className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-200 ${show && abend ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="bg-dark/95 w-full h-full flex items-center justify-center p-3">
        <div className="font-mono text-[10px] leading-relaxed tracking-wide select-none whitespace-pre">
          {lines.map((line, i) => {
            const isHeader = i === 0;
            const isEnd = i === lines.length - 1;
            const isMsg = line.startsWith(' IEF') || line.startsWith(' IEC');
            return (
              <p
                key={i}
                className={
                  isHeader ? 'text-terminal-dim/80 font-bold tracking-widest' 
                  : isEnd ? 'text-red-400 animate-pulse font-bold'
                  : isMsg ? 'text-gray-400'
                  : line.startsWith(' ') ? 'text-terminal-dim/70'
                  : 'text-terminal-dim'
                }
              >
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
