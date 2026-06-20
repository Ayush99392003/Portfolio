"use client";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, X } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";
import { linkedinPosts } from "@/store/sidebarData";

function LinkedinIcon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/in/ayush20039939", label: "LinkedIn", icon: <LinkedinIcon size={12} />, color: "#3b82f6" },
  { href: "https://github.com/Ayush99392003", label: "GitHub", icon: "🐙", color: "#a78bfa" },
  { href: "mailto:ayush20039939@gmail.com", label: "Email", icon: "📧", color: "#34d399" },
];

export default function LeftPanel() {
  const { toggleLeftPanel } = useChatStore();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3
                      border-b border-zinc-800/60 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
            Activity
          </span>
        </div>
        <button onClick={toggleLeftPanel}
                className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-300
                           hover:bg-zinc-800/60 transition-all duration-150">
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto"
           style={{ scrollbarWidth: "thin", scrollbarColor: "#27272a transparent" }}>

        {/* ── Profile Card ── */}
        <motion.div
          className="relative mx-3 mt-3 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1e1b4b, #0f0a2e)",
            border: "1px solid rgba(99,102,241,0.3)",
            boxShadow: "0 0 30px -8px rgba(99,102,241,0.2)",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-[1px]"
               style={{ background: "linear-gradient(90deg, transparent, #818cf880, transparent)" }} />
          {/* Decorative orb */}
          <svg className="absolute -right-4 -top-4 w-24 h-24 pointer-events-none" viewBox="0 0 96 96">
            <circle cx="72" cy="24" r="42" fill="none" stroke="#818cf8" strokeWidth="0.8" opacity="0.12" />
            <circle cx="72" cy="24" r="26" fill="#4F46E5" opacity="0.07" />
          </svg>

          <div className="relative z-10 p-4">
            {/* Avatar */}
            <div className="relative w-12 h-12 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500
                              via-purple-500 to-cyan-400 flex items-center
                              justify-center text-lg font-bold text-white shadow-lg">
                A
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3
                               bg-emerald-500 rounded-full border-2 border-black" />
            </div>

            <h2 className="text-sm font-bold text-white">Ayush Agarwal</h2>
            <p className="text-[11px] text-indigo-300/80 mt-0.5">AI/ML Engineer · VIT Bhopal</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">B.Tech CSE · CGPA 8.52</p>

            {/* Social links */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {SOCIAL_LINKS.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg
                              text-[11px] font-medium text-zinc-300 hover:text-white
                              transition-all duration-150 hover:scale-105"
                   style={{
                     background: link.color + "14",
                     border: `1px solid ${link.color}30`,
                   }}>
                  {typeof link.icon === "string"
                    ? <span className="text-xs">{link.icon}</span>
                    : link.icon
                  }
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Currently Exploring ── */}
        <motion.div
          className="mx-3 mt-2.5 p-3.5 rounded-xl"
          style={{
            background: "rgba(16,16,20,0.8)",
            border: "1px solid rgba(52,211,153,0.15)",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.08 }}
        >
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-[10px] font-semibold text-emerald-400/80 uppercase tracking-widest">
              Currently Exploring
            </span>
          </div>
          <ul className="space-y-1.5">
            {[
              "MCP Architecture & Tool-Calling",
              "Multi-Agent Orchestration Patterns",
              "OpenTelemetry + Arize Phoenix",
              "Structured LLM Outputs (Instructor)",
              "GPT-5 Tooling Capabilities",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[11px] text-zinc-400">
                <span className="text-emerald-500/70 mt-0.5 flex-shrink-0">→</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── LinkedIn Posts Header ── */}
        <div className="mx-3 mt-4 mb-2 flex items-center gap-2">
          <LinkedinIcon size={12} className="text-blue-400" />
          <span className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">
            Latest Posts
          </span>
          <div className="flex-1 h-px bg-zinc-800/60 ml-1" />
        </div>

        {/* ── Posts ── */}
        <div className="px-3 pb-4 space-y-2">
          {linkedinPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.12 + i * 0.06 }}
            >
              <div className="relative p-3 rounded-xl overflow-hidden
                              bg-zinc-900/50 border border-zinc-800/60
                              group-hover:border-blue-700/30
                              group-hover:bg-zinc-900/80 transition-all duration-200">
                {/* Hover shimmer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                                transition-opacity duration-300 pointer-events-none"
                     style={{
                       background: "linear-gradient(135deg, rgba(59,130,246,0.04), transparent)",
                     }} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={10} className="text-zinc-600" />
                      <span className="text-[10px] text-zinc-600">{post.date}</span>
                      {post.likes && (
                        <span className="text-[10px] font-semibold text-amber-400 ml-0.5">
                          {post.likes}
                        </span>
                      )}
                    </div>
                    <ExternalLink size={10}
                                  className="text-zinc-700 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <p className="text-[11px] text-zinc-500 group-hover:text-zinc-400
                                leading-relaxed transition-colors line-clamp-4">
                    {post.content}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}

          <a href="https://www.linkedin.com/in/ayush20039939" target="_blank" rel="noopener noreferrer"
             className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl
                        border border-zinc-800 text-[11px] text-zinc-600
                        hover:text-blue-400 hover:border-blue-800/40
                        transition-all duration-200">
            <LinkedinIcon size={11} className="text-blue-500" />
            View all posts on LinkedIn
            <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </div>
  );
}
