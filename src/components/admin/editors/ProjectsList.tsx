"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import type { Project } from "@/content/types";
import { deleteProject, reorderProjects, setProjectFeatured, type ActionResult } from "@/app/admin/actions";

export default function ProjectsList({ initial }: { initial: Project[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const run = (next: Project[], action: () => Promise<ActionResult>) => {
    const previous = items;
    setItems(next); // optimistic
    setError("");
    startTransition(async () => {
      const r = await action();
      if (!r.ok) {
        setItems(previous);
        setError(r.error);
      } else router.refresh();
    });
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    run(next, () => reorderProjects(next.map((p) => p.id!)));
  };

  const iconBtn =
    "flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-lime hover:text-lime disabled:opacity-30";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-subtle">
          {items.filter((p) => p.featured).length} featured of {items.length}
          {pending && " · saving…"}
        </p>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-medium text-on-lime hover:bg-lime-soft"
        >
          <Plus size={15} aria-hidden /> New project
        </Link>
      </div>
      {error && (
        <p role="alert" className="mb-4 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </p>
      )}
      <ul className="space-y-3">
        {items.map((p, i) => (
          <li key={p.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-surface p-4">
            <div className="relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-lg bg-surface-2">
              {p.images[0] ? (
                <Image src={p.images[0].src} alt="" fill sizes="112px" className="object-cover object-top" />
              ) : (
                <span className="display flex h-full items-center justify-center text-lg text-lime">{p.title.slice(0, 2)}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{p.title}</p>
              <p className="truncate text-xs text-subtle">{p.tag || p.subtitle}</p>
            </div>
            <label className="flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={p.featured}
                onChange={(e) =>
                  run(
                    items.map((x) => (x.id === p.id ? { ...x, featured: e.target.checked } : x)),
                    () => setProjectFeatured(p.id!, e.target.checked)
                  )
                }
                className="h-4 w-4 accent-[var(--color-lime)]"
              />
              Featured
            </label>
            <div className="flex gap-1.5">
              <button type="button" className={iconBtn} onClick={() => move(i, -1)} disabled={i === 0 || pending} aria-label={`Move ${p.title} up`}>
                <ArrowUp size={15} />
              </button>
              <button type="button" className={iconBtn} onClick={() => move(i, 1)} disabled={i === items.length - 1 || pending} aria-label={`Move ${p.title} down`}>
                <ArrowDown size={15} />
              </button>
              <Link href={`/admin/projects/${p.id}`} className={iconBtn} aria-label={`Edit ${p.title}`}>
                <Pencil size={15} />
              </Link>
              <button
                type="button"
                className={`${iconBtn} hover:border-danger hover:text-danger`}
                aria-label={`Delete ${p.title}`}
                onClick={() => {
                  if (confirm(`Delete “${p.title}” and its images? This can't be undone.`)) {
                    run(items.filter((x) => x.id !== p.id), () => deleteProject(p.id!));
                  }
                }}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {items.length === 0 && <p className="rounded-2xl border border-dashed border-border-strong p-8 text-center text-sm text-subtle">No projects yet.</p>}
    </div>
  );
}
