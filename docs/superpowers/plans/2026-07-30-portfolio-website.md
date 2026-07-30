# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal portfolio SPA for Vikramaditya Swain with a mainframe terminal aesthetic, featuring parallax, Matrix rain, typing animations, and interactive project cards.

**Architecture:** Single-page React app with a single `App.jsx` composing independent section components. All portfolio data lives in a single `portfolioData.js` config file. Effects (Matrix rain, typing, tilt) are isolated in dedicated component wrappers. Scroll animations use Framer Motion.

**Tech Stack:** React 18, Vite, Tailwind CSS, Framer Motion, React Icons

## Global Constraints
- Monospace font: Fira Code (Google Fonts)
- Terminal green (#00ff41) primary, dark bg (#0a0a0a)
- All code in .jsx files (no .ts)
- No backend — 100% static SPA
- Mobile-first responsive design

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/index.css`

**Interfaces:**
- Consumes: nothing
- Produces: working Vite dev server with Tailwind

- [ ] **Step 1: Create package.json**

```json
{
  "name": "vikramaditya-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^11.0.0",
    "react-icons": "^5.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

- [ ] **Step 3: Create tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        terminal: '#00ff41',
        'terminal-dim': '#00cc33',
        dark: '#0a0a0a',
        'dark-panel': '#111111',
        'dark-border': '#1a1a1a',
      },
      fontFamily: {
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 4: Create postcss.config.js**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 5: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vikramaditya Swain — Mainframe Developer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body class="bg-dark text-terminal font-mono">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create src/main.jsx**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 7: Create src/index.css with CRT effects and base styles**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* CRT scan lines overlay */
body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 65, 0.03) 2px,
    rgba(0, 255, 65, 0.03) 4px
  );
  pointer-events: none;
  z-index: 9999;
}

/* Custom terminal cursor */
* {
  cursor: none;
}

.terminal-cursor {
  display: inline-block;
  width: 10px;
  height: 1.2em;
  background: #00ff41;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0a0a0a;
}
::-webkit-scrollbar-thumb {
  background: #00ff41;
  border-radius: 4px;
}

html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 8: Run npm install**

Run: `npm install`
Expected: All dependencies installed, node_modules created

- [ ] **Step 9: Verify dev server starts**

Run: `npm run dev`
Expected: Vite dev server starts on localhost. Kill after confirmation.

---

### Task 2: Portfolio Data Layer

**Files:**
- Create: `src/data/portfolioData.js`

**Interfaces:**
- Consumes: nothing
- Produces: exported data objects consumed by all section components

- [ ] **Step 1: Create src/data/portfolioData.js**

