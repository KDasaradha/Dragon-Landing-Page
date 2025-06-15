"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { analytics } from '@/lib/analytics';

interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
  
  // Custom metrics
  domContentLoaded: number | null;
  loadComplete: number | null;
  renderTime: number | null;
  interactionTime: number | null;
  
  // Memory usage (if available)
  memoryUsage: number | null;
  
  // Network information
  connectionType: string | null;
  effectiveType: string | null;
  
  // Visibility API
  visibilityChanges: number;
  timeOnPage: number;
}

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    domContentLoaded: null,
    loadComplete: null,
    renderTime: null,
    interactionTime: null,
    memoryUsage: null,
    connectionType: null,
    effectiveType: null,
    visibilityChanges: 0,
    timeOnPage: 0,
  });

  const [isMonitoring, setIsMonitoring] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const visibilityStartRef = useRef<number>(Date.now());

  // Update metrics helper
  const updateMetric = useCallback((key: keyof PerformanceMetrics, value: number | string) => {
    setMetrics(prev => ({ ...prev, [key]: value }));
  }, []);

  // Core Web Vitals monitoring
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'largest-contentful-paint':
            updateMetric('lcp', entry.startTime);
            analytics.performanceMetric('LCP', entry.startTime);
            break;
            
          case 'first-input':
            const fid = (entry as any).processingStart - entry.startTime;
            updateMetric('fid', fid);
            analytics.performanceMetric('FID', fid);
            break;
            
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              updateMetric('cls', (entry as any).value);
              analytics.performanceMetric('CLS', (entry as any).value * 1000);
            }
            break;
            
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              updateMetric('fcp', entry.startTime);
              analytics.performanceMetric('FCP', entry.startTime);
            }
            break;
            
          case 'navigation':
            const navEntry = entry as PerformanceNavigationTiming;
            updateMetric('ttfb', navEntry.responseStart - navEntry.fetchStart);
            updateMetric('domContentLoaded', navEntry.domContentLoadedEventEnd - navEntry.fetchStart);
            updateMetric('loadComplete', navEntry.loadEventEnd - navEntry.fetchStart);
            break;
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift', 'paint', 'navigation'] });
    } catch (error) {
      console.warn('Performance observer not fully supported', error);
    }

    return () => observer.disconnect();
  }, [updateMetric]);

  // Memory monitoring
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        updateMetric('memoryUsage', memory.usedJSHeapSize / 1024 / 1024); // MB
      }
    };

    updateMemoryUsage();
    const interval = setInterval(updateMemoryUsage, 5000);

    return () => clearInterval(interval);
  }, [updateMetric]);

  // Network information
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateNetworkInfo = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        updateMetric('connectionType', connection.type || 'unknown');
        updateMetric('effectiveType', connection.effectiveType || 'unknown');
      }
    };

    updateNetworkInfo();
    
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', updateNetworkInfo);
      return () => connection.removeEventListener('change', updateNetworkInfo);
    }
  }, [updateMetric]);

  // Visibility API monitoring
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let visibilityChangeCount = 0;

    const handleVisibilityChange = () => {
      visibilityChangeCount++;
      updateMetric('visibilityChanges', visibilityChangeCount);
      
      if (document.visibilityState === 'visible') {
        visibilityStartRef.current = Date.now();
      } else {
        const timeVisible = Date.now() - visibilityStartRef.current;
        updateMetric('timeOnPage', metrics.timeOnPage + timeVisible);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [updateMetric, metrics.timeOnPage]);

  // Time on page tracking
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        const currentTime = Date.now() - startTimeRef.current;
        updateMetric('timeOnPage', currentTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [updateMetric]);

  // Component render time tracking
  const measureRenderTime = useCallback((componentName: string, startTime: number) => {
    const renderTime = performance.now() - startTime;
    updateMetric('renderTime', renderTime);
    analytics.performanceMetric(`${componentName}_render_time`, renderTime);
  }, [updateMetric]);

  // Interaction time tracking
  const measureInteractionTime = useCallback((interactionType: string, startTime: number) => {
    const interactionTime = performance.now() - startTime;
    updateMetric('interactionTime', interactionTime);
    analytics.performanceMetric(`${interactionType}_interaction_time`, interactionTime);
  }, [updateMetric]);

  // Resource loading monitoring
  const getResourceMetrics = useCallback(() => {
    if (typeof window === 'undefined') return [];

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    return resources.map(resource => ({
      name: resource.name,
      duration: resource.duration,
      size: resource.transferSize || 0,
      type: resource.initiatorType,
      loadTime: resource.responseEnd - resource.startTime,
    }));
  }, []);

  // Performance score calculation
  const getPerformanceScore = useCallback(() => {
    let score = 100;
    
    // LCP scoring (0-4s scale)
    if (metrics.lcp) {
      if (metrics.lcp > 4000) score -= 30;
      else if (metrics.lcp > 2500) score -= 15;
    }
    
    // FID scoring (0-300ms scale)
    if (metrics.fid) {
      if (metrics.fid > 300) score -= 25;
      else if (metrics.fid > 100) score -= 10;
    }
    
    // CLS scoring (0-0.25 scale)
    if (metrics.cls) {
      if (metrics.cls > 0.25) score -= 20;
      else if (metrics.cls > 0.1) score -= 10;
    }
    
    return Math.max(score, 0);
  }, [metrics]);

  // Start/stop monitoring
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    startTimeRef.current = Date.now();
    visibilityStartRef.current = Date.now();
  }, []);

  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  // Export metrics
  const exportMetrics = useCallback(() => {
    const reportData = {
      ...metrics,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      performanceScore: getPerformanceScore(),
      resourceMetrics: getResourceMetrics(),
    };

    // Send to analytics
    analytics.performanceMetric('performance_report', getPerformanceScore());
    
    return reportData;
  }, [metrics, getPerformanceScore, getResourceMetrics]);

  return {
    metrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    measureRenderTime,
    measureInteractionTime,
    getResourceMetrics,
    getPerformanceScore,
    exportMetrics,
  };
}

// Hook for component-specific performance monitoring
export function useComponentPerformance(componentName: string) {
  const { measureRenderTime, measureInteractionTime } = usePerformanceMonitor();
  const renderStartRef = useRef<number>(0);

  useEffect(() => {
    renderStartRef.current = performance.now();
    
    return () => {
      measureRenderTime(componentName, renderStartRef.current);
    };
  }, [componentName, measureRenderTime]);

  const trackInteraction = useCallback((interactionType: string) => {
    const startTime = performance.now();
    
    return () => {
      measureInteractionTime(`${componentName}_${interactionType}`, startTime);
    };
  }, [componentName, measureInteractionTime]);

  return { trackInteraction };
}