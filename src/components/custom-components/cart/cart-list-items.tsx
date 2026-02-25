import { useCartStore } from '@/store/cartStore'
import React from 'react'
import CartItem from './cart-item'

export default function CartListItems() {
  const { cart } = useCartStore()
  return (
    <div className="flex flex-col gap-4 divide-gray-400 divide-y-[1px]">
      {cart.length > 0 ? (
        cart.map((item) => <CartItem key={item.id} cartItem={item} />)
      ) : (
        <p>Start ordering</p>
      )}
    </div>
  )
}
