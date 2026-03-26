"use client";
// components/Navbar.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { typoStyle, TypographyBlock } from "@/lib/typography";

type NavLink = { label: string; href: string };
type NavbarProps = {
  navLinks?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  logoTypography?: TypographyBlock & { textTransform?: string };
};

// ─────────────────────────────────────────────────────────
// WebGL liquid-glass canvas — animated fBm domain-warp
// creates organic shimmering refraction on the pill surface
// ─────────────────────────────────────────────────────────
const VERT = `
  attribute vec2 a_pos;
  varying vec2 v_uv;
  void main() {
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

const FRAG = `
  precision mediump float;
  uniform float u_t;
  varying vec2 v_uv;

  // Value noise with smooth interpolation
  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),           hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
      u.y
    );
  }

  // Fractal Brownian Motion — 5 octaves
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.1 + vec2(3.7, 1.9);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = v_uv;
    float t = u_t * 0.1;

    // Two-pass domain warp — creates liquid swirl
    float q1 = fbm(uv * 3.0 + t * 0.38);
    float q2 = fbm(uv * 3.0 + vec2(5.2, 1.3) + t * 0.31);
    float f  = fbm(uv * 2.0 + vec2(q1 * 0.9, q2 * 0.9) + t * 0.14);

    // Sheen intensity — smooth plateau
    float sheen = smoothstep(0.30, 0.88, f);

    // Iridescent tint — cool/warm/lavender shift over time
    float hue = fbm(uv * 1.4 + vec2(2.1, 8.7) + t * 0.05);
    vec3 cool   = vec3(0.80, 0.90, 1.00);  // ice-blue
    vec3 warm   = vec3(1.00, 0.97, 0.90);  // warm-white
    vec3 violet = vec3(0.88, 0.84, 1.00);  // soft lavender
    vec3 col = mix(mix(cool, warm, smoothstep(0.3, 0.7, hue)),
                   violet, smoothstep(0.65, 0.92, hue));

    // Pre-multiplied alpha blend
    float alpha = sheen * 0.18;
    gl_FragColor = vec4(col * alpha, alpha);
  }
