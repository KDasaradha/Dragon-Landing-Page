"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Heart, Eye, Star, Zap, Shield, Brain, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useDragons } from '@/lib/contexts/AppContext';
import { useHoverAnimation } from '@/hooks/useAdvancedAnimation';
import { cn } from '@/lib/utils';
import type { Dragon } from '@/lib/contexts/AppContext';

interface DragonCardProps {
  dragon: Dragon;
  index?: number;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
  onClick?: (dragon: Dragon) => void;
}

const rarityConfig: Variants = {
  common: {
    gradient: 'from-slate-400 to-slate-600',
    glow: 'shadow-slate-500/20',
    border: 'border-slate-300',
  },
  rare: {
    gradient: 'from-blue-400 to-purple-600',
    glow: 'shadow-blue-500/30',
    border: 'border-blue-300',
  },
  legendary: {
    gradient: 'from-amber-400 to-orange-600',
    glow: 'shadow-amber-500/40',
    border: 'border-amber-300',
  },
};

const StatIcon = ({ stat }: { stat: string }) => {
  const icons: Variants = {
    speed: Wind,
    strength: Zap,
    intelligence: Brain,
    stealth: Shield,
  };
  const Icon = icons[stat as keyof typeof icons] || Star;
  return <Icon className="w-4 h-4" />;
};

export function DragonCard({ 
  dragon, 
  index = 0, 
  variant = 'default', 
  className,
  onClick 
}: DragonCardProps) {
  const { favorites, toggleFavorite, viewDragon } = useDragons();
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const isFavorite = favorites.includes(dragon.id);
  const { controls, whileHover, whileTap, onHoverStart, onHoverEnd } = useHoverAnimation();

  const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(dragon.id);
  }, [dragon.id, toggleFavorite]);

  const handleCardClick = useCallback(() => {
    viewDragon(dragon.id);
    onClick?.(dragon);
  }, [dragon, onClick, viewDragon]);

  const handleFlip = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: -15,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const flipVariants: Variants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  if (variant === 'compact') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={controls}
        whileHover={whileHover}
        whileTap={whileTap}
        className={cn(
          "relative group cursor-pointer",
          className
        )}
        onClick={handleCardClick}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
      >
        <div className={cn(
          "relative overflow-hidden rounded-lg bg-white dark:bg-slate-800 border-2 transition-all duration-300",
          rarityConfig[dragon.rarity].border,
          rarityConfig[dragon.rarity].glow,
          "group-hover:shadow-xl"
        )}>
          <OptimizedImage
            src={dragon.image}
            alt={dragon.name}
            width={200}
            height={150}
            className="w-full h-32 object-cover"
          />
          <div className="p-3">
            <h3 className="font-semibold text-sm truncate">{dragon.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {dragon.rarity}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleFavoriteClick}
          >
            <Heart className={cn("w-4 h-4", isFavorite && "fill-red-500 text-red-500")} />
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={whileHover}
      whileTap={whileTap}
      className={cn(
        "relative group cursor-pointer perspective-1000",
        className
      )}
      style={{ perspective: '1000px' }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={isFlipped ? 'back' : 'front'}
        variants={flipVariants}
        transition={{ duration: 0.6, ease: easings.easeInOut }}
      >
        {/* Front Side */}
        <div className={cn(
          "absolute inset-0 backface-hidden rounded-xl overflow-hidden",
          "bg-white dark:bg-slate-800 border-2 transition-all duration-300",
          rarityConfig[dragon.rarity].border,
          "group-hover:shadow-2xl",
          rarityConfig[dragon.rarity].glow
        )}>
          {/* Rarity Indicator */}
          <div className={cn(
            "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
            rarityConfig[dragon.rarity].gradient
          )} />

          {/* Image Section */}
          <div className="relative h-48 overflow-hidden">
            <OptimizedImage
              src={dragon.image}
              alt={dragon.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Favorite Button */}
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

            {/* View Count */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
              <Eye className="w-3 h-3 text-white" />
              <span className="text-xs text-white">
                {Math.floor(Math.random() * 1000)}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {dragon.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {dragon.type}
                </p>
              </div>
              <Badge 
                variant="secondary" 
                className={cn(
                  "capitalize font-medium",
                  dragon.rarity === 'legendary' && "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
                  dragon.rarity === 'rare' && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                  dragon.rarity === 'common' && "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200"
                )}
              >
                {dragon.rarity}
              </Badge>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 line-clamp-2">
              {dragon.description}
            </p>

            {/* Abilities */}
            <div className="flex flex-wrap gap-1 mb-3">
              {dragon.abilities.slice(0, 3).map((ability) => (
                <span
                  key={ability}
                  className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 rounded-full"
                >
                  {ability}
                </span>
              ))}
              {dragon.abilities.length > 3 && (
                <span className="text-xs px-2 py-1 bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200 rounded-full">
                  +{dragon.abilities.length - 3}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={handleCardClick}
              >
                View Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFlip}
              >
                Stats
              </Button>
            </div>
          </div>
        </div>

        {/* Back Side - Stats */}
        <div className={cn(
          "absolute inset-0 backface-hidden rounded-xl overflow-hidden rotate-y-180",
          "bg-white dark:bg-slate-800 border-2",
          rarityConfig[dragon.rarity].border,
          "p-6 flex flex-col justify-center"
        )}>
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              {dragon.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Combat Statistics
            </p>
          </div>

          <div className="space-y-4">
            {Object.entries(dragon.stats).map(([stat, value]) => (
              <div key={stat} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StatIcon stat={stat} />
                  <span className="text-sm font-medium capitalize">
                    {stat}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={value} className="w-20" />
                  <span className="text-sm font-bold w-8">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="mt-6"
            onClick={handleFlip}
          >
            Back to Info
          </Button>
        </div>
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {!imageLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Memoized for performance
export const MemoizedDragonCard = React.memo(DragonCard);