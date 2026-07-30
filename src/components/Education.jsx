import { motion, useInView } from 'framer-motion';
import { education } from '../data/portfolioData';
import { useRef } from 'react';
import { FiBook } from 'react-icons/fi';

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="min-h-screen py-20 px-4 max-w-4xl mx-auto">
      <motion.h2
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="text-2xl font-bold text-terminal mb-12 font-mono"
      >
        $ education --history
      </motion.h2>

      <div className="space-y-6">
        {education.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="bg-dark-panel border border-terminal/20 p-6 flex gap-4"
          >
            <div className="text-terminal text-2xl mt-1">
              <FiBook />
            </div>
            <div>
              <h3 className="text-terminal font-bold font-mono">{edu.degree}</h3>
              <p className="text-gray-400 text-sm font-mono">{edu.institution}</p>
              <p className="text-gray-500 text-xs font-mono mt-1">{edu.period} &mdash; {edu.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
