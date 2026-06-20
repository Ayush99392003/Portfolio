"use client";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface MessageBubbleProps {
  role: "user" | "bot" | "llm";
  text: string;
  index: number;
}

export default function MessageBubble({ role, text, index }: MessageBubbleProps) {
  const isUser = role === "user";
  const isLLM = role === "llm";

  return (
    <motion.div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 22,
        delay: Math.min(index * 0.03, 0.2),
      }}
    >
      {/* Avatar for bot / llm */}
      {!isUser && (
        <div
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center
                      justify-center text-xs font-bold text-white mr-2 mt-0.5
                      ${isLLM
                        ? "bg-gradient-to-br from-violet-600 to-pink-500"
                        : "bg-gradient-to-br from-indigo-600 to-cyan-500"
                      }`}
        >
          {isLLM ? "✦" : "A"}
        </div>
      )}

      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
          ${isUser
            ? "bg-indigo-900/60 border border-indigo-700/50 text-indigo-100 rounded-tr-sm"
            : isLLM
              ? "bg-violet-950/60 border border-violet-700/40 text-zinc-100 rounded-tl-sm"
              : "bg-zinc-900/80 border border-zinc-800 text-zinc-100 rounded-tl-sm"
          }`}
      >
        {isUser ? (
          <span>{text}</span>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none
                          prose-p:my-1 prose-ul:my-1 prose-li:my-0.5
                          prose-strong:text-indigo-300
                          prose-code:text-cyan-300 prose-code:bg-zinc-800/80
                          prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        )}

        {/* LLM badge */}
        {isLLM && (
          <div className="flex items-center gap-1 mt-2 pt-2 border-t border-violet-800/40">
            <span className="text-[10px] text-violet-400">✦ GPT-4o mini</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
