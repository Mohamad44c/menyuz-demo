'use client'

import Image, { StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'
import { Media, Product } from '@/payload-types'
import { useState } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useCartStore } from '@/store/cartStore'
import { useCurrency } from '@/hooks/use-currency'
import ProductQuantityCounter from './product-quantity-counter'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

interface ProductCardProps {
  id: number
  name: string
  description: string
  basePrice: number
  featuredImage?: string | StaticImageData | Media | null
  sizeOptions?: Product['sizeOptions']
  className?: string
  onClick?: (id: number) => void
  priority?: boolean
}

export default function ProductCard({
  id,
  name,
  description,
  basePrice,
  featuredImage = null,
  sizeOptions = [],
  className,
  onClick,
  priority = false,
}: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart)
  const { formatPrice } = useCurrency()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const resolveFeaturedImage = (
    image: ProductCardProps['featuredImage'],
  ): string | StaticImageData | null => {
    if (!image) return null
    if (typeof image === 'string') return image
    if ('src' in image) return image
    return image.url ?? image.thumbnailURL ?? null
  }

  const resolvedFeaturedImage = resolveFeaturedImage(featuredImage)

  const selectedSizeOption = sizeOptions?.find((opt) => opt.sizeName === selectedSize)
  const sizeModifier = selectedSizeOption?.priceModifier ?? 0
  const displayPrice = basePrice + sizeModifier

  const handleAddToCart = () => {
    const cartItem = {
      id: id.toString(),
      name,
      description,
      basePrice,
      price: displayPrice,
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
    }

    // @ts-expect-error - cart item extends Product with custom fields
    addToCart(cartItem, quantity)
    setIsOpen(false)
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <div
          className={cn(
            'flex group gap-4 items-center justify-center rounded-2xl transition-all duration-300 ease-in-out hover:bg-light-grey cursor-pointer relative',
            className,
          )}
          onClick={() => onClick?.(id)}
        >
          {resolvedFeaturedImage && (
            <div className="w-[70px] h-[70px] relative overflow-hidden rounded-2xl shrink-0">
              <Image
                src={resolvedFeaturedImage}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
                width={70}
                height={70}
                priority={priority}
                quality={80}
              />
            </div>
          )}
          <div className="flex flex-col gap-3 flex-1 justify-between min-w-0">
            <div className="flex flex-col justify-between gap-1">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold">{name}</h3>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold rounded-full bg-light-grey w-fit py-1 px-2 my-1">
                    {formatPrice(basePrice)}
                  </p>
                  <ChevronRight className="w-4 h-4 text-foreground/90" />
                </div>
              </div>
              <p className="font-light text-sm text-gray-400 line-clamp-3">{description}</p>
            </div>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <div className="p-4 h-full flex flex-col overflow-y-auto gap-4">
          <div className="flex gap-4">
            {resolvedFeaturedImage && (
              <div className="w-24 h-24 relative overflow-hidden rounded-2xl shrink-0">
                <Image
                  src={resolvedFeaturedImage}
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
                  {formatPrice(displayPrice)}
                </p>
              </div>
              <DrawerDescription className="text-sm text-gray-400 mt-2">
                {description}
              </DrawerDescription>
            </div>
          </div>

          {sizeOptions && sizeOptions.length > 0 && (
            <div className="flex items-center gap-4">
              <h3 className="font-medium">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map((option) => (
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
                      <span className="ml-1">(+{formatPrice(option.priceModifier)})</span>
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
            <span className="text-lg font-bold">{formatPrice(displayPrice)}</span>
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
