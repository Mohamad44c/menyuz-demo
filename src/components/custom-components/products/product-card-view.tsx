import Image, { StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'
import type { Product, Sauce } from '@/payload-types'
import { ChevronRight, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

function isSauceObject(s: number | Sauce): s is Sauce {
  return typeof s === 'object' && s !== null && 'name' in s
}

interface ProductCardViewProps {
  id: number
  name: string
  description: string
  basePrice: number
  featuredImage?: string | StaticImageData | null
  sauces?: Product['sauces']
  className?: string
  priority?: boolean
}

function formatPrice(price: number) {
  const fixed = price.toFixed(2)
  return fixed.endsWith('.00') ? fixed.slice(0, -3) : fixed
}

export default function ProductCardView({
  name,
  description,
  basePrice,
  featuredImage = null,
  sauces = [],
  className,
  priority = false,
}: ProductCardViewProps) {
  const sauceOptions = sauces?.filter(isSauceObject) ?? []

  return (
    <div
      className={cn(
        'flex group gap-4 items-center justify-center rounded-2xl transition-all duration-300 ease-in-out hover:bg-light-grey cursor-pointer relative',
        className,
      )}
    >
      {featuredImage && (
        <div className="w-[70px] h-[70px] relative overflow-hidden rounded-2xl shrink-0">
          <Image
            src={featuredImage}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-125"
            width={70}
            height={70}
            priority={priority}
            quality={80}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl flex items-center justify-center">
            <Plus
              className="w-5 h-5 text-background drop-shadow-md"
              strokeWidth={2.5}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-3 flex-1 justify-between min-w-0">
        <div className="flex flex-col justify-between gap-1">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold">{name}</h3>
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-bold rounded-full bg-light-grey w-fit py-1 px-2 my-1">
                ${formatPrice(basePrice)}
              </p>
              <ChevronRight className="w-4 h-4 text-foreground/90" />
            </div>
          </div>
          <p className="font-light text-sm text-gray-400 line-clamp-3">{description}</p>
          {sauceOptions.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {sauceOptions.map((sauce) => (
                <Badge
                  key={sauce.id}
                  variant="secondary"
                  className="text-[0.65rem] font-normal py-0 px-1.5"
                >
                  {sauce.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
