"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { login, type LoginState } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  const [showPassword, setShowPassword] = useState(false);

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
      <div>
        <label htmlFor="password" className="text-sm text-muted">
          Password
        </label>
        <div className="relative mt-2">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            className="w-full rounded-xl border border-border-strong bg-bg py-3 pl-4 pr-12 text-fg outline-none transition-colors focus:border-lime"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-subtle transition-colors hover:text-lime"
          >
            {showPassword ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
          </button>
        </div>
      </div>
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
