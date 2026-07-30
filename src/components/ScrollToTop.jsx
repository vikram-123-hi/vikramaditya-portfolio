import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import useSound from '../hooks/useSound';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { playHoverSound } = useSound();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          onMouseEnter={playHoverSound}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center border border-terminal text-terminal bg-dark hover:bg-terminal/10 transition-colors rounded-none"
        >
          <FiArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
