// Analytics initialization script
// This would normally be replaced with your actual analytics provider's code

// Initialize dataLayer for Google Tag Manager
window.dataLayer = window.dataLayer || [];

// Define gtag function
function gtag() {
  dataLayer.push(arguments);
}

// Set timestamp
gtag("js", new Date());

// Configure analytics with your measurement ID
gtag("config", "G-XXXXXXXXXX", {
  send_page_view: true,
  anonymize_ip: true,
  cookie_flags: "SameSite=None;Secure",
});

// Custom event tracking helper
window.trackEvent = function (category, action, label, value) {
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
  console.log(
    `[Analytics] Event tracked: ${category} - ${action} - ${label || ""} - ${value || ""}`,
  );
};

// Performance monitoring
function initPerformanceMonitoring() {
  // Only run in production
  if (window.location.hostname === "localhost") return;

  // Report Web Vitals
  if ("PerformanceObserver" in window) {
    // FCP (First Contentful Paint)
    try {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            gtag("event", "web_vitals", {
              event_category: "Web Vitals",
              event_label: "FCP",
              value: Math.round(entry.startTime),
              non_interaction: true,
            });
          }
        }
      }).observe({ type: "paint", buffered: true });
    } catch (e) {}

    // LCP (Largest Contentful Paint)
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        gtag("event", "web_vitals", {
          event_category: "Web Vitals",
          event_label: "LCP",
          value: Math.round(lastEntry.startTime),
          non_interaction: true,
        });
      }).observe({ type: "largest-contentful-paint", buffered: true });
    } catch (e) {}
  }
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Error tracking
window.addEventListener("error", function (event) {
  gtag("event", "exception", {
    description: event.message,
    fatal: false,
  });
});

console.log("[Analytics] Initialized");
