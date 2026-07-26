"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type NodeChainProps = {
  nodes: string[];
  className?: string;
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const nodeVariant = {
  hidden: { opacity: 0, y: 8, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const connectorVariant = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
};

/**
 * The spec Section 4 signature motion: a mini system "builds up" as connected
 * nodes (e.g. Hospital → Doctor → Patient → Appointment → Invoice) when it
 * scrolls into view. Node and connector colors read the accent CSS variables,
 * so the chain re-themes automatically inside industry-scoped sections.
 */
export function NodeChain({ nodes, className }: NodeChainProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.ul
      className={cn("flex flex-wrap items-center gap-y-3", className)}
      variants={container}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {nodes.map((node, index) => (
        <li key={node} className="flex items-center">
          <motion.span
            variants={nodeVariant}
            className="rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-sm font-medium text-accent"
          >
            {node}
          </motion.span>
          {index < nodes.length - 1 && (
            <motion.span
              aria-hidden
              variants={connectorVariant}
              className="mx-1.5 h-px w-4 origin-left bg-accent/40 sm:w-6"
            />
          )}
        </li>
      ))}
    </motion.ul>
  );
}
