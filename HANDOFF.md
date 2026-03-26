# Jens De Meyer Portfolio CMS — Session Handoff
> Paste this file at the start of a new Claude session to resume exactly where we left off.
> Say: "Continue building my portfolio CMS using this handoff document."

---

## Current Status

| Item | Value |
|---|---|
| **Live URL** | https://jens-portfolio-cms.vercel.app |
| **Studio URL** | https://jens-portfolio-cms.vercel.app/studio |
| **GitHub** | https://github.com/GalaxyNukes/jens-portfolio-CMS |
| **Vercel project** | `prj_NxwB4PUFJNeph7vNzYM2AIUXBIto` |
| **Vercel team** | `team_iW1YKAuWMkmOLzbhqozDhjnO` |
| **Last deploy** | `993b011` — READY ✅ |
| **Sanity project ID** | `av2iyu19` |
| **Git user** | `Jens De Meyer <jens@jensdemyer.be>` |

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14.2.3 (App Router, server components) |
| CMS | Sanity v3 (Studio embedded at `/studio`) |
| Styling | Inline CSS-in-JS (`<style>` tags per component) + CSS variables |
| Language | TypeScript (strict: false) |
| Hosting | Vercel |
| Repo | GitHub — GalaxyNukes/jens-portfolio-CMS |

---

## Project File Structure

```
jens-portfolio/
├── app/
│   ├── layout.tsx                    # Root — theme CSS vars from CMS, @font-face, Google Fonts
│   ├── page.tsx                      # Homepage — page builder renderer (switch on _type)
│   ├── globals.css                   # Base reset + CSS variable defaults
│   ├── not-found.tsx                 # Bug #4 fix — zero CMS imports
│   ├── sitemap.ts                    # Auto-generated, includes /projects/[slug]
│   ├── robots.ts                     # Disallows /studio/
│   ├── blog/page.tsx                 # Gated behind blogEnabled boolean
│   ├── projects/[slug]/page.tsx      # Project detail — SSG, prev/next, keyboard/swipe nav
│   └── studio/[[...index]]/page.tsx  # Embedded Sanity Studio
├── components/
│   ├── Navbar.tsx         # Liquid glass pill — SVG feTurbulence warp + frost
│   ├── Hero.tsx           # Hero title + CarouselSection (exported separately)
│   ├── SkillsMarquee.tsx  # Infinite scroll marquee
│   ├── Statement.tsx      # About section — photo behind centered text
│   ├── Experience.tsx     # Accordion rows
│   ├── Contact.tsx        # Radar + form + coordinate bar
│   └── ProjectNav.tsx     # Client — keyboard (←→Esc) + touch swipe navigation
├── lib/
│   ├── typography.ts      # typoStyle() — converts CMS typography block → CSSProperties
│   └── security.ts        # safeHref(), safeCssHex(), safeCssFontName()
├── sanity/
│   ├── sanity.client.ts   # Nullable client (Bug #1 fix)
│   ├── sanity.image.ts    # urlFor() — guarded against null client (Bug #2)
│   ├── sanity.file.ts     # fileUrl() — converts file asset refs to CDN URLs
│   ├── sanity.queries.ts  # All GROQ queries — all wrapped in try/catch
│   └── schemas/
│       ├── index.ts
│       ├── siteSettings.ts
│       ├── homePage.ts              # Page builder document (sections[])
│       ├── project.ts               # Full project with slug, body, gallery, credits
│       ├── experience.ts
│       ├── post.ts                  # Blog (hidden until blogEnabled)
│       └── sections/
│           ├── typographyObject.ts  # Reusable typography field factory
│           ├── heroSection.ts
│           ├── carouselSection.ts
│           ├── marqueeSection.ts
│           ├── statementSection.ts
│           ├── experienceSection.ts
│           └── contactSection.ts
├── next.config.js   # CSP headers, image domains
├── sanity.config.ts # Studio config (Bug #3 fix — fallback strings)
└── tailwind.config.ts
```

---

## How to Push Changes

```bash
cd ~/Downloads/jens-portfolio

# 1. Make changes to files
# 2. TypeScript check
npx tsc --noEmit

# 3. Commit and push
git add -A
git commit -m "feat: description of change"
git push origin main
```

Claude can push directly using the stored token. After each push, verify with Vercel MCP:
- `Vercel:list_deployments` with projectId `prj_NxwB4PUFJNeph7vNzYM2AIUXBIto` and teamId `team_iW1YKAuWMkmOLzbhqozDhjnO`
- Check that `state === "READY"` on the latest entry

---

## CMS Architecture — Page Builder

The homepage is built from a **draggable `sections[]` array** in the `homePage` Sanity document. Each item is a typed block object. Users drag to reorder. New block types need a schema file in `sanity/schemas/sections/` + a case in the `switch` in `app/page.tsx`.

