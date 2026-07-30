import { useEffect, useRef, useState, useCallback } from 'react';

const cobolCode = `       IDENTIFICATION DIVISION.
       PROGRAM-ID. PORTFOLIO.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-NAME    PIC X(20)
                     VALUE 'VIKRAMADITYA'.
       01 WS-ROLE    PIC X(35)
                     VALUE 'MAINFRAME DEVELOPER'.
       01 WS-YEARS   PIC 9(02) VALUE 05.
       PROCEDURE DIVISION.
           DISPLAY 'HELLO, WORLD'.
           DISPLAY WS-NAME.
           DISPLAY WS-ROLE.
           PERFORM VARYING I FROM 1 BY 1
                   UNTIL I > WS-YEARS
               DISPLAY 'YEAR: ' I
           END-PERFORM.
           STOP RUN.`;

function randomPos() {
  return {
    top: `${10 + Math.random() * 50}%`,
    left: `${5 + Math.random() * 60}%`,
  };
}

export default function COBOLBackground() {
  const preRef = useRef(null);
  const [pos, setPos] = useState(() => randomPos());

  const move = useCallback(() => {
    setPos(randomPos());
  }, []);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;
    pre.scrollTop = 0;
    let pos = 0;
    const chars = cobolCode.split('');
    pre.textContent = '';

    const interval = setInterval(() => {
      if (pos < chars.length) {
        pre.textContent += chars[pos];
        pre.scrollTop = pre.scrollHeight;
        pos++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          pos = 0;
          pre.textContent = '';
        }, 4000);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(move, 5000);
    return () => clearInterval(timer);
  }, [move]);

  return (
    <pre
      ref={preRef}
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        transition: 'top 2s ease-in-out, left 2s ease-in-out',
      }}
      className="w-80 max-w-[90vw] h-48 md:h-64 overflow-hidden text-[10px] md:text-xs leading-tight text-terminal/10 pointer-events-none font-mono p-4 whitespace-pre z-0"
    />
  );
}
