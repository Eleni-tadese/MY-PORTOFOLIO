"use client";

import type { Certificate, Education, Experience, Profile, Project, SkillGroup } from "@/content/types";
import { saveCredentials, saveExperience, saveSkillGroups } from "@/app/admin/actions";
import Timeline from "@/components/Timeline";
import SkillExplorer from "@/components/SkillExplorer";
import About from "@/components/About";
import { FieldGroup, LinesField, TextArea, TextField } from "../fields";
import ListEditor from "../ListEditor";
import Preview from "../Preview";
import SaveBar from "../SaveBar";
import { useDraft } from "../useSave";

/** Drop database ids; lists are saved as a whole, in order. */
const strip = <T extends { id?: number }>(items: T[]) =>
  items.map((item) => {
    const rest = { ...item };
    delete rest.id;
    return rest as Omit<T, "id">;
  });

function Layout({ form, preview }: { form: React.ReactNode; preview: React.ReactNode }) {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>{form}</div>
      {preview}
    </div>
  );
}

/* -------------------------------- Experience ------------------------------- */

type Exp = Omit<Experience, "id">;

export function ExperienceEditor({ initial }: { initial: Experience[] }) {
  const { draft, setDraft, dirty, pending, result, errors, save } = useDraft<Exp[]>(
    strip(initial),
    saveExperience as (v: Exp[]) => ReturnType<typeof saveExperience>
  );
  return (
    <Layout
      form={
        <>
          <ListEditor
            items={draft}
            onChange={setDraft}
            title={(e) => e.role}
            empty="No roles yet."
            addLabel="Add role"
            create={() => ({ role: "", org: "", mode: "", start: "", end: null, summary: "", bullets: [] })}
            render={(e, update, i) => (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField label="Role" value={e.role} onChange={(role) => update({ role })} error={errors[`${i}.role`]} />
                  <TextField label="Company" value={e.org} onChange={(org) => update({ org })} error={errors[`${i}.org`]} />
                  <TextField label="Start" placeholder="05/2026" value={e.start} onChange={(start) => update({ start })} error={errors[`${i}.start`]} />
                  <TextField label="End" hint="Leave empty for “Present”" placeholder="09/2026" value={e.end ?? ""} onChange={(end) => update({ end })} error={errors[`${i}.end`]} />
                </div>
                <TextField label="Type" hint="e.g. Remote · Freelance" value={e.mode} onChange={(mode) => update({ mode })} />
                <TextArea label="Summary" hint="The line shown on the timeline." rows={2} value={e.summary} onChange={(summary) => update({ summary })} error={errors[`${i}.summary`]} />
                <LinesField label="Bullet points" hint="Kept for your records and future use; one per line." value={e.bullets} onChange={(bullets) => update({ bullets })} />
              </>
            )}
          />
          <SaveBar dirty={dirty} pending={pending} result={result} onSave={() => save()} />
        </>
      }
      preview={
        <Preview scale={0.6}>
          <div className="p-10">
            <Timeline items={draft} />
          </div>
        </Preview>
      }
    />
  );
}

/* ---------------------------------- Skills --------------------------------- */

type Group = Omit<SkillGroup, "id">;

export function SkillsEditor({ initial, projects }: { initial: SkillGroup[]; projects: Project[] }) {
  const { draft, setDraft, dirty, pending, result, errors, save } = useDraft<Group[]>(
    strip(initial),
    saveSkillGroups as (v: Group[]) => ReturnType<typeof saveSkillGroups>
  );
  return (
    <Layout
      form={
        <>
          <ListEditor
            items={draft}
            onChange={setDraft}
            title={(g) => g.title}
            empty="No skill groups yet."
            addLabel="Add group"
            create={() => ({ title: "", items: [] })}
            render={(g, update, i) => (
              <>
                <TextField label="Group title" value={g.title} onChange={(title) => update({ title })} error={errors[`${i}.title`]} />
                <LinesField label="Skills" rows={5} value={g.items} onChange={(items) => update({ items })} />
              </>
            )}
          />
          <SaveBar dirty={dirty} pending={pending} result={result} onSave={() => save()} />
        </>
      }
      preview={
        <Preview scale={0.6}>
          <div className="p-10">
            <SkillExplorer
              key={draft.length}
              skillGroups={draft.map((g) => ({ ...g, items: g.items.filter((s) => s.trim()) }))}
              projects={projects}
            />
          </div>
        </Preview>
      }
    />
  );
}

/* -------------------------------- Credentials ------------------------------ */

type Creds = { education: Omit<Education, "id">[]; certificates: Omit<Certificate, "id">[] };

export function CredentialsEditor({
  education,
  certificates,
  profile,
}: {
  education: Education[];
  certificates: Certificate[];
  profile: Profile;
}) {
  const { draft, setDraft, dirty, pending, result, errors, save } = useDraft<Creds>(
    { education: strip(education), certificates: strip(certificates) },
    saveCredentials as (v: Creds) => ReturnType<typeof saveCredentials>
  );
  return (
    <Layout
      form={
        <div className="space-y-6">
          <FieldGroup title="Education">
            <ListEditor
              items={draft.education}
              onChange={(education) => setDraft({ ...draft, education })}
              title={(e) => e.degree}
              empty="No education entries."
              addLabel="Add education"
              create={() => ({ degree: "", school: "" })}
              render={(e, update, i) => (
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField label="Degree" value={e.degree} onChange={(degree) => update({ degree })} error={errors[`education.${i}.degree`]} />
                  <TextField label="School" value={e.school} onChange={(school) => update({ school })} error={errors[`education.${i}.school`]} />
                </div>
              )}
            />
          </FieldGroup>
          <FieldGroup title="Certificates">
            <ListEditor
              items={draft.certificates}
              onChange={(certificates) => setDraft({ ...draft, certificates })}
              title={(c) => c.title}
              empty="No certificates."
              addLabel="Add certificate"
              create={() => ({ title: "", issuer: "", url: null })}
              render={(c, update, i) => (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField label="Title" value={c.title} onChange={(title) => update({ title })} error={errors[`certificates.${i}.title`]} />
                    <TextField label="Issuer" value={c.issuer} onChange={(issuer) => update({ issuer })} error={errors[`certificates.${i}.issuer`]} />
                  </div>
                  <TextField label="Certificate link" hint="Optional" type="url" value={c.url ?? ""} onChange={(url) => update({ url })} error={errors[`certificates.${i}.url`]} />
                </>
              )}
            />
          </FieldGroup>
          <SaveBar dirty={dirty} pending={pending} result={result} onSave={() => save()} />
        </div>
      }
      preview={
        <Preview scale={0.55}>
          <About profile={profile} education={draft.education} certificates={draft.certificates.map((c) => ({ ...c, url: c.url || null }))} />
        </Preview>
      }
    />
  );
}
