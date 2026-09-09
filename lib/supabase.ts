import { achievements as fallbackAchievements } from "@/data/achievements";
import { Achievement } from "@/types";

export interface CompetitionRow {
  id: string;
  name: string;
  organizer: string;
  status: string;
  result: string;
  position?: string | null;
  prize?: string | null;
  result_notes?: string | null;
  featured_on_portfolio?: boolean;
  created_at?: string;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Public: Fetch featured competitions from HackTracker Supabase database.
 * Falls back to static `data/achievements.ts` if Supabase is unconfigured or unavailable.
 */
export async function getFeaturedAchievements(): Promise<Achievement[]> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return fallbackAchievements;
  }

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/competitions?featured_on_portfolio=eq.true&select=id,name,organizer,result,position,prize&order=created_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        next: { revalidate: 60 }, // ISR cache for 60s
      }
    );

    if (!res.ok) {
      console.warn("Supabase competitions fetch returned non-200, falling back to static data.");
      return fallbackAchievements;
    }

    const data: CompetitionRow[] = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return fallbackAchievements;
    }

    return data.map((comp) => ({
      id: comp.id,
      title: comp.name,
      organization: comp.organizer,
      result: comp.position ? `${comp.position} (${comp.result})` : comp.result,
    }));
  } catch (err) {
    console.warn("Failed to fetch featured achievements from Supabase:", err);
    return fallbackAchievements;
  }
}

/**
 * Admin: Verify if an admin cookie or session token is valid
 */
export function verifyAdminToken(token: string | undefined): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  // A simple deterministic token derived from ADMIN_PASSWORD
  const expectedToken = Buffer.from(`admin:${adminPassword}`).toString("base64");
  return token === expectedToken;
}

export function generateAdminToken(): string {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin";
  return Buffer.from(`admin:${adminPassword}`).toString("base64");
}

/**
 * Admin: Fetch all competitions from HackTracker
 */
export async function getAllCompetitionsAdmin(): Promise<CompetitionRow[]> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase service role key is not configured in .env.local");
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/competitions?select=id,name,organizer,status,result,position,prize,featured_on_portfolio,created_at&order=created_at.desc`,
    {
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Supabase query failed (${res.status}): ${errorText}`);
  }

  return res.json();
}

/**
 * Admin: Toggle `featured_on_portfolio` status for a competition
 */
export async function toggleCompetitionFeatured(id: string, featured: boolean): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase service role key is not configured in .env.local");
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/competitions?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      featured_on_portfolio: featured,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update competition (${res.status}): ${errorText}`);
  }

  return true;
}
