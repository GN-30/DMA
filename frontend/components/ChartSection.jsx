import React from "react";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

const engagementData = [
  { name: "High", value: 38, color: "#22c55e" },
  { name: "Medium", value: 42, color: "#eab308" },
  { name: "Low", value: 20, color: "#ef4444" },
];

const featureData = [
  { feature: "Attendance", importance: 0.38 },
  { feature: "LMS Activity", importance: 0.22 },
  { feature: "Quiz Score", importance: 0.21 },
  { feature: "Assignment", importance: 0.19 },
];

export default function ChartSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">
            Data Insights
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
            Model Visualizations
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Sample insights from our trained CART model on the student dataset.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl p-8 shadow-md border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-1">Engagement Distribution</h3>
            <p className="text-gray-500 text-sm mb-6">Proportion of students in each engagement category</p>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {engagementData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, "Students"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl p-8 shadow-md border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-1">Feature Importance</h3>
            <p className="text-gray-500 text-sm mb-6">Contribution of each feature to the CART model predictions</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={featureData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" domain={[0, 0.5]} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                <YAxis type="category" dataKey="feature" width={90} tick={{ fontSize: 13 }} />
                <Tooltip formatter={(v) => [`${(v * 100).toFixed(1)}%`, "Importance"]} />
                <Bar dataKey="importance" radius={[0, 8, 8, 0]}>
                  {featureData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={["#6366f1", "#8b5cf6", "#a855f7", "#d946ef"][i]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
