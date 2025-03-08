// import { Button } from "@/components/ui/button";

// export function Contact() {
//   return (
//     <section
//       id="contact"
//       className="p-12 text-center dark:bg-slate-900 bg-white"
//     >
//       <div className="max-w-full mx-auto">
//         <h2 className="text-4xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wide">
//           Seek the Night Fury
//         </h2>
//         <p className="mt-6 dark:text-slate-300 text-slate-700 text-lg mx-auto">
//           Dare to explore the realm of these legendary beasts? Send your message
//           through the winds to{" "}
//           <a
//             href="mailto:contact@nightfury.com"
//             className="dark:text-emerald-400 text-emerald-600 hover:underline"
//           >
//             contact@nightfury.com
//           </a>. Join the Night Fury Chronicles and uncover the mysteries of the
//           skies!
//         </p>
//       </div>
//     </section>
//   );
// }


"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaEnvelope, FaDragon, FaExternalLinkAlt } from "react-icons/fa";

// Animation variants
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

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export function Contact() {
  return (
    <section
      id="contact"
      className="relative py-16 px-6 md:px-12 bg-gradient-to-br from-white to-gray-100 dark:from-slate-900 dark:to-slate-800 text-center overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <FaDragon className="w-64 h-64 mx-auto text-emerald-500 dark:text-emerald-300 animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Title */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400 mb-8 flex items-center justify-center gap-3"
        >
          <FaDragon /> Seek the Night Fury
        </motion.h2>

        {/* Intro Paragraph */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto"
        >
          Embark on a quest to connect with the elusive Night Fury! Send your
          message soaring through the skies to{" "}
          <a
            href="mailto:contact@nightfury.com"
            className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold transition-colors duration-300"
          >
            contact@nightfury.com
          </a>. Join the ranks of dragon riders, uncover the secrets of Toothless and
          his kin, and become part of the Night Fury Chronicles!
        </motion.p>

        {/* Contact Form / Call to Action */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          {/* Email Button */}
          <motion.div variants={buttonVariants} whileHover="hover">
            <Button
              asChild
              className="px-8 py-4 bg-emerald-600 text-white font-semibold rounded-full shadow-md hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-all duration-300 flex items-center gap-2"
            >
              <a href="mailto:contact@nightfury.com">
                <FaEnvelope /> Send a Message
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.p
            variants={fadeInUp}
            className="text-slate-700 dark:text-slate-300"
          >
            Or follow the Night Fury’s trail across the skies:
          </motion.p>
          <motion.div
            variants={staggerContainer}
            className="flex gap-4 flex-wrap justify-center"
          >
            {[
              {
                name: "HTTYD Official",
                href: "https://www.howtotrainyourdragon.com/",
              },
              {
                name: "Night Fury Wiki",
                href: "https://howtotrainyourdragon.fandom.com/wiki/Night_Fury",
              },
              {
                name: "Dragon Lore",
                href: "https://en.wikipedia.org/wiki/Dragon",
              },
            ].map((link) => (
              <motion.div key={link.name} variants={buttonVariants} whileHover="hover">
                <Button
                  asChild
                  variant="outline"
                  className="px-6 py-2 text-emerald-600 dark:text-emerald-400 border-emerald-600 dark:border-emerald-400 hover:bg-emerald-100 dark:hover:bg-slate-800 transition-all duration-300"
                >
                  <Link href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.name} <FaExternalLinkAlt className="ml-2" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 text-sm text-slate-600 dark:text-slate-400"
        >
          "Fly high, for the Night Fury watches over those who dare to dream."
        </motion.p>
      </div>
    </section>
  );
}