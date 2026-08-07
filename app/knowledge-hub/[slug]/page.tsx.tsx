import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article;
  try {
    article = getArticleBySlug(slug);
  } catch (err) {
    console.error(`Failed to load article "${slug}":`, err);
    notFound();
  }

  const { frontmatter, content } = article!;

  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <Link
        href="/knowledge-hub"
        className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity mb-10"
      >
        <ArrowLeft size={16} />
        Back to Knowledge Hub
      </Link>

      <h1 className="text-4xl font-semibold tracking-tight mb-3">{frontmatter.title}</h1>
      <p className="text-sm opacity-50 mb-12">{frontmatter.date}</p>

      <article>
        <MDXRemote source={content} components={mdxComponents} />
      </article>
    </main>
  );
}
