"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Route transition — remounts on every navigation (Next.js template
 * semantics), giving each page a quiet fade + rise. Combined with the
 * per-industry accent scoping, this is the "accent theme shifts between
 * industries" moment from spec Section 4. No-op under reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
