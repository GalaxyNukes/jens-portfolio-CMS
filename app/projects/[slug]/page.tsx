// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { fetchProjectBySlug, fetchAllProjectSlugs, fetchSiteSettings } from "@/sanity/sanity.queries";
import { urlFor } from "@/sanity/sanity.image";
import Navbar from "@/components/Navbar";

export const revalidate = 60;

// Pre-generate all published project pages at build time
export async function generateStaticParams() {
  const slugs = await fetchAllProjectSlugs();
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

// Rich text components matching the site aesthetic
const bodyComponents = {
  block: {
    normal: ({ children }: any) => (
      <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "clamp(15px,1.1vw,17px)", lineHeight: 1.85, color: "rgba(255,255,255,0.65)", marginBottom: "1.5em" }}>
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3vw,42px)", letterSpacing: "0.1em", color: "#fff", marginTop: "2em", marginBottom: "0.5em" }}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(20px,2vw,28px)", color: "rgba(255,255,255,0.8)", marginTop: "1.5em", marginBottom: "0.4em" }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote style={{ borderLeft: "3px solid var(--orange,#FF7700)", paddingLeft: "1.5em", marginLeft: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(18px,1.5vw,24px)", color: "rgba(255,255,255,0.6)", marginBottom: "1.5em" }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong style={{ color: "#fff", fontWeight: 700 }}>{children}</strong>,
    em:     ({ children }: any) => <em style={{ color: "var(--orange,#FF7700)", fontStyle: "italic" }}>{children}</em>,
    link:   ({ value, children }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer"
        style={{ color: "var(--orange,#FF7700)", textDecoration: "underline", textUnderlineOffset: 4 }}>
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      return (
        <figure style={{ margin: "3em 0" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: 8, overflow: "hidden" }}>
            <Image
              src={urlFor(value).width(1200).url()}
              alt={value.alt || ""}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          {value.caption && (
            <figcaption style={{ fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginTop: 12, textAlign: "center" }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, settings] = await Promise.all([
    fetchProjectBySlug(params.slug),
    fetchSiteSettings(),
  ]);

  if (!project || !project.published) notFound();

  const coverUrl = project.coverImage ? urlFor(project.coverImage).width(1600).url() : null;

  return (
    <>
      <Navbar
        navLinks={settings?.navLinks ?? []}
        ctaLabel={settings?.ctaLabel}
        ctaHref={settings?.ctaHref}
        logoTypography={settings?.logoTypography}
      />

      <main style={{ background: "var(--bg,#0C0C0C)", minHeight: "100vh", color: "#fff" }}>

        {/* ── Hero cover ── */}
        <div style={{ position: "relative", width: "100%", height: "70vh", minHeight: 400, overflow: "hidden" }}>
          {coverUrl ? (
            <>
              <Image src={coverUrl} alt={project.title} fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(12,12,12,1) 0%, rgba(12,12,12,0.4) 60%, rgba(12,12,12,0.1) 100%)" }} />
            </>
          ) : (
            <div style={{ width: "100%", height: "100%", background: "#1a1a1a" }} />
          )}

          {/* Category label */}
          <div style={{ position: "absolute", bottom: 48, left: "clamp(24px,5vw,80px)", right: "clamp(24px,5vw,80px)" }}>
            {project.category && (
              <p style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.4em", color: "var(--orange,#FF7700)", textTransform: "uppercase", marginBottom: 16 }}>
                {project.category}
              </p>
            )}
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px,7vw,100px)", letterSpacing: "0.06em", lineHeight: 0.9, color: "#fff", margin: 0 }}>
              {project.headline || project.title}
            </h1>
          </div>
        </div>

        {/* ── Meta bar ── */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "24px clamp(24px,5vw,80px)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", maxWidth: 1200 }}>
            {project.client && (
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.4em", color: "var(--orange,#FF7700)", textTransform: "uppercase", marginBottom: 6 }}>Client</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{project.client}</p>
              </div>
            )}
            {project.year && (
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.4em", color: "var(--orange,#FF7700)", textTransform: "uppercase", marginBottom: 6 }}>Year</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{project.year}</p>
              </div>
            )}
            {project.category && (
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.4em", color: "var(--orange,#FF7700)", textTransform: "uppercase", marginBottom: 6 }}>Category</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{project.category}</p>
              </div>
            )}
            {project.externalLink && (
              <div style={{ marginLeft: "auto" }}>
                <a
                  href={project.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "12px 28px", border: "1px solid rgba(255,255,255,0.15)", fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.2em", color: "#fff", textDecoration: "none", position: "relative", overflow: "hidden", transition: "border-color 0.25s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--orange,#FF7700)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
                >
                  VIEW PROJECT
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M2 14L14 2M14 2H6M14 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ── Body content ── */}
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px clamp(24px,5vw,80px)" }}>

          {/* Short description as lead */}
          {project.shortDescription && (
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(18px,1.6vw,24px)", lineHeight: 1.6, color: "rgba(255,255,255,0.7)", marginBottom: "3em", borderLeft: "3px solid var(--orange,#FF7700)", paddingLeft: "1.5em" }}>
              {project.shortDescription}
            </p>
          )}

          {/* Rich body */}
          {project.body && project.body.length > 0 && (
            <PortableText value={project.body} components={bodyComponents} />
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div style={{ marginTop: "4em", paddingTop: "3em", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.4em", color: "var(--orange,#FF7700)", textTransform: "uppercase", marginBottom: 16 }}>Tools & Skills</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {project.tags.map((tag: string) => (
                  <span key={tag} style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "5px 14px" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Credits */}
          {project.credits && project.credits.length > 0 && (
            <div style={{ marginTop: "3em" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.4em", color: "var(--orange,#FF7700)", textTransform: "uppercase", marginBottom: 16 }}>Credits</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {project.credits.map((c: any, i: number) => (
                  <div key={i} style={{ display: "flex", gap: 24 }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", minWidth: 120 }}>{c.role}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Gallery grid ── */}
        {project.gallery && project.gallery.length > 0 && (
          <div style={{ padding: "0 clamp(24px,5vw,80px) 120px", maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 60, marginBottom: 40 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.4em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>Gallery</p>
            </div>
            <div style={{ columns: "2 360px", gap: 16 }}>
              {project.gallery.map((img: any, i: number) => (
                <div key={i} style={{ breakInside: "avoid", marginBottom: 16, borderRadius: 8, overflow: "hidden", position: "relative" }}>
                  <Image
                    src={urlFor(img).width(900).url()}
                    alt={img.alt || ""}
                    width={900}
                    height={600}
                    style={{ width: "100%", height: "auto", display: "block", filter: "brightness(0.88)", transition: "filter 0.3s" }}
                    onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1)")}
                    onMouseLeave={e => (e.currentTarget.style.filter = "brightness(0.88)")}
                  />
                  {img.caption && (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", padding: "10px 0 0" }}>
                      {img.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Back link ── */}
        <div style={{ padding: "0 clamp(24px,5vw,80px) 80px" }}>
          <a href="/#home" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.3em", color: "rgba(255,255,255,0.3)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >
            ← Back to portfolio
          </a>
        </div>

      </main>
    </>
  );
}
