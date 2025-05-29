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

import React, { useState, useEffect, Suspense } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { Hero } from "./Hero";
import { About } from "./About";
import { Features } from "./Features";
import { Alphas } from "./Alphas";
import { Future } from "./Future";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

// Ensure Dragons.tsx has a default export
const Dragons = React.lazy(() => import("./Dragons"));

type Theme = "dark" | "light" | "system";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.toggle("dark", systemTheme === "dark");

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => root.classList.toggle("dark", e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      root.classList.toggle("dark", theme === "dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen font-serif transition-colors duration-300 bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-100">
      <Navbar theme={theme} setTheme={setTheme} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Hero />
      <About />
      <Features />
      <Alphas />
      <Suspense fallback={<div className="text-center py-16">Loading Dragons...</div>}>
        <Dragons />
      </Suspense>
      <Future />
      <Contact />
      <Footer />
    </div>
  );
}
