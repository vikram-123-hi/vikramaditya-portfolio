import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { useRef, useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import ParallaxSection from './ParallaxSection';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, { method: form.method, body: data, headers: { Accept: 'application/json' } });
      if (res.ok) {
        setSent(true);
        form.reset();
        setTimeout(() => setSent(false), 4000);
      }
    } catch {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    }
  };

  return (
    <ParallaxSection speed={-0.1}>
      <section id="contact" className="min-h-screen py-20 px-4 max-w-4xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
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
            <div className="bg-dark-panel border border-terminal/20 p-6 hover:border-terminal/40 transition-colors">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-terminal/20">
                <span className="w-3 h-3 rounded-full bg-red-500/50" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <span className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="text-xs text-gray-500 font-mono ml-2">send_message.sh</span>
              </div>
              <form
                onSubmit={handleSubmit}
                action="https://formspree.io/f/mojgbowa"
                method="POST"
                className="space-y-4 font-mono text-sm"
              >
                <div>
                  <label className="text-gray-500 block mb-1">$ to:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    className="w-full bg-dark border border-terminal/20 p-2 text-terminal focus:outline-none focus:border-terminal"
                  />
                </div>
                <div>
                  <label className="text-gray-500 block mb-1">$ subject:</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="subject"
                    required
                    className="w-full bg-dark border border-terminal/20 p-2 text-terminal focus:outline-none focus:border-terminal"
                  />
                </div>
                <div>
                  <label className="text-gray-500 block mb-1">$ body:</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="your message..."
                    required
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
            <div className="bg-dark-panel border border-terminal/20 p-6 hover:border-terminal/40 transition-colors">
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
                <div className="flex items-center gap-3 text-gray-300">
                  <FaWhatsapp className="text-green-400" />
                  <a href="https://wa.me/917008938983" target="_blank" rel="noopener noreferrer" className="hover:text-terminal transition-colors">
                    +91 7008938983
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-dark-panel border border-terminal/20 p-6 hover:border-terminal/40 transition-colors">
              <p className="text-gray-500 font-mono text-sm text-center">
                $ Available for freelance &amp; collaboration opportunities
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </ParallaxSection>
  );
}
