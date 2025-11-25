import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { ok: false, message: "Valid email is required." },
        { status: 400 }
      );
    }

    // TODO: In the future:
    // - Save to Postgres
    // - Send to SendGrid/Mailchimp/etc.
    console.log("📥 New beta signup:", email);

    return NextResponse.json({
      ok: true,
      message: "Thanks for subscribing! We'll be in touch soon.",
    });
  } catch (error) {
    console.error("Error in /api/subscribe:", error);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
