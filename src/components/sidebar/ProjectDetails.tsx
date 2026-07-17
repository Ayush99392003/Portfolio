"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projectsData } from "@/store/sidebarData";

function GithubIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

// Project accent colors
const PROJECT_ACCENTS: Record<string, { primary: string; glow: string; gradA: string; gradB: string }> = {
  lexai:               { primary: "#818cf8", glow: "#818cf840", gradA: "#1e1b4b", gradB: "#0c0a2e" },
  prescription:        { primary: "#34d399", glow: "#34d39935", gradA: "#062f22", gradB: "#020f0b" },
  fiducia:             { primary: "#a78bfa", glow: "#a78bfa35", gradA: "#2e1065", gradB: "#0f052d" },
  video_detection:     { primary: "#f472b6", glow: "#f472b630", gradA: "#3c0722", gradB: "#16020c" },
  hybrid_rag:          { primary: "#818cf8", glow: "#818cf840", gradA: "#1e1b4b", gradB: "#0c0a2e" },
  polarbrief:          { primary: "#22d3ee", glow: "#22d3ee35", gradA: "#0c1f2e", gradB: "#060d1a" },
  knowledge_graph:     { primary: "#34d399", glow: "#34d39935", gradA: "#0a1f1a", gradB: "#030f0d" },
  wesad:               { primary: "#a78bfa", glow: "#a78bfa35", gradA: "#1a0f2e", gradB: "#0d0618" },
  constitution_companion:{ primary: "#fb923c", glow: "#fb923c30", gradA: "#1f1008", gradB: "#0f0804" },
  simhastha:           { primary: "#f472b6", glow: "#f472b630", gradA: "#1f0a1a", gradB: "#0f050d" },
};

interface ProjectDetailsProps {
  contentId: string | null;
}

export default function ProjectDetails({ contentId }: ProjectDetailsProps) {
  const project = contentId ? projectsData[contentId] : null;
  if (!project) return null;

  const acc = PROJECT_ACCENTS[contentId!] ?? PROJECT_ACCENTS["hybrid_rag"];

  return (
    <div className="flex flex-col h-full overflow-y-auto"
         style={{ scrollbarWidth: "thin", scrollbarColor: "var(--scrollbar-thumb) transparent" }}>

      {/* ── Hero Banner ── */}
      <motion.div
        className="relative mx-3 mt-3 rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${acc.gradA}, ${acc.gradB})`,
          border: `1px solid ${acc.primary}35`,
          boxShadow: `0 0 40px -10px ${acc.glow}`,
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {/* Decorative rings */}
        <svg className="absolute -right-8 -top-8 w-40 h-40 pointer-events-none"
             viewBox="0 0 160 160">
          <circle cx="120" cy="40" r="60" fill="none" stroke={acc.primary} strokeWidth="1" opacity="0.1" />
          <circle cx="120" cy="40" r="40" fill="none" stroke={acc.primary} strokeWidth="1" opacity="0.08" />
          <circle cx="120" cy="40" r="18" fill={acc.primary} opacity="0.06" />
        </svg>

        <div className="relative z-10 p-5">
          <div className="text-4xl mb-3 leading-none">{project.emoji}</div>
          <h2 className="text-base font-bold text-white leading-tight">{project.title}</h2>
          <p className="text-xs mt-1" style={{ color: acc.primary }}>{project.tagline}</p>
          <p className="text-xs text-zinc-300 mt-3 leading-relaxed">{project.description}</p>

          {/* CTA Buttons */}
          <div className="flex gap-2 mt-4">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                          bg-zinc-800/80 border border-zinc-700/60 text-xs
                          font-medium text-zinc-300 hover:text-white
                          hover:border-zinc-500/60 transition-all duration-150">
              <GithubIcon size={12} /> GitHub
            </a>
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                            text-xs font-medium text-white transition-all duration-150"
                 style={{ background: acc.primary + "22", border: `1px solid ${acc.primary}55` }}>
                <ExternalLink size={11} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Metrics Grid ── */}
      {project.metrics && (
        <motion.div
          className="mx-3 mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.08 }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-2 px-1"
             style={{ color: "var(--text-muted)" }}>
            Key Metrics
          </p>
          <div className="grid grid-cols-2 gap-2">
            {project.metrics.map((m, i) => (
              <div key={i}
                   className="relative px-3 py-2.5 rounded-xl overflow-hidden"
                   style={{
                     background: acc.primary + "0d",
                     border: `1px solid ${acc.primary}25`,
                   }}>
                <div className="absolute top-0 left-0 w-full h-[1px]"
                     style={{ background: `linear-gradient(90deg, transparent, ${acc.primary}60, transparent)` }} />
                <p className="text-[11px] font-semibold leading-snug"
                   style={{ color: acc.primary }}>{m}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Problem ── */}
      <motion.div
        className="mx-3 mt-3 p-4 rounded-xl border panel-transition"
        style={{ background: "var(--card-bg)", borderColor: "var(--border-subtle)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.14 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">🔍</span>
          <h3 className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}>
            The Problem
          </h3>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{project.problem}</p>
      </motion.div>

      {/* ── Solution ── */}
      <motion.div
        className="mx-3 mt-2 p-4 rounded-xl border panel-transition"
        style={{ background: "var(--card-bg)", borderColor: "var(--border-subtle)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.20 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">💡</span>
          <h3 className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}>
            The Solution
          </h3>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{project.solution}</p>
      </motion.div>

      {/* ── Tech Stack ── */}
      <motion.div
        className="mx-3 mt-2 mb-4 p-4 rounded-xl border panel-transition"
        style={{ background: "var(--card-bg)", borderColor: "var(--border-subtle)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.26 }}
      >
        <h3 className="text-[11px] font-semibold uppercase tracking-wider mb-3"
            style={{ color: "var(--text-muted)" }}>
          🛠 Tech Stack
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech, i) => (
            <span key={i}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium"
                  style={{
                    background: acc.primary + "12",
                    border: `1px solid ${acc.primary}28`,
                    color: acc.primary + "dd",
                  }}>
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
