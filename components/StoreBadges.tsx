/**
 * PLACEHOLDER STORE BUTTONS — replace with official Apple "Download on the App Store"
 * and Google "Get it on Google Play" SVG marketing badges before store submission.
 * See https://developer.apple.com/app-store/marketing/guidelines/
 * and https://play.google.com/intl/en_us/badges/
 */

export function AppStoreBadge() {
  return (
    <a
      href="#"
      aria-label="Download on the App Store"
      className="inline-flex items-center gap-2 min-h-touch rounded-full px-lg py-md bg-navy-800 text-cream font-medium text-sm transition-colors duration-fast hover:bg-navy-900"
    >
      {/* TODO(launch): fill App Store URL and replace with official Apple badge */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        {/* Apple glyph placeholder */}
        <path d="M11.182 9.382c-.02-1.937 1.586-2.876 1.658-2.921-0.906-1.324-2.313-1.505-2.81-1.524-1.19-.122-2.33.7-2.934.7-.6 0-1.518-.685-2.5-.666-1.28.019-2.467.746-3.124 1.89-1.34 2.316-.34 5.737.957 7.614.638.921 1.393 1.953 2.385 1.916.963-.039 1.323-.618 2.486-.618 1.163 0 1.49.618 2.502.597.034 0 .067-.002.1-.005 1.02-.036 1.776-1.042 2.398-1.97.764-1.11 1.085-2.187 1.102-2.242-.024-.01-2.198-.843-2.22-3.771zm-2.08-6.932c.531-.643.89-1.536.79-2.432-.765.031-1.692.51-2.24 1.153-.493.57-.924 1.481-.808 2.354.854.066 1.725-.435 2.258-1.075z"/>
      </svg>
      App Store
    </a>
  );
}

export function GooglePlayBadge() {
  return (
    <a
      href="#"
      aria-label="Get it on Google Play"
      className="inline-flex items-center gap-2 min-h-touch rounded-full px-lg py-md bg-navy-800 text-cream font-medium text-sm transition-colors duration-fast hover:bg-navy-900"
    >
      {/* TODO(launch): fill Google Play URL and replace with official Google badge */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        {/* Android glyph placeholder */}
        <path d="M2.293 1.293a1 1 0 0 1 1.414 0l9 9a1 1 0 0 1-1.414 1.414l-9-9a1 1 0 0 1 0-1.414zM13.707 1.293a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-1.414-1.414l9-9a1 1 0 0 1 1.414 0z"/>
        <path d="M1 4a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1zm0 8a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1z"/>
      </svg>
      Google Play
    </a>
  );
}
