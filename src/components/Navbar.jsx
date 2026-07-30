import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import ScrambleText from './ScrambleText';

const sections = ['About', 'Experience', 'Skills', 'Projects', 'Education', 'Contact'];

export default function Navbar() {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-dark/80 backdrop-blur border-b border-terminal/20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={() => scrollTo('hero')} className="text-terminal font-bold text-lg hover:opacity-80">
          <ScrambleText />
        </button>
        <div className="hidden md:flex gap-6">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s.toLowerCase())}
              className={`text-sm transition-colors ${active === s.toLowerCase() ? 'text-terminal' : 'text-gray-500 hover:text-terminal'}`}
            >
              $ {s.toLowerCase()}
            </button>
          ))}
        </div>
        <button className="md:hidden text-terminal text-2xl" onClick={() => setOpen(!open)}>
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-dark-panel border-b border-terminal/20">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s.toLowerCase())}
              className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-terminal hover:bg-terminal/5"
            >
              $ {s.toLowerCase()}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
