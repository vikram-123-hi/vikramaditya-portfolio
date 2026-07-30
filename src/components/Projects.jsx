import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { useRef, useState } from 'react';
import { FiExternalLink, FiX, FiCalendar, FiTerminal } from 'react-icons/fi';
import ParallaxSection from './ParallaxSection';
import useSound from '../hooks/useSound';

function ProjectCard({ project, index, inView, onClick }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const { playHoverSound } = useSound();

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - card.left) / card.width - 0.5;
    const y = (e.clientY - card.top) / card.height - 0.5;
    setTilt({ x: y * -20, y: x * 20 });
  };

  const handleMouseEnter = () => { setHovered(true); playHoverSound(); };
  const handleMouseLeave = () => { setTilt({ x: 0, y: 0 }); setHovered(false); };

  const statusColors = {
    live: 'text-green-400 border-green-400',
    wip: 'text-yellow-400 border-yellow-400',
    completed: 'text-blue-400 border-blue-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: '1000px',
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.03 : 1})`,
      }}
      className="bg-dark-panel border border-terminal/20 transition-all duration-200 ease-out cursor-pointer hover:border-terminal/60"
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b border-terminal/20 bg-dark">
        <motion.span
          className="w-3 h-3 rounded-full bg-red-500/50"
          animate={hovered ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        <motion.span
          className="w-3 h-3 rounded-full bg-yellow-500/50"
          animate={hovered ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.15 }}
        />
        <motion.span
          className="w-3 h-3 rounded-full bg-green-500/50"
          animate={hovered ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
        />
        <span className="text-xs text-gray-500 font-mono ml-2">{project.title.toLowerCase().replace(/\s+/g, '_')}.exe</span>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-terminal font-bold font-mono">{project.title}</h3>
          {project.status && (
            <span className={`text-xs border px-2 py-0.5 font-mono ${statusColors[project.status]}`}>
              {project.status}
            </span>
          )}
        </div>
        <p className="text-gray-400 text-sm font-mono mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="text-xs text-terminal-dim border border-terminal/20 px-2 py-0.5 font-mono">{t}</span>
          ))}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-sm text-terminal hover:underline font-mono"
          >
            <FiExternalLink /> view_live
          </a>
        )}
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  const { playClickSound } = useSound();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[99999] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-dark-panel border border-terminal/30 w-full max-w-lg max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-terminal/20 bg-dark">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/50" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <span className="w-3 h-3 rounded-full bg-green-500/50" />
            <span className="text-xs text-gray-500 font-mono ml-2">details.sh — {project.title}</span>
          </div>
          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="text-gray-500 hover:text-terminal transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4 font-mono text-sm">
          <div>
            <h3 className="text-terminal font-bold text-lg mb-1">{project.title}</h3>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><FiCalendar /> {project.date}</span>
              {project.status && (
                <span className={`border px-2 py-0.5 ${
                  project.status === 'live' ? 'text-green-400 border-green-400'
                  : project.status === 'wip' ? 'text-yellow-400 border-yellow-400'
                  : 'text-blue-400 border-blue-400'
                }`}>
                  {project.status}
                </span>
              )}
            </div>
          </div>

          <div className="border-t border-terminal/10 pt-3">
            <p className="text-gray-400 leading-relaxed">{project.details}</p>
          </div>

          <div className="border-t border-terminal/10 pt-3">
            <p className="text-terminal-dim mb-2 flex items-center gap-1"><FiTerminal /> tech_stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-xs text-terminal border border-terminal/20 px-2 py-1">{t}</span>
              ))}
            </div>
          </div>

          {project.features && (
            <div className="border-t border-terminal/10 pt-3">
              <p className="text-terminal-dim mb-2">$ features</p>
              <ul className="space-y-1">
                {project.features.map((f, i) => (
                  <li key={i} className="text-gray-400 flex items-start gap-2">
                    <span className="text-terminal mt-0.5">›</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.link && (
            <div className="border-t border-terminal/10 pt-3">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-terminal hover:underline"
              >
                <FiExternalLink /> view_live
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [selected, setSelected] = useState(null);
  const { playClickSound } = useSound();

  return (
    <ParallaxSection speed={-0.1}>
      <section id="projects" className="min-h-screen py-20 px-4 max-w-6xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-terminal mb-12 font-mono"
        >
          $ ls -la projects/
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              inView={inView}
              onClick={() => { playClickSound(); setSelected(project); }}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </ParallaxSection>
  );
}
