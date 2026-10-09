import {
  boolean,
  check,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

const stringList = (name: string) => jsonb(name).$type<string[]>().notNull().default([]);
const sortOrder = () => integer("sort_order").notNull().default(0);
const updatedAt = () =>
  timestamp("updated_at", { withTimezone: true }).notNull().defaultNow();

/** Single row (id = 1): hero, about, contact links and CV. */
export const siteSettings = pgTable(
  "site_settings",
  {
    id: integer("id").primaryKey().default(1),
    name: text("name").notNull(),
    roles: stringList("roles"),
    intro: text("intro").notNull(),
    focus: stringList("focus"),
    services: stringList("services"),
    a2sv: text("a2sv").notNull().default(""),
    photoUrl: text("photo_url"),
    photoPublicId: text("photo_public_id"),
    cvUrl: text("cv_url"),
    cvPublicId: text("cv_public_id"),
    email: text("email").notNull(),
    githubUrl: text("github_url").notNull(),
    linkedinUrl: text("linkedin_url").notNull(),
    leetcodeUrl: text("leetcode_url"),
    codeforcesUrl: text("codeforces_url"),
    upworkUrl: text("upwork_url"),
    updatedAt: updatedAt(),
  },
  (t) => [check("site_settings_singleton", sql`${t.id} = 1`)]
);

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull().default(""),
  tag: text("tag").notNull().default(""),
  summary: text("summary").notNull(),
  role: text("role"),
  metrics: stringList("metrics"),
  highlights: stringList("highlights"),
  stack: stringList("stack"),
  liveUrl: text("live_url"),
  codeUrl: text("code_url"),
  featured: boolean("featured").notNull().default(true),
  sortOrder: sortOrder(),
  caseProblem: text("case_problem"),
  caseApproach: text("case_approach"),
  caseImprove: stringList("case_improve"),
  demoEmail: text("demo_email"),
  demoPassword: text("demo_password"),
  demoNote: text("demo_note"),
  videoUrl: text("video_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: updatedAt(),
});

export const projectImages = pgTable(
  "project_images",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    publicId: text("public_id"),
    alt: text("alt").notNull().default(""),
    sortOrder: sortOrder(),
  },
  (t) => [index("project_images_project_idx").on(t.projectId, t.sortOrder)]
);

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(),
  org: text("org").notNull(),
  mode: text("mode").notNull().default(""),
  start: text("start_label").notNull(),
  end: text("end_label"),
  summary: text("summary").notNull().default(""),
  bullets: stringList("bullets"),
  sortOrder: sortOrder(),
});

export const skillGroups = pgTable("skill_groups", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  items: stringList("items"),
  sortOrder: sortOrder(),
});

export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  issuer: text("issuer").notNull(),
  url: text("url"),
  sortOrder: sortOrder(),
});

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  degree: text("degree").notNull(),
  school: text("school").notNull(),
  sortOrder: sortOrder(),
});

/** Used to rate-limit the admin login per IP. */
export const loginAttempts = pgTable(
  "login_attempts",
  {
    id: serial("id").primaryKey(),
    ip: text("ip").notNull(),
    success: boolean("success").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("login_attempts_ip_time_idx").on(t.ip, t.createdAt)]
);
