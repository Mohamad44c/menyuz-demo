'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Deal, Media, Product } from '@/payload-types'
import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/button'
import { useSettings } from '@/providers/settings-provider'
import { DEFAULTS } from '@/lib/defaults'

function isProductObject(p: number | Product): p is Product {
  return typeof p === 'object' && p !== null && 'name' in p
}

interface DealCardProps {
  deal: Deal
  className?: string
}

export default function DealCard({ deal, className }: DealCardProps) {
  const addToCart = useCartStore((state) => state.addToCart)
  const settings = useSettings()
  const currencySymbol = settings?.currencySymbol ?? DEFAULTS.currencySymbol

  const image = deal.featuredImage as Media | undefined
  const imageUrl = image?.thumbnailURL || image?.url || null

  const productNames = (deal.products ?? [])
    .filter(isProductObject)
    .map((p) => p.name)
    .join(', ')

  const handleAddToCart = () => {
    const cartItem = {
      id: `deal-${deal.id}`,
      name: deal.title,
      basePrice: deal.offerPrice,
      description: deal.description ?? undefined,
      featuredImage: imageUrl ?? '',
    }

    // @ts-expect-error - deal item has minimal Product-like shape for cart
    addToCart(cartItem, 1)
  }

  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl border border-gray-200 bg-background overflow-hidden transition-shadow hover:shadow-md',
        className,
      )}
    >
      <div className="flex gap-4 p-4">
        {imageUrl ? (
          <div className="w-24 h-24 relative overflow-hidden rounded-xl shrink-0">
            <Image
              src={imageUrl}
              alt={deal.title}
              className="w-full h-full object-cover"
              width={96}
              height={96}
              sizes="100px"
            />
          </div>
        ) : (
          <div className="w-24 h-24 shrink-0 rounded-xl bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-2xl font-medium">{deal.title.charAt(0)}</span>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base">{deal.title}</h3>
          {deal.description && (
            <p className="text-sm text-gray-500 line-clamp-2 mt-0.5">{deal.description}</p>
          )}
          {productNames && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">{productNames}</p>
          )}

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {deal.originalTotalPrice != null && deal.originalTotalPrice > deal.offerPrice && (
              <span className="text-sm text-gray-500 line-through">
                {currencySymbol}{deal.originalTotalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-primary">{currencySymbol}{deal.offerPrice.toFixed(2)}</span>
            {deal.discountPercentage != null && deal.discountPercentage > 0 && (
              <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {Math.round(deal.discountPercentage)}% OFF
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          aria-label={`Add ${deal.title} to cart`}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
