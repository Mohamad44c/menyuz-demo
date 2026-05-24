'use client'

/**
 * PriceDisplay — a tiny client component that reads the active currency from
 * the currency store and formats a raw amount.
 *
 * Because this is a client component, it can safely be rendered inside server
 * components (RSC) — React will hydrate it on the client without forcing the
 * parent to become a client component.
 */

import { useCurrency } from '@/hooks/use-currency'

interface PriceDisplayProps {
  amount: number
  className?: string
}

export function PriceDisplay({ amount, className }: PriceDisplayProps) {
  const { formatPrice } = useCurrency()
  return <span className={className}>{formatPrice(amount)}</span>
}
