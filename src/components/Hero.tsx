"use client";

import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import { socials } from "@/lib/data";

const stats = [
  { value: "7+", label: "Projects completed", sub: "From a GPA calculator to full-stack apps" },
  { value: "4th", label: "Year of study", sub: "Computer Science & Engineering, ASTU" },
  { value: "MERN", label: "Full-stack expertise", sub: "Python, C++, and modern frontend tools" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-32 pb-20"
    >
      <ParticleField />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1fr_auto]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="mb-4 font-body text-sm text-fg-dim">Hello, I&apos;m</p>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Eleni Tadese
          </h1>
          <p className="mt-4 font-display text-2xl text-lime sm:text-3xl">
            Full-Stack Developer
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-dim sm:text-lg">
            A 4th-year Computer Science &amp; Engineering student passionate
            about building modern, accessible web applications and solving
            real-world problems with code.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="btn-lime rounded-full px-6 py-3 text-sm font-medium"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="btn-ghost rounded-full px-6 py-3 text-sm font-medium"
            >
              Contact Me
            </a>
            <a
              href={socials.cv}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost rounded-full px-6 py-3 text-sm font-medium"
            >
              View CV
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="justify-self-center md:justify-self-end"
        >
          <div className="avatar-ring h-40 w-40 overflow-hidden rounded-full border border-border bg-card sm:h-52 sm:w-52">
            <div className="flex h-full w-full items-center justify-center font-display text-4xl text-fg-faint">
              ET
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-20 grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm"
          >
            <div className="font-display text-3xl font-semibold text-lime">
              {s.value}
            </div>
            <div className="mt-1 text-sm font-medium text-fg">{s.label}</div>
            <div className="mt-1 text-xs text-fg-faint">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
