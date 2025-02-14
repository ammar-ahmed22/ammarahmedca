"use client";
import { AnimationProps, motion } from "motion/react";
import { signatureSvgPaths, signatureSvgPathLengths } from "./data";
import { useScrollY } from "@/hooks/scroll";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

export type SignatureProps = {
  className?: string;
  duration?: number;
  animationType?: "scroll" | "repeat";
};

export default function Signature({
  className,
  duration = 1,
  animationType = "scroll",
}: SignatureProps) {
  const { lastY } = useScrollY();
  const getAnimationProps: (idx: number) => AnimationProps =
    useCallback(
      (idx: number) => {
        if (animationType === "scroll") {
          return {
            animate: {
              strokeDashoffset:
                lastY === 0 ? 0 : signatureSvgPathLengths[idx],
            },
            transition: {
              duration,
              delay:
                lastY === 0
                  ? idx * duration
                  : (signatureSvgPathLengths.length - idx - 1) *
                    duration,
              ease: "easeInOut",
            },
          };
        } else {
          return {
            animate: {
              strokeDashoffset: 0,
            },
            transition: {
              duration,
              delay: idx * duration,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: duration + 1,
              ease: "easeInOut",
            },
          };
        }
      },
      [animationType, duration, lastY],
    );

  return (
    <svg
      viewBox="0 0 602 328"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={cn("h-full w-auto", className)}>
      {signatureSvgPathLengths.map((length, idx) => {
        return (
          <motion.path
            key={`signature-${idx}`}
            d={signatureSvgPaths[idx]}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            initial={{
              strokeDasharray: length,
              strokeDashoffset: length,
            }}
            {...getAnimationProps(idx)}
          />
        );
      })}
    </svg>
  );
}
