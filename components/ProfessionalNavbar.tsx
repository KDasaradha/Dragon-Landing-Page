"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Monitor, 
  Search, 
  Heart, 
  Settings,
  ChevronDown,
  Github,
  ExternalLink
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { 
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import { useTheme, useDragons, useUI } from '@/lib/contexts/AppContext';
import { useScrollProgress } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Home', href: '#hero', id: 'hero' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Features', href: '#features', id: 'features' },
  { name: 'Dragons', href: '#dragons', id: 'dragons' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

const themeOptions = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

export function ProfessionalNavbar() {
  const { theme, setTheme } = useTheme();
  const { dragons, favorites, filteredDragons } = useDragons();
  const { sidebarOpen, toggleSidebar, currentSection } = useUI();
  const { progress, isScrolling } = useScrollProgress();

  const [isScrolled, setIsScrolled] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            setCommandOpen(true);
            break;
          case '/':
            e.preventDefault();
            setCommandOpen(true);
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (href: string, id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const currentTheme = themeOptions.find(option => option.value === theme);

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-[60] origin-left"
        style={{ scaleX: progress }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress }}
        transition={{ duration: 0.1 }}
      />

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-lg" 
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 z-10"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <OptimizedImage
                    src="/images/toothless_logo.jpg"
                    alt="Night Fury Logo"
                    width={40}
                    height={40}
                    className="rounded-full ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all duration-300"
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity -z-10" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
                    Night Fury
                  </h1>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Dragon Legends
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors duration-200",
                    currentSection === item.id
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  )}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  {item.name}
                  {currentSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                      layoutId="activeNavItem"
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCommandOpen(true)}
                className="hidden sm:flex items-center gap-2 text-slate-600 dark:text-slate-400"
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline text-xs">Search</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 text-xs bg-slate-100 dark:bg-slate-800 rounded border">
                  ⌘K
                </kbd>
              </Button>

              {/* Favorites */}
              <Button
                variant="ghost"
                size="sm"
                className="relative"
              >
                <Heart className="w-4 h-4" />
                {favorites.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                  >
                    {favorites.length}
                  </Badge>
                )}
              </Button>

              {/* Theme Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                    {currentTheme && <currentTheme.icon className="w-4 h-4" />}
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Theme</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {themeOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setTheme(option.value as any)}
                      className={cn(
                        "flex items-center gap-2",
                        theme === option.value && "bg-emerald-50 dark:bg-emerald-900/20"
                      )}
                    >
                      <option.icon className="w-4 h-4" />
                      {option.label}
                      {theme === option.value && (
                        <div className="ml-auto w-2 h-2 bg-emerald-500 rounded-full" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Settings */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="https://github.com/kdsr/dragon-landing-page" target="_blank">
                      <Github className="w-4 h-4 mr-2" />
                      View Source Code
                      <ExternalLink className="w-3 h-3 ml-auto" />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Preferences
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
            >
              <div className="px-4 py-6 space-y-4">
                {navigationItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.href, item.id)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 text-left text-base font-medium rounded-lg transition-colors",
                      currentSection === item.id
                        ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                        : "text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    )}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                    {currentSection === item.id && (
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Command Dialog for Search */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search dragons, features, and more..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            {navigationItems.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => {
                  handleNavClick(item.href, item.id);
                  setCommandOpen(false);
                }}
              >
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>

          {dragons.length > 0 && (
            <CommandGroup heading="Dragons">
              {dragons.slice(0, 5).map((dragon) => (
                <CommandItem
                  key={dragon.id}
                  onSelect={() => {
                    // Handle dragon selection
                    setCommandOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <OptimizedImage
                      src={dragon.image}
                      alt={dragon.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    {dragon.name}
                    <Badge variant="secondary" className="ml-auto">
                      {dragon.rarity}
                    </Badge>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}