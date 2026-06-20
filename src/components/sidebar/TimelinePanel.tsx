"use client";
import { motion } from "framer-motion";
import { timelineData } from "@/store/sidebarData";

export default function TimelinePanel() {
  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-4 space-y-4">
      <motion.div
        className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/60
                   to-zinc-900/60 border border-indigo-800/30"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <h2 className="text-lg font-bold text-white">Learning Journey</h2>
        <p className="text-xs text-indigo-400 mt-1">
          From Python basics to Agentic AI systems
        </p>
      </motion.div>

      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-2.5 top-0 bottom-0 w-px bg-zinc-800" />

        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {timelineData.map((entry, i) => (
            <motion.div
              key={i}
              className="relative"
              variants={{
                hidden: { opacity: 0, x: -12 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 22,
                  },
                },
              }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[19px] top-3 w-3 h-3 rounded-full
                              bg-gradient-to-br from-indigo-500 to-cyan-500
                              border-2 border-black" />

              <div className="p-4 rounded-2xl bg-zinc-900/60
                              border border-zinc-800/60
                              hover:border-indigo-700/40
                              transition-all duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{entry.emoji}</span>
                  <div>
                    <span className="text-indigo-400 text-xs font-mono font-semibold">
                      {entry.year}
                    </span>
                    <h3 className="text-sm font-semibold text-white">
                      {entry.title}
                    </h3>
                  </div>
                </div>
                <ul className="space-y-1">
                  {entry.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-zinc-400">
                      <span className="text-cyan-600 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
