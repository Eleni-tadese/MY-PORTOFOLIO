"use client";

import { useEffect, useRef } from "react";
import { isCurrent, periodLabel, type Experience as Item } from "@/content/types";

/** Vertical timeline whose line fills as you scroll. */
export default function Timeline({ items }: { items: Item[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const dots = el.querySelectorAll<HTMLElement>("[data-dot]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      if (reduced.matches) {
        el.style.setProperty("--p", "1");
        dots.forEach((d) => d.setAttribute("data-on", ""));
        return;
      }
      const marker = window.innerHeight * 0.6;
      const rect = el.getBoundingClientRect();
      const p = Math.min(Math.max((marker - rect.top) / rect.height, 0), 1);
      el.style.setProperty("--p", p.toFixed(4));
      dots.forEach((d) =>
        d.toggleAttribute("data-on", d.getBoundingClientRect().top < marker)
      );
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ol ref={ref} className="relative ml-2 pl-10 sm:pl-14">
      <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-border" />
      <span aria-hidden className="timeline-fill absolute bottom-0 left-0 top-0 w-px bg-lime" />
      {items.map((item) => (
        <li key={`${item.role}-${item.org}`} className="relative pb-12 last:pb-0">
          <span
            data-dot
            aria-hidden
            className="timeline-dot absolute -left-[calc(2.5rem+6px)] top-2 h-3 w-3 rounded-full border-2 border-border-strong bg-bg sm:-left-[calc(3.5rem+6px)]"
          />
          <div className="grid gap-x-10 gap-y-2 md:grid-cols-[11rem_1fr]">
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 pt-2 text-subtle">
              {periodLabel(item)}
              {isCurrent(item) && (
                <span className="rounded-full border border-lime/40 px-2 py-0.5 text-[10px] text-lime">
                  Now
                </span>
              )}
            </p>
            <div>
              <h3 className="display text-3xl sm:text-4xl">{item.role}</h3>
              <p className="mt-1 text-lime">
                {item.org}
                <span className="text-subtle"> · {item.mode}</span>
              </p>
              <p className="mt-3 max-w-xl text-muted">{item.summary}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
