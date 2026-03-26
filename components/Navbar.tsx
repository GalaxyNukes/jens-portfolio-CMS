"use client";
// components/Navbar.tsx
import { useState, useEffect, useRef } from "react";
import { typoStyle, TypographyBlock } from "@/lib/typography";

type NavLink = { label: string; href: string };
type NavbarProps = {
  navLinks?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  logoTypography?: TypographyBlock & { textTransform?: string };
};

export default function Navbar({
  navLinks = [
    { label: "HOME",     href: "#home" },
    { label: "GALLERY",  href: "#experience" },
    { label: "ABOUT ME", href: "#about" },
  ],
  ctaLabel = "GET IN TOUCH",
  ctaHref  = "#contact",
  logoTypography,
}: NavbarProps) {
  const [opacity, setOpacity] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const sentinel = document.getElementById("carousel-end-sentinel");
    if (!sentinel) { setOpacity(1); return; }

    function update() {
      const r = sentinel!.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh * 0.5 - r.top) / (vh * 0.5);
      setOpacity(Math.min(1, Math.max(0, raw)));
    }

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isVisible = opacity > 0;

  const logoStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: 16,
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.92)",
    textDecoration: "none",
    position: "relative",
    zIndex: 2,
    ...typoStyle(logoTypography),
    ...(logoTypography?.textTransform
      ? { textTransform: logoTypography.textTransform as React.CSSProperties["textTransform"] }
      : {}),
  };

  return (
    <>
      <style>{`
        /* ── Navbar wrapper ──────────────────────────────────────────── */
        .nav-outer {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
        }

        /*
         * The glass pill.
         *
         * On a dark background, backdrop-filter alone produces a flat dark
         * translucent look — it needs a meaningful white fill + brightness
         * boost to read as "glass material" rather than "dark overlay".
         *
         * Target: visible frosted glass, similar to Apple-style liquid glass
         * cards, adapted for a dark-background portfolio.
         */
        .nav-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 54px;
          padding: 0 8px 0 24px;
          border-radius: 100px;
          position: relative;
          overflow: hidden;
          isolation: isolate;

          /* Glass core:
           * blur(32px)      → softens background content (shows it's a surface)
           * saturate(180%)  → deepens colors bleeding through
           * brightness(1.3) → critical — lifts the darkness so the pill reads
           *                   as glass, not shadow */
          backdrop-filter: blur(32px) saturate(180%) brightness(1.3);
          -webkit-backdrop-filter: blur(32px) saturate(180%) brightness(1.3);

          /* Semi-opaque white fill — this is what makes it look like glass
           * on a dark BG. 0.07 was invisible. 0.15 reads as material. */
          background: rgba(255, 255, 255, 0.12);

          /* Border: two-tone — slightly brighter top-left, subtle elsewhere */
          border: 1px solid rgba(255, 255, 255, 0.22);

          box-shadow:
            /* Inner top rim — the sharpest specular */
            inset 0 1.5px 0 rgba(255, 255, 255, 0.50),
            /* Inner left rim */
            inset 1px 0 0 rgba(255, 255, 255, 0.12),
            /* Inner bottom — depth shadow */
            inset 0 -1px 0 rgba(0, 0, 0, 0.18),
            /* Outer glow — gives the pill presence on the dark page */
            0 0 0 1px rgba(255, 255, 255, 0.06),
            /* Depth shadow */
            0 8px 40px rgba(0, 0, 0, 0.55),
            0 2px 10px rgba(0, 0, 0, 0.35);
        }

        /* Top-left corner gloss sweep — the "light hitting glass" moment */
        .nav-pill::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0.18) 0%,
            rgba(255, 255, 255, 0.06) 30%,
            transparent 55%
          );
        }

        /* Top-edge specular line — ultra-thin bright line across the rim */
        .nav-pill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 12%;
          right: 12%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.65) 20%,
            rgba(255, 255, 255, 0.65) 80%,
            transparent 100%
          );
          pointer-events: none;
        }

        /* ── Nav links ──────────────────────────────────────────────── */
        .nav-links {
          display: flex;
          list-style: none;
          gap: 2px;
          position: relative;
          z-index: 2;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.80);
          text-decoration: none;
          padding: 7px 20px;
          border-radius: 50px;
          letter-spacing: 0.1em;
          transition: color 0.18s, background 0.18s;
          display: block;
        }
        .nav-links a:hover {
          color: rgba(255, 255, 255, 0.98);
          background: rgba(255, 255, 255, 0.12);
        }

        /* ── CTA button ─────────────────────────────────────────────── */
        .nav-cta-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: 100px;
          text-decoration: none;
          position: relative;
          z-index: 2;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          background: linear-gradient(
            160deg,
            rgba(255, 255, 255, 0.98) 0%,
            rgba(225, 225, 225, 0.93) 100%
          );
          box-shadow:
            inset 0 1.5px 0 rgba(255, 255, 255, 1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.05),
            0 2px 14px rgba(0, 0, 0, 0.24),
            0 1px 4px rgba(0, 0, 0, 0.14);
          padding: 5px 6px 5px 18px;
        }
        .nav-cta-btn:hover {
          transform: scale(1.04);
          box-shadow:
            inset 0 1.5px 0 rgba(255, 255, 255, 1),
            0 4px 24px rgba(0, 0, 0, 0.34);
        }
        .nav-cta-btn span {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          color: #111;
          letter-spacing: 0.08em;
          white-space: nowrap;
        }

        /* ── Orange dot ─────────────────────────────────────────────── */
        .nav-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          background: linear-gradient(145deg, #FF9200 0%, #FF3D00 100%);
          box-shadow:
            0 0 18px rgba(255, 100, 0, 0.65),
            0 0 6px rgba(255, 100, 0, 0.40),
            inset 0 1px 0 rgba(255, 210, 100, 0.45);
        }

        @media (max-width: 860px) {
          .nav-links { display: none; }
        }
      `}</style>

      <nav
        aria-hidden={!isVisible}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 200,
          padding: "14px 32px",
          opacity,
          transform: `translateY(${(1 - opacity) * -10}px)`,
          pointerEvents: isVisible ? "auto" : "none",
          willChange: "opacity, transform",
          transition: "opacity 0.15s linear, transform 0.15s linear",
        }}
      >
        <div className="nav-outer">
          <div className="nav-pill">
            <a href="/" style={logoStyle}>JENS DE MEYER</a>

            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>

            <a href={ctaHref} className="nav-cta-btn">
              <span>{ctaLabel}</span>
              <div className="nav-dot">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 12L12 2M12 2H5M12 2V9"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
