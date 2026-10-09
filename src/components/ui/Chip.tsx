export default function Chip({
  children,
  tone = "solid",
}: {
  children: React.ReactNode;
  tone?: "solid" | "outline";
}) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs text-muted ${
        tone === "solid" ? "bg-surface-2" : "border border-border"
      }`}
    >
      {children}
    </span>
  );
}
