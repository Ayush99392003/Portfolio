"use client";
import { useState, useRef, KeyboardEvent } from "react";
import { RotateCcw, PanelLeft, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "@/store/useChatStore";
import ChatHistory from "./ChatHistory";

export default function ChatController() {
  const {
    resetChat,
    toggleLeftPanel,
    leftPanelOpen,
    appendLLMMessage,
    chatHistory,
  } = useChatStore();

  const [inputValue, setInputValue] = useState("");
  const [llmLoading, setLlmLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    const query = inputValue.trim();
    if (!query || llmLoading) return;

    setInputValue("");
    setLlmLoading(true);

    // Add user message to history
    useChatStore.getState().chatHistory; // read current
    // Append user message via store
    useChatStore.setState((state) => ({
      chatHistory: [
        ...state.chatHistory,
        { id: Date.now().toString(), role: "user", text: query },
      ],
      isProcessing: true,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      appendLLMMessage(data.answer ?? "Sorry, I couldn't generate a response.");
    } catch {
      appendLLMMessage("⚠️ Couldn't connect to the AI. Check your API key.");
    } finally {
      setLlmLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showLLMInput = chatHistory.length > 1; // show after first interaction

  return (
    <div className="flex flex-col h-full bg-black/10">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3
                      border-b border-zinc-800/60 bg-zinc-950/80
                      backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-2.5">
          {/* Toggle left panel */}
          <button
            onClick={toggleLeftPanel}
            title="Toggle activity feed"
            className={`p-1.5 rounded-lg transition-all duration-150
              ${leftPanelOpen
                ? "bg-indigo-600/30 text-indigo-400 border border-indigo-600/30"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60"
              }`}
          >
            <PanelLeft size={15} />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="relative flex-shrink-0">
              <img
                src="/ayush.jpg"
                alt="Ayush Agarwal"
                className="w-8 h-8 rounded-full object-cover border border-indigo-600/40"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div className="hidden w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600
                              to-cyan-500 items-center justify-center
                              text-xs font-bold text-white">
                A
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5
                               bg-emerald-500 rounded-full border-2 border-black" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white tracking-tight leading-none">
                Ayush Agarwal
              </h1>
              <p className="text-[11px] text-zinc-500 mt-0.5">AI/ML Engineer · VIT Bhopal</p>
            </div>
          </div>
        </div>

        <button
          onClick={resetChat}
          title="Start over"
          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300
                     hover:bg-zinc-800/60 transition-all duration-150"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* ── Chat Messages ── */}
      <ChatHistory />

      {/* ── LLM Freeform Input ── */}
      <AnimatePresence>
        {showLLMInput && (
          <motion.div
            className="flex-shrink-0 px-4 py-3 border-t border-zinc-800/60
                       bg-zinc-950/80 backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl
                            bg-zinc-900/80 border border-zinc-800/80
                            focus-within:border-indigo-600/50 transition-all duration-200">
              <div className="w-1 h-4 rounded-full bg-gradient-to-b from-indigo-500 to-cyan-500 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything... e.g. What's your MCP experience?"
                disabled={llmLoading}
                className="flex-1 bg-transparent text-sm text-zinc-200
                           placeholder-zinc-600 outline-none min-w-0
                           disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || llmLoading}
                className="flex-shrink-0 p-1.5 rounded-lg text-zinc-500
                           hover:text-indigo-400 disabled:opacity-40
                           disabled:cursor-not-allowed transition-all duration-150"
              >
                {llmLoading
                  ? <Loader2 size={14} className="animate-spin" />
                  : <Send size={14} />
                }
              </button>
            </div>
            <p className="text-[10px] text-zinc-700 mt-1.5 text-center">
              AI-powered · Uses GPT-4o mini · Context: Ayush's portfolio
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
