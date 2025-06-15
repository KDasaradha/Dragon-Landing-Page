"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, Variants, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { easings } from "../../utils/animations";
import { FaStar, FaFire, FaBolt, FaShieldAlt, FaWind, FaEye } from "react-icons/fa";
import { GiDragonHead } from "react-icons/gi";

interface AdvancedCarouselItem {
  id: string;
  name: string;
  image: string;
  description?: string;
  element?: "Fire" | "Lightning" | "Ice" | "Earth" | "Wind" | "Shadow" | "Light";
  rarity?: "Common" | "Rare" | "Epic" | "Legendary";
  dragonClass?: string;
  abilities?: string[];
  stats?: { attack: number; defense: number; speed: number; intelligence: number };
}

interface AdvancedInfiniteCarouselProps {
  items: AdvancedCarouselItem[];
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  cardVariant?: "default" | "circular" | "compact" | "3d";
  showElementBadge?: boolean;
  showRarityBadge?: boolean;
  showParticles?: boolean;
  show3DEffect?: boolean;
  onItemClick?: (item: AdvancedCarouselItem) => void;
}

const getElementColor = (element?: string) => {
  switch (element) {
    case "Fire": return { bg: "bg-red-500", text: "text-white", glow: "shadow-red-500/50" };
    case "Lightning": return { bg: "bg-yellow-500", text: "text-white", glow: "shadow-yellow-500/50" };
    case "Ice": return { bg: "bg-blue-500", text: "text-white", glow: "shadow-blue-500/50" };
    case "Earth": return { bg: "bg-amber-600", text: "text-white", glow: "shadow-amber-600/50" };
    case "Wind": return { bg: "bg-teal-500", text: "text-white", glow: "shadow-teal-500/50" };
    case "Shadow": return { bg: "bg-purple-600", text: "text-white", glow: "shadow-purple-600/50" };
    case "Light": return { bg: "bg-yellow-300", text: "text-gray-800", glow: "shadow-yellow-300/50" };
    default: return { bg: "bg-gray-500", text: "text-white", glow: "shadow-gray-500/50" };
  }
};

const getRarityColor = (rarity?: string) => {
  switch (rarity) {
    case "Common": return { bg: "bg-gray-400", text: "text-white", border: "border-gray-400" };
    case "Rare": return { bg: "bg-blue-500", text: "text-white", border: "border-blue-500" };
    case "Epic": return { bg: "bg-purple-500", text: "text-white", border: "border-purple-500" };
    case "Legendary": return { 
      bg: "bg-gradient-to-r from-yellow-400 to-orange-500", 
      text: "text-white", 
      border: "border-yellow-400",
      glow: "shadow-lg shadow-yellow-400/50"
    };
    default: return { bg: "bg-gray-400", text: "text-white", border: "border-gray-400" };
  }
};

const getElementIcon = (element?: string) => {
  switch (element) {
    case "Fire": return <FaFire />;
    case "Lightning": return <FaBolt />;
    case "Ice": return <FaShieldAlt />;
    case "Earth": return <FaShieldAlt />;
    case "Wind": return <FaWind />;
    case "Shadow": return <FaEye />;
    case "Light": return <FaStar />;
    default: return <GiDragonHead />;
  }
};

// Particle component for magical effects
const DragonParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-70"
    initial={{ x: 0, y: 0, scale: 0 }}
    animate={{
      x: [0, Math.random() * 100 - 50],
      y: [0, -Math.random() * 50 - 20],
      scale: [0, 1, 0],
      opacity: [0, 0.7, 0],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay: delay,
      ease: "easeOut",
    }}
  />
);

