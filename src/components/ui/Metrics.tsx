/** Outcome numbers under a project title, e.g. "8 roles · 3 languages · 458 tests". */
export default function Metrics({
  items,
  className = "",
}: {
  items?: string[];
  className?: string;
}) {
  if (!items?.length) return null;
  return (
    <ul
      aria-label="Key outcomes"
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-lime ${className}`}
    >
      {items.map((m, i) => (
        <li key={m} className="flex items-center gap-3">
          {i > 0 && (
            <span aria-hidden className="text-subtle">
              ·
            </span>
          )}
          {m}
        </li>
      ))}
    </ul>
  );
}
