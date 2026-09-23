import { Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { socials } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-2 text-sm text-fg-faint">Get In Touch</p>
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Let&apos;s Connect
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base text-fg-dim">
          I&apos;m always interested in new opportunities and collaborations.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          <a
            href={`mailto:${socials.email}`}
            className="glow-card rounded-2xl border border-border bg-card p-6 text-left transition-colors hover:border-lime/40"
          >
            <Mail className="text-lime" size={20} />
            <p className="mt-4 text-xs text-fg-faint">Email</p>
            <p className="mt-1 break-words text-sm font-medium">
              {socials.email}
            </p>
          </a>
          <a
            href={`tel:${socials.phone}`}
            className="glow-card rounded-2xl border border-border bg-card p-6 text-left transition-colors hover:border-lime/40"
          >
            <Phone className="text-lime" size={20} />
            <p className="mt-4 text-xs text-fg-faint">Phone</p>
            <p className="mt-1 text-sm font-medium">+251 910 278 021</p>
          </a>
          <div className="glow-card rounded-2xl border border-border bg-card p-6 text-left">
            <MapPin className="text-lime" size={20} />
            <p className="mt-4 text-xs text-fg-faint">Location</p>
            <p className="mt-1 text-sm font-medium">{socials.location}</p>
          </div>
        </div>

        <div className="mt-14">
          <p className="text-xs text-fg-faint">Follow Me</p>
          <div className="mt-4 flex justify-center gap-4">
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost flex h-11 w-11 items-center justify-center rounded-full"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost flex h-11 w-11 items-center justify-center rounded-full"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
