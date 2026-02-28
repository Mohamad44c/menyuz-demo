'use client'

import { useState, useEffect } from 'react'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { cn, moneyFormatter } from '@/lib/utils'

import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import CartListItems from './cart-list-items'

export default function CartGlance() {
  const { cart, totalItems, totalPrice } = useCartStore()
  const [_isOpen, setIsOpen] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => setHasMounted(true), [])

  // Use 0/empty during SSR/initial hydration to avoid mismatch with localStorage-persisted cart
  const displayCount = hasMounted ? totalItems() : 0
  const subtotal = hasMounted ? totalPrice() : 0
  const displayCart = hasMounted ? cart : []

  // Function to generate WhatsApp order message
  const generateWhatsAppMessage = () => {
    const itemsList = displayCart
      .map((item) => `- ${item.name} (${item.quantity} x ${moneyFormatter.format(item.basePrice)})`)
      .join('\n')

    return encodeURIComponent(
      `Hello! I would like to place an order:\n\n` +
        `${itemsList}\n\n` +
        `Total: ${moneyFormatter.format(subtotal)}\n\n` +
        `Please confirm availability`,
    )
  }

  return (
    <>
      <Drawer disablePreventScroll={false}>
        <DrawerTrigger asChild className={cn('lg:hidden', displayCount === 0 && 'hidden')}>
          <div className="fixed bottom-9 z-50 w-4/5 rounded-xl bg-primary text-white flex justify-center items-center">
            <div className="relative w-full mx-auto flex justify-center items-center">
              <button
                className="text-background flex justify-center items-center flex-1 py-3 px-4 font-medium gap-3"
                onClick={() => setIsOpen(true)}
              >
                <span>View Order</span> <ShoppingCart className="h-5 w-5" />
              </button>
              <span className="absolute rounded-full bg-red-500 text-white text-sm font-medium w-8 h-8 flex justify-center items-center -right-2 -top-2">
                {displayCount}
              </span>
            </div>
          </div>
        </DrawerTrigger>

        <DrawerContent className="h-auto p-0 border-0">
          <DrawerHeader className="overflow-x-scroll">
            <DrawerTitle className="flex flex-col gap-2">
              <span>{`Order Summary (${displayCount} ${displayCount !== 1 ? 'items' : 'item'})`}</span>
            </DrawerTitle>
            <DrawerDescription asChild>
              <CartListItems />
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div className="flex justify-between items-center gap-4 rounded-t-xl">
              <span className="font-medium">Total: {moneyFormatter.format(subtotal)}</span>
              <a
                href={`https://wa.me/+96176425951?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-background bg-foreground px-4 py-3 rounded-xl text-center shrink-0"
                onClick={() => setIsOpen(false)}
              >
                Order via WhatsApp
              </a>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
