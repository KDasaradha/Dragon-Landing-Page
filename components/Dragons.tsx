"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FaDragon, FaFire, FaBolt, FaShieldAlt, FaWind, FaEye } from "react-icons/fa";
import { easings } from "../utils/animations";
import { InfiniteCarousel } from "./ui/infinite-carousel";

// Dragon data with enhanced information including elements and rarity
const powerfulDragons = [
  {
    id: "deadly-nadder",
    name: "Deadly Nadder",
    image: "/images/dragon1.jpg",
    description: "A dazzling dragon with venomous tail spines and a keen sense of smell, capable of pinpointing prey from miles away.",
    element: "Fire" as const,
    rarity: "Rare" as const,
  },
  {
    id: "monstrous-nightmare",
    name: "Monstrous Nightmare", 
    image: "/images/dragon2.jpg",
    description: "A fiery beast that ignites its own body, turning into a living torch to intimidate foes and dominate the skies.",
    element: "Fire" as const,
    rarity: "Epic" as const,
  },
  {
    id: "stormcutter",
    name: "Stormcutter",
    image: "/images/dragon3.jpg", 
    description: "A regal four-winged marvel, blending grace and power with owl-like agility and razor-sharp talons.",
    element: "Wind" as const,
    rarity: "Epic" as const,
  },
  {
    id: "hideous-zippleback",
    name: "Hideous Zippleback",
    image: "/images/dragon4.jpg",
    description: "A dual-headed enigma—one head spews flammable gas, the other sparks it into explosive flames.",
    element: "Fire" as const,
    rarity: "Rare" as const,
  },
  {
    id: "skrill",
    name: "Skrill", 
    image: "/images/dragon5.png",
    description: "A rare electric dragon that channels lightning, striking with precision and ferocity in stormy skies.",
    element: "Lightning" as const,
    rarity: "Epic" as const,
  },
  {
    id: "gronckle",
    name: "Gronckle",
    image: "/images/dragon6.png",
    description: "A sturdy, boulder-like dragon that spits molten lava, built like a tank with unmatched resilience.",
    element: "Earth" as const,
    rarity: "Common" as const,
  },
  {
    id: "timberjack",
    name: "Timberjack",
    image: "/images/dragon7.png", 
    description: "A massive dragon with blade-like wings that slice through trees like butter, a silent forest predator.",
    element: "Wind" as const,
    rarity: "Rare" as const,
  },
];

// Legendary dragons for second carousel
const legendaryDragons = [
  {
    id: "bewilderbeast",
    name: "Bewilderbeast",
    image: "/images/dragon8.png",
    description: "The King of Dragons, capable of controlling other dragons with its alpha roar and ice manipulation.",
    element: "Ice" as const,
    rarity: "Legendary" as const,
  },
  {
    id: "red-death",
    name: "Red Death",
    image: "/images/ai-generated-7702855_1280.jpg", 
    description: "A colossal dragon that rules through fear, with multiple eyes and an appetite for destruction.",
    element: "Fire" as const,
    rarity: "Legendary" as const,
  },
  {
    id: "light-fury",
    name: "Light Fury",
    image: "/images/night-fury-2.jpg",
    description: "The female counterpart to Night Furies, with invisibility powers and elegant white scales.",
    element: "Light" as const,
    rarity: "Legendary" as const,
  },
  {
    id: "screaming-death",
    name: "Screaming Death",
    image: "/images/dragon.svg.jpg",
    description: "A massive tunneling dragon with rotating teeth and earth-shaking roars.",
    element: "Earth" as const,
    rarity: "Legendary" as const,
  },
];

