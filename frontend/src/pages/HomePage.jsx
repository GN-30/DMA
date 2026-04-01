import React from "react";
import HeroSection from "../../components/HeroSection";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      {/* Quick nav cards */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            Explore the Project
          </motion.h2>
          <p className="text-gray-500 mb-12 max-w-xl mx-auto">
            Navigate to different sections of the Student Engagement Prediction system.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                to: "/features",
                icon: "🌳",
                title: "Features & CART",
                desc: "Discover the model features and how the CART algorithm works.",
                gradient: "from-indigo-500 to-purple-600",
              },
              {
                to: "/predict",
                icon: "🚀",
                title: "Predict Now",
                desc: "Enter student data and get an instant engagement prediction.",
                gradient: "from-green-500 to-emerald-600",
              },
              {
                to: "/insights",
                icon: "📊",
                title: "Data Insights",
                desc: "View charts on engagement distribution and feature importance.",
                gradient: "from-orange-500 to-rose-500",
              },
            ].map((card) => (
              <motion.div
                key={card.to}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-2xl mb-5 shadow-md mx-auto`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm mb-6">{card.desc}</p>
                <Link
                  to={card.to}
                  className={`inline-block bg-gradient-to-r ${card.gradient} text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity`}
                >
                  Go →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
