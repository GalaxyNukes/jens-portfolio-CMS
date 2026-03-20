"use client";
// components/Contact.tsx

type ContactProps = {
  tagline?: string;
  headline?: string;
  statusText?: string;
  descriptionText?: string;
  ctaLabel?: string;
  email?: string;
  locationText?: string;
  coordinates?: string;
  coordBarLeft?: string;
  coordBarCenter?: string;
  coordBarRight?: string;
  availableForWork?: boolean;
};

export default function Contact({
  tagline = "let's make something",
  headline = "UNFORGETTABLE",
  statusText = "Channel Open — Ready to Receive",
  descriptionText = "Based in Belgium, working worldwide. Let's build something great together.",
  ctaLabel = "INITIATE TRANSMISSION",
  email = "hello@jensdemyer.be",
  locationText = "WETTEREN, BE",
  coordinates = "51.2194° N · 3.9403° E",
  coordBarLeft = "51.2194° N",
  coordBarCenter = "3.9403° E",
  coordBarRight = "WETTEREN, BE",
  availableForWork = true,
}: ContactProps) {
  return (
    <section
      id="contact"
      className="relative py-32 overflow-hidden border-t border-white/5"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Ghost headline behind — decorative duplicate */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[20vw] font-black leading-none opacity-[0.03] whitespace-nowrap"
          style={{
            fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            WebkitTextStroke: "1px white",
            color: "transparent",
          }}
        >
          {headline}
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Status bar */}
        <div className="flex items-center gap-3 mb-12">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white/30 text-xs tracking-widest uppercase font-mono">
            {statusText}
          </span>
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-white/20 text-xs font-mono">{coordinates} · {locationText}</span>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 items-end">
          {/* Left: headline stack */}
          <div>
            <p
              className="text-white/30 text-sm tracking-widest mb-4 italic"
              style={{ fontFamily: "var(--font-serif, 'Playfair Display', serif)" }}
            >
              {tagline}
            </p>
            <h2
              className="leading-none text-white mb-6"
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                fontSize: "clamp(4rem, 10vw, 10rem)",
              }}
            >
              {headline}
            </h2>
            {/* Outline mirror */}
            <h2
              className="leading-none mb-10"
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                fontSize: "clamp(4rem, 10vw, 10rem)",
                WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                color: "transparent",
                marginTop: "-0.15em",
              }}
            >
              {headline}
            </h2>

            {/* CTA button */}
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-4 px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 group"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-bg)",
                fontFamily: "var(--font-body)",
              }}
            >
              {ctaLabel}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Right: info block */}
          <div className="space-y-8 lg:pl-8 lg:border-l lg:border-white/10">
            {availableForWork && (
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-white/40 text-xs tracking-widest uppercase">
                  Available for new projects
                </span>
              </div>
            )}

            <p className="text-white/50 leading-relaxed">{descriptionText}</p>

            <div>
              <p className="text-white/20 text-xs tracking-widest uppercase mb-2">Direct line</p>
              <a
                href={`mailto:${email}`}
                className="text-[var(--color-accent)] hover:underline underline-offset-4 transition-all text-lg"
              >
                {email}
              </a>
            </div>

            {/* Signal strength bars — decorative */}
            <div className="flex items-end gap-1" aria-hidden="true">
              {[3, 5, 7, 9, 11, 9, 7].map((h, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full"
                  style={{
                    height: `${h * 2}px`,
                    background: i < 5 ? "var(--color-accent)" : "rgba(255,255,255,0.1)",
                    opacity: i < 5 ? 0.8 - i * 0.1 : 1,
                  }}
                />
              ))}
              <span className="text-white/20 text-xs ml-2 font-mono">SIG</span>
            </div>
          </div>
        </div>

        {/* Coordinate bar — bottom */}
        <div className="mt-24 pt-6 border-t border-white/5 grid grid-cols-3 text-xs font-mono text-white/20 tracking-widest">
          <span>{coordBarLeft}</span>
          <span className="text-center">{coordBarCenter}</span>
          <span className="text-right">{coordBarRight}</span>
        </div>
      </div>
    </section>
  );
}
