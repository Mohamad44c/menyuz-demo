'use client'

import type { Deal } from '@/payload-types'
import DealCard from './deal-card'

interface DealsSectionProps {
  deals: Deal[]
  id?: string
}

export default function DealsSection({ deals, id = 'deals-section' }: DealsSectionProps) {
  if (deals.length === 0) return null

  return (
    <section id={id} className="w-full space-y-6 px-4 xl:px-0 scroll-mt-24">
      <h2 className="text-2xl font-bold text-primary border-b pb-2">Deals</h2>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 container mx-auto">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </section>
  )
}
