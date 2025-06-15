"use client";

import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';
import { useApp } from '@/lib/contexts/AppContext';

interface UseAdvancedAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  stagger?: number;
  disabled?: boolean;
}

export function useAdvancedAnimation({
  threshold = 0.1,
  triggerOnce = true,
  delay = 0,
  stagger = 0,
  disabled = false,
}: UseAdvancedAnimationOptions = {}) {
  const { state } = useApp();
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold, triggerOnce });

  const animationsEnabled = state.user.preferences.animationsEnabled && !disabled;

  useEffect(() => {
    if (!animationsEnabled) {
      controls.set({ opacity: 1, y: 0, scale: 1 });
      return;
    }

    if (inView) {
      const timer = setTimeout(() => {
        controls.start({
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: "easeOut",
            staggerChildren: stagger,
          },
        });
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [inView, controls, delay, stagger, animationsEnabled]);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return {
    ref,
    controls,
    inView,
    variants,
    animate: animationsEnabled ? controls : false,
    initial: animationsEnabled ? 'hidden' : false,
  };
}

// Hook for scroll-triggered animations
export function useScrollAnimation() {
  const { actions } = useApp();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollTop / docHeight;
      
      actions.setScrollProgress(scrollProgress);

      // Determine current section
      const sections = ['hero', 'about', 'features', 'dragons', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        actions.setCurrentSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [actions]);
}

// Hook for complex hover animations
export function useHoverAnimation() {
  const { state } = useApp();
  const controls = useAnimation();
  
  const animationsEnabled = state.user.preferences.animationsEnabled;

  const handleHoverStart = () => {
    if (animationsEnabled) {
      controls.start({
        scale: 1.05,
        rotateY: 5,
        z: 50,
        transition: { duration: 0.3, ease: 'easeOut' },
      });
    }
  };

  const handleHoverEnd = () => {
    if (animationsEnabled) {
      controls.start({
        scale: 1,
        rotateY: 0,
        z: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
      });
    }
  };

  return {
    controls,
    whileHover: animationsEnabled ? { scale: 1.05, rotateY: 5 } : undefined,
    whileTap: animationsEnabled ? { scale: 0.95 } : undefined,
    onHoverStart: handleHoverStart,
    onHoverEnd: handleHoverEnd,
    animate: controls,
  };
}

// Hook for stagger animations
export function useStaggerAnimation(itemCount: number) {
  const { state } = useApp();
  const animationsEnabled = state.user.preferences.animationsEnabled;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return {
    containerVariants: animationsEnabled ? containerVariants : undefined,
    itemVariants: animationsEnabled ? itemVariants : undefined,
    initial: animationsEnabled ? 'hidden' : undefined,
    animate: animationsEnabled ? 'visible' : undefined,
  };
}