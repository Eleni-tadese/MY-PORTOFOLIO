import Link from "next/link";
import { ArrowUpRight, CheckCircle2, CircleAlert } from "lucide-react";
import { hasDatabase } from "@/db";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { getAdminContent } from "../data";
import PageHeader from "./PageHeader";

export default async function AdminHome() {
  const { content, problem } = await getAdminContent();
  const cards = [
    { href: "/admin/hero", title: "Hero", detail: content.profile.name },
    { href: "/admin/about", title: "About", detail: `${content.profile.services.length} services` },
    { href: "/admin/projects", title: "Projects", detail: `${content.projects.length} projects, ${content.projects.filter((p) => p.featured).length} featured` },
    { href: "/admin/experience", title: "Experience", detail: `${content.experience.length} roles` },
    { href: "/admin/skills", title: "Skills", detail: `${content.skillGroups.length} groups` },
    { href: "/admin/credentials", title: "Credentials", detail: `${content.education.length} education, ${content.certificates.length} certificates` },
    { href: "/admin/contact", title: "Contact", detail: content.socials.email },
  ];
  const checks = [
    { ok: hasDatabase() && !problem, label: "Database connected" },
    { ok: isCloudinaryConfigured(), label: "Image & CV uploads (Cloudinary)" },
  ];

  return (
    <>
      <PageHeader title="Overview" description="Edit any section; saving updates the live site immediately." problem={problem} />
      <ul className="mb-10 flex flex-wrap gap-3">
        {checks.map((c) => (
          <li key={c.label} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${c.ok ? "border-lime/40 text-lime" : "border-danger/40 text-danger"}`}>
            {c.ok ? <CheckCircle2 size={15} aria-hidden /> : <CircleAlert size={15} aria-hidden />}
            {c.label}
            <span className="sr-only">{c.ok ? "OK" : "not configured"}</span>
          </li>
        ))}
      </ul>
      <ul className="grid gap-4 pb-12 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="glow-card group flex h-full items-start justify-between gap-4 rounded-2xl border border-border bg-surface p-6">
              <span>
                <span className="block text-lg font-medium">{c.title}</span>
                <span className="mt-1 block text-sm text-subtle">{c.detail}</span>
              </span>
              <ArrowUpRight size={18} aria-hidden className="text-subtle transition-colors group-hover:text-lime" />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
