import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { ArrowLeft, Clock, Calendar, ArrowUpRight, Users } from "lucide-react";
import Link from "next/link";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getBlogPostBySlug(slug);
  } catch (err) {
    console.error(`Failed to load blog post "${slug}":`, err);
    notFound();
  }

  const { frontmatter, content } = post!;

  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity mb-10"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <div className="mb-4 flex items-center gap-3">
        <span className="text-xs px-3 py-1 rounded-full bg-white/10 uppercase tracking-wider font-mono opacity-80">
          {frontmatter.type === "experience" ? "Internship Narrative" : "Project Story"}
        </span>
        {frontmatter.readingTime && (
          <span className="text-xs opacity-50 flex items-center gap-1 font-mono">
            <Clock size={12} />
            {frontmatter.readingTime}
          </span>
        )}
      </div>

      <h1 className="text-4xl font-semibold tracking-tight mb-4 leading-tight">
        {frontmatter.title}
      </h1>

      <div className="flex items-center gap-4 text-xs opacity-50 mb-6 font-mono">
        <span className="flex items-center gap-1.5">
          <Calendar size={13} />
          {frontmatter.date}
        </span>
      </div>

      {frontmatter.team && frontmatter.team.length > 0 && (
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mb-8 bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 w-fit">
          <Users size={14} className="text-cyan-400 shrink-0" />
          <span className="opacity-60">Team:</span>
          <span className="opacity-90">{frontmatter.team.join(", ")}</span>
        </div>
      )}

      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs bg-white/5 border border-white/10 opacity-70 font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {frontmatter.type === "project" && frontmatter.relatedSlug && (
        <div className="mb-10 p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between">
          <span className="text-xs opacity-70">Looking for schematic, architecture, and code specs?</span>
          <Link
            href={`/projects/${frontmatter.relatedSlug}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 hover:underline"
          >
            Technical Spec Sheet
            <ArrowUpRight size={13} />
          </Link>
        </div>
      )}

      <article className="prose-invert">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [rehypeKatex],
            },
          }}
        />
      </article>

      <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        {frontmatter.type === "project" && frontmatter.relatedSlug ? (
          <Link
            href={`/projects/${frontmatter.relatedSlug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity"
          >
            View Project Specs
            <ArrowUpRight size={15} />
          </Link>
        ) : (
          <Link
            href="/#experience"
            className="inline-flex items-center gap-1.5 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity"
          >
            View Experience Timeline
            <ArrowUpRight size={15} />
          </Link>
        )}
      </div>
    </main>
  );
}
