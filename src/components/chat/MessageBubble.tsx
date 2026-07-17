"use client";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useChatStore } from "@/store/useChatStore";
import { useStreamingText } from "@/hooks/useStreamingText";

interface MessageBubbleProps {
  role: "user" | "bot" | "llm";
  text: string;
  index: number;
  isLatest?: boolean;
}

export default function MessageBubble({
  role,
  text,
  index,
  isLatest = false,
}: MessageBubbleProps) {
  const isUser = role === "user";
  const isLLM = role === "llm";
  const isBot = role === "bot";
  const { theme } = useChatStore();
  const isLight = theme === "light";

  // Stream-reveal only the latest bot message
  const shouldStream = isBot && isLatest;
  const { displayText } = useStreamingText(
    text,
    40,
    shouldStream,
  );
  const rendered = shouldStream ? displayText : text;

  return (
    <motion.div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
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
        <div className="flex-shrink-0 mr-2 mt-0.5 relative">
          {isLLM ? (
            <div
              className="w-7 h-7 rounded-full flex items-center
                         justify-center text-xs font-bold text-white
                         bg-gradient-to-br from-violet-600
                         to-pink-500"
            >
              ✦
            </div>
          ) : (
            <>
              <img
                src="/ayush.jpg"
                alt="Ayush Agarwal"
                className="w-7 h-7 rounded-full object-cover
                           border border-indigo-500/50"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback =
                    e.currentTarget
                      .nextElementSibling as HTMLElement;
                  if (fallback)
                    fallback.style.display = "flex";
                }}
              />
              <div
                className="hidden w-7 h-7 rounded-full
                           bg-gradient-to-br from-indigo-600
                           to-cyan-500 items-center
                           justify-center text-xs font-bold
                           text-white"
              >
                A
              </div>
            </>
          )}
        </div>
      )}

      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl
          text-sm leading-relaxed
          ${
            isUser
              ? isLight
                ? "bg-indigo-100 border border-indigo-300/60 text-indigo-900 rounded-tr-sm"
                : "bg-indigo-900/60 border border-indigo-700/50 text-indigo-100 rounded-tr-sm"
              : isLLM
                ? isLight
                  ? "bg-violet-50 border border-violet-200 text-zinc-800 rounded-tl-sm"
                  : "bg-violet-950/60 border border-violet-700/40 text-zinc-100 rounded-tl-sm"
                : isLight
                  ? "bg-white border border-zinc-200 text-zinc-800 rounded-tl-sm"
                  : "bg-zinc-900/80 border border-zinc-800 text-zinc-100 rounded-tl-sm"
          }`}
      >
        {isUser ? (
          <span>{text}</span>
        ) : (
          <div
            className={`max-w-none
                        ${
                          isLight
                            ? "prose prose-sm prose-zinc"
                            : "prose prose-invert prose-sm"
                        }
                        prose-p:my-1 prose-ul:my-1
                        prose-li:my-0.5
                        prose-strong:text-indigo-${
                          isLight ? "700" : "300"
                        }
                        prose-code:text-${
                          isLight ? "indigo-700" : "cyan-300"
                        }`}
          >
            <ReactMarkdown>{rendered}</ReactMarkdown>
          </div>
        )}

        {/* LLM badge */}
        {isLLM && (
          <div
            className="flex items-center gap-1 mt-2 pt-2
                       border-t"
            style={{
              borderColor: isLight
                ? "rgba(139,92,246,0.20)"
                : "rgba(139,92,246,0.40)",
            }}
          >
            <span
              className="text-[10px]"
              style={{
                color: isLight ? "#7c3aed" : "#a78bfa",
              }}
            >
              ✦ GPT-4o mini
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

