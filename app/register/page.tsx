"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type TierCode = "CLIENT" | "SERVER" | "MAX" | "DEV";

type Step = "chooseTier" | "enterEmail" | "awaitCode" | "verifying" | "done";

// Top-level page component that Next.js prerenders.
// IMPORTANT: this one does NOT call useSearchParams directly.
export default function RegisterPage() {
  return (
    <Suspense fallback={null /* or a small loading UI if you like */}>
      <RegisterPageInner />
    </Suspense>
  );
}

// All your existing logic moved into an inner component,
// which IS allowed to call useSearchParams because it's wrapped
// in <Suspense> by RegisterPage above.
function RegisterPageInner() {
  const searchParams = useSearchParams();

  // These come from FileMaker when it opens the Web Viewer:
  // e.g. https://promigrator.com/register?installId=xxx&mac=yyy&version=2FM_1.0
  const installId = searchParams.get("installId") || "";
  const macAddress = searchParams.get("mac") || "";
  const fmVersion = searchParams.get("version") || "";

  const [step, setStep] = useState<Step>("chooseTier");
  const [selectedTier, setSelectedTier] = useState<TierCode | null>(null);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Optional: basic client-side sanity
  useEffect(() => {
    if (!installId) {
      console.warn("No installId provided in query string.");
    }
  }, [installId]);

  const handleChooseTier = (tier: TierCode) => {
    setSelectedTier(tier);
    setError(null);
    setStatus(null);
    setStep("enterEmail");
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) {
      setError("Please choose a tier first.");
      return;
    }
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setStatus("Sending registration code to your email...");

    try {
      // TODO: implement this API route in Go/Next backend.
      // Expected request JSON:
      // {
      //   email,
      //   tierCode: selectedTier,
      //   installId,
      //   macAddress,
      //   fmVersion
      // }
      const res = await fetch("/api/registration/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          tierCode: selectedTier,
          installId,
          macAddress,
          fmVersion,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Unable to send registration code.");
      }

      setStatus(
        "We’ve emailed you a registration code. Paste it below once it arrives."
      );
      setStep("awaitCode");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !code) {
      setError("Email and code are required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setStatus("Verifying your code...");
    setStep("verifying");

    try {
      // TODO: implement this API route in Go/Next backend.
      // Expected request JSON:
      // {
      //   email,
      //   code,
      //   installId,
      //   macAddress
      // }
      const res = await fetch("/api/registration/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code,
          installId,
          macAddress,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Invalid or expired code.");
      }

      setStatus("Registration successful. You can now use 2FM.");
      setStep("done");

      // *** IMPORTANT: Tell FileMaker about the successful registration ***
      // Adjust script name & payload structure to match your FileMaker script.
      if (typeof window !== "undefined" && (window as any).FileMaker) {
        const payload = {
          ok: true,
          tierCode: data.tierCode, // e.g. "CLIENT", "SERVER", "MAX", "DEV"
          licenseKey: data.licenseKey,
          email,
          installId,
          macAddress,
        };
        (window as any).FileMaker.PerformScript(
          "HandleRegistrationResult",
          JSON.stringify(payload)
        );
      }
    } catch (err: any) {
      setError(err.message || "Could not verify code. Please try again.");
      setStatus(null);
      setStep("awaitCode");
    } finally {
      setIsSubmitting(false);
    }
  };

  const tierLabel = (tier: TierCode) => {
    switch (tier) {
      case "CLIENT":
        return "Client (Free)";
      case "SERVER":
        return "Server";
      case "MAX":
        return "Max";
      case "DEV":
        return "Developer";
      default:
        return tier;
    }
  };

  return (
    <main className="min-h-screen bg-black text-zinc-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-xl">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            2FM Registration
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Pro-Migrator for FileMaker •{" "}
            <span className="font-mono text-xs text-zinc-500">
              {fmVersion || "version not specified"}
            </span>
          </p>
          {installId && (
            <p className="mt-1 text-[11px] text-zinc-500">
              Install ID:{" "}
              <span className="font-mono break-all">{installId}</span>
            </p>
          )}
        </header>

        {/* Status / Error messages */}
        {(status || error) && (
          <div className="mb-4 space-y-2 text-sm">
            {status && (
              <div className="rounded-md border border-emerald-700 bg-emerald-950/60 px-3 py-2 text-emerald-200">
                {status}
              </div>
            )}
            {error && (
              <div className="rounded-md border border-red-700 bg-red-950/60 px-3 py-2 text-red-200">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Steps */}
        {step === "chooseTier" && (
          <section>
            <h2 className="mb-3 text-lg font-medium">Choose your edition</h2>
            <p className="mb-4 text-sm text-zinc-400">
              Start with the edition you intend to use. You&apos;ll confirm your
              email next, and we&apos;ll send a registration code.
            </p>
            <div className="grid gap-3">
              <button
                type="button"
                onClick={() => handleChooseTier("CLIENT")}
                className="flex items-start justify-between rounded-xl border border-zinc-700 bg-zinc-900/80 p-3 text-left hover:border-emerald-500/70 hover:bg-zinc-900"
              >
                <div>
                  <div className="text-sm font-semibold">
                    Client (Free – Local Only)
                  </div>
                  <p className="mt-1 text-xs text-zinc-400">
                    Migrate FileMaker files between local folders. No server
                    migrations.
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-400">
                  $0
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleChooseTier("SERVER")}
                className="flex items-start justify-between rounded-xl border border-zinc-700 bg-zinc-900/80 p-3 text-left hover:border-emerald-500/70 hover:bg-zinc-900"
              >
                <div>
                  <div className="text-sm font-semibold">
                    Server (Single Move)
                  </div>
                  <p className="mt-1 text-xs text-zinc-400">
                    One server migration between environments, bound to a single
                    server MAC address.
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-400">
                  $499
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleChooseTier("MAX")}
                className="flex items-start justify-between rounded-xl border border-zinc-700 bg-zinc-900/80 p-3 text-left hover:border-emerald-500/70 hover:bg-zinc-900"
              >
                <div>
                  <div className="text-sm font-semibold">Max</div>
                  <p className="mt-1 text-xs text-zinc-400">
                    Unlimited server migrations and registrations. No source
                    code.
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-400">
                  $999
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleChooseTier("DEV")}
                className="flex items-start justify-between rounded-xl border border-zinc-700 bg-zinc-900/80 p-3 text-left hover:border-emerald-500/70 hover:bg-zinc-900"
              >
                <div>
                  <div className="text-sm font-semibold">Developer</div>
                  <p className="mt-1 text-xs text-zinc-400">
                    Full source code license for teams and integrators.
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-400">
                  $1,999
                </span>
              </button>
            </div>
          </section>
        )}

        {step === "enterEmail" && selectedTier && (
          <section>
            <h2 className="mb-3 text-lg font-medium">
              {tierLabel(selectedTier)} registration
            </h2>
            <p className="mb-4 text-sm text-zinc-400">
              Enter the email where you want to receive your registration code.
              This email will be linked to your license.
            </p>

            <form onSubmit={handleSubmitEmail} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-300">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep("chooseTier")}
                  className="text-xs text-zinc-400 hover:text-zinc-200"
                >
                  ← Change edition
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : "Send registration code"}
                </button>
              </div>
            </form>
          </section>
        )}

        {(step === "awaitCode" || step === "verifying" || step === "done") && (
          <section>
            <h2 className="mb-3 text-lg font-medium">Enter your code</h2>
            <p className="mb-4 text-sm text-zinc-400">
              We&apos;ve emailed a registration code to{" "}
              <span className="font-medium text-zinc-200">{email}</span>. Paste
              it below to complete registration.
            </p>

            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-300">
                  Registration code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="Paste your code here"
                  required
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                {step !== "done" && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 disabled:opacity-60"
                  >
                    {step === "verifying"
                      ? "Verifying..."
                      : "Verify and activate"}
                  </button>
                )}
                {step === "done" && (
                  <span className="text-xs text-emerald-300">
                    Activation complete – you can close this window in FileMaker.
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setStep("enterEmail");
                    setCode("");
                    setError(null);
                    setStatus(null);
                  }}
                  className="text-xs text-zinc-400 hover:text-zinc-200"
                >
                  ← Back to email
                </button>
              </div>
            </form>
          </section>
        )}

        <footer className="mt-6 border-t border-zinc-800 pt-3 text-center text-[11px] text-zinc-500">
          promigrator.com • 2FM Registration
        </footer>
      </div>
    </main>
  );
}
