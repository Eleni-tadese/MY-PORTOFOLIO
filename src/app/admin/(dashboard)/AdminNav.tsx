"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Award, Briefcase, FolderKanban, Home, LayoutDashboard, Mail, Sparkles, Wrench } from "lucide-react";

const items = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero", icon: Home },
  { href: "/admin/about", label: "About", icon: Sparkles },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/credentials", label: "Credentials", icon: Award },
  { href: "/admin/contact", label: "Contact", icon: Mail },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <ul className="flex gap-1 overflow-x-auto lg:flex-col">
      {items.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
        return (
          <li key={href} className="shrink-0">
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                active ? "bg-lime text-on-lime" : "text-muted hover:bg-surface-2 hover:text-fg"
              }`}
            >
              <Icon size={16} aria-hidden />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
