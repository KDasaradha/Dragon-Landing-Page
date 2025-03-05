"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Sun, Moon, Laptop } from "lucide-react";

type Theme = "dark" | "light" | "system";

interface NavbarProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Navbar({
  theme,
  setTheme,
  sidebarOpen,
  setSidebarOpen,
}: NavbarProps) {
  return (
    <nav className="flex justify-between items-center p-6 bg-opacity-90 shadow-lg backdrop-blur-sm fixed w-full top-0 z-50 dark:bg-slate-900/90 bg-white/90 border-b border-slate-200 dark:border-slate-800">
      <Link href="/" className="flex items-center space-x-3">
        <Image
          src="/images/dragon.svg.jpg"
          alt="Night Fury Logo"
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
        <span className="text-3xl font-bold dark:text-emerald-400 text-emerald-600 tracking-wider hover:brightness-110 transition">
          Night Fury
        </span>
      </Link>
      <ul className="hidden md:flex space-x-8 text-lg">
        {["about", "features", "alphas", "dragons", "contact"].map((item) => (
          <li key={item}>
            <a
              href={`#${item}`}
              className="dark:hover:text-emerald-400 hover:text-emerald-600 transition-colors"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-4">
        <div className="flex bg-slate-200 dark:bg-slate-800 rounded-full p-1">
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
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden"
        >
          <Menu className="w-8 h-8 dark:text-white text-slate-900 hover:text-emerald-400 transition-colors" />
        </button>
      </div>
    </nav>
  );
}
