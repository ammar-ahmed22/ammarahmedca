"use client";
import { motion, HTMLMotionProps } from "framer-motion";

export type ScrollIndicatorProps = {
  children: React.ReactNode;
} & HTMLMotionProps<"div"> &
  React.HTMLAttributes<HTMLDivElement>;
const ScrollIndicator = ({
  children,
  ...rest
}: ScrollIndicatorProps) => {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      {...rest}>
      {children}
    </motion.div>
  );
};

export default ScrollIndicator;
