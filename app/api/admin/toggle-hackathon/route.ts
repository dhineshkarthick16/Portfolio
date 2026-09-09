import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, toggleCompetitionFeatured } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("portfolio_admin_token")?.value;

  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, featured } = await req.json();

    if (!id || typeof featured !== "boolean") {
      return NextResponse.json({ error: "Missing required fields: id, featured" }, { status: 400 });
    }

    await toggleCompetitionFeatured(id, featured);
    return NextResponse.json({ success: true, id, featured });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to toggle competition";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
