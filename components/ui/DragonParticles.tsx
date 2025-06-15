"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  direction: number;
  opacity: number;
  type: 'ember' | 'sparkle' | 'magic' | 'star';
}

interface DragonParticlesProps {
  count?: number;
  colors?: string[];
  types?: ('ember' | 'sparkle' | 'magic' | 'star')[];
  intensity?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  className?: string;
}

export function DragonParticles({
  count = 30,
  colors = ['#ff6b35', '#f7931e', '#00ffff', '#ffffff', '#ff00ff'],
  types = ['ember', 'sparkle', 'magic'],
  intensity = 'medium',
  interactive = true,
  className = ''
}: DragonParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const createParticle = useCallback((): Particle => {
    return {
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 2 + 1,
      direction: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.8 + 0.2,
      type: types[Math.floor(Math.random() * types.length)]
    };
  }, [colors, types]);

  useEffect(() => {
    const initialParticles = Array.from({ length: count }, createParticle);
    setParticles(initialParticles);
  }, [count, createParticle]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [interactive]);

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x + Math.cos(particle.direction) * particle.speed;
          let newY = particle.y + Math.sin(particle.direction) * particle.speed;

          // Interactive mouse repulsion/attraction
          if (interactive) {
            const dx = mousePosition.x - particle.x;
            const dy = mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              const force = (100 - distance) / 100;
              newX -= dx * force * 0.1;
              newY -= dy * force * 0.1;
            }
          }

          // Wrap around screen edges
          if (newX < 0) newX = window.innerWidth;
          if (newX > window.innerWidth) newX = 0;
          if (newY < 0) newY = window.innerHeight;
          if (newY > window.innerHeight) newY = 0;

          return {
            ...particle,
            x: newX,
            y: newY,
            direction: particle.direction + (Math.random() - 0.5) * 0.1
          };
        })
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, [interactive, mousePosition]);

  const getParticleVariants = (type: string) => {
    switch (type) {
      case 'ember':
        return {
          animate: {
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.8, 1, 0.6, 0.8],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }
        };
      case 'sparkle':
        return {
          animate: {
            rotate: [0, 180, 360],
            scale: [0.5, 1, 0.5],
            opacity: [0.4, 1, 0.4],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }
        };
      case 'magic':
        return {
          animate: {
            y: [0, -10, 0],
            opacity: [0.6, 1, 0.6],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }
        };
      default:
        return {
          animate: {
            opacity: [0.5, 1, 0.5],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }
        };
    }
  };

  const renderParticle = (particle: Particle) => {
    const baseStyle = {
      position: 'absolute' as const,
      left: particle.x,
      top: particle.y,
      width: particle.size,
      height: particle.size,
      pointerEvents: 'none' as const,
    };

    switch (particle.type) {
      case 'ember':
        return (
          <motion.div
            key={particle.id}
            style={{
              ...baseStyle,
              background: `radial-gradient(circle, ${particle.color}, transparent)`,
              borderRadius: '50%',
              filter: 'blur(0.5px)',
            }}
            variants={getParticleVariants('ember')}
            animate="animate"
          />
        );
      case 'sparkle':
        return (
          <motion.div
            key={particle.id}
            style={{
              ...baseStyle,
              background: particle.color,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            }}
            variants={getParticleVariants('sparkle')}
            animate="animate"
          />
        );
      case 'magic':
        return (
          <motion.div
            key={particle.id}
            style={{
              ...baseStyle,
              background: `linear-gradient(45deg, ${particle.color}, transparent)`,
              borderRadius: '50%',
              boxShadow: `0 0 10px ${particle.color}`,
            }}
            variants={getParticleVariants('magic')}
            animate="animate"
          />
        );
      default:
        return (
          <motion.div
            key={particle.id}
            style={{
              ...baseStyle,
              background: particle.color,
              borderRadius: '50%',
              opacity: particle.opacity,
            }}
          />
        );
    }
  };

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      <AnimatePresence>
        {particles.map(renderParticle)}
      </AnimatePresence>
    </div>
  );
}

export default DragonParticles;