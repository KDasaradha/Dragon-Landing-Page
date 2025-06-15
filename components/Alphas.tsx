// import { motion } from "framer-motion";

// export function Alphas() {
//   const alphas = [
//     {
//       name: "Bewilderbeast",
//       description:
//         "The true King of Dragons, an enormous sea-dragon that breathes ice instead of fire and controls other dragons telepathically.",
//     },
//     {
//       name: "The Red Death",
//       description:
//         "A monstrous, fire-breathing behemoth that controlled dragons through fear and terror.",
//     },
//     {
//       name: "Drago's Bewilderbeast",
//       description:
//         "A corrupted Alpha dragon used as a war beast, capable of freezing entire fleets with its icy breath.",
//     },
//   ];

//   return (
//     <section
//       id="alphas"
//       className="p-12 dark:bg-slate-900 bg-white text-center"
//     >
//       <div className="max-w-full mx-auto">
//         <h2 className="text-4xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wide">
//           👑 Alpha Dragons: The Rulers of the Dragon Kingdom
//         </h2>
//         <p className="mt-4 dark:text-slate-300 text-slate-700 mx-auto">
//           Some dragons hold immense power, ruling over other dragons as their
//           Alpha. These legendary creatures possess abilities that set them apart
//           from all others.
//         </p>

//         <div className="mt-8 grid gap-6">
//           {alphas.map((alpha, index) => (
//             <motion.div
//               key={alpha.name} // Use unique identifier instead of index
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.2 }}
//               className="bg-slate-100 dark:bg-slate-700 p-6 rounded-lg shadow-lg text-left"
//             >
//               <h3 className="text-xl font-semibold dark:text-purple-400 text-purple-600 mb-2">
//                 🔥 {alpha.name}
//               </h3>
//               <p className="dark:text-slate-300 text-slate-700">
//                 {alpha.description}
//               </p>
//             </motion.div>

//           ))}
//         </div>

//         <div className="mt-8 bg-slate-100 dark:bg-slate-700/50 p-6 rounded-lg shadow-md">
//           <h3 className="text-2xl font-semibold dark:text-purple-400 text-purple-600 mb-4">
//             💠 The Role of an Alpha Dragon
//           </h3>
//           <p className="dark:text-slate-300 text-slate-700 text-lg">
//             An Alpha dragon leads others, acting as the protector of the dragon
//             world. They can influence entire species, keeping balance or waging
//             war depending on their nature.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { FaCrown, FaExternalLinkAlt } from "react-icons/fa";
import { easings } from "../utils/animations";

// Define types for alpha dragons
interface AlphaDragon {
  name: string;
  description: string;
  link?: string;
}

const alphas: AlphaDragon[] = [
  {
    name: "Bewilderbeast",
    description:
      "The majestic King of Dragons, this colossal sea-dwelling titan breathes ice instead of fire and commands other dragons with telepathic prowess. A protector or destroyer, depending on its allegiance.",
    link: "https://howtotrainyourdragon.fandom.com/wiki/Bewilderbeast",
  },
  {
    name: "The Red Death",
    description:
      "A grotesque, fire-spewing leviathan, the Red Death ruled through sheer terror, enslaving dragons to feed its insatiable hunger until its defeat by Toothless and Hiccup.",
    link: "https://howtotrainyourdragon.fandom.com/wiki/Red_Death",
  },
  {
    name: "Drago's Bewilderbeast",
    description:
      "Twisted by captivity, this war-hardened Bewilderbeast served Drago Bludvist, freezing fleets and dominating dragons with its chilling might—a tragic shadow of its noble kin.",
    link: "https://howtotrainyourdragon.fandom.com/wiki/Drago%27s_Bewilderbeast",
  },
  {
    name: "Toothless (Night Fury Alpha)",
    description:
      "The last known Night Fury, Toothless ascended to Alpha status after defeating Drago’s Bewilderbeast. With unmatched speed, intelligence, and plasma blasts, he leads with loyalty and compassion.",
    link: "https://howtotrainyourdragon.fandom.com/wiki/Toothless",
  },
  {
    name: "Green Death",
    description:
      "A massive, volcanic dragon from the original book series by Cressida Cowell, the Green Death wielded hypnotic control over lesser dragons, devouring all in its path until challenged by Hiccup.",
    link: "https://howtotrainyourdragon.fandom.com/wiki/Green_Death",
  },
  {
    name: "Foreverwing",
    description:
      "A gentle giant among Alphas, the Foreverwing commands respect with its earth-shaking presence and ability to foster life, creating forests atop its mountainous body.",
    link: "https://howtotrainyourdragon.fandom.com/wiki/Foreverwing",
  },
  {
    name: "Screaming Death",
    description:
      "A rare albino Boulder Class dragon, this ferocious Alpha burrows through rock and unleashes deafening roars to dominate its kin, nearly rivaling the Bewilderbeast in power.",
    link: "https://howtotrainyourdragon.fandom.com/wiki/Screaming_Death",
  },
];

