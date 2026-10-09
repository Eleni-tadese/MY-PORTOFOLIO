"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";

/** Cycles through roles with a vertical slide. Screen readers get the full list. */
export default function RoleRotator({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [reduced, roles.length]);

  return (
    <>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden className="rotator">
        {roles.map((r, i) => (
          <span
            key={r}
            data-state={
              i === index
                ? "current"
                : i === (index - 1 + roles.length) % roles.length
                  ? "before"
                  : "after"
            }
          >
            {r}
          </span>
        ))}
      </span>
    </>
  );
}
