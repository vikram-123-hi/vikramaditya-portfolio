import { useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import BootSequence from './components/BootSequence';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import COBOLBackground from './components/COBOLBackground';
import ParallaxDecorations from './components/ParallaxDecorations';

const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function SectionFallback() {
  return <div className="min-h-screen bg-dark" />;
}

export default function App() {
  const [booted, setBooted] = useState(false);

  if (!booted) return <BootSequence onComplete={() => setBooted(true)} />;

  return (
    <ErrorBoundary>
      <div className="bg-dark text-terminal min-h-screen">
        <ParallaxDecorations />
        <COBOLBackground />
        <CustomCursor />
        <ScrollToTop />
        <Navbar />
        <Hero />
        <Suspense fallback={<SectionFallback />}><About /></Suspense>
        <Suspense fallback={<SectionFallback />}><Experience /></Suspense>
        <Suspense fallback={<SectionFallback />}><Skills /></Suspense>
        <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
        <Suspense fallback={<SectionFallback />}><Education /></Suspense>
        <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
        <Suspense fallback={null}><Footer /></Suspense>
      </div>
    </ErrorBoundary>
  );
}
