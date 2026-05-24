'use client'

import { useCurrency } from '@/hooks/use-currency'
import { cn } from '@/lib/utils'

/**
 * CurrencyToggle — pill that switches between primary and secondary currency.
 * Only renders when a second currency is configured in Settings.
 */
export default function CurrencyToggle() {
  const { mode, toggle, primaryLabel, secondaryLabel, isSecondaryEnabled } = useCurrency()

  if (!isSecondaryEnabled) return null

  const isPrimary = mode === 'primary'

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isPrimary ? secondaryLabel : primaryLabel}`}
      title={`Switch to ${isPrimary ? secondaryLabel : primaryLabel}`}
      className="flex items-center rounded-full border border-border bg-muted text-xs font-semibold overflow-hidden select-none transition-colors"
    >
      <span
        className={cn(
          'px-2.5 py-1 transition-colors duration-200',
          isPrimary
            ? 'bg-primary text-primary-foreground rounded-full'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        {primaryLabel}
      </span>
      <span
        className={cn(
          'px-2.5 py-1 transition-colors duration-200',
          !isPrimary
            ? 'bg-primary text-primary-foreground rounded-full'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        {secondaryLabel}
      </span>
    </button>
  )
}
