import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[99999]"
      style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
    >
      <span className="text-terminal text-xl font-mono opacity-70">_</span>
    </div>
  );
}
