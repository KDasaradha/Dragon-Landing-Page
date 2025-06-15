"use client";

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

class Analytics {
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = typeof window !== 'undefined' && 
                    process.env.NODE_ENV === 'production';
  }

  // Google Analytics 4 Event Tracking
  track(event: AnalyticsEvent) {
    if (!this.isEnabled) {
      console.log('Analytics Event (Dev Mode):', event);
      return;
    }

    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }

    // Alternative: Send to custom analytics endpoint
    this.sendToCustomAnalytics(event);
  }

  // Custom analytics tracking
  private async sendToCustomAnalytics(event: AnalyticsEvent) {
    try {
      const data = {
        ...event,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      };

      // Replace with your analytics endpoint
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  }

  // Page view tracking
  pageView(path: string) {
    this.track({
      action: 'page_view',
      category: 'navigation',
      label: path,
    });
  }

  // User interaction events
  buttonClick(buttonName: string, section?: string) {
    this.track({
      action: 'button_click',
      category: 'engagement',
      label: `${section ? section + '_' : ''}${buttonName}`,
    });
  }

  // Dragon-specific events
  dragonView(dragonName: string) {
    this.track({
      action: 'dragon_view',
      category: 'content',
      label: dragonName,
    });
  }

  searchDragons(searchTerm: string, resultsCount: number) {
    this.track({
      action: 'dragon_search',
      category: 'search',
      label: searchTerm,
      value: resultsCount,
    });
  }

  themeToggle(newTheme: string) {
    this.track({
      action: 'theme_toggle',
      category: 'ui',
      label: newTheme,
    });
  }

  scrollToSection(sectionName: string) {
    this.track({
      action: 'scroll_to_section',
      category: 'navigation',
      label: sectionName,
    });
  }

  // Performance tracking
  performanceMetric(metricName: string, value: number) {
    this.track({
      action: 'performance_metric',
      category: 'performance',
      label: metricName,
      value: Math.round(value),
    });
  }
}

export const analytics = new Analytics();

// Performance monitoring hook
export function usePerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        analytics.performanceMetric('LCP', entry.startTime);
      }
      if (entry.entryType === 'first-input') {
        analytics.performanceMetric('FID', (entry as any).processingStart - entry.startTime);
      }
      if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
        analytics.performanceMetric('CLS', (entry as any).value);
      }
    }
  });

  observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
}