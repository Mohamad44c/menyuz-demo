'use client'

import { useSettings } from '@/providers/settings-provider'
import { useCurrencyStore } from '@/store/currencyStore'
import { DEFAULTS } from '@/lib/defaults'

/**
 * Format a monetary amount with the given symbol and conversion rate.
 * - Rates >= 100 (e.g. LBP, IDR): no decimal places, thousands-separated
 * - Rates < 100 (e.g. EUR, GBP): up to 2 decimal places, strips trailing ".00"
 */
export function formatAmount(
  amount: number,
  symbol: string,
  rate: number = 1,
  position: 'before' | 'after' = 'before',
): string {
  const converted = amount * rate
  let formatted: string
  if (rate >= 100) {
    formatted = Math.round(converted).toLocaleString('en-US')
  } else {
    const fixed = converted.toFixed(2)
    formatted = fixed.endsWith('.00') ? fixed.slice(0, -3) : fixed
  }
  return position === 'before' ? `${symbol}${formatted}` : `${formatted} ${symbol}`
}

/**
 * Central currency hook.
 *
 * - `formatPrice(amount)` converts and formats in the user's active currency.
 * - `formatPrimaryPrice(amount)` always uses the primary currency — use this
 *   in WhatsApp order messages so the business always sees the base currency.
 * - `isSecondaryEnabled` — true when a second currency is configured in Settings.
 */
export function useCurrency() {
  const settings = useSettings()
  const { mode, toggle } = useCurrencyStore()

  const primarySymbol = settings?.currencySymbol ?? DEFAULTS.currencySymbol
  const primaryLabel = settings?.currencyLabel ?? primarySymbol
  const primaryPosition = (settings?.currencyPosition as 'before' | 'after' | null | undefined) ?? DEFAULTS.currencyPosition

  const secondaryEnabled = settings?.secondaryCurrencyEnabled === true
  const secondarySymbol = settings?.secondaryCurrencySymbol ?? ''
  const secondaryLabel = settings?.secondaryCurrencyLabel ?? secondarySymbol
  const secondaryPosition = (settings?.secondaryCurrencyPosition as 'before' | 'after' | null | undefined) ?? DEFAULTS.secondaryCurrencyPosition
  const conversionRate = settings?.secondaryCurrencyConversionRate ?? 1

  const isSecondary = secondaryEnabled && mode === 'secondary'

  const activeSymbol = isSecondary ? secondarySymbol : primarySymbol
  const activeLabel = isSecondary ? secondaryLabel : primaryLabel
  const activePosition = isSecondary ? secondaryPosition : primaryPosition
  const activeRate = isSecondary ? conversionRate : 1

  function formatPrice(amount: number): string {
    return formatAmount(amount, activeSymbol, activeRate, activePosition)
  }

  /** Always format in primary currency — for WA messages, totals sent to the business. */
  function formatPrimaryPrice(amount: number): string {
    return formatAmount(amount, primarySymbol, 1, primaryPosition)
  }

  return {
    mode: (isSecondary ? 'secondary' : 'primary') as 'primary' | 'secondary',
    toggle,
    symbol: activeSymbol,
    label: activeLabel,
    primaryLabel,
    secondaryLabel,
    formatPrice,
    formatPrimaryPrice,
    isSecondaryEnabled: secondaryEnabled,
  }
}
