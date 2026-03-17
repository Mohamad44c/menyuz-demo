/**
 * Deals seed script — creates sample deals in Payload CMS.
 *
 * Run with:
 *   node --import=tsx/esm scripts/seed-deals.ts
 *
 * Requires existing products and valid DATABASE_URL/PAYLOAD_SECRET in .env.local
 */

import { config as loadEnv } from 'dotenv'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
loadEnv({ path: resolve(__dirname, '../.env.local') })

const { default: config } = await import('../src/payload.config')

type DealSeed = {
  title: string
  description: string
  productNames: string[]
  offerPrice: number
  validForDays: number
}

const deals: DealSeed[] = [
  {
    title: 'Morning Starter Combo',
    description: 'Kick off your day with a classic latte and a buttery croissant at a special combo price.',
    productNames: ['Latte', 'Butter Croissant'],
    offerPrice: 6.99,
    validForDays: 21,
  },
  {
    title: 'Afternoon Break Bundle',
    description: 'A refreshing iced latte paired with our chocolate chip cookie for a quick afternoon pick-me-up.',
    productNames: ['Iced Latte', 'Chocolate Chip Cookie'],
    offerPrice: 6.49,
    validForDays: 14,
  },
  {
    title: 'Brunch Favorites Deal',
    description: 'Enjoy avocado toast with a bright lemonade and save on this light brunch combo.',
    productNames: ['Avocado Toast', 'Lemonade'],
    offerPrice: 9.99,
    validForDays: 30,
  },
]

const getDealWindow = (validForDays: number) => {
  const now = new Date()
  const validFrom = new Date(now)
  validFrom.setDate(now.getDate() - 1)

  const validUntil = new Date(now)
  validUntil.setDate(now.getDate() + validForDays)

  return { validFrom: validFrom.toISOString(), validUntil: validUntil.toISOString() }
}

async function seedDeals() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting deals seed...\n')

  let created = 0
  let skipped = 0

  for (const deal of deals) {
    const existing = await payload.find({
      collection: 'deals',
      where: { title: { equals: deal.title } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  ⏭  Deal already exists: ${deal.title}`)
      skipped++
      continue
    }

    const productsResult = await payload.find({
      collection: 'products',
      where: {
        name: { in: deal.productNames },
      },
      limit: deal.productNames.length,
      depth: 0,
    })

    const productIds = productsResult.docs.map((product) => product.id)
    const foundProductNames = new Set(productsResult.docs.map((product) => product.name))
    const missingProducts = deal.productNames.filter((name) => !foundProductNames.has(name))

    if (missingProducts.length > 0) {
      console.warn(
        `  ⚠️  Skipping "${deal.title}" because products are missing: ${missingProducts.join(', ')}`,
      )
      skipped++
      continue
    }

    const { validFrom, validUntil } = getDealWindow(deal.validForDays)

    await payload.create({
      collection: 'deals',
      data: {
        title: deal.title,
        description: deal.description,
        products: productIds,
        offerPrice: deal.offerPrice,
        validFrom,
        validUntil,
      },
    })

    console.log(`  ✅ Created deal: ${deal.title}`)
    created++
  }

  console.log(`\n🎉 Deals seed complete! Created ${created} deals, skipped ${skipped}.`)
  process.exit(0)
}

seedDeals().catch((err) => {
  console.error('❌ Deals seed failed:', err)
  process.exit(1)
})
