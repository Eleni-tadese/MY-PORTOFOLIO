import { asc } from "drizzle-orm";
import type { getDb } from "./index";
import {
  certificates,
  education,
  experiences,
  projectImages,
  projects,
  siteSettings,
  skillGroups,
} from "./schema";
import type { Project, SiteContent } from "@/content/types";

type Db = ReturnType<typeof getDb>;
type Tx = Parameters<Parameters<Db["transaction"]>[0]>[0];
type ProjectRow = typeof projects.$inferSelect;
type ImageRow = typeof projectImages.$inferSelect;

export function rowToProject(p: ProjectRow, images: ImageRow[]): Project {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    tag: p.tag,
    summary: p.summary,
    role: p.role,
    metrics: p.metrics,
    highlights: p.highlights,
    stack: p.stack,
    live: p.liveUrl,
    code: p.codeUrl,
    featured: p.featured,
    images: images.map((i) => ({ src: i.url, alt: i.alt, publicId: i.publicId })),
    caseStudy:
      p.caseProblem || p.caseApproach
        ? { problem: p.caseProblem ?? "", approach: p.caseApproach ?? "", improve: p.caseImprove }
        : null,
    demo:
      p.demoEmail && p.demoPassword
        ? { email: p.demoEmail, password: p.demoPassword, note: p.demoNote }
        : null,
    video: p.videoUrl ? { src: p.videoUrl } : null,
  };
}

export function projectToRow(p: Project, sort: number) {
  return {
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    tag: p.tag,
    summary: p.summary,
    role: p.role ?? null,
    metrics: p.metrics ?? [],
    highlights: p.highlights,
    stack: p.stack,
    liveUrl: p.live,
    codeUrl: p.code,
    featured: p.featured,
    sortOrder: sort,
    caseProblem: p.caseStudy?.problem || null,
    caseApproach: p.caseStudy?.approach || null,
    caseImprove: p.caseStudy?.improve ?? [],
    demoEmail: p.demo?.email || null,
    demoPassword: p.demo?.password || null,
    demoNote: p.demo?.note || null,
    videoUrl: p.video?.src || null,
    updatedAt: new Date(),
  };
}

/** Read the whole site from the database. Returns null if nothing is seeded yet. */
export async function loadContent(db: Db): Promise<SiteContent | null> {
  const [settings] = await db.select().from(siteSettings).limit(1);
  if (!settings) return null;

  const [projectRows, imageRows, expRows, skillRows, certRows, eduRows] = await Promise.all([
    db.select().from(projects).orderBy(asc(projects.sortOrder), asc(projects.id)),
    db.select().from(projectImages).orderBy(asc(projectImages.sortOrder), asc(projectImages.id)),
    db.select().from(experiences).orderBy(asc(experiences.sortOrder), asc(experiences.id)),
    db.select().from(skillGroups).orderBy(asc(skillGroups.sortOrder), asc(skillGroups.id)),
    db.select().from(certificates).orderBy(asc(certificates.sortOrder), asc(certificates.id)),
    db.select().from(education).orderBy(asc(education.sortOrder), asc(education.id)),
  ]);

  return {
    profile: {
      name: settings.name,
      roles: settings.roles,
      intro: settings.intro,
      focus: settings.focus,
      services: settings.services,
      a2sv: settings.a2sv,
      photo: settings.photoUrl,
      photoPublicId: settings.photoPublicId,
      cv: settings.cvUrl,
      cvPublicId: settings.cvPublicId,
    },
    socials: {
      email: settings.email,
      github: settings.githubUrl,
      linkedin: settings.linkedinUrl,
      leetcode: settings.leetcodeUrl,
      codeforces: settings.codeforcesUrl,
      upwork: settings.upworkUrl,
    },
    projects: projectRows.map((p) =>
      rowToProject(p, imageRows.filter((i) => i.projectId === p.id))
    ),
    experience: expRows.map((e) => ({
      id: e.id,
      role: e.role,
      org: e.org,
      mode: e.mode,
      start: e.start,
      end: e.end,
      summary: e.summary,
      bullets: e.bullets,
    })),
    skillGroups: skillRows.map((s) => ({ id: s.id, title: s.title, items: s.items })),
    certificates: certRows.map((c) => ({ id: c.id, title: c.title, issuer: c.issuer, url: c.url })),
    education: eduRows.map((e) => ({ id: e.id, degree: e.degree, school: e.school })),
  };
}

/** Replace all content with `content` in one transaction (used by the seed script). */
export async function writeContent(db: Db, content: SiteContent) {
  await db.transaction(async (tx: Tx) => {
    for (const t of [projectImages, projects, experiences, skillGroups, certificates, education]) {
      await tx.delete(t);
    }
    const { profile: p, socials: s } = content;
    const settings = {
      name: p.name,
      roles: p.roles,
      intro: p.intro,
      focus: p.focus,
      services: p.services,
      a2sv: p.a2sv,
      photoUrl: p.photo,
      photoPublicId: p.photoPublicId ?? null,
      cvUrl: p.cv,
      cvPublicId: p.cvPublicId ?? null,
      email: s.email,
      githubUrl: s.github,
      linkedinUrl: s.linkedin,
      leetcodeUrl: s.leetcode,
      codeforcesUrl: s.codeforces,
      upworkUrl: s.upwork,
      updatedAt: new Date(),
    };
    await tx
      .insert(siteSettings)
      .values({ id: 1, ...settings })
      .onConflictDoUpdate({ target: siteSettings.id, set: settings });

    for (const [i, project] of content.projects.entries()) {
      const [row] = await tx
        .insert(projects)
        .values(projectToRow(project, i))
        .returning({ id: projects.id });
      if (project.images.length) {
        await tx.insert(projectImages).values(
          project.images.map((img, j) => ({
            projectId: row.id,
            url: img.src,
            publicId: img.publicId ?? null,
            alt: img.alt,
            sortOrder: j,
          }))
        );
      }
    }
    if (content.experience.length)
      await tx.insert(experiences).values(
        content.experience.map((e, i) => ({
          role: e.role,
          org: e.org,
          mode: e.mode,
          start: e.start,
          end: e.end,
          summary: e.summary,
          bullets: e.bullets,
          sortOrder: i,
        }))
      );
    if (content.skillGroups.length)
      await tx
        .insert(skillGroups)
        .values(content.skillGroups.map((g, i) => ({ title: g.title, items: g.items, sortOrder: i })));
    if (content.certificates.length)
      await tx.insert(certificates).values(
        content.certificates.map((c, i) => ({ title: c.title, issuer: c.issuer, url: c.url, sortOrder: i }))
      );
    if (content.education.length)
      await tx
        .insert(education)
        .values(content.education.map((e, i) => ({ degree: e.degree, school: e.school, sortOrder: i })));
  });
}
