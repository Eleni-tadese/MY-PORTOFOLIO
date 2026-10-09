"use client";

import { useRef, useState } from "react";
import type { Project, SkillGroup } from "@/content/types";
import { projectsUsing } from "@/content/utils";

/** Tabbed skill categories; each skill shows which projects use it. */
export default function SkillExplorer({
  skillGroups,
  projects,
}: {
  skillGroups: SkillGroup[];
  projects: Project[];
}) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = skillGroups[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = skillGroups.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? active === last ? 0 : active + 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? active === 0 ? last : active - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div
        role="tablist"
        aria-label="Skill categories"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {skillGroups.map((g, i) => {
          const selected = i === active;
          return (
            <button
              key={g.title}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`skill-tab-${i}`}
              aria-selected={selected}
              aria-controls="skill-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`group flex shrink-0 items-center justify-between gap-6 rounded-2xl border px-5 py-4 text-left transition-colors ${
                selected
                  ? "border-lime bg-lime text-on-lime"
                  : "border-border text-muted hover:border-border-strong hover:text-fg"
              }`}
            >
              <span className="display text-lg sm:text-xl">{g.title}</span>
              <span className={`text-xs tabular-nums ${selected ? "" : "text-subtle"}`}>
                {String(g.items.length).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="skill-panel"
        role="tabpanel"
        aria-labelledby={`skill-tab-${active}`}
        className="lg:col-span-8"
      >
        <ul key={group.title} className="grid gap-3 sm:grid-cols-2">
          {group.items.map((skill, i) => {
            const used = projectsUsing(projects, skill);
            return (
              <li
                key={skill}
                className="fade-swap glow-card rounded-2xl border border-border bg-surface p-5"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <p className="text-lg font-medium">{skill}</p>
                {used.length > 0 && (
                  <p className="mt-1 text-xs text-subtle">
                    Used in <span className="text-muted">{used.join(", ")}</span>
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
