import { create } from "zustand"
import { persist } from "zustand/middleware"

interface BackgroundState {
  currentBackground: string
  setBackground: (url: string) => void
}

export const useBackgroundStore = create<BackgroundState>()(
  persist(
    (set) => ({
      currentBackground: "/assets/Seasons/Summer1.jpg", // Default background
      setBackground: (url: string) => set({ currentBackground: url }),
    }),
    {
      name: "background-storage",
    },
  ),
)

