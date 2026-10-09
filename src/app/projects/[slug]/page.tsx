import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getSiteContent } from "@/lib/content";
import Chip from "@/components/ui/Chip";
import Metrics from "@/components/ui/Metrics";
import ProjectLinks from "@/components/ui/ProjectLinks";
import Reveal from "@/components/ui/Reveal";
import ProjectVisual from "@/components/projects/ProjectVisual";

type Params = { slug: string };

// Pre-render existing case studies; new ones are rendered on first visit and cached.
export async function generateStaticParams(): Promise<Params[]> {
  const { projects } = await getSiteContent();
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { projects, profile } = await getSiteContent();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} case study — ${profile.name}`,
    description: project.summary,
  };
}

function Block({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" className="grid gap-4 border-t border-border py-10 md:grid-cols-12 md:gap-10">
      <h2 className="eyebrow flex items-center gap-3 text-lime md:col-span-4">
        <span className="tabular-nums text-subtle">{index}</span>
        <span aria-hidden className="h-px w-6 bg-lime" />
        {title}
      </h2>
      <div className="text-base leading-relaxed text-muted md:col-span-8">{children}</div>
    </Reveal>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((h) => (
        <li key={h} className="flex gap-4">
          <span aria-hidden className="mt-3.5 h-px w-4 shrink-0 bg-lime" />
          {h}
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const { projects, profile } = await getSiteContent();
  const project = projects.find((p) => p.slug === slug);
  if (!project?.caseStudy) notFound();

  const { caseStudy } = project;
  const screens = project.images.slice(1);
  const sections = [
    { title: "The problem", body: <p className="text-fg">{caseStudy.problem}</p> },
    { title: "The approach", body: <p>{caseStudy.approach}</p> },
    ...(project.role ? [{ title: "My role", body: <p className="text-fg">{project.role}</p> }] : []),
    { title: "What I built", body: <Bullets items={project.highlights} /> },
    ...(caseStudy.improve?.length
      ? [{ title: "What I'd improve", body: <Bullets items={caseStudy.improve} /> }]
      : []),
  ];

  return (
    <main id="main" className="px-5 pb-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Top bar */}
        <nav aria-label="Case study" className="flex items-center justify-between py-6">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-sm text-muted transition-colors hover:border-lime hover:text-lime"
          >
            <ArrowLeft size={16} aria-hidden /> Back to work
          </Link>
          <Link href="/" className="display text-xl font-semibold">
            {profile.name.split(" ")[0]}<span className="text-lime">.</span>
          </Link>
        </nav>

        {/* Header */}
        <header className="pt-10 md:pt-16">
          <p className="eyebrow rise text-lime">{project.tag}</p>
          <h1 className="display rise mt-5 text-[clamp(2.25rem,6vw,4.5rem)] font-semibold">{project.title}</h1>
          <p className="rise mt-3 text-base text-muted">{project.subtitle}</p>
          <div className="rise mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Metrics items={project.metrics} className="text-base" />
            <ProjectLinks live={project.live} code={project.code} label={project.title} />
          </div>
          <p className="rise mt-8 max-w-3xl text-lg leading-relaxed text-fg sm:text-xl">
            {project.summary}
          </p>
        </header>

        {/* Cover */}
        <Reveal className="mt-12 rounded-3xl border border-border bg-surface p-2 sm:p-3">
          <div className="aspect-[16/10]">
            <ProjectVisual project={project} sizes="(min-width: 1152px) 1120px, 95vw" priority />
          </div>
        </Reveal>

        {/* Story */}
        <div className="mt-16">
          {sections.map((s, i) => (
            <Block key={s.title} index={String(i + 1).padStart(2, "0")} title={s.title}>
              {s.body}
            </Block>
          ))}
        </div>

        {/* Screens */}
        {screens.length > 0 && (
          <section aria-labelledby="screens-title" className="border-t border-border pt-10">
            <h2 id="screens-title" className="eyebrow text-subtle">
              Screens
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {screens.map((shot) => (
                <Reveal as="figure" key={shot.src}>
                  <div className="aspect-[16/10]">
                    <ProjectVisual project={project} shot={shot} sizes="(min-width: 768px) 560px, 95vw" />
                  </div>
                  <figcaption className="mt-3 text-sm text-subtle">{shot.alt}</figcaption>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Stack */}
        <section aria-labelledby="stack-title" className="mt-14 border-t border-border pt-10">
          <h2 id="stack-title" className="eyebrow text-subtle">
            Stack
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s}>
                <Chip>{s}</Chip>
              </li>
            ))}
          </ul>
        </section>

        {/* Next steps */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-surface p-8 sm:flex-row sm:items-center sm:p-10">
          <p className="display text-xl sm:text-2xl">
            Want to see more of my <em className="text-lime">work</em>?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-medium text-on-lime transition-colors hover:bg-lime-soft"
            >
              All projects <ArrowUpRight size={16} aria-hidden />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-medium transition-colors hover:border-lime hover:text-lime"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
