import { cookies } from "next/headers";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { verifyAdminToken } from "@/lib/supabase";
import { AdminDashboard } from "./AdminDashboard";
import { AdminLoginForm } from "./AdminLoginForm";

export const metadata = {
  title: "Admin Dashboard | Portfolio",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("portfolio_admin_token")?.value;
  const isAuthenticated = verifyAdminToken(token);

  return (
    <main className="max-w-5xl mx-auto px-6 py-20 min-h-screen">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity mb-8"
      >
        <ArrowLeft size={16} />
        Back to Portfolio
      </Link>

      {isAuthenticated ? <AdminDashboard /> : <AdminLoginForm />}
    </main>
  );
}
