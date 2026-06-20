"use client";
import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";

export default function ResumeViewer() {
  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-4 space-y-4">
      <motion.div
        className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/60
                   to-zinc-900/60 border border-indigo-800/30"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-indigo-400" />
              Resume
            </h2>
            <p className="text-xs text-zinc-400 mt-1">Ayush Agarwal · AI/ML Engineer</p>
          </div>
          <a
            href="/CV_Ayush_.pdf"
            download
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg
                       bg-indigo-600 hover:bg-indigo-500 border border-indigo-500
                       text-xs font-medium text-white transition-all duration-150
                       hover:shadow-[0_0_12px_rgba(99,102,241,0.4)]"
          >
            <Download size={13} />
            Download PDF
          </a>
        </div>
      </motion.div>

      {/* Resume Highlights */}
      <motion.div
        className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/60"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
      >
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          ⭐ Highlights
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
      </motion.div>

      {/* Embed notice */}
      <motion.div
        className="flex flex-col items-center gap-3 p-6 rounded-2xl
                   bg-zinc-900/40 border border-dashed border-zinc-700/60
                   text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.18 }}
      >
        <FileText size={28} className="text-zinc-600" />
        <p className="text-xs text-zinc-500">
          Download the PDF above for the full resume with all experience details,
          certifications, and contact information.
        </p>
        <a
          href="/CV_Ayush_.pdf"
          download
          className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700
                     text-xs text-zinc-300 hover:text-white hover:border-indigo-500/50
                     transition-all duration-150"
        >
          Download Resume PDF
        </a>
      </motion.div>
    </div>
  );
}
