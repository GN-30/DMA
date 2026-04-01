import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white/60 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">SE</span>
              </div>
              <span className="font-bold text-white text-lg">StudentPredict</span>
            </div>
            <p className="text-sm leading-relaxed">
              A data mining project using CART to predict student engagement
              in blended learning environments.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Technology Stack</h4>
            <ul className="space-y-1 text-sm">
              <li>🐍 Python · Pandas · NumPy</li>
              <li>🤖 Scikit-learn · CART</li>
              <li>⚗️ Flask REST API</li>
              <li>⚛️ React · Vite · Tailwind CSS</li>
              <li>📊 Recharts</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Project Info</h4>
            <ul className="space-y-1 text-sm">
              <li>📁 Algorithm: CART (Gini Impurity)</li>
              <li>🎯 Target: Engagement Level</li>
              <li>📊 Dataset: 1000 student records</li>
              <li>✅ Accuracy: ~75%+</li>
              <li>🏫 Category: Academic / Data Mining</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-sm">
          <p>© 2026 Student Engagement Prediction · Data Mining Project</p>
          <p>Built with React + Flask + CART Algorithm</p>
        </div>
      </div>
    </footer>
  );
}
