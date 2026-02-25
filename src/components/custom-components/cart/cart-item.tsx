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
    <div className="w-full flex flex-col justify-center items-center text-primary">
      <div className="w-full flex justify-between items-start mt-3">
        <div className="w-[83px] h-[83px] relative overflow-hidden rounded-2xl">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
              width={120}
              height={120}
              priority
              quality={100}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-2xl animate-pulse"></div>
          )}
        </div>
        <div className="flex flex-col justify-center gap-3 items-start flex-1 px-3 text-left">
          <h1 className="font-semibold">{name}</h1>
        </div>

        <div className="flex flex-col justify-center items-end gap-1">
          <span className="text-sm font-bold rounded-full bg-light-grey w-fit py-1 px-2 my-1">
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
