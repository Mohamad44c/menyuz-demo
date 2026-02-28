'use client'

import { type ReactNode, useEffect } from 'react'
import { ThemeProvider } from './theme-provider'
import { CartProvider } from './store-provider'
import { useCartStore } from '@/store/cartStore'

function CartRehydrator() {
  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])
  return null
}

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <CartProvider>
        <CartRehydrator />
        {children}
      </CartProvider>
    </ThemeProvider>
  )
}
