"use client";
// components/Statement.tsx
import Image from "next/image";
import { urlFor } from "@/sanity/sanity.image";
import { PortableText } from "next-sanity";

type StatementProps = {
  text?: any[];
  backgroundPhoto?: any;
  chipPhoto?: any;
  availableForWork?: boolean;
  instagram?: string;
  linkedin?: string;
  behance?: string;
};

const components = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-white/70 text-lg leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-white text-2xl font-bold mb-3">{children}</h2>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="text-white font-bold">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em style={{ color: "var(--color-accent)", fontFamily: "var(--font-serif, 'Playfair Display', serif)", fontStyle: "italic" }}>
        {children}
      </em>
    ),
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-[var(--color-accent)] underline-offset-4 hover:text-[var(--color-accent)] transition-colors"
      >
        {children}
      </a>
    ),
  },
};

const SocialIcon = ({ platform }: { platform: string }) => {
  const icons: Record<string, string> = {
    instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    behance: "M22.228 0H1.772C.792 0 0 .792 0 1.772v20.456C0 23.208.792 24 1.772 24h20.456C23.208 24 24 23.208 24 22.228V1.772C24 .792 23.208 0 22.228 0zM7.443 15.272c0 2.379-1.39 3.515-3.626 3.515H.5V5.213h3.566c2.044 0 3.266 1.107 3.266 2.956 0 1.23-.606 2.151-1.59 2.605 1.327.395 1.701 1.527 1.701 2.498zm8.29-2.14H11.13c0 1.618.85 2.476 2.22 2.476.955 0 1.65-.494 1.862-1.295h2.26c-.436 1.906-1.99 3.117-4.15 3.117-2.767 0-4.468-1.809-4.468-4.609 0-2.799 1.76-4.752 4.468-4.752 2.878 0 4.497 2.105 4.497 4.752 0 .11-.01.311-.086.311zm5.895 5.583h-2.62V8.558h2.62v10.157zM21.46 6.883a1.45 1.45 0 11-.003-2.9 1.45 1.45 0 01.003 2.9z",
  };
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d={icons[platform] || ""} />
    </svg>
  );
};

export default function Statement({
  text,
  backgroundPhoto,
  chipPhoto,
  availableForWork = true,
  instagram,
  linkedin,
  behance,
}: StatementProps) {
  const socials = [
    { platform: "instagram", url: instagram },
    { platform: "linkedin", url: linkedin },
    { platform: "behance", url: behance },
  ].filter((s) => !!s.url);

  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: text content */}
        <div>
          {/* Availability badge */}
          {availableForWork && (
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/60 text-xs tracking-widest uppercase">
                Available for Work
              </span>
            </div>
          )}

          {/* Welcome header */}
          <h2
            className="text-white/20 text-xs tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Welcome to my portfolio
          </h2>

          {/* Rich text */}
          <div className="mb-8">
            {text && text.length > 0 ? (
              <PortableText value={text} components={components} />
            ) : (
              <p className="text-white/70 text-lg leading-relaxed">
                I'm a Belgian Crossmedia Designer with a passion for creating visual experiences
                that connect people to brands in{" "}
                <em style={{ color: "var(--color-accent)", fontFamily: "var(--font-serif)" }}>
                  meaningful ways
                </em>
                .
              </p>
            )}
          </div>

          {/* Chip photo + name inline */}
          {chipPhoto && (
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--color-accent)] flex-shrink-0">
                <Image
                  src={urlFor(chipPhoto).width(80).height(80).url()}
                  alt="Jens De Meyer"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <span className="text-white/50 text-sm">Jens De Meyer</span>
            </div>
          )}

          {/* Social links */}
          {socials.length > 0 && (
            <div className="flex items-center gap-4">
              {socials.map(({ platform, url }) => (
                <a
                  key={platform}
                  href={url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-[var(--color-accent)] transition-colors"
                  aria-label={platform}
                >
                  <SocialIcon platform={platform} />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right: background profile photo */}
        {backgroundPhoto && (
          <div className="relative h-[500px] lg:h-[600px]">
            <div className="absolute inset-0 rounded-sm overflow-hidden">
              <Image
                src={urlFor(backgroundPhoto).width(800).url()}
                alt="Jens De Meyer"
                fill
                className="object-cover object-top"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, transparent 60%, var(--color-bg) 100%)",
                }}
              />
            </div>
            {/* Accent border accent */}
            <div
              className="absolute -bottom-px -right-px w-1/3 h-1 "
              style={{ background: "var(--color-accent)" }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
