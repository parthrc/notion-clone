import React from "react";
import HeroSection from "./_components/hero-section";

type Props = {};

export default function LandingPage({}: Props) {
  return (
    <div className="min-h-full flex flex-col dark:bg-[#1f1f1f]">
      <div className="flex flex-col items-center justify-center">
        <HeroSection />
        <HeroSection />
      </div>
    </div>
  );
}
