export function AppStoreBadge() {
  return (
    <>
      {/* TODO(launch): fill App Store URL */}
      <a
        href="#"
        aria-label="Download on the App Store"
        className="inline-flex items-center justify-center min-h-touch transition-opacity duration-fast hover:opacity-90"
      >
        <svg
          width="160"
          height="48"
          viewBox="0 0 160 48"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          {/* Black rounded rectangle background */}
          <rect width="160" height="48" rx="8" ry="8" fill="#000000" />
          <rect
            x="0.5"
            y="0.5"
            width="159"
            height="47"
            rx="7.5"
            ry="7.5"
            fill="none"
            stroke="#A6A6A6"
            strokeWidth="0.5"
          />
          {/* Apple logo glyph */}
          <path
            d="M31.8 14.6c-1.5 0-2.9.6-4 1.6-1.9-2-4.9-2.5-7.3-.9-1.6 1-2.6 2.8-2.6 4.7 0 4.6 2.7 9.1 5.4 11.8.9.9 2.1 1.4 3.4 1.3.8-.03 1.5-.28 2.1-.67.6.39 1.3.64 2.1.67 1.3.07 2.5-.44 3.4-1.33 2.7-2.67 5.4-7.17 5.4-11.8-.03-2.97-2.47-5.37-5.43-5.37h-.57zm-1.2-3.4c.2-1.3 1-2.4 2.1-3.1-.7-.9-1.8-1.4-3-1.4-.3 2.1.9 4.1 2.6 5 .1-.17.2-.33.3-.5z"
            fill="#FFFFFF"
          />
          {/* "Download on the" text */}
          <text
            x="47"
            y="20"
            fontFamily="-apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontSize="10"
            fill="#FFFFFF"
            letterSpacing="0.2"
          >
            Download on the
          </text>
          {/* "App Store" text */}
          <text
            x="47"
            y="35"
            fontFamily="-apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontSize="18"
            fontWeight="600"
            fill="#FFFFFF"
            letterSpacing="-0.3"
          >
            App Store
          </text>
        </svg>
      </a>
    </>
  );
}

export function GooglePlayBadge() {
  return (
    <>
      {/* TODO(launch): fill Google Play URL */}
      <a
        href="#"
        aria-label="Get it on Google Play"
        className="inline-flex items-center justify-center min-h-touch transition-opacity duration-fast hover:opacity-90"
      >
        <svg
          width="160"
          height="48"
          viewBox="0 0 160 48"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          {/* Black rounded rectangle background */}
          <rect width="160" height="48" rx="8" ry="8" fill="#000000" />
          <rect
            x="0.5"
            y="0.5"
            width="159"
            height="47"
            rx="7.5"
            ry="7.5"
            fill="none"
            stroke="#A6A6A6"
            strokeWidth="0.5"
          />
          {/* Google Play triangle icon (simplified official shape) */}
          <path d="M13 10.5L27 24L13 37.5V10.5z" fill="#EA4335" />
          <path d="M13 10.5L27 24L33.5 17.5L19 9.5L13 10.5z" fill="#FBBC04" />
          <path d="M13 37.5L27 24L33.5 30.5L19 38.5L13 37.5z" fill="#34A853" />
          <path d="M27 24L33.5 17.5L37 21L33.5 30.5L27 24z" fill="#4285F4" />
          {/* "GET IT ON" text */}
          <text
            x="47"
            y="20"
            fontFamily="-apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontSize="9"
            fill="#FFFFFF"
            letterSpacing="1.5"
          >
            GET IT ON
          </text>
          {/* "Google Play" text */}
          <text
            x="47"
            y="35"
            fontFamily="-apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontSize="17"
            fontWeight="500"
            fill="#FFFFFF"
            letterSpacing="-0.2"
          >
            Google Play
          </text>
        </svg>
      </a>
    </>
  );
}
