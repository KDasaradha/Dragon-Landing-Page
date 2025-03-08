// export function About() {
//   return (
//     <section
//       id="about"
//       className="p-12 dark:bg-slate-900 bg-white text-center relative"
//     >
//       <div className="max-w-full mx-auto">
//         <h2 className="text-4xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wide">
//           🌠 The Legend Lives On
//         </h2>
//         <p className="mt-6 dark:text-slate-300 text-slate-700 mx-auto leading-relaxed text-lg">
//           Dragons symbolize power, mystery, and wisdom. From the Norse tales of
//           fire-breathing serpents to the Eastern guardians of the heavens, their
//           legacy spans millennia. Night Furies, with their majestic yet elusive
//           nature, remain one of the most beloved dragons ever imagined.
//         </p>

//         <div className="mt-8">
//           <h3 className="text-2xl font-semibold dark:text-purple-400 text-purple-600 mb-4">
//             📖 The History & Legends of Dragons
//           </h3>
//           <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 text-left">
//             {[
//               {
//                 title: "Norse Legends",
//                 text: "Vikings believed in great dragons that could destroy worlds or grant unimaginable power.",
//               },
//               {
//                 title: "Eastern Mythology",
//                 text: "In China, dragons symbolize prosperity, fortune, and celestial power. They were believed to control rain, storms, and the elements.",
//               },
//               {
//                 title: "Medieval European Tales",
//                 text: "Western dragons were often depicted as fire-breathing beasts guarding treasures or fighting knights.",
//               },
//               {
//                 title: "The Hidden World",
//                 text: "Some believe dragons still exist in secret, deep underground or in the skies, waiting for the right time to reveal themselves again.",
//               },
//             ].map((item) => (
//               <div
//                 key={item.title}
//                 className="bg-slate-100 dark:bg-slate-700/50 p-6 rounded-lg shadow-md"
//               >
//                 <h4 className="text-xl font-medium dark:text-emerald-400 text-emerald-600 mb-2">
//                   🔹 {item.title}
//                 </h4>
//                 <p className="dark:text-slate-300 text-slate-700">
//                   {item.text}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaDragon, FaExternalLinkAlt } from "react-icons/fa";

// Define types for the legend items
interface LegendItem {
  title: string;
  text: string;
  link?: string;
}

const legends: LegendItem[] = [
  {
    title: "Norse Legends",
    text: "Viking sagas spoke of Jörmungandr, the world-serpent, and Fafnir, a dragon embodying greed and destruction, whose tales inspired awe and fear.",
    link: "https://en.wikipedia.org/wiki/Norse_mythology",
  },
  {
    title: "Eastern Mythology",
    text: "Chinese dragons, or 'Lóng,' are benevolent deities of weather and water, revered as symbols of imperial power and cosmic harmony.",
    link: "https://en.wikipedia.org/wiki/Chinese_dragon",
  },
  {
    title: "Medieval European Tales",
    text: "Knights battled fire-breathing wyrms like Smaug, guarding hoards of gold, symbolizing chaos that only the brave could conquer.",
    link: "https://en.wikipedia.org/wiki/European_dragon",
  },
  {
    title: "Night Furies",
    text: "Inspired by 'How to Train Your Dragon,' Night Furies like Toothless are rare, intelligent, and swift, blending mystery with loyalty.",
    link: "https://howtotrainyourdragon.fandom.com/wiki/Night_Fury",
  },
];

export function About() {
  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="about"
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
          <FaDragon /> The Legend Lives On
        </motion.h2>

        {/* Intro Paragraph */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto"
        >
          Dragons ignite imaginations with their power, mystery, and wisdom. From
          ancient Norse serpents to celestial Eastern guardians, their legacy
          endures. The Night Fury, a sleek and elusive marvel from the "How to
          Train Your Dragon" saga, embodies the perfect fusion of ferocity and
          heart.
        </motion.p>

        {/* Legends Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-3xl font-semibold text-purple-600 dark:text-purple-400 mb-8">
            📖 Dragon Lore & Night Fury Chronicles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {legends.map((item) => (
              <motion.div
                key={item.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="relative bg-white dark:bg-slate-800/80 p-6 rounded-xl shadow-md border border-gray-200 dark:border-slate-700 overflow-hidden"
              >
                {/* Subtle Overlay on Hover */}
                <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <h4 className="text-xl font-medium text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2 relative z-10">
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                    🔥
                  </span>{" "}
                  {item.title}
                </h4>
                <p className="text-slate-700 dark:text-slate-300 relative z-10">
                  {item.text}
                </p>
                {item.link && (
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:underline transition-all duration-300 group-hover:translate-x-1 relative z-10"
                  >
                    Learn More <FaExternalLinkAlt className="group-hover:rotate-12 transition-transform duration-300" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
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
            Explore the World of Dragons
          </Link>
        </motion.div>
      </div>
    </section>
  );
}