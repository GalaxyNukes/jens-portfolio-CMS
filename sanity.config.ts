// sanity.config.ts
// BUG #3 FIX: always use fallback strings — never let projectId be undefined
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "jens-portfolio-studio",
  title: "Jens De Meyer — Portfolio Studio",

  // BUG #3: fallback strings prevent crash when env vars are missing
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [
    structureTool({
      structure: (S, context) => {
        // We check siteSettings to gate the blog section
        // For the structure, we'll always show it but label it clearly
        return S.list()
          .title("Content")
          .items([
            // Singletons
            S.listItem()
              .title("Home Page")
              .icon(() => "📄")
              .id("homePage")
              .child(
                S.document()
                  .schemaType("homePage")
                  .documentId("homePage")
              ),
            S.divider(),
            // Collections
            S.documentTypeListItem("project").title("Projects").icon(() => "🎨"),
            S.documentTypeListItem("experience").title("Experience").icon(() => "💼"),
            S.listItem()
              .title("Blog Posts (disabled in settings)")
              .icon(() => "✍️")
              .child(S.documentTypeList("post")),
            S.divider(),
            // Settings singleton
            S.listItem()
              .title("Site Settings")
              .icon(() => "⚙️")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
          ]);
      },
    }),
    visionTool(),
    colorInput(),
  ],

  schema: { types: schemaTypes },
});
