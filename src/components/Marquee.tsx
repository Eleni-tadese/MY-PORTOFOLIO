import type { SkillGroup } from "@/content/types";

function Row({
  items,
  duration,
  muted,
}: {
  items: string[];
  duration: string;
  muted?: boolean;
}) {
  const copy = (
    <ul className="flex shrink-0 items-center">
      {items.map((s) => (
        <li key={s} className="flex items-center">
          <span
            className={`display px-5 text-2xl sm:text-4xl ${muted ? "text-subtle" : "text-fg"}`}
          >
            {s}
          </span>
          <span className="text-lg text-lime sm:text-2xl">✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className="marquee"
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {copy}
      {copy}
    </div>
  );
}

/**
 * Full skill set scrolling right → left in two rows at different speeds.
 * Decorative (the Skills section lists them accessibly); pauses on hover.
 */
export default function Marquee({ groups }: { groups: SkillGroup[] }) {
  const all = groups.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);
  return (
    <div
      aria-hidden
      className="marquee-wrap relative flex flex-col gap-4 overflow-hidden border-y border-border py-8 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
    >
      <Row items={all.slice(0, half)} duration="35s" />
      <Row items={all.slice(half)} duration="28s" muted />
    </div>
  );
}
