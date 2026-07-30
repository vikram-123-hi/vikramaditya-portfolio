import { useState } from 'react';
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

export default function App() {
  const [booted, setBooted] = useState(false);

  if (!booted) return <BootSequence onComplete={() => setBooted(true)} />;

  return (
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
  );
}
