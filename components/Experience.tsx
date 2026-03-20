"use client";
// components/Experience.tsx
import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/sanity.image";
import { typoStyle, TypographyBlock } from "@/lib/typography";

type ExpItem = {
  _id: string; companyName: string; companyLogo?: any;
  role: string; dateRange?: string; description?: string;
  tags?: string[]; responsibilities?: string[];
};

type Props = {
  sectionLabel?: string;
  experiences?: ExpItem[];
  companyNameTypography?: TypographyBlock;
  roleTypography?: TypographyBlock;
  descriptionTypography?: TypographyBlock;
  tagTypography?: TypographyBlock;
};

const FALLBACK: ExpItem[] = [
  { _id: "f1", companyName: "Freelance", role: "Crossmedia Designer", dateRange: "2016 – 2018", description: "Independent practice spanning branding, print, and early digital work.", tags: ["Branding","Print","Identity"], responsibilities: ["Build brand identities from scratch","Design print and editorial layouts","Develop client presentation decks"] },
  { _id: "f2", companyName: "Plinke", role: "Junior Designer", dateRange: "2018 – 2019", description: "Digital agency work covering web UI, social assets, and campaign visuals.", tags: ["Web","Social","Campaigns"], responsibilities: ["Create UI designs for client websites","Produce social media visual sets","Support senior designers on campaigns"] },
  { _id: "f3", companyName: "Haze & Finn", role: "Crossmedia Designer", dateRange: "2023 – Present", description: "Shaping the visual identity and crossmedia output for a premium lifestyle brand.", tags: ["Crossmedia","Lifestyle","Campaigns"], responsibilities: ["Shape brand identity and crossmedia output","Produce campaign visuals and motion content","Manage all digital brand touchpoints","Develop AI-assisted creative workflows"] },
];