```
homePage.sections[]
  ├── heroSection          # Headline + embedded carousel
  ├── carouselSection      # Standalone carousel block
  ├── marqueeSection       # Scrolling skills ticker
  ├── statementSection     # About / photo background
  ├── experienceSection    # Accordion company rows
  └── contactSection       # Radar + form + coordinate bar
```

### Adding a new section type
1. Create `sanity/schemas/sections/newSection.ts`
2. Register it in `sanity/schemas/index.ts`
3. Add it to the `of:[]` array in `sanity/schemas/homePage.ts`
4. Add the GROQ fields to `fetchHomePage()` in `sanity/sanity.queries.ts`
5. Add a `case "newSection":` in `app/page.tsx`
6. Create `components/NewSection.tsx`

---

## Critical Patterns — Never Break These

### Sanity client is nullable
```ts
// sanity/sanity.client.ts
export const client = projectId ? createClient({...}) : null;
// Every file that uses client MUST check for null first
```

### All fetches wrapped in try/catch
```ts
export async function fetchX() {
  if (!client) return null;
  try {
    return await client.fetch(`...`);
  } catch (e) {
    console.error("[Sanity] fetchX failed:", e);
    return null;
  }
}
```

### Use `??` not `||` for defaults
`||` swallows `0` and `false` — both are valid values (e.g. rotateX: 0, cardScale: 0.5).

### All CMS values injected into CSS must be sanitised
```ts
import { safeCssHex, safeCssFontName } from "@/lib/security";
const accent = safeCssHex(s?.accentColor?.hex, "#FF7700");
const font   = safeCssFontName(s?.displayFont, "Bebas Neue");
```

### All CMS hrefs must use safeHref()
```ts
import { safeHref } from "@/lib/security";
<a href={safeHref(project.externalLink)}>...</a>
```

### Arrays from Sanity can return null on empty datasets
Always guard:
```ts
const projects = Array.isArray(rawProjects) ? rawProjects : [];
```

### Server components cannot have inline event handlers
Use CSS `:hover` classes instead of `onMouseEnter`/`onMouseLeave` props in server components. Only `"use client"` components can have JS event handlers.

### Revalidation
```ts
export const revalidate = 60; // on every page route
```

### No-found page must have zero CMS imports
`app/not-found.tsx` — plain React only, no Sanity, no Image imports.

---

## Typography System

Every section has its own collapsible typography controls in the Studio.

### `lib/typography.ts` — `typoStyle(block)` → `React.CSSProperties`
```ts
type TypographyBlock = {
  font?: string;          // Font family name (Google Font or uploaded custom)
  size?: string;          // e.g. "62px" or "clamp(34px, 5vw, 80px)"
  weight?: string;        // "100"–"900"
  style?: string;         // "normal" | "italic"
  letterSpacing?: string; // e.g. "0.14em"
  lineHeight?: string;    // e.g. "1.5"
  paragraphSpacing?: string; // e.g. "1em" (applied as marginBottom)
  textTransform?: string; // "uppercase" | "lowercase" | "capitalize" | "none"
  colorHex?: string;      // Override color
}
```

Usage in components:
```tsx
import { typoStyle, TypographyBlock } from "@/lib/typography";
<span style={typoStyle(props.titleTypography)}>{title}</span>
```

### Custom Font Uploads
Users upload `.woff2`/`.woff`/`.ttf` in Studio → Site Settings → Custom Fonts. Each upload has: `fontName`, `fontFile`, `fontWeight`, `fontStyle`. `layout.tsx` generates `@font-face` blocks automatically. Use the exact `fontName` string in any typography field.

---

## Carousel — All Controls

The carousel (in both `heroSection` and `carouselSection`) has:

| Field | Default | Notes |
|---|---|---|
| `scrollSpeed` | `"medium"` | off / slow / medium / fast |
| `scrollDirection` | `"left"` | left / right |
| `cardScale` | `1` | 0.5×–3× multiplier on base 351×527 |
| `rotation.rotateX` | `22` | Degrees, range -90–90 |
| `rotation.rotateY` | `-22` | Degrees, range -90–90 |
| `rotation.rotateZ` | `0` | Degrees, range -45–45 |
| `position.topOffset` | `575` | px from top of section |
| `position.startX` | `-280` | Initial horizontal offset |
| `position.sectionHeight` | `1100` | Total section height |
| `perspective.depth` | `1200` | px, lower = more dramatic |
| `perspective.originX` | `60` | %, vanishing point X |
| `perspective.originY` | `100` | %, vanishing point Y |
| `cardSize.width` | `351` | Manual override (ignored if cardScale set) |
| `cardSize.height` | `527` | Manual override |
| `cardSize.gap` | `24` | px between cards |
| `cardSize.borderRadius` | `16` | px corner radius |

