"use client";

import { useState } from "react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(
        data.message || "Thanks — we’ll be in touch as things progress.",
      );
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-[#1f1b22] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.65)] md:p-6">
      <h3 className="text-sm font-semibold text-zinc-50">
        Join the Pro-Migrator beta list
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-zinc-400">
        No spam, no weekly drip campaigns. Just occasional, high-signal updates
        as the tools mature.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-2xl border border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-50 outline-none ring-0 placeholder:text-zinc-500 focus:border-[#F95601] focus:ring-1 focus:ring-[#F95601]/40"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-2xl bg-[#F95601] px-4 py-2 text-sm font-medium text-zinc-50 transition hover:bg-[#ff6a1d] disabled:opacity-60 disabled:hover:bg-[#F95601]"
        >
          {status === "loading" ? "Submitting…" : "Notify me"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-xs ${
            status === "success" ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
