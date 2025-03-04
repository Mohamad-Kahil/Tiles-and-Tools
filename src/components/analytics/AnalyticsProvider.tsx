import React, { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface AnalyticsContextType {
  trackPageView: (path: string, title?: string) => void;
  trackEvent: (
    category: string,
    action: string,
    label?: string,
    value?: number,
  ) => void;
  trackPurchase: (orderId: string, total: number, items: any[]) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined,
);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
};

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
}) => {
  const location = useLocation();

  // Track page views when route changes
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  // Page view tracking
  const trackPageView = (path: string, title?: string) => {
    // In a real implementation, this would send data to your analytics service
    console.log(`📊 Page View: ${path}${title ? ` - ${title}` : ""}`);

    // Mock implementation for Google Analytics
    if (window.gtag) {
      window.gtag("config", "UA-XXXXXXXX-X", {
        page_path: path,
        page_title: title,
      });
    }
  };

  // Event tracking
  const trackEvent = (
    category: string,
    action: string,
    label?: string,
    value?: number,
  ) => {
    // In a real implementation, this would send data to your analytics service
    console.log(
      `📊 Event: ${category} - ${action}${label ? ` - ${label}` : ""}${value !== undefined ? ` - ${value}` : ""}`,
    );

    // Mock implementation for Google Analytics
    if (window.gtag) {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  // Purchase tracking
  const trackPurchase = (orderId: string, total: number, items: any[]) => {
    // In a real implementation, this would send data to your analytics service
    console.log(`📊 Purchase: ${orderId} - ${total} - ${items.length} items`);

    // Mock implementation for Google Analytics
    if (window.gtag) {
      window.gtag("event", "purchase", {
        transaction_id: orderId,
        value: total,
        currency: "EGP",
        items: items,
      });
    }
  };

  return (
    <AnalyticsContext.Provider
      value={{ trackPageView, trackEvent, trackPurchase }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

// Add gtag to window type
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
