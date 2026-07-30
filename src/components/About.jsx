import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { useRef } from 'react';
import ParallaxSection from './ParallaxSection';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <ParallaxSection speed={0.15}>
      <section id="about" className="min-h-screen py-20 px-4 max-w-6xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-terminal mb-12 font-mono"
        >
          $ about_me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
            <div className="w-64 h-64 rounded-full overflow-hidden border-2 border-terminal/50 shadow-[0_0_20px_rgba(0,255,65,0.15)] bg-dark-panel">
              <div className="absolute inset-0 rounded-full ring-1 ring-terminal/20 pointer-events-none z-10" />
              <img
                src="/profile.jpg"
                alt={personalInfo.name}
                className="w-full h-full object-cover relative z-[1]"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-dark-panel border border-terminal/30 px-3 py-1 text-xs text-terminal font-mono whitespace-nowrap z-20">
              vikramaditya_swain.jpg
            </div>
          </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-dark-panel border border-terminal/20 p-6 font-mono text-sm">
              <p className="text-terminal-dim mb-2">$ cat about.txt</p>
              <p className="text-gray-300 leading-relaxed mb-4">{personalInfo.bio}</p>
              <div className="border-t border-terminal/20 pt-4 mt-4 text-gray-500">
                <p><span className="text-terminal">name:</span> {personalInfo.name}</p>
                <p><span className="text-terminal">role:</span> {personalInfo.title}</p>
                <p><span className="text-terminal">location:</span> {personalInfo.location}</p>
                <p><span className="text-terminal">email:</span> {personalInfo.email}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </ParallaxSection>
  );
}
