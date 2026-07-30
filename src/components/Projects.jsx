import { motion, useInView } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { useRef, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';

function ProjectCard({ project, index, inView }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - card.left) / card.width - 0.5;
    const y = (e.clientY - card.top) / card.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

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
      onMouseLeave={handleMouseLeave}
      style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="bg-dark-panel border border-terminal/20 transition-transform duration-200 ease-out"
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b border-terminal/20 bg-dark">
        <span className="w-3 h-3 rounded-full bg-red-500/50" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <span className="w-3 h-3 rounded-full bg-green-500/50" />
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
            className="inline-flex items-center gap-1 text-sm text-terminal hover:underline font-mono"
          >
            <FiExternalLink /> view_live
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="min-h-screen py-20 px-4 max-w-6xl mx-auto">
      <motion.h2
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="text-2xl font-bold text-terminal mb-12 font-mono"
      >
        $ ls -la projects/
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
