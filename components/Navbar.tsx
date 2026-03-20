"use client";
// components/Navbar.tsx
import { useState, useEffect } from "react";

type NavLink = { label: string; href: string };

type NavbarProps = {
  logoText?: string;
  navLinks?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
};

export default function Navbar({
  logoText = "JENS DE MEYER",
  navLinks = [],
  ctaLabel = "Get in Touch",
  ctaHref = "#contact",
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-black/60" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="font-display text-xl tracking-widest text-white hover:text-[var(--color-accent)] transition-colors"
          style={{ fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)" }}
        >
          {logoText}
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-white/70 hover:text-white text-sm tracking-widest uppercase transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={ctaHref}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--color-accent)] text-[var(--color-accent)] text-sm tracking-widest uppercase hover:bg-[var(--color-accent)] hover:text-black transition-all duration-200"
        >
          {ctaLabel}
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-white mb-1.5" />
          <span className="block w-6 h-0.5 bg-white mb-1.5" />
          <span className="block w-4 h-0.5 bg-white" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md px-6 pb-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-white/70 hover:text-white text-sm tracking-widest uppercase border-b border-white/10"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={ctaHref}
            className="mt-4 inline-block px-5 py-2.5 border border-[var(--color-accent)] text-[var(--color-accent)] text-sm tracking-widest uppercase"
            onClick={() => setMenuOpen(false)}
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </nav>
  );
}
