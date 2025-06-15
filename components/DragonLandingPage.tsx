"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaDragon, 
  FaFire, 
  FaBolt, 
  FaShieldAlt, 
  FaWind, 
  FaEye,
  FaExternalLinkAlt,
  FaSearch,
  FaTimes
} from "react-icons/fa";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { InfiniteCarousel } from "./ui/infinite-carousel";

// Dragon data with proper structure
const nightFuryData = {
  name: "Night Fury: Phantom of the Skies",
  description: "A creature of myth and marvel, the Night Fury—embodied by Toothless—soars with unmatched stealth, speed, and intellect. Striking like a shadow, its plasma blasts shatter the silence, leaving legends in its wake.",
  image: "https://upload.wikimedia.org/wikipedia/en/7/79/Toothless_imitation.png"
};

// Dragon lore data
const dragonLore = [
  {
    id: "norse",
    title: "Norse Legends",
    emoji: "🔥",
    description: "Viking sagas spoke of Jörmungandr, the world-serpent, and Fafnir, a dragon embodying greed and destruction, whose tales inspired awe and fear.",
    link: "#"
  },
  {
    id: "eastern",
    title: "Eastern Mythology", 
    emoji: "🔥",
    description: "Chinese dragons, or 'Lóng,' are benevolent deities of weather and water, revered as symbols of imperial power and cosmic harmony.",
    link: "#"
  },
  {
    id: "medieval",
    title: "Medieval European Tales",
    emoji: "🔥", 
    description: "Knights battled fire-breathing wyrms like Smaug, guarding hoards of gold, symbolizing chaos that only the brave could conquer.",
    link: "#"
  },
  {
    id: "night-furies",
    title: "Night Furies",
    emoji: "🔥",
    description: "Inspired by 'How to Train Your Dragon,' Night Furies like Toothless are rare, intelligent, and swift, blending mystery with loyalty.",
    link: "#"
  }
];

// Night Fury features
const nightFuryFeatures = [
  {
    id: "stealth",
    title: "Stealth & Speed",
    description: "Cloaked in jet-black scales, the Night Fury vanishes into the night, striking with speeds that outpace even the swiftest dragons like the Skrill.",
    icon: <FaWind className="text-blue-500" />
  },
  {
    id: "plasma",
    title: "Plasma Blasts", 
    description: "Eschewing traditional flames, it unleashes concentrated plasma blasts—explosive bursts that can obliterate ships and fortifications in a single strike.",
    icon: <FaBolt className="text-purple-500" />
  },
  {
    id: "flight",
    title: "Silent Flight",
    description: "With whisper-quiet wings, the Night Fury glides undetected, a ghostly predator perfect for ambushing foes under the cover of darkness.",
    icon: <FaDragon className="text-emerald-500" />
  },
  {
    id: "intelligence",
    title: "Superior Intelligence",
    description: "Far beyond brute strength, its sharp mind solves complex problems, forms deep bonds with humans, and even outwits other dragons.",
    icon: <FaEye className="text-amber-500" />
  },
  {
    id: "echolocation",
    title: "Echolocation & Night Vision", 
    description: "Equipped with bat-like echolocation and piercing night vision, the Night Fury navigates pitch-black environments with uncanny precision.",
    icon: <FaFire className="text-red-500" />
  }
];

// Available abilities for filter
const availableAbilities = [
  "Plasma Blasts", "Stealth Flight", "Echolocation", "Alpha Command", "Spine Shot",
  "Magnesium Fire", "Tracking", "Fire Immunity", "Body Ignition", "Intimidation",
  "Gas and Spark", "Coordinated Attack", "Stealth", "Rock Eating", "Lava Blasts", 
  "Boulder Projectiles"
];

// Powerful dragons for carousel
const powerfulDragons = [
  {
    id: "deadly-nadder",
    name: "Deadly Nadder",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    description: "A dazzling dragon with venomous tail spines and a keen sense of smell."
  },
  {
    id: "monstrous-nightmare", 
    name: "Monstrous Nightmare",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop",
    description: "A fiery beast that ignites its own body, turning into a living torch."
  },
  {
    id: "stormcutter",
    name: "Stormcutter", 
    image: "https://images.unsplash.com/photo-1574521046775-4de01e6cded5?w=400&h=300&fit=crop",
    description: "A regal four-winged marvel, blending grace and power."
  },
  {
    id: "hideous-zippleback",
    name: "Hideous Zippleback",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop", 
    description: "A dual-headed enigma with gas and spark abilities."
  },
  {
    id: "skrill",
    name: "Skrill",
    image: "https://images.unsplash.com/photo-1574521046775-4de01e6cded5?w=400&h=300&fit=crop",
    description: "A rare electric dragon that channels lightning."
  },
  {
    id: "gronckle", 
    name: "Gronckle",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop",
    description: "A sturdy, boulder-like dragon that spits molten lava."
  }
];