// New circular dragons showcase
const circularDragons = [
  {
    id: "night-fury",
    name: "Night Fury",
    image: "/images/night-fury-1.jpg",
    description: "The unholy offspring of lightning and death itself.",
    element: "Shadow" as const,
    rarity: "Legendary" as const,
  },
  {
    id: "toothless",
    name: "Toothless",
    image: "/images/toothless_logo.jpg",
    description: "The last known Night Fury and Hiccup's best friend.",
    element: "Shadow" as const,
    rarity: "Legendary" as const,
  },
  ...powerfulDragons.slice(0, 4), // Add some variety
];

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

export default function Dragons() {
  return (
    <section
      id="dragons"
      className="relative min-h-screen py-16 px-6 md:px-12 bg-gradient-to-br from-white to-gray-100 dark:from-slate-900 dark:to-slate-800 text-center overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <FaDragon className="w-64 h-64 mx-auto text-emerald-500 dark:text-emerald-300 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
          className="mt-6 text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12"
        >
          Beyond the Night Fury's elusive grace, these dragons wield powers that rival Toothless—each a legend in its own right, 
          from fiery Stokers to electric Strikes.
        </motion.p>

        {/* Hero Dragons - Circular Showcase */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center justify-center gap-2">
            <FaDragon className="text-emerald-500" />
            Featured Dragons
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Meet the most iconic dragons from the archipelago, each with unique abilities and legendary status.
          </p>
          <InfiniteCarousel 
            items={circularDragons}
            direction="left"
            speed={35}
            pauseOnHover={true}
            cardVariant="circular"
            showElementBadge={true}
            showRarityBadge={true}
            className="mb-8"
          />
        </motion.div>

        {/* First Carousel - Powerful Dragons */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center justify-center gap-2">
            <FaFire className="text-orange-500" />
            Elite Dragon Classes
          </h3>
          <InfiniteCarousel 
            items={powerfulDragons}
            direction="left"
            speed={25}
            pauseOnHover={true}
            showElementBadge={true}
            className="mb-8"
          />
        </motion.div>

        {/* Second Carousel - Legendary Dragons (Opposite Direction) */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center justify-center gap-2">
            <FaBolt className="text-yellow-500" />
            Legendary Titans
          </h3>
          <InfiniteCarousel 
            items={legendaryDragons}
            direction="right"
            speed={20}
            pauseOnHover={true}
            cardVariant="compact"
            showElementBadge={true}
            showRarityBadge={true}
            className="mb-8"
          />
        </motion.div>

        {/* Dragon Classes Overview */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
        >
          {[
            {
              icon: <FaFire className="text-orange-500" />,
              name: "Stoker Class",
              description: "Masters of fire and heat, capable of igniting their bodies and surroundings.",
              examples: "Monstrous Nightmare, Fireworm"
            },
            {
              icon: <FaBolt className="text-yellow-500" />,
              name: "Strike Class", 
              description: "Swift and precise hunters with devastating attack capabilities.",
              examples: "Night Fury, Skrill, Speed Stinger"
            },
            {
              icon: <FaShieldAlt className="text-gray-600" />,
              name: "Boulder Class",
              description: "Heavily armored dragons with incredible strength and durability.",
              examples: "Gronckle, Catastrophic Quaken"
            },
            {
              icon: <FaWind className="text-teal-500" />,
              name: "Tracker Class",
              description: "Expert hunters with enhanced senses and tracking abilities.",
              examples: "Deadly Nadder, Rumblehorn"
            },
            {
              icon: <FaDragon className="text-emerald-500" />,
              name: "Sharp Class",
              description: "Agile dragons with cutting attacks and aerial superiority.",
              examples: "Stormcutter, Timberjack, Razorwhip"
            },
            {
              icon: <FaEye className="text-purple-500" />,
              name: "Mystery Class",
              description: "Enigmatic dragons with unique and unpredictable abilities.",
              examples: "Hideous Zippleback, Changewing"
            }
          ].map((dragonClass, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">
                  {dragonClass.icon}
                </div>  
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  {dragonClass.name}
                </h4>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-3">
                {dragonClass.description}
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                Examples: {dragonClass.examples}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}