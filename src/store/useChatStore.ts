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

interface ChatStore {
  // --- Conversation State ---
  currentNodeId: string;
  chatHistory: ChatMessage[];
  isProcessing: boolean;

  // --- Left Panel (Activity Feed) ---
  leftPanelOpen: boolean;

  // --- Right Sidebar (On-demand context panel) ---
  rightSidebar: RightSidebarState;

  // --- Actions ---
  selectOption: (
    label: string,
    nextNodeId: string,
    sidebarAction?: { contentType: SidebarContentType; contentId?: string },
    externalUrl?: string
  ) => void;
  openRightSidebar: (
    contentType: SidebarContentType,
    contentId?: string
  ) => void;
  closeRightSidebar: () => void;
  toggleLeftPanel: () => void;
  appendLLMMessage: (text: string) => void;
  resetChat: () => void;
}

const generateId = () =>
  Math.random().toString(36).substring(2, 11);

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
  leftPanelOpen: false,
  rightSidebar: {
    isOpen: false,          // RIGHT panel starts HIDDEN
    contentType: "feed",
    contentId: null,
  },

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

    // Simulate bot "thinking" delay
    setTimeout(() => {
      set((state) => ({
        currentNodeId: nextNodeId,
        chatHistory: [
          ...state.chatHistory,
          { id: generateId(), role: "bot", text: nextNode.botMessage },
        ],
        isProcessing: false,
        rightSidebar: sidebarAction
          ? {
              isOpen: true,
              contentType: sidebarAction.contentType,
              contentId: sidebarAction.contentId ?? null,
            }
          : state.rightSidebar,
      }));
    }, 600);
  },

  openRightSidebar: (contentType, contentId) => {
    set({
      rightSidebar: {
        isOpen: true,
        contentType,
        contentId: contentId ?? null,
      },
    });
  },

  closeRightSidebar: () => {
    set((state) => ({
      rightSidebar: { ...state.rightSidebar, isOpen: false },
    }));
  },

  toggleLeftPanel: () => {
    set((state) => ({ leftPanelOpen: !state.leftPanelOpen }));
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
      rightSidebar: { isOpen: false, contentType: "feed", contentId: null },
    });
  },
}));
