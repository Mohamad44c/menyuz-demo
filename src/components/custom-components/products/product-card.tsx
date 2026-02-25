'use client'

import Image, { StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'
import { Product } from '@/payload-types'
import { useState } from 'react'
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

interface ProductCardProps {
  id: number
  name: string
  description: string
  basePrice: number
  featuredImage: string | StaticImageData
  sizeOptions?: Product['sizeOptions']
  flavorOptions?: Product['flavorOptions']
  className?: string
  onClick?: (id: number) => void
}

export default function ProductCard({
  id,
  name,
  description,
  basePrice,
  featuredImage,
  sizeOptions = [],
  flavorOptions = [],
  className,
  onClick,
}: ProductCardProps) {
  const { cart, incrementQuantity, decrementQuantity } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const addToCart = useCartStore((state) => state.addToCart)

  //   console.log('[CART] ', cart)

  const handleAddToCart = () => {
    // Find the selected size option if it exists
    const selectedSizeOption = sizeOptions?.find((opt) => opt.sizeName === selectedSize)
    // Find the selected flavor option if it exists
    const selectedFlavorOption = flavorOptions?.find((opt) => opt.flavorName === selectedFlavor)

    // Calculate the final price including size and flavor modifiers
    const sizeModifier = selectedSizeOption?.priceModifier || 0
    const flavorModifier = selectedFlavorOption?.additionalCost || 0
    const price = basePrice + sizeModifier + flavorModifier

    // Prepare the cart item
    const cartItem = {
      id: id.toString(), // Ensure ID is string if your store expects it
      name,
      basePrice,
      price, // Include the calculated price
      size: selectedSize || 'Small', // More clear property name than sizeOptions
      flavor: selectedFlavor || undefined,
      quantity: quantity,
      featuredImage: featuredImage,
      // Include other necessary fields your cart might need
      ...(selectedSizeOption && {
        sizeOptions: {
          sizeName: selectedSizeOption.sizeName,
          priceModifier: selectedSizeOption.priceModifier || 0,
          description: selectedSizeOption.description || undefined,
        },
      }),
      ...(selectedFlavorOption && {
        flavorOptions: {
          flavorName: selectedFlavorOption.flavorName,
          additionalCost: selectedFlavorOption.additionalCost || 0,
        },
      }),
    }

    // @ts-ignore
    addToCart(cartItem, quantity)
    setIsOpen(false)
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <div
          className={cn(
            'flex group gap-4 items-center justify-center rounded-2xl transition-colors duration-300 ease-in-out hover:bg-light-grey cursor-pointer',
            className,
          )}
          onClick={() => onClick?.(id)}
        >
          <div className="flex flex-col gap-3 justify-center items-center">
            <div className="w-[70px] h-[70px] relative overflow-hidden rounded-2xl">
              {featuredImage ? (
                <Image
                  src={featuredImage}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
                  width={70}
                  height={70}
                  priority
                  quality={100}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-2xl animate-pulse" />
              )}
            </div>
          </div>
          <div
            className={cn(
              'flex flex-col gap-3 flex-1 justify-between',
              featuredImage ? 'min-h-[70px]' : '',
            )}
          >
            <div className="flex flex-col justify-between gap-1">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold">{name}</h3>
                <p className="text-sm font-bold rounded-full bg-light-grey w-fit py-1 px-2 my-1">
                  ${basePrice.toFixed(2)}
                </p>
              </div>
              <p className="font-light text-xs text-gray-500 line-clamp-3">{description}</p>
            </div>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <div className="p-4 h-full flex flex-col overflow-y-auto gap-4">
          <div className="flex gap-4">
            <div className="w-24 h-24 relative overflow-hidden rounded-2xl">
              {featuredImage ? (
                <Image
                  src={featuredImage}
                  alt={name}
                  className="w-full h-full rounded-lg object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
                  width={96}
                  height={96}
                  priority
                  sizes="100px"
                  quality={100}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-2xl animate-pulse" />
              )}
            </div>
            <div className="flex-1">
              <DrawerTitle className="text-xl font-bold">{name}</DrawerTitle>
              <DrawerDescription className="text-gray-600 mt-2">{description}</DrawerDescription>
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
                    className={`border rounded-lg h-8 text-sm transition-colors ${
                      selectedSize === option.sizeName
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedSize(option.sizeName)}
                  >
                    {option.sizeName}
                    {option.priceModifier && option.priceModifier > 0 && (
                      <span className="ml-1">(+${option.priceModifier.toFixed(2)})</span>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {flavorOptions && flavorOptions?.length > 0 && (
            <div className="flex items-center gap-4">
              <h3 className="font-medium">Select Flavor</h3>
              <div className="flex flex-wrap gap-2">
                {flavorOptions?.map((option) => (
                  <Button
                    variant="outline"
                    key={option.id || option.flavorName}
                    className={`border rounded-lg h-8 text-sm transition-colors ${
                      selectedFlavor === option.flavorName
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedFlavor(option.flavorName)}
                  >
                    {option.flavorName}
                    {option.additionalCost && option.additionalCost > 0 && (
                      <span className="ml-1">(+${option.additionalCost.toFixed(2)})</span>
                    )}
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
                {(
                  basePrice +
                  (sizeOptions?.find((opt) => opt.sizeName === selectedSize)?.priceModifier || 0) +
                  (flavorOptions?.find((opt) => opt.flavorName === selectedFlavor)
                    ?.additionalCost || 0)
                ).toFixed(2)}
              </span>
            </div>
            <button
              className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
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
