"use server";

import { redirect } from "next/navigation";
import { eq, inArray, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { projectToRow } from "@/db/content";
import {
  certificates,
  education,
  experiences,
  projectImages,
  projects,
  siteSettings,
  skillGroups,
} from "@/db/schema";
import { endSession, requireAdmin } from "@/lib/auth";
import { destroyAssets } from "@/lib/cloudinary";
import { revalidateContent } from "@/lib/content";
import {
  credentialsSchema,
  experienceListSchema,
  fieldErrors,
  projectSchema,
  settingsSchema,
  skillGroupListSchema,
} from "@/lib/validation";

export type ActionResult =
  | { ok: true; id?: number }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

function invalid(error: import("zod").ZodError): ActionResult {
  const first = error.issues[0]?.message;
  return {
    ok: false,
    error: first ? `Please fix the highlighted fields — ${first}` : "Please fix the highlighted fields.",
    fieldErrors: fieldErrors(error),
  };
}

function failed(err: unknown): ActionResult {
  console.error("[admin] save failed:", err);
  return { ok: false, error: "Could not save. Check the database connection and try again." };
}

/* ---------------------------- Profile & contact --------------------------- */

export async function saveSettings(input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = settingsSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);
  const { profile: p, socials: s } = parsed.data;

  try {
    const db = getDb();
    const [old] = await db
      .select({ photo: siteSettings.photoPublicId, cv: siteSettings.cvPublicId })
      .from(siteSettings)
      .limit(1);

    const values = {
      name: p.name,
      roles: p.roles,
      intro: p.intro,
      focus: p.focus,
      services: p.services,
      a2sv: p.a2sv,
      photoUrl: p.photo,
      photoPublicId: p.photo ? p.photoPublicId : null,
      cvUrl: p.cv,
      cvPublicId: p.cv ? p.cvPublicId : null,
      email: s.email,
      githubUrl: s.github,
      linkedinUrl: s.linkedin,
      leetcodeUrl: s.leetcode,
      codeforcesUrl: s.codeforces,
      upworkUrl: s.upwork,
      updatedAt: new Date(),
    };
    await db
      .insert(siteSettings)
      .values({ id: 1, ...values })
      .onConflictDoUpdate({ target: siteSettings.id, set: values });

    revalidateContent();
    if (old?.photo && old.photo !== values.photoPublicId) await destroyAssets([old.photo], "image");
    if (old?.cv && old.cv !== values.cvPublicId) await destroyAssets([old.cv], "cv");
    return { ok: true };
  } catch (err) {
    return failed(err);
  }
}

/* --------------------------------- Lists --------------------------------- */

export async function saveExperience(input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = experienceListSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);
  try {
    await getDb().transaction(async (tx) => {
      await tx.delete(experiences);
      if (parsed.data.length)
        await tx.insert(experiences).values(parsed.data.map((e, i) => ({ ...e, sortOrder: i })));
    });
    revalidateContent();
    return { ok: true };
  } catch (err) {
    return failed(err);
  }
}

export async function saveSkillGroups(input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = skillGroupListSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);
  try {
    await getDb().transaction(async (tx) => {
      await tx.delete(skillGroups);
      if (parsed.data.length)
        await tx.insert(skillGroups).values(parsed.data.map((g, i) => ({ ...g, sortOrder: i })));
    });
    revalidateContent();
    return { ok: true };
  } catch (err) {
    return failed(err);
  }
}

export async function saveCredentials(input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = credentialsSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);
  try {
    await getDb().transaction(async (tx) => {
      await tx.delete(education);
      await tx.delete(certificates);
      if (parsed.data.education.length)
        await tx.insert(education).values(parsed.data.education.map((e, i) => ({ ...e, sortOrder: i })));
      if (parsed.data.certificates.length)
        await tx
          .insert(certificates)
          .values(parsed.data.certificates.map((c, i) => ({ ...c, sortOrder: i })));
    });
    revalidateContent();
    return { ok: true };
  } catch (err) {
    return failed(err);
  }
}

/* -------------------------------- Projects -------------------------------- */

