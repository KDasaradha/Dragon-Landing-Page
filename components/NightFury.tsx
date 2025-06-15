// "use client";

// import React, { useCallback } from "react";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
// import type { Engine } from "tsparticles-engine";


// const NightFury: React.FC = () => {
//   const particlesInit = useCallback(async (engine: Engine) => {
//     await loadFull(engine);
//   }, []);

//   return (
//     <div className="relative flex flex-col items-center justify-center h-screen bg-black text-white overflow-hidden">
//       {/* Background Particles */}
//       <Particles
//         id="tsparticles"
//         init={particlesInit}
//         options={{
//           fullScreen: { enable: true, zIndex: -1 },
//           particles: {
//             number: { value: 150 },
//             color: { value: "#00ccff" },
//             shape: { type: "circle" },
//             opacity: { value: 0.7, random: true },
//             size: { value: 3, random: true },
//             move: { enable: true, speed: 2, direction: "none", outModes: "out" },
//             links: { enable: true, color: "#00ccff", distance: 200, opacity: 0.5 },
//           },
//           interactivity: {
//             events: {
//               onHover: { enable: true, mode: "repulse" },
//               onClick: { enable: true, mode: "push" },
//             },
//           },
//         }}
//       />

//       {/* Night Fury Title */}
//       <h1 className="text-5xl md:text-7xl font-bold neon-text mt-10">The Night Fury</h1>

//       {/* Night Fury Particle-Based Image */}
//       <Particles
//         id="night-fury-particles"
//         init={particlesInit}
//         options={{
//           particles: {
//             number: { value: 250 },
//             shape: {
//               type: "image",
//               image: {
//                 src: "/images/night-fury.png",
//                 width: 200,
//                 height: 200,
//               },
//             },
//             size: { value: 10, random: true },
//             opacity: { value: 1, random: false },
//             move: { enable: true, speed: 1, direction: "none", outModes: "out" },
//           },
//         }}
//         className="absolute w-[300px] h-[300px] top-1/2 transform -translate-y-1/2"
//       />
//     </div>
//   );
// };

// export default NightFury;

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const NightFuryEffect = () => {
  const [showLetters, setShowLetters] = useState(false);
  const [highlightText, setHighlightText] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    // Initialize particles engine
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    // Show letters after 2 seconds
    setTimeout(() => setShowLetters(true), 5000);
    
    // Start highlight effect after full text appears
    setTimeout(() => setHighlightText(true), 7500);
  }, []);

  const particleOptions = {
    fullScreen: { enable: true, zIndex: 1 },
    particles: {
        number: { 
        value: 80, 
        density: { 
          enable: true, 
          area: 800 
        } 
      },
      color: { value: ["#00ffcc", "#ff00ff", "#ffcc00", "#ff3333", "#66ff66"] },
      shape: { type: "circle" },
      opacity: { 
        value: 0.8, 
        random: true 
      },
      size: { 
        value: 5, 
        random: true 
      },
      move: { 
        enable: true, 
        speed: 3, 
        direction: "none" as const,
        random: true,
        outModes: "out" as const
      },
      links: { 
        enable: false 
      },
    },
  };

  if (!init) {
    return null;
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black">
      {/* Particles Background */}
      <Particles id="tsparticles" options={particleOptions} />

      {/* Night-Fury Image on Top */}
      <motion.img
        src="https://upload.wikimedia.org/wikipedia/en/7/79/Toothless_imitation.png"
        alt="Night Fury"
        className="absolute top-10 w-64 neon-glow"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      />

      {/* NIGHT-FURY Animated Text */}
      <motion.div
        className="relative text-center text-6xl font-extrabold tracking-wider uppercase mt-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        {"NIGHT-FURY".split("").map((char, index) => (
          <motion.span
            key={index}
            className="text-glow"
            initial={{ opacity: 0, y: -20 }}
            animate={showLetters ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: index * 0.2 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Highlight and Movement Effect */}
      {highlightText && (
        <motion.div
          className="absolute text-6xl font-extrabold uppercase tracking-wider mt-32"
          animate={{
            x: [-10, 10, -10], // Slight side movement
            color: ["#ff0000", "#00ffcc", "#ffff00", "#ff00ff"],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          NIGHT-FURY
        </motion.div>
      )}

      {/* Floating Text Animation */}
      {highlightText && (
        <motion.div
          className="absolute text-6xl font-extrabold uppercase tracking-wider mt-32"
          animate={{
            y: [-5, 5, -5],
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          NIGHT-FURY
        </motion.div>
      )}
    </div>
  );
};

export default NightFuryEffect;
