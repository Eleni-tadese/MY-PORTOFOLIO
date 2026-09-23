import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import { featuredProjects, socials } from "@/lib/data";
import ProjectCarousel from "./ProjectCarousel";

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm text-fg-faint">My Projects</p>
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          A selection of things I&apos;ve built
        </h2>

        <div className="mt-16 flex flex-col gap-20">
          {featuredProjects.map((p, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={p.title}
                className={`grid items-center gap-8 md:grid-cols-2 ${
                  reversed ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="glow-card aspect-[4/3] rounded-2xl border border-border bg-card" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-lime">
                    {p.tag}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-dim">
                    {p.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-bg-elev px-3 py-1 text-xs text-fg-dim"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-5 text-sm">
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-lime hover:underline"
                      >
                        <ExternalLink size={15} /> Live Demo
                      </a>
                    )}
                    {p.code && (
                      <a
                        href={p.code}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-fg-dim hover:text-fg"
                      >
                        <GithubIcon size={15} /> Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-24">
          <h3 className="font-display text-2xl font-semibold">
            More things I&apos;ve shipped
          </h3>
          <p className="mt-2 text-sm text-fg-dim">
            Drag, or let it play — a few more builds from along the way.
          </p>
          <ProjectCarousel />
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-card p-8 text-center">
          <p className="font-display text-xl font-semibold">
            Want to see more projects?
          </p>
          <p className="mt-2 text-sm text-fg-dim">
            Explore all my work, contributions, and coding journey on GitHub
          </p>
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="btn-lime mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
          >
            Visit My GitHub <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
