"use client";
import { motion } from "framer-motion";

export default function ProcessingPulse() {
  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-3 rounded-2xl
                 rounded-tl-sm w-fit panel-transition"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-subtle)",
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 24,
      }}
    >
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--accent-indigo)" }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: i * 0.18,
            }}
          />
        ))}
      </div>
      <span
        className="text-[11px] font-medium"
        style={{ color: "var(--text-muted)" }}
      >
        Ayush is typing…
      </span>
    </motion.div>
  );
}