export async function saveProject(input: unknown): Promise<ActionResult> {
  await requireAdmin();
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) return invalid(parsed.error);
  const data = parsed.data;

  const caseStudy =
    data.caseStudy && (data.caseStudy.problem || data.caseStudy.approach) ? data.caseStudy : null;
  const demo = data.demo && data.demo.email && data.demo.password ? data.demo : null;

  try {
    const db = getDb();

    const [clash] = await db
      .select({ id: projects.id })
      .from(projects)
      .where(eq(projects.slug, data.slug))
      .limit(1);
    if (clash && clash.id !== data.id) {
      return { ok: false, error: "Please fix the highlighted fields.", fieldErrors: { slug: "Another project already uses this slug" } };
    }

    let removed: (string | null)[] = [];
    const id = await db.transaction(async (tx) => {
      let projectId = data.id;
      if (projectId) {
        const [existing] = await tx
          .select({ sortOrder: projects.sortOrder })
          .from(projects)
          .where(eq(projects.id, projectId));
        if (!existing) throw new Error("Project not found");
        const row = projectToRow({ ...data, caseStudy, demo }, existing.sortOrder);
        await tx.update(projects).set(row).where(eq(projects.id, projectId));
        const oldImages = await tx
          .select({ publicId: projectImages.publicId })
          .from(projectImages)
          .where(eq(projectImages.projectId, projectId));
        const kept = new Set(data.images.map((i) => i.publicId));
        removed = oldImages.map((i) => i.publicId).filter((pid) => pid && !kept.has(pid));
        await tx.delete(projectImages).where(eq(projectImages.projectId, projectId));
      } else {
        const [{ next }] = await tx
          .select({ next: sql<number>`coalesce(max(${projects.sortOrder}) + 1, 0)::int` })
          .from(projects);
        const [created] = await tx
          .insert(projects)
          .values(projectToRow({ ...data, caseStudy, demo }, next))
          .returning({ id: projects.id });
        projectId = created.id;
      }
      if (data.images.length) {
        await tx.insert(projectImages).values(
          data.images.map((img, i) => ({
            projectId: projectId!,
            url: img.src,
            publicId: img.publicId,
            alt: img.alt,
            sortOrder: i,
          }))
        );
      }
      return projectId!;
    });

    revalidateContent();
    await destroyAssets(removed, "image");
    return { ok: true, id };
  } catch (err) {
    return failed(err);
  }
}

export async function deleteProject(id: number): Promise<ActionResult> {
  await requireAdmin();
  if (!Number.isInteger(id) || id <= 0) return { ok: false, error: "Invalid project" };
  try {
    const db = getDb();
    const images = await db
      .select({ publicId: projectImages.publicId })
      .from(projectImages)
      .where(eq(projectImages.projectId, id));
    await db.delete(projects).where(eq(projects.id, id)); // images cascade
    revalidateContent();
    await destroyAssets(images.map((i) => i.publicId), "image");
    return { ok: true };
  } catch (err) {
    return failed(err);
  }
}

export async function setProjectFeatured(id: number, featured: boolean): Promise<ActionResult> {
  await requireAdmin();
  if (!Number.isInteger(id) || typeof featured !== "boolean") return { ok: false, error: "Invalid request" };
  try {
    await getDb().update(projects).set({ featured, updatedAt: new Date() }).where(eq(projects.id, id));
    revalidateContent();
    return { ok: true };
  } catch (err) {
    return failed(err);
  }
}

export async function reorderProjects(ids: number[]): Promise<ActionResult> {
  await requireAdmin();
  if (!Array.isArray(ids) || ids.length > 100 || !ids.every((n) => Number.isInteger(n) && n > 0)) {
    return { ok: false, error: "Invalid order" };
  }
  try {
    const db = getDb();
    await db.transaction(async (tx) => {
      const existing = await tx.select({ id: projects.id }).from(projects).where(inArray(projects.id, ids));
      if (existing.length !== ids.length) throw new Error("Unknown project in order");
      for (const [i, id] of ids.entries()) {
        await tx.update(projects).set({ sortOrder: i }).where(eq(projects.id, id));
      }
    });
    revalidateContent();
    return { ok: true };
  } catch (err) {
    return failed(err);
  }
}

/* --------------------------------- Session -------------------------------- */

export async function logout() {
  await endSession();
  redirect("/admin/login");
}
