import { motion } from 'framer-motion';
import MatrixRain from './MatrixRain';
import TerminalTyping from './TerminalTyping';
import { personalInfo } from '../data/portfolioData';
import { FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import useSound from '../hooks/useSound';

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const { playHoverSound, playClickSound } = useSound();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <MatrixRain />
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-terminal-dim text-sm mb-2">$ whoami</p>
          <h1 className="text-4xl md:text-6xl font-bold text-terminal mb-4 min-h-[1.2em]">
            <TerminalTyping text={`> Hello, I'm ${personalInfo.name}`} speed={80} />
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 font-light">
            {personalInfo.title}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center mb-8"
        >
          <button
            onClick={() => { playClickSound(); scrollTo('projects'); }}
            onMouseEnter={playHoverSound}
            className="px-6 py-3 border border-terminal text-terminal hover:bg-terminal/10 transition-colors font-mono text-sm"
          >
            $ view_projects
          </button>
          <button
            onClick={() => { playClickSound(); scrollTo('contact'); }}
            onMouseEnter={playHoverSound}
            className="px-6 py-3 border border-gray-600 text-gray-400 hover:border-terminal hover:text-terminal transition-colors font-mono text-sm"
          >
            $ contact_me
          </button>
          <a
            href={`${import.meta.env.BASE_URL}Vikramaditya_Swain_Mainframe_Resume.pdf`}
            download
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="px-6 py-3 border border-terminal/30 text-terminal-dim hover:border-terminal hover:text-terminal transition-colors font-mono text-sm flex items-center gap-2"
          >
            <FiDownload /> resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="flex justify-center gap-6 text-2xl"
        >
          <a href={`mailto:${personalInfo.email}`} className="text-gray-500 hover:text-terminal transition-colors"><FiMail /></a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-terminal transition-colors"><FiLinkedin /></a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 3, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 text-terminal/50 text-sm"
      >
        [ scroll down ]
      </motion.div>
    </section>
  );
}
