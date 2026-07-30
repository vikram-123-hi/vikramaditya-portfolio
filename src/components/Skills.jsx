import { motion, useInView } from 'framer-motion';
import { skills } from '../data/portfolioData';
import { useRef } from 'react';
import ParallaxSection from './ParallaxSection';

function SkillGroup({ title, items, inView, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <h3 className="text-lg font-bold text-terminal mb-6 font-mono">{title}</h3>
      <div className="space-y-4">
        {items.map((skill, i) => (
          <div key={skill.name}>
            <div className="flex justify-between text-sm font-mono mb-1">
              <span className="text-gray-300">{skill.name}</span>
              <span className="text-gray-500">{skill.level}%</span>
            </div>
            <div className="h-2 bg-dark-panel border border-terminal/20 rounded overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${skill.level}%` } : {}}
                transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                className="h-full bg-terminal relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-terminal/30" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <ParallaxSection speed={0.1}>
      <section id="skills" className="min-h-screen py-20 px-4 max-w-6xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-terminal mb-12 font-mono"
        >
          $ skills --all
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <SkillGroup title="[ Mainframe ]" items={skills.mainframe} inView={inView} index={0} />
          <SkillGroup title="[ Web Development ]" items={skills.webdev} inView={inView} index={1} />
        </div>
      </section>
    </ParallaxSection>
  );
}
