import React from "react";
import PredictSection from "../../components/PredictSection";
import Footer from "../../components/Footer";

export default function PredictPage() {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
      <PredictSection />
      <Footer />
    </div>
  );
}
