import React from 'react'
import './globals.css'

import { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Loader } from 'lucide-react'

import ProductDisplay from '@/components/custom-components/products/product-display'

const payload = await getPayload({ config })

export default async function HomePage() {

  const categories = await payload.find({
    collection: 'categories',
    limit: 0,
  })

  const products = await payload.find({
    collection: 'products',
    limit: 0,
  })

  return (
    <div className="container mx-auto">
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-10">
            <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        }
      >
        <ProductDisplay categories={categories.docs} products={products.docs} />
      </Suspense>
    </div>
  )
}