**Preset for flatter/straight-on look (like screenshot):**
rotateX=8, rotateY=-12, depth=2400, originX=50, originY=80, borderRadius=28

---

## Navbar — Liquid Glass

Three stacked layers inside the pill:
1. **`nav-liquid`** — `filter: url(#liquid-glass)` — SVG `feTurbulence` + `feDisplacementMap` warps the pixels behind the pill. `scale="28"` controls warp intensity. Animated via `liquidShift` keyframes.
2. **`nav-frost`** — `backdrop-filter: blur(28px) saturate(160%)` — the frosted glass layer.
3. **`nav-inner`** — content layer with `inset 0 1.5px 0 rgba(255,255,255,0.55)` top rim.

**Scroll behaviour:** Navbar is hidden on homepage until user scrolls to 50% of the carousel. Opacity is driven by scroll progress (0→1), not a binary show/hide. Uses `IntersectionObserver` on `#carousel-end-sentinel` (a 1px div placed after the carousel). On project pages (no sentinel) it is always visible.

---

## Project Pages — `/projects/[slug]`

- **Route:** `app/projects/[slug]/page.tsx` — server component, `revalidate = 60`
- **Static generation:** `generateStaticParams()` fetches all published slugs
- **Prev/Next:** Ordered from `fetchProjectsOrdered()` (same order as homepage carousel, not independent sort)
- **Counter:** `2 / 13` shown on cover image
- **Keyboard nav:** `ProjectNav.tsx` (client) — `←` prev, `→` next, `Escape` → `/`
- **Swipe nav:** 80px threshold, left = next, right = prev
- **`whitespace: pre-wrap`** on all plain-text description renders

### Project schema fields
`title`, `slug`, `category`, `year`, `client`, `shortDescription`, `coverImage`, `externalLink`, `headline`, `body` (Portable Text), `tags[]`, `credits[]`, `gallery[]`, `order`, `published`, `featured`

---

## Security

| Helper | Where used | What it prevents |
|---|---|---|
| `safeHref(url)` | All CMS-sourced hrefs | `javascript:` XSS |
| `safeCssHex(val, fallback)` | `layout.tsx` color injection | CSS injection |
| `safeCssFontName(val, fallback)` | `layout.tsx` font injection | CSS string escape |

**CSP** (in `next.config.js`): `script-src`, `style-src`, `img-src`, `font-src`, `connect-src` all use `*.sanity.io` wildcards (not `api.sanity.io` — Sanity uses project-specific subdomains like `av2iyu19.api.sanity.io`). `connect-src` includes `blob:` for asset handling.

---

## Site Settings — What Lives There

`Studio → Site Settings` — singleton document, never a list.

| Tab | Fields |
|---|---|
| SEO & Identity | siteTitle, metaDescription, ogImage, favicon |
| Colors & Fonts | accentColor, backgroundColor, textColor, displayFont, serifFont, bodyFont |
| Custom Fonts | Upload .woff2/.woff/.ttf — generates @font-face automatically |
| Navigation | navLinks[], ctaLabel, ctaHref |
| Navbar Typography | Font, size, weight, kerning, transform, color for "JENS DE MEYER" logo text |
| Social Links | instagram, linkedin, behance |
| Contact Info | email, locationText, coordinates |
| Availability | availableForWork boolean (green dot across site) |
| Blog | blogEnabled boolean (false = /blog returns 404) |

---

## GROQ Query Rules

1. **Always dereference references:** `projects[]->{...}` not just `projects`
2. **Always dereference file assets:** `asset->{ url }` — never just `asset` (gives only `_ref`)
3. **All fetches in try/catch** — CMS errors must not crash page renders
4. **Color input returns `{ hex: "#..." }`** — use `.hex`, never treat it as a string
5. **Typography fragment** reused across queries:
   ```groq
   { font, size, weight, style, letterSpacing, lineHeight, paragraphSpacing, textTransform, "colorHex": color.hex }
   ```

---

## Image Size Reference

| Location | Recommended size | Aspect ratio |
|---|---|---|
| Carousel / portfolio cards | 700 × 1050px | 2:3 portrait |
| Project cover (detail page) | 1600 × 900px | 16:9 |
| Statement background photo | 1400 × 900px | ~3:2 |
| Gallery images | 900 × 600px | Any |
| Company logos (experience) | 120 × 60px | Horizontal, transparent PNG |
| Profile photo chip | 112 × 72px | Oval crop |
| OG / social share image | 1200 × 630px | 1.91:1 |

---

## Known Gotchas

