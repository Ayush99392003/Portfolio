"use client";
import { motion } from "framer-motion";
import { skillsData } from "@/store/sidebarData";

interface SkillsPanelProps {
  contentId: string | null;
}

export default function SkillsPanel({ contentId }: SkillsPanelProps) {
  const domain = contentId ? skillsData[contentId] : null;
  if (!domain) return null;

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-4 space-y-4">
      <motion.div
        className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/60
                   to-zinc-900/60 border border-indigo-800/30"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <h2 className="text-lg font-bold text-white">
          {domain.emoji} {domain.title}
        </h2>
        <p className="text-xs text-indigo-400 mt-1">
          Technologies & tools I work with
        </p>
      </motion.div>

      <motion.div
        className="space-y-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {domain.skills.map((skill, i) => (
          <motion.div
            key={i}
            className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60
                       hover:border-indigo-700/40 transition-all duration-200"
            variants={{
              hidden: { opacity: 0, x: -8 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { type: "spring", stiffness: 260, damping: 22 },
              },
            }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-white font-mono">
                {skill.name}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skill.usedIn.map((project, j) => (
                <span
                  key={j}
                  className="px-2 py-0.5 rounded-md bg-indigo-950/60
                             border border-indigo-800/40 text-xs
                             text-indigo-400"
                >
                  {project}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
