import { z } from "zod";

/** Server-side schemas for every admin save. Never trust the client. */

const text = (max: number) => z.string().trim().max(max);
const required = (max: number, label: string) =>
  z.string().trim().min(1, `${label} is required`).max(max, `${label} is too long`);

/** Treat "", whitespace and missing values as null for optional fields. */
const emptyToNull = (v: unknown) =>
  v === undefined || (typeof v === "string" && v.trim() === "") ? null : v;

const httpsUrl = z
  .string()
  .trim()
  .max(500)
  .url("Must be a full URL")
  .refine((u) => u.startsWith("https://") || u.startsWith("http://"), "Must start with https://");

const optionalUrl = z.preprocess(emptyToNull, httpsUrl.nullable());

/**
 * Asset URLs (images, CV) must live on this site ("/…") or in our Cloudinary
 * account, so the admin can't be tricked into embedding arbitrary hosts.
 */
export const assetUrl = z
  .string()
  .trim()
  .max(500)
  .refine((u) => {
    if (u.startsWith("/") && !u.startsWith("//")) return true;
    const cloud = process.env.CLOUDINARY_CLOUD_NAME;
    return Boolean(cloud) && u.startsWith(`https://res.cloudinary.com/${cloud}/`);
  }, "Upload the file here (or use a path on this site)");

/** CV may also be an external document link (e.g. Google Drive). */
const cvUrl = z.preprocess(
  emptyToNull,
  z.union([assetUrl, httpsUrl]).nullable()
);

const lines = (maxItems: number, maxLen: number) =>
  z.array(text(maxLen)).max(maxItems).transform((a) => a.filter(Boolean));

const publicId = z.preprocess(emptyToNull, text(300).nullable());

export const settingsSchema = z.object({
  profile: z.object({
    name: required(80, "Name"),
    roles: lines(6, 80).refine((a) => a.length > 0, "Add at least one role"),
    intro: required(600, "Intro"),
    focus: lines(6, 80),
    services: lines(10, 80),
    a2sv: text(400),
    photo: z.preprocess(emptyToNull, assetUrl.nullable()),
    photoPublicId: publicId,
    cv: cvUrl,
    cvPublicId: publicId,
  }),
  socials: z.object({
    email: z.string().trim().email("Enter a valid email").max(200),
    github: httpsUrl,
    linkedin: httpsUrl,
    leetcode: optionalUrl,
    codeforces: optionalUrl,
    upwork: optionalUrl,
  }),
});
export type SettingsInput = z.infer<typeof settingsSchema>;

export const experienceListSchema = z
  .array(
    z.object({
      role: required(120, "Role"),
      org: required(160, "Company"),
      mode: text(80),
      start: required(40, "Start date"),
      end: z.preprocess(emptyToNull, text(40).nullable()),
      summary: text(400),
      bullets: lines(12, 300),
    })
  )
  .max(30);

export const skillGroupListSchema = z
  .array(z.object({ title: required(60, "Group title"), items: lines(30, 60) }))
  .max(12);

export const credentialsSchema = z.object({
  education: z.array(z.object({ degree: required(160, "Degree"), school: required(160, "School") })).max(10),
  certificates: z
    .array(z.object({ title: required(160, "Title"), issuer: required(120, "Issuer"), url: optionalUrl }))
    .max(30),
});

const slug = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Slug is required")
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes");

export const projectSchema = z.object({
  id: z.number().int().positive().optional(),
  slug,
  title: required(120, "Title"),
  subtitle: text(160),
  tag: text(80),
  summary: required(800, "Description"),
  role: z.preprocess(emptyToNull, text(600).nullable()),
  metrics: lines(6, 40),
  highlights: lines(12, 400),
  stack: lines(20, 40),
  live: optionalUrl,
  code: optionalUrl,
  featured: z.boolean(),
  images: z
    .array(z.object({ src: assetUrl, alt: text(200), publicId }))
    .max(12),
  caseStudy: z
    .object({ problem: text(2000), approach: text(3000), improve: lines(10, 400) })
    .nullable(),
  demo: z
    .object({
      email: text(200),
      password: text(200),
      note: z.preprocess(emptyToNull, text(300).nullable()),
    })
    .nullable(),
  video: z.object({ src: assetUrl }).nullable(),
});
export type ProjectInput = z.infer<typeof projectSchema>;

/** Flatten Zod issues into { "path.to.field": "message" } for the forms. */
export function fieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
