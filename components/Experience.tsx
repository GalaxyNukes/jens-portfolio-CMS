"use client";
// components/Experience.tsx
import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/sanity.image";

type ExperienceItem = {
  _id: string;
  companyName: string;
  companyLogo?: any;
  role: string;
  dateRange?: string;
  description?: string;
  tags?: string[];
  responsibilities?: string[];
  order?: number;
};

type ExperienceProps = {
  sectionTitle?: string;
  experiences?: ExperienceItem[];
};

export default function Experience({
  sectionTitle = "MY EXPERIENCE",
  experiences = [],
}: ExperienceProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <section
      id="experience"
      className="py-24"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center gap-6 mb-16">
          <h2
            className="text-white text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {sectionTitle}
          </h2>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Accordion rows */}
        <div className="space-y-0">
          {experiences.map((exp, index) => {
            const isOpen = openId === exp._id;
            return (
              <div key={exp._id} className="border-t border-white/10 last:border-b">
                {/* Row header — always visible */}
                <button
                  className="w-full text-left py-6 flex items-center gap-6 group"
                  onClick={() => toggle(exp._id)}
                  aria-expanded={isOpen}
                >
                  {/* Index */}
                  <span className="text-white/20 text-sm w-8 flex-shrink-0 font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Logo */}
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                    {exp.companyLogo ? (
                      <Image
                        src={urlFor(exp.companyLogo).width(80).height(80).url()}
                        alt={exp.companyName}
                        width={40}
                        height={40}
                        className="object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full border border-white/20"
                        style={{ background: "var(--color-accent)", opacity: 0.3 }}
                      />
                    )}
                  </div>

                  {/* Company + Role */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-4 flex-wrap">
                      <span
                        className="text-white text-xl font-bold group-hover:text-[var(--color-accent)] transition-colors"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {exp.companyName}
                      </span>
                      <span className="text-white/40 text-sm truncate">{exp.role}</span>
                    </div>
                  </div>

                  {/* Date range */}
                  {exp.dateRange && (
                    <span className="hidden sm:block text-white/30 text-sm flex-shrink-0 font-mono">
                      {exp.dateRange}
                    </span>
                  )}

                  {/* Chevron */}
                  <span
                    className="flex-shrink-0 text-white/40 group-hover:text-[var(--color-accent)] transition-all duration-300"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>

                {/* Accordion body */}
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{ maxHeight: isOpen ? "600px" : "0px" }}
                >
                  <div className="pb-8 pl-[3.5rem] pr-4 grid md:grid-cols-2 gap-8">
                    {/* Description */}
                    {exp.description && (
                      <div>
                        <p className="text-white/60 text-sm leading-relaxed mb-4">
                          {exp.description}
                        </p>
                        {/* Tags */}
                        {exp.tags && exp.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 text-xs tracking-wider uppercase border border-white/10 text-white/50"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Responsibilities */}
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="space-y-2">
                        {exp.responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-white/50">
                            <span style={{ color: "var(--color-accent)" }} className="mt-0.5 flex-shrink-0">
                              —
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {experiences.length === 0 && (
            <p className="text-white/30 text-sm py-8">
              No experience entries yet — add them in Sanity Studio.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
