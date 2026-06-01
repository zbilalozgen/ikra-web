import { Card } from "@/components/ui/card";
import {
  LayoutDashboard,
  Volume2,
  Stars,
  Compass,
  Share2,
  WifiOff,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const features: { Icon: LucideIcon; title: string; description: string }[] = [
  {
    Icon: LayoutDashboard,
    title: "Lock & Home Screen Widgets",
    description:
      "Bring Quranic verses and authentic hadith to your most-viewed screens. Widgets refresh throughout the day, keeping remembrance close without opening an app.",
  },
  {
    Icon: Volume2,
    title: "Multi-Reciter Audio",
    description:
      "Listen to any verse with word-level audio from six renowned reciters. Follow along at your own pace, in your own voice of preference.",
  },
  {
    Icon: Stars,
    title: "Esmaül Hüsna — 99 Names",
    description:
      "Reflect on each of the 99 Names of Allah with their meanings. A companion for daily contemplation, available offline.",
  },
  {
    Icon: Compass,
    title: "Prayer Times & Qibla",
    description:
      "Accurate prayer times based on your location, with a precise qibla compass. No account required.",
  },
  {
    Icon: Share2,
    title: "Shareable Verse Visuals",
    description:
      "Generate beautiful Islamic-motif images for any verse or hadith. Five social templates designed for respectful sharing.",
  },
  {
    Icon: WifiOff,
    title: "Offline-First",
    description:
      "The full Quran, all hadith, and all 99 Names are stored on your device. İkra works without a connection, always.",
  },
];

export default function Features() {
  return (
    <section className="py-section bg-cream">
      <div className="max-w-6xl mx-auto px-screen">
        <h2 className="text-xl font-semibold leading-tight text-navy-800 text-center mb-xl">
          What İkra Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
          {features.map(({ Icon, title, description }) => (
            <Card
              key={title}
              className="bg-surface-card border border-navy-800/10 rounded-lg p-lg ring-0 gap-0 transition-colors duration-fast hover:border-gold-500/30 hover:bg-surface-card-hover"
            >
              <div className="mb-md">
                <Icon className="w-6 h-6 text-gold-500" />
              </div>
              <h3 className="text-xl font-semibold leading-tight text-navy-800 mb-sm">
                {title}
              </h3>
              <p className="text-base leading-relaxed text-navy-800/80">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
