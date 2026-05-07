import { create } from "zustand"
import { persist } from "zustand/middleware"

interface BackgroundState {
  currentBackground: string
  setBackground: (url: string) => void
}

export const useBackgroundStore = create<BackgroundState>()(
  persist(
    (set) => ({
      currentBackground: "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778056280/adventurer_assets_migration/images/Summer1_e0gbfd.jpg", // Default background
      setBackground: (url: string) => set({ currentBackground: url }),
    }),
    {
      name: "background-storage",
    },
  ),
)

