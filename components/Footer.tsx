// export function Footer() {
//   return (
//     <footer className="p-6 dark:bg-slate-900 bg-slate-100 text-center border-t border-slate-200 dark:border-slate-800">
//       <div className="max-w-full mx-auto">
//         <h3 className="text-xl font-bold dark:text-emerald-400 text-emerald-600">
//           Night Fury Chronicles
//         </h3>
//         <p className="mt-2 dark:text-slate-400 text-slate-600 text-sm">
//           Forged in the fires of legend, soaring through the ages.
//         </p>
//         <ul className="mt-4 flex justify-center space-x-6 text-sm">
//           {["about", "features", "alphas", "dragons", "contact"].map((item) => (
//             <li key={item}>
//               <a
//                 href={`#${item}`}
//                 className="dark:text-slate-400 text-slate-600 dark:hover:text-emerald-400 hover:text-emerald-600"
//               >
//                 {item.charAt(0).toUpperCase() + item.slice(1)}
//               </a>
//             </li>
//           ))}
//         </ul>
//         <p className="mt-4 dark:text-slate-500 text-slate-500 text-xs">
//           © 2025 Night Fury Chronicles. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }



"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaDragon, FaEnvelope, FaExternalLinkAlt } from "react-icons/fa";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const linkVariants = {
  hover: {
    scale: 1.1,
    color: "#10b981", // emerald-600
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export function Footer() {
  return (
    <footer className="relative py-8 px-6 bg-gradient-to-t from-slate-100 to-white dark:from-slate-900 dark:to-slate-800 text-center border-t border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <FaDragon className="w-96 h-96 mx-auto text-emerald-500 dark:text-emerald-300 animate-pulse" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <motion.h3
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2"
        >
          <FaDragon /> Night Fury Chronicles
        </motion.h3>

        {/* Tagline */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-400"
        >
          Forged in the fires of legend, soaring through the skies of time with
          Toothless and kin.
        </motion.p>

        {/* Navigation Links */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 flex flex-wrap justify-center gap-6 text-sm md:text-base"
        >
          {[
            { id: "about", label: "About" },
            { id: "features", label: "Features" },
            { id: "alphas", label: "Alphas" },
            { id: "dragons", label: "Dragons" },
            { id: "contact", label: "Contact" },
          ].map((item) => (
            <motion.li
              key={item.id}
              variants={linkVariants}
              whileHover="hover"
            >
              <a
                href={`#${item.id}`}
                className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300"
              >
                {item.label}
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* External Links & Contact */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 text-sm md:text-base"
        >
          <motion.div variants={linkVariants} whileHover="hover">
            <Link
              href="https://www.howtotrainyourdragon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline transition-all duration-300"
            >
              Official HTTYD <FaExternalLinkAlt />
            </Link>
          </motion.div>
          <motion.div variants={linkVariants} whileHover="hover">
            <Link
              href="https://howtotrainyourdragon.fandom.com/wiki/Night_Fury"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline transition-all duration-300"
            >
              Night Fury Wiki <FaExternalLinkAlt />
            </Link>
          </motion.div>
          <motion.div variants={linkVariants} whileHover="hover">
            <a
              href="mailto:contact@nightfury.com"
              className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline transition-all duration-300"
            >
              <FaEnvelope /> contact@nightfury.com
            </a>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-xs md:text-sm text-slate-500 dark:text-slate-500"
        >
          © {new Date().getFullYear()} Night Fury Chronicles. Crafted with the spirit
          of Berk. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}