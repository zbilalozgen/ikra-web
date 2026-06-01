import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-card text-navy-800 border-t border-navy-800/10">
      <div className="mx-auto max-w-5xl px-screen py-xl flex flex-col items-center gap-md text-center">
        {/* Brand mark */}
        <div className="font-semibold text-xl text-emerald-600 min-h-touch flex items-center">
          İkra
        </div>

        {/* Tagline */}
        <p className="text-sm text-navy-800/70">
          Quran Verses & Sahih Hadith Widget App
        </p>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-md">
          <Link
            href="/privacy"
            className="text-sm text-navy-800 hover:text-gold-500 transition-colors duration-150"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-navy-800 hover:text-gold-500 transition-colors duration-150"
          >
            Terms of Service
          </Link>
          <Link
            href="/support"
            className="text-sm text-navy-800 hover:text-gold-500 transition-colors duration-150"
          >
            Support
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-navy-800/60 mt-sm">
          © 2025 İkra. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
