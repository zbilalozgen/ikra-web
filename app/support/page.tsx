import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with the İkra app — widget install, audio playback, purchase restore, notifications, and bug reports.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <>
      <article className="prose max-w-none prose-headings:text-emerald-600 prose-headings:font-semibold prose-h3:text-navy-800 prose-p:text-navy-800 prose-li:text-navy-800 prose-a:text-gold-500 prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-emerald-600 max-w-3xl mx-auto px-screen py-section">
        <h1>Support</h1>
        <p className="not-prose text-sm text-navy-800/60 mt-xs">
          Last updated: June 1, 2026
        </p>

        <p>
          We are a small team behind İkra and we read every message. If you
          have a question, run into an issue, or have a suggestion, please email
          us — answers to the most common questions are below.
        </p>

        <a
          href="mailto:support@ikraapp.com"
          className="not-prose inline-flex items-center justify-center bg-emerald-600 text-white font-semibold px-lg py-md rounded-lg min-h-touch hover:bg-emerald-700 transition-colors duration-fast no-underline mt-md"
        >
          Email us at support@ikraapp.com
        </a>

        <h2>Frequently asked</h2>

        <h3>How do I install the iOS / Android widget?</h3>
        <p>
          On iOS, long-press the home or lock screen, tap the{" "}
          <strong>+</strong> icon in the top-left corner, search for
          &ldquo;İkra&rdquo;, choose your preferred widget size (small, medium,
          or large), and tap <strong>Add Widget</strong>.
        </p>
        <p>
          On Android, long-press an empty area of the home screen, choose{" "}
          <strong>Widgets</strong>, scroll to <strong>İkra</strong>, then drag
          the desired size to your home screen.
        </p>

        <h3>Audio isn't playing — what should I check?</h3>
        <ul>
          <li>
            On iOS, check that the silent/ringer switch on the side of your
            device is off, and that system media volume is turned up (not just
            the ringer).
          </li>
          <li>
            On Android, confirm that media volume (not just notification volume)
            is raised.
          </li>
          <li>
            Verify your Bluetooth or AirPlay output is not pointing to a
            disconnected device.
          </li>
          <li>
            Battery saver or background-app-refresh restrictions can interrupt
            audio — try disabling battery optimization for İkra and confirm
            Background App Refresh is on.
          </li>
        </ul>
        <p>
          If none of the above resolves the issue, email{" "}
          <a href="mailto:support@ikraapp.com">support@ikraapp.com</a> with your
          device model and OS version and we will investigate.
        </p>

        <h3>How do I restore my premium purchase?</h3>
        <p>
          Open the İkra app, go to <strong>Settings</strong> (or{" "}
          <strong>Profile</strong>), and tap <strong>Restore Purchase</strong>.
          The restore requires signing in with the same Apple ID or Google
          account that originally purchased the subscription.
        </p>
        <p>
          If the restore still fails, email{" "}
          <a href="mailto:support@ikraapp.com">support@ikraapp.com</a> with your
          original purchase confirmation (Apple email receipt or Google order
          ID) and we will sort it out.
        </p>

        <h3>Daily verse notifications aren't arriving — how do I fix that?</h3>
        <ul>
          <li>
            Go to your device&apos;s <strong>Settings</strong> &rarr;{" "}
            <strong>Notifications</strong> &rarr; <strong>İkra</strong> and
            confirm <strong>Allow Notifications</strong> is enabled.
          </li>
          <li>
            Inside the app, check <strong>Settings</strong> &rarr;{" "}
            <strong>Notifications</strong> and verify the daily verse toggle is
            on and a delivery time is set.
          </li>
          <li>
            Do Not Disturb or Focus modes can silence the app — check that İkra
            is permitted during your active Focus.
          </li>
          <li>
            On Android, battery optimization may suppress background delivery —
            whitelist İkra in your battery settings.
          </li>
        </ul>
        <p>
          If notifications still do not arrive, email{" "}
          <a href="mailto:support@ikraapp.com">support@ikraapp.com</a> with your
          device model and we will help.
        </p>

        <h3>How do I report a bug or request a feature?</h3>
        <p>
          Email <a href="mailto:support@ikraapp.com">support@ikraapp.com</a>{" "}
          with a description of the issue or feature, the steps to reproduce (for
          bugs), your device model, and OS version — screenshots or a short
          screen recording are always welcome.
        </p>
        <p>
          Feature requests are read and genuinely considered, though we cannot
          commit to a specific timeline.
        </p>
      </article>

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
          href="/terms"
          className="hover:text-emerald-600 transition-colors duration-fast"
        >
          Terms of Service
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
