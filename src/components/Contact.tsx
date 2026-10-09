import { ArrowUpRight } from "lucide-react";
import type { Socials } from "@/content/types";
import { GithubIcon, LinkedinIcon } from "./icons";
import Reveal from "./ui/Reveal";
import { Section } from "./ui/Section";
import CopyEmail from "./CopyEmail";

export default function Contact({ socials }: { socials: Socials }) {
  const channels = [
    { label: "LinkedIn", href: socials.linkedin, Icon: LinkedinIcon },
    { label: "GitHub", href: socials.github, Icon: GithubIcon },
    ...(socials.upwork ? [{ label: "Upwork", href: socials.upwork, Icon: ArrowUpRight }] : []),
  ].filter((c) => c.href);

  return (
    <Section id="contact" labelledBy="contact-title">
      <Reveal className="relative isolate overflow-hidden rounded-[2.5rem] border border-border bg-surface px-6 py-16 text-center sm:px-12 sm:py-20">
        {/* Decorative glow + grid */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 -z-10 h-[360px] w-[680px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/15 blur-[120px]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,#000,transparent_65%)]"
        />

        <p className="eyebrow flex items-center justify-center gap-3 text-lime">
          <span className="tabular-nums text-subtle">05</span>
          <span aria-hidden className="h-px w-8 bg-lime" />
          Get In Touch
        </p>
        <h2 id="contact-title" className="display mt-5 text-6xl sm:text-7xl md:text-8xl">
          Let&apos;s <em className="text-lime">Connect</em>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-muted sm:text-lg">
          I&apos;m always interested in new opportunities and collaborations.
        </p>

        <div className="mt-10 flex items-center justify-center gap-3 sm:gap-4">
          <a
            href={`mailto:${socials.email}`}
            className="group inline-flex min-w-0 items-center gap-2 text-[clamp(1.05rem,4.6vw,2.5rem)] font-light tracking-tight transition-colors hover:text-lime"
          >
            <span className="truncate">{socials.email}</span>
            <ArrowUpRight
              aria-hidden
              className="h-[0.8em] w-[0.8em] shrink-0 text-lime transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
          <CopyEmail email={socials.email} />
        </div>

        <div aria-hidden className="mx-auto mt-10 h-px w-16 bg-border-strong" />

        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {channels.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-border-strong bg-bg/60 py-2 pl-2 pr-5 text-sm font-medium backdrop-blur-sm transition-colors hover:border-lime hover:bg-lime hover:text-on-lime"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-lime transition-colors group-hover:bg-on-lime">
                  <Icon size={16} aria-hidden />
                </span>
                {label}
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
