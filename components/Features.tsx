// import { motion } from "framer-motion";

// export function Features() {
//   const features = [
//     {
//       title: "Stealth & Speed",
//       text: "Its jet-black scales blend into the night sky, making it nearly invisible in darkness. It flies at extreme speeds, rivaling even the fastest dragons.",
//     },
//     {
//       title: "Plasma Blasts",
//       text: "Instead of traditional fire, the Night Fury shoots concentrated plasma blasts that explode on impact, powerful enough to destroy ships and fortresses.",
//     },
//     {
//       title: "Silent Flight",
//       text: "Unlike most dragons that produce loud wing flaps, the Night Fury glides through the air with almost no sound, making it a perfect ambush predator.",
//     },
//     {
//       title: "Superior Intelligence",
//       text: "This dragon is highly intelligent, capable of solving problems, recognizing patterns, and even bonding deeply with humans.",
//     },
//     {
//       title: "Echolocation & Night Vision",
//       text: "The Night Fury has heightened senses, allowing it to navigate in total darkness using echolocation, much like a bat.",
//     },
//   ];

//   return (
//     <section
//       id="features"
//       className="p-12 dark:bg-slate-900 bg-white text-center"
//     >
//       <div className="max-w-full mx-auto">
//         <h2 className="text-4xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wide">
//           ✨ Features & Abilities of the Night Fury
//         </h2>
//         <div className="mt-8 grid md:grid-cols-2 gap-6">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.03 }}
//               transition={{ type: "spring", stiffness: 300 }}
//               className={`bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-left ${
//                 feature.title === "Echolocation & Night Vision"
//                   ? "md:col-span-2"
//                   : ""
//               }`}
//             >
//               <h3 className="text-xl font-semibold dark:text-emerald-400 text-emerald-600 mb-2">
//                 {feature.title === "Stealth & Speed" && "🖤 "}
//                 {feature.title === "Plasma Blasts" && "⚡ "}
//                 {feature.title === "Silent Flight" && "🌙 "}
//                 {feature.title === "Superior Intelligence" && "🧠 "}
//                 {feature.title === "Echolocation & Night Vision" && "🐲 "}
//                 {feature.title}
//               </h3>
//               <p className="dark:text-slate-300 text-slate-700">
//                 {feature.text}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaDragon, FaExternalLinkAlt, FaBolt, FaBrain, FaEye, FaWind, FaFire } from "react-icons/fa";
import { easings } from "../utils/animations";

// Define feature type
interface Feature {
  title: string;
  text: string;
  icon: JSX.Element;
  link?: string;
}

const features: Feature[] = [
  {
    title: "Stealth & Speed",
    text: "Cloaked in jet-black scales, the Night Fury vanishes into the night, striking with speeds that outpace even the swiftest dragons like the Skrill.",
    icon: <FaWind className="text-teal-500" />,
    link: "https://howtotrainyourdragon.fandom.com/wiki/Night_Fury#Speed_and_Stealth",
  },
  {
    title: "Plasma Blasts",
    text: "Eschewing traditional flames, it unleashes concentrated plasma blasts—explosive bursts that can obliterate ships and fortifications in a single strike.",
    icon: <FaBolt className="text-yellow-500" />,
    link: "https://howtotrainyourdragon.fandom.com/wiki/Night_Fury#Plasma_Blast",
  },
  {
    title: "Silent Flight",
    text: "With whisper-quiet wings, the Night Fury glides undetected, a ghostly predator perfect for ambushing foes under the cover of darkness.",
    icon: <FaDragon className="text-emerald-500" />,
    link: "https://howtotrainyourdragon.fandom.com/wiki/Night_Fury#Silent_Flight",
  },
  {
    title: "Superior Intelligence",
    text: "Far beyond brute strength, its sharp mind solves complex problems, forms deep bonds with humans, and even outwits other dragons.",
    icon: <FaBrain className="text-purple-500" />,
    link: "https://howtotrainyourdragon.fandom.com/wiki/Night_Fury#Intelligence",
  },
  {
    title: "Echolocation & Night Vision",
    text: "Equipped with bat-like echolocation and piercing night vision, the Night Fury navigates pitch-black environments with uncanny precision.",
    icon: <FaEye className="text-blue-500" />,
    link: "https://howtotrainyourdragon.fandom.com/wiki/Night_Fury#Echolocation_and_Night_Vision",
  },
];

// Animation variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easings.easeOut },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3, ease: easings.easeInOut },
  },
};

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

export function Features() {
  return (
    <section
      id="features"
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
          <FaDragon /> Features & Abilities of the Night Fury
        </motion.h2>

        {/* Intro Paragraph */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto"
        >
          The Night Fury, exemplified by Toothless, stands as a pinnacle of dragonkind.
          Its rare blend of stealth, power, and intellect makes it a legend among
          the skies, unmatched by any other species.
        </motion.p>

        {/* Features Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className={`relative bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-slate-700 overflow-hidden group ${
                feature.title === "Echolocation & Night Vision" ? "md:col-span-2" : ""
              }`}
            >
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </span>{" "}
                  {feature.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300">{feature.text}</p>
                {feature.link && (
                  <Link
                    href={feature.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:underline transition-all duration-300 group-hover:translate-x-1"
                  >
                    Learn More{" "}
                    <FaExternalLinkAlt className="group-hover:rotate-12 transition-transform duration-300" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 bg-white dark:bg-slate-800/80 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700"
        >
          <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-4 flex items-center justify-center gap-2">
            <FaFire /> The Night Fury’s Legacy
          </h3>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Known as the “unholy offspring of lightning and death,” the Night Fury’s
            abilities set it apart as a Strike Class legend. Its bond with Hiccup
            redefined human-dragon relations, proving intellect and heart can
            triumph over brute force.
          </p>
          <Link
            href="https://howtotrainyourdragon.fandom.com/wiki/Night_Fury"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline transition-all duration-300"
          >
            Explore Night Fury Lore <FaExternalLinkAlt />
          </Link>
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
            Dive into the Night Fury World
          </Link>
        </motion.div>
      </div>
    </section>
  );
}