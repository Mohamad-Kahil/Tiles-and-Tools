import React, { useEffect, useState } from "react";

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  ttfb: number | null;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,
  });

  useEffect(() => {
    // Only run in production or when explicitly enabled
    if (
      process.env.NODE_ENV !== "production" &&
      !import.meta.env.VITE_ENABLE_MONITORING
    ) {
      return;
    }

    // Check if the browser supports the Performance API
    if (!("PerformanceObserver" in window)) {
      console.warn("Performance monitoring not supported in this browser");
      return;
    }

    // First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const fcp = entries[0].startTime;
          setMetrics((prev) => ({ ...prev, fcp }));
          console.log(`📊 FCP: ${fcp.toFixed(2)}ms`);
          sendToAnalytics("fcp", fcp);
        }
      });
      fcpObserver.observe({ type: "paint", buffered: true });
    } catch (e) {
      console.error("Error monitoring FCP:", e);
    }

    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const lcp = lastEntry.startTime;
          setMetrics((prev) => ({ ...prev, lcp }));
          console.log(`📊 LCP: ${lcp.toFixed(2)}ms`);
          sendToAnalytics("lcp", lcp);
        }
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch (e) {
      console.error("Error monitoring LCP:", e);
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        setMetrics((prev) => ({ ...prev, cls: clsValue }));
        console.log(`📊 CLS: ${clsValue.toFixed(3)}`);
        sendToAnalytics("cls", clsValue);
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch (e) {
      console.error("Error monitoring CLS:", e);
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const fid = entries[0].processingStart - entries[0].startTime;
          setMetrics((prev) => ({ ...prev, fid }));
          console.log(`📊 FID: ${fid.toFixed(2)}ms`);
          sendToAnalytics("fid", fid);
        }
      });
      fidObserver.observe({ type: "first-input", buffered: true });
    } catch (e) {
      console.error("Error monitoring FID:", e);
    }

    // Time to First Byte (TTFB)
    try {
      const navigationEntries = performance.getEntriesByType("navigation");
      if (navigationEntries.length > 0) {
        const ttfb = (navigationEntries[0] as any).responseStart;
        setMetrics((prev) => ({ ...prev, ttfb }));
        console.log(`📊 TTFB: ${ttfb.toFixed(2)}ms`);
        sendToAnalytics("ttfb", ttfb);
      }
    } catch (e) {
      console.error("Error monitoring TTFB:", e);
    }

    // Clean up observers on unmount
    return () => {
      if ("PerformanceObserver" in window) {
        PerformanceObserver.disconnect();
      }
    };
  }, []);

  // Function to send metrics to analytics service
  const sendToAnalytics = (metricName: string, value: number) => {
    // In a real app, you would send this to your analytics service
    // For example, using Google Analytics:
    if (window.gtag) {
      window.gtag("event", "web_vitals", {
        event_category: "Web Vitals",
        event_label: metricName,
        value: Math.round(value),
        non_interaction: true,
      });
    }
  };

  // This component doesn't render anything visible
  return null;
};

export default PerformanceMonitor;
