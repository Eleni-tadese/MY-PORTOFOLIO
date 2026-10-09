import type { Experience as Item } from "@/content/types";
import { Section, SectionHeading } from "./ui/Section";
import Timeline from "./Timeline";

export default function Experience({ items }: { items: Item[] }) {
  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionHeading
        id="experience-title"
        index="03"
        eyebrow="Experience"
        title={
          <>
            Where I&apos;ve <em className="text-lime">worked</em>
          </>
        }
      />
      <div className="mt-10">
        <Timeline items={items} />
      </div>
    </Section>
  );
}
