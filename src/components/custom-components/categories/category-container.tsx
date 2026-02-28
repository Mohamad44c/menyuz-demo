'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import type { Category } from '@/payload-types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DEALS_CATEGORY_ID = -1

interface CategoryContainerProps {
  categories: Category[]
  hasDeals?: boolean
  onSelectCategory?: (categoryId: number) => void
  initialCategory?: number
  selectedCategory?: number
}

export default function CategoryContainer({
  categories,
  hasDeals = false,
  onSelectCategory,
  initialCategory = 0,
  selectedCategory: controlledSelectedCategory,
}: CategoryContainerProps) {
  // Sort categories by order (Payload orderable uses _order field with fractional indexing)
  const sortedCategories = [...categories].sort((a, b) => {
    const orderA = a._order ?? ''
    const orderB = b._order ?? ''
    if (!orderA && !orderB) return a.id - b.id
    if (!orderA) return 1
    if (!orderB) return -1
    return orderA.localeCompare(orderB)
  })

  const [activeCategory, setActiveCategory] = useState<number>(initialCategory)
  const activeCategoryValue =
    controlledSelectedCategory !== undefined ? controlledSelectedCategory : activeCategory
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const handleCategoryClick = (categoryId: number) => {
    setActiveCategory(categoryId)
    if (onSelectCategory) {
      onSelectCategory(categoryId)
    }

    if (categoryId === DEALS_CATEGORY_ID) {
      document.getElementById('deals-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    } else {
      const selectedButton = document.getElementById(`category-${categoryId}`)
      if (selectedButton) {
        selectedButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      }
    }
  }

  // Initialize the component with the right active category
  useEffect(() => {
    // If initialCategory is provided, use it; otherwise use "All" (0)
    const categoryToActivate = initialCategory ?? 0
    setActiveCategory(categoryToActivate)

    if (onSelectCategory) {
      onSelectCategory(categoryToActivate)
    }
  }, [initialCategory, onSelectCategory])

  // Check scroll position to show/hide navigation arrows
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
    }

    checkScroll()
    scrollContainer.addEventListener('scroll', checkScroll)

    // Check on resize too
    window.addEventListener('resize', checkScroll)

    return () => {
      scrollContainer.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      })
    }
  }

  // Handle the "All" button click to reset active category
  const handleAllClick = () => {
    setActiveCategory(0)
    if (onSelectCategory) {
      onSelectCategory(0) // This could represent showing all categories
    }
  }

  return (
    <div className="w-full sticky top-0 left-0 z-50 bg-background">
      <div className="w-full container mx-auto px-2 sm:px-4 xl:px-0">
        <div className="relative flex items-center gap-2">
          {/* Left arrow - only when user has scrolled right */}
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="shrink-0 z-10 bg-background border border-border rounded-sm shadow-sm p-1.5 hover:bg-muted transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-primary" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex-1 min-w-0 flex overflow-x-auto py-3 scrollbar-hide snap-x snap-mandatory scroll-smooth gap-2 sm:gap-4 justify-start sm:justify-center"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
          <button
            onClick={handleAllClick}
            id="category-0"
            className={cn(
              'whitespace-nowrap px-4 py-2 rounded-sm text-sm font-medium transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
              activeCategoryValue === 0
                ? 'bg-primary text-primary-foreground'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            )}
          >
            All
          </button>
          {hasDeals && (
            <button
              id={`category-${DEALS_CATEGORY_ID}`}
              onClick={() => handleCategoryClick(DEALS_CATEGORY_ID)}
              className={cn(
                'snap-center whitespace-nowrap px-3 py-1.5 sm:px-4 sm:py-2 rounded-sm text-base sm:text-sm font-medium transition-colors shrink-0',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
                activeCategoryValue === DEALS_CATEGORY_ID
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              )}
            >
              Deals
            </button>
          )}
          {sortedCategories.map((category) => (
            <button
              key={category.id}
              id={`category-${category.id}`}
              onClick={() => handleCategoryClick(category.id)}
              className={cn(
                'snap-center whitespace-nowrap px-3 py-1.5 sm:px-4 sm:py-2 rounded-sm text-base sm:text-sm font-medium transition-colors shrink-0',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
                activeCategoryValue === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              )}
            >
              {category.name}
            </button>
          ))}
          </div>

          {/* Right arrow - only when there is more content to scroll */}
          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="shrink-0 z-10 bg-background border border-border rounded-sm shadow-sm p-1.5 hover:bg-muted transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-primary" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
