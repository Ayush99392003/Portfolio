"use client";
import { useState, useRef, KeyboardEvent } from "react";
import { RotateCcw, PanelLeft, Send, Loader2, Sun, Moon } from "lucide-react";
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
    theme,
    toggleTheme,
  } = useChatStore();

  const [inputValue, setInputValue] = useState("");
  const [llmLoading, setLlmLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    const query = inputValue.trim();
    if (!query || llmLoading) return;

    setInputValue("");
    setLlmLoading(true);

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
  const isLight = theme === "light";

  return (
    <div
      className="flex flex-col h-full panel-transition"
      style={{ background: "transparent" }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-4 py-3
                    border-b backdrop-blur-sm flex-shrink-0 panel-transition"
        style={{
          borderColor: "var(--border)",
          background: "var(--panel-bg)",
        }}
      >
        <div className="flex items-center gap-2.5">
          {/* Toggle left panel */}
          <button
            onClick={toggleLeftPanel}
            title="Toggle activity feed"
            className={`p-1.5 rounded-lg transition-all duration-150
              ${leftPanelOpen
                ? "bg-indigo-600/30 text-indigo-400 border border-indigo-600/30"
                : "hover:bg-zinc-800/60"
              }`}
            style={{ color: leftPanelOpen ? undefined : "var(--text-muted)" }}
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
                               bg-emerald-500 rounded-full border-2"
                    style={{ borderColor: "var(--panel-solid)" }} />
            </div>
            <div>
              <h1
                className="text-sm font-semibold tracking-tight leading-none"
                style={{ color: "var(--text-primary)" }}
              >
                Ayush Agarwal
              </h1>
              <p
                className="text-[11px] mt-0.5"
                style={{ color: "var(--text-muted)" }}
              >
                AI/ML Engineer · VIT Bhopal
              </p>
            </div>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-1">
          {/* Dark / Light toggle */}
          <button
            onClick={toggleTheme}
            title={isLight ? "Switch to Dark mode" : "Switch to Light mode"}
            className="p-1.5 rounded-lg transition-all duration-200 hover:scale-110"
            style={{
              color: isLight ? "#f59e0b" : "#94a3b8",
              background: isLight
                ? "rgba(245,158,11,0.10)"
                : "rgba(148,163,184,0.08)",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isLight ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <Sun size={15} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <Moon size={15} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Reset */}
          <button
            onClick={resetChat}
            title="Start over"
            className="p-1.5 rounded-lg transition-all duration-150"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* ── Chat Messages ── */}
      <ChatHistory />

      {/* ── LLM Freeform Input ── */}
      <AnimatePresence>
        {showLLMInput && (
          <motion.div
            className="flex-shrink-0 px-4 py-3 border-t backdrop-blur-sm panel-transition"
            style={{
              borderColor: "var(--border)",
              background: "var(--panel-bg)",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl
                          transition-all duration-200"
              style={{
                background: "var(--input-bg)",
                border: "1px solid var(--input-border)",
              }}
            >
              <div className="w-1 h-4 rounded-full bg-gradient-to-b from-indigo-500 to-cyan-500 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything... e.g. What's your MCP experience?"
                disabled={llmLoading}
                className="flex-1 bg-transparent text-sm outline-none min-w-0
                           disabled:opacity-50"
                style={{
                  color: "var(--text-primary)",
                }}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || llmLoading}
                className="flex-shrink-0 p-1.5 rounded-lg
                           hover:text-indigo-400 disabled:opacity-40
                           disabled:cursor-not-allowed transition-all duration-150"
                style={{ color: "var(--text-muted)" }}
              >
                {llmLoading
                  ? <Loader2 size={14} className="animate-spin" />
                  : <Send size={14} />
                }
              </button>
            </div>
            <p
              className="text-[10px] mt-1.5 text-center"
              style={{ color: "var(--text-muted)" }}
            >
              AI-powered · Uses GPT-4o mini · Context: Ayush&apos;s portfolio
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
