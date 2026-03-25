/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // ── Content Security Policy ──────────────────────────────────────
          {
            key: "Content-Security-Policy",
            value: [
              // Only load scripts from self and Sanity CDN (studio)
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://core.sanity-cdn.com https://cdn.sanity.io",
              // Styles from self, inline (for <style> tags), and Google Fonts
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Fonts from Google Fonts CDN and Sanity CDN
              "font-src 'self' https://fonts.gstatic.com https://cdn.sanity.io",
              // Images from self, data URIs, Sanity CDN, and blob: for any canvas/image ops
              "img-src 'self' data: blob: https://cdn.sanity.io",
              // API connections: self, Sanity API, Google Fonts, blob: (GLTFLoader / texture unpacking)
              "connect-src 'self' blob: https://api.sanity.io https://cdn.sanity.io wss://*.sanity.io https://fonts.googleapis.com https://fonts.gstatic.com",
              // Frames: Sanity Studio embed needs same-origin
              "frame-src 'self'",
              // Default fallback
              "default-src 'self'",
            ].join("; "),
          },
          // ── Other security headers ───────────────────────────────────────
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
