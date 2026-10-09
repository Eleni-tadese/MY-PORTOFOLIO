import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import ParticleField from "./ParticleField";
import Button from "./ui/Button";
import RoleRotator from "./motion/RoleRotator";
import { profile, socials } from "@/lib/data";

const delay = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-20 pt-32 sm:px-8"
    >
      <ParticleField />
      <div
        aria-hidden
        className="absolute right-[10%] top-1/3 h-[480px] w-[480px] rounded-full bg-lime/10 blur-[140px]"
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow rise flex items-center gap-3 text-muted" style={delay(0)}>
            <span aria-hidden className="pulse-dot h-2 w-2 rounded-full bg-lime" />
            Hello, I&apos;m
          </p>
          <h1
            id="hero-title"
            className="display rise mt-6 text-[clamp(3.75rem,11vw,8.5rem)]"
            style={delay(80)}
          >
            {profile.name}
          </h1>
          <p
            className="display rise mt-3 text-4xl italic text-lime sm:text-5xl"
            style={delay(160)}
          >
            <RoleRotator roles={profile.roles} />
          </p>
          <p
            className="rise mt-8 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
            style={delay(240)}
          >
            {profile.intro}
          </p>
          <div className="rise mt-10 flex flex-wrap gap-3" style={delay(320)}>
            <Button href="#work">
              View My Work <ArrowDownRight size={16} aria-hidden />
            </Button>
            <Button href={socials.cv} variant="ghost">
              View CV
            </Button>
            <Button href="#contact" variant="ghost">
              Contact Me
            </Button>
          </div>
        </div>

        {profile.photo && (
          <div className="rise lg:col-span-5 lg:justify-self-end" style={delay(200)}>
            <figure className="glow-card relative mx-auto w-[300px] max-w-full rounded-[2rem] border border-border-strong bg-surface p-2.5 sm:w-[360px]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem]">
                <Image
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 360px, 90vw"
                  className="object-cover object-[50%_35%]"
                />
              </div>
            </figure>
          </div>
        )}
      </div>
    </section>
  );
}
