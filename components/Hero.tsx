import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="flex flex-col items-center text-center pt-32 pb-16 px-6 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/dragon-scales.svg')] bg-repeat bg-[length:50px_50px]"></div>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-bold dark:text-emerald-400 text-emerald-600 tracking-tight z-10"
      >
        🌌 Night Fury & The Legends of Dragons
      </motion.h1>
      <p className="mt-6 text-lg md:text-xl dark:text-slate-300 text-slate-700 max-w-3xl leading-relaxed z-10">
        🔥{" "}
        <span className="dark:text-emerald-400 text-emerald-600">
          Night Fury: The Phantom of the Skies
        </span>{" "}
        <br />
        The Night Fury is a dragon of myth and mystery, known for its incredible
        stealth, intelligence, and power. It is one of the fastest dragons,
        soaring through the skies like a shadow, striking its enemies before
        they even realize its presence.
      </p>
      <Button className="mt-8 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 px-8 py-3 text-lg rounded-lg shadow-lg transform hover:scale-105 transition-transform z-10">
        Discover the Legend
      </Button>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="mt-12 z-10 relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-purple-600 rounded-xl blur opacity-30 dark:opacity-50 animate-pulse"></div>
        <Image
          src="/images/ai-generated-7702855_1280.jpg"
          alt="Night Fury in Flight"
          width={960}
          height={540}
          className="rounded-xl shadow-2xl object-cover relative z-10"
        />
      </motion.div>
    </section>
  );
}