export function Alphas() {
  // Animation variants for cards
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

  // Animation variants for the role section
  const roleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easings.easeOut },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3, ease: easings.easeInOut },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easings.easeOut } },
  };

  return (
    <section
      id="alphas"
      className="relative min-h-screen py-16 px-6 md:px-12 bg-gradient-to-br from-white to-gray-100 dark:from-slate-900 dark:to-slate-800 text-center overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <FaCrown className="w-64 h-64 mx-auto text-emerald-500 dark:text-emerald-300 animate-pulse" />
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
          <FaCrown /> Alpha Dragons: Rulers of the Skies
        </motion.h2>

        {/* Intro Paragraph */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto"
        >
          Alpha dragons reign supreme, wielding unparalleled power over their kin.
          From the icy dominion of the Bewilderbeast to the fiery tyranny of the Red
          Death, these titans shape the dragon world—sometimes clashing with the
          legendary Night Fury, Toothless, who rose to Alpha status himself.
        </motion.p>

        {/* Alpha Dragons List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2"
        >
          {alphas.map((alpha) => (
            <motion.div
              key={alpha.name}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="relative bg-white dark:bg-slate-800/80 p-6 rounded-xl shadow-md border border-gray-200 dark:border-slate-700 overflow-hidden group"
            >
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-2 relative z-10">
                <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                  👑
                </span>{" "}
                {alpha.name}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 relative z-10">
                {alpha.description}
              </p>
              {alpha.link && (
                <Link
                  href={alpha.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:underline transition-all duration-300 group-hover:translate-x-1 relative z-10"
                >
                  Learn More{" "}
                  <FaExternalLinkAlt className="group-hover:rotate-12 transition-transform duration-300" />
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Alpha Role Section */}
        <motion.div
          variants={roleVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true }}
          className="mt-12 bg-white dark:bg-slate-800/80 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden group relative"
        >
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-4 flex items-center justify-center gap-2 relative z-10">
            <span className="transition-transform duration-300 group-hover:scale-110">
              💠
            </span>{" "}
            The Role of an Alpha Dragon
          </h3>
          <div className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto relative z-10">
            <p className="mb-4">
              Alpha dragons are the ultimate leaders of their kind, wielding
              authority through strength, wisdom, or sheer dominance. They maintain
              harmony among dragon species, protect their kin from threats, or—if
              corrupted—enforce tyranny over vast territories.
            </p>
            <p className="mb-4">
              In the "How to Train Your Dragon" saga, the Bewilderbeast exemplifies
              the noble Alpha, using its telepathic influence to safeguard dragons
              in the Hidden World. Conversely, the Red Death ruled through fear,
              hoarding resources and forcing subservience. Toothless, the Night
              Fury, became an Alpha through courage and loyalty, overthrowing
              Drago’s Bewilderbeast in an epic showdown to liberate his kind.
            </p>
            <p>
              Their role isn’t static—Alphas rise and fall through battles of will
              and power, shaping the dragon hierarchy. Whether benevolent or
              malevolent, an Alpha’s presence dictates the fate of all dragons
              under its command.
            </p>
          </div>
          <Link
            href="https://howtotrainyourdragon.fandom.com/wiki/Alpha_Dragon"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline transition-all duration-300 group-hover:translate-x-1 relative z-10"
          >
            Explore Alpha Lore{" "}
            <FaExternalLinkAlt className="group-hover:rotate-12 transition-transform duration-300" />
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
            Dive into Dragon Legends
          </Link>
        </motion.div>
      </div>
    </section>
  );
}