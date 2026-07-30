# Portfolio Website — Vikramaditya Swain

## Overview
Personal portfolio website for Vikramaditya Swain, a Mainframe Developer (COBOL, JCL, Assembler) with web dev skills (React, JavaScript). Single-page application with a retro mainframe terminal aesthetic and modern interactive effects.

## Tech Stack
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion (scroll, parallax, typing effects)
- **Icons:** React Icons / Lucide
- **Deployment:** Netlify or GitHub Pages

## Theme & Visual Design
- **Background:** Dark (#0a0a0a / #000000) — mainframe terminal feel
- **Primary Text:** Terminal green (#00ff41 / #33ff33)
- **Accent:** Cyan / neon blue for highlights
- **Secondary BG:** Slightly lighter dark panels like terminal windows
- **Typography:** Monospace fonts — Fira Code or JetBrains Mono for headings/terminal text
- **CRT Effects:** Subtle scan lines overlay
- **Custom Cursor:** Blinking underscore like terminal cursor

## Page Sections

### 1. Hero Section
- Full-screen viewport height
- Matrix rain particle effect in background
- Terminal typing animation: `> Hello, I'm Vikramaditya Swain`
- COBOL/Assembler code displayed faintly in background
- Tagline: "Software Engineer — Mainframe Technologies"
- CTA buttons styled as terminal commands: `[View Projects]` `[Contact Me]`
- Social links (GitHub, LinkedIn, Email)

### 2. About Me
- Profile photo with terminal-style border
- Short bio combining mainframe experience + web dev passion
- Terminal "status" output section with details

### 3. Experience
- Vertical timeline with nodes
- DXC Technologies — Analyst I Software Engineer (Jan 2021–Present)
- Key achievements as terminal `$ command` bullet points
- Highlight: led conversion of 200+ Easytrieve programs to COBOL

### 4. Skills
- Two groups: Mainframe | Web Dev
- Animated skill-level indicators (bar style)
- Mainframe: COBOL, JCL, Assembler, Easytrieve, REXX, VSAM, LIFECOMM, Abend-AID, File-AID, DB2
- Web Dev: React, JavaScript, Java, SQL

### 5. Projects
- Card grid (3-col desktop, 1-col mobile)
- Cards styled as terminal windows with title bar (min/max/close buttons)
- Each card: project name, description, tech tags, link
- Projects:
  1. Gajanana Interior Homes — live production site
  2. Restaurant Management System (WIP)
  3. IMDb Movie Clone (React + Node.js)
  4. Amazon Cart Clone (React + JavaScript)
  5. Custom Drones — built and sold
- 3D tilt effect on hover, click for detail modal

### 6. Education
- Cards showing:
  - B.Tech in ETC, ITER Bhubaneswar (2016–2020)
  - Higher Secondary, Kendriya Vidyalaya (2016)

### 7. Contact
- Terminal-styled contact form with command-line aesthetic
- Form service (Formspree / EmailJS) for actual email delivery
- Contact details displayed:
  - Phone: +91 7008938983
  - Email: swainvikramaditya99@gmail.com
  - LinkedIn: www.linkedin.com/in/vikramadityaswain
  - Location: Khandagiri, Bhubaneswar, India
- "Available for freelance / collaboration" note

### 8. Footer
- Copyright notice
- "Back to top" button
- Social links

## Advanced Features
- Matrix rain particle effect (canvas-based)
- Parallax scrolling (speed differences per section)
- Typing animation in hero
- Scroll-triggered fade/slide animations (Intersection Observer + Framer Motion)
- 3D tilt effect on project cards
- CRT scan lines (CSS overlay)
- Custom terminal cursor
- Smooth scrolling navigation
- Responsive (mobile-first)

## Navigation
- Fixed navbar at top with section links
- Highlight active section on scroll
- Hamburger menu on mobile

## Data Flow
- All portfolio data stored in a single JS config file (`portfolioData.js`)
- Sections render from data — easy to update resume info, projects, skills

## File Structure (planned)
```
portfolio/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── public/
│   └── profile.jpg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── data/
│   │   └── portfolioData.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Education.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── effects/
│   │   ├── MatrixRain.jsx
│   │   ├── TypingAnimation.jsx
│   │   └── TiltCard.jsx
│   └── hooks/
│       └── useScrollAnimation.js
```
