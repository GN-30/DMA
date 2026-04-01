import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/features" },
  { label: "Insights", to: "/insights" },
  { label: "Predict", to: "/predict" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-white/90 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">SE</span>
          </div>
          <span className={`font-bold text-lg ${scrolled || !isHome ? "text-gray-800" : "text-white"}`}>
            StudentPredict
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`font-medium transition-colors duration-200 ${
                  active
                    ? "text-indigo-600"
                    : scrolled || !isHome
                    ? "text-gray-600 hover:text-indigo-600"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    className="h-0.5 bg-indigo-500 mt-0.5 rounded"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
          <Link
            to="/predict"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-full font-medium shadow-md hover:shadow-indigo-300 hover:shadow-lg transition-all duration-300 text-sm"
          >
            Try Prediction
          </Link>
        </motion.div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled || !isHome ? "bg-gray-700" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled || !isHome ? "bg-gray-700" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 transition-all duration-300 ${scrolled || !isHome ? "bg-gray-700" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 px-6 py-4 flex flex-col gap-4"
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-medium text-left transition-colors ${
                  location.pathname === link.to ? "text-indigo-600" : "text-gray-700 hover:text-indigo-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/predict"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2.5 rounded-xl font-medium text-center text-sm"
            >
              Try Prediction
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
