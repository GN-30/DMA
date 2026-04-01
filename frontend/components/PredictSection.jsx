import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fields = [
  { id: "Attendance", label: "Attendance (%)" },
  { id: "LMS_Activity", label: "LMS Logins" },
  { id: "Assignment_Score", label: "Assignment Score" },
  { id: "Quiz_Score", label: "Quiz Score" },
];

const levelConfig = {
  High: { color: "text-green-400", glow: "shadow-green-500/40", emoji: "🟢" },
  Medium: { color: "text-yellow-400", glow: "shadow-yellow-500/40", emoji: "🟡" },
  Low: { color: "text-red-400", glow: "shadow-red-500/40", emoji: "🔴" },
};

export default function PredictSection() {
  const [form, setForm] = useState({
    Attendance: "",
    LMS_Activity: "",
    Assignment_Score: "",
    Quiz_Score: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setError(null);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const payload = {
      Attendance: Number(form.Attendance),
      LMS_Activity: Number(form.LMS_Activity),
      Assignment_Score: Number(form.Assignment_Score),
      Quiz_Score: Number(form.Quiz_Score),
    };

    if (Object.values(payload).some((v) => isNaN(v))) {
      setError("Enter valid numbers in all fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setResult(data);
    } catch (err) {
      setError(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const cfg = result ? levelConfig[result.prediction] : null;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-indigo-900 to-black px-6 py-20">
      <div className="max-w-5xl w-full">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Student Engagement AI
          </h1>
          <p className="text-gray-400 mt-3">
            Predict engagement using CART with real-time insights
          </p>
        </motion.div>

        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl">

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">

              {fields.map((f) => (
                <div key={f.id}>
                  <label className="text-sm text-gray-300 mb-1 block">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type="number"
                    value={form[f.id]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  />
                </div>
              ))}

            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="mt-8 w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg hover:shadow-indigo-500/50 transition"
            >
              {loading ? "Predicting..." : "🚀 Predict Engagement"}
            </motion.button>
          </form>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-red-400 text-center"
              >
                ⚠️ {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {result && cfg && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mt-10 p-8 rounded-2xl bg-black/50 border border-white/20 shadow-xl ${cfg.glow}`}
              >
                <h3 className={`text-2xl font-bold ${cfg.color}`}>
                  {cfg.emoji} {result.prediction} Engagement
                </h3>

                {/* Progress bars */}
                <div className="mt-6 space-y-3">
                  {Object.entries(result.probabilities).map(([label, prob]) => {
                    const pct = Math.round(prob * 100);
                    return (
                      <div key={label}>
                        <div className="flex justify-between text-sm text-gray-300">
                          <span>{label}</span>
                          <span>{pct}%</span>
                        </div>

                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-indigo-400 to-purple-500"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}