"use client";
// components/Hero.tsx — matches original exactly
import { useEffect, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/sanity.image";

type Project = {
  _id: string;
  title: string;
  coverImage: any;
  category?: string;
};

type HeroProps = {
  headlineTop?: string;
  headlineBottom?: string;
  projects?: Project[];
};

export default function Hero({
  headlineTop = "CROSSMEDIA",
  headlineBottom = "Designer",
  projects = [],
}: HeroProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Clone cards for seamless loop
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

    const BASE = "rotateX(22deg) rotateY(-22deg)";
    const SPEED = 0.6;
    const FRICTION = 0.88;

    let x = -280;
    let halfW = 0;
    let dragging = false;
    let pointerStartX = 0;
    let xAtDragStart = 0;
    let vx = 0;
    let lastPointerX = 0;
    let isCoasting = false;
    let rafId: number;

    function measure() { halfW = track.scrollWidth / 2; }

    function applyX() {
      if (halfW > 0) {
        x = ((x % -halfW) - halfW) % -halfW;
        if (x > 0) x -= halfW;
      }
      track.style.transform = `${BASE} translateX(${x}px)`;
    }

    function loop() {
      if (!dragging && !isCoasting) {
        x -= SPEED;
      } else if (isCoasting) {
        vx *= FRICTION;
        x += vx;
        if (Math.abs(vx) < 0.15) { isCoasting = false; vx = 0; }
      }
      applyX();
      rafId = requestAnimationFrame(loop);
    }

    requestAnimationFrame(() => { measure(); requestAnimationFrame(loop); });
    window.addEventListener("resize", measure);

    function onStart(clientX: number) {
      dragging = true; isCoasting = false; vx = 0;
      pointerStartX = clientX; xAtDragStart = x;
      lastPointerX = clientX; track.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    }
    function onMove(clientX: number) {
      if (!dragging) return;
      vx = clientX - lastPointerX;
      lastPointerX = clientX;
      x = xAtDragStart + (clientX - pointerStartX);
    }
    function onEnd() {
      if (!dragging) return;
      dragging = false; isCoasting = true;
      track.style.cursor = "grab";
      document.body.style.userSelect = "";
    }

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
      document.removeEventListener("mousemove", e => onMove(e.clientX));
      document.removeEventListener("mouseup", onEnd);
    };
  }, [projects]);

  // Fallback placeholder cards if no projects yet
  const placeholders = [
    { num: "01", label: "Add Image", title: "PROJECT ONE", cat: "Graphic Design" },
    { num: "02", label: "Add Image", title: "PROJECT TWO", cat: "Motion Design" },
    { num: "03", label: "Add Image", title: "PROJECT THREE", cat: "UI/UX" },
    { num: "04", label: "Add Image", title: "PROJECT FOUR", cat: "Brand Identity" },
    { num: "05", label: "Add Image", title: "PROJECT FIVE", cat: "AI Assisted" },
    { num: "06", label: "Add Image", title: "PROJECT SIX", cat: "Editing" },
  ];

  return (
    <>
      <style>{`
        @keyframes lineUp { from { transform:translateY(110%); opacity:0; } to { transform:translateY(0); opacity:1; } }
        @keyframes cardEmerge { 0% { opacity:0; filter:brightness(0) contrast(1.05); } 30% { opacity:1; filter:brightness(0.15) contrast(1.05); } 100% { opacity:1; filter:brightness(0.82) contrast(1.05); } }
        .hero-title-block { text-align:center; padding:80px 24px 60px; position:relative; z-index:1; pointer-events:none; }
        .title-line { display:block; overflow:hidden; }
        .hero-title-top { display:block; font-family:var(--font-display); font-size:clamp(34px,4.9vw,62px); letter-spacing:0.14em; color:rgba(255,255,255,0.88); line-height:1; animation:lineUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .hero-title-bottom { display:block; font-family:var(--font-serif); font-style:italic; font-weight:700; font-size:clamp(34px,4.9vw,62px); letter-spacing:0.04em; color:rgba(255,255,255,0.88); line-height:1.05; animation:lineUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.28s both; }
        .carousel-section { position:relative; width:100%; height:1100px; overflow:visible; z-index:2; background:var(--bg,#0C0C0C); perspective:1200px; perspective-origin:60% 100%; }
        .carousel-track { display:flex; gap:24px; width:max-content; cursor:grab; padding:0 0 0 40px; position:absolute; top:575px; left:0; transform:rotateX(22deg) rotateY(-22deg) translateX(-280px); transform-style:preserve-3d; transform-origin:top left; will-change:transform; }
        .carousel-track:active { cursor:grabbing; }
        .project-card { width:351px; height:527px; border-radius:16px; background:#CCCCCC; flex-shrink:0; overflow:hidden; position:relative; transition:transform 0.4s ease,box-shadow 0.4s ease,filter 0.4s ease; user-select:none; box-shadow:-6px 20px 40px rgba(0,0,0,0.65),-2px 4px 10px rgba(0,0,0,0.4); filter:brightness(0.82) contrast(1.05); animation:cardEmerge 2.4s cubic-bezier(0.25,0.1,0.1,1) both; }
        .project-card:nth-child(1){animation-delay:0.3s}.project-card:nth-child(2){animation-delay:0.55s}.project-card:nth-child(3){animation-delay:0.8s}.project-card:nth-child(4){animation-delay:1.05s}.project-card:nth-child(5){animation-delay:1.3s}.project-card:nth-child(6){animation-delay:1.55s}
        .project-card:hover { transform:translateY(-18px) translateZ(30px) scale(1.05) !important; box-shadow:0 40px 80px rgba(0,0,0,0.75),0 8px 20px rgba(0,0,0,0.5); filter:brightness(1.08) contrast(1); z-index:20; }
        .project-card img { width:100%; height:100%; object-fit:cover; display:block; }
        .card-placeholder { width:100%; height:100%; background:#CBCBCB; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; }
        .card-num { font-family:var(--font-display); font-size:56px; color:rgba(0,0,0,0.10); letter-spacing:0.08em; }
        .card-label { font-family:var(--font-body); font-size:10px; letter-spacing:0.3em; color:rgba(0,0,0,0.22); text-transform:uppercase; }
        .card-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 55%); opacity:0; transition:opacity 0.3s; display:flex; flex-direction:column; justify-content:flex-end; padding:26px; }
        .project-card:hover .card-overlay { opacity:1; }
        .card-overlay h3 { font-family:var(--font-display); font-size:22px; letter-spacing:0.1em; color:#fff; margin-bottom:4px; }
        .card-overlay p { font-family:var(--font-body); font-size:11px; letter-spacing:0.22em; color:rgba(255,255,255,0.5); text-transform:uppercase; }
      `}</style>

      {/* Hero title */}
      <section id="home" style={{ position: "relative", paddingTop: 84, overflow: "visible", background: "var(--bg,#0C0C0C)" }}>
        <div className="hero-title-block">
          <div className="title-line"><span className="hero-title-top">{headlineTop}</span></div>
          <div className="title-line"><span className="hero-title-bottom">{headlineBottom}</span></div>
        </div>
      </section>

      {/* Carousel */}
      <section className="carousel-section">
        <div className="carousel-track" id="carouselTrack" ref={trackRef}>
          {projects.length > 0 ? projects.map((p) => (
            <div className="project-card" key={p._id}>
              {p.coverImage ? (
                <Image src={urlFor(p.coverImage).width(700).url()} alt={p.title} width={351} height={527} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div className="card-placeholder">
                  <span className="card-num">??</span>
                  <span className="card-label">No Image</span>
                </div>
              )}
              <div className="card-overlay">
                <h3>{p.title}</h3>
                <p>{p.category}</p>
              </div>
            </div>
          )) : placeholders.map((p) => (
            <div className="project-card" key={p.num}>
              <div className="card-placeholder">
                <span className="card-num">{p.num}</span>
                <span className="card-label">{p.label}</span>
              </div>
              <div className="card-overlay"><h3>{p.title}</h3><p>{p.cat}</p></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
