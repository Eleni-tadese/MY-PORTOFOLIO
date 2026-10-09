"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Project, SkillGroup } from "@/content/types";
import { projectsUsing } from "@/content/utils";

const AUTOPLAY_MS = 3500;

/**
 * Tabbed skill categories; each skill shows which projects use it.
 * The panels form a horizontal track that slides between categories
 * (right → left going forward) and can be swiped on touch screens.
 * Categories advance on their own; autoplay pauses on hover, keyboard
 * focus and while the section is off-screen.
 */
export default function SkillExplorer({
  skillGroups,
  projects,
}: {
  skillGroups: SkillGroup[];
  projects: Project[];
}) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const slides = useRef<(HTMLUListElement | null)[]>([]);
  const [height, setHeight] = useState<number>();
  const swipeX = useRef<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const tablist = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const running = inView && !hovered && !focused && skillGroups.length > 1;

  const select = (i: number) => {
    setActive(i);
    // Keep the active tab visible in the horizontal (mobile) tab row without
    // scrolling the page itself.
    const list = tablist.current;
    const tab = tabs.current[i];
    if (list && tab && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: tab.offsetLeft - 8, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => select((active + 1) % skillGroups.length), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, running, skillGroups.length]);

  // The viewport takes the active slide's height so shorter groups don't leave a gap.
  useLayoutEffect(() => {
    const el = slides.current[active];
    if (!el) return;
    const update = () => setHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") swipeX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (swipeX.current === null) return;
    const dx = e.clientX - swipeX.current;
    swipeX.current = null;
    if (Math.abs(dx) < 50) return;
    const last = skillGroups.length - 1;
    if (dx < 0 && active < last) select(active + 1);
    if (dx > 0 && active > 0) select(active - 1);
  };

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
    select(next);
    tabs.current[next]?.focus();
  };

  return (
    <div
      ref={root}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      className="grid gap-8 lg:grid-cols-12"
    >
      <div
        ref={tablist}
        role="tablist"
        aria-label="Skill categories"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="relative flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
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
              onClick={() => select(i)}
              className={`group relative flex shrink-0 items-center justify-between gap-6 overflow-hidden rounded-2xl border px-5 py-4 text-left transition-colors ${
                selected
                  ? "border-lime bg-lime text-on-lime"
                  : "border-border text-muted hover:border-border-strong hover:text-fg"
              }`}
            >
              <span className="display text-base sm:text-lg">{g.title}</span>
              <span className={`text-xs tabular-nums ${selected ? "" : "text-subtle"}`}>
                {String(g.items.length).padStart(2, "0")}
              </span>
              {selected && (
                // Time until the next category; restarts when autoplay resumes.
                <span
                  key={`${active}-${running}`}
                  aria-hidden
                  className={`absolute inset-x-0 bottom-0 h-0.5 bg-on-lime/40 ${running ? "cf-progress" : "scale-x-0"}`}
                  style={{ "--cf-duration": `${AUTOPLAY_MS}ms` } as React.CSSProperties}
                />
              )}
            </button>
          );
        })}
      </div>

      <div
        id="skill-panel"
        role="tabpanel"
        aria-labelledby={`skill-tab-${active}`}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (swipeX.current = null)}
        className="overflow-hidden transition-[height] duration-500 ease-out-expo lg:col-span-8 [touch-action:pan-y]"
        style={{ height }}
      >
        <div
          className="flex items-start transition-transform duration-700 ease-out-expo"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {skillGroups.map((g, gi) => {
            const current = gi === active;
            return (
              <ul
                // Re-keyed when it becomes active so the cards replay their entrance.
                key={`${g.title}-${current}`}
                ref={(el) => {
                  slides.current[gi] = el;
                }}
                aria-hidden={!current}
                inert={!current}
                className="grid w-full shrink-0 gap-3 sm:grid-cols-2"
              >
                {g.items.map((skill, i) => {
                  const used = projectsUsing(projects, skill);
                  return (
                    <li
                      key={skill}
                      className={`glow-card rounded-2xl border border-border bg-surface p-5 ${current ? "slide-in" : ""}`}
                      style={{ animationDelay: `${120 + i * 60}ms` }}
                    >
                      <p className="text-base font-medium">{skill}</p>
                      {used.length > 0 && (
                        <p className="mt-1 text-xs text-subtle">
                          Used in <span className="text-muted">{used.join(", ")}</span>
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
}
