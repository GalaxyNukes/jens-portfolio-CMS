"use client";
// components/Statement.tsx
import Image from "next/image";
import { urlFor } from "@/sanity/sanity.image";
import { PortableText } from "next-sanity";
import { typoStyle, TypographyBlock } from "@/lib/typography";

type Props = {
  text?: any[];
  backgroundPhoto?: any;
  chipPhoto?: any;
  sectionLabel?: string;
  availableForWork?: boolean;
  instagram?: string;
  linkedin?: string;
  behance?: string;
  mainTextTypography?: TypographyBlock;
};

const ptComponents = {
  block: { normal: ({ children }: any) => <>{children}</> },
  marks: {
    strong: ({ children }: any) => <em style={{ fontStyle: "normal", color: "#fff", fontWeight: 700 }}>{children}</em>,
    em: ({ children }: any) => <em>{children}</em>,
  },
};

const SOCIALS = [
  { id: "instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { id: "linkedin", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { id: "behance", path: "M22.228 0H1.772C.792 0 0 .792 0 1.772v20.456C0 23.208.792 24 1.772 24h20.456C23.208 24 24 23.208 24 22.228V1.772C24 .792 23.208 0 22.228 0zM7.443 15.272c0 2.379-1.39 3.515-3.626 3.515H.5V5.213h3.566c2.044 0 3.266 1.107 3.266 2.956 0 1.23-.606 2.151-1.59 2.605 1.327.395 1.701 1.527 1.701 2.498zm8.29-2.14H11.13c0 1.618.85 2.476 2.22 2.476.955 0 1.65-.494 1.862-1.295h2.26c-.436 1.906-1.99 3.117-4.15 3.117-2.767 0-4.468-1.809-4.468-4.609 0-2.799 1.76-4.752 4.468-4.752 2.878 0 4.497 2.105 4.497 4.752 0 .11-.01.311-.086.311zm5.895 5.583h-2.62V8.558h2.62v10.157zM21.46 6.883a1.45 1.45 0 11-.003-2.9 1.45 1.45 0 01.003 2.9z" },
];

export default function Statement({
  text, backgroundPhoto, chipPhoto,
  sectionLabel = "Welcome to my portfolio",
  availableForWork = true,
  instagram, linkedin, behance,
  mainTextTypography,
}: Props) {
  const socialUrls: Record<string, string | undefined> = { instagram, linkedin, behance };

  return (
    <>
      <style>{`
        @keyframes pulse-green { 0%,100%{box-shadow:0 0 8px rgba(74,222,128,0.7)} 50%{box-shadow:0 0 16px rgba(74,222,128,1)} }

        /* ── Section shell — NO border-top, NO border-bottom ── */
        #statement {
          position: relative;
          background: #0c0c0c;
          overflow: hidden;
        }

        /* ── Inner layout: photo square + text side by side ── */
        .statement-inner {
          display: flex;
          align-items: stretch;
          max-width: 1200px;
          margin: 0 auto;
          min-height: 600px;
        }

        /* ── Photo column: fixed square, full height of the block ── */
        .statement-photo-col {
          flex: 0 0 auto;
          width: clamp(280px, 33vw, 480px);
          position: relative;
          overflow: hidden;
          /* Fades out on the right edge into the text */
          -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
          mask-image: linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
        }

        /* ── Text column ── */
        .statement-text-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 60px 80px 48px;
          text-align: left;
          position: relative;
          z-index: 2;
        }

        .statement-text {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(22px, 2.8vw, 40px);
          line-height: 1.55;
          color: rgba(255,255,255,0.88);
          margin: 0 0 48px 0;
        }

        .statement-photo-chip {
          display: inline-block;
          width: 56px; height: 36px;
          border-radius: 50px;
          background: linear-gradient(135deg,#2a2a2a,#3a3a3a);
          border: 1px solid rgba(255,255,255,0.12);
          vertical-align: middle;
          margin: 0 6px;
          overflow: hidden;
          position: relative;
          top: -2px;
        }

        .statement-bottom {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .available-badge {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-body); font-size: 13px;
          color: rgba(255,255,255,0.6); letter-spacing: 0.08em;
        }

        .available-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px rgba(74,222,128,0.7);
          animation: pulse-green 2s infinite;
        }

        .statement-divider { width:1px; height:18px; background:rgba(255,255,255,0.12); }

        .social-links { display:flex; align-items:center; gap:10px; }

        .social-link {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          display: grid; place-items: center;
          text-decoration: none;
          color: rgba(255,255,255,0.4);
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .social-link:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
          border-color: rgba(255,255,255,0.3);
        }
        .social-link svg { width:15px; height:15px; }

        .sect-label {
          font-family: var(--font-body); font-size: 11px;
          letter-spacing: 0.42em; color: rgba(255,255,255,0.25);
          text-transform: uppercase; margin-bottom: 20px;
        }

        @media (max-width: 860px) {
          .statement-inner { flex-direction: column; }
          .statement-photo-col {
            width: 100%; height: 320px;
            -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
            mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
          }
          .statement-text-col { padding: 48px 24px; }
        }
      `}</style>

      <section id="statement">
        <div className="statement-inner">

          {/* ── Photo column — fixed square left side ── */}
          {backgroundPhoto && (
            <div className="statement-photo-col">
              <Image
                src={urlFor(backgroundPhoto).width(960).url()}
                alt="Jens De Meyer"
                fill
                style={{ objectFit: "cover", objectPosition: "center top", filter: "brightness(0.6) grayscale(0.15)" }}
              />
            </div>
          )}

          {/* ── Text column ── */}
          <div className="statement-text-col">
            <p className="sect-label">{sectionLabel}</p>

            <p className="statement-text" style={typoStyle(mainTextTypography)}>
              {text && text.length > 0 ? (
                <PortableText value={text} components={ptComponents} />
              ) : (
                <>
                  I&apos;m{chipPhoto && (
                    <span className="statement-photo-chip">
                      <Image
                        src={urlFor(chipPhoto).width(112).height(72).url()}
                        alt="Jens"
                        width={56}
                        height={36}
                      />
                    </span>
                  )} a Belgian <em style={{ fontStyle: "italic" }}>Crossmedia Designer</em> who crafts
                  visual experiences across branding, motion, and digital — powered by curiosity
                  and a sharp eye for detail.
                </>
              )}
            </p>

            <div className="statement-bottom">
              {availableForWork && (
                <div className="available-badge">
                  <div className="available-dot" />
                  Available for Work
                </div>
              )}

              {SOCIALS.filter(s => socialUrls[s.id]).length > 0 && (
                <>
                  <div className="statement-divider" />
                  <div className="social-links">
                    {SOCIALS.filter(s => socialUrls[s.id]).map(s => (
                      <a
                        key={s.id}
                        href={socialUrls[s.id]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label={s.id}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d={s.path} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
