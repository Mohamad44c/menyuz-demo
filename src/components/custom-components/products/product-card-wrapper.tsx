'use client'

import Image, { StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'
import type { Product, Sauce } from '@/payload-types'
import { useMemo, useState } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useCartStore } from '@/store/cartStore'
import ProductQuantityCounter from './product-quantity-counter'
import { Button } from '@/components/ui/button'
import type { ReactNode } from 'react'

function isSauceObject(s: number | Sauce): s is Sauce {
  return typeof s === 'object' && s !== null && 'name' in s
}

interface ProductCardWrapperProps {
  id: number
  name: string
  description: string
  basePrice: number
  featuredImage?: string | StaticImageData | null
  sizeOptions?: Product['sizeOptions']
  sauces?: Product['sauces']
  children: ReactNode
  onClick?: (id: number) => void
}

function formatPrice(price: number) {
  const fixed = price.toFixed(2)
  return fixed.endsWith('.00') ? fixed.slice(0, -3) : fixed
}

export default function ProductCardWrapper({
  id,
  name,
  description,
  basePrice,
  featuredImage = null,
  sizeOptions = [],
  sauces = [],
  children,
  onClick,
}: ProductCardWrapperProps) {
  const addToCart = useCartStore((state) => state.addToCart)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedSauce, setSelectedSauce] = useState<Sauce | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const sauceOptions = useMemo(() => sauces?.filter(isSauceObject) ?? [], [sauces])

  const handleAddToCart = () => {
    const selectedSizeOption = sizeOptions?.find((opt) => opt.sizeName === selectedSize)
    const sizeModifier = selectedSizeOption?.priceModifier || 0
    const price = basePrice + sizeModifier

    const cartItem = {
      id: id.toString(),
      name,
      description,
      basePrice,
      price,
      size: selectedSize || 'Small',
      quantity,
      featuredImage: featuredImage ?? '',
      ...(selectedSizeOption && {
        sizeOptions: {
          sizeName: selectedSizeOption.sizeName,
          priceModifier: selectedSizeOption.priceModifier || 0,
          description: selectedSizeOption.description || undefined,
        },
      }),
      ...(selectedSauce && {
        sauce: {
          id: selectedSauce.id,
          name: selectedSauce.name,
        },
      }),
    }

    // @ts-expect-error - cart item extends Product with custom fields
    addToCart(cartItem, quantity)
    setIsOpen(false)
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <div onClick={() => onClick?.(id)}>{children}</div>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <div className="p-4 h-full flex flex-col overflow-y-auto gap-4">
          <div className="flex gap-4">
            {featuredImage && (
              <div className="w-24 h-24 relative overflow-hidden rounded-2xl shrink-0">
                <Image
                  src={featuredImage}
                  alt={name}
                  className="w-full h-full rounded-lg object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
                  width={96}
                  height={96}
                  sizes="100px"
                  quality={80}
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <DrawerTitle className="text-xl font-bold">{name}</DrawerTitle>
                <p className="text-lg font-bold shrink-0 rounded-full bg-light-grey py-1 px-2.5">
                  ${formatPrice(
                    basePrice +
                      (sizeOptions?.find((opt) => opt.sizeName === selectedSize)?.priceModifier ||
                        0),
                  )}
                </p>
              </div>
              <DrawerDescription className="text-sm text-gray-400 mt-2">
                {description}
              </DrawerDescription>
            </div>
          </div>

          {sizeOptions && sizeOptions?.length > 0 && (
            <div className="flex items-center gap-4">
              <h3 className="font-medium">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizeOptions?.map((option) => (
                  <Button
                    variant="outline"
                    key={option.id || option.sizeName}
                    className={cn(
                      'border rounded-lg h-8 text-sm transition-colors',
                      selectedSize === option.sizeName
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 hover:border-gray-400',
                    )}
                    onClick={() => setSelectedSize(option.sizeName)}
                  >
                    {option.sizeName}
                    {option.priceModifier && option.priceModifier > 0 && (
                      <span className="ml-1">(+${formatPrice(option.priceModifier)})</span>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {sauceOptions.length > 0 && (
            <div className="flex items-center gap-4">
              <h3 className="font-medium">Select Sauce</h3>
              <div className="flex flex-wrap gap-2">
                {sauceOptions.map((option) => (
                  <Button
                    variant="outline"
                    key={option.id}
                    className={cn(
                      'border rounded-lg h-8 text-sm transition-colors',
                      selectedSauce?.id === option.id
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 hover:border-gray-400',
                    )}
                    onClick={() =>
                      setSelectedSauce(selectedSauce?.id === option.id ? null : option)
                    }
                  >
                    {option.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
          <ProductQuantityCounter
            value={quantity}
            onIncrement={() => setQuantity(quantity + 1)}
            onDecrement={() => {
              if (quantity > 1) setQuantity(quantity - 1)
            }}
            isInCartGlance={false}
          />
          <div className="mt-auto pt-4 flex justify-between items-center border-t">
            <div>
              <span className="text-lg font-bold">
                $
                {formatPrice(
                  basePrice +
                    (sizeOptions?.find((opt) => opt.sizeName === selectedSize)?.priceModifier || 0),
                )}
              </span>
            </div>
            <button
              className="bg-primary text-background px-6 py-2 rounded-lg font-bold hover:bg-primary/80 transition-colors"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
