import Image from "next/image";
import type { Project, Shot } from "@/content/types";

/** Browser-window frame around a screenshot, or a typographic poster if none. */
export default function ProjectVisual({
  project,
  shot = project.images[0],
  sizes,
  priority,
}: {
  project: Project;
  shot?: Shot;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border-strong bg-surface-2">
      <div aria-hidden className="flex h-8 shrink-0 items-center gap-1.5 border-b border-border px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-lime/70" />
        <span className="ml-3 truncate text-[10px] text-subtle">
          {project.live?.replace(/^https?:\/\//, "").replace(/\/.*$/, "") ??
            project.slug}
        </span>
      </div>
      <div className="relative flex-1">
        {shot ? (
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes={sizes}
            priority={priority}
            draggable={false}
            className="object-cover object-top"
          />
        ) : (
          <div
            role="img"
            aria-label={`${project.title} — ${project.subtitle}`}
            className="flex h-full flex-col justify-between p-6 sm:p-10 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:36px_36px]"
          >
            <span className="eyebrow text-[10px] text-subtle">{project.subtitle}</span>
            <span className="display text-5xl text-lime sm:text-7xl">{project.title}</span>
            <span className="flex flex-wrap gap-2">
              {project.stack.slice(0, 4).map((s) => (
                <span key={s} className="rounded-full border border-border-strong bg-bg/60 px-3 py-1 text-xs text-muted">
                  {s}
                </span>
              ))}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
