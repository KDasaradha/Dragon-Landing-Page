"use client"

import Image from "next/image"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Sun, Moon, Laptop } from "lucide-react"
import { useState, useEffect } from "react"

type Theme = "dark" | "light" | "system"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>("system")
  const [mounted, setMounted] = useState(false)

  // Handle system theme detection and changes
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      systemTheme === "dark" ? root.classList.add("dark") : root.classList.remove("dark")

      // Listen for system theme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = (e: MediaQueryListEvent) => {
        e.matches ? root.classList.add("dark") : root.classList.remove("dark")
      }

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    } else {
      theme === "dark" ? root.classList.add("dark") : root.classList.remove("dark")
    }

    localStorage.setItem("theme", theme)
  }, [theme, mounted])

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
  ]

  const alphas = [
    {
      name: "Bewilderbeast",
      description:
        "The true King of Dragons, an enormous sea-dragon that breathes ice instead of fire and controls other dragons telepathically.",
    },
    {
      name: "The Red Death",
      description: "A monstrous, fire-breathing behemoth that controlled dragons through fear and terror.",
    },
    {
      name: "Drago's Bewilderbeast",
      description:
        "A corrupted Alpha dragon used as a war beast, capable of freezing entire fleets with its icy breath.",
    },
  ]

  if (!mounted) {
    return null // Prevent flash of unstyled content
  }

  return (
    <div className="min-h-screen font-serif transition-colors duration-300 bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-opacity-90 shadow-lg backdrop-blur-sm fixed w-full top-0 z-50 dark:bg-slate-900/90 bg-white/90 border-b border-slate-200 dark:border-slate-800">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/images/dragon.svg.jpg" alt="Night Fury Logo" width={40} height={40} className="h-10 w-10 object-contain" />
          <span className="text-3xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wider hover:brightness-110 transition">
            Night Fury
          </span>
        </Link>
        <ul className="hidden md:flex space-x-8 text-lg">
          <li>
            <a href="#about" className="dark:hover:text-emerald-400 hover:text-emerald-600 transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="#features" className="dark:hover:text-emerald-400 hover:text-emerald-600 transition-colors">
              Abilities
            </a>
          </li>
          <li>
            <a href="#alphas" className="dark:hover:text-emerald-400 hover:text-emerald-600 transition-colors">
              Alpha Dragons
            </a>
          </li>
          <li>
            <a href="#dragons" className="dark:hover:text-emerald-400 hover:text-emerald-600 transition-colors">
              Dragon Lore
            </a>
          </li>
          <li>
            <a href="#contact" className="dark:hover:text-emerald-400 hover:text-emerald-600 transition-colors">
              Contact
            </a>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <div className="flex bg-slate-200 dark:bg-slate-800 rounded-full p-1">
            {/* Light Mode Button */}
            <button
              onClick={() => setTheme("light")}
              className={`p-2 rounded-full transition-colors ${
                theme === "light"
                  ? "bg-white text-emerald-500 shadow-sm"
                  : "text-emerald-400 hover:text-emerald-600 hover:bg-slate-300/50 dark:hover:bg-slate-700/50"
              }`}
            >
              <Sun className="w-5 h-5" />
            </button>

            {/* System Mode Button */}
            <button
              onClick={() => setTheme("system")}
              className={`p-2 rounded-full transition-colors ${
                theme === "system"
                  ? "bg-white dark:bg-slate-700 text-blue-500 dark:text-blue-400 shadow-sm"
                  : "text-blue-400 hover:text-blue-600 hover:bg-slate-300/50 dark:hover:bg-slate-700/50"
              }`}
            >
              <Laptop className="w-5 h-5" />
            </button>

            {/* Dark Mode Button */}
            <button
              onClick={() => setTheme("dark")}
              className={`p-2 rounded-full transition-colors ${
                theme === "dark"
                  ? "bg-slate-700 text-yellow-400 shadow-sm"
                  : "text-yellow-300 hover:text-yellow-500 hover:bg-slate-300/50 dark:hover:bg-slate-700/50"
              }`}
            >
              <Moon className="w-5 h-5" />
            </button>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
            <Menu className="w-8 h-8 dark:text-white text-slate-900 hover:text-emerald-400 transition-colors" />
          </button>
        </div>
        
      </nav>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-0 bg-slate-900 bg-opacity-95 flex flex-col p-6 space-y-6 z-50"
          >
            <button
              onClick={() => setSidebarOpen(false)}
              className="self-end text-3xl text-white hover:text-emerald-400"
            >
              ×
            </button>
            <a
              href="#about"
              onClick={() => setSidebarOpen(false)}
              className="text-xl text-white hover:text-emerald-400 transition-colors"
            >
              About
            </a>
            <a
              href="#features"
              onClick={() => setSidebarOpen(false)}
              className="text-xl text-white hover:text-emerald-400 transition-colors"
            >
              Abilities
            </a>
            <a
              href="#alphas"
              onClick={() => setSidebarOpen(false)}
              className="text-xl text-white hover:text-emerald-400 transition-colors"
            >
              Alpha Dragons
            </a>
            <a
              href="#dragons"
              onClick={() => setSidebarOpen(false)}
              className="text-xl text-white hover:text-emerald-400 transition-colors"
            >
              Dragon Lore
            </a>
            <a
              href="#contact"
              onClick={() => setSidebarOpen(false)}
              className="text-xl text-white hover:text-emerald-400 transition-colors"
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
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
          🔥 <span className="dark:text-emerald-400 text-emerald-600">Night Fury: The Phantom of the Skies</span> <br />
          The Night Fury is a dragon of myth and mystery, known for its incredible stealth, intelligence, and power. It
          is one of the fastest dragons, soaring through the skies like a shadow, striking its enemies before they even
          realize its presence.
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

      {/* About Section */}
      <section id="about" className="p-12 dark:bg-slate-900 bg-white text-center relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wide">
            🌠 The Legend Lives On
          </h2>
          <p className="mt-6 dark:text-slate-300 text-slate-700 mx-auto leading-relaxed text-lg">
            Dragons symbolize power, mystery, and wisdom. From the Norse tales of fire-breathing serpents to the Eastern
            guardians of the heavens, their legacy spans millennia. Night Furies, with their majestic yet elusive
            nature, remain one of the most beloved dragons ever imagined.
          </p>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold dark:text-purple-400 text-purple-600 mb-4">
              📖 The History & Legends of Dragons
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-slate-100 dark:bg-slate-700/50 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-medium dark:text-emerald-400 text-emerald-600 mb-2">🔹 Norse Legends</h4>
                <p className="dark:text-slate-300 text-slate-700">
                  Vikings believed in great dragons that could destroy worlds or grant unimaginable power.
                </p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-700/50 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-medium dark:text-emerald-400 text-emerald-600 mb-2">
                  🔹 Eastern Mythology
                </h4>
                <p className="dark:text-slate-300 text-slate-700">
                  In China, dragons symbolize prosperity, fortune, and celestial power. They were believed to control
                  rain, storms, and the elements.
                </p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-700/50 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-medium dark:text-emerald-400 text-emerald-600 mb-2">
                  🔹 Medieval European Tales
                </h4>
                <p className="dark:text-slate-300 text-slate-700">
                  Western dragons were often depicted as fire-breathing beasts guarding treasures or fighting knights.
                </p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-700/50 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-medium dark:text-emerald-400 text-emerald-600 mb-2">🔹 The Hidden World</h4>
                <p className="dark:text-slate-300 text-slate-700">
                  Some believe dragons still exist in secret, deep underground or in the skies, waiting for the right
                  time to reveal themselves again.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="p-12 dark:bg-slate-900 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wide">
            ✨ Features & Abilities of the Night Fury
          </h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-left"
            >
              <h3 className="text-xl font-semibold dark:text-emerald-400 text-emerald-600 mb-2">🖤 Stealth & Speed</h3>
              <p className="dark:text-slate-300 text-slate-700">
                Its jet-black scales blend into the night sky, making it nearly invisible in darkness. It flies at
                extreme speeds, rivaling even the fastest dragons.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-left"
            >
              <h3 className="text-xl font-semibold dark:text-emerald-400 text-emerald-600 mb-2">⚡ Plasma Blasts</h3>
              <p className="dark:text-slate-300 text-slate-700">
                Instead of traditional fire, the Night Fury shoots concentrated plasma blasts that explode on impact,
                powerful enough to destroy ships and fortresses.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-left"
            >
              <h3 className="text-xl font-semibold dark:text-emerald-400 text-emerald-600 mb-2">🌙 Silent Flight</h3>
              <p className="dark:text-slate-300 text-slate-700">
                Unlike most dragons that produce loud wing flaps, the Night Fury glides through the air with almost no
                sound, making it a perfect ambush predator.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-left"
            >
              <h3 className="text-xl font-semibold dark:text-emerald-400 text-emerald-600 mb-2">
                🧠 Superior Intelligence
              </h3>
              <p className="dark:text-slate-300 text-slate-700">
                This dragon is highly intelligent, capable of solving problems, recognizing patterns, and even bonding
                deeply with humans.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg text-left md:col-span-2"
            >
              <h3 className="text-xl font-semibold dark:text-emerald-400 text-emerald-600 mb-2">
                🐲 Echolocation & Night Vision
              </h3>
              <p className="dark:text-slate-300 text-slate-700">
                The Night Fury has heightened senses, allowing it to navigate in total darkness using echolocation, much
                like a bat.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alpha Dragons Section */}
      <section id="alphas" className="p-12 dark:bg-slate-900 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wide">
            👑 Alpha Dragons: The Rulers of the Dragon Kingdom
          </h2>
          <p className="mt-4 dark:text-slate-300 text-slate-700 mx-auto">
            Some dragons hold immense power, ruling over other dragons as their Alpha. These legendary creatures possess
            abilities that set them apart from all others.
          </p>

          <div className="mt-8 grid gap-6">
            {alphas.map((alpha, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-slate-100 dark:bg-slate-700 p-6 rounded-lg shadow-lg text-left"
              >
                <h3 className="text-xl font-semibold dark:text-purple-400 text-purple-600 mb-2">🔥 {alpha.name}</h3>
                <p className="dark:text-slate-300 text-slate-700">{alpha.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 bg-slate-100 dark:bg-slate-700/50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold dark:text-purple-400 text-purple-600 mb-4">
              💠 The Role of an Alpha Dragon
            </h3>
            <p className="dark:text-slate-300 text-slate-700 text-lg">
              An Alpha dragon leads others, acting as the protector of the dragon world. They can influence entire
              species, keeping balance or waging war depending on their nature.
            </p>
          </div>
        </div>
      </section>

      {/* Dragons Gallery */}
      <section id="dragons" className="p-12 text-center dark:bg-slate-900 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wide">
            🐉 Other Powerful Dragons
          </h2>
          <p className="mt-4 dark:text-slate-400 text-slate-600 mx-auto">
            Aside from the Night Fury and the Alphas, many other dragons have their own unique strengths.
          </p>

          <div className="mt-8 relative">
            <motion.div
              className="flex gap-4 py-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
            >
              {[...dragons, ...dragons].map((dragon, index) => (
                <motion.div key={index} className="flex-shrink-0 w-72" whileHover={{ scale: 1.05, zIndex: 10 }}>
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src={dragon.src || "/placeholder.svg"}
                      alt={`${dragon.name} Dragon`}
                      width={500}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold dark:text-emerald-400 text-emerald-600">✨ {dragon.name}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md text-left">
              <p className="dark:text-slate-300 text-slate-700">
                <span className="font-semibold dark:text-emerald-400 text-emerald-600">1️⃣ Deadly Nadder</span> – A
                vibrant dragon with spiky tail projectiles and an impeccable sense of smell.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md text-left">
              <p className="dark:text-slate-300 text-slate-700">
                <span className="font-semibold dark:text-emerald-400 text-emerald-600">2️⃣ Monstrous Nightmare</span> – A
                fearsome dragon that can set itself on fire, making it nearly untouchable.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md text-left">
              <p className="dark:text-slate-300 text-slate-700">
                <span className="font-semibold dark:text-emerald-400 text-emerald-600">3️⃣ Hideous Zippleback</span> – A
                two-headed dragon, with one head breathing flammable gas and the other igniting it.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md text-left">
              <p className="dark:text-slate-300 text-slate-700">
                <span className="font-semibold dark:text-emerald-400 text-emerald-600">4️⃣ Stormcutter</span> – A majestic
                four-winged dragon, intelligent and powerful, known for its grace in flight.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md text-left md:col-span-2">
              <p className="dark:text-slate-300 text-slate-700">
                <span className="font-semibold dark:text-emerald-400 text-emerald-600">5️⃣ Skrill</span> – A lightning
                dragon that absorbs and redirects electricity, making it one of the most dangerous dragons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future of Dragons Section */}
      <section className="p-12 dark:bg-slate-900 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wide">
            🌟 The Future of Dragons
          </h2>
          <p className="mt-6 dark:text-slate-300 text-slate-700 text-lg">
            The legend of dragons continues to grow, inspiring stories, movies, and cultures. The Night Fury remains an
            icon of mystery, strength, and loyalty, while Alpha dragons represent leadership and power.
          </p>
          <div className="mt-8 bg-slate-100 dark:bg-slate-700 p-8 rounded-lg shadow-lg">
            <p className="text-xl italic dark:text-slate-200 text-slate-800">
              💭 What if dragons were real? Would you befriend one, or would you fear them? 🚀🐉
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="p-12 text-center dark:bg-slate-900 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wide">
            Seek the Night Fury
          </h2>
          <p className="mt-6 dark:text-slate-300 text-slate-700 text-lg mx-auto">
            Dare to explore the realm of these legendary beasts? Send your message through the winds to{" "}
            <a href="mailto:contact@nightfury.com" className="dark:text-emerald-400 text-emerald-600 hover:underline">
              contact@nightfury.com
            </a>
            . Join the Night Fury Chronicles and uncover the mysteries of the skies!
          </p>

          <form className="mt-8 max-w-md mx-auto">
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              ></textarea>
              <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 dark:bg-slate-900 bg-slate-100 text-center border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold dark:text-emerald-400 text-emerald-600">Night Fury Chronicles</h3>
          <p className="mt-2 dark:text-slate-400 text-slate-600 text-sm">
            Forged in the fires of legend, soaring through the ages.
          </p>
          <ul className="mt-4 flex justify-center space-x-6 text-sm">
            <li>
              <a
                href="#about"
                className="dark:text-slate-400 text-slate-600 dark:hover:text-emerald-400 hover:text-emerald-600"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="dark:text-slate-400 text-slate-600 dark:hover:text-emerald-400 hover:text-emerald-600"
              >
                Abilities
              </a>
            </li>
            <li>
              <a
                href="#alphas"
                className="dark:text-slate-400 text-slate-600 dark:hover:text-emerald-400 hover:text-emerald-600"
              >
                Alpha Dragons
              </a>
            </li>
            <li>
              <a
                href="#dragons"
                className="dark:text-slate-400 text-slate-600 dark:hover:text-emerald-400 hover:text-emerald-600"
              >
                Dragons
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="dark:text-slate-400 text-slate-600 dark:hover:text-emerald-400 hover:text-emerald-600"
              >
                Contact
              </a>
            </li>
          </ul>
          <p className="mt-4 dark:text-slate-500 text-slate-500 text-xs">
            © 2025 Night Fury Chronicles. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

