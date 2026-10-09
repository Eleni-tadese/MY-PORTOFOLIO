import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions";
import AdminNav from "./AdminNav";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="border-b border-border bg-surface px-4 py-4 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:px-5 lg:py-8">
        <div className="mb-4 flex items-center justify-between lg:mb-8 lg:block">
          <p className="display text-2xl">
            Admin<span className="text-lime">.</span>
          </p>
          <div className="flex gap-2 lg:mt-4">
            <Link href="/" target="_blank" className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1.5 text-xs text-muted hover:border-lime hover:text-lime">
              <ExternalLink size={13} aria-hidden /> View site
            </Link>
            <form action={logout}>
              <button type="submit" className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3 py-1.5 text-xs text-muted hover:border-danger hover:text-danger">
                <LogOut size={13} aria-hidden /> Sign out
              </button>
            </form>
          </div>
        </div>
        <nav aria-label="Admin">
          <AdminNav />
        </nav>
      </aside>
      <main id="main" className="px-5 pt-8 sm:px-8 lg:pt-10">{children}</main>
    </div>
  );
}
