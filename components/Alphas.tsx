import { motion } from "framer-motion";

export function Alphas() {
  const alphas = [
    {
      name: "Bewilderbeast",
      description:
        "The true King of Dragons, an enormous sea-dragon that breathes ice instead of fire and controls other dragons telepathically.",
    },
    {
      name: "The Red Death",
      description:
        "A monstrous, fire-breathing behemoth that controlled dragons through fear and terror.",
    },
    {
      name: "Drago's Bewilderbeast",
      description:
        "A corrupted Alpha dragon used as a war beast, capable of freezing entire fleets with its icy breath.",
    },
  ];

  return (
    <section
      id="alphas"
      className="p-12 dark:bg-slate-900 bg-white text-center"
    >
      <div className="max-w-full mx-auto">
        <h2 className="text-4xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wide">
          👑 Alpha Dragons: The Rulers of the Dragon Kingdom
        </h2>
        <p className="mt-4 dark:text-slate-300 text-slate-700 mx-auto">
          Some dragons hold immense power, ruling over other dragons as their
          Alpha. These legendary creatures possess abilities that set them apart
          from all others.
        </p>

        <div className="mt-8 grid gap-6">
          {alphas.map((alpha, index) => (
            <motion.div
              key={alpha.name} // Use unique identifier instead of index
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-slate-100 dark:bg-slate-700 p-6 rounded-lg shadow-lg text-left"
            >
              <h3 className="text-xl font-semibold dark:text-purple-400 text-purple-600 mb-2">
                🔥 {alpha.name}
              </h3>
              <p className="dark:text-slate-300 text-slate-700">
                {alpha.description}
              </p>
            </motion.div>

          ))}
        </div>

        <div className="mt-8 bg-slate-100 dark:bg-slate-700/50 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold dark:text-purple-400 text-purple-600 mb-4">
            💠 The Role of an Alpha Dragon
          </h3>
          <p className="dark:text-slate-300 text-slate-700 text-lg">
            An Alpha dragon leads others, acting as the protector of the dragon
            world. They can influence entire species, keeping balance or waging
            war depending on their nature.
          </p>
        </div>
      </div>
    </section>
  );
}