```js
export const personalInfo = {
  name: 'Vikramaditya Swain',
  title: 'Software Engineer — Mainframe Technologies',
  email: 'swainvikramaditya99@gmail.com',
  phone: '+91 7008938983',
  location: 'Khandagiri, Bhubaneswar, India',
  linkedin: 'https://www.linkedin.com/in/vikramadityaswain',
  bio: 'Mainframe Developer with 5+ years of hands-on experience in COBOL, JCL, VSAM, Easytrieve, REXX, and Assembler on IBM z/OS. Proven expertise in production support, batch processing, and insurance domain systems. Adept at debugging complex issues and ensuring reliable, high-availability system operations. Also passionate about modern web development with React and JavaScript.',
};

export const experience = [
  {
    company: 'DXC Technologies',
    role: 'Analyst I Software Engineer',
    period: 'Jan 2021 - Present',
    location: 'Bangalore, India',
    client: 'Pan America Limited Corporation (U.S. Insurance Company)',
    highlights: [
      'Enhanced and supported LIFECOMM-based life insurance systems with strong domain knowledge in policy administration and claims',
      'Developed and maintained batch and online mainframe processes using COBOL, JCL, Assembler, and Easytrieve',
      'Delivered L2/L3 production support for high-availability insurance systems across critical processing cycles',
      'Analyzed and resolved system abends during critical production cycles, minimizing downtime',
      'Debugged and enhanced legacy code, ensuring system integrity and reliability',
      'Collaborated with cross-functional QA, business, and operations teams to consistently meet SLAs',
      'Leading a code conversion initiative to migrate database Easytrieve programs to COBOL, converting 200+ programs so far with the help of an AI copilot',
    ],
  },
];

export const skills = {
  mainframe: [
    { name: 'COBOL', level: 95 },
    { name: 'JCL', level: 90 },
    { name: 'Assembler', level: 80 },
    { name: 'Easytrieve', level: 85 },
    { name: 'REXX', level: 50 },
    { name: 'VSAM', level: 85 },
    { name: 'LIFECOMM', level: 80 },
    { name: 'Abend-AID', level: 75 },
    { name: 'File-AID', level: 75 },
    { name: 'DB2', level: 50 },
  ],
  webdev: [
    { name: 'React', level: 80 },
    { name: 'JavaScript', level: 85 },
    { name: 'Java', level: 70 },
    { name: 'SQL', level: 75 },
  ],
};

export const projects = [
  {
    title: 'Gajanana Interior Homes',
    description: 'Full production website for a client including customer-facing site and admin panel.',
    tech: ['React', 'Node.js', 'MongoDB'],
    link: 'https://gajananainteriorhomes.in',
    status: 'live',
  },
  {
    title: 'Restaurant Management System',
    description: 'A comprehensive restaurant management system currently under development.',
    tech: ['React', 'Node.js'],
    link: null,
    status: 'wip',
  },
  {
    title: 'IMDb Movie Clone',
    description: 'An IMDb-style movie browsing clone built with React and Node.js.',
    tech: ['React', 'Node.js', 'API'],
    link: null,
    status: 'completed',
  },
  {
    title: 'Amazon Shopping Cart Clone',
    description: 'An Amazon-style shopping cart application with React and JavaScript.',
    tech: ['React', 'JavaScript'],
    link: null,
    status: 'completed',
  },
  {
    title: 'Custom Drones',
    description: 'Independently builds and sells custom drones and client websites.',
    tech: ['Hardware', 'Electronics'],
    link: null,
    status: 'completed',
  },
];

export const education = [
  {
    degree: 'B.Tech in Electronics and Telecommunication',
    institution: 'Institute of Technical Education and Research (ITER), Bhubaneswar',
    period: 'Aug 2016 - Aug 2020',
    location: 'Bhubaneswar, Odisha',
  },
  {
    degree: 'Higher Secondary (12th), Science Stream',
    institution: 'Kendriya Vidyalaya',
    period: 'May 2016',
    location: 'Bhubaneswar, Odisha',
  },
];
```

---

### Task 3: Custom Cursor Component

**Files:**
- Create: `src/components/CustomCursor.jsx`

**Interfaces:**
- Consumes: nothing
- Produces: `<CustomCursor />` — renders animated terminal cursor that follows mouse

- [ ] **Step 1: Create CustomCursor.jsx**

```jsx
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[99999]"
      style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
    >
      <span className="text-terminal text-xl font-mono opacity-70">_</span>
    </div>
  );
}
```

---

### Task 4: Matrix Rain Effect

**Files:**
- Create: `src/components/MatrixRain.jsx`

**Interfaces:**
- Consumes: nothing
- Produces: `<MatrixRain />` — canvas-based Matrix-style raining characters

- [ ] **Step 1: Create MatrixRain.jsx**

```jsx
import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789COBOLJCLVSAMASSEMBLER';

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = '15px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.98 ? '#ffffff' : '#00ff41';
        ctx.fillText(text, i * 20, drops[i] * 20);
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full opacity-20 pointer-events-none"
    />
  );
}
```

---

### Task 5: Typing Animation Component

**Files:**
- Create: `src/components/TerminalTyping.jsx`

