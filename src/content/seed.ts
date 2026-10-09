import type { SiteContent } from "./types";

/**
 * Seed content: inserted into the database by `npm run db:seed`, and used as
 * the fallback when no database is configured or reachable at build time.
 */
export const seedContent: SiteContent = {
  profile: {
    name: "Eleni Tadese",
    roles: ["Software Engineer", "Full-Stack Developer", "AI Software Evaluation"],
    intro:
      "I build responsive, full-stack web applications, from the interface people use to the backend and database that power it. I pick up new tools quickly and adapt my approach to what each project needs.",
    focus: ["full-stack development", "AI software evaluation", "computer vision"],
    services: ["New applications", "Feature development", "API integration", "Bug fixes"],
    a2sv: "A2SV (Africa to Silicon Valley) Trainee — sharpening Data Structures & Algorithms through competitive programming.",
    photo: "/profile.photo.jpg",
    cv: "https://drive.google.com/file/d/1A3-151syWW1739GozCVSiFqlqzMyT4m4/view?usp=sharing",
  },
  socials: {
    email: "elenitade1221@gmail.com",
    github: "https://github.com/Eleni-tadese",
    linkedin: "https://www.linkedin.com/in/eleni-tadese-",
    leetcode: "https://leetcode.com/u/Eleni-tadese/",
    codeforces: "https://codeforces.com/profile/elenitadese",
    upwork: null,
  },
  experience: [
    {
      role: "AI Software Evaluation Contributor",
      org: "AfterQuery Experts",
      mode: "Remote · Freelance",
      start: "05/2026",
      end: null,
      summary: "Authoring software engineering benchmarks and evaluating AI-generated code.",
      bullets: [
        "Created and analyzed software engineering projects that assess AI model capabilities.",
        "Created coding, debugging, and feature development tasks based on Git and Python.",
        "Developed and analyzed automated unit tests that assess the quality of benchmarks.",
        "Analyzed AI-created code based on correctness, instruction compliance, and software quality.",
        "Collaborated on creating benchmark datasets to evaluate large language models.",
      ],
    },
    {
      role: "Frontend Engineer",
      org: "A2SV Internship — SraHub",
      mode: "Remote · Team Project",
      start: "2026",
      end: null,
      summary: "Building pages for SraHub, a live job board, in a 5-engineer Next.js team.",
      bullets: [
        "Designed and built multiple pages as part of a 5-engineer Next.js frontend team on SraHub, a live job board connecting talent with employers across Ethiopia.",
        "Collaborated across a 17-contributor engineering org using conventional commits, branch-per-feature workflow, and domain-scoped CI pipelines.",
      ],
    },
    {
      role: "AI & Computer Vision Intern",
      org: "Ethronics Institute of Robotics and Autonomous Systems",
      mode: "Internship",
      start: "07/2025",
      end: "09/2025",
      summary: "Built an Amharic OCR dataset and text-recognition pipelines.",
      bullets: [
        "Built an Amharic OCR dataset for machine learning.",
        "Developed text-image recognition pipelines for Amharic character recognition.",
        "Annotated and validated OCR datasets used for AI model training.",
        "Assisted in training and evaluating computer vision models.",
        "Improved recognition accuracy through data preprocessing and quality assessment.",
        "Worked across the ML lifecycle from dataset preparation through evaluation.",
      ],
    },
  ],
  education: [
    { degree: "Computer Science and Engineering", school: "Adama Science and Technology University" },
  ],
  certificates: [
    { title: "Full Stack Web Development (MERN)", issuer: "Evangadi", url: null },
    { title: "Programming Fundamentals", issuer: "Udacity", url: null },
  ],
  skillGroups: [
    { title: "Programming", items: ["Python", "JavaScript", "TypeScript", "C++", "SQL"] },
    { title: "Frontend", items: ["React", "Next.js", "Redux", "HTML5", "CSS3", "Tailwind CSS"] },
    { title: "Backend", items: ["Node.js", "Express.js", "Django", "FastAPI", "REST APIs"] },
    { title: "Databases", items: ["PostgreSQL", "MySQL", "SQLite", "SQLAlchemy", "Prisma"] },
    {
      title: "AI & Tools",
      items: ["Git", "GitHub", "OpenCV", "PyTorch", "Computer Vision", "Software Testing", "AI Evaluation"],
    },
  ],
  projects: [
    {
      featured: true,
      slug: "finot",
      title: "Finot",
      subtitle: "Gibi Gubae Management System",
      tag: "2nd Place — AGT-HUB Hackathon",
      summary:
        "A platform that replaces paper lists and spreadsheets for a student fellowship: registration, courses, attendance, mentorship families, private counseling and donations, in English, Amharic and Afaan Oromoo.",
      metrics: ["8 roles", "3 languages", "458 tests"],
      role: "Full-stack developer. Built the Django REST API, the React and TypeScript interface, the database design, Docker setup, tests and CI.",
      caseStudy: {
        problem:
          "The student fellowship ran registration, courses, attendance, mentorship families, private counseling and donations on paper lists and spreadsheets.",
        approach:
          "One platform for the whole fellowship, built in a 2-week hackathon and available in English, Amharic and Afaan Oromoo. A Django REST API enforces every permission on the server, and a React and TypeScript interface serves each of the 8 roles.",
      },
      highlights: [
        "Role-based access for 8 roles, enforced on the server, with JWT authentication and rate limiting.",
        "Bulk registration from Excel with printable login slips, plus undo for imports, family distribution and yearly rollover.",
        "Private questions routed to the right counselor, and a Chapa donation integration.",
        "458 automated tests, Docker and CI.",
      ],
      stack: ["React", "TypeScript", "Tailwind CSS", "Django REST Framework", "PostgreSQL", "Docker", "Chapa API"],
      live: "https://finot.pages.dev",
      code: "https://github.com/AGT-HUB-ASTU-Gibi-Gubaie/hackathon-2026-HIRUY",
      images: [
        { src: "/projects/finot-home.webp", alt: "Finot home page" },
        { src: "/projects/finot-student.webp", alt: "Finot student dashboard with events, attendance and family" },
        { src: "/projects/finot-admin.webp", alt: "Finot admin overview with users, families, events and donations" },
      ],
    },
    {
      featured: true,
      slug: "srahub",
      title: "SraHub",
      subtitle: "A2SV Internship · Team Project",
      tag: "Live job board",
      summary:
        "A live job board connecting talent with employers across Ethiopia, built during the A2SV internship.",
      role: "Full-stack developer on the team: Next.js and Redux on the frontend, plus backend work in Go.",
      highlights: [
        "Worked in a 17-contributor organization using feature branches, pull requests, conventional commits and CI.",
      ],
      stack: ["Next.js", "Redux", "Go"],
      live: "https://srahub-web.firaolkef.workers.dev/",
      code: "https://github.com/A2SV-ASTU/srahub",
      metrics: ["17 contributors", "Live in production"],
      images: [
        { src: "/projects/srahub-home.webp", alt: "SraHub home page" },
        { src: "/projects/srahub-dashboard.webp", alt: "SraHub job seeker dashboard with open positions" },
      ],
    },
    {
      featured: true,
      slug: "evangadi-forum",
      title: "Evangadi Forum",
      subtitle: "Q&A community platform",
      tag: "Full-stack · Team project",
      summary:
        "A community Q&A forum where users post questions, answer others and manage their own content.",
      highlights: [
        "Secure authentication with full create, edit and delete for questions and answers.",
        "React and Tailwind interface with a Node.js, Express and MySQL backend.",
        "Built with a team during the Evangadi Full Stack program.",
      ],
      stack: ["React", "Tailwind CSS", "Node.js", "Express", "MySQL"],
      live: "https://evangadi-forum-bci5-pi.vercel.app/login",
      code: "https://github.com/Eleni-tadese/evangadi-forum",
      images: [
        { src: "/projects/evangadi-list.webp", alt: "Evangadi Forum question list with search and pagination" },
        { src: "/projects/evangadi-question.webp", alt: "Evangadi Forum question with answers, and edit and delete on your own answer" },
      ],
    },
    {
      featured: true,
      slug: "job-match-tracker",
      title: "Job Match Tracker",
      subtitle: "AI resume matching",
      tag: "Full-stack · NLP",
      summary: "Tracks your job applications and scores how well your resume fits each role.",
      highlights: [
        "Resume matching with TF-IDF and cosine similarity.",
        "Live job discovery through the Remotive API.",
        "Application tracking with notes and status, tested with pytest.",
      ],
      stack: ["FastAPI", "SQLAlchemy", "SQLite", "Next.js", "TypeScript", "Tailwind CSS"],
      live: null,
      code: "https://github.com/Eleni-tadese/job-match-tracker",
      images: [],
    },
  ],
};
