export interface Project {
  name: string
  description: string
  tags: string[]
  github: string
  youtube?: string
  screenshot: string
  alt: string
}

export const projects: Project[] = [
  {
    name: 'BioTwin — Personal Health Twin',
    description:
      'A conversational personal health twin that turns wearable data into clear readiness insights, spoken answers, and calendar-aware workout planning. Built for HackRice 16 at Rice University in 2026.',
    tags: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Three.js', 'Gemini', 'ElevenLabs', 'Garmin API'],
    github: 'https://github.com/HackRice2026/BioTwin',
    youtube: 'https://youtu.be/T8H4S3MSeT4',
    screenshot: '/assets/projects/biotwin.png',
    alt: 'BioTwin personal health dashboard with a digital twin and voice assistant',
  },
  {
    name: 'Reel Studio - Autonomous Cinematic Reel Engine',
    description:
      'An autonomous AI pipeline that turns real estate listing photos into fully cinematic, beat-synced videos ready for YouTube, Instagram, and TikTok in under 5 minutes. Built at the AITX x Codex Hackathon in Austin, TX. Three AI agents, ImageAnalyzer, ShotMatcher, and StoryboardBuilder, orchestrate photo classification, narrative storyboard sequencing, and cinematic prompt selection. FAL Kling v1.6 generates video clips per photo, librosa extracts BPM for beat-synced cuts, and FFmpeg assembles the final 1080p MP4.',
    tags: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'GPT-4o Vision', 'FAL Kling', 'FFmpeg', 'librosa', 'SQLite', 'Tailwind CSS'],
    github: 'https://github.com/AITX-codex-hackathon/Reel_Studio',
    youtube: 'https://youtu.be/6LO9okS1TD0',
    screenshot: '/assets/projects/reelstudio.png',
    alt: 'ReelStudio AI real estate video generator',
  },
  {
    name: 'FAANG - Interview Prep AI',
    description:
      'A real-time AI mock interview platform simulating the full FAANG interview experience. Features a voice AI interviewer powered by Gemini Live API, a photorealistic animated avatar with real-time lip-sync, a live Monaco code editor that syncs code to the AI continuously, and a post-interview feedback engine scoring communication, code quality, and engagement with a hire or no-hire decision.',
    tags: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'Gemini Live API', 'Firebase', 'Monaco Editor'],
    github: 'https://github.com/sh1vendra/Interview_Prep',
    youtube: 'https://youtu.be/vKIr1-N978E',
    screenshot: '/assets/projects/faang_prep.png',
    alt: 'FAANG Prep AI mock interview platform',
  },
  {
    name: 'Sortify — AI Document Organizer',
    description:
      'AI-powered document organization and retrieval platform. Automatically categorizes academic files and enables semantic search through a RAG pipeline with an AI chat assistant.',
    tags: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'FastAPI', 'PostgreSQL', 'PGVector', 'Sentence Transformers'],
    github: 'https://github.com/sh1vendra/Sortify',
    screenshot: '/assets/projects/sortify.png',
    alt: 'Sortify application dashboard',
  },
  {
    name: 'TelcoGuard - Fraud Detection Platform',
    description:
      'Engineered fraud detection engine flagging suspicious porting requests across 3 vectors, cutting manual review by ~80%. Built telecom number management platform with role-based access, automated porting workflows, and audit logging. Implemented 15+ REST endpoints with JWT authentication, OpenAPI docs, dockerized and deployed to Render + Vercel.',
    tags: ['React', 'Node.js', 'MongoDB', 'JWT', 'Git'],
    github: 'https://github.com/sh1vendra/TelcoGuard',
    screenshot: '/assets/projects/TelcoGuard.png',
    alt: 'TelcoGuard fraud detection platform',
  },
  {
    name: 'The Grid - Arcade Tic-Tac-Toe',
    description:
      'Commercial-grade Tic-Tac-Toe with retro neon arcade aesthetic. Features 3 difficulty levels including an unbeatable Minimax AI, 8-bit sound effects via Web Audio API, and neon particle animations.',
    tags: ['React 19', 'Vite', 'Tailwind CSS', 'Minimax', 'Web Audio API', 'Canvas', 'Firebase'],
    github: 'https://github.com/sh1vendra/Tic_Tac_Toe',
    screenshot: '/assets/projects/tictactoe.png',
    alt: 'Arcade Tic-Tac-Toe game interface',
  },
  {
    name: 'GTM Content Agent',
    description:
      'An AI-powered GTM content generation agent built on Cloudflare\'s edge infrastructure. Automates case study writing, sales enablement briefs, and event messaging for B2B tech teams. Features a chat interface where the agent asks clarifying questions and generates structured, metric-driven content instantly. Persistent conversation state via Durable Objects maintains full session context across turns.',
    tags: ['TypeScript', 'Cloudflare Workers', 'Workers AI', 'Durable Objects', 'Cloudflare Agents SDK', 'Llama 3.3 70B', 'Vite'],
    github: 'https://github.com/sh1vendra/cf_ai_gtm_agent',
    screenshot: '/assets/projects/gtm_agent.png',
    alt: 'GTM Content Agent chat interface',
  },
  {
    name: 'Weather App',
    description:
      'Real-time weather application with 5-day forecast, geolocation detection, detailed metrics (humidity, wind, pressure, sunrise/sunset), and dynamic backgrounds matching current conditions.',
    tags: ['React 18', 'TypeScript', 'OpenWeatherMap API', 'CSS Animations', 'Vercel'],
    github: 'https://github.com/sh1vendra/Weather_App',
    screenshot: '/assets/projects/weather.png',
    alt: 'Weather App showing forecast',
  },
  {
    name: 'Space Invaders - Save the World',
    description:
      'Modern Java implementation of the classic Space Invaders arcade game with customizable graphics, dynamic music system, character/enemy selection, and progressive difficulty scaling.',
    tags: ['Java SE', 'Swing', 'AWT', 'Java Sound API'],
    github: 'https://github.com/sh1vendra/Space_Invaders',
    screenshot: '/assets/projects/spaceinvaders.png',
    alt: 'Space Invaders gameplay',
  },
  {
    name: 'Soma - Physique Analyzer',
    description:
      'Modern, interactive BMI Calculator with real-time computation, metric/imperial units, health scale visualization, healthy weight range estimates, and recent results tracking with a mini chart.',
    tags: ['React', 'TypeScript'],
    github: 'https://github.com/sh1vendra/BMI_Calculator',
    screenshot: '/assets/projects/bmi.png',
    alt: 'BMI Calculator application',
  },
]

