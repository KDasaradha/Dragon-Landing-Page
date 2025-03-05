"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed inset-0 bg-slate-900 bg-opacity-95 flex flex-col p-6 space-y-6 z-50"
        >
          <button
            onClick={() => setSidebarOpen(false)}
            className="self-end text-3xl text-white hover:text-emerald-400"
          >
            ×
          </button>
          {["about", "features", "alphas", "dragons", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setSidebarOpen(false)}
              className="text-xl text-white hover:text-emerald-400 transition-colors"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
