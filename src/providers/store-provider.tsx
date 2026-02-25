// providers/store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, createStore } from 'zustand'
import { useStore } from 'zustand'

interface CartStore {
  items: number
  addItem: () => void
}

const createCartStore = () => {
  return createStore<CartStore>((set) => ({
    items: 0,
    addItem: () => set((state) => ({ items: state.items + 1 })),
  }))
}

type CartStoreApi = StoreApi<CartStore>

const CartContext = createContext<CartStoreApi | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  // @ts-ignore
  const storeRef = useRef<CartStoreApi>()

  // Initialize the store if it doesn't exist
  if (!storeRef.current) {
    storeRef.current = createCartStore()
  }

  return <CartContext.Provider value={storeRef.current}>{children}</CartContext.Provider>
}

export function useCartStore<T>(selector: (store: CartStore) => T): T {
  const store = useContext(CartContext)

  if (!store) {
    throw new Error('useCartStore must be used within a CartProvider')
  }

  return useStore(store, selector)
}
