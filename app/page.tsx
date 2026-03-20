// app/page.tsx — page builder renderer
// Maps over sections array from CMS and renders the right component per _type
import { fetchSiteSettings, fetchHomePage, fetchProjects, fetchExperiences } from "@/sanity/sanity.queries";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { CarouselSection } from "@/components/Hero";
import SkillsMarquee from "@/components/SkillsMarquee";
import Statement from "@/components/Statement";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, homePage, rawProjects, rawExperiences] = await Promise.all([
    fetchSiteSettings(),
    fetchHomePage(),
    fetchProjects(),
    fetchExperiences(),
  ]);

  // Guard all arrays — Sanity can return null for empty datasets at build time
  const projects    = Array.isArray(rawProjects)    ? rawProjects    : [];
  const experiences = Array.isArray(rawExperiences) ? rawExperiences : [];

  if (!settings) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1.5rem", background: "#0C0C0C", color: "#fff", fontFamily: "system-ui", padding: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Jens De Meyer — Portfolio</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 480 }}>
          CMS not connected yet. Visit <a href="/studio" style={{ color: "#FF7700" }}>/studio</a> to set up Sanity Studio, then fill in Site Settings and add sections to Home Page.
        </p>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.875rem" }}>
          Missing <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>? Add it in Vercel → Settings → Environment Variables.
        </p>
      </div>
    );
  }

  const sections = Array.isArray(homePage?.sections) ? homePage.sections : [];

  return (
    <>
      <Navbar navLinks={settings?.navLinks ?? []} ctaLabel={settings?.ctaLabel} ctaHref={settings?.ctaHref} logoTypography={settings?.logoTypography} />
      <main>
        {sections.length === 0 ? (
          // Fallback: render all sections in original order if no CMS sections defined yet
          <>
            <Hero headlineTop="CROSSMEDIA" headlineBottom="Designer" projects={projects} />
            <SkillsMarquee />
            <Statement availableForWork={settings?.availableForWork} instagram={settings?.instagram} linkedin={settings?.linkedin} behance={settings?.behance} />
            <Experience experiences={experiences} />
            <Contact email={settings?.email} locationText={settings?.locationText} coordinates={settings?.coordinates} availableForWork={settings?.availableForWork} />
          </>
        ) : (
          sections.map((section: any) => {
            switch (section._type) {
              case "heroSection":
                return (
                  <Hero
                    key={section._key}
                    headlineTop={section.headlineTop}
                    headlineBottom={section.headlineBottom}
                    projects={projects}
                    topLineTypography={section.topLineTypography}
                    bottomLineTypography={section.bottomLineTypography}
                  />
                );
              case "carouselSection":
                return (
                  <CarouselSection
                    key={section._key}
                    projects={projects}
                    scrollSpeed={section.scrollSpeed}
                    cardTitleTypography={section.cardTitleTypography}
                    cardCategoryTypography={section.cardCategoryTypography}
                  />
                );
              case "marqueeSection":
                return (
                  <SkillsMarquee
                    key={section._key}
                    skillItems={section.items}
                    separator={section.separator}
                    scrollSpeed={section.speed}
                    textTypography={section.textTypography}
                  />
                );
              case "statementSection":
                return (
                  <Statement
                    key={section._key}
                    text={section.text}
                    backgroundPhoto={section.backgroundPhoto}
                    chipPhoto={section.chipPhoto}
                    sectionLabel={section.sectionLabel}
                    availableForWork={settings?.availableForWork}
                    instagram={settings?.instagram}
                    linkedin={settings?.linkedin}
                    behance={settings?.behance}
                    mainTextTypography={section.mainTextTypography}
                  />
                );
              case "experienceSection":
                return (
                  <Experience
                    key={section._key}
                    sectionLabel={section.sectionLabel}
                    experiences={experiences}
                    companyNameTypography={section.companyNameTypography}
                    roleTypography={section.roleTypography}
                    descriptionTypography={section.descriptionTypography}
                    tagTypography={section.tagTypography}
                  />
                );
              case "contactSection":
                return (
                  <Contact
                    key={section._key}
                    tagline={section.tagline}
                    headline={section.headline}
                    statusText={section.statusText}
                    descriptionText={section.descriptionText}
                    ctaLabel={section.ctaLabel}
                    coordBarLeft={section.coordBarLeft}
                    coordBarCenter={section.coordBarCenter}
                    coordBarRight={section.coordBarRight}
                    email={settings?.email}
                    locationText={settings?.locationText}
                    coordinates={settings?.coordinates}
                    availableForWork={settings?.availableForWork}
                    taglineTypography={section.taglineTypography}
                    headlineTypography={section.headlineTypography}
                    descriptionTypography={section.descriptionTypography}
                    formLabelTypography={section.formLabelTypography}
                    ctaTypography={section.ctaTypography}
                  />
                );
              default:
                return null;
            }
          })
        )}
      </main>
    </>
  );
}