`;

function compileSrc(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

function useLiquidGlass(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true });
    if (!gl) return;

    // Compile + link
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileSrc(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compileSrc(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_t");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr  = Math.min(window.devicePixelRatio, 2);
      canvas!.width  = rect.width  * dpr;
      canvas!.height = rect.height * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const start = performance.now();
    let raf: number;

    (function draw() {
      raf = requestAnimationFrame(draw);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    })();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []); // stable — canvasRef.current is set before paint
}

// ─────────────────────────────────────────────────────────
// Navbar component
// ─────────────────────────────────────────────────────────
export default function Navbar({
  navLinks = [
    { label: "HOME",     href: "#home" },
    { label: "GALLERY",  href: "#experience" },
    { label: "ABOUT ME", href: "#about" },
  ],
  ctaLabel = "GET IN TOUCH",
  ctaHref  = "#contact",
  logoTypography,
}: NavbarProps) {
  const [opacity, setOpacity] = useState(0);
  const rafRef    = useRef<number | null>(null);
  const glCanvas  = useRef<HTMLCanvasElement>(null);

  // Scroll fade-in logic
  useEffect(() => {
    const sentinel = document.getElementById("carousel-end-sentinel");
    if (!sentinel) { setOpacity(1); return; }

    function update() {
      const r   = sentinel!.getBoundingClientRect();
      const vh  = window.innerHeight;
      const raw = (vh * 0.5 - r.top) / (vh * 0.5);
      setOpacity(Math.min(1, Math.max(0, raw)));
    }
    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // WebGL liquid-glass shader
  useLiquidGlass(glCanvas);

  const isVisible = opacity > 0;

  const logoStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: 16,
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.92)",
    textDecoration: "none",
    position: "relative",
    zIndex: 2,
    ...typoStyle(logoTypography),
    ...(logoTypography?.textTransform
      ? { textTransform: logoTypography.textTransform as React.CSSProperties["textTransform"] }
      : {}),
  };

  return (
    <>
      <style>{`
        .nav-outer {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
        }

        /* Glass pill — single layer, clean */
        .nav-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 54px;
          padding: 0 8px 0 24px;
          border-radius: 100px;
          position: relative;
          overflow: hidden;
          isolation: isolate;

          /* Frosted glass base */
          backdrop-filter: blur(28px) saturate(160%);
          -webkit-backdrop-filter: blur(28px) saturate(160%);
          background: rgba(255, 255, 255, 0.07);

          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow:
            inset 0 1.5px 0 rgba(255, 255, 255, 0.45),
            inset 0 -1px 0 rgba(0, 0, 0, 0.14),
            0 0 0 1px rgba(255, 255, 255, 0.05),
            0 8px 40px rgba(0, 0, 0, 0.50),
            0 2px 8px rgba(0, 0, 0, 0.30);
        }

        /* WebGL liquid canvas — fills the pill, clipped by border-radius */
        .nav-gl {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          pointer-events: none;
          z-index: 1;
        }

        /* Top-edge specular hairline */
        .nav-pill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.60) 20%,
            rgba(255,255,255,0.60) 80%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 3;
        }

        /* ── Nav links ── */
        .nav-links {
          display: flex;
          list-style: none;
          gap: 2px;
          position: relative;
          z-index: 2;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.78);
          text-decoration: none;
          padding: 7px 20px;
          border-radius: 50px;
          letter-spacing: 0.10em;
          transition: color 0.18s, background 0.18s;
          display: block;
        }
        .nav-links a:hover {
          color: rgba(255, 255, 255, 0.98);
          background: rgba(255, 255, 255, 0.10);
        }

        /* ── CTA button ── */
        .nav-cta-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: 100px;
          text-decoration: none;
          position: relative;
          z-index: 2;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          background: linear-gradient(160deg, rgba(255,255,255,0.98) 0%, rgba(225,225,225,0.93) 100%);
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,1),
            inset 0 -1px 0 rgba(0,0,0,0.05),
            0 2px 14px rgba(0,0,0,0.22),
            0 1px 4px rgba(0,0,0,0.14);
          padding: 5px 6px 5px 18px;
        }
        .nav-cta-btn:hover {
          transform: scale(1.04);
          box-shadow:
            inset 0 1.5px 0 rgba(255,255,255,1),
            0 4px 24px rgba(0,0,0,0.32);
        }
        .nav-cta-btn span {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          color: #111;
          letter-spacing: 0.08em;
          white-space: nowrap;
        }

        /* ── Orange dot ── */
        .nav-dot {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          background: linear-gradient(145deg, #FF9200 0%, #FF3D00 100%);
          box-shadow:
            0 0 18px rgba(255,100,0,0.65),
            0 0 6px rgba(255,100,0,0.40),
            inset 0 1px 0 rgba(255,210,100,0.45);
        }

        @media (max-width: 860px) { .nav-links { display: none; } }
      `}</style>

      <nav
        aria-hidden={!isVisible}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 200,
          padding: "14px 32px",
          opacity,
          transform: `translateY(${(1 - opacity) * -10}px)`,
          pointerEvents: isVisible ? "auto" : "none",
          willChange: "opacity, transform",
          transition: "opacity 0.15s linear, transform 0.15s linear",
        }}
      >
        <div className="nav-outer">
          <div className="nav-pill">

            {/* WebGL liquid-glass surface */}
            <canvas ref={glCanvas} className="nav-gl" aria-hidden="true" />

            <a href="/" style={logoStyle}>JENS DE MEYER</a>

            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>

            <a href={ctaHref} className="nav-cta-btn">
              <span>{ctaLabel}</span>
              <div className="nav-dot">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 12L12 2M12 2H5M12 2V9"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>

          </div>
        </div>
      </nav>
    </>
  );
}
