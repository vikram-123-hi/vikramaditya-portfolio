import { FiArrowUp, FiLinkedin, FiMail } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-terminal/20 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-xs font-mono">
          &copy; {new Date().getFullYear()} {personalInfo.name} | Built with React + Tailwind
        </p>
        <div className="flex gap-4 text-gray-500">
          <a href={`mailto:${personalInfo.email}`} className="hover:text-terminal transition-colors"><FiMail /></a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-terminal transition-colors"><FiLinkedin /></a>
        </div>
        <button
          onClick={scrollToTop}
          className="text-terminal hover:opacity-80 transition-opacity flex items-center gap-1 text-sm font-mono"
        >
          <FiArrowUp /> back_to_top
        </button>
      </div>
    </footer>
  );
}
