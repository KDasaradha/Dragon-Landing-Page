// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Menu, Sun, Moon, Laptop } from "lucide-react";

// type Theme = "dark" | "light" | "system";

// interface NavbarProps {
//   theme: Theme;
//   setTheme: (theme: Theme) => void;
//   sidebarOpen: boolean;
//   setSidebarOpen: (open: boolean) => void;
// }

// export function Navbar({
//   theme,
//   setTheme,
//   sidebarOpen,
//   setSidebarOpen,
// }: NavbarProps) {
//   return (
//     <nav className="flex justify-between items-center p-6 bg-opacity-90 shadow-lg backdrop-blur-sm fixed w-full top-0 z-50 dark:bg-slate-900/90 bg-white/90 border-b border-slate-200 dark:border-slate-800">
//       <Link href="/" className="flex items-center space-x-3">
//         <Image
//           src="/images/dragon.svg.jpg"
//           alt="Night Fury Logo"
//           width={40}
//           height={40}
//           className="h-10 w-10 object-contain"
//         />
//         <span className="text-3xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wider hover:brightness-110 transition">
//           Night Fury
//         </span>
//       </Link>
//       <ul className="hidden md:flex space-x-8 text-lg">
//         {["about", "features", "alphas", "dragons", "contact"].map((item) => (
//           <li key={item}>
//             <a
//               href={`#${item}`}
//               className="dark:hover:text-emerald-400 hover:text-emerald-600 transition-colors"
//             >
//               {item.charAt(0).toUpperCase() + item.slice(1)}
//             </a>
//           </li>
//         ))}
//       </ul>
//       <div className="flex items-center space-x-4">
//         <div className="flex bg-slate-200 dark:bg-slate-800 rounded-full p-1">
//           <button
//             onClick={() => setTheme("light")}
//             className={`p-2 rounded-full transition-colors ${
//               theme === "light"
//                 ? "bg-white text-emerald-500 shadow-sm"
//                 : "text-emerald-400 hover:text-emerald-600 hover:bg-slate-300/50 dark:hover:bg-slate-700/50"
//             }`}
//           >
//             <Sun className="w-5 h-5" />
//           </button>
//           <button
//             onClick={() => setTheme("system")}
//             className={`p-2 rounded-full transition-colors ${
//               theme === "system"
//                 ? "bg-white dark:bg-slate-700 text-blue-500 dark:text-blue-400 shadow-sm"
//                 : "text-blue-400 hover:text-blue-600 hover:bg-slate-300/50 dark:hover:bg-slate-700/50"
//             }`}
//           >
//             <Laptop className="w-5 h-5" />
//           </button>
//           <button
//             onClick={() => setTheme("dark")}
//             className={`p-2 rounded-full transition-colors ${
//               theme === "dark"
//                 ? "bg-slate-700 text-yellow-400 shadow-sm"
//                 : "text-yellow-300 hover:text-yellow-500 hover:bg-slate-300/50 dark:hover:bg-slate-700/50"
//             }`}
//           >
//             <Moon className="w-5 h-5" />
//           </button>
//         </div>
//         <button
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//           className="md:hidden"
//         >
//           <Menu className="w-8 h-8 dark:text-white text-slate-900 hover:text-emerald-400 transition-colors" />
//         </button>
//       </div>
//     </nav>
//   );
// }



"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { easings } from "../utils/animations";
import { Menu, Sun, Moon, Laptop } from "lucide-react";
import { useScrollProgress } from "../hooks/useScrollProgress"; // Custom hook

type Theme = "dark" | "light" | "system";

interface NavbarProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const navVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easings.easeOut } },
};

const linkVariants: Variants = {
  hover: {
    scale: 1.1,
    color: "#10b981",
    transition: { duration: 0.3, ease: easings.easeInOut },
  },
};

const buttonVariants: Variants = {
  hover: { scale: 1.15, transition: { duration: 0.2, ease: easings.easeInOut } },
  tap: { scale: 0.95 },
};

export function Navbar({
  theme,
  setTheme,
  sidebarOpen,
  setSidebarOpen,
}: NavbarProps) {
  const scrollProgress = useScrollProgress();

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-200 dark:border-slate-800"
    >
      {/* Progress Bar */}
      <div
        className="absolute top-0 left-0 h-1 bg-emerald-600"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Logo & Title */}
      <Link href="/" className="flex items-center space-x-3 group">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/images/dragon.svg.jpg"
            alt="Night Fury Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </motion.div>
        <span className="text-2xl md:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider transition-colors duration-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
          Night Fury
        </span>
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-8 text-lg">
        {[
          { id: "about", label: "About" },
          { id: "features", label: "Features" },
          { id: "alphas", label: "Alphas" },
          { id: "dragons", label: "Dragons" },
          { id: "contact", label: "Contact" },
        ].map((item) => (
          <motion.li key={item.id} variants={linkVariants} whileHover="hover">
            <a
              href={`#${item.id}`}
              className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {item.label}
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Theme Toggle & Menu Button */}
      <div className="flex items-center space-x-4">
        <div className="flex bg-slate-200 dark:bg-slate-800 rounded-full p-1 shadow-inner">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setTheme("light")}
            className={`p-2 rounded-full transition-colors duration-300 ${
              theme === "light"
                ? "bg-white text-emerald-600 shadow-md"
                : "text-emerald-400 hover:text-emerald-600 hover:bg-slate-300/50 dark:hover:bg-slate-700/50"
            }`}
            aria-label="Switch to light theme"
          >
            <Sun className="w-5 h-5" />
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setTheme("system")}
            className={`p-2 rounded-full transition-colors duration-300 ${
              theme === "system"
                ? "bg-white dark:bg-slate-700 text-blue-500 dark:text-blue-400 shadow-md"
                : "text-blue-400 hover:text-blue-600 hover:bg-slate-300/50 dark:hover:bg-slate-700/50"
            }`}
            aria-label="Switch to system theme"
          >
            <Laptop className="w-5 h-5" />
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setTheme("dark")}
            className={`p-2 rounded-full transition-colors duration-300 ${
              theme === "dark"
                ? "bg-slate-700 text-yellow-400 shadow-md"
                : "text-yellow-300 hover:text-yellow-500 hover:bg-slate-300/50 dark:hover:bg-slate-700/50"
            }`}
            aria-label="Switch to dark theme"
          >
            <Moon className="w-5 h-5" />
          </motion.button>
        </div>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Toggle sidebar"
          aria-controls="sidebar-menu"
          aria-expanded={sidebarOpen}
        >
          <Menu className="w-8 h-8" />
        </motion.button>
      </div>
    </motion.nav>
  );
}