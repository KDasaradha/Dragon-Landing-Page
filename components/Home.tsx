// "use client";

// import { useState, useEffect } from "react";
// import { Navbar } from "./Navbar";
// import { Sidebar } from "./Sidebar";
// import { Hero } from "./Hero";
// import { About } from "./About";
// import { Features } from "./Features";
// import { Alphas } from "./Alphas";
// import { Dragons } from "./Dragons";
// import { Future } from "./Future";
// import { Contact } from "./Contact";
// import { Footer } from "./Footer";

// type Theme = "dark" | "light" | "system";

// export default function Home() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [theme, setTheme] = useState<Theme>("system");
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     const savedTheme = localStorage.getItem("theme") as Theme | null;
//     if (savedTheme) {
//       setTheme(savedTheme);
//     }
//   }, []);

//   useEffect(() => {
//     if (!mounted) return;

//     const root = document.documentElement;
//     if (theme === "system") {
//       const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
//         .matches
//         ? "dark"
//         : "light";
//       systemTheme === "dark"
//         ? root.classList.add("dark")
//         : root.classList.remove("dark");

//       const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//       const handleChange = (e: MediaQueryListEvent) => {
//         e.matches ? root.classList.add("dark") : root.classList.remove("dark");
//       };

//       mediaQuery.addEventListener("change", handleChange);
//       return () => mediaQuery.removeEventListener("change", handleChange);
//     } else {
//       theme === "dark"
//         ? root.classList.add("dark")
//         : root.classList.remove("dark");
//     }

//     localStorage.setItem("theme", theme);
//   }, [theme, mounted]);

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen font-serif transition-colors duration-300 bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-100">
//       <Navbar
//         theme={theme}
//         setTheme={setTheme}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <Hero />
//       <About />
//       <Features />
//       <Alphas />
//       <Dragons />
//       <Future />
//       <Contact />
//       <Footer />
//     </div>
//   );
// }



"use client";

import React, { Suspense, useEffect } from "react";
import { ProfessionalNavbar } from "./ProfessionalNavbar";
import { Hero } from "./Hero";
import { About } from "./About";
import { Features } from "./Features";
import { Alphas } from "./Alphas";
import { Future } from "./Future";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { LoadingSpinner } from "./custom/loading-spinner";
import { ErrorBoundary } from "./custom/error-boundary";
import { DragonSearch } from "./DragonSearch";

import { useScrollAnimation } from "@/hooks/useAdvancedAnimation";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { useDragons } from "@/lib/contexts/AppContext";

// Lazy load heavy components for better performance
const Dragons = React.lazy(() => import("./Dragons"));

// Sample dragon data (in a real app, this would come from an API)
const sampleDragons = [
  {
    id: "night-fury-1",
    name: "Toothless",
    type: "Night Fury",
    rarity: "legendary" as const,
    abilities: ["Plasma Blasts", "Stealth Flight", "Echolocation", "Alpha Command"],
    stats: { speed: 95, strength: 88, intelligence: 98, stealth: 100 },
    image: "/images/night-fury-1.jpg",
    description: "The last known Night Fury, Toothless is incredibly intelligent and forms a deep bond with Hiccup."
  },
  {
    id: "deadly-nadder-1",
    name: "Stormfly",
    type: "Deadly Nadder",
    rarity: "rare" as const,
    abilities: ["Spine Shot", "Magnesium Fire", "Tracking"],
    stats: { speed: 78, strength: 82, intelligence: 75, stealth: 60 },
    image: "/images/dragon1.jpg",
    description: "A fierce and loyal dragon with deadly spines and exceptional tracking abilities."
  },
  {
    id: "monstrous-nightmare-1",
    name: "Hookfang",
    type: "Monstrous Nightmare",
    rarity: "rare" as const,
    abilities: ["Fire Immunity", "Body Ignition", "Intimidation"],
    stats: { speed: 70, strength: 95, intelligence: 65, stealth: 40 },
    image: "/images/dragon2.jpg",
    description: "Known for setting itself on fire and having a stubborn but brave personality."
  },
  {
    id: "hideous-zippleback-1",
    name: "Barf and Belch",
    type: "Hideous Zippleback",
    rarity: "common" as const,
    abilities: ["Gas and Spark", "Coordinated Attack", "Stealth"],
    stats: { speed: 65, strength: 80, intelligence: 85, stealth: 90 },
    image: "/images/dragon4.jpg",
    description: "A two-headed dragon with one head producing gas and the other creating sparks."
  },
  {
    id: "gronckle-1",
    name: "Meatlug",
    type: "Gronckle",
    rarity: "common" as const,
    abilities: ["Rock Eating", "Lava Blasts", "Boulder Projectiles"],
    stats: { speed: 45, strength: 90, intelligence: 70, stealth: 30 },
    image: "/images/dragon3.jpg",
    description: "A boulder-class dragon known for eating rocks and being surprisingly gentle."
  }
];

export default function Home() {
  const { setDragons } = useDragons();
  const { startMonitoring } = usePerformanceMonitor();
  
  // Initialize scroll animations
  useScrollAnimation();

  // Initialize app data and monitoring
  useEffect(() => {
    // Start performance monitoring
    startMonitoring();

    // Load dragon data
    setDragons(sampleDragons);

    // Preload critical images
    const criticalImages = [
      "/images/ai-generated-7702855_1280.jpg",
      "/images/toothless_logo.jpg",
      "/images/night-fury-1.jpg"
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, [setDragons, startMonitoring]);

  const handleDragonsFilter = (filteredDragons: typeof sampleDragons) => {
    // This could be used to update a separate filtered dragons state
    console.log('Filtered dragons:', filteredDragons);
  };

  return (
    <div className="min-h-screen font-sans antialiased transition-colors duration-300 bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 dark:text-slate-100">
      {/* Navigation */}
      <ProfessionalNavbar />
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <ErrorBoundary fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Something went wrong in the hero section
              </h1>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        }>
          <Hero />
        </ErrorBoundary>

        {/* About Section */}
        <ErrorBoundary>
          <About />
        </ErrorBoundary>

        {/* Features Section */}
        <ErrorBoundary>
          <Features />
        </ErrorBoundary>

        {/* Dragon Search & Filter */}
        <ErrorBoundary>
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <DragonSearch 
                dragons={sampleDragons} 
                onDragonsFilter={handleDragonsFilter}
              />
            </div>
          </section>
        </ErrorBoundary>

        {/* Dragons Section */}
        <ErrorBoundary fallback={
          <div className="py-16 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Unable to load dragons
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Please try refreshing the page
            </p>
          </div>
        }>
          <Suspense fallback={
            <div className="py-16">
              <LoadingSpinner 
                size="lg" 
                text="Loading Dragon Gallery..." 
                className="min-h-[400px]"
              />
            </div>
          }>
            <Dragons />
          </Suspense>
        </ErrorBoundary>

        {/* Alpha Dragons Section */}
        <ErrorBoundary>
          <Alphas />
        </ErrorBoundary>

        {/* Future Section */}
        <ErrorBoundary>
          <Future />
        </ErrorBoundary>

        {/* Contact Section */}
        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>

        {/* Footer */}
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </main>
    </div>
  );
}
