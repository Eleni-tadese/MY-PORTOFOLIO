export const nav = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export const experience = [
  {
    role: "Frontend Engineer",
    org: "A2SV Internship — SraHub",
    period: "2026 — Present",
    desc: "Designing and building pages across a 5-engineer Next.js team on SraHub, a live job board connecting talent with employers across Ethiopia.",
  },
  {
    role: "AI Software Evaluation Contributor",
    org: "AfterQuery — Remote, Freelance",
    period: "05/2026 — Present",
    desc: "Authoring software engineering benchmark tasks and evaluating AI-generated code for correctness and quality.",
  },
  {
    role: "AI & Computer Vision Intern",
    org: "Ethronics Institute of Robotics and Autonomous Systems",
    period: "07/2025 — 09/2025",
    desc: "Built an Amharic OCR dataset and text-image recognition pipelines, improving recognition accuracy through preprocessing.",
  },
];

export const education = {
  degree: "Computer Science and Engineering",
  school: "Adama Science and Technology University",
  period: "2020 — Present",
  coursework: [
    "Data Structures & Algorithms",
    "Artificial Intelligence",
    "Object-Oriented Programming",
    "Database Management Systems",
    "Computer Networking",
  ],
};

export const skillGroups = [
  {
    title: "Frontend",
    desc: "Building modern, responsive interfaces",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
  },
  {
    title: "Backend",
    desc: "Server-side logic and APIs",
    items: ["Node.js", "Express", "Django", "FastAPI", "REST APIs"],
  },
  {
    title: "Languages & Data",
    desc: "Core languages and storage",
    items: ["Python", "JavaScript", "C++", "PostgreSQL", "MySQL"],
  },
  {
    title: "AI & Tools",
    desc: "Applied ML and dev workflow",
    items: ["PyTorch", "OpenCV", "Git", "GitHub", "Software Testing"],
  },
];

export const featuredProjects = [
  {
    title: "Job Match Tracker",
    tag: "Full-stack · AI resume matching",
    desc: "A job application tracker with an AI resume matcher that scores fit using TF-IDF/cosine similarity, plus live job discovery via the Remotive API.",
    stack: ["FastAPI", "SQLAlchemy", "Next.js", "TypeScript", "Tailwind"],
    live: null as string | null,
    code: "https://github.com/Eleni-tadese/job-match-tracker",
    image: "/f/f1.jpg",
  },
  {
    title: "Finot Gibi Gubae Management System",
    tag: "2nd Place — AGT-HUB Hackathon",
    desc: "A full-stack community platform for student management, donation tracking, anonymous spiritual counseling, and service groups — built in a 2-week hackathon.",
    stack: ["React", "Django", "PostgreSQL", "Chapa API"],
    live: "https://finot.moges.dev",
    code: null as string | null,
    image: "/f/f2.jpg",
  },
  {
    title: "Evangadi Forum",
    tag: "Full-stack · Q&A platform",
    desc: "An interactive Q&A platform with secure authentication and full CRUD for questions and answers, backed by MySQL.",
    stack: ["React", "Node.js", "Express", "MySQL"],
    live: "https://evangadi-forum-bci5-pi.vercel.app/login",
    code: "https://github.com/Eleni-tadese/evangadi-forum",
    image: "/e/e1.jpg",
  },
];

export const otherProjects = [
  {
    title: "Netflix Clone",
    stack: "React, Firebase, TMDB API",
    live: "https://n-project-2025-netflix.vercel.app/",
    code: "https://github.com/Eleni-tadese/N-Project-2025-netflix-.git",
  },
  {
    title: "Amazon Clone",
    stack: "React, Node.js, Express, MySQL",
    live: "https://my-amazon-clonee.netlify.app/",
    code: "https://github.com/Eleni-tadese/My-Amazon-Clone-Project.git",
  },
  {
    title: "Apple Clone",
    stack: "Vite, React, Bootstrap",
    live: "https://friendly-lily-212661.netlify.app/",
    code: "https://github.com/Eleni-tadese/Apple-React.git",
  },
  {
    title: "SraHub",
    stack: "Next.js, Redux, Go",
    live: "https://srahub-web.firaolkef.workers.dev/",
    code: null as string | null,
  },
];

export const socials = {
  email: "elenitade1221@gmail.com",
  phone: "+251910278021",
  location: "Adama, Ethiopia",
  github: "https://github.com/Eleni-tadese",
  linkedin: "https://www.linkedin.com/in/eleni-tadese-",
  leetcode: "https://leetcode.com/u/Eleni-tadese/",
  codeforces: "https://codeforces.com/profile/elenitadese",
  cv: "https://drive.google.com/file/d/1A3-151syWW1739GozCVSiFqlqzMyT4m4/view?usp=sharing",
};