**Interfaces:**
- Consumes: `text` prop (string), `speed` prop (optional number, default 100)
- Produces: `<TerminalTyping text="..." />` — types text character by character with blinking cursor

- [ ] **Step 1: Create TerminalTyping.jsx**

```jsx
import { useState, useEffect } from 'react';

export default function TerminalTyping({ text, speed = 100 }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  useEffect(() => {
    const cursor = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(cursor);
  }, []);

  return (
    <span>
      {displayed}
      <span className={showCursor ? 'opacity-100' : 'opacity-0'}>_</span>
    </span>
  );
}
```

---

### Task 6: Navbar Component

**Files:**
- Create: `src/components/Navbar.jsx`

**Interfaces:**
- Consumes: nothing
- Produces: `<Navbar />` — fixed top nav with section links, active highlight on scroll, hamburger on mobile

- [ ] **Step 1: Create Navbar.jsx**

```jsx
import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const sections = ['About', 'Experience', 'Skills', 'Projects', 'Education', 'Contact'];

export default function Navbar() {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-dark/80 backdrop-blur border-b border-terminal/20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={() => scrollTo('hero')} className="text-terminal font-bold text-lg hover:opacity-80">
          vikramaditya<span className="animate-pulse">_</span>
        </button>
        <div className="hidden md:flex gap-6">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s.toLowerCase())}
              className={`text-sm transition-colors ${active === s.toLowerCase() ? 'text-terminal' : 'text-gray-500 hover:text-terminal'}`}
            >
              $ {s.toLowerCase()}
            </button>
          ))}
        </div>
        <button className="md:hidden text-terminal text-2xl" onClick={() => setOpen(!open)}>
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-dark-panel border-b border-terminal/20">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s.toLowerCase())}
              className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-terminal hover:bg-terminal/5"
            >
              $ {s.toLowerCase()}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
```

---

### Task 7: Hero Section

**Files:**
- Create: `src/components/Hero.jsx`

**Interfaces:**
- Consumes: `personalInfo` from `portfolioData.js`
- Produces: `<Hero />` — full-screen hero with Matrix rain, typing animation, COBOL code in background

- [ ] **Step 1: Create Hero.jsx**

```jsx
import { motion } from 'framer-motion';
import MatrixRain from './MatrixRain';
import TerminalTyping from './TerminalTyping';
import { personalInfo } from '../data/portfolioData';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

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
            onClick={() => scrollTo('projects')}
            className="px-6 py-3 border border-terminal text-terminal hover:bg-terminal/10 transition-colors font-mono text-sm"
          >
            $ view_projects
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="px-6 py-3 border border-gray-600 text-gray-400 hover:border-terminal hover:text-terminal transition-colors font-mono text-sm"
          >
            $ contact_me
          </button>
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

      {/* Scroll indicator */}
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
```

---

### Task 8: About Section

**Files:**
- Create: `src/components/About.jsx`

**Interfaces:**
- Consumes: `personalInfo` from `portfolioData.js`
- Produces: `<About />` — profile photo + bio + terminal status output

- [ ] **Step 1: Create About.jsx**

