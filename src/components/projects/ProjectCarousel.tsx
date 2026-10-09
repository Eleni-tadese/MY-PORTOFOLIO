"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import type { Project } from "@/content/types";
import Chip from "../ui/Chip";
import Metrics from "../ui/Metrics";
import ProjectLinks from "../ui/ProjectLinks";
import ProjectVisual from "./ProjectVisual";
import CaseStudyDialog from "./CaseStudyDialog";

const AUTOPLAY_MS = 2500;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * 3D coverflow carousel. Drag/swipe, arrow keys, dots and autoplay (with a
 * visible pause control). Positions are driven by CSS variables so the
 * browser does the heavy lifting; no animation library needed.
 */
export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const n = projects.length;
  const [active, setActive] = useState(0);
  /** Drag distance as a fraction of one slide step. */
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; id: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  const go = useCallback((dir: number) => setActive((a) => (a + dir + n) % n), [n]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const autoplay = !userPaused;
  const running = autoplay && inView && !dragging && !openSlug;

  // Advance on a timer (not on animation end) so it also works when the OS
  // has animations reduced; the visible pause button stops it.
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [running, active, go]);

  /* ---- Pointer drag ---- */
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    pointer.current = { x: e.clientX, id: e.pointerId, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = pointer.current;
    if (!p || p.id !== e.pointerId) return;
    const dx = e.clientX - p.x;
    if (!p.moved) {
      if (Math.abs(dx) < 8) return;
      p.moved = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    const width = slideRef.current?.offsetWidth ?? 600;
    setDrag(dx / (width * 0.66));
  };
  const endDrag = () => {
    const p = pointer.current;
    pointer.current = null;
    if (!p?.moved) return;
    suppressClick.current = true;
    const steps = Math.max(-2, Math.min(2, Math.round(-drag * 1.5)));
    if (steps) go(steps);
    setDrag(0);
    setDragging(false);
  };

  const onSlideClick = (i: number, slug: string) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    if (i === active) setOpenSlug(slug);
    else setActive(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const current = projects[active];

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      onKeyDown={onKeyDown}
    >
      {/* Stage */}
      <div
        className="cf-stage cursor-grab active:cursor-grabbing"
        data-dragging={dragging || undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {projects.map((p, i) => {
          let d = (((i - active) % n) + n) % n;
          if (d > n / 2) d -= n;
          const dd = d + drag;
          const ad = Math.min(Math.abs(dd), 2);
          const isActive = i === active;
          return (
            <div
              key={p.slug}
              ref={isActive ? slideRef : undefined}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}: ${p.title}`}
              aria-hidden={!isActive || undefined}
              className="cf-slide w-[min(84vw,760px)]"
              style={
                {
                  "--d": dd,
                  "--ad": ad,
                  "--dc": Math.max(-1, Math.min(1, dd)),
                  zIndex: 100 - Math.round(ad * 10),
                  opacity: ad > 1.5 ? 0 : 1,
                  pointerEvents: ad > 1.5 ? "none" : undefined,
                } as React.CSSProperties
              }
            >
              <button
                type="button"
                tabIndex={isActive ? 0 : -1}
                onClick={() => onSlideClick(i, p.slug)}
                aria-label={isActive ? `Open ${p.title} case study` : `Show ${p.title}`}
                className="group relative block aspect-[16/10] w-full rounded-3xl border border-border bg-surface p-2 text-left shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)] sm:p-3"
              >
                <ProjectVisual
                  project={p}
                  sizes="(min-width: 768px) 760px, 84vw"
                  priority={i === 0}
                />
                <span
                  aria-hidden
                  className="cf-shade pointer-events-none absolute inset-0 rounded-3xl bg-bg"
                />
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-lime px-4 py-2 text-xs font-medium text-on-lime opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    Case study <ArrowUpRight size={14} />
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mx-auto mt-8 flex max-w-4xl items-center justify-between gap-6">
        <p className="display text-3xl tabular-nums" aria-hidden>
          <span className="text-lime">{pad(active + 1)}</span>
          <span className="text-subtle"> / {pad(n)}</span>
        </p>

        <div className="flex flex-1 items-center gap-2" role="group" aria-label="Choose project">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${p.title}`}
              aria-current={i === active || undefined}
              className="relative h-1 flex-1 overflow-hidden rounded-full bg-border-strong"
            >
              {i === active && (
                <span
                  key={`${active}-${running}`}
                  className={`absolute inset-0 rounded-full bg-lime ${autoplay ? "cf-progress" : ""}`}
                  style={
                    {
                      "--cf-duration": `${AUTOPLAY_MS}ms`,
                      animationPlayState: running ? "running" : "paused",
                    } as React.CSSProperties
                  }
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setUserPaused((v) => !v)}
            aria-label={userPaused ? "Resume autoplay" : "Pause autoplay"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong hover:border-lime hover:text-lime"
          >
            {userPaused ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong hover:border-lime hover:text-lime"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next project"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-lime text-on-lime hover:bg-lime-soft"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Details for the active slide */}
      <div
        key={current.slug}
        className="fade-swap mx-auto mt-8 grid max-w-4xl gap-8 md:grid-cols-12"
        aria-live={running ? "off" : "polite"}
      >
        <div className="md:col-span-7">
          <p className="eyebrow text-lime">{current.tag}</p>
          <h3 className="display mt-3 text-5xl sm:text-6xl">{current.title}</h3>
          <p className="mt-1 text-subtle">{current.subtitle}</p>
          <Metrics items={current.metrics} className="mt-4" />
          <p className="mt-5 leading-relaxed text-muted">{current.summary}</p>
        </div>
        <div className="flex flex-col gap-6 md:col-span-5 md:items-start md:pt-8">
          <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
            {current.stack.map((s) => (
              <li key={s}>
                <Chip>{s}</Chip>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setOpenSlug(current.slug)}
            className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-medium transition-colors hover:border-lime hover:text-lime"
          >
            Read case study <ArrowUpRight size={15} aria-hidden />
          </button>
          <ProjectLinks live={current.live} code={current.code} label={current.title} />
        </div>
      </div>

      <CaseStudyDialog
        project={projects.find((p) => p.slug === openSlug) ?? null}
        onClose={() => setOpenSlug(null)}
      />
    </div>
  );
}
