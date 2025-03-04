import { useState, useEffect } from "react";

/**
 * Custom hook for responsive design that detects if a media query matches
 * @param query The media query to check
 * @returns Boolean indicating if the media query matches
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create a media query list
    const mediaQuery = window.matchMedia(query);

    // Set the initial value
    setMatches(mediaQuery.matches);

    // Define a callback function to handle changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add the listener
    mediaQuery.addEventListener("change", handleChange);

    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

// Predefined breakpoints
export const useIsMobile = () => useMediaQuery("(max-width: 640px)");
export const useIsTablet = () =>
  useMediaQuery("(min-width: 641px) and (max-width: 1024px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1025px)");
export const useIsTouchDevice = () => useMediaQuery("(pointer: coarse)");

export default useMediaQuery;
