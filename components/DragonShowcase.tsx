"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AdvancedInfiniteCarousel } from "./ui/advanced-infinite-carousel";
import { InfiniteCarousel } from "./ui/infinite-carousel";
import { FaDragon, FaPlay, FaPause, FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Define Dragon type that extends AdvancedCarouselItem
interface DragonData {
  id: string;
  name: string;
  image: string;
  description: string;
  element: "Shadow" | "Light" | "Ice" | "Lightning" | "Fire" | "Wind";
  rarity: "Legendary" | "Epic" | "Rare";
  dragonClass: string;
  abilities: string[];
  stats: { attack: number; defense: number; speed: number; intelligence: number };
}

// Sample dragon data
const showcaseDragons: DragonData[] = [
  {
    id: "toothless-alpha",
    name: "Toothless (Alpha)",
    image: "/images/toothless_logo.jpg",
    description: "The Alpha Night Fury with enhanced plasma abilities and leadership skills." as string,
    element: "Shadow" as const,
    rarity: "Legendary" as const,
    dragonClass: "Strike",
    abilities: ["Alpha Mode", "Plasma Blast", "Lightning Speed", "Echolocation"],
    stats: { attack: 100, defense: 90, speed: 100, intelligence: 100 }
  },
  {
    id: "light-fury-queen",
    name: "Light Fury Queen",
    image: "/images/night-fury-2.jpg",
    description: "The elegant female counterpart with cloaking abilities and plasma precision." as string,
    element: "Light" as const,
    rarity: "Legendary" as const,
    dragonClass: "Strike",
    abilities: ["Cloaking", "Heat Seeking", "Plasma Precision", "Stealth"],
    stats: { attack: 95, defense: 85, speed: 100, intelligence: 95 }
  },
  {
    id: "bewilderbeast-king",
    name: "Bewilderbeast King",
    image: "/images/dragon8.png",
    description: "The colossal ice dragon that commands all other dragons with its alpha presence." as string,
    element: "Ice" as const,
    rarity: "Legendary" as const,
    dragonClass: "Tidal",
    abilities: ["Alpha Command", "Ice Fortress", "Tidal Wave", "Dragon Control"],
    stats: { attack: 90, defense: 100, speed: 60, intelligence: 100 }
  },
  {
    id: "skrill-storm",
    name: "Skrill Storm",
    image: "/images/dragon5.png",
    description: "A lightning-powered dragon that channels the fury of thunderstorms." as string,
    element: "Lightning" as const,
    rarity: "Epic" as const,
    dragonClass: "Strike",
    abilities: ["Lightning Blast", "Storm Calling", "Electric Shield", "Thunder Roar"],
    stats: { attack: 100, defense: 75, speed: 85, intelligence: 80 }
  },
  {
    id: "monstrous-nightmare-titan",
    name: "Monstrous Nightmare Titan",
    image: "/images/dragon2.jpg",
    description: "A massive fire dragon that can ignite its entire body in flames." as string,
    element: "Fire" as const,
    rarity: "Epic" as const,
    dragonClass: "Stoker",
    abilities: ["Body Ignition", "Fire Storm", "Flame Tornado", "Heat Wave"],
    stats: { attack: 95, defense: 80, speed: 75, intelligence: 70 }
  },
  {
    id: "stormcutter-wind",
    name: "Stormcutter Wind",
    image: "/images/dragon3.jpg",
    description: "A four-winged dragon with owl-like features and incredible aerial agility." as string,
    element: "Wind" as const,
    rarity: "Epic" as const,
    dragonClass: "Sharp",
    abilities: ["Cyclone Wings", "Wind Razor", "Aerial Mastery", "Storm Creation"],
    stats: { attack: 90, defense: 85, speed: 95, intelligence: 85 }
  }
];

export default function DragonShowcase() {
  const [selectedDragon, setSelectedDragon] = useState<DragonData | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentDirection, setCurrentDirection] = useState<"left" | "right">("left");

  const handleDragonClick = (item: any) => {
    // Type assertion since we know this is a DragonData item
    setSelectedDragon(item as DragonData);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleDirection = () => {
    setCurrentDirection(currentDirection === "left" ? "right" : "left");
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaDragon className="inline mr-3 text-emerald-500" />
            Dragon Showcase
          </motion.h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Experience the power and majesty of legendary dragons with our interactive showcase
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <motion.button
            onClick={togglePlayPause}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
            {isPlaying ? "Pause" : "Play"}
          </motion.button>
          
          <motion.button
            onClick={toggleDirection}
            className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentDirection === "left" ? <FaArrowLeft /> : <FaArrowRight />}
            Direction: {currentDirection}
          </motion.button>
        </div>

        {/* Advanced 3D Carousel */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-200">
            3D Dragon Gallery
          </h3>
          <AdvancedInfiniteCarousel
            items={showcaseDragons}
            direction={currentDirection}
            speed={isPlaying ? 25 : 0}
            pauseOnHover={true}
            cardVariant="3d"
            showElementBadge={true}
            showRarityBadge={true}
            showParticles={true}
            show3DEffect={true}
            onItemClick={handleDragonClick}
            className="mb-8"
          />
        </div>

        {/* Circular Showcase */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-200">
            Circular Dragon Showcase
          </h3>
          <AdvancedInfiniteCarousel
            items={showcaseDragons}
            direction="right"
            speed={isPlaying ? 30 : 0}
            pauseOnHover={true}
            cardVariant="circular"
            showElementBadge={true}
            showRarityBadge={true}
            showParticles={true}
            onItemClick={handleDragonClick}
            className="mb-8"
          />
        </div>

        {/* Standard Carousel */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-slate-800 dark:text-slate-200">
            Standard Dragon Cards
          </h3>
          <InfiniteCarousel
            items={showcaseDragons}
            direction={currentDirection}
            speed={isPlaying ? 20 : 0}
            pauseOnHover={true}
            showElementBadge={true}
            showRarityBadge={true}
            className="mb-8"
          />
        </div>

        {/* Dragon Detail Modal */}
        {selectedDragon && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDragon(null)}
          >
            <motion.div
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const dragon = selectedDragon as DragonData;
                return (
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={dragon.image}
                        alt={dragon.name}
                        className="w-48 h-48 object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                        {dragon.name}
                      </h3>
                      <div className="flex gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          dragon.element === "Fire" ? "bg-red-500 text-white" :
                          dragon.element === "Lightning" ? "bg-yellow-500 text-white" :
                          dragon.element === "Ice" ? "bg-blue-500 text-white" :
                          dragon.element === "Shadow" ? "bg-purple-600 text-white" :
                          dragon.element === "Light" ? "bg-yellow-300 text-gray-800" :
                          dragon.element === "Wind" ? "bg-teal-500 text-white" :
                          "bg-gray-500 text-white"
                        }`}>
                          {dragon.element}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          dragon.rarity === "Legendary" ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white" :
                          dragon.rarity === "Epic" ? "bg-purple-500 text-white" :
                          dragon.rarity === "Rare" ? "bg-blue-500 text-white" :
                          "bg-gray-400 text-white"
                        }`}>
                          {dragon.rarity}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-4">
                        {dragon.description}
                      </p>
                      <div className="mb-4">
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Class:</h4>
                        <p className="text-slate-600 dark:text-slate-400">{dragon.dragonClass}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Abilities:</h4>
                        <div className="flex flex-wrap gap-2">
                          {dragon.abilities?.map((ability, index) => (
                            <span
                              key={index}
                              className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full text-sm"
                            >
                              {ability}
                            </span>
                          ))}
                        </div>
                      </div>
                      {dragon.stats && (
                        <div>
                          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Stats:</h4>
                          <div className="space-y-2">
                            {Object.entries(dragon.stats).map(([stat, value]) => (
                              <div key={stat} className="flex justify-between items-center">
                                <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">{stat}</span>
                                <div className="flex-1 mx-3 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${value}%` }}
                                  />
                                </div>
                                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedDragon(null)}
                  className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}