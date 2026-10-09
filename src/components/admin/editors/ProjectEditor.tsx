"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import type { Project } from "@/content/types";
import { saveProject } from "@/app/admin/actions";
import ProjectVisual from "@/components/projects/ProjectVisual";
import Chip from "@/components/ui/Chip";
import Metrics from "@/components/ui/Metrics";
import ProjectLinks from "@/components/ui/ProjectLinks";
import { Checkbox, FieldGroup, LinesField, TextArea, TextField } from "../fields";
import Preview from "../Preview";
import SaveBar from "../SaveBar";
import Uploader from "../Uploader";
import { useDraft } from "../useSave";

type Draft = {
  id?: number;
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  summary: string;
  role: string;
  metrics: string[];
  highlights: string[];
  stack: string[];
  live: string;
  code: string;
  featured: boolean;
  images: { src: string; alt: string; publicId: string | null }[];
  caseStudy: { problem: string; approach: string; improve: string[] };
  demo: { email: string; password: string; note: string };
  video: { src: string } | null;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

function toDraft(p: Project | null): Draft {
  return {
    id: p?.id,
    slug: p?.slug ?? "",
    title: p?.title ?? "",
    subtitle: p?.subtitle ?? "",
    tag: p?.tag ?? "",
    summary: p?.summary ?? "",
    role: p?.role ?? "",
    metrics: p?.metrics ?? [],
    highlights: p?.highlights ?? [],
    stack: p?.stack ?? [],
    live: p?.live ?? "",
    code: p?.code ?? "",
    featured: p?.featured ?? true,
    images: (p?.images ?? []).map((i) => ({ src: i.src, alt: i.alt, publicId: i.publicId ?? null })),
    caseStudy: {
      problem: p?.caseStudy?.problem ?? "",
      approach: p?.caseStudy?.approach ?? "",
      improve: p?.caseStudy?.improve ?? [],
    },
    demo: { email: p?.demo?.email ?? "", password: p?.demo?.password ?? "", note: p?.demo?.note ?? "" },
    video: p?.video ? { src: p.video.src } : null,
  };
}

const clean = (a: string[]) => a.map((s) => s.trim()).filter(Boolean);

function toPreview(d: Draft): Project {
  return {
    ...d,
    role: d.role || null,
    metrics: clean(d.metrics),
    highlights: clean(d.highlights),
    stack: clean(d.stack),
    live: d.live || null,
    code: d.code || null,
    caseStudy: null,
    demo: null,
    video: null,
  };
}

export default function ProjectEditor({ project }: { project: Project | null }) {
  const router = useRouter();
  const isNew = !project;
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const { draft, setDraft, dirty, pending, result, errors, save } = useDraft<Draft>(
    toDraft(project),
    saveProject as (d: Draft) => ReturnType<typeof saveProject>
  );
  const set = (patch: Partial<Draft>) => setDraft({ ...draft, ...patch });
  const setImages = (images: Draft["images"]) => set({ images });

  const moveImage = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= draft.images.length) return;
    const next = [...draft.images];
    [next[i], next[j]] = [next[j], next[i]];
    setImages(next);
  };

  const onSave = () =>
    save((r) => {
      if (isNew && r.id) router.replace(`/admin/projects/${r.id}`);
      else router.refresh();
    });

  const preview = toPreview(draft);

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="space-y-6">
        <FieldGroup title="Basics">
          <TextField
            label="Title"
            value={draft.title}
            onChange={(title) => set({ title, ...(slugTouched ? {} : { slug: slugify(title) }) })}
            error={errors.title}
          />
          <TextField
            label="Slug"
            hint={`Used in the case-study URL: /projects/${draft.slug || "…"}`}
            value={draft.slug}
            onChange={(slug) => {
              setSlugTouched(true);
              set({ slug });
            }}
            error={errors.slug}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Subtitle" value={draft.subtitle} onChange={(subtitle) => set({ subtitle })} error={errors.subtitle} />
            <TextField label="Label" hint="e.g. 2nd Place — AGT-HUB Hackathon" value={draft.tag} onChange={(tag) => set({ tag })} error={errors.tag} />
          </div>
          <TextArea label="Description" rows={4} value={draft.summary} onChange={(summary) => set({ summary })} error={errors.summary} />
          <LinesField label="Outcome numbers" hint="Short, one per line, e.g. “458 tests”" rows={3} value={draft.metrics} onChange={(metrics) => set({ metrics })} />
          <LinesField label="Tech tags" rows={4} value={draft.stack} onChange={(stack) => set({ stack })} />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Live link" type="url" value={draft.live} onChange={(live) => set({ live })} error={errors.live} />
            <TextField label="GitHub link" type="url" value={draft.code} onChange={(code) => set({ code })} error={errors.code} />
          </div>
          <Checkbox
            label="Featured"
            hint="Featured projects appear in the homepage carousel."
            checked={draft.featured}
            onChange={(featured) => set({ featured })}
          />
        </FieldGroup>

        <FieldGroup title="Screenshots" description="The first image is the cover. Use 16:10 images (e.g. 1600×1000) so the carousel stays even.">
          {draft.images.length === 0 && <p className="text-sm text-subtle">No images — a designed title card is shown instead.</p>}
          <ul className="space-y-3">
            {draft.images.map((img, i) => (
              <li key={img.src} className="flex gap-4 rounded-xl border border-border p-3">
                <div className="relative aspect-[16/10] w-32 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                  <Image src={img.src} alt="" fill sizes="128px" className="object-cover object-top" />
                </div>
                <div className="min-w-0 flex-1">
                  <TextField
                    label={i === 0 ? "Alt text (cover)" : "Alt text"}
                    value={img.alt}
                    onChange={(alt) => setImages(draft.images.map((x, k) => (k === i ? { ...x, alt } : x)))}
                    error={errors[`images.${i}.src`]}
                  />
                  <div className="mt-2 flex gap-2 text-xs">
                    <button type="button" onClick={() => moveImage(i, -1)} disabled={i === 0} className="inline-flex items-center gap-1 text-muted hover:text-lime disabled:opacity-30">
                      <ArrowUp size={13} aria-hidden /> Up
                    </button>
                    <button type="button" onClick={() => moveImage(i, 1)} disabled={i === draft.images.length - 1} className="inline-flex items-center gap-1 text-muted hover:text-lime disabled:opacity-30">
                      <ArrowDown size={13} aria-hidden /> Down
                    </button>
                    <button type="button" onClick={() => setImages(draft.images.filter((_, k) => k !== i))} className="ml-auto inline-flex items-center gap-1 text-muted hover:text-danger">
                      <Trash2 size={13} aria-hidden /> Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Uploader
            kind="image"
            label="Upload screenshots"
            multiple
            onUploaded={(f) =>
              setDraft((d) => ({ ...d, images: [...d.images, { src: f.url, alt: `${d.title} screenshot`, publicId: f.publicId }] }))
            }
          />
        </FieldGroup>

        <FieldGroup title="Case study" description="Optional. Fill in “The problem” or “The approach” to publish a full case-study page.">
          <TextArea label="My role" rows={2} value={draft.role} onChange={(role) => set({ role })} error={errors.role} />
          <LinesField label="What I built (highlights)" rows={5} value={draft.highlights} onChange={(highlights) => set({ highlights })} />
          <TextArea label="The problem" rows={3} value={draft.caseStudy.problem} onChange={(problem) => set({ caseStudy: { ...draft.caseStudy, problem } })} />
          <TextArea label="The approach" rows={4} value={draft.caseStudy.approach} onChange={(approach) => set({ caseStudy: { ...draft.caseStudy, approach } })} />
          <LinesField label="What I'd improve" hint="Optional; the section is hidden when empty" rows={3} value={draft.caseStudy.improve} onChange={(improve) => set({ caseStudy: { ...draft.caseStudy, improve } })} />
        </FieldGroup>

        <FieldGroup title="Demo access" description="Optional. Use a dedicated demo account — this is shown publicly.">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Demo email" value={draft.demo.email} onChange={(email) => set({ demo: { ...draft.demo, email } })} />
            <TextField label="Demo password" value={draft.demo.password} onChange={(password) => set({ demo: { ...draft.demo, password } })} />
          </div>
          <TextField label="Note" hint="e.g. Read-only student account" value={draft.demo.note} onChange={(note) => set({ demo: { ...draft.demo, note } })} />
          <div>
            <p className="text-sm font-medium">Screen recording</p>
            {draft.video ? (
              <div className="mt-2 flex items-center gap-3 text-sm">
                <a href={draft.video.src} target="_blank" rel="noreferrer" className="text-lime underline-offset-4 hover:underline">
                  Current video
                </a>
                <button type="button" onClick={() => set({ video: null })} className="text-muted hover:text-danger">
                  Remove
                </button>
              </div>
            ) : (
              <div className="mt-2">
                <Uploader kind="video" label="Upload video" onUploaded={(f) => set({ video: { src: f.url } })} />
              </div>
            )}
          </div>
        </FieldGroup>

        <SaveBar dirty={dirty || isNew} pending={pending} result={result} onSave={onSave} label={isNew ? "Create project" : "Save changes"} />
      </div>

      <Preview scale={0.6} height={760}>
        <div className="space-y-8 p-10">
          <div className="mx-auto aspect-[16/10] w-full max-w-[760px] rounded-3xl border border-border bg-surface p-3">
            <ProjectVisual project={preview} sizes="460px" />
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="eyebrow text-lime">{preview.tag}</p>
              <h3 className="display mt-3 text-5xl">{preview.title || "Untitled"}</h3>
              <p className="mt-1 text-subtle">{preview.subtitle}</p>
              <Metrics items={preview.metrics} className="mt-4" />
              <p className="mt-5 leading-relaxed text-muted">{preview.summary}</p>
            </div>
            <div className="flex flex-col gap-6 md:col-span-5 md:pt-8">
              <ul className="flex flex-wrap gap-2">
                {preview.stack.map((s) => (
                  <li key={s}>
                    <Chip>{s}</Chip>
                  </li>
                ))}
              </ul>
              <ProjectLinks live={preview.live} code={preview.code} label={preview.title} />
            </div>
          </div>
        </div>
      </Preview>
    </div>
  );
}
