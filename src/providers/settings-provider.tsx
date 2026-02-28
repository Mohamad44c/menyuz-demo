'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { Setting } from '@/payload-types'

const SettingsContext = createContext<Setting | null>(null)

export function SettingsProvider({
  settings,
  children,
}: {
  settings: Setting | null
  children: ReactNode
}) {
  return (
    <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  return context
}