export default function DragonLandingPage() {
  const [selectedAbilities, setSelectedAbilities] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedRarity, setSelectedRarity] = useState("all");

  const toggleAbility = (ability: string) => {
    setSelectedAbilities(prev => 
      prev.includes(ability) 
        ? prev.filter(a => a !== ability)
        : [...prev, ability]
    );
  };

  const clearFilters = () => {
    setSelectedAbilities([]);
    setSearchTerm("");
    setSelectedType("all");
    setSelectedRarity("all");
  };

  const hasActiveFilters = selectedAbilities.length > 0 || searchTerm || selectedType !== "all" || selectedRarity !== "all";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-bold mb-8"
          >
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Night Fury
            </span>{" "}
            <span className="text-white">& Dragon Legends</span>
          </motion.h1>

          {/* Night Fury Image */}
          <motion.img
            src={nightFuryData.image}
            alt="Night Fury"
            className="w-64 h-64 mx-auto mb-8 rounded-full shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto"
          >
            {nightFuryData.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg">
              Discover the Legend
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
              Explore Wiki <FaExternalLinkAlt className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Dragon Lore Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-6">
              The Legend Lives On
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
              Dragons ignite imaginations with their power, mystery, and wisdom. From ancient Norse serpents to celestial Eastern guardians, 
              their legacy endures. The Night Fury, a sleek and elusive marvel from the "How to Train Your Dragon" saga, embodies the perfect 
              fusion of ferocity and heart.
            </p>
          </motion.div>

          <h3 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-200 mb-8">
            📖 Dragon Lore & Night Fury Chronicles
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dragonLore.map((lore, index) => (
              <motion.div
                key={lore.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{lore.emoji}</div>
                <h4 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                  {lore.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {lore.description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Night Fury Features */}
      <section className="py-20 px-6 bg-slate-100 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-6">
              Features & Abilities of the Night Fury
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
              The Night Fury, exemplified by Toothless, stands as a pinnacle of dragonkind. Its rare blend of stealth, 
              power, and intellect makes it a legend among the skies, unmatched by any other species.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nightFuryFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {feature.description}
                </p>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">The Night Fury's Legacy</h3>
              <p className="text-lg mb-6">
                Known as the "unholy offspring of lightning and death," the Night Fury's abilities set it apart as a Strike Class legend. 
                Its bond with Hiccup redefined human-dragon relations, proving intellect and heart can triumph over brute force.
              </p>
              <Button size="lg" variant="secondary">
                Explore Night Fury Lore
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dragon Search & Filter */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-slate-800 dark:text-slate-200 mb-12"
          >
            Dive into the Night Fury World
          </motion.h2>

          {/* Search and Filter UI */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <FaSearch className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Dragon Search & Filter
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Type Filter */}
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              >
                <option value="all">All Types</option>
                <option value="strike">Strike Class</option>
                <option value="stoker">Stoker Class</option>
                <option value="boulder">Boulder Class</option>
              </select>

              {/* Rarity Filter */}
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              >
                <option value="all">All Rarities</option>
                <option value="common">Common</option>
                <option value="rare">Rare</option>
                <option value="legendary">Legendary</option>
              </select>

              {/* Clear Filters */}
              <Button
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FaTimes className="w-4 h-4" />
                Clear Filters
              </Button>
            </div>

            {/* Ability Filters */}
            <div className="mb-4">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Filter by Abilities:
              </p>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {availableAbilities.map(ability => (
                  <Button
                    key={ability}
                    onClick={() => toggleAbility(ability)}
                    size="sm"
                    variant={selectedAbilities.includes(ability) ? "default" : "outline"}
                    className={`text-xs transition-all duration-200 ${
                      selectedAbilities.includes(ability) 
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md" 
                        : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700"
                    }`}
                  >
                    {ability}
                  </Button>
                ))}
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="border-t pt-4">
                <div className="flex flex-wrap gap-2 items-center mb-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Active filters:</span>
                  {selectedType !== "all" && (
                    <Badge variant="secondary">Type: {selectedType}</Badge>
                  )}
                  {selectedRarity !== "all" && (
                    <Badge variant="secondary">Rarity: {selectedRarity}</Badge>
                  )}
                  {selectedAbilities.map(ability => (
                    <Badge key={ability} variant="secondary">
                      Ability: {ability}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Other Powerful Dragons with Carousels */}
      <section className="py-20 px-6 bg-slate-100 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center justify-center gap-3">
              <FaDragon className="text-emerald-600 dark:text-emerald-400" />
              Other Powerful Dragons
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
              Beyond the Night Fury's grace, these dragons wield powers that rival Toothless
            </p>
          </motion.div>

          {/* Infinite Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <InfiniteCarousel 
              items={powerfulDragons}
              direction="left"
              speed={30}
              pauseOnHover={true}
              className="mb-8"
              cardVariant="default"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}