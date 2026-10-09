import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default function LoginPage() {
  return (
    <main id="main" className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-surface p-8">
        <p className="eyebrow text-lime">Admin</p>
        <h1 className="display mt-3 text-4xl">Sign in</h1>
        <p className="mt-2 text-sm text-muted">Manage the content of your portfolio.</p>
        <LoginForm />
      </div>
    </main>
  );
}
