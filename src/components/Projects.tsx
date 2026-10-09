import { ArrowUpRight } from "lucide-react";
import { projects, socials } from "@/lib/data";
import Reveal from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";
import ProjectCarousel from "./projects/ProjectCarousel";
import { GithubIcon } from "./icons";

export default function Projects() {
  return (
    <Section id="work" labelledBy="work-title" className="overflow-x-clip">
      <SectionHeading
        id="work-title"
        index="02"
        eyebrow="Selected Work"
        title={
          <>
            Things I&apos;ve <em className="text-lime">built</em>
          </>
        }
        intro="Drag, swipe or use the arrow keys — tap a project for details."
      />

      <Reveal className="mt-10">
        <ProjectCarousel projects={projects} />
      </Reveal>

      <Reveal className="mx-auto mt-14 max-w-4xl">
        <a
          href={`${socials.github}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between gap-4 border-t border-border pt-6 text-muted transition-colors hover:text-lime"
        >
          <span className="flex items-center gap-3">
            <GithubIcon size={18} />
            Practice projects &amp; experiments on GitHub
          </span>
          <ArrowUpRight
            size={18}
            aria-hidden
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </Reveal>
    </Section>
  );
}
