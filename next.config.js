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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.sanity.io https://*.sanity-cdn.com",
              // Styles from self, inline (for <style> tags), and Google Fonts
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.sanity.io",
              // Fonts from Google Fonts CDN and Sanity CDN
              "font-src 'self' https://fonts.gstatic.com https://*.sanity.io",
              // Images from self, data URIs, all Sanity subdomains, and blob:
              "img-src 'self' data: blob: https://*.sanity.io",
              // API connections: self, all Sanity subdomains (Studio uses project-specific subdomains
              // like av2iyu19.api.sanity.io), blob: for asset handling
              "connect-src 'self' blob: https://*.sanity.io wss://*.sanity.io https://fonts.googleapis.com https://fonts.gstatic.com",
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
