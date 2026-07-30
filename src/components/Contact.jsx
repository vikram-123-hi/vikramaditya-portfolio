import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { useRef, useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiSend } from 'react-icons/fi';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-4 max-w-4xl mx-auto">
      <motion.h2
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="text-2xl font-bold text-terminal mb-12 font-mono"
      >
        $ contact --send
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-dark-panel border border-terminal/20 p-6">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-terminal/20">
              <span className="w-3 h-3 rounded-full bg-red-500/50" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <span className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="text-xs text-gray-500 font-mono ml-2">send_message.sh</span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-sm">
              <div>
                <label className="text-gray-500 block mb-1">$ to:</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-dark border border-terminal/20 p-2 text-terminal focus:outline-none focus:border-terminal"
                />
              </div>
              <div>
                <label className="text-gray-500 block mb-1">$ subject:</label>
                <input
                  type="text"
                  placeholder="subject"
                  className="w-full bg-dark border border-terminal/20 p-2 text-terminal focus:outline-none focus:border-terminal"
                />
              </div>
              <div>
                <label className="text-gray-500 block mb-1">$ body:</label>
                <textarea
                  rows={4}
                  placeholder="your message..."
                  className="w-full bg-dark border border-terminal/20 p-2 text-terminal focus:outline-none focus:border-terminal resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 border border-terminal text-terminal hover:bg-terminal/10 transition-colors flex items-center justify-center gap-2"
              >
                <FiSend /> {sent ? '✓ message_sent' : '$ send_message'}
              </button>
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="bg-dark-panel border border-terminal/20 p-6">
            <p className="text-terminal-dim font-mono text-sm mb-4">$ cat contact_info</p>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center gap-3 text-gray-300">
                <FiMail className="text-terminal" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-terminal transition-colors">{personalInfo.email}</a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FiPhone className="text-terminal" />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FiMapPin className="text-terminal" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <FiLinkedin className="text-terminal" />
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-terminal transition-colors">
                  /in/vikramadityaswain
                </a>
              </div>
            </div>
          </div>

          <div className="bg-dark-panel border border-terminal/20 p-6">
            <p className="text-gray-500 font-mono text-sm text-center">
              $ Available for freelance &amp; collaboration opportunities
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
