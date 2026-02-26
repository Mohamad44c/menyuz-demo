'use client'

import { MinusIcon, Plus, Trash } from 'lucide-react'

type ProductQuantityCounterProps = {
  value: number
  onIncrement: (value: number) => void
  onDecrement: (value: number) => void
  isInCartGlance: boolean
}

export default function ProductQuantityCounter({
  value,
  onIncrement,
  onDecrement,
  isInCartGlance = false,
}: ProductQuantityCounterProps) {
  return (
    <div className="flex justify-center items-center text-center gap-8 rounded-md text-primary text-sm h-auto">
      <button
        onClick={(e) => {
          e.preventDefault()
          onDecrement(value)
        }}
        aria-label={isInCartGlance && value === 1 ? 'Remove item' : 'Decrease quantity'}
      >
        {isInCartGlance && value === 1 ? (
          <Trash className="w-7 h-7 text-primary rounded-full p-1" />
        ) : (
          <MinusIcon className="w-7 h-7 text-primary rounded-full p-1" strokeWidth={2} />
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
        <Plus className="w-7 h-7 text-primary rounded-full p-1" strokeWidth={2} />
      </button>
    </div>
  )
}
