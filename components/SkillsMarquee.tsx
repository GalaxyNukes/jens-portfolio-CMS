"use client";
// components/SkillsMarquee.tsx — matches original exactly

type SkillsMarqueeProps = {
  skillItems?: string[];
  separator?: string;
  scrollSpeed?: "slow" | "medium" | "fast";
};

const DURATION: Record<string, string> = { slow: "36s", medium: "22s", fast: "12s" };

export default function SkillsMarquee({
  skillItems = [
    "Graphic Design", "Motion Design", "UI / UX", "Brand Identity",
    "Art Direction", "AI-Assisted Workflows", "Typography", "Visual Storytelling",
    "Crossmedia", "Photography", "Video Editing", "Web Design",
  ],
  separator = "·",
  scrollSpeed = "medium",
}: SkillsMarqueeProps) {
  const duration = DURATION[scrollSpeed] || "22s";
  const doubled = [...skillItems, ...skillItems];

  return (
    <>
      <style>{`
        @keyframes scrollSkills { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .skills-marquee { border-top:1px solid rgba(255,255,255,0.06); padding:275px 0 275px; overflow:hidden; position:relative; z-index:10; background:var(--bg,#0C0C0C); }
        .skills-track { display:flex; width:max-content; animation:scrollSkills ${duration} linear infinite; }
        .skills-track:hover { animation-play-state:paused; }
        .skills-item { font-family:var(--font-serif); font-style:italic; font-weight:300; font-size:clamp(11px,1.1vw,15px); color:rgba(255,255,255,0.50); letter-spacing:0.1em; white-space:nowrap; padding:0 32px; flex-shrink:0; }
        .skills-sep { color:var(--orange,#FF7700); font-style:normal; padding:0 0 0 32px; font-family:var(--font-serif); }
      `}</style>
      <section className="skills-marquee">
        <div className="skills-track">
          {doubled.map((skill, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center" }}>
              <span className="skills-item">{skill}</span>
              <span className="skills-sep">{separator}</span>
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
