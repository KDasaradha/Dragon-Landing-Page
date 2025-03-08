// "use client";

// import { motion, AnimatePresence } from "framer-motion";

// interface SidebarProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: (open: boolean) => void;
// }

// export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
//   return (
//     <AnimatePresence>
//       {sidebarOpen && (
//         <motion.div
//           initial={{ x: "100%" }}
//           animate={{ x: 0 }}
//           exit={{ x: "100%" }}
//           transition={{ type: "spring", damping: 20 }}
//           className="fixed inset-0 bg-slate-900 bg-opacity-95 flex flex-col p-6 space-y-6 z-50"
//         >
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="self-end text-3xl text-white hover:text-emerald-400"
//           >
//             ×
//           </button>
//           {["about", "features", "alphas", "dragons", "contact"].map((item) => (
//             <a
//               key={item}
//               href={`#${item}`}
//               onClick={() => setSidebarOpen(false)}
//               className="text-xl text-white hover:text-emerald-400 transition-colors"
//             >
//               {item.charAt(0).toUpperCase() + item.slice(1)}
//             </a>
//           ))}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaDragon, FaTimes } from "react-icons/fa";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

// Animation variants
const sidebarVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", damping: 25, stiffness: 120, duration: 0.3 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { type: "spring", damping: 25, stiffness: 120, duration: 0.3 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    color: "#34d399", // emerald-400
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

export function Sidebar({ sidebarOpen, setSidebarOpen }: Readonly<SidebarProps>) {
  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.div
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-900/95 backdrop-blur-md flex flex-col p-6 space-y-8 z-50 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FaDragon className="text-emerald-400 w-8 h-8" />
              <span className="text-2xl font-bold text-emerald-400">Night Fury</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:text-emerald-400 transition-colors duration-300"
              aria-label="Close sidebar"
            >
              <FaTimes className="w-8 h-8" />
            </motion.button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-6 mt-4">
            {[
              { id: "about", label: "About" },
              { id: "features", label: "Features" },
              { id: "alphas", label: "Alphas" },
              { id: "dragons", label: "Dragons" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onClick={() => setSidebarOpen(false)}
                className="text-xl text-white hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2"
              >
                <span className="text-emerald-400">➤</span> {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Footer Note */}
          <motion.p
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            className="text-sm text-slate-400 mt-auto"
          >
            Soar with the Night Fury Chronicles
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}