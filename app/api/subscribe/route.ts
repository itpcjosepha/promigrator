import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { ok: false, message: "Valid email is required." },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Basic sanity check
    if (!trimmedEmail.includes("@") || !trimmedEmail.includes(".")) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Write or noop if it already exists
    await prisma.subscriber.upsert({
      where: { email: trimmedEmail },
      create: { email: trimmedEmail },
      update: {}, // do nothing if already exists
    });

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
