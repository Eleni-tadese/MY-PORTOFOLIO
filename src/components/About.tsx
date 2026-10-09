import { Fragment } from "react";
import { ArrowUpRight, Award, GraduationCap, Sparkles, Wrench } from "lucide-react";
import type { Certificate, Education, Profile } from "@/content/types";
import GlowCard from "./ui/GlowCard";
import Reveal from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";

export default function About({
  profile,
  education,
  certificates,
}: {
  profile: Profile;
  education: Education[];
  certificates: Certificate[];
}) {
  const { focus } = profile;
  const credentials = [
    ...education.map((e) => ({ icon: GraduationCap, title: e.degree, by: e.school })),
    ...certificates.map((c) => ({ icon: Award, title: c.title, by: c.issuer })),
  ];

  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeading
        id="about-title"
        index="01"
        eyebrow="About Me"
        title={
          <>
            Engineer, builder, <em className="text-lime">evaluator</em>
          </>
        }
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-12">
        {/* Statement */}
        <Reveal className="lg:col-span-7">
          <GlowCard className="relative flex h-full flex-col justify-between gap-12 overflow-hidden sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-lime/10 blur-[100px]"
            />
            <p className="eyebrow flex items-center gap-2 text-[10px] text-subtle">
              <Sparkles size={14} className="text-lime" aria-hidden />
              Profile
            </p>
            <p className="display relative text-4xl leading-[1.1] sm:text-5xl">
              Software Engineer working across{" "}
              {focus.map((f, i) => (
                <Fragment key={f}>
                  <em className="text-lime">{f}</em>
                  {i < focus.length - 2 ? ", " : i === focus.length - 2 ? ", and " : "."}
                </Fragment>
              ))}
            </p>
          </GlowCard>
        </Reveal>

        {/* Services — rows fill with lime on hover */}
        <Reveal delay={100} className="lg:col-span-5">
          <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface">
            <p className="eyebrow flex items-center gap-2 p-6 pb-2 text-[10px] text-subtle sm:px-8 sm:pt-8">
              <Wrench size={14} className="text-lime" aria-hidden />
              What I can help with
            </p>
            <ul className="flex flex-1 flex-col justify-center">
              {profile.services.map((s, i) => (
                <li key={s} className="border-b border-border last:border-0">
                  <a
                    href="#contact"
                    className="sweep group flex items-center gap-4 px-6 py-4 sm:px-8"
                  >
                    <span className="text-xs tabular-nums text-lime group-hover:text-on-lime">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display flex-1 text-3xl group-hover:text-on-lime">
                      {s}
                    </span>
                    <ArrowUpRight
                      size={20}
                      aria-hidden
                      className="text-subtle transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-on-lime"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Credentials strip */}
        <Reveal className="lg:col-span-12">
          <ul className="grid divide-y divide-border rounded-3xl border border-border bg-surface md:grid-cols-3 md:divide-x md:divide-y-0">
            {credentials.map(({ icon: Icon, title, by }) => (
              <li key={title} className="flex items-start gap-4 p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-strong text-lime">
                  <Icon size={18} aria-hidden />
                </span>
                <span>
                  <span className="block font-medium">{title}</span>
                  <span className="mt-0.5 block text-sm text-subtle">{by}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
