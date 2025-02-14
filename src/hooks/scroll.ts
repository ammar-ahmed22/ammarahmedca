"use client";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

export const useScrollY = () => {
  const { scrollY } = useScroll();
  const [lastY, setLastY] = useState(0);
  const [direction, setDirection] = useState(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      setDirection(Math.sign(current - lastY));
      setLastY(current);
    }
  });

  return { lastY, direction };
};
