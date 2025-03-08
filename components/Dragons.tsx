// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import { useEffect, useState, useRef } from "react";

// export function Dragons() {
//   const dragons = [
//     { name: "Deadly Nadder", src: "/images/dragon1.jpg" },
//     { name: "Monstrous Nightmare", src: "/images/dragon2.jpg" },
//     { name: "Stormcutter", src: "/images/dragon3.jpg" },
//     { name: "Hideous Zippleback", src: "/images/dragon4.jpg" },
//     { name: "Skrill", src: "/images/dragon5.png" },
//     { name: "Dragonfly", src: "/images/dragon6.png" },
//     { name: "Abyssal Lurker", src: "/images/dragon7.png" },
//     { name: "Giant Croc", src: "/images/dragon8.jpg" },
//     { name: "Giant Squid", src: "/images/dragon9.jpg" },
//   ];

//   const carouselRef = useRef(null);
//   const [speed, setSpeed] = useState(20); // Default Speed

//   // Slow down when hovering
//   const handleMouseEnter = () => setSpeed(50);
//   const handleMouseLeave = () => setSpeed(20);

//   return (
//     <section
//       id="dragons"
//       className="p-12 text-center dark:bg-slate-900 bg-white"
//     >
//       <div className="max-w-full mx-auto">
//         <h2 className="text-4xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wide">
//           🐉 Other Powerful Dragons
//         </h2>
//         <p className="mt-4 dark:text-slate-400 text-slate-600 mx-auto">
//           Aside from the Night Fury and the Alphas, many other dragons have
//           their own unique strengths.
//         </p>

//         {/* CIRCULAR MOTION CAROUSEL */}
//         <div className="mt-8 overflow-hidden relative">
//           <motion.div
//             ref={carouselRef}
//             className="flex gap-4 py-4"
//             animate={{ x: ["0%", "-100%"] }} // Moves left continuously
//             transition={{
//               duration: speed, // Controlled by hover
//               ease: "linear",
//               repeat: Infinity, // Infinite loop
//             }}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//             style={{ display: "flex", flexWrap: "nowrap" }}
//           >
//             {/* Circular Loop */}
//             {[...dragons, ...dragons].map((dragon, index) => (
//               <motion.div
//                 key={index}
//                 className="flex-shrink-0"
//                 whileHover={{ scale: 1.05, zIndex: 10 }}
//               >
//                 <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
//                   <Image
//                     src={dragon.src || "/placeholder.svg"}
//                     alt={`${dragon.name} Dragon`}
//                     width={500}
//                     height={400}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold dark:text-emerald-400 text-emerald-600">
//                       ✨ {dragon.name}
//                     </h3>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>

//         {/* DETAILED DESCRIPTIONS */}
//         <div className="mt-12 grid md:grid-cols-2 gap-4">
//           {[
//             {
//               num: "1️⃣",
//               name: "Deadly Nadder",
//               text: "A vibrant dragon with spiky tail projectiles and an impeccable sense of smell.",
//             },
//             {
//               num: "2️⃣",
//               name: "Monstrous Nightmare",
//               text: "A fearsome dragon that can set itself on fire, making it nearly untouchable.",
//             },
//             {
//               num: "3️⃣",
//               name: "Hideous Zippleback",
//               text: "A two-headed dragon, with one head breathing flammable gas and the other igniting it.",
//             },
//             {
//               num: "4️⃣",
//               name: "Stormcutter",
//               text: "A majestic four-winged dragon, intelligent and powerful, known for its grace in flight.",
//             },
//             {
//               num: "5️⃣",
//               name: "Skrill",
//               text: "A lightning dragon that absorbs and redirects electricity, making it one of the most dangerous dragons.",
//             },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className={`bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md text-left ${
//                 item.name === "Skrill" ? "md:col-span-2" : ""
//               }`}
//             >
//               <p className="dark:text-slate-300 text-slate-700">
//                 <span className="font-semibold dark:text-emerald-400 text-emerald-600">
//                   {item.num} {item.name}
//                 </span>{" "}
//                 – {item.text}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {
  FaDragon,
  FaExternalLinkAlt,
  FaFire,
  FaBolt,
  FaShieldAlt,
  FaWind,
} from "react-icons/fa";

// Define dragon types
interface Dragon {
  name: string;
  src: string;
  description: string;
  class: string;
  ability: string;
  link?: string;
}

