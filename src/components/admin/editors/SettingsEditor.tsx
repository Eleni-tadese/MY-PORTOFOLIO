"use client";

import Image from "next/image";
import { FileText, Trash2 } from "lucide-react";
import type { Certificate, Education, Profile, Socials } from "@/content/types";
import { saveSettings } from "@/app/admin/actions";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { FieldGroup, LinesField, TextArea, TextField } from "../fields";
import Preview from "../Preview";
import SaveBar from "../SaveBar";
import Uploader from "../Uploader";
import { useDraft } from "../useSave";

type Settings = { profile: Profile; socials: Socials };

export default function SettingsEditor({
  section,
  initial,
  education,
  certificates,
}: {
  section: "hero" | "about" | "contact";
  initial: Settings;
  education: Education[];
  certificates: Certificate[];
}) {
  const { draft, setDraft, dirty, pending, result, errors, save } = useDraft(
    initial,
    saveSettings as (s: Settings) => ReturnType<typeof saveSettings>
  );
  const p = draft.profile;
  const s = draft.socials;
  const setP = (patch: Partial<Profile>) => setDraft({ ...draft, profile: { ...p, ...patch } });
  const setS = (patch: Partial<Socials>) => setDraft({ ...draft, socials: { ...s, ...patch } });
  const err = (k: string) => errors[k];

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="space-y-6">
        {section === "hero" && (
          <>
            <FieldGroup title="Hero" description="The first thing visitors see.">
              <TextField label="Name" value={p.name} onChange={(name) => setP({ name })} error={err("profile.name")} />
              <LinesField
                label="Roles"
                hint="One per line. They rotate under your name."
                rows={3}
                value={p.roles}
                onChange={(roles) => setP({ roles })}
                error={err("profile.roles")}
              />
              <TextArea label="Intro" rows={4} value={p.intro} onChange={(intro) => setP({ intro })} error={err("profile.intro")} />
            </FieldGroup>
            <FieldGroup title="Profile photo">
              <div className="flex flex-wrap items-center gap-5">
                {p.photo ? (
                  <div className="relative h-28 w-24 overflow-hidden rounded-xl border border-border-strong">
                    <Image src={p.photo} alt="" fill sizes="96px" className="object-cover" />
                  </div>
                ) : (
                  <div className="flex h-28 w-24 items-center justify-center rounded-xl border border-dashed border-border-strong text-xs text-subtle">
                    No photo
                  </div>
                )}
                <div className="space-y-3">
                  <Uploader
                    kind="image"
                    label={p.photo ? "Replace photo" : "Upload photo"}
                    onUploaded={(f) => setP({ photo: f.url, photoPublicId: f.publicId })}
                  />
                  {p.photo && (
                    <button
                      type="button"
                      onClick={() => setP({ photo: null, photoPublicId: null })}
                      className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-danger"
                    >
                      <Trash2 size={13} aria-hidden /> Remove photo
                    </button>
                  )}
                </div>
              </div>
              {err("profile.photo") && <p className="text-xs text-danger">{err("profile.photo")}</p>}
            </FieldGroup>
            <FieldGroup title="CV" description="Used by the “View CV” button. Upload a PDF or paste a link.">
              {p.cv && (
                <a href={p.cv} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-lime underline-offset-4 hover:underline">
                  <FileText size={15} aria-hidden /> Current CV
                </a>
              )}
              <Uploader kind="cv" label={p.cv ? "Replace CV (PDF)" : "Upload CV (PDF)"} onUploaded={(f) => setP({ cv: f.url, cvPublicId: f.publicId })} />
              <TextField
                label="…or link to a document"
                hint="e.g. a Google Drive link. Leave empty to hide the button."
                type="url"
                value={p.cv ?? ""}
                onChange={(cv) => setP({ cv, cvPublicId: null })}
                error={err("profile.cv")}
              />
            </FieldGroup>
          </>
        )}

        {section === "about" && (
          <FieldGroup title="About" description="Education and certificates are edited under Credentials.">
            <LinesField
              label="Focus areas"
              hint="Shown as: “Software Engineer working across A, B, and C.” One per line."
              rows={3}
              value={p.focus}
              onChange={(focus) => setP({ focus })}
              error={err("profile.focus")}
            />
            <LinesField
              label="What I can help with"
              rows={4}
              value={p.services}
              onChange={(services) => setP({ services })}
              error={err("profile.services")}
            />
            <TextArea
              label="Problem-solving text"
              hint="Shown on the Problem Solving card in the Skills section."
              rows={3}
              value={p.a2sv}
              onChange={(a2sv) => setP({ a2sv })}
              error={err("profile.a2sv")}
            />
          </FieldGroup>
        )}

        {section === "contact" && (
          <>
            <FieldGroup title="Contact links">
              <TextField label="Email" type="email" value={s.email} onChange={(email) => setS({ email })} error={err("socials.email")} />
              <TextField label="GitHub URL" hint="Contact buttons and “Practice projects on GitHub” under Work" type="url" value={s.github} onChange={(github) => setS({ github })} error={err("socials.github")} />
              <TextField label="LinkedIn URL" hint="Contact buttons" type="url" value={s.linkedin} onChange={(linkedin) => setS({ linkedin })} error={err("socials.linkedin")} />
              <TextField label="LeetCode URL" hint="Optional — Problem Solving card in Skills" type="url" value={s.leetcode ?? ""} onChange={(v) => setS({ leetcode: v })} error={err("socials.leetcode")} />
              <TextField label="Codeforces URL" hint="Optional — Problem Solving card in Skills" type="url" value={s.codeforces ?? ""} onChange={(v) => setS({ codeforces: v })} error={err("socials.codeforces")} />
              <TextField label="Upwork URL" hint="Optional — shown in Contact when set" type="url" value={s.upwork ?? ""} onChange={(v) => setS({ upwork: v })} error={err("socials.upwork")} />
            </FieldGroup>
          </>
        )}

        <SaveBar dirty={dirty} pending={pending} result={result} onSave={() => save()} />
      </div>

      <Preview scale={section === "hero" ? 0.5 : 0.6}>
        {section === "hero" && <Hero profile={p} />}
        {section === "about" && <About profile={p} education={education} certificates={certificates} />}
        {section === "contact" && <Contact socials={{ ...s, upwork: s.upwork || null }} />}
      </Preview>
    </div>
  );
}
