"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import { otherProjects } from "@/lib/data";

export default function ProjectCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [selected, setSelected] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Autoplay, paused on hover/interaction
  useEffect(() => {
    if (!emblaApi) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const start = () => {
      stop();
      autoplayRef.current = setInterval(() => emblaApi.scrollNext(), 4000);
    };
    const stop = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
    start();
    const node = emblaApi.rootNode();
    node.addEventListener("mouseenter", stop);
    node.addEventListener("mouseleave", start);
    node.addEventListener("pointerdown", stop);
    return () => {
      stop();
      node.removeEventListener("mouseenter", stop);
      node.removeEventListener("mouseleave", start);
      node.removeEventListener("pointerdown", stop);
    };
  }, [emblaApi]);

  return (
    <div className="mt-8">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container gap-5">
          {otherProjects.map((p) => (
            <div
              key={p.title}
              className="embla__slide w-[85%] sm:w-[45%] lg:w-[31%]"
            >
              <div className="glow-card flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <h4 className="font-display text-lg font-semibold">
                  {p.title}
                </h4>
                <p className="mt-1 text-xs text-fg-faint">{p.stack}</p>
                <div className="mt-5 flex gap-3 text-sm">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-lime hover:underline"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  {p.code && (
                    <a
                      href={p.code}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-fg-dim hover:text-fg"
                    >
                      <GithubIcon size={14} /> Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {otherProjects.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                selected === i ? "w-6 bg-lime" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            aria-label="Previous project"
            onClick={scrollPrev}
            className="btn-ghost flex h-9 w-9 items-center justify-center rounded-full"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            aria-label="Next project"
            onClick={scrollNext}
            className="btn-ghost flex h-9 w-9 items-center justify-center rounded-full"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
