import { createContext, useContext, useState, type ReactNode } from "react";
import type { SavedMessage } from "@/types";

interface AppContextValue {
  messages: SavedMessage[];
  addMessage: (msg: SavedMessage) => void;
  deleteMessage: (id: string) => void;
  updateMessage: (id: string, updates: Partial<SavedMessage>) => void;
  toggleFavorite: (id: string) => void;
  favorites: SavedMessage[];
  dailyCount: number;
  incrementDailyCount: () => void;
  canGenerate: boolean;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const DAILY_LIMIT = 10;

function getTodayKey() {
  const d = new Date();
  return `smw-count-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<SavedMessage[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("smw-messages") || "[]");
    } catch {
      return [];
    }
  });

  const [dailyCount, setDailyCount] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const key = getTodayKey();
    return parseInt(localStorage.getItem(key) || "0", 10);
  });

  const persistMessages = (msgs: SavedMessage[]) => {
    setMessages(msgs);
    localStorage.setItem("smw-messages", JSON.stringify(msgs));
  };

  const addMessage = (msg: SavedMessage) => {
    const updated = [msg, ...messages];
    persistMessages(updated);
  };

  const deleteMessage = (id: string) => {
    persistMessages(messages.filter((m) => m.id !== id));
  };

  const updateMessage = (id: string, updates: Partial<SavedMessage>) => {
    persistMessages(messages.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  };

  const toggleFavorite = (id: string) => {
    persistMessages(
      messages.map((m) => (m.id === id ? { ...m, favorite: !m.favorite } : m))
    );
  };

  const incrementDailyCount = () => {
    const next = dailyCount + 1;
    setDailyCount(next);
    localStorage.setItem(getTodayKey(), String(next));
  };

  const favorites = messages.filter((m) => m.favorite);

  return (
    <AppContext.Provider
      value={{
        messages,
        addMessage,
        deleteMessage,
        updateMessage,
        toggleFavorite,
        favorites,
        dailyCount,
        incrementDailyCount,
        canGenerate: dailyCount < DAILY_LIMIT,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
