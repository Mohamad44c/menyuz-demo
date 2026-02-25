'use client'

import { type ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
import { CartProvider } from './store-provider'

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  )
}
