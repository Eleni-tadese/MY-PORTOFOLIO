import { ArrowUpRight, Mail } from "lucide-react";
import { socials } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./icons";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import { Section } from "./ui/Section";
import CopyEmail from "./CopyEmail";

const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const channels = [
  { label: "LinkedIn", value: strip(socials.linkedin), href: socials.linkedin, Icon: LinkedinIcon, external: true },
  { label: "GitHub", value: strip(socials.github), href: socials.github, Icon: GithubIcon, external: true },
  ...(socials.upwork
    ? [{ label: "Upwork", value: strip(socials.upwork), href: socials.upwork, Icon: ArrowUpRight, external: true }]
    : []),
];

export default function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title">
      <Reveal className="relative isolate overflow-hidden rounded-[2.5rem] border border-border bg-surface px-6 py-12 sm:px-12 sm:py-16">
        {/* Decorative glow + grid */}
        <div
          aria-hidden
          className="absolute -right-32 -top-40 -z-10 h-[420px] w-[420px] rounded-full bg-lime/15 blur-[120px]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_right,#000,transparent_70%)]"
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <div className="min-w-0 lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-lime">
              <span className="tabular-nums text-subtle">05</span>
              <span aria-hidden className="h-px w-8 bg-lime" />
              Get In Touch
            </p>
            <h2 id="contact-title" className="display mt-5 text-6xl sm:text-7xl md:text-8xl">
              Let&apos;s <em className="text-lime">Connect</em>
            </h2>
            <p className="mt-5 max-w-md text-muted sm:text-lg">
              I&apos;m always interested in new opportunities and collaborations.
            </p>

            <a
              href={`mailto:${socials.email}`}
              className="group mt-10 inline-flex max-w-full items-center gap-3 text-[clamp(1.05rem,5.2vw,2.5rem)] font-light tracking-tight transition-colors hover:text-lime"
            >
              {socials.email}
              <ArrowUpRight
                aria-hidden
                className="h-[0.8em] w-[0.8em] shrink-0 text-lime transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button href={`mailto:${socials.email}`}>
                <Mail size={16} aria-hidden /> Send an email
              </Button>
              <CopyEmail email={socials.email} />
            </div>
          </div>

          <ul className="grid min-w-0 grid-cols-1 gap-3 lg:col-span-5">
            {channels.map(({ label, value, href, Icon, external }) => (
              <li key={label} className="min-w-0">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="glow-card group flex items-center gap-4 rounded-2xl border border-border bg-bg/60 p-4 backdrop-blur-sm transition-colors hover:border-lime/50"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-2 text-lime transition-colors group-hover:bg-lime group-hover:text-on-lime">
                    <Icon size={18} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="eyebrow block text-[10px] text-subtle">{label}</span>
                    <span className="block truncate text-fg">{value}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden
                    className="shrink-0 text-subtle transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime"
                  />
                  {external && <span className="sr-only">(opens in new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
