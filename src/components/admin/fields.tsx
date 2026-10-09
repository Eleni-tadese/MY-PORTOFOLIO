"use client";

import { useId } from "react";

/** Controlled form fields for the admin, styled with the site tokens. */

const inputClass =
  "mt-2 w-full rounded-xl border bg-bg px-4 py-2.5 text-sm text-fg outline-none transition-colors placeholder:text-subtle focus:border-lime";

type Base = { label: string; hint?: string; error?: string; className?: string };

function Wrapper({
  id,
  label,
  hint,
  error,
  className = "",
  children,
}: Base & { id: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
      </label>
      {hint && <p className="mt-0.5 text-xs text-subtle">{hint}</p>}
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({
  value,
  onChange,
  type = "text",
  placeholder,
  ...base
}: Base & {
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "email" | "url" | "password";
  placeholder?: string;
}) {
  const id = useId();
  return (
    <Wrapper id={id} {...base}>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(base.error)}
        aria-describedby={base.error ? `${id}-error` : undefined}
        className={`${inputClass} ${base.error ? "border-danger" : "border-border-strong"}`}
      />
    </Wrapper>
  );
}

export function TextArea({
  value,
  onChange,
  rows = 3,
  placeholder,
  ...base
}: Base & { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  const id = useId();
  return (
    <Wrapper id={id} {...base}>
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(base.error)}
        aria-describedby={base.error ? `${id}-error` : undefined}
        className={`${inputClass} resize-y leading-relaxed ${base.error ? "border-danger" : "border-border-strong"}`}
      />
    </Wrapper>
  );
}

/** A list of short strings edited as one item per line. */
export function LinesField({
  value,
  onChange,
  rows = 4,
  ...base
}: Base & { value: string[]; onChange: (v: string[]) => void; rows?: number }) {
  return (
    <TextArea
      {...base}
      hint={base.hint ?? "One per line"}
      rows={rows}
      value={value.join("\n")}
      onChange={(v) => onChange(v.split("\n"))}
    />
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  hint?: string;
}) {
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-[var(--color-lime)]"
      />
      <label htmlFor={id} className="text-sm">
        <span className="font-medium text-fg">{label}</span>
        {hint && <span className="block text-xs text-subtle">{hint}</span>}
      </label>
    </div>
  );
}

export function FieldGroup({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <legend className="sr-only">{title}</legend>
      <h2 className="text-base font-semibold">{title}</h2>
      {description && <p className="mt-1 text-sm text-subtle">{description}</p>}
      <div className="mt-5 grid gap-5">{children}</div>
    </fieldset>
  );
}
