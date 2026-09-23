import { skillGroups, socials } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm text-fg-faint">
          4th Year Computer Science &amp; Engineering Undergraduate
        </p>
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Skills &amp; Expertise
        </h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="glow-card rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="font-display text-lg font-semibold">
                {group.title}
              </h3>
              <p className="mt-1 text-xs text-fg-faint">{group.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-bg-elev px-3 py-1 text-xs text-fg-dim"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="glow-card rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-lg font-semibold">
              Problem Solving
            </h3>
            <p className="mt-1 text-xs text-fg-faint">
              Algorithms, competitive programming &amp; challenges
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={socials.leetcode}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost rounded-full px-4 py-2 text-xs font-medium"
              >
                LeetCode
              </a>
              <a
                href={socials.codeforces}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost rounded-full px-4 py-2 text-xs font-medium"
              >
                Codeforces
              </a>
            </div>
          </div>

          <div className="glow-card rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-lg font-semibold">
              Version Control
            </h3>
            <p className="mt-1 text-xs text-fg-faint">
              Managing projects with Git &amp; GitHub
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-bg-elev px-3 py-1 text-xs text-fg-dim">
                Git
              </span>
              <span className="rounded-full bg-bg-elev px-3 py-1 text-xs text-fg-dim">
                GitHub
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
