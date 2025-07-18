"use client";

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Heart, Eye, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/custom/optimized-image';
import { useDragons } from '@/lib/contexts/AppContext';
import { cn } from '@/lib/utils';
import type { Dragon } from '@/lib/contexts/AppContext';
import { 
  dragonFlight, 
  magicalAppear, 
  mysticalGlow, 
  dragonHover,
  emberFloat 
} from '@/utils/animations';

interface EnhancedDragonCardProps {
  dragon: Dragon;
  index?: number;
  variant?: 'default' | 'compact' | 'detailed' | 'premium';
  className?: string;
  onClick?: (dragon: Dragon) => void;
  showParticles?: boolean;
}

const rarityEffects = {
  common: {
    gradient: 'from-slate-400 to-slate-600',
    glow: 'shadow-slate-500/20',
    border: 'border-slate-300',
    particles: ['#94a3b8', '#64748b'],
    aura: ''
  },
  rare: {
    gradient: 'from-blue-400 to-purple-600',
    glow: 'shadow-blue-500/30',
    border: 'border-blue-300',
    particles: ['#3b82f6', '#8b5cf6'],
    aura: 'rare-aura'
  },
  legendary: {
    gradient: 'from-amber-400 to-orange-600',
    glow: 'shadow-amber-500/40',
    border: 'border-amber-300',
    particles: ['#f59e0b', '#ea580c', '#fbbf24'],
    aura: 'legendary-aura'
  },
};


export function EnhancedDragonCard({ 
  dragon, 
  variant = 'default', 
  className,
  onClick,
  showParticles = true
}: EnhancedDragonCardProps) {
  const { favorites, toggleFavorite, viewDragon } = useDragons();
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [30, -30]);
  const rotateY = useTransform(mouseX, [-300, 300], [-30, 30]);
  
  const isFavorite = favorites.includes(dragon.id);
  const rarity = rarityEffects[dragon.rarity];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(dragon.id);
    
    // Create particle burst effect
    if (showParticles) {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 1000);
    }
  }, [dragon.id, toggleFavorite, showParticles]);

  const handleCardClick = useCallback(() => {
    viewDragon(dragon.id);
    onClick?.(dragon);
  }, [dragon, onClick, viewDragon]);

  const handleFlip = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  if (variant === 'premium') {
    return (
      <motion.div
        ref={cardRef}
        className={cn(
          "relative group cursor-pointer perspective-1000",
          className
        )}
        style={{ 
          perspective: '1000px',
          rotateX: rotateX,
          rotateY: rotateY
        }}
        variants={dragonFlight}
        initial="hidden"
        animate="visible"
        whileHover={dragonHover}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        {/* Particle Effects */}
        <AnimatePresence>
          {showParticles && isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${rarity.particles[i % rarity.particles.length]}, transparent)`,
                    left: `${20 + (i * 15)}%`,
                    top: `${10 + (i * 10)}%`,
                  }}
                  variants={emberFloat}
                  animate="animate"
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Main Card */}
        <motion.div
          className={cn(
            "relative w-full h-full bg-white dark:bg-slate-800 rounded-2xl overflow-hidden",
            "border-2 transition-all duration-500 preserve-3d",
            rarity.border,
            rarity.glow,
            rarity.aura,
            "group-hover:shadow-2xl"
          )}
          variants={mysticalGlow}
          animate={isHovered ? "animate" : ""}
        >
          {/* Holographic Border Effect */}
          <div className={cn(
            "absolute top-0 left-0 right-0 h-1 holographic-text",
            "bg-gradient-to-r", rarity.gradient
          )} />

          {/* Glassmorphism Overlay */}
          <div className="absolute inset-0 glass-morphism opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Image Section with Advanced Effects */}
          <div className="relative h-56 overflow-hidden">
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <OptimizedImage
                src={dragon.image}
                alt={dragon.name}
                fill
                className="object-cover"
                onLoad={() => setImageLoaded(true)}
              />
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 scale-shimmer opacity-0 group-hover:opacity-100" />
            </motion.div>
            
            {/* Dynamic Gradient Overlay */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent",
              "group-hover:from-black/40"
            )} />
            
            {/* Floating Action Buttons */}
            <motion.div
              className="absolute top-4 right-4 flex flex-col gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            >
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                onClick={handleFavoriteClick}
              >
                <Heart className={cn(
                  "w-4 h-4 transition-all duration-300",
                  isFavorite ? "fill-red-500 text-red-500 scale-110" : "text-white"
                )} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
              >
                <Sparkles className="w-4 h-4 text-white" />
              </Button>
            </motion.div>

            {/* Rarity Indicator */}
            <div className="absolute bottom-4 left-4">
              <Badge 
                className={cn(
                  "capitalize font-bold text-xs px-3 py-1",
                  "bg-gradient-to-r", rarity.gradient,
                  "text-white border-0 shadow-lg"
                )}
              >
                {dragon.rarity}
              </Badge>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 relative">
            {/* Title with Text Effects */}
            <motion.h3 
              className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2"
              variants={magicalAppear}
              animate={imageLoaded ? "visible" : "hidden"}
            >
              <span className="holographic-text">{dragon.name}</span>
            </motion.h3>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              {dragon.type}
            </p>

            <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 line-clamp-2">
              {dragon.description}
            </p>

            {/* Enhanced Abilities */}
            <div className="flex flex-wrap gap-2 mb-4">
              {dragon.abilities.slice(0, 3).map((ability, i) => (
                <motion.span
                  key={ability}
                  className="text-xs px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 rounded-full font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {ability}
                </motion.span>
              ))}
            </div>

            {/* Action Buttons with Enhanced Effects */}
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300"
                onClick={handleCardClick}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
              <Button
                variant="outline"
                onClick={handleFlip}
                className="hover-glow"
              >
                <Star className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Burst Particles */}
        <AnimatePresence>
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-red-500 rounded-full pointer-events-none"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ 
                opacity: 0, 
                scale: 0,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Return regular enhanced card for other variants
  return (
    <motion.div
      className={cn(
        "relative group cursor-pointer",
        className
      )}
      variants={dragonFlight}
      initial="hidden"
      animate="visible"
      whileHover={dragonHover}
      onClick={handleCardClick}
    >
      <div className={cn(
        "relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 border-2 transition-all duration-300",
        rarity.border,
        rarity.glow,
        rarity.aura,
        "group-hover:shadow-2xl hover-glow"
      )}>
        {/* Enhanced content similar to original but with new effects */}
        <div className="relative h-48 overflow-hidden">
          <OptimizedImage
            src={dragon.image}
            alt={dragon.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30"
            onClick={handleFavoriteClick}
          >
            <Heart className={cn(
              "w-4 h-4 transition-colors",
              isFavorite ? "fill-red-500 text-red-500" : "text-white"
            )} />
          </Button>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
            {dragon.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            {dragon.type}
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 line-clamp-2">
            {dragon.description}
          </p>
          
          <div className="flex gap-2">
            <Button variant="default" size="sm" className="flex-1">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const MemoizedEnhancedDragonCard = React.memo(EnhancedDragonCard);