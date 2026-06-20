"use client";
import { motion } from "framer-motion";
import { useChatStore } from "@/store/useChatStore";
import { conversationGraph } from "@/store/conversationGraph";
import { ExternalLink } from "lucide-react";

export default function OptionButtons() {
  const { currentNodeId, selectOption, isProcessing } = useChatStore();
  const currentNode = conversationGraph[currentNodeId];

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
              option.externalUrl
            )
          }
          className="group flex items-center gap-1.5 px-3.5 py-2 rounded-xl
                     text-sm font-medium border border-zinc-700/70
                     bg-zinc-900/60 text-zinc-300 hover:text-white
                     hover:border-indigo-500/70 hover:bg-indigo-950/50
                     transition-all duration-200
                     hover:shadow-[0_0_12px_rgba(79,70,229,0.2)]
                     active:scale-[0.97] cursor-pointer"
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 280, damping: 22 },
            },
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          {option.label}
          {option.externalUrl && (
            <ExternalLink
              size={11}
              className="text-zinc-600 group-hover:text-indigo-400 flex-shrink-0"
            />
          )}
        </motion.button>
      ))}
    </motion.div>
  );
}
