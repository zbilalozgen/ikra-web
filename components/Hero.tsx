import Image from "next/image";
import { AppStoreBadge, GooglePlayBadge } from "@/components/StoreBadges";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-section">
      <div className="max-w-6xl mx-auto px-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
          {/* Left column: copy + badges */}
          <div>
            <h1 className="text-2xl font-semibold leading-tight text-emerald-600">
              Quran Verses & Sahih Hadith on Your Lock Screen
            </h1>
            <p className="text-base leading-relaxed text-navy-800/80 mt-md">
              Authentic verses and Sahih hadith, refreshed throughout the day — quietly present on your home and lock screens.
            </p>
            {/* StoreBadges row */}
            <div className="flex flex-wrap justify-center md:justify-start gap-md mt-xl">
              <AppStoreBadge />
              <GooglePlayBadge />
            </div>
          </div>
          {/* Right column: tilted phone image */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="/screenshots/02-home-full.png"
              alt="İkra app home screen — full view"
              width={280}
              height={560}
              priority
              className="rotate-3 drop-shadow-xl"
            />
          </div>
        </div>
      </div>
      {/* Watermark — absolute positioned within section root */}
      <Image
        src="/watermark-glyph.png"
        alt=""
        width={320}
        height={320}
        aria-hidden="true"
        className="absolute top-0 right-0 opacity-[0.06] pointer-events-none"
      />
    </section>
  );
}
