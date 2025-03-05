"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export function Dragons() {
  const dragons = [
    { name: "Deadly Nadder", src: "/images/dragon1.jpg" },
    { name: "Monstrous Nightmare", src: "/images/dragon2.jpg" },
    { name: "Stormcutter", src: "/images/dragon3.jpg" },
    { name: "Hideous Zippleback", src: "/images/dragon4.jpg" },
    { name: "Skrill", src: "/images/dragon5.png" },
    { name: "Dragonfly", src: "/images/dragon6.png" },
    { name: "Abyssal Lurker", src: "/images/dragon7.png" },
    { name: "Giant Croc", src: "/images/dragon8.jpg" },
    { name: "Giant Squid", src: "/images/dragon9.jpg" },
  ];

  const carouselRef = useRef(null);
  const [speed, setSpeed] = useState(20); // Default Speed

  // Slow down when hovering
  const handleMouseEnter = () => setSpeed(50);
  const handleMouseLeave = () => setSpeed(20);

  return (
    <section
      id="dragons"
      className="p-12 text-center dark:bg-slate-900 bg-white"
    >
      <div className="max-w-full mx-auto">
        <h2 className="text-4xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wide">
          🐉 Other Powerful Dragons
        </h2>
        <p className="mt-4 dark:text-slate-400 text-slate-600 mx-auto">
          Aside from the Night Fury and the Alphas, many other dragons have
          their own unique strengths.
        </p>

        {/* CIRCULAR MOTION CAROUSEL */}
        <div className="mt-8 overflow-hidden relative">
          <motion.div
            ref={carouselRef}
            className="flex gap-4 py-4"
            animate={{ x: ["0%", "-100%"] }} // Moves left continuously
            transition={{
              duration: speed, // Controlled by hover
              ease: "linear",
              repeat: Infinity, // Infinite loop
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            {/* Circular Loop */}
            {[...dragons, ...dragons].map((dragon, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0"
                whileHover={{ scale: 1.05, zIndex: 10 }}
              >
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
                  <Image
                    src={dragon.src || "/placeholder.svg"}
                    alt={`${dragon.name} Dragon`}
                    width={500}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold dark:text-emerald-400 text-emerald-600">
                      ✨ {dragon.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* DETAILED DESCRIPTIONS */}
        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {[
            {
              num: "1️⃣",
              name: "Deadly Nadder",
              text: "A vibrant dragon with spiky tail projectiles and an impeccable sense of smell.",
            },
            {
              num: "2️⃣",
              name: "Monstrous Nightmare",
              text: "A fearsome dragon that can set itself on fire, making it nearly untouchable.",
            },
            {
              num: "3️⃣",
              name: "Hideous Zippleback",
              text: "A two-headed dragon, with one head breathing flammable gas and the other igniting it.",
            },
            {
              num: "4️⃣",
              name: "Stormcutter",
              text: "A majestic four-winged dragon, intelligent and powerful, known for its grace in flight.",
            },
            {
              num: "5️⃣",
              name: "Skrill",
              text: "A lightning dragon that absorbs and redirects electricity, making it one of the most dangerous dragons.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md text-left ${
                item.name === "Skrill" ? "md:col-span-2" : ""
              }`}
            >
              <p className="dark:text-slate-300 text-slate-700">
                <span className="font-semibold dark:text-emerald-400 text-emerald-600">
                  {item.num} {item.name}
                </span>{" "}
                – {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
