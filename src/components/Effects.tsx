"use client";

import { useEffect, useRef } from "react";

/**
 * Page-wide effects with a single listener each:
 *  - lime scroll-progress bar at the top of the viewport
 *  - cursor spotlight on any `.glow-card` (sets --mx / --my)
 */
export default function Effects() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".glow-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left scale-x-0 bg-lime"
    />
  );
}
