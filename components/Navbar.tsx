"use client";
// components/Navbar.tsx
// Opacity fades in as user scrolls from the midpoint to the bottom of the
// carousel sentinel zone. Fades back out on scroll up. Uses rAF for smoothness.
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
    // No sentinel on this page (e.g. project pages) → always fully visible
    const sentinel = document.getElementById("carousel-end-sentinel");
    if (!sentinel) {
      setOpacity(1);
      return;
    }

    function update() {
      // The carousel section sits directly above the sentinel.
      // We want: opacity 0 at sentinel midpoint from top, opacity 1 at sentinel top = 0.
      const sentinelRect = sentinel!.getBoundingClientRect();

      // Distance of the sentinel from the top of the viewport.
      // When sentinel.top = viewportHeight/2 → start fading in (opacity 0).
      // When sentinel.top = 0 (or negative) → fully visible (opacity 1).
      const vh = window.innerHeight;
      const triggerStart = vh * 0.5;  // halfway down viewport = start of fade
      const triggerEnd   = 0;         // sentinel at viewport top = fully shown

      // Map sentinelRect.top from [triggerStart → triggerEnd] to [0 → 1]
      // clamped so it never goes outside 0–1
      const raw = (triggerStart - sentinelRect.top) / (triggerStart - triggerEnd);
      const clamped = Math.min(1, Math.max(0, raw));

      setOpacity(clamped);
    }

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // run once on mount

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
    zIndex: 1,
    ...typoStyle(logoTypography),
    ...(logoTypography?.textTransform ? { textTransform: logoTypography.textTransform as any } : {}),
  };

  return (
    <>
      <style>{`
        .nav-inner {
          display:flex; align-items:center; justify-content:space-between;
          height:52px; padding:0 8px 0 22px; border-radius:100px;
          position:relative; overflow:hidden; max-width:70%; margin:0 auto;
          background:linear-gradient(135deg,rgba(255,255,255,0.10) 0%,rgba(255,255,255,0.03) 50%,rgba(255,255,255,0.07) 100%);
          backdrop-filter:blur(32px) saturate(200%) brightness(1.1);
          -webkit-backdrop-filter:blur(32px) saturate(200%) brightness(1.1);
          box-shadow:inset 0 1px 0 rgba(255,255,255,0.18),inset 0 -1px 0 rgba(255,255,255,0.04),0 0 0 1px rgba(255,255,255,0.08),0 8px 32px rgba(0,0,0,0.4),0 2px 8px rgba(0,0,0,0.25);
        }
        .nav-inner::before {
          content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
          background:linear-gradient(100deg,rgba(255,255,255,0.06) 0%,transparent 40%,rgba(255,255,255,0.03) 100%);
        }
        .nav-links { display:flex; list-style:none; position:relative; z-index:1; }
        .nav-links a { font-family:var(--font-body); font-weight:300; font-size:13px; color:rgba(255,255,255,0.6); text-decoration:none; padding:7px 20px; border-radius:50px; letter-spacing:0.1em; transition:color 0.2s,background 0.2s; display:block; }
        .nav-links a:hover { color:rgba(255,255,255,0.95); background:rgba(255,255,255,0.07); }
        .nav-cta-btn { display:flex; align-items:center; gap:9px; border-radius:100px; text-decoration:none; position:relative; z-index:1; transition:transform 0.2s ease; background:linear-gradient(135deg,rgba(255,255,255,0.95) 0%,rgba(235,235,235,0.88) 100%); box-shadow:inset 0 1px 0 rgba(255,255,255,1),0 2px 12px rgba(0,0,0,0.25),0 1px 3px rgba(0,0,0,0.15); padding:5px 6px 5px 16px; }
        .nav-cta-btn:hover { transform:scale(1.03); }
        .nav-cta-btn span { font-family:var(--font-body); font-size:13px; font-weight:500; color:#1a1a1a; letter-spacing:0.08em; }
        .nav-dot { width:26px; height:26px; border-radius:50%; flex-shrink:0; display:grid; place-items:center; background:linear-gradient(135deg,#FF8C00 0%,#FF5500 100%); box-shadow:0 0 12px rgba(255,100,0,0.6),0 0 4px rgba(255,100,0,0.4),inset 0 1px 0 rgba(255,200,100,0.4); }
        @media(max-width:860px) { .nav-links { display:none; } }
      `}</style>

      <nav
        aria-hidden={!isVisible}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 200,
          padding: "14px 32px",
          // opacity driven by scroll progress — no JS transition, scroll IS the animation
          opacity,
          // Slide down slightly as it fades in for extra polish
          transform: `translateY(${(1 - opacity) * -12}px)`,
          pointerEvents: isVisible ? "auto" : "none",
          willChange: "opacity, transform",
        }}
      >
        <div className="nav-inner">
          <a href="/" className="nav-logo" style={logoStyle}>JENS DE MEYER</a>

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
      </nav>
    </>
  );
}
