'use client'

import type { ReactNode } from 'react'
import ProductCard from './product-card'
import { Media, Product } from '@/payload-types'
import { getVersionedMediaUrl } from '@/lib/media'

interface ProductListProps {
  products: Product[]
  onProductClick?: (productId: number) => void
  emptyState?: ReactNode
  isLoading?: boolean
  priorityOffset?: number
}

export default function ProductListContainer({
  products,
  onProductClick,
  emptyState,
  isLoading = false,
  priorityOffset = 0,
}: ProductListProps) {
  // Handle loading state
  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-gray-100 rounded-lg h-72 animate-pulse" />
        ))}
      </div>
    )
  }

  // Handle empty state
  if (products.length === 0) {
    return (
      <div className="w-full py-12 flex justify-center items-center">
        {emptyState || (
          <p className="text-gray-500 text-center">No products available in this category.</p>
        )}
      </div>
    )
  }

  // Render product grid - only first 6 above-the-fold images get priority
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 container mt-7 mb-10 mx-auto">
      {products.map((product, index) => {
        const image = product.featuredImage as Media | undefined
        const imageUrl = getVersionedMediaUrl(image)
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description || ''}
            basePrice={product.basePrice}
            featuredImage={imageUrl || undefined}
            sizeOptions={product.sizeOptions ?? undefined}
            onClick={onProductClick}
            priority={index + priorityOffset < 6}
          />
        )
      })}
    </div>
  )
}
