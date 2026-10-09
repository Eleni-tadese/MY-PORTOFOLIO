export default function PageHeader({
  title,
  description,
  problem,
}: {
  title: string;
  description?: string;
  problem?: string | null;
}) {
  return (
    <header className="mb-8">
      <h1 className="display text-5xl">{title}</h1>
      {description && <p className="mt-2 max-w-2xl text-muted">{description}</p>}
      {problem && (
        <p role="alert" className="mt-4 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
          {problem}
        </p>
      )}
    </header>
  );
}
