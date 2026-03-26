"use client";
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
      setOpacity(Math.min(1, Math.max(0, (vh * 0.5 - r.top) / (vh * 0.5))));
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

  const logoStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: 16,
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.92)",
    textDecoration: "none",
    ...typoStyle(logoTypography),
    ...(logoTypography?.textTransform
      ? { textTransform: logoTypography.textTransform as React.CSSProperties["textTransform"] }
      : {}),
  };

  return (
    <>
      <style>{`
        .nav-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 54px;
          padding: 0 8px 0 24px;
          border-radius: 100px;
          max-width: 900px;
          margin: 0 auto;

          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 2px;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.72);
          text-decoration: none;
          padding: 7px 20px;
          border-radius: 50px;
          letter-spacing: 0.1em;
          transition: color 0.18s, background 0.18s;
          display: block;
        }
        .nav-links a:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.10);
        }

        .nav-cta {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 5px 6px 5px 18px;
          border-radius: 100px;
          text-decoration: none;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 2px 12px rgba(0,0,0,0.2);
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .nav-cta:hover {
          transform: scale(1.04);
          box-shadow: 0 4px 20px rgba(0,0,0,0.28);
        }
        .nav-cta span {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          color: #111;
          letter-spacing: 0.08em;
          white-space: nowrap;
        }
        .nav-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: linear-gradient(145deg, #FF9200, #FF3D00);
          box-shadow: 0 0 14px rgba(255,100,0,0.6);
        }

        @media (max-width: 860px) { .nav-links { display: none; } }
      `}</style>

      <nav
        aria-hidden={opacity === 0}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 200,
          padding: "14px 32px",
          opacity,
          transform: `translateY(${(1 - opacity) * -10}px)`,
          pointerEvents: opacity > 0 ? "auto" : "none",
          transition: "opacity 0.15s linear, transform 0.15s linear",
        }}
      >
        <div className="nav-pill">
          <a href="/" style={logoStyle}>JENS DE MEYER</a>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          <a href={ctaHref} className="nav-cta">
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
