export default function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glow-card rounded-3xl border border-border bg-surface p-6 sm:p-7 ${className}`}
    >
      {children}
    </div>
  );
}
