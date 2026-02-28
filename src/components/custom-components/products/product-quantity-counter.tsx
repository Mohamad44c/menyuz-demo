'use client'

import { MinusIcon, Plus, Trash } from 'lucide-react'
import { cn } from '@/lib/utils'

type ProductQuantityCounterProps = {
  value: number
  onIncrement: (value: number) => void
  onDecrement: (value: number) => void
  isInCartGlance: boolean
  /** Use foreground color instead of primary for better visibility in light mode */
  variant?: 'primary' | 'foreground'
}

export default function ProductQuantityCounter({
  value,
  onIncrement,
  onDecrement,
  isInCartGlance = false,
  variant = 'primary',
}: ProductQuantityCounterProps) {
  const iconClass = variant === 'foreground' ? 'text-foreground' : 'text-primary'
  return (
    <div
      className={cn(
        'flex justify-center items-center text-center gap-8 rounded-md text-sm h-auto',
        iconClass,
      )}
    >
      <button
        onClick={(e) => {
          e.preventDefault()
          onDecrement(value)
        }}
        aria-label={isInCartGlance && value === 1 ? 'Remove item' : 'Decrease quantity'}
      >
        {isInCartGlance && value === 1 ? (
          <Trash className={cn('w-7 h-7 rounded-full p-1', iconClass)} />
        ) : (
          <MinusIcon className={cn('w-7 h-7 rounded-full p-1', iconClass)} strokeWidth={2} />
        )}
      </button>

      <span className="text-lg">{value}</span>

      <button
        onClick={(e) => {
          e.preventDefault()
          onIncrement(value)
        }}
        aria-label="Increase quantity"
      >
        <Plus className={cn('w-7 h-7 rounded-full p-1', iconClass)} strokeWidth={2} />
      </button>
    </div>
  )
}
