// app/blog/page.tsx
// Rule #10: blog scaffolded but gated behind blogEnabled in siteSettings
import { notFound } from "next/navigation";
import { fetchSiteSettings, fetchBlogPosts } from "@/sanity/sanity.queries";
import { urlFor } from "@/sanity/sanity.image";
import Image from "next/image";

export const revalidate = 60;

export default async function BlogPage() {
  const settings = await fetchSiteSettings();

  // When blogEnabled is false (or not set), return 404
  if (!settings?.blogEnabled) {
    notFound();
  }

  const posts = await fetchBlogPosts();

  return (
    <main
      className="min-h-screen py-24 px-6"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-white mb-16"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            lineHeight: 1,
          }}
        >
          JOURNAL
        </h1>

        {posts.length === 0 ? (
          <p className="text-white/30">No posts published yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post: any) => (
              <article
                key={post._id}
                className="border border-white/10 hover:border-[var(--color-accent)] transition-colors group"
              >
                {post.coverImage && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={urlFor(post.coverImage).width(600).url()}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  {post.publishedAt && (
                    <p className="text-white/30 text-xs tracking-widest uppercase mb-2 font-mono">
                      {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  <h2 className="text-white text-xl font-bold mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                    {post.title}
                  </h2>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 border border-white/10 text-white/40 tracking-wider uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