export function AdvancedInfiniteCarousel({
  items,
  direction = "left",
  speed = 20,
  pauseOnHover = true,
  className = "",
  cardVariant = "default",
  showElementBadge = false,
  showRarityBadge = false,
  showParticles = false,
  show3DEffect = false,
  onItemClick,
}: AdvancedInfiniteCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!show3DEffect) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Create multiple copies for seamless infinite scroll
  const duplicatedItems = [
    ...items,
    ...items,
    ...items,
    ...items,
  ];

  const carouselVariants: Variants = {
    animate: {
      x: direction === "left" ? ["0%", "-25%"] : ["0%", "25%"],
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

  const getCardContent = (item: AdvancedCarouselItem, index: number) => {
    const isCircular = cardVariant === "circular";
    const isCompact = cardVariant === "compact";
    const is3D = cardVariant === "3d";
    const elementColors = getElementColor(item.element);
    const rarityColors = getRarityColor(item.rarity);

    const rotateX = show3DEffect ? useTransform(mouseY, [0, 300], [10, -10]) : 0;
    const rotateY = show3DEffect ? useTransform(mouseX, [0, 300], [-10, 10]) : 0;

    return (
      <motion.div
        key={`${item.id}-${index}`}
        className="flex-shrink-0 group cursor-pointer"
        whileHover={{ 
          scale: isCircular ? 1.08 : is3D ? 1.05 : 1.05, 
          zIndex: 30,
          transition: { duration: 0.3, ease: easings.easeInOut }
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onItemClick?.(item)}
        onMouseMove={handleMouseMove}
        style={show3DEffect ? { 
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d"
        } : {}}
      >
        <div className={`
          bg-white dark:bg-slate-800 shadow-lg overflow-hidden relative
          border border-slate-200 dark:border-slate-700
          transition-all duration-500
          group-hover:shadow-2xl 
          ${elementColors.glow}
          ${item.rarity === "Legendary" ? "group-hover:shadow-yellow-400/30" : "group-hover:shadow-emerald-500/20"}
          dark:group-hover:shadow-emerald-400/20
          ${isCircular 
            ? "rounded-full w-48 h-48 flex flex-col items-center justify-center" 
            : isCompact 
              ? "rounded-lg w-48 h-64" 
              : is3D
                ? "rounded-2xl w-72 h-96 transform-gpu"
                : "rounded-xl w-64 h-80"
          }
        `}>
          {/* Magical Particles */}
          {showParticles && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-inherit">
              {[...Array(8)].map((_, i) => (
                <DragonParticle key={i} delay={i * 0.3} />
              ))}
            </div>
          )}

          {/* Legendary Glow Effect */}
          {item.rarity === "Legendary" && (
            <div className="absolute inset-0 rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-yellow-400/20 rounded-inherit animate-pulse" />
            </div>
          )}

          {/* Enhanced Badges */}
          {(showElementBadge || showRarityBadge) && (
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
              {showElementBadge && item.element && (
                <motion.div
                  className={`${elementColors.bg} ${elementColors.text} px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-sm shadow-lg ${elementColors.glow}`}
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {getElementIcon(item.element)}
                  {item.element}
                </motion.div>
              )}
              {showRarityBadge && item.rarity && (
                <motion.div
                  className={`${rarityColors.bg} ${rarityColors.text} px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${rarityColors.glow || ""}`}
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <FaStar className="inline mr-1" />
                  {item.rarity}
                </motion.div>
              )}
            </div>
          )}

          {/* Dragon Class Badge */}
          {item.dragonClass && (
            <div className="absolute top-3 right-3 z-20">
              <motion.div
                className="bg-slate-800/80 text-slate-200 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {item.dragonClass}
              </motion.div>
            </div>
          )}

          {/* Enhanced Image */}
          <div className={`
            relative overflow-hidden
            ${isCircular 
              ? "w-32 h-32 rounded-full mb-3" 
              : isCompact 
                ? "w-full h-32" 
                : is3D
                  ? "w-full h-56"
                  : "w-full h-48"
            }
          `}>
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Element-based overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${elementColors.bg}/20 via-transparent to-${elementColors.bg}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          </div>

          {/* Enhanced Content */}
          <div className={`
            ${isCircular 
              ? "text-center px-3" 
              : is3D
                ? "p-6"
                : "p-4"
            }
          `}>
            <h3 className={`
              font-bold text-emerald-600 dark:text-emerald-400 
              group-hover:text-emerald-500 dark:group-hover:text-emerald-300 
              transition-colors duration-300
              ${isCircular 
                ? "text-sm mb-2" 
                : isCompact 
                  ? "text-base mb-2" 
                  : is3D
                    ? "text-xl mb-3"
                    : "text-lg mb-2"
              }
            `}>
              {item.name}
            </h3>
            
            {item.description && !isCircular && (
              <p className={`
                text-slate-600 dark:text-slate-400 
                transition-colors duration-300 overflow-hidden leading-relaxed
                ${isCompact ? "text-xs" : is3D ? "text-sm mb-4" : "text-sm"}
              `}
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: is3D ? 3 : 2,
                lineClamp: is3D ? 3 : 2
              }}>
                {item.description}
              </p>
            )}

            {/* Abilities Preview for 3D cards */}
            {is3D && item.abilities && (
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Abilities:</h4>
                <div className="flex flex-wrap gap-1">
                  {item.abilities.slice(0, 2).map((ability, i) => (
                    <span key={i} className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                      {ability}
                    </span>
                  ))}
                  {item.abilities.length > 2 && (
                    <span className="text-xs text-slate-500">+{item.abilities.length - 2}</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileHover={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="mb-3"
              >
                {getElementIcon(item.element)}
              </motion.div>
              <h4 className="font-bold text-emerald-300 mb-2 text-lg">{item.name}</h4>
              {item.description && (
                <p className="text-sm opacity-90 mb-3 leading-relaxed">{item.description}</p>
              )}
              {item.dragonClass && (
                <p className="text-xs text-emerald-400 mb-2">Class: {item.dragonClass}</p>
              )}
              <div className="text-xs opacity-75 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                Click to learn more
              </div>
            </div>
          </div>

          {/* 3D Transform Effect */}
          {is3D && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className={`overflow-hidden relative ${className}`}>
      {/* Enhanced Gradient fade edges */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 z-10 pointer-events-none" />
      
      {/* Magical shimmer effect */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.div
          className="w-full h-full bg-gradient-to-r from-transparent via-emerald-200/20 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      
      <motion.div
        ref={carouselRef}
        className="flex gap-8 py-6"
        variants={carouselVariants}
        animate={isVisible && !isHovered ? "animate" : "pause"}
        onHoverStart={() => pauseOnHover && setIsHovered(true)}
        onHoverEnd={() => pauseOnHover && setIsHovered(false)}
        style={{ 
          display: "flex", 
          flexWrap: "nowrap", 
          width: "400%"
        }}
      >
        {duplicatedItems.map(getCardContent)}
      </motion.div>
    </div>
  );
}