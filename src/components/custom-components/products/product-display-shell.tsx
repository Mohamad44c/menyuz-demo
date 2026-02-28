import type { Category, Deal, Product } from '@/payload-types'
import ProductCardView from './product-card-view'
import ProductCardWrapper from './product-card-wrapper'
import DealsSection from '../deals/deals-section'
import type { Media } from '@/payload-types'

const DEALS_CATEGORY_ID = -1

function getProductCategoryId(product: Product) {
  return typeof product.category === 'number' ? product.category : product.category.id
}

interface ProductDisplayShellProps {
  categories: Category[]
  products: Product[]
  deals: Deal[]
}

export default function ProductDisplayShell({
  categories,
  products,
  deals,
}: ProductDisplayShellProps) {
  const sortedCategories = [...categories].sort((a, b) => {
    const orderA = a._order ?? ''
    const orderB = b._order ?? ''
    if (!orderA && !orderB) return a.id - b.id
    if (!orderA) return 1
    if (!orderB) return -1
    return orderA.localeCompare(orderB)
  })

  const groupedProducts: { category: Category; products: Product[] }[] = []
  sortedCategories.forEach((category) => {
    const categoryProducts = products.filter(
      (product) => getProductCategoryId(product) === category.id,
    )
    if (categoryProducts.length > 0) {
      const sorted = [...categoryProducts].sort((a, b) =>
        (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0),
      )
      groupedProducts.push({ category, products: sorted })
    }
  })

  let priorityOffset = 0

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="mt-8 space-y-12 w-full">
        {deals.length > 0 && (
          <div data-category-id={DEALS_CATEGORY_ID}>
            <DealsSection deals={deals} id="deals-section" />
          </div>
        )}

        {groupedProducts.map((group) => {
          const offset = priorityOffset
          priorityOffset += group.products.length
          return (
            <div
              key={group.category.id}
              data-category-id={group.category.id}
              className="space-y-6 px-4 xl:px-0"
            >
              <h2 className="text-2xl font-bold text-primary border-b pb-2">
                {group.category.name}
              </h2>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 container mt-7 mb-10 mx-auto">
                {group.products.map((product, index) => {
                  const image = product.featuredImage as Media | undefined
                  const imageUrl = image?.thumbnailURL || image?.url || null
                  const priority = index + offset < 6
                  return (
                    <ProductCardWrapper
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      description={product.description || ''}
                      basePrice={product.basePrice}
                      featuredImage={imageUrl || undefined}
                      sizeOptions={product.sizeOptions ?? undefined}
                      sauces={product.sauces ?? undefined}
                    >
                      <ProductCardView
                        id={product.id}
                        name={product.name}
                        description={product.description || ''}
                        basePrice={product.basePrice}
                        featuredImage={imageUrl || undefined}
                        sauces={product.sauces ?? undefined}
                        priority={priority}
                      />
                    </ProductCardWrapper>
                  )
                })}
              </div>
            </div>
          )
        })}

        {groupedProducts.length === 0 && deals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
