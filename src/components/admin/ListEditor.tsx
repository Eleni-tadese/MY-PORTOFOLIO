"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

/** Add / remove / reorder a list of items; each item's fields come from `render`. */
export default function ListEditor<T>({
  items,
  onChange,
  render,
  title,
  empty,
  addLabel,
  create,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  render: (item: T, update: (patch: Partial<T>) => void, index: number) => React.ReactNode;
  title: (item: T, index: number) => string;
  empty: string;
  addLabel: string;
  create: () => T;
}) {
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const update = (i: number) => (patch: Partial<T>) =>
    onChange(items.map((it, k) => (k === i ? { ...it, ...patch } : it)));
  const remove = (i: number) => {
    if (confirm(`Remove “${title(items[i], i)}”?`)) onChange(items.filter((_, k) => k !== i));
  };

  const iconBtn =
    "flex h-8 w-8 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-lime hover:text-lime disabled:opacity-30 disabled:hover:border-border-strong disabled:hover:text-muted";

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <p className="rounded-2xl border border-dashed border-border-strong p-6 text-center text-sm text-subtle">
          {empty}
        </p>
      )}
      {items.map((item, i) => (
        <article key={i} className="rounded-2xl border border-border bg-surface p-5">
          <header className="mb-4 flex items-center justify-between gap-3">
            <h3 className="truncate text-sm font-semibold">
              <span className="mr-2 tabular-nums text-subtle">{String(i + 1).padStart(2, "0")}</span>
              {title(item, i) || "Untitled"}
            </h3>
            <div className="flex shrink-0 gap-1.5">
              <button type="button" className={iconBtn} onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
                <ArrowUp size={14} />
              </button>
              <button
                type="button"
                className={iconBtn}
                onClick={() => move(i, 1)}
                disabled={i === items.length - 1}
                aria-label="Move down"
              >
                <ArrowDown size={14} />
              </button>
              <button type="button" className={`${iconBtn} hover:border-danger hover:text-danger`} onClick={() => remove(i)} aria-label="Remove">
                <Trash2 size={14} />
              </button>
            </div>
          </header>
          <div className="grid gap-4">{render(item, update(i), i)}</div>
        </article>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, create()])}
        className="inline-flex items-center gap-2 rounded-full border border-dashed border-border-strong px-4 py-2 text-sm text-muted transition-colors hover:border-lime hover:text-lime"
      >
        <Plus size={15} aria-hidden /> {addLabel}
      </button>
    </div>
  );
}
