import { motion } from "framer-motion";

export function Features() {
  const features = [
    {
      title: "Stealth & Speed",
      text: "Its jet-black scales blend into the night sky, making it nearly invisible in darkness. It flies at extreme speeds, rivaling even the fastest dragons.",
    },
    {
      title: "Plasma Blasts",
      text: "Instead of traditional fire, the Night Fury shoots concentrated plasma blasts that explode on impact, powerful enough to destroy ships and fortresses.",
    },
    {
      title: "Silent Flight",
      text: "Unlike most dragons that produce loud wing flaps, the Night Fury glides through the air with almost no sound, making it a perfect ambush predator.",
    },
    {
      title: "Superior Intelligence",
      text: "This dragon is highly intelligent, capable of solving problems, recognizing patterns, and even bonding deeply with humans.",
    },
    {
      title: "Echolocation & Night Vision",
      text: "The Night Fury has heightened senses, allowing it to navigate in total darkness using echolocation, much like a bat.",
    },
  ];

  return (
    <section
      id="features"
      className="p-12 dark:bg-slate-900 bg-white text-center"
    >
      <div className="max-w-full mx-auto">
        <h2 className="text-4xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wide">
          ✨ Features & Abilities of the Night Fury
        </h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-left ${
                feature.title === "Echolocation & Night Vision"
                  ? "md:col-span-2"
                  : ""
              }`}
            >
              <h3 className="text-xl font-semibold dark:text-emerald-400 text-emerald-600 mb-2">
                {feature.title === "Stealth & Speed" && "🖤 "}
                {feature.title === "Plasma Blasts" && "⚡ "}
                {feature.title === "Silent Flight" && "🌙 "}
                {feature.title === "Superior Intelligence" && "🧠 "}
                {feature.title === "Echolocation & Night Vision" && "🐲 "}
                {feature.title}
              </h3>
              <p className="dark:text-slate-300 text-slate-700">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
