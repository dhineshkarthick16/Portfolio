import Link from "next/link";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { getAllArticles } from "@/lib/mdx";

export const metadata = {
  title: "Knowledge Hub | Dhinesh Karthick D",
  description: "Technical write-ups, engineering notes, and deep dives into VLSI, Embedded Systems, and AI.",
};

export default function KnowledgeHubPage() {
  const articles = getAllArticles();

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
        <h1 className="text-4xl font-semibold tracking-tight mb-3">Knowledge Hub</h1>
        <p className="text-base opacity-70">
          In-depth engineering notes, design walk-throughs, and technical insights across VLSI design, embedded architectures, and edge AI.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center flex flex-col items-center justify-center">
          <div className="p-3 rounded-full bg-white/10 mb-4">
            <BookOpen size={28} className="opacity-80" />
          </div>
          <h2 className="text-xl font-medium mb-2">Articles Coming Soon</h2>
          <p className="text-sm opacity-60 max-w-md leading-relaxed">
            I am currently documenting technical deep dives on ultra-low-power flip-flop design, TinyML deployment on ESP32, and analog layout optimization. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/knowledge-hub/${article.slug}`}
              className="block chip-card chip-corner-markers p-6"
            >
              <div className="flex items-center justify-between text-xs opacity-50 mb-2 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Clock size={12} />
                  {article.date}
                </span>
              </div>
              <h2 className="text-xl font-medium mb-2">{article.title}</h2>
              <p className="text-sm opacity-70 leading-relaxed">{article.description}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