| Issue | Fix |
|---|---|
| `client.fetch()` returns null on empty dataset | `Array.isArray(result) ? result : []` |
| `onMouseEnter`/`onMouseLeave` in server component | Use CSS `:hover` classes instead |
| CSP blocks Sanity Studio | Use `*.sanity.io` not `api.sanity.io` |
| `str_replace` corrupts files when target string contains emojis | Rewrite entire file with `cat > file << 'EOF'` |
| Color input `.hex` is undefined | Check `s?.accentColor?.hex` before using |
| `||` swallows `0` and `false` | Use `??` for all defaults |
| `create_file` fails silently on existing files | `rm file` before `create_file` |
| Studio `/studio` returns 404 | Verify folder is named exactly `[[...index]]` (not corrupted) |
| Sanity returns null for empty collection | Guard with `Array.isArray()` |
| `whitespace` lost in descriptions | Always `whitespace: pre-wrap` on text renders |

---

## QA Checklist — Run Before Every Deploy

```bash
cd ~/Downloads/jens-portfolio

# 1. TypeScript — zero errors required
npx tsc --noEmit

# 2. Build — must complete without errors
npm run build

# 3. Check for common mistakes
grep -r "onMouseEnter\|onMouseLeave" app/  # should only appear in "use client" files
grep -r "|| \"" sanity/sanity.queries.ts   # should be ?? not ||
```

**After deploy:**
- Check `state === "READY"` via `Vercel:list_deployments`
- Visit `/` — site loads, no fallback "CMS not connected" screen
- Visit `/studio` — Studio loads, no network errors in console
- Visit `/projects/test-slug` — project page renders
- Visit `/sitemap.xml` — shows homepage + all project routes
- Visit `/robots.txt` — disallows `/studio/`

---

## Suggested Improvements (Priority Order)

### High impact — functionality
1. **Contact form actually sends email** — currently the form fields exist but do nothing. Add a Next.js API route (`/api/contact`) using Resend or Nodemailer. Store recipient email from `siteSettings.email`.
2. **Image loading states** — add `placeholder="blur"` + `blurDataURL` to all `<Image>` components for smoother perceived loading.
3. **Mobile nav** — below 860px the nav links are hidden with no hamburger replacement. Add a slide-down mobile menu.

### Medium impact — CMS
4. **Video field on projects** — add an optional `videoUrl` field (YouTube/Vimeo embed URL) to the project schema. Render above the gallery on the detail page.
5. **Testimonials section** — standalone `testimonial` document type + `testimonialsSection` page builder block. Shown as quote cards.
6. **Project categories as filter pills** — on a future `/work` grid page, show pills derived only from categories that actually exist in the project set (no orphan pills).

### Creative / design
7. **Cursor trail** — Belgian orange dot that follows the cursor with a short inertia trail. Fits the brand aesthetic.
8. **Page transitions** — subtle fade/slide between routes using `next/navigation` + CSS animations.
9. **Scroll-triggered section reveals** — `IntersectionObserver` on each section to fade/slide in as it enters viewport (already have the sentinel pattern from the navbar).
10. **Project card video preview** — on hover, project cards in the carousel could play a short looping `.webm` clip instead of showing the static image. Add optional `previewVideo` field to the project schema.
11. **Skills section redesign** — instead of the marquee, offer an alternative grid layout where skills are displayed as categorised groups (Motion / Brand / Digital) with proficiency indicators.
12. **Dark/light mode toggle** — the site is currently hardcoded dark. A toggle stored in `localStorage` + `data-theme` attribute would let the CMS define both a dark and light color palette.

### Technical debt
13. **Next.js upgrade** — currently on 14.2.3 which has a known security vulnerability (flagged in Vercel build logs). Upgrade to latest Next.js 14 patch or Next.js 15.
14. **Sanity GROQ type generation** — add `@sanity/types` and generate TypeScript types from the schema so component props are fully typed end-to-end.
15. **`next/font`** — replace Google Fonts `<link>` tags in `layout.tsx` with `next/font/google` for better performance (no separate HTTP request, fonts inlined at build time).

---

## Day-to-Day CMS Tasks

| Task | Studio path |
|---|---|
| Add project | Projects → New → fill fields → Generate slug → Publish |
| Reorder projects in carousel | Projects → drag rows |
| Hide a project | Projects → toggle Published off |
| Add experience row | Experience → New |
| Change accent color | Site Settings → Colors & Fonts → Accent Color |
| Change navbar font | Site Settings → Navbar Typography → Font Family |
| Upload custom font | Site Settings → Custom Fonts → Add |
| Reorder page sections | Home Page → drag section cards |
| Add new section | Home Page → sections → + Add Item |
| Change carousel direction | Home Page → Hero (or Carousel) → Scroll Direction |
| Scale up portfolio cards | Home Page → Hero → Card Scale → pick 2× |
| Toggle availability badge | Site Settings → Availability → toggle |
| Enable blog | Site Settings → Blog → Enable Blog → toggle on |
| Edit contact section | Home Page → Contact / Transmission section |

---

*Built in this session — March 2026. Commit history at github.com/GalaxyNukes/jens-portfolio-CMS.*
