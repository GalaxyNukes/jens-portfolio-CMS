// app/page.tsx — server component
// Rule #3: fallback UI when CMS data is unavailable
// Rule #6: revalidate = 60 for ISR
import {
  fetchSiteSettings,
  fetchHomePage,
  fetchProjects,
  fetchExperiences,
} from "@/sanity/sanity.queries";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SkillsMarquee from "@/components/SkillsMarquee";
import Statement from "@/components/Statement";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export const revalidate = 60;

export default async function HomePage() {
  // Fetch all data in parallel — each fetch is null-safe (returns null or [])
  const [settings, homePage, projects, experiences] = await Promise.all([
    fetchSiteSettings(),
    fetchHomePage(),
    fetchProjects(),
    fetchExperiences(),
  ]);

  // ── Fallback: CMS not yet configured ────────────────────────────────────
  if (!settings && !homePage) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1.5rem",
          background: "#0C0C0C",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Jens De Meyer — Portfolio
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "480px" }}>
          The CMS isn't connected yet. Visit{" "}
          <a
            href="/studio"
            style={{ color: "#FF7700", textDecoration: "underline" }}
          >
            /studio
          </a>{" "}
          to set up your Sanity Studio, then fill in Site Settings and Home Page
          content.
        </p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.875rem" }}>
          Missing <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in environment
          variables? Add it to Vercel → Settings → Environment Variables.
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar
        navLinks={settings?.navLinks}
        ctaLabel={settings?.ctaLabel}
        ctaHref={settings?.ctaHref}
      />

      <main>
        <Hero
          headlineTop={homePage?.hero?.headlineTop}
          headlineBottom={homePage?.hero?.headlineBottom}
          projects={projects}
        />

        <SkillsMarquee
          skillItems={homePage?.skills?.skillItems}
          separator={homePage?.skills?.separator}
          scrollSpeed={homePage?.skills?.scrollSpeed}
        />

        <Statement
          text={homePage?.statement?.text}
          backgroundPhoto={homePage?.statement?.backgroundPhoto}
          chipPhoto={homePage?.statement?.chipPhoto}
          availableForWork={settings?.availableForWork}
          instagram={settings?.instagram}
          linkedin={settings?.linkedin}
          behance={settings?.behance}
        />

        <Experience experiences={experiences} />

        <Contact
          tagline={homePage?.contact?.tagline}
          headline={homePage?.contact?.headline}
          statusText={homePage?.contact?.statusText}
          descriptionText={homePage?.contact?.descriptionText}
          ctaLabel={homePage?.contact?.ctaLabel}
          email={settings?.email}
          locationText={settings?.locationText}
          coordinates={settings?.coordinates}
          coordBarLeft={homePage?.contact?.coordBarLeft}
          coordBarCenter={homePage?.contact?.coordBarCenter}
          coordBarRight={homePage?.contact?.coordBarRight}
          availableForWork={settings?.availableForWork}
        />
      </main>
    </>
  );
}
