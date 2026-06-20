"use client";
import { motion } from "framer-motion";

export default function ProcessingPulse() {
  return (
    <motion.div
      className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm
                 bg-zinc-900 border border-zinc-800 w-fit"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-indigo-500"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.18,
          }}
        />
      ))}
    </motion.div>
  );
}
