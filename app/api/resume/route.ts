import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/data/site";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isView = searchParams.get("view") === "true";

    const response = await fetch(siteConfig.resumeDownloadUrl, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioResumeBot/1.0)",
      },
    });

    if (!response.ok) {
      // Fallback: Redirect directly to Google Docs export
      return NextResponse.redirect(siteConfig.resumeDownloadUrl, 307);
    }

    const pdfBuffer = await response.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${isView ? "inline" : "attachment"}; filename="Dhinesh_Karthick_Resume.pdf"`,
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error serving resume from Google Docs:", error);
    return NextResponse.redirect(siteConfig.resumeDownloadUrl, 307);
  }
}
