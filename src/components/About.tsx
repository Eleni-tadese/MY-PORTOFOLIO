import { experience, education } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm text-fg-faint">About Me</p>
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Profile
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-dim sm:text-lg">
          Motivated 4th-year Computer Science student at ASTU, passionate
          about solving real-world problems with code — from AI evaluation
          work to shipping full-stack products end to end.
        </p>

        <div className="mt-16 grid gap-14 md:grid-cols-[1fr_320px]">
          {/* Timeline */}
          <div className="relative border-l border-border pl-8">
            {experience.map((item, i) => (
              <div key={item.role} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[calc(2rem+5px)] top-1 h-[10px] w-[10px] rounded-full border-2 border-lime bg-bg" />
                <p className="text-xs uppercase tracking-wide text-fg-faint">
                  {item.period}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold">
                  {item.role}
                </h3>
                <p className="text-sm text-lime">{item.org}</p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-dim">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Education card */}
          <div className="h-fit rounded-2xl border border-border bg-card p-7">
            <p className="text-xs uppercase tracking-wide text-fg-faint">
              Education
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold">
              {education.degree}
            </h3>
            <p className="mt-1 text-sm text-lime">{education.school}</p>
            <p className="mt-1 text-xs text-fg-faint">{education.period}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {education.coursework.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border px-3 py-1 text-xs text-fg-dim"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
