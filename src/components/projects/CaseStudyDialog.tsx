"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/content/types";
import Chip from "../ui/Chip";
import Metrics from "../ui/Metrics";
import ProjectLinks from "../ui/ProjectLinks";
import ProjectVisual from "./ProjectVisual";

/** Modal case study with a swipeable screenshot gallery. */
export default function CaseStudyDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [shot, setShot] = useState(0);
  const [shown, setShown] = useState<string | null>(null);

  // Reset the gallery whenever a different project is opened.
  if (project && project.slug !== shown) {
    setShown(project.slug);
    setShot(0);
  }

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) d.showModal();
    if (!project && d.open) d.close();
  }, [project]);

  if (!project) return <dialog ref={ref} onClose={onClose} />;

  const count = project.images.length;
  const step = (dir: number) => setShot((s) => (s + dir + count) % count);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      aria-labelledby="case-title"
      className="m-auto max-h-[92vh] w-[min(94vw,1040px)] overflow-y-auto rounded-3xl border border-border-strong bg-surface p-0 text-fg shadow-2xl"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface/90 px-6 py-4 backdrop-blur-md">
        <p className="eyebrow text-[10px] text-lime">{project.tag}</p>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label="Close case study"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong hover:border-lime hover:text-lime"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-6 sm:p-10">
        <h3 id="case-title" className="display text-4xl sm:text-5xl">
          {project.title}
        </h3>
        <p className="mt-2 text-muted">{project.subtitle}</p>
        <Metrics items={project.metrics} className="mt-4" />
        {project.caseStudy && (
          <Link
            href={`/projects/${project.slug}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-on-lime transition-colors hover:bg-lime-soft"
          >
            Read the full case study <ArrowUpRight size={15} aria-hidden />
          </Link>
        )}

        {project.video && (
          <div className="mt-8">
            <h4 className="eyebrow text-subtle">Watch the demo</h4>
            <video
              controls
              muted
              playsInline
              preload="metadata"
              poster={project.video.poster ?? undefined}
              className="mt-4 w-full rounded-2xl border border-border-strong bg-bg"
            >
              <source src={project.video.src} />
            </video>
          </div>
        )}

        {count > 0 && (
        <div className="relative mt-8">
          <div className="aspect-[16/10]">
            <ProjectVisual
              project={project}
              shot={project.images[shot]}
              sizes="(min-width: 1040px) 960px, 90vw"
            />
          </div>
          {count > 1 && (
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-sm text-subtle" aria-live="polite">
                {project.images[shot].alt}
                <span className="ml-2 tabular-nums">
                  ({shot + 1}/{count})
                </span>
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous screenshot"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong hover:border-lime hover:text-lime"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next screenshot"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong hover:border-lime hover:text-lime"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
        )}

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="text-lg leading-relaxed">{project.summary}</p>
            {project.role && (
              <>
                <h4 className="eyebrow mt-10 text-subtle">My role</h4>
                <p className="mt-4 leading-relaxed text-fg">{project.role}</p>
              </>
            )}
            <h4 className="eyebrow mt-10 text-subtle">Highlights</h4>
            <ul className="mt-4 space-y-4">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-4 leading-relaxed text-muted">
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-lime" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <aside className="md:col-span-4">
            <h4 className="eyebrow text-subtle">Stack</h4>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s}>
                  <Chip>{s}</Chip>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ProjectLinks live={project.live} code={project.code} label={project.title} />
            </div>
            {project.demo && (
              <div className="mt-8 rounded-2xl border border-lime/30 bg-bg p-5">
                <h4 className="eyebrow text-[10px] text-lime">Demo account</h4>
                <dl className="mt-3 space-y-2 text-sm">
                  <div>
                    <dt className="text-subtle">Email</dt>
                    <dd className="select-all break-all text-fg">{project.demo.email}</dd>
                  </div>
                  <div>
                    <dt className="text-subtle">Password</dt>
                    <dd className="select-all text-fg">{project.demo.password}</dd>
                  </div>
                </dl>
                {project.demo.note && (
                  <p className="mt-3 text-xs text-subtle">{project.demo.note}</p>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </dialog>
  );
}
