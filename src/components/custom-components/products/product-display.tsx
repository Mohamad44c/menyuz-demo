'use client'

import { useState, useMemo, useCallback } from 'react'
import CategoryContainer from '../categories/category-container'
import ProductListContainer from './product-list-container'
import { Category, Product } from '@/payload-types'
import CartGlance from '../cart/cart-glance'

interface ProductDisplayProps {
  categories: Category[]
  products: Product[]
}

export default function ProductDisplay({ categories, products }: ProductDisplayProps) {
  const [selectedCategory, setSelectedCategory] = useState<number>(0) // 0 represents "All"

  // Sort categories by order (Payload orderable uses _order field)
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      const orderA = a._order ?? ''
      const orderB = b._order ?? ''
      if (!orderA && !orderB) return a.id - b.id
      if (!orderA) return 1
      if (!orderB) return -1
      return orderA.localeCompare(orderB)
    })
  }, [categories])

  // Get category ID from product
  const getProductCategoryId = (product: Product) => {
    return typeof product.category === 'number' ? product.category : product.category.id
  }

  // Group products by category
  const groupedProducts = useMemo(() => {
    const getCategoryById = (categoryId: number) =>
      categories.find((category) => category.id === categoryId)
    // If a specific category is selected, only show products from that category
    if (selectedCategory !== 0) {
      const categoryProducts = products.filter(
        (product) => getProductCategoryId(product) === selectedCategory,
      )

      const category = getCategoryById(selectedCategory)

      return category ? [{ category, products: categoryProducts }] : []
    }

    // For "All" category, group products by their categories
    const groups: { category: Category; products: Product[] }[] = []

    // Process each category in order
    sortedCategories.forEach((category) => {
      const categoryProducts = products.filter(
        (product) => getProductCategoryId(product) === category.id,
      )

      // Only add groups with products
      if (categoryProducts.length > 0) {
        groups.push({ category, products: categoryProducts })
      }
    })

    return groups
  }, [products, categories, selectedCategory, sortedCategories])

  const handleSelectCategory = useCallback((categoryId: number) => {
    setSelectedCategory(categoryId)
  }, [])

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <CategoryContainer
        categories={categories}
        onSelectCategory={handleSelectCategory}
      />

      <div className="mt-8 space-y-12">
        {groupedProducts.map((group) => (
          <div key={group.category.id} className="space-y-6 px-4 xl:px-0">
            <h2 className="text-2xl font-bold text-primary border-b pb-2">{group.category.name}</h2>

            <ProductListContainer
              products={group.products}
              onProductClick={(_productId) => {
                // Handle product selection if needed
              }}
            />
          </div>
        ))}

        {groupedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>
      <CartGlance />
    </div>
  )
}
