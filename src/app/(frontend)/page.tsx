import React from 'react'
import './globals.css'

import { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Loader } from 'lucide-react'

import ProductDisplayClient from '@/components/custom-components/products/product-display-client'
import ProductDisplayShell from '@/components/custom-components/products/product-display-shell'

const payload = await getPayload({ config })

export default async function HomePage() {
  const [categoriesResult, productsResult, dealsResult] = await Promise.all([
    payload.find({ collection: 'categories', limit: 50 }),
    payload.find({
      collection: 'products',
      where: { isAvailable: { equals: true } },
      limit: 0,
      depth: 2,
    }),
    payload.find({
      collection: 'deals',
      where: { isActive: { equals: true } },
      limit: 0,
      depth: 2,
    }),
  ])

  const categories = categoriesResult.docs
  const products = productsResult.docs
  const deals = dealsResult.docs

  return (
    <div className="container mx-auto">
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-10">
            <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        }
      >
        <ProductDisplayClient categories={categories} deals={deals}>
          <ProductDisplayShell
            categories={categories}
            products={products}
            deals={deals}
          />
        </ProductDisplayClient>
      </Suspense>
    </div>
  )
}
