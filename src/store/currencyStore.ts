import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type CurrencyMode = 'primary' | 'secondary'

interface CurrencyStore {
  mode: CurrencyMode
  toggle: () => void
  setMode: (mode: CurrencyMode) => void
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      mode: 'primary',
      toggle: () => set({ mode: get().mode === 'primary' ? 'secondary' : 'primary' }),
      setMode: (mode) => set({ mode }),
    }),
    {
      name: 'currency-storage',
      storage: createJSONStorage(() => localStorage),
      // Defer localStorage read until after mount to avoid hydration mismatch
      skipHydration: true,
    },
  ),
)
