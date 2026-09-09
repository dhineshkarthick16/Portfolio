/**
 * Resume Automation Script: Google Docs -> PDF Sync
 *
 * Downloads the latest compiled PDF from the live Google Doc:
 * https://docs.google.com/document/d/1dd_YqEEEp1pCjDiv7RP6-Oki0diKR0X8VCa4Ra3dPEM/edit
 *
 * Primary Strategy: Direct fetch from Google Docs dynamic PDF export API.
 * Fallback Strategy: Local file checks if offline.
 */

const fs = require("fs");
const path = require("path");

const GOOGLE_DOC_ID = "1dd_YqEEEp1pCjDiv7RP6-Oki0diKR0X8VCa4Ra3dPEM";
const EXPORT_URL = `https://docs.google.com/document/d/${GOOGLE_DOC_ID}/export?format=pdf`;
const ROOT_DIR = path.resolve(__dirname, "..");
const OUTPUT_PDF = path.join(ROOT_DIR, "public", "resume.pdf");

async function syncResumeFromGoogleDocs() {
  console.log("==========================================");
  console.log("📄 Resume Live Sync: Google Docs → public/resume.pdf");
  console.log("==========================================");
  console.log(`Connecting to Google Doc (${GOOGLE_DOC_ID})...`);

  const publicDir = path.join(ROOT_DIR, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  try {
    const res = await fetch(EXPORT_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioResumeSync/1.0)",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/pdf")) {
      throw new Error(`Unexpected content-type received: ${contentType}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(OUTPUT_PDF, buffer);

    const stats = fs.statSync(OUTPUT_PDF);
    console.log("✅ Successfully downloaded and synced latest resume PDF!");
    console.log(`   Output: ${path.relative(ROOT_DIR, OUTPUT_PDF)}`);
    console.log(`   Size: ${(stats.size / 1024).toFixed(1)} KB`);
    console.log(`   Updated: ${stats.mtime.toLocaleString()}`);
    return true;
  } catch (error) {
    console.warn("⚠️  Unable to fetch live PDF from Google Docs:", error.message);
    if (fs.existsSync(OUTPUT_PDF)) {
      console.log("ℹ Existing public/resume.pdf retained.");
    } else {
      console.error("❌ No existing resume.pdf available.");
    }
    return false;
  }
}

syncResumeFromGoogleDocs();
