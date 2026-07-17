"use client";
import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";

/**
 * Registers global keyboard shortcuts:
 *   Ctrl+K or /  → Focus the LLM input field
 *   Escape       → Close any open sidebar
 *   Ctrl+\       → Toggle left panel
 */
export function useKeyboardShortcuts() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag =
        (e.target as HTMLElement).tagName ?? "";
      const isInput =
        tag === "INPUT" || tag === "TEXTAREA";

      // Ctrl+K → Focus LLM input (works everywhere)
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const input =
          document.querySelector<HTMLInputElement>(
            'input[placeholder*="Ask me"]',
          );
        input?.focus();
        return;
      }

      // / → Focus LLM input (only when not in input)
      if (e.key === "/" && !isInput) {
        e.preventDefault();
        const input =
          document.querySelector<HTMLInputElement>(
            'input[placeholder*="Ask me"]',
          );
        input?.focus();
        return;
      }

      // Escape → Close sidebars
      if (e.key === "Escape") {
        const state = useChatStore.getState();
        if (state.rightSidebar.isOpen) {
          state.closeRightSidebar();
        } else if (state.leftPanelOpen) {
          state.toggleLeftPanel();
        }
        return;
      }

      // Ctrl+\ → Toggle left panel
      if (
        e.key === "\\" &&
        (e.ctrlKey || e.metaKey)
      ) {
        e.preventDefault();
        useChatStore.getState().toggleLeftPanel();
        return;
      }
    };

    window.addEventListener("keydown", handler);
    return () =>
      window.removeEventListener("keydown", handler);
  }, []);
}
