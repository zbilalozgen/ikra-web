import { ImageResponse } from "next/og";

export const alt = "İkra — Quran Verses & Sahih Hadith Widget App";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Fetch Inter Bold for Satori font rendering.
  // Must be woff (v1) — Satori does not support woff2.
  let interBoldData: ArrayBuffer | undefined;
  try {
    const interRes = await fetch(
      new URL("https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Bold.woff", import.meta.url)
    );
    if (interRes.ok) {
      interBoldData = await interRes.arrayBuffer();
    }
  } catch {
    // Fall back to Satori default sans-serif if fetch fails
  }

  // Fetch watermark glyph and encode as base64 data URI for Satori compatibility
  let watermarkSrc: string | null = null;
  try {
    const watermarkRes = await fetch(
      new URL("../public/watermark-glyph.png", import.meta.url)
    );
    if (watermarkRes.ok) {
      const buffer = await watermarkRes.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      watermarkSrc = `data:image/png;base64,${base64}`;
    }
  } catch {
    // Watermark is decorative; silently skip if unavailable
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#006B3F",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Watermark glyph — top-right corner, subtle */}
        {watermarkSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={watermarkSrc}
            width={320}
            height={320}
            alt=""
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              opacity: 0.10,
            }}
          />
        )}

        {/* İkra wordmark */}
        <div
          style={{
            fontSize: 144,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: -2,
            lineHeight: 1,
            fontFamily: "Inter",
          }}
        >
          İkra
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 400,
            color: "#F2F2F7",
            marginTop: 24,
            opacity: 0.9,
            fontFamily: "Inter",
          }}
        >
          Quran Verses & Sahih Hadith Widget App
        </div>
      </div>
    ),
    {
      ...size,
      ...(interBoldData
        ? {
            fonts: [
              {
                name: "Inter",
                data: interBoldData,
                weight: 700 as const,
                style: "normal" as const,
              },
            ],
          }
        : {}),
    }
  );
}
