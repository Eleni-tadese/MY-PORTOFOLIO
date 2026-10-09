import Reveal from "./Reveal";

export function Section({
  id,
  labelledBy,
  children,
  className = "",
}: {
  id: string;
  labelledBy?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`px-5 py-14 sm:px-8 md:py-20 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  intro,
  aside,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  aside?: React.ReactNode;
}) {
  return (
    <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="eyebrow mb-5 flex items-center gap-3 text-lime">
          <span className="tabular-nums text-subtle">{index}</span>
          <span aria-hidden className="h-px w-8 bg-lime" />
          {eyebrow}
        </p>
        <h2 id={id} className="display text-4xl sm:text-5xl md:text-6xl">
          {title}
        </h2>
        {intro && (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {intro}
          </p>
        )}
      </div>
      {aside}
    </Reveal>
  );
}
