'use client'

import React from 'react'
import Image, { StaticImageData } from 'next/image'
import type { Media } from '@/payload-types'
import { ICartItem, useCartStore } from '@/store/cartStore'
import ProductQuantityCounter from '../products/product-quantity-counter'
import { moneyFormatter } from '@/lib/utils'

function resolveImageSrc(
  featuredImage: ICartItem['featuredImage'],
): string | StaticImageData | null {
  if (!featuredImage) return null
  if (typeof featuredImage === 'string') return featuredImage
  if (typeof featuredImage === 'object' && 'url' in featuredImage) {
    const media = featuredImage as Media
    return media.url || media.thumbnailURL || null
  }
  return null
}

type CartItemProps = {
  cartItem: ICartItem
}

export default function CartItem({ cartItem }: CartItemProps) {
  const { incrementQuantity, decrementQuantity } = useCartStore()

  const productId = cartItem.id
  const name = cartItem.name
  const basePrice = cartItem.basePrice
  const totalPrice = basePrice * cartItem.quantity

  const featuredImage = resolveImageSrc(cartItem.featuredImage)

  return (
    <div className="w-full flex flex-col justify-center items-center text-primary py-3">
      <div className="w-full flex justify-between items-start gap-3">
        {featuredImage && (
          <div className="w-20 h-20 relative overflow-hidden rounded-xl shrink-0">
            <Image
              src={featuredImage}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
              width={120}
              height={120}
              priority
              quality={100}
            />
          </div>
        )}
        <div className="flex flex-col justify-center gap-2 items-start flex-1 min-w-0 text-left">
          <h1 className="font-semibold text-sm">{name}</h1>
        </div>

        <div className="flex flex-col justify-center items-end gap-2 shrink-0">
          <span className="text-sm font-bold rounded-full bg-light-grey w-fit py-1.5 px-2.5">
            {moneyFormatter.format(totalPrice)}
          </span>
          <ProductQuantityCounter
            value={cartItem.quantity}
            onIncrement={() => {
              incrementQuantity(productId)
            }}
            onDecrement={() => {
              decrementQuantity(productId)
            }}
            isInCartGlance={true}
          />
        </div>
      </div>
    </div>
  )
}
