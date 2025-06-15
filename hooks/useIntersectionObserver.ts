"use client";

import { useEffect, useRef, useState, useMemo } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  skip?: boolean;
  onEnter?: (entry: IntersectionObserverEntry) => void;
  onExit?: (entry: IntersectionObserverEntry) => void;
}

export function useIntersectionObserver<T extends Element = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = false,
  skip = false,
  onEnter,
  onExit,
}: UseIntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const elementRef = useRef<T>(null);

  const observer = useMemo(() => {
    if (typeof window === 'undefined' || skip) return null;

    return new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isCurrentlyIntersecting = entry.isIntersecting;
        
        setEntry(entry);
        setIsIntersecting(isCurrentlyIntersecting);

        if (isCurrentlyIntersecting && !hasEntered) {
          setHasEntered(true);
          onEnter?.(entry);
        } else if (!isCurrentlyIntersecting && hasEntered) {
          onExit?.(entry);
        }

        // Stop observing if triggerOnce and element has entered
        if (triggerOnce && isCurrentlyIntersecting) {
          observer?.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );
  }, [threshold, rootMargin, triggerOnce, skip, hasEntered, onEnter, onExit]);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement || !observer) return;

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [observer]);

  return {
    ref: elementRef,
    isIntersecting,
    hasEntered,
    entry,
    // Helper properties
    intersectionRatio: entry?.intersectionRatio ?? 0,
    boundingClientRect: entry?.boundingClientRect,
    rootBounds: entry?.rootBounds,
  };
}

// Advanced hook for multiple elements
export function useIntersectionObserverMultiple<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const [entries, setEntries] = useState<Map<Element, IntersectionObserverEntry>>(new Map());
  const elementsRef = useRef<Set<T>>(new Set());

  const observer = useMemo(() => {
    if (typeof window === 'undefined' || options.skip) return null;

    return new IntersectionObserver(
      (observerEntries) => {
        setEntries(prev => {
          const newEntries = new Map(prev);
          
          observerEntries.forEach(entry => {
            newEntries.set(entry.target, entry);
            
            if (entry.isIntersecting) {
              options.onEnter?.(entry);
            } else {
              options.onExit?.(entry);
            }
          });
          
          return newEntries;
        });
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? '0px',
      }
    );
  }, [options]);

  const observe = (element: T) => {
    if (!observer || !element) return;
    
    elementsRef.current.add(element);
    observer.observe(element);
  };

  const unobserve = (element: T) => {
    if (!observer || !element) return;
    
    elementsRef.current.delete(element);
    observer.unobserve(element);
    setEntries(prev => {
      const newEntries = new Map(prev);
      newEntries.delete(element);
      return newEntries;
    });
  };

  const disconnect = () => {
    if (observer) {
      observer.disconnect();
      elementsRef.current.clear();
      setEntries(new Map());
    }
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return {
    observe,
    unobserve,
    disconnect,
    entries,
    getEntry: (element: Element) => entries.get(element),
    isIntersecting: (element: Element) => entries.get(element)?.isIntersecting ?? false,
  };
}

// Hook for scroll progress tracking
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(scrollTop / docHeight, 1);
      
      setProgress(scrollProgress);
      setIsScrolling(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return { progress, isScrolling };
}

// Hook for element visibility with additional features
export function useElementVisibility<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions & {
    visibilityThreshold?: number;
    partiallyVisible?: boolean;
  } = {}
) {
  const { visibilityThreshold = 0.5, partiallyVisible = false, ...observerOptions } = options;
  const [visibility, setVisibility] = useState({
    isVisible: false,
    isPartiallyVisible: false,
    isFullyVisible: false,
    visibilityRatio: 0,
  });

  const { ref, entry, isIntersecting } = useIntersectionObserver<T>({
    ...observerOptions,
    threshold: partiallyVisible ? [0, visibilityThreshold, 1] : visibilityThreshold,
  });

  useEffect(() => {
    if (entry) {
      const ratio = entry.intersectionRatio;
      
      setVisibility({
        isVisible: isIntersecting,
        isPartiallyVisible: ratio > 0,
        isFullyVisible: ratio >= 0.95,
        visibilityRatio: ratio,
      });
    }
  }, [entry, isIntersecting]);

  return {
    ref,
    ...visibility,
    entry,
  };
}