export const skills = [
  {
    category: 'Languages',
    items: [
      { label: 'Python', icon: 'fab fa-python' },
      { label: 'JavaScript', icon: 'fab fa-js' },
      { label: 'TypeScript', icon: 'devicon-typescript-plain' },
      { label: 'Java', icon: 'fab fa-java' },
      { label: 'C', icon: 'devicon-c-plain' },
      { label: 'C++', icon: 'devicon-cplusplus-plain' },
      { label: 'SQL', icon: 'fas fa-database' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { label: 'React', icon: 'fab fa-react' },
      { label: 'Next.js', icon: 'devicon-nextjs-plain' },
      { label: 'HTML5', icon: 'fab fa-html5' },
      { label: 'CSS3', icon: 'fab fa-css3-alt' },
      { label: 'Tailwind CSS', icon: 'devicon-tailwindcss-original' },
      { label: 'Bootstrap', icon: 'fab fa-bootstrap' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { label: 'Node.js', icon: 'fab fa-node-js' },
      { label: 'Express.js', icon: 'devicon-express-original' },
      { label: 'FastAPI', icon: 'devicon-fastapi-plain' },
      { label: 'REST API', icon: 'fas fa-plug' },
      { label: 'GraphQL', icon: 'devicon-graphql-plain' },
      { label: 'Redis', icon: 'devicon-redis-plain' },
      { label: 'JWT', icon: 'fas fa-key' },
      { label: 'Pydantic', icon: 'fas fa-shield-alt' },
    ],
  },
  {
    category: 'Databases',
    items: [
      { label: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
      { label: 'MySQL', icon: 'devicon-mysql-plain' },
      { label: 'MongoDB', icon: 'devicon-mongodb-plain' },
      { label: 'PGVector', icon: 'fas fa-vector-square' },
      { label: 'Pinecone', icon: 'fas fa-seedling' },
      { label: 'Supabase', icon: 'devicon-supabase-plain' },
    ],
  },
  {
    category: 'Tools & Platforms',
    items: [
      { label: 'Git', icon: 'fab fa-git-alt' },
      { label: 'GitHub', icon: 'fab fa-github' },
      { label: 'Linux', icon: 'fab fa-linux' },
      { label: 'VS Code', icon: 'devicon-vscode-plain' },
      { label: 'Docker', icon: 'fab fa-docker' },
      { label: 'Jira', icon: 'fab fa-jira' },
      { label: 'Jest', icon: 'devicon-jest-plain' },
      { label: 'Vite', icon: 'devicon-vitejs-plain' },
      { label: 'Firebase', icon: 'devicon-firebase-plain' },
      { label: 'Vercel', icon: 'devicon-vercel-original' },
      { label: 'AWS', icon: 'fab fa-aws' },
      { label: 'RAG', icon: 'fas fa-brain' },
      { label: 'LangChain', icon: 'fas fa-link' },
      { label: 'OpenAI API', icon: 'fas fa-robot' },
      { label: 'Hugging Face', icon: 'fas fa-smile' },
      { label: 'Claude AI', icon: 'fas fa-microchip' },
      { label: 'Gemini API', icon: 'fas fa-gem' },
    ],
  },
]

export const experience = [
  {
    role: 'AI Researcher',
    company: 'Texas State University',
    period: 'June 2026 – August 2026',
    bullets: [
      'Benchmarked 10+ LLMs (GPT-4, Claude, Llama, Gemini) using Python to automate prompt-based evaluations',
      'Built an evaluation pipeline using OpenAI and Anthropic APIs to test outputs against 8+ rubrics',
      'Developed a weighted scoring framework in Python and Pandas to rank AI models by department-specific use cases',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Orgware Construct Software Development',
    period: 'June 2025 – August 2025',
    bullets: [
      'Engineered discount systems in Node.js/Express with validation logic for percentage-off, flat discounts, and expiry rules, integrating real-time discount previews on the React.js storefront, driving 20% subscription growth',
      'Architected RESTful APIs with Firebase Authentication, implementing Express middleware for JWT token verification, role-based access control, and input sanitization, securing endpoints serving 1000+ active users',
      'Wrote unit tests using Jest for coupon validation and API endpoints, achieving 80%+ code coverage across core modules',
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'Global Hub Education Network',
    period: 'May 2023 – August 2023',
    bullets: [
      'Developed 5+ reusable React components with responsive layouts and deployed across 3 production pages',
      'Built testimonial system connecting React to MySQL via REST APIs, enabling CRUD management for 500+ visitors',
      'Shipped 10+ pull requests via Git branching and code reviews, maintaining 0 merge conflicts across 3-month sprint cycle',
    ],
  },
]

export const hobbies = [
  { label: 'Fitness', emoji: '🏋️' },
  { label: 'Nutrition', emoji: '🥦' },
  { label: 'Boxing', emoji: '🥊' },
  { label: 'Soccer', emoji: '⚽' },
  { label: 'Swimming', emoji: '🏊' },
  { label: 'Reading Books', emoji: '📚' },
  { label: 'Meditation', emoji: '🧘' },
]

export const about = {
  coursework: [
    'Data Structures & Algorithms (C++) - "A"',
    'Object-Oriented Programming (Java) - "A"',
    'Software Engineering (JavaScript & Python) - "A"',
    'Software Development (MERN) - "A"',
    'Machine Learning (Python) - "A"',
    'Computer Ethics - "A"',
    'Discrete Mathematics I - "A"',
    'Discrete Mathematics II - "A"',
    'Calculus I - "A"',
    'Calculus II - "A"',
    'Calculus III - "A"',
  ],
  achievements: [
    "President's List Recognition",
    "Dean's List Recognition",
    'Texas State Achievement Scholarship',
    'Best Student Employee Award',
    'Computer Science Excellence Award',
    'Hackathon Winner',
  ],
  involvement: [
    'IEEE TXST',
    'ACM AI',
    'Alpha Lambda Delta Honor Society',
    'Bobcat Build Student Organization',
    'Google Developers Group',
    'Technical Interview Prep at TXST',
    'Honors College (Coordinator)',
  ],
}
