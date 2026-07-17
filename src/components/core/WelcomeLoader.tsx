"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface WelcomeLoaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "📡 Connecting to Ayush's Node...",
  "🗂️ Loading Experience & Projects Database...",
  "🧠 Initializing State Machine Graph...",
  "🛡️ Mounting Security Filters & Route Guards...",
  "⚡ Hydrating Hybrid Legal RAG Index...",
  "🎙️ Warming voice transcription layers...",
  "🌌 Interface is ready. Booting portfolio...",
];

export default function WelcomeLoader({ onComplete }: WelcomeLoaderProps) {
  const [currentLogIdx, setCurrentLogIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment logs sequentially
    const logInterval = setInterval(() => {
      setCurrentLogIdx((prev) => {
        if (prev < BOOT_LOGS.length - 1) {
          return prev + 1;
        }
        clearInterval(logInterval);
        return prev;
      });
    }, 450);

    // Smooth progress bar increment
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1.2;
        if (next >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500); // Give a brief pause at 100%
          return 100;
        }
        return next;
      });
    }, 40);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center px-4"
      style={{ background: "rgba(9,9,11,0.95)", backdropFilter: "blur(12px)" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Glow Core Icon */}
        <div className="relative mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 animate-pulse blur-md opacity-50 absolute inset-0" />
          <div className="w-16 h-16 rounded-full bg-zinc-950 border border-indigo-500/50 flex items-center justify-center relative z-10">
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              AA
            </span>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-[3px] bg-zinc-900 border border-zinc-800/40 rounded-full overflow-hidden mb-6 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Boot Terminal Logs */}
        <div className="w-full min-h-[50px] font-mono text-[10px] text-zinc-500 flex flex-col justify-start px-2">
          {BOOT_LOGS.slice(0, currentLogIdx + 1).map((log, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={idx === currentLogIdx ? "text-indigo-400/90 font-semibold" : "text-zinc-500/70"}
            >
              {idx === currentLogIdx ? "> " : "✔ "}
              {log}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
