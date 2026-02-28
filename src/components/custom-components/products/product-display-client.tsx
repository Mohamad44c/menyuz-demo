'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import CategoryContainer from '../categories/category-container'
import type { Category, Deal } from '@/payload-types'

const CartGlance = dynamic(() => import('../cart/cart-glance'), { ssr: false })

const DEALS_CATEGORY_ID = -1

interface ProductDisplayClientProps {
  children: React.ReactNode
  categories: Category[]
  deals: Deal[]
}

export default function ProductDisplayClient({
  children,
  categories,
  deals,
}: ProductDisplayClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const groups = document.querySelectorAll('[data-category-id]')
    groups.forEach((group) => {
      const catId = group.getAttribute('data-category-id')
      const catIdNum = catId === String(DEALS_CATEGORY_ID) ? DEALS_CATEGORY_ID : Number(catId)
      const show = selectedCategory === 0 || selectedCategory === catIdNum
      ;(group as HTMLElement).style.display = show ? '' : 'none'
    })
  }, [selectedCategory, mounted])

  const handleSelectCategory = useCallback((categoryId: number) => {
    setSelectedCategory(categoryId)
    if (categoryId === DEALS_CATEGORY_ID) {
      document.getElementById('deals-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [])

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <CategoryContainer
        categories={categories}
        hasDeals={deals.length > 0}
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />

      <div className="mt-8 space-y-12 w-full">
        {children}
      </div>

      <CartGlance />
    </div>
  )
}
