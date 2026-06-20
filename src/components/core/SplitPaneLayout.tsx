"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "@/store/useChatStore";
import ChatController from "@/components/chat/ChatController";
import LeftPanel from "@/components/left/LeftPanel";
import RightSidebar from "@/components/sidebar/RightSidebar";

export default function SplitPaneLayout() {
  const { leftPanelOpen, rightSidebar } = useChatStore();

  return (
    <div className="flex h-screen w-full overflow-hidden relative z-10">

      {/* ── LEFT PANEL (Toggleable Activity Feed) ── */}
      <AnimatePresence initial={false}>
        {leftPanelOpen && (
          <motion.div
            key="left-panel"
            className="flex-shrink-0 h-full border-r border-zinc-800/60
                       bg-zinc-950/80 backdrop-blur-sm overflow-hidden"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="w-[280px] h-full">
              <LeftPanel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CENTER CHAT ENGINE ── */}
      <motion.div
        className="flex flex-col h-full flex-1 min-w-0"
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <ChatController />
      </motion.div>

      {/* ── RIGHT SIDEBAR (On-demand Context Panel) ── */}
      <AnimatePresence initial={false}>
        {rightSidebar.isOpen && (
          <motion.div
            key="right-sidebar"
            className="flex-shrink-0 h-full border-l border-zinc-800/60
                       bg-zinc-950/90 backdrop-blur-sm overflow-hidden"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="w-[380px] h-full">
              <RightSidebar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
