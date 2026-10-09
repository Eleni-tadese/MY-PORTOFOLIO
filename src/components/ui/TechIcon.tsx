import {
  siCplusplus,
  siCss,
  siDjango,
  siExpress,
  siFastapi,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siOpencv,
  siPostgresql,
  siPrisma,
  siPython,
  siPytorch,
  siReact,
  siRedux,
  siSqlite,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import { Bot, Database, FlaskConical, ScanEye, Webhook, type LucideIcon } from "lucide-react";

/** Brand logos (single-colour paths) keyed by lower-cased skill name. */
const BRANDS: Record<string, { path: string }> = {
  python: siPython,
  javascript: siJavascript,
  typescript: siTypescript,
  "c++": siCplusplus,
  react: siReact,
  "next.js": siNextdotjs,
  redux: siRedux,
  html5: siHtml5,
  html: siHtml5,
  css3: siCss,
  css: siCss,
  "tailwind css": siTailwindcss,
  "node.js": siNodedotjs,
  "express.js": siExpress,
  express: siExpress,
  django: siDjango,
  fastapi: siFastapi,
  postgresql: siPostgresql,
  sqlite: siSqlite,
  prisma: siPrisma,
  git: siGit,
  github: siGithub,
  opencv: siOpencv,
  pytorch: siPytorch,
};

/** Skills without a brand get a matching generic icon. */
const GENERIC: Record<string, LucideIcon> = {
  sql: Database,
  // These two brand marks are wordmarks, unreadable at icon size.
  mysql: Database,
  sqlalchemy: Database,
  "rest apis": Webhook,
  "computer vision": ScanEye,
  "software testing": FlaskConical,
  "ai evaluation": Bot,
};

/** True when `name` has an icon (brand or generic). */
export function hasTechIcon(name: string) {
  const key = name.trim().toLowerCase();
  return key in BRANDS || key in GENERIC;
}

/** Monochrome icon for a skill — inherits the text colour. Renders nothing if unknown. */
export default function TechIcon({ name, className = "" }: { name: string; className?: string }) {
  const key = name.trim().toLowerCase();
  const brand = BRANDS[key];
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
        <path d={brand.path} />
      </svg>
    );
  }
  const Generic = GENERIC[key];
  return Generic ? <Generic aria-hidden strokeWidth={1.75} className={className} /> : null;
}
