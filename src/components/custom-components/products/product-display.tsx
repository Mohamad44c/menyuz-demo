'use client'

import { useState, useMemo, useCallback } from 'react'
import CategoryContainer from '../categories/category-container'
import ProductListContainer from './product-list-container'
import DealsSection from '../deals/deals-section'
import { Category, Deal, Product } from '@/payload-types'
import CartGlance from '../cart/cart-glance'

const DEALS_CATEGORY_ID = -1

interface ProductDisplayProps {
  categories: Category[]
  products: Product[]
  deals: Deal[]
}

export default function ProductDisplay({ categories, products, deals }: ProductDisplayProps) {
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

  // Group products by category, sorted with featured first
  const groupedProducts = useMemo(() => {
    const getCategoryById = (categoryId: number) =>
      categories.find((category) => category.id === categoryId)

    const sortByFeatured = (items: Product[]) =>
      [...items].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))

    // If Deals is selected, no product groups (Deals section handles display)
    if (selectedCategory === DEALS_CATEGORY_ID) {
      return []
    }

    // If a specific category is selected, only show products from that category
    if (selectedCategory !== 0) {
      const categoryProducts = products.filter(
        (product) => getProductCategoryId(product) === selectedCategory,
      )
      const category = getCategoryById(selectedCategory)
      return category
        ? [{ category, products: sortByFeatured(categoryProducts) }]
        : []
    }

    // For "All" category, group products by their categories
    const groups: { category: Category; products: Product[] }[] = []

    sortedCategories.forEach((category) => {
      const categoryProducts = products.filter(
        (product) => getProductCategoryId(product) === category.id,
      )
      if (categoryProducts.length > 0) {
        groups.push({ category, products: sortByFeatured(categoryProducts) })
      }
    })

    return groups
  }, [products, categories, selectedCategory, sortedCategories])

  const handleSelectCategory = useCallback((categoryId: number) => {
    setSelectedCategory(categoryId)
    if (categoryId === DEALS_CATEGORY_ID) {
      document.getElementById('deals-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [])

  const showDealsSection =
    deals.length > 0 && (selectedCategory === 0 || selectedCategory === DEALS_CATEGORY_ID)
  const showProductSections = selectedCategory !== DEALS_CATEGORY_ID

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <CategoryContainer
        categories={categories}
        hasDeals={deals.length > 0}
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />

      <div className="mt-8 space-y-12 w-full">
        {showDealsSection && <DealsSection deals={deals} id="deals-section" />}

        {showProductSections && (
          <>
            {groupedProducts.map((group) => (
              <div key={group.category.id} className="space-y-6 px-4 xl:px-0">
                <h2 className="text-2xl font-bold text-primary border-b pb-2">
                  {group.category.name}
                </h2>

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
          </>
        )}
      </div>
      <CartGlance />
    </div>
  )
}
