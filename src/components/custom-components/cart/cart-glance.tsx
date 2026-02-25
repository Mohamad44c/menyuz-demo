'use client'

import { useState } from 'react'

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

  const subtotal = totalPrice() // Using the store's totalPrice function

  // Function to generate WhatsApp order message
  const generateWhatsAppMessage = () => {
    const itemsList = cart
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
        <DrawerTrigger asChild className={cn('lg:hidden', totalItems() === 0 && 'hidden')}>
          <div className="fixed bottom-9 z-50 rounded-md bg-primary text-white w-4/5 text-center flex justify-center items-center">
            <div className="relative w-full mx-auto flex justify-center items-center">
              <button
                className="flex justify-center items-center text-center flex-1 py-2 px-3 font-medium gap-4"
                onClick={() => setIsOpen(true)}
              >
                <span>View Order</span> <ShoppingCart className="h-5 w-5" />
              </button>
              <span className="absolute rounded-full bg-red-500 text-white font-medium p-1 w-9 h-9 flex justify-center items-center right-[-15px] top-[-15px]">
                {totalItems()}
              </span>
            </div>
          </div>
        </DrawerTrigger>

        <DrawerContent className="bg-background h-auto p-0 border-0">
          <DrawerHeader className="overflow-x-scroll">
            <DrawerTitle className="flex flex-col gap-3">
              <span>{`Order Summary (${totalItems()} ${totalItems() > 1 ? 'items' : 'item'})`}</span>
            </DrawerTitle>
            <DrawerDescription asChild>
              <CartListItems />
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div className="flex justify-between items-center rounded-t-md">
              <div className="flex gap-2 flex-wrap">
                <span className="font-medium">Total: {moneyFormatter.format(subtotal)}</span>
              </div>
              <a
                href={`https://wa.me/+96176425951?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="md:text-xl font-medium text-background bg-foreground px-4 py-2 rounded-md text-center"
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
