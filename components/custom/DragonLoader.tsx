"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DragonLoaderProps {
  variant?: 'default' | 'fire' | 'magic' | 'shadow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
}

export function DragonLoader({ 
  variant = 'default', 
  size = 'md', 
  className,
  text = 'Loading...'
}: DragonLoaderProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  if (variant === 'fire') {
    return (
      <div className={cn("flex flex-col items-center gap-4", className)}>
        <div className="relative">
          {/* Fire Dragon Animation */}
          <motion.div
            className={cn(
              "relative rounded-full dragon-fire-effect",
              sizeClasses[size]
            )}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <motion.div
              className="absolute inset-2 bg-yellow-400 rounded-full"
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          {/* Ember Particles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-500 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: '0 0'
              }}
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 30],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 30],
                opacity: [1, 0],
                scale: [1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
        
        {text && (
          <motion.p
            className="text-sm font-medium text-orange-600 dark:text-orange-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === 'magic') {
    return (
      <div className={cn("flex flex-col items-center gap-4", className)}>
        <div className="relative">
          {/* Magic Circle */}
          <motion.div
            className={cn(
              "relative border-2 border-purple-500 rounded-full",
              sizeClasses[size]
            )}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              className="absolute inset-1 border border-purple-300 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Central Orb */}
            <motion.div
              className="absolute inset-1/3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          
          {/* Magic Sparkles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos(i * 45 * Math.PI / 180) * 40],
                y: [0, Math.sin(i * 45 * Math.PI / 180) * 40],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {text && (
          <motion.p
            className="text-sm font-medium holographic-text"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === 'shadow') {
    return (
      <div className={cn("flex flex-col items-center gap-4", className)}>
        <div className="relative">
          {/* Shadow Dragon Silhouette */}
          <motion.div
            className={cn(
              "relative bg-gradient-to-r from-slate-700 to-slate-900 rounded-full",
              sizeClasses[size]
            )}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-500 to-transparent rounded-full"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          
          {/* Shadow Wisps */}
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-slate-600 rounded-full opacity-60"
              style={{
                left: `${25 + i * 15}%`,
                top: `${20 + i * 20}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {text && (
          <motion.p
            className="text-sm font-medium text-slate-600 dark:text-slate-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  // Default Dragon Loader
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative">
        <motion.div
          className={cn(
            "relative border-4 border-emerald-500 rounded-full",
            sizeClasses[size]
          )}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute top-0 left-1/2 w-2 h-2 -mt-1 -ml-1 bg-emerald-500 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              boxShadow: [
                "0 0 0 0 rgba(16, 185, 129, 0.7)",
                "0 0 0 10px rgba(16, 185, 129, 0)",
                "0 0 0 0 rgba(16, 185, 129, 0)"
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
      
      {text && (
        <motion.p
          className="text-sm font-medium text-emerald-600 dark:text-emerald-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

// Skeleton Loader for Dragon Cards
export function DragonCardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          {/* Image Skeleton */}
          <div className="h-48 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 animate-pulse" />
          
          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 animate-pulse" />
            
            <div className="flex gap-2 pt-2">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded flex-1 animate-pulse" />
              <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default DragonLoader;