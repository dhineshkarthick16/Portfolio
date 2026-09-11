export interface VlffSection {
  id: number;
  title: string;
  content: string[];
}

export interface VlffDocReport {
  docId: string;
  docUrl: string;
  title: string;
  sections: VlffSection[];
  metrics: {
    clkQDelay?: string;
    dClkDelay?: string;
    techNode?: string;
    paperComparison?: {
      node: string;
      dCk: string;
      ckQ: string;
      dQ: string;
      holdTime: string;
    };
  };
  rawText: string;
  lastSynced: string;
  isLive: boolean;
}

export const VLFF_DOC_ID = "1803pUIkIiorx2D4ecUMv7YKFnaFrutkd";
export const VLFF_DOC_URL = `https://docs.google.com/document/d/${VLFF_DOC_ID}/edit?usp=sharing`;

const FALLBACK_REPORT_TEXT = `VLFF (Very Low Power Flip-Flop) Implementation Report
1. Objective
Implement and verify the VLFF architecture in Cadence Virtuoso and evaluate post-layout performance.
2. VLFF Overview
Explain VLFF operation, master-slave structure, and low-power characteristics.
3. Schematic Design
Custom transistor schematic capture in Cadence Virtuoso with PMOS/NMOS sizing for ultra-low power.
4. Symbol Creation
Configured cell symbol and pin definitions for integration into test benches.
5. Functional Verification
Transient clock and D-input toggling simulation verified for logic consistency and glitch-free state capture.
6. Delay Measurement
Measured Post-Layout Clk-Q Delay = 216.7 ps
Measured D-Clk Delay: 99.217 ps
7. Layout Design
Custom silicon layout design following 180nm DRC rules, symmetrical routing, and substrate contacts.
8. LVS Verification
Full Layout Versus Schematic (LVS) cleanliness verified with zero nets/terminal discrepancies.
9. Literature Comparison
Paper VLFF Results @65 nm, 1.0V
D-CK = 124 ps
CK-Q = 104 ps
D-Q = 228 ps
Hold Time = 57 ps

My Result:
CK-Q = 216.7 ps @ 180 nm, 1.8 V
10. Future Improvements
• Transistor sizing optimization
• Multi-bit VLFF
• Power and PDP evaluation
• Data-aware techniques`;

export function parseVlffText(text: string, isLive = true): VlffDocReport {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const title = lines[0] || "VLFF (Very Low Power Flip-Flop) Implementation Report";

  const sections: VlffSection[] = [];
  let currentSection: VlffSection | null = null;

  // Regex to match numbered sections like "1. Objective", "6. Delay Measurement", etc.
  const sectionHeaderRegex = /^(\d+)\.\s*(.+)$/;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(sectionHeaderRegex);

    if (match) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = {
        id: parseInt(match[1], 10),
        title: match[2].trim(),
        content: [],
      };
    } else if (currentSection) {
      currentSection.content.push(line);
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  // Extract key metrics dynamically
  const clkQMatch = text.match(/Clk-Q Delay\s*[:=]\s*([0-9.]+\s*[pnum]?s)/i);
  const dClkMatch = text.match(/D-Clk Delay\s*[:=]\s*([0-9.]+\s*[pnum]?s)/i);
  const resultMatch = text.match(/My Result[:\s]*CK-Q\s*=\s*([0-9.]+\s*ps\s*@\s*180\s*nm,\s*1\.8\s*V)/i);

  return {
    docId: VLFF_DOC_ID,
    docUrl: VLFF_DOC_URL,
    title,
    sections,
    metrics: {
      clkQDelay: clkQMatch ? clkQMatch[1] : "216.7 ps",
      dClkDelay: dClkMatch ? dClkMatch[1] : "99.217 ps",
      techNode: resultMatch ? "180 nm @ 1.8 V" : "180 nm @ 1.8 V",
      paperComparison: {
        node: "65 nm @ 1.0V",
        dCk: "124 ps",
        ckQ: "104 ps",
        dQ: "228 ps",
        holdTime: "57 ps",
      },
    },
    rawText: text,
    lastSynced: new Date().toISOString(),
    isLive,
  };
}

export async function fetchVlffDocData(): Promise<VlffDocReport> {
  const exportUrl = `https://docs.google.com/document/d/${VLFF_DOC_ID}/export?format=txt`;

  try {
    const res = await fetch(exportUrl, {
      cache: "no-store", // Always fetch live on demand
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) PortfolioLiveSync/1.0",
      },
    });

    if (!res.ok) {
      console.warn(`Google Docs fetch failed (${res.status}), using fallback.`);
      return parseVlffText(FALLBACK_REPORT_TEXT, false);
    }

    const text = await res.text();
    if (!text || text.trim().length === 0) {
      return parseVlffText(FALLBACK_REPORT_TEXT, false);
    }

    return parseVlffText(text, true);
  } catch (err) {
    console.warn("Error fetching live Google Doc:", err);
    return parseVlffText(FALLBACK_REPORT_TEXT, false);
  }
}
