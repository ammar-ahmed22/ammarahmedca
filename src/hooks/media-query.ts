"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQueryList.matches);
    updateMatches();

    mediaQueryList.addEventListener("change", updateMatches);
    return () =>
      mediaQueryList.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}
