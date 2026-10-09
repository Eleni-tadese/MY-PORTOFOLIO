import type { Project } from "./types";

/** Projects whose stack mentions the given skill (e.g. "React" ↔ "React.js"). */
export function projectsUsing(projects: Project[], skill: string) {
  const norm = (s: string) => s.toLowerCase().replace(/\.js$/, "").trim();
  const k = norm(skill);
  return projects
    .filter((p) => p.stack.some((s) => norm(s) === k || norm(s).startsWith(k + " ")))
    .map((p) => p.title);
}
