// src/components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-20 bg-white/70 backdrop-blur-lg border-t border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-emerald-700">Grocify</h2>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            Bringing you fresh groceries at your fingertips. Eat healthy, live
            better.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-gray-800">Quick Links</h3>
          <a href="/" className="text-gray-600 hover:text-emerald-600">
            Home
          </a>
          <a href="/shop" className="text-gray-600 hover:text-emerald-600">
            Store
          </a>
          <a href="/about" className="text-gray-600 hover:text-emerald-600">
            About Us
          </a>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold text-gray-800">Connect</h3>
          <div className="flex space-x-4 mt-3">
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 hover:bg-emerald-100 transition"
            >
              <Facebook className="w-5 h-5 text-gray-600" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 hover:bg-emerald-100 transition"
            >
              <Instagram className="w-5 h-5 text-gray-600" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 hover:bg-emerald-100 transition"
            >
              <Twitter className="w-5 h-5 text-gray-600" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Grocify. All rights reserved.
      </div>
    </motion.footer>
  );
}
