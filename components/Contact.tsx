"use client";
// components/Contact.tsx
import { typoStyle, TypographyBlock } from "@/lib/typography";

type Props = {
  tagline?: string; headline?: string; statusText?: string;
  descriptionText?: string; ctaLabel?: string; email?: string;
  locationText?: string; coordinates?: string; availableForWork?: boolean;
  coordBarLeft?: string; coordBarCenter?: string; coordBarRight?: string;
  taglineTypography?: TypographyBlock; headlineTypography?: TypographyBlock;
  descriptionTypography?: TypographyBlock; formLabelTypography?: TypographyBlock;
  ctaTypography?: TypographyBlock;
};

export default function Contact({
  tagline = "let's make something", headline = "UNFORGETTABLE",
  statusText = "Channel Open — Ready to Receive",
  email = "hello@jensdemyer.be",
  locationText = "WETTEREN, BE", coordinates = "51.2194° N",
  descriptionText = "Based in Belgium. Working globally. Graphic design, motion, UI/UX, AI-assisted workflows — and everything in between.",
  ctaLabel = "INITIATE TRANSMISSION",
  coordBarLeft = "© 2025 JENS DE MEYER",
  coordBarCenter = "CROSSMEDIA DESIGNER · BELGIUM",
  coordBarRight = "SIGNAL STRENGTH ████████░░ 80%",
  availableForWork = true,
  taglineTypography, headlineTypography, descriptionTypography,
  formLabelTypography, ctaTypography,
}: Props) {
  return (
    <>
      <style>{`
        @keyframes radarPulse{0%{transform:scale(0.3);opacity:0.6}100%{transform:scale(1.2);opacity:0}}
        @keyframes signalBlink{0%,100%{opacity:1;box-shadow:0 0 12px rgba(255,119,0,0.8)}50%{opacity:0.3;box-shadow:0 0 4px rgba(255,119,0,0.3)}}
        #contact{position:relative;padding:160px 0 0;overflow:hidden;background:var(--bg,#0C0C0C)}
        .contact-radar{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:900px;height:900px;pointer-events:none;z-index:0}
        .contact-radar-ring{position:absolute;inset:0;border-radius:50%;border:1px solid rgba(255,119,0,0.06);animation:radarPulse 4s ease-out infinite}
        .contact-radar-ring:nth-child(2){animation-delay:1.33s}.contact-radar-ring:nth-child(3){animation-delay:2.66s}
        .contact-crosshair{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:1px;height:60%;background:linear-gradient(to bottom,transparent,rgba(255,119,0,0.08),transparent);pointer-events:none;z-index:0}
        .contact-crosshair.h{width:80%;height:1px;background:linear-gradient(to right,transparent,rgba(255,119,0,0.08),transparent)}
        .contact-inner{position:relative;z-index:2}
        .contact-status-bar{display:flex;align-items:center;justify-content:space-between;padding:0 60px 60px;border-bottom:1px solid rgba(255,255,255,0.05);margin-bottom:80px}
        .contact-status-left{display:flex;align-items:center;gap:12px}
        .contact-signal-dot{width:8px;height:8px;border-radius:50%;background:var(--orange,#FF7700);box-shadow:0 0 12px rgba(255,119,0,0.8);animation:signalBlink 1.4s ease-in-out infinite}
        .contact-status-text{font-family:var(--font-body);font-size:11px;letter-spacing:0.35em;color:rgba(255,255,255,0.3);text-transform:uppercase}
        .contact-status-right{font-family:var(--font-body);font-size:11px;letter-spacing:0.2em;color:rgba(255,255,255,0.15);font-weight:300}
        .contact-headline{text-align:center;padding:0 40px;margin-bottom:80px}
        .contact-hl-top{display:block;font-family:var(--font-serif);font-style:italic;font-weight:300;font-size:clamp(36px,6vw,80px);color:rgba(255,255,255,0.35);letter-spacing:0.04em;line-height:1;margin-bottom:8px}
        .contact-hl-main{display:block;font-family:var(--font-display);font-size:clamp(60px,11vw,160px);letter-spacing:0.06em;line-height:0.9;color:var(--white,#fff)}
        .contact-hl-ghost{display:block;font-family:var(--font-display);font-size:clamp(60px,11vw,160px);letter-spacing:0.06em;line-height:0.9;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,0.07);margin-top:-0.15em;pointer-events:none}
        .contact-form-area{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid rgba(255,255,255,0.05)}
        .contact-form-left{padding:60px;border-right:1px solid rgba(255,255,255,0.05);display:flex;flex-direction:column}
        .contact-field{display:flex;flex-direction:column;border-bottom:1px solid rgba(255,255,255,0.05);padding:28px 0}
        .contact-field:first-child{padding-top:0}.contact-field:last-child{border-bottom:none}
        .contact-field label{font-family:var(--font-body);font-size:10px;letter-spacing:0.4em;color:var(--orange,#FF7700);text-transform:uppercase;margin-bottom:12px}
        .contact-field input,.contact-field textarea{background:none;border:none;outline:none;font-family:var(--font-body);font-weight:300;font-size:16px;color:rgba(255,255,255,0.8);letter-spacing:0.03em;resize:none;caret-color:var(--orange,#FF7700)}
        .contact-field input::placeholder,.contact-field textarea::placeholder{color:rgba(255,255,255,0.15)}
        .contact-field textarea{min-height:80px}
        .contact-form-right{padding:60px;display:flex;flex-direction:column;justify-content:space-between}
        .contact-direct{margin-bottom:48px}
        .contact-direct-label{font-family:var(--font-body);font-size:10px;letter-spacing:0.4em;color:rgba(255,255,255,0.25);text-transform:uppercase;margin-bottom:16px}
        .contact-email{font-family:var(--font-display);font-size:clamp(18px,2.2vw,28px);letter-spacing:0.08em;color:var(--white,#fff);text-decoration:none;display:inline-block;position:relative;transition:color 0.25s}
        .contact-email::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:1px;background:var(--orange,#FF7700);transform:scaleX(0);transform-origin:left;transition:transform 0.35s cubic-bezier(0.16,1,0.3,1)}
        .contact-email:hover{color:var(--orange,#FF7700)}.contact-email:hover::after{transform:scaleX(1)}
        .contact-avail{display:flex;align-items:center;gap:10px;margin-bottom:40px}
        .contact-avail-dot{width:7px;height:7px;border-radius:50%;background:#4ade80;box-shadow:0 0 8px rgba(74,222,128,0.7)}
        .contact-avail-text{font-family:var(--font-body);font-size:12px;letter-spacing:0.2em;color:rgba(255,255,255,0.35);text-transform:uppercase}
        .contact-send-btn{display:inline-flex;align-items:center;gap:16px;background:none;border:1px solid rgba(255,255,255,0.15);padding:20px 32px;cursor:pointer;transition:border-color 0.25s;text-decoration:none;position:relative;overflow:hidden}
        .contact-send-btn::before{content:'';position:absolute;inset:0;background:var(--orange,#FF7700);transform:translateX(-101%);transition:transform 0.4s cubic-bezier(0.16,1,0.3,1)}
        .contact-send-btn:hover::before{transform:translateX(0)}.contact-send-btn:hover{border-color:var(--orange,#FF7700)}
        .contact-send-btn span,.contact-send-btn svg{position:relative;z-index:1;transition:color 0.25s}
        .contact-send-label{font-family:var(--font-display);font-size:16px;letter-spacing:0.2em;color:var(--white,#fff)}
        .contact-send-btn svg{width:16px;height:16px;color:var(--white,#fff);flex-shrink:0}
        .contact-coord-bar{display:flex;align-items:center;justify-content:space-between;padding:24px 60px;border-top:1px solid rgba(255,255,255,0.05)}
        .contact-coord{font-family:var(--font-body);font-size:10px;letter-spacing:0.25em;color:rgba(255,255,255,0.12);font-weight:300}
        footer{border-top:1px solid rgba(255,255,255,0.06);padding:32px 60px;display:flex;align-items:center;justify-content:space-between}
        .foot-logo{font-family:var(--font-display);font-size:16px;letter-spacing:0.14em;color:rgba(255,255,255,0.28)}
        .foot-copy{font-family:var(--font-body);font-size:12px;letter-spacing:0.12em;color:rgba(255,255,255,0.16)}
        @media(max-width:860px){.contact-form-area{grid-template-columns:1fr}.contact-status-bar{padding:0 24px 40px}.contact-form-left,.contact-form-right{padding:40px 24px}.contact-coord-bar{padding:20px 24px}footer{padding:28px 24px;flex-direction:column;gap:16px;text-align:center}}
      `}</style>
      <section id="contact">
        <div className="contact-radar" aria-hidden="true">
          <div className="contact-radar-ring" /><div className="contact-radar-ring" /><div className="contact-radar-ring" />
        </div>
        <div className="contact-crosshair" aria-hidden="true" />
        <div className="contact-crosshair h" aria-hidden="true" />

        <div className="contact-inner">
          <div className="contact-status-bar">
            <div className="contact-status-left">
              <div className="contact-signal-dot" />
              <span className="contact-status-text">{statusText}</span>
            </div>
            <span className="contact-status-right">{coordinates} &nbsp;·&nbsp; 3.9403° E &nbsp;·&nbsp; {locationText}</span>
          </div>

          <div className="contact-headline">
            <span className="contact-hl-top" style={typoStyle(taglineTypography)}>{tagline}</span>
            <span className="contact-hl-main" style={typoStyle(headlineTypography)}>{headline}</span>
            <span className="contact-hl-ghost" style={{ fontSize: typoStyle(headlineTypography).fontSize, letterSpacing: typoStyle(headlineTypography).letterSpacing }}>{headline}</span>
          </div>

          <div className="contact-form-area">
            <div className="contact-form-left">
              {[
                { label: "Your Name", type: "text", placeholder: "Jens De Meyer" },
                { label: "Your Email", type: "email", placeholder: "hello@studio.be" },
              ].map(f => (
                <div className="contact-field" key={f.label}>
                  <label style={typoStyle(formLabelTypography)}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} />
                </div>
              ))}
              <div className="contact-field">
                <label style={typoStyle(formLabelTypography)}>What are we making?</label>
                <textarea placeholder="Tell me about your project, idea, or just say hello..." />
              </div>
            </div>

            <div className="contact-form-right">
              <div>
                <div className="contact-direct">
                  <div className="contact-direct-label">Direct Line</div>
                  <a href={`mailto:${email}`} className="contact-email">{email?.toUpperCase()}</a>
                </div>
                {availableForWork && (
                  <div className="contact-avail">
                    <div className="contact-avail-dot" />
                    <span className="contact-avail-text">Available for new projects</span>
                  </div>
                )}
                <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: 13, lineHeight: 1.9, color: "rgba(255,255,255,0.28)", maxWidth: 280, ...typoStyle(descriptionTypography) }}>
                  {descriptionText}
                </p>
              </div>
              <a href={`mailto:${email}`} className="contact-send-btn">
                <span className="contact-send-label" style={typoStyle(ctaTypography)}>{ctaLabel}</span>
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M2 14L14 2M14 2H6M14 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="contact-coord-bar">
            <span className="contact-coord">{coordBarLeft}</span>
            <span className="contact-coord">{coordBarCenter}</span>
            <span className="contact-coord">{coordBarRight}</span>
          </div>
        </div>
      </section>
      <footer>
        <span className="foot-logo">JENS DE MEYER</span>
        <span className="foot-copy">© 2025</span>
      </footer>
    </>
  );
}
