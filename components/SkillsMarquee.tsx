"use client";
// components/SkillsMarquee.tsx
import { typoStyle, TypographyBlock } from "@/lib/typography";
const DURATION: Record<string, string> = { slow: "36s", medium: "22s", fast: "12s" };

type Props = { skillItems?: string[]; separator?: string; scrollSpeed?: string; textTypography?: TypographyBlock };

export default function SkillsMarquee({ skillItems = ["Graphic Design","Motion Design","UI / UX","Brand Identity","Art Direction","AI Workflows","Typography","Visual Storytelling"], separator = "·", scrollSpeed = "medium", textTypography }: Props) {
  const duration = DURATION[scrollSpeed] || "22s";
  const doubled = [...skillItems, ...skillItems];
  return (
    <>
      <style>{`
        @keyframes scrollSkills{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .skills-marquee{border-top:1px solid rgba(255,255,255,0.06);padding:275px 0;overflow:hidden;position:relative;z-index:10;background:var(--bg,#0C0C0C)}
        .skills-track{display:flex;width:max-content;animation:scrollSkills ${duration} linear infinite}
        .skills-track:hover{animation-play-state:paused}
        .skills-item{font-family:var(--font-serif);font-style:italic;font-weight:300;font-size:clamp(11px,1.1vw,15px);color:rgba(255,255,255,0.50);letter-spacing:0.1em;white-space:nowrap;padding:0 32px;flex-shrink:0}
        .skills-sep{color:var(--orange,#FF7700);font-style:normal;padding:0 0 0 32px;font-family:var(--font-serif)}
      `}</style>
      <section className="skills-marquee">
        <div className="skills-track">
          {doubled.map((skill, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              <span className="skills-item" style={typoStyle(textTypography)}>{skill}</span>
              <span className="skills-sep">{separator}</span>
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
