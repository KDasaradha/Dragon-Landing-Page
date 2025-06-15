// Animation utilities for consistent framer-motion animations
import { Variants } from "framer-motion";

// Common easing functions
export const easings = {
  easeOut: [0.22, 1, 0.36, 1] as const,
  easeIn: [0.42, 0, 1, 1] as const,
  easeInOut: [0.42, 0, 0.58, 1] as const,
  backOut: [0.175, 0.885, 0.32, 1.275] as const,
  backIn: [0.68, -0.55, 0.265, 1.55] as const,
  backInOut: [0.68, -0.55, 0.265, 1.55] as const,
};

// Common animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: easings.easeOut } 
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: easings.easeOut } 
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.6, ease: easings.easeOut } 
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 1.2, ease: easings.easeOut } 
  },
};

export const slideInLeft: Variants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1, 
    transition: { type: "spring", damping: 15, stiffness: 100, duration: 0.8 } 
  },
  exit: { 
    x: "-100%", 
    opacity: 0, 
    transition: { duration: 0.3, ease: easings.easeInOut } 
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

// Hover effects
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2, ease: easings.easeInOut }
};

export const hoverLift = {
  y: -5,
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
  transition: { duration: 0.3, ease: easings.easeInOut }
};

// Advanced Dragon-themed Animations
export const dragonFlight: Variants = {
  hidden: { 
    opacity: 0, 
    x: -100, 
    y: 50,
    rotateZ: -15,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    y: 0,
    rotateZ: 0,
    scale: 1,
    transition: { 
      duration: 1.5, 
      ease: easings.backOut,
      type: "spring",
      stiffness: 100,
      damping: 15
    } 
  },
};

export const magicalAppear: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.3,
    rotateY: 180,
    filter: "blur(10px)"
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotateY: 0,
    filter: "blur(0px)",
    transition: { 
      duration: 1.2, 
      ease: easings.backOut,
      filter: { duration: 0.8 }
    } 
  },
};

export const emberFloat: Variants = {
  animate: {
    y: [-20, -40, -20],
    x: [-5, 5, -5],
    opacity: [0.8, 1, 0.6],
    scale: [1, 1.2, 0.9],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const dragonBreath: Variants = {
  animate: {
    scaleX: [1, 1.1, 1],
    scaleY: [1, 0.95, 1],
    rotateZ: [0, 1, -1, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const mysticalGlow: Variants = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(16, 185, 129, 0.5)",
      "0 0 40px rgba(16, 185, 129, 0.8)",
      "0 0 20px rgba(16, 185, 129, 0.5)"
    ],
    scale: [1, 1.02, 1],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const cardFlip3D: Variants = {
  front: { 
    rotateY: 0,
    transition: { duration: 0.6, ease: easings.easeInOut }
  },
  back: { 
    rotateY: 180,
    transition: { duration: 0.6, ease: easings.easeInOut }
  },
};

export const parallaxFloat: Variants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const typewriterText: Variants = {
  hidden: { width: 0 },
  visible: {
    width: "auto",
    transition: {
      duration: 2,
      ease: "easeOut"
    }
  }
};

export const morphingShape: Variants = {
  animate: {
    borderRadius: [
      "60% 40% 30% 70% / 60% 30% 70% 40%",
      "30% 60% 70% 40% / 50% 60% 30% 60%",
      "60% 40% 30% 70% / 60% 30% 70% 40%"
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Stagger animations with different delays
export const staggerItems: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const cascadeIn: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    rotateX: -90 
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: easings.backOut,
    },
  }),
};

// Interactive hover effects
export const dragonHover = {
  scale: 1.05,
  rotateZ: 2,
  y: -8,
  boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
  filter: "brightness(1.1)",
  transition: { 
    duration: 0.4, 
    ease: easings.backOut 
  }
};

export const glowOnHover = {
  boxShadow: [
    "0 0 0px rgba(16, 185, 129, 0)",
    "0 0 30px rgba(16, 185, 129, 0.6)"
  ],
  transition: { duration: 0.3 }
};