import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      
      {/* ===== HERO SECTION ===== */}
      <section className="px-6 pt-24 pb-32 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Pro-Migrator
        </h1>

        <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Modern tools that bridge FileMaker with enterprise automation, 
          CI/CD workflows, SQL Server, and PowerShell integrations.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <Link
            href="#products"
            className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition shadow-lg"
          >
            Explore Products
          </Link>

          <a
            href="mailto:info@promigrator.com"
            className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* ===== PRODUCT SECTION ===== */}
      <section id="products" className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          Tools Designed for FileMaker Developers
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {/* 2FM-CD Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg hover:bg-white/10 transition group shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">
              2FM-CD
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Full SDLC automation for FileMaker.  
              Deploy from DEV → QA → BETA → PROD using migration automation powered by the FM Admin API + FMDM.
            </p>
            <div className="mt-6">
              <button className="w-full py-2 rounded-lg bg-purple-600 group-hover:bg-purple-700 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* 2SQL Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg hover:bg-white/10 transition group shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">
              2SQL
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Export FileMaker schema + data directly into SQL Server.  
              Perfect for analytics, reporting, Power BI, Tableau, and enterprise integrations.
            </p>
            <div className="mt-6">
              <button className="w-full py-2 rounded-lg bg-blue-600 group-hover:bg-blue-700 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* 2PS Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg hover:bg-white/10 transition group shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">
              2PS
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Free PowerShell execution toolkit for FileMaker Server.  
              Create secure bat/ps job runners, generate PKI keys, and automate anything.
            </p>
            <div className="mt-6">
              <button className="w-full py-2 rounded-lg bg-green-600 group-hover:bg-green-700 transition">
                Learn More
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10 text-center text-gray-500 text-sm border-t border-white/10">
        <p>© {new Date().getFullYear()} Pro-Migrator • A division of AMDyno, Inc.</p>
        <p className="mt-2">Empowering FileMaker developers with enterprise-grade automation tools.</p>
      </footer>

    </main>
  );
}
