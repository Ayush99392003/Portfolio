"use client";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";
import { conversationGraph } from "@/store/conversationGraph";

/** Short display labels for known node IDs. */
const NODE_LABELS: Record<string, string> = {
  root: "Home",
  path_recruiter: "Recruiter",
  path_engineer: "Engineer",
  path_founder: "Founder",
  path_student: "Student",
  surprise: "Surprise",
  projects_hub: "Projects",
  skills_hub: "Skills",
  contact_node: "Contact",
  engineer_architectures: "Architectures",
  engineer_experiments: "Experiments",
  recruiter_highlights: "Highlights",
  resume_download: "Resume",
  founder_impact: "Impact",
  student_timeline: "Timeline",
  student_certs: "Certifications",
  speed_run: "Speed Run",
  just_chat: "AI Chat",
};

function getLabel(nodeId: string): string {
  if (NODE_LABELS[nodeId]) return NODE_LABELS[nodeId];
  // Fallback: derive from node ID
  const node = conversationGraph[nodeId];
  if (!node) return nodeId;
  // Extract meaningful name from prefixed IDs
  return nodeId
    .replace(/^(project_|arch_|skills_)/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumb() {
  const { nodeHistory, jumpToNode, currentNodeId } =
    useChatStore();

  // Don't show breadcrumb if we're at root
  if (
    nodeHistory.length <= 1 &&
    currentNodeId === "root"
  ) {
    return null;
  }

  // Deduplicate consecutive repeats
  const crumbs = nodeHistory.filter(
    (id, i) => i === 0 || id !== nodeHistory[i - 1],
  );

  // Show at most 4 crumbs (collapse middle if needed)
  const MAX_VISIBLE = 4;
  const showEllipsis = crumbs.length > MAX_VISIBLE;
  const visible = showEllipsis
    ? [
        crumbs[0],
        "...",
        ...crumbs.slice(crumbs.length - (MAX_VISIBLE - 2)),
      ]
    : crumbs;

  return (
    <motion.div
      className="flex items-center gap-1 px-4 py-1.5
                 overflow-x-auto flex-shrink-0"
      style={{
        borderBottom: "1px solid var(--border-subtle)",
        scrollbarWidth: "none",
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {visible.map((crumb, i) => {
        const isLast =
          i === visible.length - 1 && crumb !== "...";
        const isEllipsis = crumb === "...";

        return (
          <div
            key={`${crumb}-${i}`}
            className="flex items-center gap-1 flex-shrink-0"
          >
            {i > 0 && (
              <ChevronRight
                size={10}
                style={{ color: "var(--text-muted)" }}
                className="flex-shrink-0 opacity-50"
              />
            )}
            {isEllipsis ? (
              <span
                className="text-[10px]"
                style={{ color: "var(--text-muted)" }}
              >
                ···
              </span>
            ) : (
              <button
                onClick={() =>
                  !isLast && jumpToNode(crumb)
                }
                className="flex items-center gap-1
                           text-[10px] font-medium
                           rounded-md px-1.5 py-0.5
                           transition-all duration-150"
                style={{
                  color: isLast
                    ? "var(--accent-indigo)"
                    : "var(--text-muted)",
                  cursor: isLast
                    ? "default"
                    : "pointer",
                  background: isLast
                    ? "rgba(79,70,229,0.08)"
                    : "transparent",
                }}
                disabled={isLast}
              >
                {crumb === "root" && (
                  <Home size={10} />
                )}
                {getLabel(crumb)}
              </button>
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
