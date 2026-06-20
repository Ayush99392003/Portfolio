"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { architecturesData } from "@/store/sidebarData";

interface ArchitectureViewerProps {
  contentId: string | null;
}

export default function ArchitectureViewer({ contentId }: ArchitectureViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const arch = contentId ? architecturesData[contentId] : null;

  useEffect(() => {
    if (!arch || !containerRef.current) return;

    const renderMermaid = async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          primaryColor: "#1e1b4b",
          primaryTextColor: "#e0e7ff",
          primaryBorderColor: "#4F46E5",
          lineColor: "#06B6D4",
          secondaryColor: "#0c0a1e",
          tertiaryColor: "#0f172a",
          background: "#09090B",
          mainBkg: "#18181B",
          nodeBorder: "#4F46E5",
          clusterBkg: "#0f172a",
          titleColor: "#e0e7ff",
          edgeLabelBackground: "#18181B",
          fontSize: "12px",
        },
      });

      const { svg } = await mermaid.render(
        `arch-${contentId}-${Date.now()}`,
        arch.mermaid
      );

      if (containerRef.current) {
        containerRef.current.innerHTML = svg;
        const svgEl = containerRef.current.querySelector("svg");
        if (svgEl) {
          svgEl.style.width = "100%";
          svgEl.style.height = "auto";
          svgEl.removeAttribute("width");
          svgEl.removeAttribute("height");
        }
      }
    };

    renderMermaid().catch(console.error);
  }, [arch, contentId]);

  if (!arch) return null;

  return (
    <div className="flex flex-col h-full overflow-y-auto"
         style={{ scrollbarWidth: "thin", scrollbarColor: "#27272a transparent" }}>

      {/* Hero header */}
      <motion.div
        className="relative mx-3 mt-3 p-5 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1e1b4b, #0c0a2e)",
          border: "1px solid rgba(79,70,229,0.35)",
          boxShadow: "0 0 40px -10px rgba(79,70,229,0.25)",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {/* Background decoration */}
        <svg className="absolute right-0 top-0 w-32 h-32 pointer-events-none" viewBox="0 0 128 128">
          <circle cx="100" cy="28" r="55" fill="none" stroke="#4F46E5" strokeWidth="0.8" opacity="0.12" />
          <circle cx="100" cy="28" r="35" fill="none" stroke="#06B6D4" strokeWidth="0.8" opacity="0.10" />
          <circle cx="100" cy="28" r="16" fill="#4F46E5" opacity="0.07" />
        </svg>
        <div className="absolute top-0 left-0 right-0 h-[1px]"
             style={{ background: "linear-gradient(90deg, transparent, #4F46E580, transparent)" }} />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"
                   style={{ animationDelay: "0.3s" }} />
              <div className="w-1 h-1 rounded-full bg-violet-500 animate-pulse"
                   style={{ animationDelay: "0.6s" }} />
            </div>
            <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest">
              System Architecture
            </span>
          </div>
          <h2 className="text-sm font-bold text-white">{arch.title}</h2>
          <p className="text-xs text-zinc-500 mt-1">Interactive data flow diagram</p>
        </div>
      </motion.div>

      {/* Mermaid diagram */}
      <motion.div
        className="mx-3 mt-3 mb-4 p-4 rounded-2xl"
        style={{
          background: "#0d0d10",
          border: "1px solid rgba(79,70,229,0.15)",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
      >
        <div
          ref={containerRef}
          className="w-full [&_svg]:max-w-full"
        />
      </motion.div>
    </div>
  );
}