// Define dragon class type
interface DragonClass {
  name: string;
  description: string;
  icon: JSX.Element;
}

const dragons: Dragon[] = [
  {
    name: "Deadly Nadder",
    src: "/images/dragon1.jpg",
    description:
      "A dazzling dragon with venomous tail spines and a keen sense of smell, capable of pinpointing prey from miles away.",
    class: "Tracker",
    ability: "Spine Shot",
    link: "https://howtotrainyourdragon.fandom.com/wiki/Deadly_Nadder",
  },
  {
    name: "Monstrous Nightmare",
    src: "/images/dragon2.jpg",
    description:
      "A fiery beast that ignites its own body, turning into a living torch to intimidate foes and dominate the skies.",
    class: "Stoker",
    ability: "Self-Ignition",
    link: "https://howtotrainyourdragon.fandom.com/wiki/Monstrous_Nightmare",
  },
  {
    name: "Stormcutter",
    src: "/images/dragon3.jpg",
    description:
      "A regal four-winged marvel, blending grace and power with owl-like agility and razor-sharp talons.",
    class: "Sharp",
    ability: "Tornado Spin",
    link: "https://howtotrainyourdragon.fandom.com/wiki/Stormcutter",
  },
  {
    name: "Hideous Zippleback",
    src: "/images/dragon4.jpg",
    description:
      "A dual-headed enigma—one head spews flammable gas, the other sparks it into explosive flames.",
    class: "Mystery",
    ability: "Gas & Spark",
    link: "https://howtotrainyourdragon.fandom.com/wiki/Hideous_Zippleback",
  },
  {
    name: "Skrill",
    src: "/images/dragon5.png",
    description:
      "A rare electric dragon that channels lightning, striking with precision and ferocity in stormy skies.",
    class: "Strike",
    ability: "Lightning Blast",
    link: "https://howtotrainyourdragon.fandom.com/wiki/Skrill",
  },
  {
    name: "Gronckle",
    src: "/images/dragon6.png",
    description:
      "A sturdy, boulder-like dragon that spits molten lava, built like a tank with unmatched resilience.",
    class: "Boulder",
    ability: "Lava Blast",
    link: "https://howtotrainyourdragon.fandom.com/wiki/Gronckle",
  },
  {
    name: "Timberjack",
    src: "/images/dragon7.png",
    description:
      "A massive dragon with blade-like wings that slice through trees like butter, a silent forest predator.",
    class: "Sharp",
    ability: "Wing Slash",
    link: "https://howtotrainyourdragon.fandom.com/wiki/Timberjack",
  },
];

// Dragon classes data
const dragonClasses: DragonClass[] = [
  {
    name: "Stoker",
    description:
      "Masters of fire, Stoker dragons thrive on heat and flame. They can ignite their bodies or surroundings, like the Monstrous Nightmare, making them fierce combatants.",
    icon: <FaFire className="text-orange-500" />,
  },
  {
    name: "Strike",
    description:
      "Swift and precise, Strike dragons like the Skrill wield devastating power with lightning-fast reflexes, excelling in aerial combat and stormy conditions.",
    icon: <FaBolt className="text-yellow-500" />,
  },
  {
    name: "Boulder",
    description:
      "Built like fortresses, Boulder dragons such as the Gronckle manipulate earth and stone, spitting lava or crafting with unmatched durability.",
    icon: <FaShieldAlt className="text-gray-600" />,
  },
  {
    name: "Tracker",
    description:
      "With heightened senses, Tracker dragons like the Deadly Nadder hunt with precision, using their keen smell and spine shots to track prey across vast distances.",
    icon: <FaWind className="text-teal-500" />,
  },
  {
    name: "Sharp",
    description:
      "Elegant yet deadly, Sharp dragons like the Stormcutter and Timberjack slice through foes with blade-like wings and talons, blending grace with lethality.",
    icon: <FaDragon className="text-emerald-500" />,
  },
  {
    name: "Mystery",
    description:
      "Enigmatic and unpredictable, Mystery dragons like the Hideous Zippleback wield unconventional abilities—dual heads with gas and spark combos confound their enemies.",
    icon: <FaDragon className="text-purple-500" />,
  },
];

// Animation variants
const carouselVariants = {
  animate: {
    x: ["0%", "-50%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 25,
        ease: "linear",
      },
    },
  },
  hover: {
    transition: { duration: 60 }, // Slower on hover
  },
};

