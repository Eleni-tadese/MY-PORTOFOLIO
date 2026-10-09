"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/nav";

const links = nav.slice(1);

export default function Navbar({ brand }: { brand: string }) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const firstMobileLink = useRef<HTMLAnchorElement>(null);

  // Track the section in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Hide while scrolling down, show again on scroll up. Jumps triggered by an
  // in-page link (#work, View My Work…) keep the bar visible.
  useEffect(() => {
    let lastY = window.scrollY;
    let jumpUntil = 0;
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.('a[href^="#"]')) {
        jumpUntil = performance.now() + 1200;
        setHidden(false);
      }
    };
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (y < 120 || performance.now() < jumpUntil) return setHidden(false);
      if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // Slide the lime pill behind the active link.
  useEffect(() => {
    const move = () => {
      const pill = pillRef.current;
      const link = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
      if (!pill) return;
      if (!link) {
        pill.style.opacity = "0";
        return;
      }
      pill.style.opacity = "1";
      pill.style.width = `${link.offsetWidth}px`;
      pill.style.transform = `translateX(${link.offsetLeft}px)`;
    };
    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [active]);

  // Full-screen mobile menu: lock scroll, focus first link, close on Escape.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    firstMobileLink.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      onFocus={() => setHidden(false)}
      className={`fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-[translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hidden && !open ? "-translate-y-[160%]" : ""
      }`}
    >
      <nav
        aria-label="Primary"
        className="flex w-full max-w-fit items-center justify-between gap-4 rounded-full border border-border-strong bg-surface/80 py-1.5 pl-5 pr-1.5 shadow-[0_12px_40px_-16px_rgb(0_0_0/0.8)] backdrop-blur-xl max-lg:min-w-[min(100%,22rem)]"
      >
        <a href="#home" aria-label={`${brand} — home`} className="display pr-2 text-xl font-semibold">
          {brand}<span className="text-lime">.</span>
        </a>

        <ul ref={listRef} className="relative hidden items-center lg:flex">
          <span
            ref={pillRef}
            aria-hidden
            className="absolute left-0 top-0 h-full rounded-full bg-lime opacity-0 transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
          {links.map((item) => {
            const id = item.href.slice(1);
            const current = active === id;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  data-id={id}
                  data-active={current}
                  aria-current={current ? "location" : undefined}
                  className={`nav-link block rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    current ? "font-medium text-on-lime" : "text-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-lime text-on-lime lg:hidden"
        >
          <Menu size={18} />
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[70] flex flex-col bg-bg/95 px-6 pb-10 pt-6 backdrop-blur-xl lg:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="display text-xl font-semibold">
              {brand}<span className="text-lime">.</span>
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong"
            >
              <X size={18} />
            </button>
          </div>

          <ul className="mt-auto flex flex-col">
            {nav.map((item, i) => {
              const current = active === item.href.slice(1);
              return (
                <li
                  key={item.href}
                  className="rise border-b border-border"
                  style={{ "--rise-delay": `${i * 50}ms` } as React.CSSProperties}
                >
                  <a
                    ref={i === 0 ? firstMobileLink : undefined}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={current ? "location" : undefined}
                    className={`flex items-baseline gap-4 py-4 ${current ? "text-lime" : "text-fg"}`}
                  >
                    <span className="text-xs tabular-nums text-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display text-4xl">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
