"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";
import ProjectDetails from "./ProjectDetails";
import ArchitectureViewer from "./ArchitectureViewer";
import SkillsPanel from "./SkillsPanel";
import TimelinePanel from "./TimelinePanel";
import ResumeViewer from "./ResumeViewer";

const CONTENT_META: Record<string, { label: string; accent: string }> = {
  project:      { label: "Project Details", accent: "#818cf8" },
  architecture: { label: "Architecture",    accent: "#22d3ee" },
  resume:       { label: "Resume",          accent: "#34d399" },
  skills:       { label: "Skills",          accent: "#a78bfa" },
  timeline:     { label: "Learning Journey",accent: "#fb923c" },
  contact:      { label: "Contact",         accent: "#f472b6" },
  feed:         { label: "Activity",        accent: "#818cf8" },
};

export default function RightSidebar() {
  const { rightSidebar, closeRightSidebar } = useChatStore();

  const meta = CONTENT_META[rightSidebar.contentType] ?? CONTENT_META["project"];

  const renderContent = () => {
    switch (rightSidebar.contentType) {
      case "project":
        return <ProjectDetails contentId={rightSidebar.contentId} />;
      case "architecture":
        return <ArchitectureViewer contentId={rightSidebar.contentId} />;
      case "skills":
        return <SkillsPanel contentId={rightSidebar.contentId} />;
      case "timeline":
        return <TimelinePanel />;
      case "resume":
        return <ResumeViewer />;
      default:
        return null;
    }
  };

  return (
    <div
      className="flex flex-col h-full panel-transition"
      style={{ background: "var(--panel-bg)" }}
    >
      {/* Accent top strip */}
      <div
        className="h-[2px] flex-shrink-0"
        style={{
          background: `linear-gradient(90deg, transparent, ${meta.accent}90, transparent)`,
        }}
      />

      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3
                    backdrop-blur-sm flex-shrink-0 border-b panel-transition"
        style={{
          background: "var(--panel-bg)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              background: meta.accent,
              boxShadow: `0 0 8px ${meta.accent}`,
            }}
          />
          <span
            className="text-xs font-semibold"
            style={{ color: "var(--text-secondary)" }}
          >
            {meta.label}
          </span>
          {rightSidebar.contentId && (
            <span
              className="text-[10px] font-mono"
              style={{ color: "var(--text-muted)" }}
            >
              / {rightSidebar.contentId.replace(/_/g, " ")}
            </span>
          )}
        </div>
        <button
          onClick={closeRightSidebar}
          className="p-1.5 rounded-lg transition-all duration-150"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--text-secondary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
          aria-label="Close sidebar"
        >
          <X size={14} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${rightSidebar.contentType}-${rightSidebar.contentId}`}
            className="absolute inset-0 overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "var(--scrollbar-thumb) transparent",
            }}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
