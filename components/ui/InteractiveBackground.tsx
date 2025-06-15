"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InteractiveBackgroundProps {
  variant?: 'dragons' | 'stars' | 'aurora' | 'matrix';
  intensity?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  className?: string;
}

export function InteractiveBackground({
  variant = 'dragons',
  intensity = 'medium',
  interactive = true,
  className
}: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [interactive, handleMouseMove]);

  // Dragon Scales Background
  if (variant === 'dragons') {
    return (
      <div className={cn("fixed inset-0 pointer-events-none z-0", className)}>
        {/* Animated Dragon Scales */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <motion.div
            className="w-full h-full bg-dragon-scales bg-repeat"
            animate={{
              backgroundPosition: ['0px 0px', '100px 100px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </div>

        {/* Floating Dragon Silhouettes */}
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 opacity-5 dark:opacity-10"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
                background: `url('/images/dragon-silhouette-${i + 1}.svg')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 2
              }}
            />
          ))}
        </div>

        {/* Interactive Particles */}
        {interactive && (
          <div className="absolute inset-0">
            {Array.from({ length: intensity === 'high' ? 50 : intensity === 'medium' ? 30 : 15 }).map((_, i) => {
              const distance = Math.sqrt(
                Math.pow(mousePosition.x - (windowSize.width * (i * 0.02)), 2) +
                Math.pow(mousePosition.y - (windowSize.height * (i * 0.03)), 2)
              );
              const maxDistance = 200;
              const influence = Math.max(0, 1 - distance / maxDistance);

              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-emerald-500 rounded-full opacity-30"
                  style={{
                    left: `${(i * 2.3) % 100}%`,
                    top: `${(i * 1.7) % 100}%`,
                  }}
                  animate={{
                    scale: 1 + influence * 3,
                    opacity: 0.3 + influence * 0.7,
                    x: influence * (mousePosition.x > windowSize.width / 2 ? 10 : -10),
                    y: influence * (mousePosition.y > windowSize.height / 2 ? 10 : -10),
                  }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Aurora Background
  if (variant === 'aurora') {
    return (
      <div className={cn("fixed inset-0 pointer-events-none z-0", className)}>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-emerald-900/20 to-slate-900">
          {/* Aurora Waves */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              style={{
                background: `linear-gradient(${90 + i * 30}deg, 
                  transparent, 
                  rgba(16, 185, 129, ${0.1 + i * 0.05}), 
                  rgba(139, 92, 246, ${0.1 + i * 0.05}), 
                  transparent
                )`,
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                transform: [
                  'translateY(0px) scaleY(1)',
                  'translateY(-20px) scaleY(1.1)',
                  'translateY(0px) scaleY(1)'
                ]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 1
              }}
            />
          ))}
        </div>

        {/* Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Matrix Effect
  if (variant === 'matrix') {
    return (
      <div className={cn("fixed inset-0 pointer-events-none z-0", className)}>
        <canvas
          ref={canvasRef}
          className="w-full h-full opacity-20 dark:opacity-30"
          width={windowSize.width}
          height={windowSize.height}
        />
        {/* Matrix implementation would go here */}
      </div>
    );
  }

  // Stars Background (default fallback)
  return (
    <div className={cn("fixed inset-0 pointer-events-none z-0", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950">
        {Array.from({ length: 200 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default InteractiveBackground;