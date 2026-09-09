import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <div className="text-6xl font-bold tracking-tight mb-4 font-mono opacity-80">404</div>
      <h1 className="text-2xl font-semibold mb-3">Page Not Found</h1>
      <p className="text-sm opacity-60 max-w-sm mb-8">
        The page or article you are looking for does not exist or may have moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:opacity-90 transition-opacity"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>
    </main>
  );
}
