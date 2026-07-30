import { motion, useInView } from 'framer-motion';
import { experience } from '../data/portfolioData';
import { useRef } from 'react';

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="min-h-screen py-20 px-4 max-w-4xl mx-auto">
      <motion.h2
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="text-2xl font-bold text-terminal mb-12 font-mono"
      >
        $ experience --list
      </motion.h2>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-terminal/20" />

        {experience.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="relative pl-12 pb-12 last:pb-0"
          >
            <div className="absolute left-2 top-1 w-[5px] h-[5px] bg-terminal rounded-full" />
            <div className="bg-dark-panel border border-terminal/20 p-6">
              <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
                <h3 className="text-terminal font-bold">{exp.role}</h3>
                <span className="text-xs text-gray-500 font-mono">{exp.period}</span>
              </div>
              <p className="text-gray-400 text-sm mb-1 font-mono">{exp.company}</p>
              <p className="text-gray-500 text-xs mb-4 font-mono">{exp.location}</p>
              <p className="text-gray-500 text-xs mb-3 font-mono">client: {exp.client}</p>
              <ul className="space-y-2">
                {exp.highlights.map((h, j) => (
                  <li key={j} className="text-gray-300 text-sm font-mono flex gap-2">
                    <span className="text-terminal-dim mt-1">$</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
