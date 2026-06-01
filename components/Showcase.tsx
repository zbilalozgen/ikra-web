import Image from "next/image";

const screenshots = [
  { src: "/screenshots/01-home-screen.png", alt: "İkra app home screen" },
  {
    src: "/screenshots/02-home-full.png",
    alt: "İkra app home screen — full view",
  },
  { src: "/screenshots/03-deeplink-verse.png", alt: "İkra app verse detail view" },
  {
    src: "/screenshots/04-push-notification.png",
    alt: "İkra app push notification",
  },
];

function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-3xl border-4 border-navy-800/10 shadow-sm overflow-hidden snap-start flex-shrink-0">
      <Image
        src={src}
        alt={alt}
        width={240}
        height={480}
        className="object-cover"
      />
    </div>
  );
}

export default function Showcase() {
  return (
    <section className="py-section">
      <div className="max-w-6xl mx-auto px-screen">
        <h2 className="text-xl font-semibold leading-tight text-navy-800 text-center mb-xl">
          See It in Action
        </h2>
        {/* Mobile: horizontal snap strip (hidden on lg+) — aria-hidden; desktop grid is the accessible copy */}
        <div aria-hidden="true" className="flex overflow-x-auto snap-x snap-mandatory gap-md pb-sm lg:hidden">
          {screenshots.map(({ src, alt }) => (
            <PhoneFrame key={src} src={src} alt={alt} />
          ))}
        </div>
        {/* Desktop: 4-col grid (hidden below lg) */}
        <div className="hidden lg:grid grid-cols-4 gap-md">
          {screenshots.map(({ src, alt }) => (
            <PhoneFrame key={src} src={src} alt={alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
