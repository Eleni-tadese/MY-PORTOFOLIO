"use client";

import { useEffect, useState } from "react";
import { nav, socials } from "@/lib/data";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.href.slice(1)));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className={`flex items-center gap-1 rounded-full border border-border bg-bg-elev/80 px-2 py-2 backdrop-blur-md transition-shadow ${
          scrolled ? "shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]" : ""
        }`}
      >
        <a
          href="#home"
          className="px-3 font-display text-sm font-semibold tracking-tight text-fg"
        >
          ET
        </a>
        <div className="mx-1 hidden items-center gap-5 px-2 sm:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-active={active === item.href.slice(1)}
              className={`nav-link text-sm ${
                active === item.href.slice(1) ? "text-lime" : "text-fg-dim"
              } hover:text-fg`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="btn-lime rounded-full px-4 py-2 text-sm font-medium"
        >
          Get In Touch
        </a>
      </nav>
    </header>
  );
}
