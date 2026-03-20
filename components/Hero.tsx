"use client";
// components/Hero.tsx
import { useEffect, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/sanity.image";
import { typoStyle, TypographyBlock } from "@/lib/typography";

type Project = { _id: string; title: string; coverImage: any; category?: string };

type CarouselProps = {
  projects?: Project[];
  scrollSpeed?: string;
  rotation?: { rotateX?: number; rotateY?: number; rotateZ?: number };
  position?: { topOffset?: number; startX?: number; sectionHeight?: number };
  perspective?: { depth?: number; originX?: number; originY?: number };
  cardSize?: { width?: number; height?: number; gap?: number; borderRadius?: number };
  cardTitleTypography?: TypographyBlock;
  cardCategoryTypography?: TypographyBlock;
};

type HeroProps = {
  headlineTop?: string;
  headlineBottom?: string;
  projects?: Project[];
  topLineTypography?: TypographyBlock;
  bottomLineTypography?: TypographyBlock;
};

// ── Carousel — exported separately so it can be used as its own page section ──
export function CarouselSection({
  projects = [],
  scrollSpeed = "medium",
  rotation,
  position,
  perspective: persp,
  cardSize,
  cardTitleTypography,
  cardCategoryTypography,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const SPEED_MAP: Record<string, number> = { off: 0, slow: 0.3, medium: 0.6, fast: 1.2 };

  // Resolve all values with fallback defaults
  const rX            = rotation?.rotateX       ?? 22;
  const rY            = rotation?.rotateY       ?? -22;
  const rZ            = rotation?.rotateZ       ?? 0;
  const topOffset     = position?.topOffset     ?? 575;
  const startX        = position?.startX        ?? -280;
  const sectionHeight = position?.sectionHeight ?? 1100;
  const depth         = persp?.depth            ?? 1200;
  const originX       = persp?.originX          ?? 60;
  const originY       = persp?.originY          ?? 100;
  const cardW         = cardSize?.width         ?? 351;
  const cardH         = cardSize?.height        ?? 527;
  const cardGap       = cardSize?.gap           ?? 24;
  const cardRadius    = cardSize?.borderRadius  ?? 16;

  const BASE = `rotateX(${rX}deg) rotateY(${rY}deg)${rZ !== 0 ? ` rotateZ(${rZ}deg)` : ""}`;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Clone cards for seamless infinite loop
    const origCards = Array.from(track.children) as HTMLElement[];
    origCards.forEach(card => {
      const clone = card.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      clone.style.animation = "none";
      clone.style.opacity = "1";
      clone.style.clipPath = "none";
      track.appendChild(clone);
    });
    track.style.animation = "none";

    const SPEED = SPEED_MAP[scrollSpeed] ?? 0.6;
    const FRICTION = 0.88;
    let x = startX, halfW = 0;
    let dragging = false, pointerStartX = 0, xAtDragStart = 0;
    let vx = 0, lastPointerX = 0, isCoasting = false, rafId: number;

    function measure() { halfW = track.scrollWidth / 2; }
    function applyX() {
      if (halfW > 0) { x = ((x % -halfW) - halfW) % -halfW; if (x > 0) x -= halfW; }
      track.style.transform = `${BASE} translateX(${x}px)`;
    }
    function loop() {
      if (!dragging && !isCoasting && SPEED > 0) x -= SPEED;
      else if (isCoasting) {
        vx *= FRICTION; x += vx;
        if (Math.abs(vx) < 0.15) { isCoasting = false; vx = 0; }
      }
      applyX();
      rafId = requestAnimationFrame(loop);
    }
    requestAnimationFrame(() => { measure(); requestAnimationFrame(loop); });
    window.addEventListener("resize", measure);

    function onStart(cx: number) { dragging = true; isCoasting = false; vx = 0; pointerStartX = cx; xAtDragStart = x; lastPointerX = cx; track.style.cursor = "grabbing"; document.body.style.userSelect = "none"; }
    function onMove(cx: number) { if (!dragging) return; vx = cx - lastPointerX; lastPointerX = cx; x = xAtDragStart + (cx - pointerStartX); }
    function onEnd() { if (!dragging) return; dragging = false; isCoasting = true; track.style.cursor = "grab"; document.body.style.userSelect = ""; }

    track.addEventListener("mousedown", e => { e.preventDefault(); onStart(e.clientX); });
    document.addEventListener("mousemove", e => onMove(e.clientX));
    document.addEventListener("mouseup", onEnd);
    track.addEventListener("touchstart", e => onStart(e.touches[0].clientX), { passive: true });
    track.addEventListener("touchmove", e => onMove(e.touches[0].clientX), { passive: true });
    track.addEventListener("touchend", onEnd);
    track.addEventListener("touchcancel", onEnd);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measure);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, scrollSpeed, rX, rY, rZ, startX]);

  const placeholders = [
    { num: "01", title: "PROJECT ONE",   cat: "Graphic Design"  },
    { num: "02", title: "PROJECT TWO",   cat: "Motion Design"   },
    { num: "03", title: "PROJECT THREE", cat: "UI/UX"           },
    { num: "04", title: "PROJECT FOUR",  cat: "Brand Identity"  },
    { num: "05", title: "PROJECT FIVE",  cat: "AI Assisted"     },
    { num: "06", title: "PROJECT SIX",   cat: "Editing"         },
  ];

  return (
    <>
      <style>{`
        @keyframes cardEmerge {
          0%   { opacity:0; filter:brightness(0) contrast(1.05); }
          30%  { opacity:1; filter:brightness(0.15) contrast(1.05); }
          100% { opacity:1; filter:brightness(0.82) contrast(1.05); }
        }
        .carousel-track { display:flex; width:max-content; cursor:grab; padding:0 0 0 40px; position:absolute; left:0; transform-style:preserve-3d; transform-origin:top left; will-change:transform; }
        .carousel-track:active { cursor:grabbing; }
        .project-card { flex-shrink:0; overflow:hidden; position:relative; background:#CCCCCC; transition:transform 0.4s ease,box-shadow 0.4s ease,filter 0.4s ease; user-select:none; box-shadow:-6px 20px 40px rgba(0,0,0,0.65),-2px 4px 10px rgba(0,0,0,0.4); filter:brightness(0.82) contrast(1.05); animation:cardEmerge 2.4s cubic-bezier(0.25,0.1,0.1,1) both; }
        .project-card:nth-child(1){animation-delay:0.3s} .project-card:nth-child(2){animation-delay:0.55s} .project-card:nth-child(3){animation-delay:0.8s} .project-card:nth-child(4){animation-delay:1.05s} .project-card:nth-child(5){animation-delay:1.3s} .project-card:nth-child(6){animation-delay:1.55s}
        .project-card:hover { transform:translateY(-18px) translateZ(30px) scale(1.05) !important; box-shadow:0 40px 80px rgba(0,0,0,0.75),0 8px 20px rgba(0,0,0,0.5); filter:brightness(1.08) contrast(1); z-index:20; }
        .project-card img { width:100%; height:100%; object-fit:cover; display:block; }
        .card-placeholder { width:100%; height:100%; background:#CBCBCB; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; }
        .card-num { font-family:var(--font-display); font-size:56px; color:rgba(0,0,0,0.10); letter-spacing:0.08em; }
        .card-label { font-family:var(--font-body); font-size:10px; letter-spacing:0.3em; color:rgba(0,0,0,0.22); text-transform:uppercase; }
        .card-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 55%); opacity:0; transition:opacity 0.3s; display:flex; flex-direction:column; justify-content:flex-end; padding:26px; }
        .project-card:hover .card-overlay { opacity:1; }
        .card-overlay h3 { font-family:var(--font-display); font-size:22px; letter-spacing:0.1em; color:#fff; margin-bottom:4px; }
        .card-overlay p  { font-family:var(--font-body); font-size:11px; letter-spacing:0.22em; color:rgba(255,255,255,0.5); text-transform:uppercase; }
      `}</style>

      <section style={{
        position: "relative",
        width: "100%",
        height: `${sectionHeight}px`,
        overflow: "visible",
        zIndex: 2,
        background: "var(--bg,#0C0C0C)",
        perspective: `${depth}px`,
        perspectiveOrigin: `${originX}% ${originY}%`,
      }}>
        <div
          className="carousel-track"
          ref={trackRef}
          style={{
            top: `${topOffset}px`,
            gap: `${cardGap}px`,
            transform: `${BASE} translateX(${startX}px)`,
          }}
        >
          {(projects.length > 0 ? projects : placeholders).map((p: any) => (
            <div
              key={p._id || p.num}
              className="project-card"
              style={{ width: cardW, height: cardH, borderRadius: cardRadius }}
            >
              {p.coverImage ? (
                <Image
                  src={urlFor(p.coverImage).width(700).url()}
                  alt={p.title}
                  width={cardW}
                  height={cardH}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div className="card-placeholder">
                  <span className="card-num">{p.num ?? "??"}</span>
                  <span className="card-label">{p._id ? "No Image" : "Add Image"}</span>
                </div>
              )}
              <div className="card-overlay">
                <h3 style={typoStyle(cardTitleTypography)}>{p.title}</h3>
                <p style={typoStyle(cardCategoryTypography)}>{p.category || p.cat}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ── Hero title section ────────────────────────────────────────────────────────
export default function Hero({
  headlineTop = "CROSSMEDIA",
  headlineBottom = "Designer",
  projects = [],
  topLineTypography,
  bottomLineTypography,
}: HeroProps) {
  return (
    <>
      <style>{`
        @keyframes lineUp { from{transform:translateY(110%);opacity:0} to{transform:translateY(0);opacity:1} }
        .hero-title-block { text-align:center; padding:80px 24px 60px; position:relative; z-index:1; pointer-events:none; }
        .title-line { display:block; overflow:hidden; }
        .hero-title-top    { display:block; font-family:var(--font-display); font-size:clamp(34px,4.9vw,62px); letter-spacing:0.14em; color:rgba(255,255,255,0.88); line-height:1; animation:lineUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .hero-title-bottom { display:block; font-family:var(--font-serif); font-style:italic; font-weight:700; font-size:clamp(34px,4.9vw,62px); letter-spacing:0.04em; color:rgba(255,255,255,0.88); line-height:1.05; animation:lineUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.28s both; }
      `}</style>
      <section id="home" style={{ position: "relative", paddingTop: 84, overflow: "visible", background: "var(--bg,#0C0C0C)" }}>
        <div className="hero-title-block">
          <div className="title-line">
            <span className="hero-title-top" style={typoStyle(topLineTypography)}>{headlineTop}</span>
          </div>
          <div className="title-line">
            <span className="hero-title-bottom" style={typoStyle(bottomLineTypography)}>{headlineBottom}</span>
          </div>
        </div>
      </section>
      <CarouselSection projects={projects} />
    </>
  );
}
