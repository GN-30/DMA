import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "📊",
    title: "Multi-Feature Analysis",
    desc: "Analyzes attendance rate, LMS login frequency, assignment scores, and quiz performance as predictive features.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: "🌳",
    title: "CART Decision Tree",
    desc: "Uses Gini impurity-based Classification and Regression Trees (CART) to build interpretable decision rules.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: "⚡",
    title: "Real-Time Prediction",
    desc: "Instantly classify students as High, Medium, or Low engagement after entering their learning metrics.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: "📈",
    title: "Visual Insights",
    desc: "Interactive charts display engagement distribution and feature importance to help educators take action.",
    color: "from-purple-500 to-pink-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Everything you need to understand and predict student engagement in blended learning.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
              className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 cursor-pointer transition-shadow duration-300"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-5 shadow-lg`}>
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
