"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { easings } from "../../utils/animations";

interface CarouselItem {
  id: string;
  name: string;
  image: string;
  description?: string;
  element?: "Fire" | "Lightning" | "Ice" | "Earth" | "Wind" | "Shadow" | "Light";
  rarity?: "Common" | "Rare" | "Epic" | "Legendary";
}

interface InfiniteCarouselProps {
  items: CarouselItem[];
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  cardVariant?: "default" | "circular" | "compact";
  showElementBadge?: boolean;
  showRarityBadge?: boolean;
}

const getElementColor = (element?: string) => {
  switch (element) {
    case "Fire": return "bg-red-500 text-white";
    case "Lightning": return "bg-yellow-500 text-white";
    case "Ice": return "bg-blue-500 text-white";
    case "Earth": return "bg-amber-600 text-white";
    case "Wind": return "bg-teal-500 text-white";
    case "Shadow": return "bg-purple-600 text-white";
    case "Light": return "bg-yellow-300 text-gray-800";
    default: return "bg-gray-500 text-white";
  }
};

const getRarityColor = (rarity?: string) => {
  switch (rarity) {
    case "Common": return "bg-gray-400 text-white";
    case "Rare": return "bg-blue-500 text-white";
    case "Epic": return "bg-purple-500 text-white";
    case "Legendary": return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
    default: return "bg-gray-400 text-white";
  }
};

export function InfiniteCarousel({
  items,
  direction = "left",
  speed = 20,
  pauseOnHover = true,
  className = "",
  cardVariant = "default",
  showElementBadge = false,
  showRarityBadge = false,
}: InfiniteCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Create multiple copies for truly seamless infinite scroll
  const duplicatedItems = [
    ...items,
    ...items,
    ...items,
    ...items, // 4 copies for extra smoothness
  ];

  const carouselVariants: Variants = {
    animate: {
      x: direction === "left" ? ["0%", "-25%"] : ["0%", "25%"], // Move one full set
      transition: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: speed,
        ease: "linear",
      },
    },
    pause: {
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const getCardContent = (item: CarouselItem, index: number) => {
    const isCircular = cardVariant === "circular";
    const isCompact = cardVariant === "compact";
    
    return (
      <motion.div
        key={`${item.id}-${index}`}
        className="flex-shrink-0 group cursor-pointer"
        whileHover={{ 
          scale: isCircular ? 1.08 : 1.05, 
          zIndex: 30,
          transition: { duration: 0.3, ease: easings.easeInOut }
        }}
        whileTap={{ scale: 0.95 }}
      >
        <div className={`
          bg-white dark:bg-slate-800 shadow-lg overflow-hidden relative
          border border-slate-200 dark:border-slate-700
          transition-all duration-300 
          group-hover:shadow-2xl 
          group-hover:shadow-emerald-500/20 
          dark:group-hover:shadow-emerald-400/20
          ${isCircular 
            ? "rounded-full w-48 h-48 flex flex-col items-center justify-center" 
            : isCompact 
              ? "rounded-lg w-48 h-64" 
              : "rounded-xl w-64 h-80"
          }
        `}>
          {/* Badges */}
          {(showElementBadge || showRarityBadge) && (
            <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
              {showElementBadge && item.element && (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getElementColor(item.element)}`}>
                  {item.element}
                </span>
              )}
              {showRarityBadge && item.rarity && (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRarityColor(item.rarity)}`}>
                  {item.rarity}
                </span>
              )}
            </div>
          )}

          {/* Image */}
          <div className={`
            relative overflow-hidden
            ${isCircular 
              ? "w-32 h-32 rounded-full mb-2" 
              : isCompact 
                ? "w-full h-32" 
                : "w-full h-48"
            }
          `}>
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Magical glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-transparent to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className={`
            ${isCircular 
              ? "text-center px-2" 
              : "p-4"
            }
          `}>
            <h3 className={`
              font-bold text-emerald-600 dark:text-emerald-400 
              group-hover:text-emerald-500 dark:group-hover:text-emerald-300 
              transition-colors duration-300
              ${isCircular 
                ? "text-sm mb-1" 
                : isCompact 
                  ? "text-base mb-2" 
                  : "text-lg mb-2"
              }
            `}>
              {item.name}
            </h3>
            {item.description && !isCircular && (
              <p className={`
                text-slate-600 dark:text-slate-400 
                transition-colors duration-300 overflow-hidden
                ${isCompact ? "text-xs" : "text-sm"}
              `}
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                lineClamp: 2
              }}>
                {item.description}
              </p>
            )}
          </div>

          {/* Hover overlay with additional info */}
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <h4 className="font-bold text-emerald-300 mb-2">{item.name}</h4>
              {item.description && (
                <p className="text-sm opacity-90">{item.description}</p>
              )}
              <div className="mt-3 text-xs opacity-75">
                Click to learn more
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`overflow-hidden relative ${className}`}>
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white via-white/50 to-transparent dark:from-slate-900 dark:via-slate-900/50 z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white via-white/50 to-transparent dark:from-slate-900 dark:via-slate-900/50 z-10 pointer-events-none" />
      
      <motion.div
        ref={carouselRef}
        className="flex gap-6 py-4"
        variants={carouselVariants}
        animate={isVisible && !isHovered ? "animate" : "pause"}
        onHoverStart={() => pauseOnHover && setIsHovered(true)}
        onHoverEnd={() => pauseOnHover && setIsHovered(false)}
        style={{ 
          display: "flex", 
          flexWrap: "nowrap", 
          width: "400%" // 4 copies
        }}
      >
        {duplicatedItems.map(getCardContent)}
      </motion.div>
    </div>
  );
}