const cardVariants = {
  hover: {
    scale: 1.15,
    zIndex: 20,
    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const descCardVariants = {
  hover: {
    scale: 1.03,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

export function Dragons() {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="dragons"
      className="relative min-h-screen py-16 px-6 md:px-12 bg-gradient-to-br from-white to-gray-100 dark:from-slate-900 dark:to-slate-800 text-center overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <FaDragon className="w-64 h-64 mx-auto text-emerald-500 dark:text-emerald-300 animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400 mb-8 flex items-center justify-center gap-3"
        >
          <FaDragon /> Other Powerful Dragons
        </motion.h2>

        {/* Intro Paragraph */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto"
        >
          Beyond the Night Fury’s elusive grace and the Alphas’ commanding
          might, the dragon realm pulses with diverse titans. From fiery Stokers
          to electric Strikes, these dragons wield powers that rival Toothless,
          each a legend in its own right.
        </motion.p>

        {/* Carousel */}
        <div className="mt-12 overflow-hidden relative">
          <motion.div
            ref={carouselRef}
            className="flex gap-6 py-4"
            variants={carouselVariants}
            animate="animate"
            whileHover="hover"
            style={{ display: "flex", flexWrap: "nowrap", width: "200%" }}
          >
            {[...dragons, ...dragons].map((dragon, index) => (
              <motion.div
                key={`${dragon.name}-${index}`}
                variants={cardVariants}
                whileHover="hover"
                className="flex-shrink-0 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group relative"
              >
                <div className="relative">
                  <Image
                    src={dragon.src || "/placeholder.svg"}
                    alt={`${dragon.name} Dragon`}
                    width={500}
                    height={400}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      ✨
                    </span>{" "}
                    {dragon.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {dragon.class} Class
                  </p>
                  {dragon.link && (
                    <Link
                      href={dragon.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:underline transition-all duration-300 group-hover:translate-x-1"
                    >
                      Learn More{" "}
                      <FaExternalLinkAlt className="group-hover:rotate-12 transition-transform duration-300" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Detailed Descriptions */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {dragons.map((dragon, index) => (
            <motion.div
              key={dragon.name}
              variants={descCardVariants}
              whileHover="hover"
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-slate-700 text-left group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="relative z-10">
                <h4 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {index + 1}️⃣
                  </span>{" "}
                  {dragon.name}
                </h4>
                <p className="mt-2 text-slate-700 dark:text-slate-300">
                  {dragon.description}
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <FaFire className="text-orange-500" />{" "}
                  <span className="font-medium">Class:</span> {dragon.class}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <FaBolt className="text-yellow-500" />{" "}
                  <span className="font-medium">Ability:</span> {dragon.ability}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 bg-white dark:bg-slate-800/80 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 group relative overflow-hidden"
        >
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-6 flex items-center justify-center gap-2 relative z-10">
            <FaDragon className="group-hover:scale-110 transition-transform duration-300" />
            Dragon Classes Unveiled
          </h3>

          <div className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto relative z-10">
            <p className="mb-4">
              In the world of "How to Train Your Dragon," dragons are grouped
              into classes based on their unique traits and abilities. These
              classifications, devised by Bork the Bold, reveal the diversity of
              dragonkind—from fiery warriors to cunning hunters—each playing a
              vital role in their ecosystem.
            </p>
          </div>

          {/* Dragon Classes List */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6 relative z-10"
          >
            {dragonClasses.map((dragonClass) => (
              <motion.div
                key={dragonClass.name}
                variants={descCardVariants}
                whileHover="hover"
                className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg border border-gray-200 dark:border-slate-600 group/child relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover/child:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="relative z-10 flex items-start gap-3">
                  <span className="text-2xl group-hover/child:scale-110 transition-transform duration-300">
                    {dragonClass.icon}
                  </span>
                  <div>
                    <h4 className="text-lg font-medium text-emerald-600 dark:text-emerald-400">
                      {dragonClass.name}
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                      {dragonClass.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <Link
            href="https://howtotrainyourdragon.fandom.com/wiki/Dragon_Classes"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline transition-all duration-300 group-hover:translate-x-1 relative z-10"
          >
            Discover Dragon Classes{" "}
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
            Explore More Dragons
          </Link>
        </motion.div>
      </div>
    </section>
  );
}