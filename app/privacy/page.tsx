import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How İkra collects, uses, and protects your data. The app uses anonymous analytics only; this website collects nothing.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <article className="prose max-w-none prose-headings:text-emerald-600 prose-headings:font-semibold prose-h3:text-navy-800 prose-p:text-navy-800 prose-li:text-navy-800 prose-a:text-gold-500 prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-emerald-600 max-w-3xl mx-auto px-screen py-section">
        <h1>Privacy Policy</h1>
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
                href="#overview"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Overview
              </a>
            </li>
            <li>
              <a
                href="#data-we-collect"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Data we collect (and what we don&apos;t)
              </a>
            </li>
            <li>
              <a
                href="#third-party-services"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Third-party services
              </a>
            </li>
            <li>
              <a
                href="#local-storage"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Local storage on your device
              </a>
            </li>
            <li>
              <a
                href="#childrens-privacy"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Children&apos;s privacy
              </a>
            </li>
            <li>
              <a
                href="#your-rights"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Your rights
              </a>
            </li>
            <li>
              <a
                href="#data-retention"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Data retention
              </a>
            </li>
            <li>
              <a
                href="#changes-to-this-policy"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Changes to this policy
              </a>
            </li>
            <li>
              <a
                href="#contact-us"
                className="text-navy-800 hover:text-emerald-600 transition-colors duration-fast"
              >
                Contact us
              </a>
            </li>
          </ol>
        </nav>

        {/* Section 1 */}
        <h2 id="overview">Overview</h2>
        <p>
          This Privacy Policy covers two surfaces: the İkra mobile app on iOS
          and Android, and the marketing website at ikra-web.vercel.app. Both
          are operated by the independent developer of İkra. The app has no
          user accounts and collects no personally identifiable information
          (PII) — only anonymous, device-level usage signals described below.
          The website is a fully static page that collects nothing at all.
        </p>

        {/* Section 2 */}
        <h2 id="data-we-collect">Data we collect (and what we don&apos;t)</h2>
        <p>We collect:</p>
        <ul>
          <li>
            Anonymous Firebase Analytics events — aggregate usage patterns such
            as which verses are viewed and which features are used. No personal
            identifiers are attached.
          </li>
          <li>
            Anonymous Firebase Crashlytics crash reports — device model, OS
            version, and a stack trace generated at the time of a crash. No
            personal identifiers are attached.
          </li>
          <li>
            Firebase Remote Config device-level metadata — locale and platform
            used to deliver feature toggles. No personal identifiers are
            attached.
          </li>
          <li>
            An anonymized RevenueCat subscriber ID — only when you make a
            purchase. This ID allows your subscription to be restored across
            devices. It is not linked to your name or email address.
          </li>
          <li>
            An APNs (iOS) or FCM (Android) device token — only if you opt in to
            verse reminder notifications. This token is used solely to deliver
            your chosen notifications and is not shared for any other purpose.
          </li>
          <li>
            AppsFlyer install-attribution device identifiers — only when ATT
            (App Tracking Transparency) consent is granted on iOS. On Android,
            attribution follows Google Play Services standard behavior. This
            data helps us understand which channels drive app installs.
          </li>
        </ul>
        <p>We do not collect:</p>
        <ul>
          <li>Your name, email address, phone number, or postal address.</li>
          <li>Precise or approximate location data.</li>
          <li>Your contacts, photos, camera roll, or microphone input.</li>
          <li>Health or biometric data.</li>
          <li>
            Payment-card details. All billing is handled entirely by Apple App
            Store or Google Play Billing — we never see or store your payment
            information.
          </li>
        </ul>
        <p>
          The <strong>website</strong> (ikra-web.vercel.app) collects nothing.
          It sets no first-party cookies, runs no analytics scripts, and has no
          forms or user accounts.
        </p>

        {/* Section 3 */}
        <h2 id="third-party-services">Third-party services</h2>
        <p>
          The İkra app integrates the following third-party processors. Each
          processor receives only the data described.
        </p>
        <ul>
          <li>
            <strong>Firebase Analytics</strong> (Google LLC) — anonymous app
            usage events; no PII.
          </li>
          <li>
            <strong>Firebase Crashlytics</strong> (Google LLC) — anonymous
            crash diagnostics including device model, OS version, and stack
            trace.
          </li>
          <li>
            <strong>Firebase Remote Config</strong> (Google LLC) — receives
            feature toggles; sends device-level metadata only.
          </li>
          <li>
            <strong>RevenueCat</strong> (RevenueCat, Inc.) — anonymized
            subscriber ID for restoring purchases across devices.
          </li>
          <li>
            <strong>Apple App Store / Google Play Billing</strong> (Apple Inc.
            / Google LLC) — handles all subscription payments. We never see or
            store payment-card details.
          </li>
          <li>
            <strong>Expo Notifications</strong> (Expo / EAS) — local and push
            notifications for opt-in verse reminders; uses your APNs or FCM
            device token.
          </li>
          <li>
            <strong>Apple App Tracking Transparency</strong> (iOS framework)
            — iOS prompts you before any cross-app tracking begins. We use your
            choice to govern the downstream attribution SDK (AppsFlyer) and ad
            personalization (AdMob). If you decline, neither SDK uses your
            device identifiers for attribution or ad targeting.
          </li>
          <li>
            <strong>AppsFlyer</strong> (AppsFlyer Ltd.) — mobile install
            attribution. On iOS, AppsFlyer uses device identifiers only when
            ATT consent is granted. On Android, attribution follows Google Play
            Services standard behavior.
          </li>
          <li>
            <strong>Google AdMob</strong> (Google LLC) — serves ads in the
            free tier. Personalized ads are shown only when ATT consent is
            granted on iOS; on Android they follow Google Play Services standard
            behavior. Premium subscribers do not see AdMob ads.
          </li>
        </ul>

        {/* Section 4 */}
        <h2 id="local-storage">Local storage on your device</h2>
        <p>
          İkra stores Quran text, hadith text, audio cache, user preferences,
          and bookmarks locally on your device using Expo SQLite and Expo Secure
          Store. This data never leaves your device and is not transmitted to
          any server. When you uninstall the app, all locally stored data is
          removed from your device.
        </p>

        {/* Section 5 */}
        <h2 id="childrens-privacy">Children&apos;s privacy</h2>
        <p>
          İkra is not directed at children under 13. We do not knowingly collect
          any data from children under 13. If you are a parent or guardian and
          believe your child has inadvertently provided data through the app,
          please contact us at{" "}
          <a href="mailto:support@ikraapp.com">support@ikraapp.com</a> and we
          will promptly remove any data we hold.
        </p>

        {/* Section 6 */}
        <h2 id="your-rights">Your rights</h2>
        <p>
          If you are located in the EU or UK, the General Data Protection
          Regulation (GDPR) gives you the right to access, rectify, erase,
          restrict, or port any personal data we hold, and to object to its
          processing. Because we collect only anonymous data, there is typically
          nothing to access or erase — but we will respond to any request
          promptly.
        </p>
        <p>
          If you are a California resident, the California Consumer Privacy Act
          (CCPA) gives you the right to know what personal information we
          collect, the right to request deletion, and the right to opt out of
          the sale of your personal information. We do not sell personal
          information. To exercise any of these rights, email us at{" "}
          <a href="mailto:support@ikraapp.com">support@ikraapp.com</a>.
        </p>

        {/* Section 7 */}
        <h2 id="data-retention">Data retention</h2>
        <p>
          Firebase Analytics event-level data is retained for 14 months by
          default (Google&apos;s standard retention period) and is anonymous
          throughout. Firebase Crashlytics retains crash reports according to
          Firebase&apos;s default retention schedule. RevenueCat retains
          subscriber records for as long as your subscription is active, plus
          any additional period required by Apple or Google for billing
          compliance. After that period, records are deleted or anonymized.
        </p>

        {/* Section 8 */}
        <h2 id="changes-to-this-policy">Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The &ldquo;Last
          updated&rdquo; date at the top of this page always reflects the most
          recent revision. Material changes will be communicated through the app
          or in the app-store release notes so you have the opportunity to
          review them before continuing to use İkra.
        </p>

        {/* Section 9 */}
        <h2 id="contact-us">Contact us</h2>
        <p>
          For privacy questions, data-rights requests, or any other concerns,
          email us at{" "}
          <a href="mailto:support@ikraapp.com">support@ikraapp.com</a>. We aim
          to respond within a few business days.
        </p>
      </article>

      {/* Cross-link strip (D-30) */}
      <nav
        aria-label="Related pages"
        className="max-w-3xl mx-auto px-screen mt-2xl pt-lg border-t border-navy-800/10 text-sm text-navy-800/70 flex flex-wrap items-center justify-center gap-sm"
      >
        <Link
          href="/terms"
          className="hover:text-emerald-600 transition-colors duration-fast"
        >
          Terms of Service
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
          &#8592; Back to home
        </Link>
      </nav>
    </>
  );
}
