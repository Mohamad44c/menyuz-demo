'use client'

import { type ReactNode, useEffect } from 'react'
import { ThemeProvider } from './theme-provider'
import { CartProvider } from './store-provider'
import { useCartStore } from '@/store/cartStore'
import { useCurrencyStore } from '@/store/currencyStore'

function StoreRehydrator() {
  useEffect(() => {
    useCartStore.persist.rehydrate()
    useCurrencyStore.persist.rehydrate()
  }, [])
  return null
}

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <CartProvider>
        <StoreRehydrator />
        {children}
      </CartProvider>
    </ThemeProvider>
  )
}