```jsx
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="min-h-screen py-20 px-4 max-w-6xl mx-auto">
      <motion.h2
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="text-2xl font-bold text-terminal mb-12 font-mono"
      >
        $ about_me
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="w-64 h-64 rounded-full border-2 border-terminal/50 overflow-hidden flex items-center justify-center bg-dark-panel">
            <span className="text-6xl text-terminal/30 font-mono">[img]</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-dark-panel border border-terminal/20 p-6 font-mono text-sm">
            <p className="text-terminal-dim mb-2">$ cat about.txt</p>
            <p className="text-gray-300 leading-relaxed mb-4">{personalInfo.bio}</p>
            <div className="border-t border-terminal/20 pt-4 mt-4 text-gray-500">
              <p><span className="text-terminal">name:</span> {personalInfo.name}</p>
              <p><span className="text-terminal">role:</span> {personalInfo.title}</p>
              <p><span className="text-terminal">location:</span> {personalInfo.location}</p>
              <p><span className="text-terminal">email:</span> {personalInfo.email}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### Task 9: Experience Section

**Files:**
- Create: `src/components/Experience.jsx`

**Interfaces:**
- Consumes: `experience` from `portfolioData.js`
- Produces: `<Experience />` — vertical timeline with terminal-styled entries

- [ ] **Step 1: Create Experience.jsx**

```jsx
import { motion } from 'framer-motion';
import { experience } from '../data/portfolioData';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

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
```

---

### Task 10: Skills Section

**Files:**
- Create: `src/components/Skills.jsx`

**Interfaces:**
- Consumes: `skills` from `portfolioData.js`
- Produces: `<Skills />` — two groups of animated skill bars

- [ ] **Step 1: Create Skills.jsx**

```jsx
import { motion } from 'framer-motion';
import { skills } from '../data/portfolioData';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

function SkillGroup({ title, items, inView }) {
  return (
    <div>
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
                className="h-full bg-terminal"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="min-h-screen py-20 px-4 max-w-6xl mx-auto">
      <motion.h2
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="text-2xl font-bold text-terminal mb-12 font-mono"
      >
        $ skills --all
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12">
        <SkillGroup title="[ Mainframe ]" items={skills.mainframe} inView={inView} />
        <SkillGroup title="[ Web Development ]" items={skills.webdev} inView={inView} />
      </div>
    </section>
  );
}
```

---

### Task 11: Projects Section

**Files:**
- Create: `src/components/Projects.jsx`

**Interfaces:**
- Consumes: `projects` from `portfolioData.js`
- Produces: `<Projects />` — terminal window cards with 3D tilt

- [ ] **Step 1: Create Projects.jsx**

```jsx
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
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
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-terminal/20 bg-dark">
        <span className="w-3 h-3 rounded-full bg-red-500/50" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <span className="w-3 h-3 rounded-full bg-green-500/50" />
        <span className="text-xs text-gray-500 font-mono ml-2">{project.title.toLowerCase().replace(/\s+/g, '_')}.exe</span>
      </div>

      {/* Content */}
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
```

---

### Task 12: Education Section

**Files:**
- Create: `src/components/Education.jsx`

**Interfaces:**
- Consumes: `education` from `portfolioData.js`
- Produces: `<Education />` — simple education cards

- [ ] **Step 1: Create Education.jsx**

```jsx
import { motion } from 'framer-motion';
import { education } from '../data/portfolioData';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
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
```

---

### Task 13: Contact Section

**Files:**
- Create: `src/components/Contact.jsx`

**Interfaces:**
- Consumes: `personalInfo` from `portfolioData.js`
- Produces: `<Contact />` — terminal-styled contact form + details

- [ ] **Step 1: Create Contact.jsx**

```jsx
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
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
        {/* Contact form */}
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

        {/* Contact details */}
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
```

---

### Task 14: Footer Component

**Files:**
- Create: `src/components/Footer.jsx`

**Interfaces:**
- Consumes: `personalInfo` from `portfolioData.js`
- Produces: `<Footer />` — footer with copyright and back-to-top

- [ ] **Step 1: Create Footer.jsx**

```jsx
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
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
```

---

### Task 15: App.jsx — Compose All Sections

**Files:**
- Create: `src/App.jsx`

**Interfaces:**
- Consumes: all components
- Produces: composed App rendering all sections in order

- [ ] **Step 1: Create App.jsx**

```jsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <div className="bg-dark text-terminal min-h-screen">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}
```

---

### Task 16: Build & Verify

**Files:**
- Modify: none (verification only)

- [ ] **Step 1: Build the project**

Run: `npm run build`
Expected: Vite builds without errors, output in `dist/` folder

- [ ] **Step 2: Preview the build**

Run: `npm run preview`
Expected: Production build serves correctly. Navigate through all sections, verify responsive layout, check animations load.
