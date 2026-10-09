"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { login, type LoginState } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="mt-8 space-y-4" noValidate>
      <label className="block">
        <span className="text-sm text-muted">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          className="mt-2 w-full rounded-xl border border-border-strong bg-bg px-4 py-3 text-fg outline-none transition-colors focus:border-lime"
        />
      </label>
      <label className="block">
        <span className="text-sm text-muted">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full rounded-xl border border-border-strong bg-bg px-4 py-3 text-fg outline-none transition-colors focus:border-lime"
        />
      </label>
      {state.error && (
        <p role="alert" className="rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-medium text-on-lime transition-colors hover:bg-lime-soft disabled:opacity-60"
      >
        <Lock size={15} aria-hidden /> {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
