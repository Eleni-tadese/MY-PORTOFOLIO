import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Effects from "@/components/Effects";
import { getSiteContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getSiteContent();
  return {
    title: `${profile.name} — ${profile.roles[1] ?? profile.roles[0] ?? "Portfolio"}`,
    description: profile.intro,
  };
}

export default async function Home() {
  const c = await getSiteContent();
  const featured = c.projects.filter((p) => p.featured);

  return (
    <>
      <Effects />
      <Navbar brand={c.profile.name.split(" ")[0]} />
      <main id="main">
        <Hero profile={c.profile} />
        <Marquee groups={c.skillGroups} />
        <About profile={c.profile} education={c.education} certificates={c.certificates} />
        <Projects projects={featured} github={c.socials.github} />
        <Experience items={c.experience} />
        <Skills
          a2sv={c.profile.a2sv}
          socials={c.socials}
          skillGroups={c.skillGroups}
          projects={c.projects}
        />
        <Contact socials={c.socials} />
      </main>
    </>
  );
}
