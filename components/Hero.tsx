"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { FaDragon, FaExternalLinkAlt } from "react-icons/fa";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useCallback, useMemo, useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { easings } from "../utils/animations";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easings.easeOut } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: easings.easeOut } },
};

const buttonVariants: Variants = {
  hover: { scale: 1.1, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)", transition: { duration: 0.3, ease: easings.easeInOut } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

export function Hero() {
  const [init, setInit] = useState(false);

  // Initialize particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container): Promise<void> => {
    console.log(container);
  }, []);

  const particlesOptions: ISourceOptions = useMemo(() => ({
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: ["#ffffff", "#00ff00", "#ff0000"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        random: true,
      },
      size: {
        value: 3,
        random: true,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "top",
        random: true,
        outModes: {
          default: "out",
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        repulse: {
          distance: 100,
        },
        push: {
          quantity: 4,
        },
      },
    },
  }), []);

  return (
    <section className="relative flex flex-col items-center text-center pt-32 pb-16 px-6 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        {init && (
          <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={particlesOptions}
            className="w-full h-full"
          />
        )}
      </div>

      {/* Dragon Scale Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 z-[1]">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/dragon-scales.svg')] bg-repeat bg-[length:50px_50px]"></div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-7xl font-bold dark:text-emerald-400 text-emerald-600 tracking-tight mb-6"
        >
          <span className="inline-block">🌌</span>{" "}
          <span className="holographic-text text-reveal overflow-hidden whitespace-nowrap">
            Night Fury & The Legends of Dragons
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl dark:text-slate-300 text-slate-700 max-w-3xl leading-relaxed mb-8"
        >
          🔥{" "}
          <span className="dark:text-emerald-400 text-emerald-600 font-semibold">
            Night Fury: The Phantom of the Skies
          </span>{" "}
          <br />
          The Night Fury is a dragon of myth and mystery, known for its incredible
          stealth, intelligence, and power. It is one of the fastest dragons,
          soaring through the skies like a shadow, striking its enemies before
          they even realize its presence.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="#dragons">
            <motion.div variants={buttonVariants} whileHover="hover">
              <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 px-8 py-3 text-lg rounded-lg shadow-lg">
                <FaDragon className="mr-2" />
                Discover the Legend
              </Button>
            </motion.div>
          </Link>
          <Link href="#about">
            <motion.div variants={buttonVariants} whileHover="hover">
              <Button variant="outline" className="px-8 py-3 text-lg rounded-lg">
                <FaExternalLinkAlt className="mr-2" />
                Learn More
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        <motion.div variants={scaleIn} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-purple-600 rounded-xl blur opacity-30 dark:opacity-50 animate-mystical-pulse"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-purple-400 rounded-xl blur-lg opacity-20 animate-glow-pulse"></div>
          <motion.div
            className="relative z-10 overflow-hidden rounded-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/images/ai-generated-7702855_1280.jpg"
              alt="Night Fury in Flight"
              width={960}
              height={540}
              className="rounded-xl shadow-2xl object-cover"
              priority
            />
            {/* Shimmer overlay on hover */}
            <div className="absolute inset-0 scale-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}