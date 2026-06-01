const stats: { value: string; caption: string | null }[] = [
  { value: "6 Reciters", caption: null },
  { value: "6,236 Verses", caption: null },
  { value: "99 Names", caption: "of Allah" },
  { value: "6 Languages", caption: null },
  { value: "Offline", caption: "Always available" },
  { value: "Free", caption: "Forever" },
];

export default function Stats() {
  return (
    <section className="py-section bg-cream">
      <div className="max-w-6xl mx-auto px-screen">
        <h2 className="text-xl font-semibold leading-tight text-navy-800 text-center mb-xl">
          By the Numbers
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-md">
          {stats.flatMap(({ value, caption }, index) => {
            const tile = (
              <div key={value} className="flex flex-col items-center text-center">
                <span className="text-2xl font-semibold leading-tight text-emerald-600">
                  {value}
                </span>
                {caption && (
                  <span className="text-sm text-navy-800/70 mt-xs">{caption}</span>
                )}
              </div>
            );
            if (index < stats.length - 1) {
              return [
                tile,
                <span
                  key={`dot-${index}`}
                  className="text-gold-500 select-none text-xl"
                  aria-hidden="true"
                >
                  ·
                </span>,
              ];
            }
            return [tile];
          })}
        </div>
      </div>
    </section>
  );
}
