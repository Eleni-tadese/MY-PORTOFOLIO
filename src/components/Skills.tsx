import { Trophy } from "lucide-react";
import type { Project, SkillGroup, Socials } from "@/content/types";
import Button from "./ui/Button";
import GlowCard from "./ui/GlowCard";
import Reveal from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";
import SkillExplorer from "./SkillExplorer";

export default function Skills({
  a2sv,
  socials,
  skillGroups,
  projects,
}: {
  a2sv: string;
  socials: Socials;
  skillGroups: SkillGroup[];
  projects: Project[];
}) {
  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading
        id="skills-title"
        index="04"
        eyebrow="Skills & Expertise"
        title={
          <>
            The <em className="text-lime">toolkit</em>
          </>
        }
      />

      <Reveal className="mt-10">
        <SkillExplorer skillGroups={skillGroups} projects={projects} />
      </Reveal>

      <Reveal className="mt-6">
        <GlowCard className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex gap-4">
            <Trophy className="mt-1 shrink-0 text-lime" size={22} aria-hidden />
            <div>
              <h3 className="text-lg font-medium">Problem Solving</h3>
              <p className="mt-1 max-w-xl text-sm text-muted">{a2sv}</p>
            </div>
          </div>
          <div className="flex shrink-0 gap-3">
            {socials.leetcode && (
              <Button href={socials.leetcode} variant="ghost" size="sm">
                LeetCode
              </Button>
            )}
            {socials.codeforces && (
              <Button href={socials.codeforces} variant="ghost" size="sm">
                Codeforces
              </Button>
            )}
          </div>
        </GlowCard>
      </Reveal>
    </Section>
  );
}
