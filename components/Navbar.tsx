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
    ...(logoTypography?.textTransform ? { textTransform: logoTypography.textTransform as any } : {}),
  };

  return (
    <>
      {/*
        ── SVG filter definitions ──────────────────────────────────────────
        feTurbulence  → organic noise field (the "ink" shape)
        feDisplacementMap → uses that noise to warp the pixels behind the pill
        This creates the liquid-glass / ink distortion effect.
        Rendered hidden at 0×0 so it doesn't take up space.
      */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="liquid-glass" x="-20%" y="-50%" width="140%" height="200%" colorInterpolationFilters="sRGB">
            {/* Organic turbulence noise — ink-like, slightly animated via CSS */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.008"
              numOctaves="4"
              seed="8"
              stitchTiles="stitch"
              result="noise"
            />
            {/* Scale controls the intensity of the warp — higher = more liquid */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="28"
              xChannelSelector="R"
              yChannelSelector="G"
              result="warped"
            />
          </filter>

          {/* Separate softer noise for the frost layer */}
          <filter id="frost-blur" x="-5%" y="-20%" width="110%" height="140%">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
        </defs>
      </svg>

      <style>{`
        /* ── Liquid glass pill ──────────────────────────────────────────── */
        .nav-outer {
          position: relative;
          max-width: 70%;
          margin: 0 auto;
        }

        /* Layer 1: the distorted / warped backdrop — the "liquid" */
        .nav-liquid {
          position: absolute;
          inset: 0;
          border-radius: 100px;
          overflow: hidden;
          /* Apply the SVG warp filter to whatever is behind */
          backdrop-filter: blur(0px) saturate(180%);
          -webkit-backdrop-filter: blur(0px) saturate(180%);
          filter: url(#liquid-glass);
          /* Thin ink-like refraction tint */
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.14) 0%,
            rgba(255,255,255,0.04) 35%,
            rgba(180,200,255,0.08) 60%,
            rgba(255,255,255,0.10) 100%
          );
          /* Animate the distortion gently over time */
          animation: liquidShift 8s ease-in-out infinite alternate;
        }

        @keyframes liquidShift {
          0%   { filter: url(#liquid-glass) brightness(1.0); }
          33%  { filter: url(#liquid-glass) brightness(1.05) hue-rotate(3deg); }
          66%  { filter: url(#liquid-glass) brightness(0.97) hue-rotate(-2deg); }
          100% { filter: url(#liquid-glass) brightness(1.02) hue-rotate(1deg); }
        }

        /* Layer 2: frost — soft blur on top of the warp */
        .nav-frost {
          position: absolute;
          inset: 0;
          border-radius: 100px;
          overflow: hidden;
          /* This is the actual glass blur */
          backdrop-filter: blur(28px) saturate(160%) brightness(1.08);
          -webkit-backdrop-filter: blur(28px) saturate(160%) brightness(1.08);
          /* Subtle noise texture baked in via gradient to simulate frosted glass grain */
          background:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E") center/200px 60px,
            linear-gradient(
              108deg,
              rgba(255,255,255,0.13) 0%,
              rgba(255,255,255,0.04) 40%,
              rgba(255,255,255,0.09) 100%
            );
          opacity: 0.9;
        }

        /* Layer 3: edge gloss — bright top rim + soft shadow */
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 52px;
          padding: 0 8px 0 22px;
          border-radius: 100px;
          position: relative;
          overflow: hidden;
          /* Transparent bg — layers beneath handle the look */
          background: transparent;
          box-shadow:
            /* Inner top rim — the brightest highlight, like real glass catching light */
            inset 0 1.5px 0 rgba(255,255,255,0.55),
            /* Inner bottom — subtle shadow for depth */
            inset 0 -1px 0 rgba(255,255,255,0.06),
            /* Outer edge — very thin, like ink on frosted surface */
            0 0 0 1px rgba(255,255,255,0.12),
            /* Depth shadow below */
            0 8px 40px rgba(0,0,0,0.45),
            0 2px 8px rgba(0,0,0,0.3);
        }

        /* Specular flare — the bright glint that moves across the pill */
        .nav-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(
            112deg,
            rgba(255,255,255,0.22) 0%,
            rgba(255,255,255,0.06) 30%,
            transparent 55%,
            rgba(255,255,255,0.04) 100%
          );
          /* Slow drift of the specular flare */
          animation: specularDrift 6s ease-in-out infinite alternate;
        }

        @keyframes specularDrift {
          0%   { opacity: 1;    background-position: 0% 50%; }
          50%  { opacity: 0.7; }
          100% { opacity: 1;    background-position: 100% 50%; }
        }

        /* ── Nav links ──────────────────────────────────────────────────── */
        .nav-links { display:flex; list-style:none; position:relative; z-index:2; }
        .nav-links a {
          font-family: var(--font-body); font-weight:300; font-size:13px;
          color: rgba(255,255,255,0.7); text-decoration:none;
          padding: 7px 20px; border-radius:50px; letter-spacing:0.1em;
          transition: color 0.2s, background 0.2s; display:block;
        }
        .nav-links a:hover {
          color: rgba(255,255,255,0.98);
          background: rgba(255,255,255,0.1);
        }

        /* ── CTA pill ───────────────────────────────────────────────────── */
        .nav-cta-btn {
          display: flex; align-items:center; gap:9px; border-radius:100px;
          text-decoration:none; position:relative; z-index:2;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          background: linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(230,230,230,0.90) 100%);
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,1),
            inset 0 -1px 0 rgba(0,0,0,0.06),
            0 2px 16px rgba(0,0,0,0.28),
            0 1px 4px rgba(0,0,0,0.18);
          padding: 5px 6px 5px 16px;
        }
        .nav-cta-btn:hover {
          transform: scale(1.04);
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,1),
            0 4px 24px rgba(0,0,0,0.35);
        }
        .nav-cta-btn span {
          font-family: var(--font-body); font-size:13px; font-weight:500;
          color: #111; letter-spacing:0.08em;
        }

        /* ── Orange dot ─────────────────────────────────────────────────── */
        .nav-dot {
          width:26px; height:26px; border-radius:50%; flex-shrink:0;
          display:grid; place-items:center;
          background: linear-gradient(135deg, #FF9000 0%, #FF4400 100%);
          box-shadow:
            0 0 16px rgba(255,100,0,0.7),
            0 0 6px rgba(255,100,0,0.5),
            inset 0 1px 0 rgba(255,210,100,0.5);
        }

        @media(max-width:860px) { .nav-links { display:none; } }
      `}</style>

      <nav
        aria-hidden={!isVisible}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 200,
          padding: "14px 32px",
          opacity,
          transform: `translateY(${(1 - opacity) * -12}px)`,
          pointerEvents: isVisible ? "auto" : "none",
          willChange: "opacity, transform",
        }}
      >
        <div className="nav-outer">
          {/* Distortion layer */}
          <div className="nav-liquid" aria-hidden="true" />
          {/* Frost layer */}
          <div className="nav-frost" aria-hidden="true" />
          {/* Content layer */}
          <div className="nav-inner">
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
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
