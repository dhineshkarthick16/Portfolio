import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { siteConfig } from "@/data/site";

// NOTE: This uses a simple in-memory rate limiter, which resets on every
// serverless cold start and does not share state across instances. It is a
// best-effort deterrent, not a hard guarantee. For strict rate limiting in
// production, pair this with an external store (e.g. Upstash Redis).
const requestLog = new Map<string, number[]>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > MAX_REQUESTS;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, subject, message, company } = body;

    // Server-side honeypot check (defense in depth alongside client check)
    if (company) {
      return NextResponse.json({ success: true }); // silently no-op
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (
      typeof name !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string" ||
      name.length > 200 ||
      subject.length > 300 ||
      message.length > 5000
    ) {
      return NextResponse.json({ error: "Input exceeds allowed length." }, { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // replace with a verified domain sender
      to: siteConfig.email,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
