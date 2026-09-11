import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Calendar, ArrowRight } from "lucide-react";
import { getAllBlogPosts } from "@/lib/mdx";

export const metadata = {
  title: "Engineering Blog & Stories | Dhinesh Karthick D",
  description: "Behind-the-scenes stories, design decisions, and narratives from projects and internships.",
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="max-w-4xl mx-auto px-6 py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity mb-10"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-semibold tracking-tight mb-3">Engineering Stories</h1>
        <p className="text-base opacity-70">
          First-person narratives, hardware debugging stories, and behind-the-scenes reflections from projects and industry internships.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center flex flex-col items-center justify-center">
          <div className="p-3 rounded-full bg-white/10 mb-4">
            <BookOpen size={28} className="opacity-80" />
          </div>
          <h2 className="text-xl font-medium mb-2">Stories Coming Soon</h2>
          <p className="text-sm opacity-60 max-w-md">
            New articles are being written. Check back shortly!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block chip-card chip-corner-markers p-6"
            >
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="smd-pill bg-emerald-500/10 text-emerald-400 border-emerald-500/20 uppercase tracking-wider">
                  {post.type === "experience" ? "Internship" : "Project"}
                </span>
                <div className="flex items-center gap-3 text-xs opacity-50 font-mono">
                  {post.readingTime && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readingTime}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                </div>
              </div>

              <h2 className="text-xl font-medium mb-2 group-hover:text-emerald-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm opacity-70 leading-relaxed mb-4">{post.summary}</p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs bg-white/5 border border-white/10 opacity-60 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-medium opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-transform">
                  Read story <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
