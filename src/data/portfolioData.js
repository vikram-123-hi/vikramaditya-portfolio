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
    { name: 'Assembler', level: 50 },
    { name: 'Easytrieve', level: 85 },
    { name: 'REXX', level: 35 },
    { name: 'VSAM', level: 85 },
    { name: 'LIFECOMM', level: 80 },
    { name: 'Abend-AID', level: 75 },
    { name: 'File-AID', level: 75 },
    { name: 'DB2', level: 20 },
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
    details: 'Built a complete production-grade website for an interior design business. Features include a customer-facing portfolio with gallery, service listings, contact form, and an admin panel for managing content, client inquiries, and project updates.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    date: '2026',
    features: ['Customer-facing portfolio', 'Admin content management', 'Contact form with email', 'Responsive design', 'Gallery with image optimization'],
    link: 'https://gajananainteriorhomes.in',
    status: 'live',
  },
  {
    title: 'Restaurant Management System',
    description: 'A comprehensive restaurant management system currently under development.',
    details: 'A full-stack restaurant management platform covering menu management, order tracking, billing, and customer analytics. Built with role-based access for admin, staff, and customers.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    date: '2026',
    features: ['Menu management', 'Order tracking system', 'Billing & invoicing', 'Customer analytics', 'Role-based access'],
    link: null,
    status: 'wip',
  },
  {
    title: 'IMDb Movie Clone',
    description: 'An IMDb-style movie browsing clone built with React and Node.js.',
    details: 'A movie discovery platform that fetches real-time movie data from TMDB API. Users can browse trending movies, search by title, view ratings, cast details, and save favorites.',
    tech: ['React', 'Node.js', 'TMDB API', 'CSS'],
    date: '2022',
    features: ['Movie search & browse', 'Trending movies feed', 'Ratings & reviews', 'Favorites list', 'Responsive UI'],
    link: null,
    status: 'completed',
  },
  {
    title: 'Amazon Shopping Cart Clone',
    description: 'An Amazon-style shopping cart application with React and JavaScript.',
    details: 'A feature-rich e-commerce cart simulation with product listing, cart management, quantity controls, price calculation, and local storage persistence.',
    tech: ['React', 'JavaScript', 'CSS', 'LocalStorage'],
    date: '2022',
    features: ['Product listing & search', 'Add/remove cart items', 'Quantity controls', 'Price calculation', 'LocalStorage persistence'],
    link: null,
    status: 'completed',
  },
  {
    title: 'Custom FPV Drones',
    description: 'Building custom FPV drones from scratch — 1 inch, 3.5 inch cinewhoop, and 5 inch freestyle builds.',
    details: 'Designed and built custom FPV drones of various sizes including 1-inch micro, 3.5-inch cinewhoop, and 5-inch freestyle builds. Configured Betaflight firmware with custom PID tuning for optimal flight performance. Supports both analog (VTX) and digital (DJI/HDZero) video systems with features like Return-to-Home, custom flight paths, and immersive FPV flight experience.',
    tech: ['Betaflight', 'PID Tuning', 'BLHeli ESC', 'FPV Components', 'Electronics'],
    date: '2024-2025',
    features: ['Custom 1-inch, 3.5-inch cinewhoop & 5-inch freestyle builds', 'Betaflight firmware configuration', 'Custom PID tuning', 'Return-to-Home (RTH)', 'Custom flight paths', 'Analog & digital video systems'],
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
