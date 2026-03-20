// app/not-found.tsx
// BUG #4 FIX: standalone component — ZERO Sanity/CMS imports
// This prevents the /_not-found route from crashing during build
export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>404 — Page Not Found</title>
        <meta name="robots" content="noindex" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
              body {
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #0c0c0c;
                color: #ffffff;
                font-family: system-ui, -apple-system, sans-serif;
                padding: 2rem;
              }
              .container { text-align: center; max-width: 480px; }
              .code {
                font-size: clamp(5rem, 20vw, 10rem);
                font-weight: 900;
                line-height: 1;
                letter-spacing: -0.05em;
                color: transparent;
                -webkit-text-stroke: 2px #FF7700;
                margin-bottom: 1rem;
              }
              h1 { font-size: 1.25rem; color: rgba(255,255,255,0.6); margin-bottom: 0.5rem; }
              p { font-size: 0.875rem; color: rgba(255,255,255,0.3); margin-bottom: 2rem; }
              a {
                display: inline-block;
                padding: 0.75rem 2rem;
                border: 1px solid #FF7700;
                color: #FF7700;
                text-decoration: none;
                font-size: 0.75rem;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                transition: background 0.2s, color 0.2s;
              }
              a:hover { background: #FF7700; color: #0c0c0c; }
            `,
          }}
        />
      </head>
      <body>
        <div className="container">
          <div className="code">404</div>
          <h1>Page not found</h1>
          <p>
            This page doesn't exist — it may have been moved or the URL might be
            wrong.
          </p>
          <a href="/">← Back to portfolio</a>
        </div>
      </body>
    </html>
  );
}
