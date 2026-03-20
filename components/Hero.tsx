"use client";
// components/Hero.tsx
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/sanity.image";

type Project = {
  _id: string;
  title: string;
  coverImage: any;
  category?: string;
  shortDescription?: string;
  externalLink?: string;
};

type HeroProps = {
  headlineTop?: string;
  headlineBottom?: string;
  projects?: Project[];
};

export default function Hero({
  headlineTop = "CROSSMEDIA",
  headlineBottom = "DESIGNER",
  projects = [],
}: HeroProps) {
  const [active, setActive] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAutoPlaying || projects.length === 0) return;
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % projects.length);
    }, 3500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isAutoPlaying, projects.length]);

  const goTo = (i: number) => {
    setActive(i);
    setIsAutoPlaying(false);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Background project image */}
      {projects[active]?.coverImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(projects[active].coverImage).width(1400).url()}
            alt={projects[active].title}
            fill
            className="object-cover opacity-20 transition-opacity duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)]/80 to-transparent" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12 w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-end gap-12">
          {/* Left: headline */}
          <div className="flex-1">
            <h1
              className="leading-none text-white"
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                fontSize: "clamp(5rem, 14vw, 14rem)",
              }}
            >
              <span className="block">{headlineTop}</span>
              <span
                className="block"
                style={{
                  WebkitTextStroke: "2px var(--color-accent)",
                  color: "transparent",
                  fontFamily: "var(--font-serif, 'Playfair Display', serif)",
                  fontStyle: "italic",
                  fontSize: "0.85em",
                }}
              >
                {headlineBottom}
              </span>
            </h1>
          </div>

          {/* Right: project card carousel */}
          {projects.length > 0 && (
            <div className="w-full lg:w-80 xl:w-96">
              {/* Active card */}
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-white/10 group">
                {projects[active]?.coverImage && (
                  <Image
                    src={urlFor(projects[active].coverImage).width(600).url()}
                    alt={projects[active].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  {projects[active]?.category && (
                    <p className="text-[var(--color-accent)] text-xs tracking-widest uppercase mb-1">
                      {projects[active].category}
                    </p>
                  )}
                  <p className="text-white font-bold text-lg leading-tight">
                    {projects[active].title}
                  </p>
                  {projects[active]?.externalLink && (
                    <a
                      href={projects[active].externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-xs text-[var(--color-accent)] border border-[var(--color-accent)] px-3 py-1 tracking-widest uppercase hover:bg-[var(--color-accent)] hover:text-black transition-all"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2 mt-3">
                {projects.map((p, i) => (
                  <button
                    key={p._id}
                    onClick={() => goTo(i)}
                    className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                      i === active
                        ? "bg-[var(--color-accent)]"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to project ${p.title}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8">
        <div className="flex flex-col items-center gap-2 opacity-40">
          <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-white animate-pulse" />
        </div>
      </div>
    </section>
  );
}
