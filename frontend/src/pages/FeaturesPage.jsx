import React from "react";
import FeaturesSection from "../../components/FeaturesSection";
import HowItWorks from "../../components/HowItWorks";
import Footer from "../../components/Footer";

export default function FeaturesPage() {
  return (
    <div className="pt-16">
      <FeaturesSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}
