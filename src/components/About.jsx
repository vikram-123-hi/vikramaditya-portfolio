import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="min-h-screen py-20 px-4 max-w-6xl mx-auto">
      <motion.h2
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
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
          <div className="w-64 h-64 rounded-full border-2 border-terminal/50 overflow-hidden flex items-center justify-center bg-dark-panel">
            <span className="text-6xl text-terminal/30 font-mono">[img]</span>
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
  );
}
