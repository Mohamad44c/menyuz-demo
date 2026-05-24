import React from 'react'
import './globals.css'

import { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Loader } from 'lucide-react'
import type { Media } from '@/payload-types'
import { DEFAULTS } from '@/lib/defaults'
import { getVersionedMediaUrl } from '@/lib/media'

import ProductDisplayClient from '@/components/custom-components/products/product-display-client'
import ProductDisplayShell from '@/components/custom-components/products/product-display-shell'
import { BusinessProfileAccordion } from '@/components/custom-components/BusinessProfileSection'
import type { BusinessSocial } from '@/components/custom-components/BusinessProfileSection'

export const revalidate = 60

const payload = await getPayload({ config })

export default async function HomePage() {
  const [categoriesResult, productsResult, dealsResult, settingsResult] = await Promise.all([
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
    payload.find({ collection: 'settings', limit: 1 }),
  ])

  const categories = categoriesResult.docs
  const products = productsResult.docs
  const settings = settingsResult.docs[0] ?? null

  const showDeals = settings?.showDealsSection !== false
  const deals = showDeals ? dealsResult.docs : []

  // ── Business profile data ─────────────────────────────────────────────────
  const logo = settings?.logo as Media | undefined
  const logoUrl = getVersionedMediaUrl(logo) ?? undefined

  const socials: BusinessSocial[] = []
  if (settings?.instagramUrl) socials.push({ platform: 'instagram', href: settings.instagramUrl })
  if (settings?.deliveryNumber)
    socials.push({ platform: 'whatsapp', href: `https://wa.me/${settings.deliveryNumber}` })
  if (settings?.facebookUrl) socials.push({ platform: 'facebook', href: settings.facebookUrl })

  return (
    <>
      {/* Edge-to-edge business profile header */}
      <BusinessProfileAccordion
        name={settings?.restaurantName ?? DEFAULTS.restaurantName}
        category={settings?.tagline ?? DEFAULTS.tagline}
        phone={settings?.deliveryNumber ? `+${settings.deliveryNumber}` : undefined}
        email={undefined}
        address={settings?.locationTitle ?? undefined}
        locationHref={settings?.locationUrl ?? undefined}
        logoSrc={logoUrl}
        isVerified
        socials={socials}
      />

      {/* Menu catalog */}
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
    </>
  )
}
