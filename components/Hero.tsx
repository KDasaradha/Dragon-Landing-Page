// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";

// export function Hero() {
//   return (
//     <section className="flex flex-col items-center text-center pt-32 pb-16 px-6 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden">
//       <div className="absolute inset-0 opacity-10 dark:opacity-20">
//         <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/dragon-scales.svg')] bg-repeat bg-[length:50px_50px]"></div>
//       </div>
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="text-5xl md:text-7xl font-bold dark:text-emerald-400 text-emerald-600 tracking-tight z-10"
//       >
//         🌌 Night Fury & The Legends of Dragons
//       </motion.h1>
//       <p className="mt-6 text-lg md:text-xl dark:text-slate-300 text-slate-700 max-w-3xl leading-relaxed z-10">
//         🔥{" "}
//         <span className="dark:text-emerald-400 text-emerald-600">
//           Night Fury: The Phantom of the Skies
//         </span>{" "}
//         <br />
//         The Night Fury is a dragon of myth and mystery, known for its incredible
//         stealth, intelligence, and power. It is one of the fastest dragons,
//         soaring through the skies like a shadow, striking its enemies before
//         they even realize its presence.
//       </p>
//       <Button className="mt-8 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 px-8 py-3 text-lg rounded-lg shadow-lg transform hover:scale-105 transition-transform z-10">
//         Discover the Legend
//       </Button>
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 2 }}
//         className="mt-12 z-10 relative"
//       >
//         <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-purple-600 rounded-xl blur opacity-30 dark:opacity-50 animate-pulse"></div>
//         <Image
//           src="/images/ai-generated-7702855_1280.jpg"
//           alt="Night Fury in Flight"
//           width={960}
//           height={540}
//           className="rounded-xl shadow-2xl object-cover relative z-10"
//         />
//       </motion.div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaDragon, FaExternalLinkAlt } from "react-icons/fa";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
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

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center text-center pt-32 pb-16 px-6 bg-gradient-to-b from-slate-50 to-gray-200 dark:from-slate-900 dark:to-slate-950 overflow-hidden min-h-screen"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/dragon-scales.svg')] bg-repeat bg-[length:50px_50px] animate-pulse-slow" />
      </div>
      <div className="absolute inset-0 flex justify-center items-center opacity-5 dark:opacity-10">
        <FaDragon className="w-96 h-96 text-emerald-500 dark:text-emerald-300 animate-spin-slow" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-3"
        >
          <FaDragon /> Night Fury & Dragon Legends
        </motion.h1>

        {/* Subtitle/Intro */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mt-6 text-lg md:text-xl lg:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed"
        >
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            Night Fury: Phantom of the Skies
          </span>{" "}
          <br />
          A creature of myth and marvel, the Night Fury—embodied by Toothless—soars
          with unmatched stealth, speed, and intellect. Striking like a shadow, its
          plasma blasts shatter the silence, leaving legends in its wake.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div variants={buttonVariants} whileHover="hover">
            <Button
              asChild
              className="px-8 py-3 text-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-full shadow-lg transition-all duration-300"
            >
              <Link href="#features">Discover the Legend</Link>
            </Button>
          </motion.div>
          <motion.div variants={buttonVariants} whileHover="hover">
            <Button
              asChild
              variant="outline"
              className="px-8 py-3 text-lg text-emerald-600 dark:text-emerald-400 border-emerald-600 dark:border-emerald-400 hover:bg-emerald-100 dark:hover:bg-slate-800 transition-all duration-300"
            >
              <Link
                href="https://howtotrainyourdragon.fandom.com/wiki/Night_Fury"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore Wiki <FaExternalLinkAlt className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="mt-12 relative"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600 to-purple-600 rounded-xl blur-xl opacity-40 dark:opacity-60 animate-pulse" />
          <div className="relative group">
            <Image
              src="/images/ai-generated-7702855_1280.jpg"
              alt="Night Fury in Flight"
              width={960}
              height={540}
              className="rounded-xl shadow-2xl object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
