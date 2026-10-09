export type Shot = { src: string; alt: string };

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  summary: string;
  highlights: string[];
  stack: string[];
  live: string | null;
  code: string | null;
  images: Shot[];
};

export const profile = {
  name: "Eleni Tadese",
  roles: ["Software Engineer", "Full-Stack Developer", "AI Software Evaluation"],
  photo: "/profile.photo.jpg" as string | null,
  intro:
    "I build responsive, full-stack web applications, from the interface people use to the backend and database that power it. I pick up new tools quickly and adapt my approach to what each project needs.",
  /** Rendered as: "Software Engineer working across A, B, and C." */
  focus: ["full-stack development", "AI software evaluation", "computer vision"],
  a2sv: "A2SV (Africa to Silicon Valley) Trainee — sharpening Data Structures & Algorithms through competitive programming.",
  services: ["New applications", "Feature development", "API integration", "Bug fixes"],
};

export const nav = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export const experience = [
  {
    role: "AI Software Evaluation Contributor",
    org: "AfterQuery Experts",
    mode: "Remote · Freelance",
    period: "05/2026 — Present",
    current: true,
    summary: "Authoring software engineering benchmarks and evaluating AI-generated code.",
  },
  {
    role: "Frontend Engineer",
    org: "A2SV Internship — SraHub",
    mode: "Remote · Team Project",
    period: "2026 — Present",
    current: true,
    summary: "Building pages for SraHub, a live job board, in a 5-engineer Next.js team.",
  },
  {
    role: "AI & Computer Vision Intern",
    org: "Ethronics Institute of Robotics and Autonomous Systems",
    mode: "Internship",
    period: "07/2025 — 09/2025",
    current: false,
    summary: "Built an Amharic OCR dataset and text-recognition pipelines.",
  },
];

export const education = {
  degree: "Computer Science and Engineering",
  school: "Adama Science and Technology University",
};

export const certificates = [
  { title: "Full Stack Web Development (MERN)", issuer: "Evangadi" },
  { title: "Programming Fundamentals", issuer: "Udacity" },
];

export const skillGroups = [
  { title: "Programming", items: ["Python", "JavaScript", "TypeScript", "C++", "SQL"] },
  { title: "Frontend", items: ["React", "Next.js", "Redux", "HTML5", "CSS3", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Express.js", "Django", "FastAPI", "REST APIs"] },
  { title: "Databases", items: ["PostgreSQL", "MySQL", "SQLite", "SQLAlchemy", "Prisma"] },
  {
    title: "AI & Tools",
    items: ["Git", "GitHub", "OpenCV", "PyTorch", "Computer Vision", "Software Testing", "AI Evaluation"],
  },
];

export const projects: Project[] = [
  {
    slug: "finot",
    title: "Finot",
    subtitle: "Gibi Gubae Management System",
    tag: "2nd Place — AGT-HUB Hackathon",
    summary:
      "A fellowship management platform built in a 2-week hackathon — live in English, Amharic and Afaan Oromoo.",
    highlights: [
      "Students, attendance, mentorship families, counseling Q&A and donations in one place.",
      "Role-based access for 8 roles, with JWT authentication and rate limiting.",
      "Chapa payments, notifications, and automated tests with CI.",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Django REST Framework", "PostgreSQL", "Docker", "Chapa API"],
    live: "https://finot.pages.dev",
    code: "https://github.com/AGT-HUB-ASTU-Gibi-Gubaie/hackathon-2026-HIRUY",
    images: [
      { src: "/projects/finot-landing.jpg", alt: "Finot landing page" },
      { src: "/projects/finot-admin.jpg", alt: "Finot admin overview" },
      { src: "/projects/finot-dashboard.jpg", alt: "Finot student dashboard" },
    ],
  },
  {
    slug: "srahub",
    title: "SraHub",
    subtitle: "A2SV Internship · Team Project",
    tag: "Live job board",
    summary: "A live job board connecting talent with employers across Ethiopia.",
    highlights: [
      "Built multiple pages in a 5-engineer Next.js frontend team.",
      "Shipped inside a 17-contributor org with conventional commits and CI.",
    ],
    stack: ["Next.js", "Redux", "Go"],
    live: "https://srahub-web.firaolkef.workers.dev/",
    code: "https://github.com/A2SV-ASTU/srahub",
    images: [{ src: "/projects/srahub-landing.jpg", alt: "SraHub landing page" }],
  },
  {
    slug: "evangadi-forum",
    title: "Evangadi Forum",
    subtitle: "Q&A community platform",
    tag: "Full-stack · Community",
    summary: "A community Q&A forum to ask, answer and learn together.",
    highlights: [
      "Secure authentication with full CRUD for questions and answers.",
      "Responsive React + Tailwind interface backed by MySQL.",
    ],
    stack: ["React", "Tailwind CSS", "MySQL"],
    live: "https://evangadi-forum-bci5-pi.vercel.app/login",
    code: "https://github.com/Eleni-tadese/evangadi-forum",
    images: [
      { src: "/projects/forum-login.png", alt: "Evangadi Forum login page" },
      { src: "/projects/forum-how-it-works.png", alt: "Evangadi Forum how-it-works page" },
    ],
  },
  {
    slug: "job-match-tracker",
    title: "Job Match Tracker",
    subtitle: "AI resume matching",
    tag: "Full-stack · AI",
    summary: "A job tracker with an AI resume matcher that scores your fit for each role.",
    highlights: [
      "Resume matching with TF-IDF / cosine similarity.",
      "Live job discovery via the Remotive API.",
      "Application tracking with notes, tested with pytest.",
    ],
    stack: ["FastAPI", "SQLAlchemy", "SQLite", "Next.js", "TypeScript", "Tailwind CSS"],
    live: null,
    code: "https://github.com/Eleni-tadese/job-match-tracker",
    images: [],
  },
];

export const socials = {
  email: "elenitade1221@gmail.com",
  github: "https://github.com/Eleni-tadese",
  linkedin: "https://www.linkedin.com/in/eleni-tadese-",
  leetcode: "https://leetcode.com/u/Eleni-tadese/",
  codeforces: "https://codeforces.com/profile/elenitadese",
  /** Add your public Upwork profile URL to show it in Contact. */
  upwork: null as string | null,
  cv: "https://drive.google.com/file/d/1A3-151syWW1739GozCVSiFqlqzMyT4m4/view?usp=sharing",
};

/** Projects whose stack mentions the given skill (e.g. "React" ↔ "React.js"). */
export function projectsUsing(skill: string) {
  const norm = (s: string) => s.toLowerCase().replace(/\.js$/, "").trim();
  const k = norm(skill);
  return projects
    .filter((p) =>
      p.stack.some((s) => norm(s) === k || norm(s).startsWith(k + " "))
    )
    .map((p) => p.title);
}
