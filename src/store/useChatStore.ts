// useChatStore.ts
// Zustand global store powering the 3-pane conversation engine.
import { create } from "zustand";
import {
  conversationGraph,
  ChatNode,
  SidebarContentType,
} from "./conversationGraph";

export interface ChatMessage {
  id: string;
  role: "user" | "bot" | "llm";
  text: string;
}

export interface RightSidebarState {
  isOpen: boolean;
  contentType: SidebarContentType;
  contentId: string | null;
}

export type Theme = "dark" | "light";

interface ChatStore {
  // --- Conversation State ---
  currentNodeId: string;
  chatHistory: ChatMessage[];
  isProcessing: boolean;
  nodeHistory: string[];

  // --- Left Panel (Activity Feed) ---
  leftPanelOpen: boolean;

  // --- Right Sidebar (On-demand context panel) ---
  rightSidebar: RightSidebarState;

  // --- Theme ---
  theme: Theme;

  // --- Actions ---
  selectOption: (
    label: string,
    nextNodeId: string,
    sidebarAction?: {
      contentType: SidebarContentType;
      contentId?: string;
    },
    externalUrl?: string,
  ) => void;
  openRightSidebar: (
    contentType: SidebarContentType,
    contentId?: string,
  ) => void;
  closeRightSidebar: () => void;
  toggleLeftPanel: () => void;
  appendLLMMessage: (text: string) => void;
  resetChat: () => void;
  toggleTheme: () => void;
  jumpToNode: (nodeId: string) => void;
}

const generateId = () =>
  Math.random().toString(36).substring(2, 11);

/** Returns true when the current viewport is considered "mobile" (<768px). */
const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

export const useChatStore = create<ChatStore>((set) => ({
  currentNodeId: "root",
  chatHistory: [
    {
      id: generateId(),
      role: "bot",
      text: conversationGraph["root"].botMessage,
    },
  ],
  isProcessing: false,
  nodeHistory: ["root"],
  leftPanelOpen: false,
  rightSidebar: {
    isOpen: false,          // RIGHT panel starts HIDDEN
    contentType: "feed",
    contentId: null,
  },
  theme: "dark",

  selectOption: (label, nextNodeId, sidebarAction, externalUrl) => {
    if (externalUrl) {
      window.open(externalUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const nextNode: ChatNode | undefined = conversationGraph[nextNodeId];
    if (!nextNode) return;

    // Add user message bubble
    set((state) => ({
      chatHistory: [
        ...state.chatHistory,
        { id: generateId(), role: "user", text: label },
      ],
      isProcessing: true,
    }));

    // Simulate bot "thinking" — variable delay
    const typingDelay = Math.min(
      400 + nextNode.botMessage.length * 3,
      2000,
    );
    setTimeout(() => {
      set((state) => ({
        currentNodeId: nextNodeId,
        nodeHistory: [
          ...state.nodeHistory,
          nextNodeId,
        ],
        chatHistory: [
          ...state.chatHistory,
          { id: generateId(), role: "bot", text: nextNode.botMessage },
        ],
        isProcessing: false,
        // On mobile, opening the right sidebar auto-closes the left panel
        leftPanelOpen: sidebarAction && isMobile()
          ? false
          : state.leftPanelOpen,
        rightSidebar: sidebarAction
          ? {
              isOpen: true,
              contentType: sidebarAction.contentType,
              contentId: sidebarAction.contentId ?? null,
            }
          : state.rightSidebar,
      }));
    }, typingDelay);
  },

  openRightSidebar: (contentType, contentId) => {
    set((state) => ({
      // On mobile, auto-close left panel when right opens
      leftPanelOpen: isMobile() ? false : state.leftPanelOpen,
      rightSidebar: {
        isOpen: true,
        contentType,
        contentId: contentId ?? null,
      },
    }));
  },

  closeRightSidebar: () => {
    set((state) => ({
      rightSidebar: { ...state.rightSidebar, isOpen: false },
    }));
  },

  toggleLeftPanel: () => {
    set((state) => {
      const nextOpen = !state.leftPanelOpen;
      return {
        leftPanelOpen: nextOpen,
        // On mobile, opening left auto-closes right sidebar
        rightSidebar:
          nextOpen && isMobile()
            ? { ...state.rightSidebar, isOpen: false }
            : state.rightSidebar,
      };
    });
  },

  appendLLMMessage: (text) => {
    set((state) => ({
      chatHistory: [
        ...state.chatHistory,
        { id: generateId(), role: "llm", text },
      ],
      isProcessing: false,
    }));
  },

  resetChat: () => {
    set({
      currentNodeId: "root",
      chatHistory: [
        {
          id: generateId(),
          role: "bot",
          text: conversationGraph["root"].botMessage,
        },
      ],
      isProcessing: false,
      nodeHistory: ["root"],
      rightSidebar: {
        isOpen: false,
        contentType: "feed",
        contentId: null,
      },
    });
  },

  jumpToNode: (nodeId) => {
    const node = conversationGraph[nodeId];
    if (!node) return;
    set((state) => {
      // Trim history back to the target node
      const idx = state.nodeHistory.indexOf(nodeId);
      const trimmed =
        idx >= 0
          ? state.nodeHistory.slice(0, idx + 1)
          : [...state.nodeHistory, nodeId];
      return {
        currentNodeId: nodeId,
        nodeHistory: trimmed,
        chatHistory: [
          ...state.chatHistory,
          {
            id: generateId(),
            role: "bot",
            text: node.botMessage,
          },
        ],
        isProcessing: false,
      };
    });
  },

  toggleTheme: () => {
    set((state) => {
      const next: Theme = state.theme === "dark" ? "light" : "dark";
      // Apply / remove "light" class on <html> element
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("light", next === "light");
      }
      return { theme: next };
    });
  },
}));
