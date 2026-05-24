import Image, { StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import type { Media } from '@/payload-types'
import { PriceDisplay } from '../price-display'

interface ProductCardViewProps {
  id: number
  name: string
  description: string
  basePrice: number
  featuredImage?: string | StaticImageData | Media | null
  className?: string
  priority?: boolean
}

export default function ProductCardView({
  name,
  description,
  basePrice,
  featuredImage = null,
  className,
  priority = false,
}: ProductCardViewProps) {
  const resolveFeaturedImage = (
    image: ProductCardViewProps['featuredImage'],
  ): string | StaticImageData | null => {
    if (!image) return null
    if (typeof image === 'string') return image
    if ('src' in image) return image
    return image.url ?? image.thumbnailURL ?? null
  }

  const resolvedFeaturedImage = resolveFeaturedImage(featuredImage)

  return (
    <div
      className={cn(
        'flex group gap-4 items-center justify-center rounded-2xl transition-all duration-300 ease-in-out hover:bg-light-grey cursor-pointer relative',
        className,
      )}
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
                <PriceDisplay amount={basePrice} />
              </p>
              <ChevronRight className="w-4 h-4 text-foreground/90" />
            </div>
          </div>
          <p className="font-light text-sm text-gray-400 line-clamp-3">{description}</p>
        </div>
      </div>
    </div>
  )
}
