import { ExternalLink } from "lucide-react";
import { GithubIcon } from "../icons";

/** "Live Demo" / "Code" links used on project cards, slides and dialogs. */
export default function ProjectLinks({
  live,
  code,
  label,
  onLime = false,
}: {
  live: string | null;
  code: string | null;
  label: string;
  onLime?: boolean;
}) {
  const primary = onLime ? "group-hover:text-on-lime" : "";
  return (
    <div className="flex flex-wrap gap-6 text-sm">
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          aria-label={`${label} — live demo (opens in new tab)`}
          className={`inline-flex items-center gap-2 font-medium text-lime underline-offset-4 hover:underline ${primary}`}
        >
          <ExternalLink size={15} aria-hidden /> Live Demo
        </a>
      )}
      {code && (
        <a
          href={code}
          target="_blank"
          rel="noreferrer"
          aria-label={`${label} — source code (opens in new tab)`}
          className={`inline-flex items-center gap-2 text-muted underline-offset-4 hover:text-fg hover:underline ${primary}`}
        >
          <GithubIcon size={15} /> Code
        </a>
      )}
    </div>
  );
}
