import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-border px-5 pt-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-end">
          <a
            href="#home"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-lime"
          >
            Back to top
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong">
              <ArrowUp size={15} aria-hidden />
            </span>
          </a>
        </div>

        <p
          aria-hidden
          className="display mt-8 select-none whitespace-nowrap text-center text-[18.5vw] leading-[0.8] md:text-[13.5rem]"
        >
          <span className="outline-text">Eleni </span>
          <span className="text-lime">Tadese</span>
        </p>

        <p className="border-t border-border py-6 text-center text-xs text-subtle">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js,
          TypeScript &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
