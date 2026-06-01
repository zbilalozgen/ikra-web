import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the İkra mobile app, including license grant, subscriptions, and limitations.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <article className="prose max-w-none prose-headings:text-emerald-600 prose-headings:font-semibold prose-h3:text-navy-800 prose-p:text-navy-800 prose-li:text-navy-800 prose-a:text-gold-500 prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-emerald-600 max-w-3xl mx-auto px-screen py-section">
        <h1>Terms of Service</h1>
        <p className="not-prose text-sm text-navy-800/60 mt-xs">
          Last updated: June 1, 2026
        </p>

        {/* Table of Contents */}
        <nav
          aria-label="On this page"
          className="not-prose bg-surface-card border border-navy-800/10 rounded-lg p-md text-sm mt-lg"
        >
          <p className="font-semibold text-navy-800 mb-sm">On this page</p>
          <ol className="list-decimal list-inside flex flex-col gap-xs">
            <li>
              <a
                href="#acceptance"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Acceptance
              </a>
            </li>
            <li>
              <a
                href="#license"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                License to use the App
              </a>
            </li>
            <li>
              <a
                href="#acceptable-use"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Acceptable use
              </a>
            </li>
            <li>
              <a
                href="#subscriptions"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Subscriptions and in-app purchases
              </a>
            </li>
            <li>
              <a
                href="#content-and-scripture"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Content and scripture
              </a>
            </li>
            <li>
              <a
                href="#disclaimer-of-warranties"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Disclaimer of warranties
              </a>
            </li>
            <li>
              <a
                href="#limitation-of-liability"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Limitation of liability
              </a>
            </li>
            <li>
              <a
                href="#governing-law"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Governing law
              </a>
            </li>
            <li>
              <a
                href="#changes"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Changes
              </a>
            </li>
            <li>
              <a
                href="#termination"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Termination
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Contact
              </a>
            </li>
          </ol>
        </nav>

        {/* Section 1 */}
        <h2 id="acceptance">Acceptance</h2>
        <p>
          By downloading, installing, or using the İkra mobile app, you agree
          to be bound by these Terms of Service. If you do not agree to these
          terms, please do not use the app. You must be of legal age in your
          jurisdiction to enter into this agreement, or have the consent of a
          parent or legal guardian.
        </p>

        {/* Section 2 */}
        <h2 id="license">License to use the App</h2>
        <p>
          We grant you a personal, non-exclusive, non-transferable, revocable
          license to use İkra solely for your own personal, non-commercial
          devotional and educational purposes. You may not reverse-engineer,
          decompile, redistribute, sub-license, or commercially exploit the app
          or any of its content in any form.
        </p>

        {/* Section 3 */}
        <h2 id="acceptable-use">Acceptable use</h2>
        <p>When using İkra, the following are not permitted:</p>
        <ul>
          <li>
            Attempting to disrupt, overload, or interfere with the app or its
            servers.
          </li>
          <li>
            Circumventing access controls, subscription gates, or any
            technical protection measures.
          </li>
          <li>
            Misrepresenting the app, its content, or its developers to others.
          </li>
          <li>Using the app to harass, defame, or harm any person.</li>
          <li>
            Redistributing Quran recitation audio, hadith text, translations,
            or any other scripture content outside the app.
          </li>
        </ul>
        <p>
          We may suspend or terminate your access to İkra at any time if you
          violate these terms.
        </p>

        {/* Section 4 */}
        <h2 id="subscriptions">Subscriptions and in-app purchases</h2>
        <p>
          All paid subscriptions and in-app purchases are processed exclusively
          by Apple App Store (iOS) or Google Play (Android) in accordance with
          their respective billing terms and policies. We do not see, process,
          or store any payment-card details — all payment handling is managed
          entirely by Apple or Google.
        </p>
        <p>
          Subscriptions automatically renew at the end of each billing period
          unless you cancel through your Apple or Google account settings before
          the renewal date. Refund requests are handled according to the refund
          policy of the relevant store. Premium-tier features are available
          while your subscription is active and are revoked if a subscription
          lapses or is canceled.
        </p>

        {/* Section 5 */}
        <h2 id="content-and-scripture">Content and scripture</h2>
        <p>
          Quran text, hadith text, scholarly translations, and reciter audio
          available in İkra are provided for your personal study, reflection,
          and devotional use only. These materials are not licensed for
          redistribution, public broadcast, or any commercial use outside the
          app. Translations are presented as scholarly aids to understanding;
          the Arabic source text remains the authoritative reference in all
          matters of faith and practice.
        </p>

        {/* Section 6 */}
        <h2 id="disclaimer-of-warranties">Disclaimer of warranties</h2>
        <p>
          İkra is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
          without warranties of any kind, express or implied, including but not
          limited to implied warranties of merchantability, fitness for a
          particular purpose, and non-infringement. Prayer time calculations
          and qibla direction are best-effort estimates based on standard
          astronomical algorithms; you should verify these against authoritative
          local sources for any religious obligation.
        </p>

        {/* Section 7 */}
        <h2 id="limitation-of-liability">Limitation of liability</h2>
        <p>
          To the maximum extent permitted by applicable law, we are not liable
          for any indirect, incidental, special, consequential, or punitive
          damages arising out of or related to your use of İkra, even if we
          have been advised of the possibility of such damages. If, for any
          reason, we are found liable to you, our aggregate liability is limited
          to the total amount you paid for the app in the twelve months
          preceding the claim.
        </p>

        {/* Section 8 */}
        <h2 id="governing-law">Governing law</h2>
        <p>
          These Terms are governed by the laws of the State of Delaware, United States, without regard to its conflict-of-laws principles.
          Depending on where you reside, local consumer-protection laws may
          also apply and provide you with additional rights.
        </p>

        {/* Section 9 */}
        <h2 id="changes">Changes</h2>
        <p>
          We may update these Terms from time to time; the &ldquo;Last
          updated&rdquo; date at the top of this page reflects the most recent
          revision. Your continued use of İkra after a change is posted
          constitutes your acceptance of the updated Terms.
        </p>

        {/* Section 10 */}
        <h2 id="termination">Termination</h2>
        <p>
          You may stop using İkra at any time by uninstalling the app from your
          device. We may suspend or terminate your access if you violate these
          Terms, with or without notice. Sections that by their nature survive
          termination — including disclaimers, limitations of liability, and
          governing law — will continue to apply after termination.
        </p>

        {/* Section 11 */}
        <h2 id="contact">Contact</h2>
        <p>
          If you have any questions about these Terms, please reach out to us
          at{" "}
          <a href="mailto:support@ikraapp.com">support@ikraapp.com</a>.
        </p>
      </article>

      {/* Cross-link strip (D-30) */}
      <nav
        aria-label="Related pages"
        className="max-w-3xl mx-auto px-screen mt-2xl pt-lg border-t border-navy-800/10 text-sm text-navy-800/70 flex flex-wrap items-center justify-center gap-sm"
      >
        <Link
          href="/privacy"
          className="hover:text-emerald-600 transition-colors duration-fast"
        >
          Privacy Policy
        </Link>
        <span aria-hidden="true" className="text-gold-500">
          &middot;
        </span>
        <Link
          href="/support"
          className="hover:text-emerald-600 transition-colors duration-fast"
        >
          Support
        </Link>
        <span aria-hidden="true" className="text-gold-500">
          &middot;
        </span>
        <Link
          href="/"
          className="hover:text-emerald-600 transition-colors duration-fast"
        >
          ← Back to home
        </Link>
      </nav>
    </>
  );
}
