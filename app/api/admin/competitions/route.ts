import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, getAllCompetitionsAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("portfolio_admin_token")?.value;

  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const competitions = await getAllCompetitionsAdmin();
    return NextResponse.json({ competitions });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch competitions";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
