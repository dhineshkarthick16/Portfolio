import { achievements as fallbackAchievements } from "@/data/achievements";
import { Achievement } from "@/types";

export interface RoundRow {
  id: string;
  name?: string;
  date?: string | null;
  status?: string | null;
  round_order?: number | null;
}

export interface CompetitionRow {
  id: string;
  name: string;
  organizer: string;
  status: string;
  result: string;
  position?: string | null;
  prize?: string | null;
  result_notes?: string | null;
  created_at?: string;
  registration_deadline?: string | null;
  rounds?: RoundRow[];
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
// On the server, prioritize SUPABASE_SERVICE_ROLE_KEY to bypass RLS and count all competitions
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;

export const QUALIFYING_RESULTS = [
  "Winner",
  "Won",
  "Runner-up",
  "Finalist",
  "Shortlisted",
] as const;

function formatMonthYear(dateStr?: string | null): string | undefined {
  if (!dateStr) return undefined;
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return undefined;
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return undefined;
  }
}

export function getResultRank(resultStr?: string): number {
  if (!resultStr) return 99;
  const lower = resultStr.toLowerCase();
  if (lower.includes("winner") || lower.includes("won")) return 1;
  if (lower.includes("runner-up") || lower.includes("runner up")) return 2;
  if (lower.includes("finalist")) return 3;
  if (lower.includes("shortlisted")) return 4;
  return 5;
}

/**
 * Known completion/event dates for competitions where rounds data might not yet be
 * populated or accessible via RLS in Supabase.
 * Extracted directly from HackTracker competition history.
 */
const KNOWN_EVENT_DATES: Record<string, string> = {
  "geonex": "2026-03-15T06:30:00.000Z", // Final Round - Offline Hackathon (March 2026)
  "h@cit": "2026-03-13T06:30:00.000Z", // Round 1 — Idea Submission (March 2026)
  "apathon": "2026-02-16T06:30:00.000Z", // Round 1 — Idea Submission (February 2026)
  "hackfusion": "2026-08-07T06:30:00.000Z", // Top 50 Finals Offline at Erode (August 2026)
  "iitm i2i": "2026-08-20T06:30:00.000Z", // BootCamp / i2I (August 2026)
  "innovation unbounds": "2026-09-03T06:30:00.000Z", // 24 hour hackathon (September 2026)
  "aicci": "2026-08-20T06:30:00.000Z", // Finals at Thoothukudi (August 2026)
  "devjams": "2026-08-29T06:30:00.000Z", // 3 day Hackathon (August 2026)
  "deepsprint": "2026-09-01T06:30:00.000Z", // 24 hour Hackathon (September 2026)
};

/**
 * Extracts the effective event completion date for a competition.
 * Prioritizes the latest date from the competition rounds (culmination / finale date),
 * then registration deadline, then known historical event dates.
 * Does NOT fall back to created_at because that is the row creation timestamp, not the event date.
 */
export function getCompetitionEventDate(comp: CompetitionRow): string | undefined {
  // 1. Highest priority: real dates from rounds table in Supabase
  const roundDates = (comp.rounds || [])
    .filter((r) => r.date)
    .map((r) => ({
      raw: r.date!,
      time: new Date(r.date!).getTime(),
    }))
    .filter((item) => !isNaN(item.time));

  if (roundDates.length > 0) {
    roundDates.sort((a, b) => b.time - a.time);
    return roundDates[0].raw;
  }

  // 2. Next priority: registration deadline if available
  if (comp.registration_deadline) {
    return comp.registration_deadline;
  }

  // 3. Known historical event dates lookup (ensures older hackathons like GeoNex in March 2026 sort accurately)
  const nameLower = comp.name.toLowerCase();
  for (const [key, dateStr] of Object.entries(KNOWN_EVENT_DATES)) {
    if (nameLower.includes(key)) {
      return dateStr;
    }
  }

  return undefined;
}

export function sortAchievements(items: Achievement[]): Achievement[] {
  return [...items].sort((a, b) => {
    const rankA = getResultRank(a.rawResult || a.result);
    const rankB = getResultRank(b.rawResult || b.result);
    if (rankA !== rankB) {
      return rankA - rankB;
    }
    const timeA = a.rawDate ? new Date(a.rawDate).getTime() : 0;
    const timeB = b.rawDate ? new Date(b.rawDate).getTime() : 0;
    return timeB - timeA;
  });
}

/**
 * Public: Fetch qualifying competitions (Winner, Won, Runner-up, Finalist, Shortlisted)
 * directly from HackTracker Supabase database using read-only anon key.
 * Joins `rounds` to retrieve real event completion dates.
 * Falls back to static `data/achievements.ts` if Supabase is unconfigured, empty, or unavailable.
 */
export async function getQualifyingAchievements(): Promise<Achievement[]> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return sortAchievements(fallbackAchievements);
  }

  try {
    const filterValues = QUALIFYING_RESULTS.join(",");
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/competitions?result=in.(${filterValues})&select=id,name,organizer,result,position,prize,created_at,registration_deadline,rounds(id,name,date,round_order,status)`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        cache: "no-store", // Avoid caching so updates show immediately on reload without redeploy
      }
    );

    if (!res.ok) {
      console.warn("Supabase competitions fetch returned non-200, falling back to static data.");
      return sortAchievements(fallbackAchievements);
    }

    const data: CompetitionRow[] = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return sortAchievements(fallbackAchievements);
    }

    const mapped: Achievement[] = data.map((comp) => {
      const dateValue = getCompetitionEventDate(comp);
      return {
        id: comp.id,
        title: comp.name,
        organization: comp.organizer,
        result: comp.position ? `${comp.position} (${comp.result})` : comp.result,
        rawResult: comp.result,
        date: formatMonthYear(dateValue),
        rawDate: dateValue || undefined,
      };
    });

    return sortAchievements(mapped);
  } catch (err: any) {
    if (err?.digest === "DYNAMIC_SERVER_USAGE") {
      throw err;
    }
    console.warn("Failed to fetch qualifying achievements from Supabase:", err);
    return sortAchievements(fallbackAchievements);
  }
}

// Alias for backwards compatibility
export const getFeaturedAchievements = getQualifyingAchievements;

/**
 * Counts all hackathons / competitions registered in the HackTracker backend,
 * without filtering by outcome, so QuickStats displays the full tally.
 */
export async function getTotalHackathonsCount(): Promise<number> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return fallbackAchievements.length;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/competitions?select=id`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "count=exact",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return fallbackAchievements.length;
    }

    const contentRange = res.headers.get("content-range");
    if (contentRange) {
      const parts = contentRange.split("/");
      if (parts.length > 1) {
        const total = parseInt(parts[1], 10);
        if (!isNaN(total) && total > 0) return total;
      }
    }

    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data.length;
    }

    return fallbackAchievements.length;
  } catch (err: any) {
    if (err?.digest === "DYNAMIC_SERVER_USAGE") {
      throw err;
    }
    console.warn("Failed to fetch total competitions count from Supabase:", err);
    return fallbackAchievements.length;
  }
}

