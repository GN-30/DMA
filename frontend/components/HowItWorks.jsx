import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Collect Student Data",
    desc: "Gather data on attendance, LMS logins, quiz scores, and assignment scores for each student.",
    icon: "🗂️",
    color: "bg-blue-500",
  },
  {
    num: "02",
    title: "Build the CART Tree",
    desc: "The CART algorithm recursively splits the data using Gini impurity to create binary decision nodes.",
    icon: "🌳",
    color: "bg-purple-500",
  },
  {
    num: "03",
    title: "Classify Engagement",
    desc: "Each student's data travels down the tree until it reaches a leaf node labeled High, Medium, or Low.",
    icon: "🎯",
    color: "bg-green-500",
  },
  {
    num: "04",
    title: "Take Action",
    desc: "Educators can use predictions to intervene early with at-risk students before they disengage.",
    icon: "✅",
    color: "bg-orange-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-widest">
            The Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
            How CART Works
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            CART (Classification and Regression Trees) is a supervised learning algorithm
            that builds a binary tree by finding the best feature splits using Gini impurity —
            making it highly interpretable for educational analytics.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-orange-300 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className={`w-20 h-20 ${step.color} rounded-full flex flex-col items-center justify-center text-white shadow-lg mb-5`}>
                <span className="text-2xl">{step.icon}</span>
              </div>
              <span className="text-xs font-bold text-gray-400 tracking-widest mb-2">{step.num}</span>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CART Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">🔬 Why CART for Student Engagement?</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <span className="font-semibold text-indigo-700">✦ Interpretable</span>
              <p className="mt-1">Decision paths can be explained to educators without requiring ML expertise.</p>
            </div>
            <div>
              <span className="font-semibold text-purple-700">✦ Handles Mixed Data</span>
              <p className="mt-1">Works seamlessly with numerical features like scores and counts.</p>
            </div>
            <div>
              <span className="font-semibold text-green-700">✦ No Normalization Needed</span>
              <p className="mt-1">Tree splits are based on thresholds, not distances — so scaling is unnecessary.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
