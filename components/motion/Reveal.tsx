"use client";

import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger offset in seconds — use index * 0.06 for card grids. */
  delay?: number;
  /** "view" animates on scroll into view (default); "mount" animates immediately. */
  mode?: "view" | "mount";
};

/**
 * Scroll-reveal wrapper — spec Section 4 motion principles: reveal, don't
 * decorate. Fade + small rise, runs once, and collapses to a no-op for users
 * with prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  mode = "view",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const initial = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 };
  const visible = { opacity: 1, y: 0 };
  const transition = { duration: 0.5, delay, ease: "easeOut" as const };

  if (mode === "mount") {
    return (
      <motion.div
        className={className}
        initial={initial}
        animate={visible}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={visible}
      viewport={{ once: true, margin: "-80px" }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
