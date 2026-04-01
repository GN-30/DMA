import React from "react";
// Landing.jsx is no longer the main entry point.
// App.jsx uses react-router-dom directly. This file is kept for reference.
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import ChartSection from "./ChartSection";
import PredictSection from "./PredictSection";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="font-sans antialiased">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <ChartSection />
      <PredictSection />
      <Footer />
    </div>
  );
}
