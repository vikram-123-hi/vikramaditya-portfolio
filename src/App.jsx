import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BootSequence from './components/BootSequence';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import useSound from './hooks/useSound';

export default function App() {
  const [booted, setBooted] = useState(false);
  const { playBootSound } = useSound();
  const bootSoundPlayed = useRef(false);

  useEffect(() => {
    if (!booted || bootSoundPlayed.current) return;
    bootSoundPlayed.current = true;
    const handler = () => {
      playBootSound();
      document.removeEventListener('click', handler);
    };
    document.addEventListener('click', handler, { once: true });
    return () => document.removeEventListener('click', handler);
  }, [booted]);

  if (!booted) return <BootSequence onComplete={() => setBooted(true)} />;

  return (
    <ErrorBoundary>
      <div className="bg-dark text-terminal min-h-screen">
        <CustomCursor />
        <ScrollToTop />
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