export default function Experience({ sectionLabel = "MY Experience", experiences = [], companyNameTypography, roleTypography, descriptionTypography, tagTypography }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const items = experiences.length > 0 ? experiences : FALLBACK;
  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  // Parse "MY Experience" → first word gets display font, rest serif
  const parts = sectionLabel.split(" ");
  const first = parts[0];
  const rest = parts.slice(1).join(" ");

  return (
    <>
      <style>{`
        #experience{padding:120px 0 60px;position:relative;z-index:10;background:var(--bg,#0C0C0C)}
        .exp-heading{text-align:center;margin-bottom:80px;padding:0 60px}
        .exp-heading .my-word{font-family:var(--font-display);font-size:clamp(28px,4vw,48px);letter-spacing:0.14em}
        .exp-heading .exp-word{font-family:var(--font-serif);font-style:italic;font-weight:400;font-size:clamp(28px,4vw,48px);letter-spacing:0.06em;margin-left:10px}
        .logos-row{display:flex;flex-direction:column;width:100%}
        .logo-cell{border-top:1px solid rgba(255,255,255,0.07);cursor:pointer;overflow:hidden;transition:background 0.25s}
        .logo-cell:last-child{border-bottom:1px solid rgba(255,255,255,0.07)}
        .logo-cell-header{display:grid;grid-template-columns:80px 1fr auto 48px;align-items:center;gap:32px;padding:28px 60px;transition:background 0.25s}
        .logo-cell:hover .logo-cell-header,.logo-cell.open .logo-cell-header{background:rgba(255,255,255,0.02)}
        .logo-cell-index{font-family:var(--font-body);font-size:11px;letter-spacing:0.3em;color:rgba(255,255,255,0.18);font-weight:300}
        .logo-wordmark{font-family:var(--font-body);font-size:15px;letter-spacing:0.14em;color:rgba(255,255,255,0.45);text-transform:uppercase;transition:color 0.25s}
        .logo-cell:hover .logo-wordmark,.logo-cell.open .logo-wordmark{color:rgba(255,255,255,0.95)}
        .logo-cell-role{font-family:var(--font-serif);font-style:italic;font-size:13px;color:rgba(255,255,255,0.28);text-align:right;transition:color 0.25s}
        .logo-cell:hover .logo-cell-role,.logo-cell.open .logo-cell-role{color:rgba(255,255,255,0.5)}
        .logo-cell-toggle{width:32px;height:32px;border-radius:50%;border:1px solid rgba(255,255,255,0.12);display:grid;place-items:center;color:rgba(255,255,255,0.3);font-size:18px;transition:transform 0.35s ease,border-color 0.25s,background 0.25s,color 0.25s}
        .logo-cell.open .logo-cell-toggle{transform:rotate(45deg);border-color:var(--orange,#FF7700);background:rgba(255,119,0,0.1);color:var(--orange,#FF7700)}
        .logo-cell-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows 0.38s cubic-bezier(0.16,1,0.3,1)}
        .logo-cell.open .logo-cell-body{grid-template-rows:1fr}
        .logo-cell-body-inner{overflow:hidden}
        .logo-cell-body-content{display:grid;grid-template-columns:80px 1fr 1fr 48px;gap:32px;padding:0 60px 36px;border-top:1px solid rgba(255,255,255,0.05)}
        .body-desc{font-family:var(--font-body);font-weight:300;font-size:13px;line-height:1.85;color:rgba(255,255,255,0.4);padding-top:24px}
        .body-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:16px}
        .body-tag{font-family:var(--font-body);font-size:10px;letter-spacing:0.15em;color:rgba(255,255,255,0.35);text-transform:uppercase;border:1px solid rgba(255,255,255,0.1);border-radius:50px;padding:4px 12px}
        .body-responsibilities{padding-top:24px}
        .body-responsibilities h4{font-family:var(--font-body);font-size:10px;letter-spacing:0.35em;color:var(--orange,#FF7700);text-transform:uppercase;margin-bottom:16px}
        .body-responsibilities ul{list-style:none;display:flex;flex-direction:column;gap:10px}
        .body-responsibilities li{font-family:var(--font-body);font-weight:300;font-size:13px;color:rgba(255,255,255,0.42);padding-left:18px;position:relative;line-height:1.5}
        .body-responsibilities li::before{content:'·';position:absolute;left:0;color:var(--orange,#FF7700);font-size:20px;line-height:1;top:-2px}
        @media(max-width:860px){.logo-cell-header{grid-template-columns:40px 1fr 48px;gap:16px;padding:20px 24px}.logo-cell-body-content{grid-template-columns:40px 1fr 48px;padding:0 24px 24px}}
      `}</style>
      <section id="experience">
        <div className="exp-heading">
          <span className="my-word">{first}</span>
          {rest && <span className="exp-word">{rest}</span>}
        </div>
        <div className="logos-row">
          {items.map((exp, i) => (
            <div key={exp._id} className={`logo-cell${openId === exp._id ? " open" : ""}`} onClick={() => toggle(exp._id)}>
              <div className="logo-cell-header">
                <span className="logo-cell-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="logo-wordmark" style={typoStyle(companyNameTypography)}>
                  {exp.companyLogo ? (
                    <Image src={urlFor(exp.companyLogo).width(120).url()} alt={exp.companyName} width={60} height={32} style={{ objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.5 }} />
                  ) : exp.companyName}
                </span>
                <span className="logo-cell-role" style={typoStyle(roleTypography)}>
                  {exp.role}{exp.dateRange ? ` · ${exp.dateRange}` : ""}
                </span>
                <div className="logo-cell-toggle">+</div>
              </div>
              <div className="logo-cell-body">
                <div className="logo-cell-body-inner">
                  <div className="logo-cell-body-content">
                    <div />
                    <div className="body-desc" style={typoStyle(descriptionTypography)}>
                      {exp.description}
                      {exp.tags && exp.tags.length > 0 && (
                        <div className="body-tags">
                          {exp.tags.map(tag => <span key={tag} className="body-tag" style={typoStyle(tagTypography)}>{tag}</span>)}
                        </div>
                      )}
                    </div>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <div className="body-responsibilities">
                        <h4>Role &amp; Responsibilities</h4>
                        <ul>{exp.responsibilities.map((r, j) => <li key={j}>{r}</li>)}</ul>
                      </div>
                    )}
                    <div />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
