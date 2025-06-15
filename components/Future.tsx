// export function Future() {
//   return (
//     <section className="p-12 dark:bg-slate-900 bg-white text-center">
//       <div className="max-w-full mx-auto">
//         <h2 className="text-4xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wide">
//           🌟 The Future of Dragons
//         </h2>
//         <p className="mt-6 dark:text-slate-300 text-slate-700 text-lg">
//           The legend of dragons continues to grow, inspiring stories, movies,
//           and cultures. The Night Fury remains an icon of mystery, strength, and
//           loyalty, while Alpha dragons represent leadership and power.
//         </p>
//         <div className="mt-8 bg-slate-100 dark:bg-slate-700 p-8 rounded-lg shadow-lg">
//           <p className="text-xl italic dark:text-slate-200 text-slate-800">
//             💭 What if dragons were real? Would you befriend one, or would you
//             fear them? 🚀🐉
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaDragon, FaExternalLinkAlt, FaRocket } from "react-icons/fa";
import { easings } from "../utils/animations";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easings.easeOut } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hover: {
    scale: 1.03,
    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3, ease: easings.easeInOut },
  },
};

export function Future() {
  return (
    <section
      id="future"
      className="relative min-h-screen py-16 px-6 md:px-12 bg-gradient-to-br from-white to-gray-100 dark:from-slate-900 dark:to-slate-800 text-center overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <FaDragon className="w-64 h-64 mx-auto text-emerald-500 dark:text-emerald-300 animate-pulse" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400 mb-8 flex items-center justify-center gap-3"
        >
          <FaDragon /> The Future of Dragons
        </motion.h2>

        {/* Intro Paragraph */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto"
        >
          The legacy of dragons soars beyond myth, igniting imaginations in stories,
          films, and cultures worldwide. The Night Fury, with its enigma and valor,
          remains a timeless symbol of unity and strength, while Alpha dragons
          embody the raw power of leadership shaping destinies.
        </motion.p>

        {/* Thought-Provoking Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true }}
          className="mt-12 bg-white dark:bg-slate-800/80 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <p className="text-xl md:text-2xl italic text-slate-800 dark:text-slate-200 relative z-10 flex items-center justify-center gap-3">
            <FaRocket className="group-hover:scale-110 transition-transform duration-300" />
            What if dragons soared among us today? Would you forge a bond with a
            Night Fury like Toothless, or stand in awe of an Alpha’s might?
            <FaDragon className="group-hover:scale-110 transition-transform duration-300" />
          </p>
        </motion.div>

        {/* Future Visions */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {[
            {
              title: "Dragons in Technology",
              text: "Imagine bio-inspired drones modeled after the Night Fury’s stealth and speed, or AI systems mimicking their superior intelligence for exploration.",
              link: "https://en.wikipedia.org/wiki/Biomimicry",
            },
            {
              title: "Cultural Evolution",
              text: "The Night Fury’s legacy fuels modern tales, from VR adventures to cinematic epics, keeping dragon lore alive in a digital age.",
              link: "https://howtotrainyourdragon.fandom.com/wiki/Night_Fury",
            },
          ].map((vision) => (
            <motion.div
              key={vision.title}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white dark:bg-slate-800/80 p-6 rounded-xl shadow-md border border-gray-200 dark:border-slate-700 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3 relative z-10 flex items-center gap-2">
                <span className="group-hover:scale-110 transition-transform duration-300">
                  🌌
                </span>{" "}
                {vision.title}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 relative z-10">
                {vision.text}
              </p>
              <Link
                href={vision.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:underline transition-all duration-300 group-hover:translate-x-1 relative z-10"
              >
                Explore More <FaExternalLinkAlt className="group-hover:rotate-12 transition-transform duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12"
        >
          <Link
            href="https://www.howtotrainyourdragon.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-emerald-600 text-white font-semibold rounded-full shadow-md hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-all duration-300 hover:scale-105"
          >
            Soar into the Future
          </Link>
        </motion.div>
      </div>
    </section>
  );
}