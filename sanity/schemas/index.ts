// sanity/schemas/index.ts
import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import { project } from "./project";
import { experience } from "./experience";
import { post } from "./post";

// Section block types (used in homePage page builder)
import { heroSection } from "./sections/heroSection";
import { carouselSection } from "./sections/carouselSection";
import { marqueeSection } from "./sections/marqueeSection";
import { statementSection } from "./sections/statementSection";
import { experienceSection } from "./sections/experienceSection";
import { contactSection } from "./sections/contactSection";

export const schemaTypes = [
  // Singletons & collections
  siteSettings,
  homePage,
  project,
  experience,
  post,
  // Section block types (registered globally so homePage array can use them)
  heroSection,
  carouselSection,
  marqueeSection,
  statementSection,
  experienceSection,
  contactSection,
];
