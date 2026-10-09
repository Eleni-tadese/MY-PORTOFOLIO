/**
 * Shape of everything the public site renders. Loaded from Postgres
 * (see src/lib/content.ts) and falls back to src/content/seed.ts.
 */

export type Shot = { src: string; alt: string; publicId?: string | null };

export type Project = {
  id?: number;
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  summary: string;
  highlights: string[];
  stack: string[];
  /** Short outcome numbers shown under the title, e.g. "458 tests". */
  metrics?: string[];
  /** What I personally did on the project. */
  role?: string | null;
  /** Long-form case study at /projects/[slug]. */
  caseStudy?: {
    problem: string;
    approach: string;
    /** Things I'd change next time; the section is hidden until filled in. */
    improve?: string[];
  } | null;
  live: string | null;
  code: string | null;
  images: Shot[];
  /** Featured projects appear in the homepage carousel. */
  featured: boolean;
  /** Read-only demo login shown in the case study. */
  demo?: { email: string; password: string; note?: string | null } | null;
  /** Short screen recording, played in the case study. */
  video?: { src: string; poster?: string | null } | null;
};

export type Experience = {
  id?: number;
  role: string;
  org: string;
  mode: string;
  /** Free-text dates, e.g. "05/2026". An empty end means "Present". */
  start: string;
  end: string | null;
  summary: string;
  bullets: string[];
};

export type SkillGroup = { id?: number; title: string; items: string[] };
export type Certificate = { id?: number; title: string; issuer: string; url: string | null };
export type Education = { id?: number; degree: string; school: string };

export type Profile = {
  name: string;
  roles: string[];
  intro: string;
  /** Rendered as: "Software Engineer working across A, B, and C." */
  focus: string[];
  services: string[];
  /** Problem-solving blurb in the Skills section. */
  a2sv: string;
  photo: string | null;
  photoPublicId?: string | null;
  cv: string | null;
  cvPublicId?: string | null;
};

export type Socials = {
  email: string;
  github: string;
  linkedin: string;
  leetcode: string | null;
  codeforces: string | null;
  upwork: string | null;
};

export type SiteContent = {
  profile: Profile;
  socials: Socials;
  projects: Project[];
  experience: Experience[];
  skillGroups: SkillGroup[];
  certificates: Certificate[];
  education: Education[];
};

export const periodLabel = (e: Pick<Experience, "start" | "end">) =>
  `${e.start} — ${e.end?.trim() ? e.end : "Present"}`;

export const isCurrent = (e: Pick<Experience, "end">) => !e.end?.trim();
