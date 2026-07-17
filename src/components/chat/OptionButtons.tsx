"use client";
import { motion } from "framer-motion";
import { useChatStore } from "@/store/useChatStore";
import { conversationGraph } from "@/store/conversationGraph";
import { ExternalLink } from "lucide-react";

export default function OptionButtons() {
  const {
    currentNodeId,
    selectOption,
    isProcessing,
    theme,
  } = useChatStore();
  const currentNode = conversationGraph[currentNodeId];
  const isLight = theme === "light";

  if (!currentNode || isProcessing) return null;

  return (
    <motion.div
      className="flex flex-wrap gap-2 pt-1 pb-2"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07 } },
      }}
    >
      {currentNode.options.map((option, i) => (
        <motion.button
          key={i}
          onClick={() =>
            selectOption(
              option.label,
              option.nextNodeId,
              option.sidebarAction,
              option.externalUrl,
            )
          }
          className="group flex items-center gap-1.5
                     px-3.5 py-2 rounded-xl text-sm
                     font-medium border
                     transition-all duration-200
                     active:scale-[0.97] cursor-pointer"
          style={{
            background: isLight
              ? "rgba(255,255,255,0.80)"
              : "rgba(24,24,27,0.60)",
            borderColor: isLight
              ? "rgba(161,161,170,0.40)"
              : "rgba(63,63,70,0.70)",
            color: isLight ? "#3f3f46" : "#d4d4d8",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = isLight
              ? "rgba(99,102,241,0.50)"
              : "rgba(99,102,241,0.70)";
            el.style.background = isLight
              ? "rgba(238,242,255,0.90)"
              : "rgba(30,27,75,0.50)";
            el.style.color = isLight
              ? "#1e1b4b"
              : "#ffffff";
            el.style.boxShadow = isLight
              ? "0 0 12px rgba(99,102,241,0.12)"
              : "0 0 12px rgba(79,70,229,0.2)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = isLight
              ? "rgba(161,161,170,0.40)"
              : "rgba(63,63,70,0.70)";
            el.style.background = isLight
              ? "rgba(255,255,255,0.80)"
              : "rgba(24,24,27,0.60)";
            el.style.color = isLight
              ? "#3f3f46"
              : "#d4d4d8";
            el.style.boxShadow = "none";
          }}
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 280,
                damping: 22,
              },
            },
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          {option.label}
          {option.externalUrl && (
            <ExternalLink
              size={11}
              className="flex-shrink-0"
              style={{
                color: isLight
                  ? "#a1a1aa"
                  : "#52525b",
              }}
            />
          )}
        </motion.button>
      ))}
    </motion.div>
  );
}

