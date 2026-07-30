import { useState, useEffect } from 'react';

export default function TerminalTyping({ text, speed = 100 }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  useEffect(() => {
    const cursor = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(cursor);
  }, []);

  return (
    <span>
      {displayed}
      <span className={showCursor ? 'opacity-100' : 'opacity-0'}>_</span>
    </span>
  );
}
