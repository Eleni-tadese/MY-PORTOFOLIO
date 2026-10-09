import { ArrowUp } from "lucide-react";

export default function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-border px-5 py-6 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-center text-xs text-subtle sm:text-left">
          © {new Date().getFullYear()} {name}. Built with Next.js,
          TypeScript &amp; Tailwind CSS.
        </p>
        <a
          href="#home"
          className="inline-flex shrink-0 items-center gap-2 text-sm text-muted transition-colors hover:text-lime"
        >
          Back to top
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong">
            <ArrowUp size={15} aria-hidden />
          </span>
        </a>
      </div>
    </footer>
  );
}
