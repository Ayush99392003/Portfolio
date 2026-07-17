"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "@/store/useChatStore";
import ChatController from "@/components/chat/ChatController";
import LeftPanel from "@/components/left/LeftPanel";
import RightSidebar from "@/components/sidebar/RightSidebar";

/** SSR-safe mobile detection hook. */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () =>
      window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

export default function SplitPaneLayout() {
  const {
    leftPanelOpen,
    rightSidebar,
    toggleLeftPanel,
    closeRightSidebar,
  } = useChatStore();

  const isMobile = useIsMobile();

  useEffect(() => {
    // Open left panel on desktop automatically on mount
    if (!isMobile) {
      useChatStore.setState({ leftPanelOpen: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const leftWidth = isMobile
    ? Math.min(280, window.innerWidth * 0.85)
    : 280;
  const rightWidth = isMobile ? "90vw" : 480;

  return (
    <div
      className="flex h-[100dvh] w-full overflow-hidden
                 relative z-10"
    >
      {/* ── BACKDROP (mobile — closes panel on tap) ── */}
      <AnimatePresence>
        {(leftPanelOpen || rightSidebar.isOpen) && (
          <motion.div
            key="backdrop"
            className="mobile-backdrop md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (leftPanelOpen) toggleLeftPanel();
              if (rightSidebar.isOpen)
                closeRightSidebar();
            }}
          />
        )}
      </AnimatePresence>

      {/* ── LEFT PANEL ── */}
      <AnimatePresence initial={false}>
        {leftPanelOpen && (
          <motion.div
            key="left-panel"
            className="
              flex-shrink-0 h-full z-50
              border-r border-[var(--border)]
              bg-[var(--panel-bg)] backdrop-blur-md
              overflow-hidden
              fixed md:relative left-0 top-0
            "
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: leftWidth,
              opacity: 1,
            }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <div
              className="h-full"
              style={{ width: leftWidth }}
            >
              <LeftPanel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CENTER CHAT ENGINE ── */}
      <motion.div
        className="flex flex-col h-full flex-1 min-w-0"
        layout
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <ChatController />
      </motion.div>

      {/* ── RIGHT SIDEBAR ── */}
      <AnimatePresence initial={false}>
        {rightSidebar.isOpen && (
          <motion.div
            key="right-sidebar"
            className="
              flex-shrink-0 h-full z-50
              border-l border-[var(--border)]
              bg-[var(--panel-bg)] backdrop-blur-md
              overflow-hidden
              fixed md:relative right-0 top-0
            "
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: rightWidth,
              opacity: 1,
            }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <div className="w-[90vw] md:w-[480px] h-full">
              <RightSidebar />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

