import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Showcase from "@/components/Showcase";
import Stats from "@/components/Stats";

export const metadata: Metadata = {
  title: "İkra — Quran Verses & Sahih Hadith Widget App",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Showcase />
      <Stats />
    </>
  );
}
