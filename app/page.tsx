import Link from "next/link";
import Image from "next/image";
import EmailSignup from "@/components/EmailSignup";
import { PromigratorHeroBackground } from "@/components/PromigratorHeroBackground";

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ===== TOP NAV ===== */}
<header className="sticky top-0 z-20 border-b border-zinc-800 bg-background">
  <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
    <div className="flex items-center gap-3">
      {/* Logo */}
      <div className="relative flex items-center">
        <Image
          src="/ProMigrator_DB_TopRedOrangeGreen_v1.png"
          alt="ProMigrator Logo"
          width={259}
          height={314}
          className="h-15 w-auto -mt-[2px] shrink-0"
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold tracking-tight text-zinc-50">
          ProMigrator
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          for FileMaker
        </span>
      </div>
    </div>

    <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
      <Link href="#products" className="hover:text-zinc-100">
        Products
      </Link>
      <Link href="#why" className="hover:text-zinc-100">
        Why ProMigrator
      </Link>
      <Link href="#beta" className="hover:text-zinc-100">
        Beta access
      </Link>
      <a
        href="mailto:info@promigrator.com"
        className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-100 hover:border-[#F95601] hover:text-[#F95601]"
      >
        Contact
      </a>
    </nav>
  </div>
</header>

      {/* ===== HERO (Single column, dark) ===== */}
      <section className="relative border-b border-zinc-800 bg-background overflow-hidden min-h-[70vh]">
        <PromigratorHeroBackground />

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
            Tools for serious FileMaker teams
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-50 md:text-6xl">
            Enterprise-grade automation
            <br />
            for FileMaker deployments.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
            ProMigrator is a suite of purpose-built tools that bring SDLC,
            CI/CD, PowerShell orchestration, and SQL Server integrations to
            FileMaker — without sacrificing the speed and flexibility of the
            platform.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="#beta"
              className="rounded-full bg-[#F95601] px-6 py-2.5 text-sm font-medium text-zinc-50 shadow-sm transition hover:bg-[#ff6a1d]"
            >
              Join the beta
            </Link>

            <Link
              href="#products"
              className="text-sm font-medium text-zinc-300 hover:text-[#F95601]"
            >
              Explore products →
            </Link>
          </div>

          <div className="mt-10 text-xs text-zinc-500">
            Everything versioned, scripted, and predictable — the way modern
            engineering teams expect.
          </div>
        </div>
      </section>

      {/* ===== WHY PROMIGRATOR ===== */}
      <section
        id="why"
        className="border-b border-zinc-800 bg-background px-6 py-16"
      >
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
              Built for teams who treat FileMaker like a mission-critical app.
            </h2>
            <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
              ProMigrator comes from real projects where FileMaker sits at the
              center of healthcare, logistics, and enterprise workflows. These
              tools exist to reduce risk, simplify releases, and make your
              environment auditable and predictable.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2 rounded-3xl border border-zinc-800 bg-[#2f2b33] p-5">
              <h3 className="text-sm font-semibold text-zinc-50">
                Predictable releases
              </h3>
              <p className="text-xs leading-relaxed text-zinc-400">
                Move the same build through DEV, QA, BETA, and PROD using
                scripted, repeatable migrations instead of one-off manual
                steps.
              </p>
            </div>
            <div className="space-y-2 rounded-3xl border border-zinc-800 bg-[#2f2b33] p-5">
              <h3 className="text-sm font-semibold text-zinc-50">
                SQL-ready from day one
              </h3>
              <p className="text-xs leading-relaxed text-zinc-400">
                Align FileMaker schema and data with SQL Server so your
                reporting stack — Power BI, Tableau, custom dashboards — can
                operate on clean, stable data.
              </p>
            </div>
            <div className="space-y-2 rounded-3xl border border-zinc-800 bg-[#2f2b33] p-5">
              <h3 className="text-sm font-semibold text-zinc-50">
                Automation without drama
              </h3>
              <p className="text-xs leading-relaxed text-zinc-400">
                Use PowerShell, bat, and PKI-backed tokens to run secure jobs
                from FileMaker Server, without bolting on a dozen ad-hoc
                scripts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section
        id="products"
        className="border-b border-zinc-800 bg-background"
      >
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
                The ProMigrator suite.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
                Three focused tools. One goal: make your FileMaker stack behave
                like the rest of your engineering environment.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* 2FM-CD */}
            <article className="flex flex-col justify-between rounded-3xl border border-zinc-800 bg-[#18151b] p-5 transition hover:-translate-y-0.5 hover:border-[#F95601] hover:shadow-[0_18px_40px_rgba(0,0,0,0.65)]">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-50">
                  2FM-CD · Continuous Delivery for FileMaker
                </h3>
                <p className="text-xs leading-relaxed text-zinc-400">
                  Scripted migrations that move a known-good FileMaker build
                  across DEV, QA, BETA, and PROD using the FMS Admin API and
                  FMDM.
                </p>
                <ul className="space-y-1 text-xs text-zinc-400">
                  <li>• Promote builds with confidence.</li>
                  <li>• Keep environments aligned and reversible.</li>
                  <li>• Full source in the licensed version.</li>
                </ul>
              </div>
              <div className="pt-4 text-xs text-zinc-500">
                Free tier: single FROM → TO pipeline.
              </div>
            </article>

            {/* 2SQL */}
            <article className="flex flex-col justify-between rounded-3xl border border-zinc-800 bg-background p-5 transition hover:-translate-y-0.5 hover:border-[#F95601] hover:shadow-[0_18px_40px_rgba(0,0,0,0.65)]">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-50">
                  2SQL · FileMaker → SQL Server
                </h3>
                <p className="text-xs leading-relaxed text-zinc-400">
                  Extract FileMaker schema and data into SQL Server cleanly,
                  ready for enterprise BI and reporting tooling.
                </p>
                <ul className="space-y-1 text-xs text-zinc-400">
                  <li>• Respect existing FileMaker IDs and types.</li>
                  <li>• Enable consistent analytics across systems.</li>
                  <li>• Free tier: one file, one table.</li>
                </ul>
              </div>
              <div className="pt-4 text-xs text-zinc-500">
                Licensed version unlocks unlimited databases and tables.
              </div>
            </article>

            {/* 2PS */}
            <article className="flex flex-col justify-between rounded-3xl border border-zinc-800 bg-background p-5 transition hover:-translate-y-0.5 hover:border-[#F95601] hover:shadow-[0_18px_40px_rgba(0,0,0,0.65)]">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-zinc-50">
                  2PS · PowerShell orchestration
                </h3>
                <p className="text-xs leading-relaxed text-zinc-400">
                  A free toolkit for defining bat/PowerShell jobs that FileMaker
                  Server can run securely via scheduled scripts and PKI tokens.
                </p>
                <ul className="space-y-1 text-xs text-zinc-400">
                  <li>• Generate and manage PKI tokens.</li>
                  <li>• Centralize your job definitions.</li>
                  <li>• Ship safer operational automation.</li>
                </ul>
              </div>
              <div className="pt-4 text-xs text-zinc-500">
                Always free. Designed to sit alongside your existing scripts.
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===== BETA / SIGNUP ===== */}
      <section
        id="beta"
        className="bg-background px-6 pb-16 pt-12 md:pb-20 md:pt-16"
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row md:items-center">
          <div className="flex-1 space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
              Be first in line when ProMigrator ships.
            </h2>
            <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
              Share your email and we&apos;ll send carefully curated updates —
              no noise — as the 2FM-CD, 2SQL, and 2PS toolchain becomes
              available for download and consulting engagements.
            </p>
          </div>

          <div className="flex-1">
            <EmailSignup />
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-zinc-800 bg-background px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-xs text-zinc-500 md:flex-row md:items-center">
          <div>
            <p>© {year} ProMigrator.</p>
            <p>A division of AMDyno, Inc.</p>
          </div>
          <div className="flex gap-4">
            <span>FileMaker · SQL Server · PowerShell</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
