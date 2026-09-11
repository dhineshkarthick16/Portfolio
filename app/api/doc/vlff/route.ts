import { NextResponse } from "next/server";
import { fetchVlffDocData } from "@/lib/googleDocs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const report = await fetchVlffDocData();
    return NextResponse.json(report, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Google Doc data" },
      { status: 500 }
    );
  }
}
