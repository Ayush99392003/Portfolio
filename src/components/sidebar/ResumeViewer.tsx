"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Sparkles } from "lucide-react";

export default function ResumeViewer() {
  const [activeTab, setActiveTab] = useState<"pdf" | "highlights">("pdf");

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header Panel */}
      <div className="p-4 border-b border-zinc-800/60 bg-zinc-950/40 flex-shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText size={16} className="text-indigo-400" />
              Resume Viewer
            </h2>
            <p className="text-[10px] text-zinc-500 mt-0.5">Ayush Agarwal · AI/ML Engineer</p>
          </div>
          <a
            href="/CV_Ayush_.pdf"
            download
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                       bg-indigo-600 hover:bg-indigo-500 border border-indigo-500
                       text-[11px] font-medium text-white transition-all duration-150
                       hover:shadow-[0_0_12px_rgba(99,102,241,0.4)]"
          >
            <Download size={12} />
            Download PDF
          </a>
        </div>

        {/* Tab Selectors */}
        <div className="flex gap-1.5 mt-3.5 p-1 rounded-xl bg-zinc-900/80 border border-zinc-800/60">
          <button
            onClick={() => setActiveTab("pdf")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
              ${activeTab === "pdf"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
              }`}
          >
            <FileText size={13} />
            PDF Resume
          </button>
          <button
            onClick={() => setActiveTab("highlights")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
              ${activeTab === "highlights"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
              }`}
          >
            <Sparkles size={13} />
            Highlights
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative bg-zinc-950/20">
        <AnimatePresence mode="wait">
          {activeTab === "pdf" ? (
            <motion.div
              key="pdf-tab"
              className="w-full h-full"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.15 }}
            >
              <iframe
                src="/CV_Ayush_.pdf#toolbar=0"
                className="w-full h-full border-none bg-zinc-900/10"
                title="Ayush Agarwal Resume"
              />
            </motion.div>
          ) : (
            <motion.div
              key="highlights-tab"
              className="w-full h-full overflow-y-auto p-4 space-y-4"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              style={{ scrollbarWidth: "thin", scrollbarColor: "#27272a transparent" }}
            >
              {/* Resume Highlights */}
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/60">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  ⭐ Key Milestones & Stats
                </h3>
                <ul className="space-y-2">
                  {[
                    "AI/ML Intern @ Docu3C Technologies",
                    "Built 4+ production AI/ML systems",
                    "82.4% Top-1 RAG accuracy on 26K+ docs",
                    "B.Tech CSE @ VIT Bhopal (CGPA 8.52/10)",
                    "5 Certifications (Microsoft + Google Cloud)",
                    "125+ LeetCode problems solved",
                    "Event Lead · 5+ workshops · 200+ participants",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-indigo-500 text-xs mt-0.5">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Download prompt */}
              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-zinc-900/40 border border-dashed border-zinc-700/60 text-center">
                <FileText size={28} className="text-zinc-600" />
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Download the full PDF for details regarding education, internship achievements, certifications, leadership roles, and direct contact details.
                </p>
                <a
                  href="/CV_Ayush_.pdf"
                  download
                  className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 hover:text-white hover:border-indigo-500/50 transition-all duration-150"
                >
                  Download PDF Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
