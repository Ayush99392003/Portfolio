"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useChatStore } from "@/store/useChatStore";
import MessageBubble from "./MessageBubble";
import ProcessingPulse from "./ProcessingPulse";
import SuggestedCards from "./SuggestedCards";
import OptionButtons from "./OptionButtons";

export default function ChatHistory() {
  const { chatHistory, isProcessing, currentNodeId } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isProcessing]);

  const isRoot = currentNodeId === "root";

  return (
    <div
      className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 space-y-3 min-h-0"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#27272a transparent" }}
    >
      {chatHistory.map((msg, i) => {
        // Only the very last bot message should stream
        const isLatestBot =
          msg.role === "bot" &&
          i ===
            chatHistory.reduce(
              (last, m, idx) =>
                m.role === "bot" ? idx : last,
              -1,
            );
        return (
          <MessageBubble
            key={msg.id}
            role={msg.role}
            text={msg.text}
            index={i}
            isLatest={isLatestBot}
          />
        );
      })}

      <AnimatePresence>
        {isProcessing && <ProcessingPulse key="pulse" />}
      </AnimatePresence>

      {/* Root: show suggested cards below the welcome message */}
      {isRoot && !isProcessing && (
        <div className="pt-1">
          <SuggestedCards />
        </div>
      )}

      {/* Non-root: show conversation option buttons */}
      {!isRoot && !isProcessing && (
        <div className="pt-1">
          <OptionButtons />
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
