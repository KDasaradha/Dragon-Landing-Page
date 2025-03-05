export function About() {
  return (
    <section
      id="about"
      className="p-12 dark:bg-slate-900 bg-white text-center relative"
    >
      <div className="max-w-full mx-auto">
        <h2 className="text-4xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wide">
          🌠 The Legend Lives On
        </h2>
        <p className="mt-6 dark:text-slate-300 text-slate-700 mx-auto leading-relaxed text-lg">
          Dragons symbolize power, mystery, and wisdom. From the Norse tales of
          fire-breathing serpents to the Eastern guardians of the heavens, their
          legacy spans millennia. Night Furies, with their majestic yet elusive
          nature, remain one of the most beloved dragons ever imagined.
        </p>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold dark:text-purple-400 text-purple-600 mb-4">
            📖 The History & Legends of Dragons
          </h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              {
                title: "Norse Legends",
                text: "Vikings believed in great dragons that could destroy worlds or grant unimaginable power.",
              },
              {
                title: "Eastern Mythology",
                text: "In China, dragons symbolize prosperity, fortune, and celestial power. They were believed to control rain, storms, and the elements.",
              },
              {
                title: "Medieval European Tales",
                text: "Western dragons were often depicted as fire-breathing beasts guarding treasures or fighting knights.",
              },
              {
                title: "The Hidden World",
                text: "Some believe dragons still exist in secret, deep underground or in the skies, waiting for the right time to reveal themselves again.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-slate-100 dark:bg-slate-700/50 p-6 rounded-lg shadow-md"
              >
                <h4 className="text-xl font-medium dark:text-emerald-400 text-emerald-600 mb-2">
                  🔹 {item.title}
                </h4>
                <p className="dark:text-slate-300 text-slate-700">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
