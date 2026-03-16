/**
 * Cafe seed script — creates categories and products in Payload CMS.
 *
 * Run with:
 *   node --import=tsx/esm scripts/seed.ts
 *
 * Requires a valid DATABASE_URL and PAYLOAD_SECRET in .env.local
 */

import { config as loadEnv } from 'dotenv'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'

// Load .env.local BEFORE the Payload config module is evaluated.
// Static imports are hoisted in ESM, so we dynamic-import the config
// after env vars are already in process.env.
const __dirname = fileURLToPath(new URL('.', import.meta.url))
loadEnv({ path: resolve(__dirname, '../.env.local') })

const { default: config } = await import('../src/payload.config.ts')

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const categories = [
  { name: 'Coffee', icon: '☕' },
  { name: 'Cold Drinks', icon: '🥤' },
  { name: 'Pastries', icon: '🥐' },
  { name: 'Cookies & Sweets', icon: '🍪' },
  { name: 'Sandwiches', icon: '🥪' },
] as const

type ProductSeed = {
  name: string
  description: string
  basePrice: number
  isAvailable: boolean
  isFeatured?: boolean
  sizeOptions?: { sizeName: string; priceModifier: number; description?: string }[]
  addOns?: { name: string; price: number; maxSelection?: number }[]
}

const productsByCategory: Record<string, ProductSeed[]> = {
  Coffee: [
    {
      name: 'Espresso',
      description: 'A rich, concentrated shot of coffee with a velvety crema. The foundation of all great espresso drinks.',
      basePrice: 2.5,
      isAvailable: true,
      isFeatured: false,
    },
    {
      name: 'Americano',
      description: 'Espresso shots topped with hot water for a smooth, full-bodied cup. Customize your strength.',
      basePrice: 3.0,
      isAvailable: true,
      isFeatured: false,
      sizeOptions: [
        { sizeName: 'Small', priceModifier: 0, description: '8 oz' },
        { sizeName: 'Medium', priceModifier: 0.5, description: '12 oz' },
        { sizeName: 'Large', priceModifier: 1.0, description: '16 oz' },
      ],
      addOns: [
        { name: 'Extra Shot', price: 0.75, maxSelection: 3 },
      ],
    },
    {
      name: 'Latte',
      description: 'Silky steamed milk poured over a double espresso shot. Creamy, smooth, and endlessly customizable.',
      basePrice: 4.5,
      isAvailable: true,
      isFeatured: true,
      sizeOptions: [
        { sizeName: 'Small', priceModifier: 0, description: '8 oz' },
        { sizeName: 'Medium', priceModifier: 0.5, description: '12 oz' },
        { sizeName: 'Large', priceModifier: 1.0, description: '16 oz' },
      ],
      addOns: [
        { name: 'Oat Milk', price: 0.6, maxSelection: 1 },
        { name: 'Almond Milk', price: 0.6, maxSelection: 1 },
        { name: 'Extra Shot', price: 0.75, maxSelection: 2 },
        { name: 'Vanilla Syrup', price: 0.5, maxSelection: 1 },
        { name: 'Caramel Syrup', price: 0.5, maxSelection: 1 },
      ],
    },
    {
      name: 'Cappuccino',
      description: 'Equal parts espresso, steamed milk, and thick microfoam. A classic Italian coffeehouse staple.',
      basePrice: 4.0,
      isAvailable: true,
      isFeatured: false,
      sizeOptions: [
        { sizeName: 'Small', priceModifier: 0, description: '6 oz' },
        { sizeName: 'Medium', priceModifier: 0.5, description: '8 oz' },
      ],
      addOns: [
        { name: 'Oat Milk', price: 0.6, maxSelection: 1 },
        { name: 'Extra Shot', price: 0.75, maxSelection: 1 },
      ],
    },
    {
      name: 'Flat White',
      description: 'A double ristretto with velvety microfoam milk. Stronger than a latte, silkier than a cappuccino.',
      basePrice: 4.5,
      isAvailable: true,
      isFeatured: false,
      addOns: [
        { name: 'Oat Milk', price: 0.6, maxSelection: 1 },
        { name: 'Almond Milk', price: 0.6, maxSelection: 1 },
      ],
    },
    {
      name: 'Macchiato',
      description: 'Espresso "stained" with a dollop of steamed milk foam. Bold and beautifully layered.',
      basePrice: 3.5,
      isAvailable: true,
      isFeatured: false,
    },
    {
      name: 'Pour Over',
      description: 'Single-origin beans brewed to order. A clean, nuanced cup that highlights the bean\'s natural character.',
      basePrice: 5.0,
      isAvailable: true,
      isFeatured: false,
      sizeOptions: [
        { sizeName: 'Single (8 oz)', priceModifier: 0 },
        { sizeName: 'Double (12 oz)', priceModifier: 1.5 },
      ],
    },
  ],

  'Cold Drinks': [
    {
      name: 'Iced Latte',
      description: 'Chilled espresso over ice topped with cold milk. A refreshing take on the classic latte.',
      basePrice: 5.0,
      isAvailable: true,
      isFeatured: true,
      sizeOptions: [
        { sizeName: 'Medium', priceModifier: 0, description: '12 oz' },
        { sizeName: 'Large', priceModifier: 1.0, description: '16 oz' },
      ],
      addOns: [
        { name: 'Oat Milk', price: 0.6, maxSelection: 1 },
        { name: 'Vanilla Syrup', price: 0.5, maxSelection: 1 },
        { name: 'Caramel Drizzle', price: 0.5, maxSelection: 1 },
        { name: 'Extra Shot', price: 0.75, maxSelection: 2 },
      ],
    },
    {
      name: 'Cold Brew',
      description: 'Steeped for 18 hours for an ultra-smooth, low-acid coffee. Served over ice for maximum refreshment.',
      basePrice: 4.5,
      isAvailable: true,
      isFeatured: false,
      sizeOptions: [
        { sizeName: 'Medium', priceModifier: 0, description: '12 oz' },
        { sizeName: 'Large', priceModifier: 1.0, description: '16 oz' },
      ],
      addOns: [
        { name: 'Sweet Cream', price: 0.75, maxSelection: 1 },
        { name: 'Vanilla Syrup', price: 0.5, maxSelection: 1 },
      ],
    },
    {
      name: 'Iced Matcha Latte',
      description: 'Ceremonial-grade Japanese matcha whisked with oat milk over ice. Earthy, vibrant, and energizing.',
      basePrice: 5.5,
      isAvailable: true,
      isFeatured: true,
      sizeOptions: [
        { sizeName: 'Medium', priceModifier: 0, description: '12 oz' },
        { sizeName: 'Large', priceModifier: 1.0, description: '16 oz' },
      ],
      addOns: [
        { name: 'Oat Milk', price: 0.6, maxSelection: 1 },
        { name: 'Honey', price: 0.5, maxSelection: 1 },
        { name: 'Extra Matcha', price: 1.0, maxSelection: 1 },
      ],
    },
    {
      name: 'Lemonade',
      description: 'Freshly squeezed lemon juice with a hint of cane sugar. Tart, bright, and perfectly balanced.',
      basePrice: 3.5,
      isAvailable: true,
      isFeatured: false,
      sizeOptions: [
        { sizeName: 'Medium', priceModifier: 0 },
        { sizeName: 'Large', priceModifier: 0.75 },
      ],
      addOns: [
        { name: 'Mint', price: 0.25, maxSelection: 1 },
        { name: 'Strawberry Syrup', price: 0.5, maxSelection: 1 },
      ],
    },
    {
      name: 'Sparkling Water',
      description: 'Chilled San Pellegrino sparkling mineral water. The perfect palate cleanser.',
      basePrice: 2.5,
      isAvailable: true,
      isFeatured: false,
    },
  ],

  Pastries: [
    {
      name: 'Butter Croissant',
      description: 'Layers upon layers of buttery, flaky pastry baked to a golden crisp. A café essential.',
      basePrice: 3.5,
      isAvailable: true,
      isFeatured: true,
      addOns: [
        { name: 'Butter', price: 0.25, maxSelection: 1 },
        { name: 'Jam', price: 0.5, maxSelection: 1 },
      ],
    },
    {
      name: 'Almond Croissant',
      description: 'Classic croissant filled and topped with rich almond cream and toasted sliced almonds.',
      basePrice: 4.5,
      isAvailable: true,
      isFeatured: false,
    },
    {
      name: 'Blueberry Muffin',
      description: 'Bursting with fresh blueberries and topped with a crunchy sugar crust. Baked fresh each morning.',
      basePrice: 3.0,
      isAvailable: true,
      isFeatured: false,
    },
    {
      name: 'Banana Bread',
      description: 'Moist, spiced banana loaf made with ripe bananas and a touch of cinnamon. Comfort in every slice.',
      basePrice: 4.0,
      isAvailable: true,
      isFeatured: false,
      addOns: [
        { name: 'Cream Cheese', price: 0.75, maxSelection: 1 },
        { name: 'Butter', price: 0.25, maxSelection: 1 },
      ],
    },
    {
      name: 'Cinnamon Roll',
      description: 'Soft, pillowy dough swirled with cinnamon sugar and finished with vanilla cream cheese frosting.',
      basePrice: 4.5,
      isAvailable: true,
      isFeatured: true,
    },
    {
      name: 'Pain au Chocolat',
      description: 'Buttery, laminated pastry wrapped around two batons of dark chocolate. A French bakery classic.',
      basePrice: 4.0,
      isAvailable: true,
      isFeatured: false,
    },
  ],

  'Cookies & Sweets': [
    {
      name: 'Chocolate Chip Cookie',
      description: 'Chewy center, crispy edges, loaded with semi-sweet chocolate chips. Our most popular treat.',
      basePrice: 2.5,
      isAvailable: true,
      isFeatured: true,
    },
    {
      name: 'Double Chocolate Cookie',
      description: 'Rich dark cocoa dough studded with white and dark chocolate chunks. For the true chocolate lover.',
      basePrice: 3.0,
      isAvailable: true,
      isFeatured: false,
    },
    {
      name: 'Oat & Raisin Cookie',
      description: 'Hearty oats, plump raisins, and a hint of cinnamon. Soft-baked and satisfying.',
      basePrice: 2.5,
      isAvailable: true,
      isFeatured: false,
    },
    {
      name: 'Snickerdoodle',
      description: 'Soft and pillowy cookies rolled in cinnamon sugar. Nostalgic, warm, and completely irresistible.',
      basePrice: 2.5,
      isAvailable: true,
      isFeatured: false,
    },
    {
      name: 'Brownie',
      description: 'Dense, fudgy dark chocolate brownie with a shiny crackle top. A small square of pure indulgence.',
      basePrice: 3.5,
      isAvailable: true,
      isFeatured: true,
      addOns: [
        { name: 'Vanilla Ice Cream Scoop', price: 2.0, maxSelection: 1 },
      ],
    },
  ],

  Sandwiches: [
    {
      name: 'Avocado Toast',
      description: 'Sourdough toast topped with smashed avocado, cherry tomatoes, chili flakes, and a drizzle of olive oil.',
      basePrice: 7.5,
      isAvailable: true,
      isFeatured: true,
      addOns: [
        { name: 'Poached Egg', price: 1.5, maxSelection: 2 },
        { name: 'Feta Crumble', price: 1.0, maxSelection: 1 },
        { name: 'Smoked Salmon', price: 2.5, maxSelection: 1 },
      ],
    },
    {
      name: 'BLT Sandwich',
      description: 'Crispy bacon, iceberg lettuce, and ripe tomato on toasted sourdough with house aioli.',
      basePrice: 8.5,
      isAvailable: true,
      isFeatured: false,
      addOns: [
        { name: 'Extra Bacon', price: 1.5, maxSelection: 1 },
        { name: 'Avocado', price: 1.5, maxSelection: 1 },
        { name: 'Cheddar Cheese', price: 1.0, maxSelection: 1 },
      ],
    },
    {
      name: 'Caprese Panini',
      description: 'Fresh mozzarella, sun-dried tomatoes, and basil pesto pressed between ciabatta. Warm and gooey.',
      basePrice: 8.5,
      isAvailable: true,
      isFeatured: false,
    },
    {
      name: 'Tuna Melt',
      description: 'House-seasoned albacore tuna with cheddar, melted and toasted on thick-cut sourdough.',
      basePrice: 8.0,
      isAvailable: true,
      isFeatured: false,
    },
    {
      name: 'Turkey & Brie',
      description: 'Sliced turkey breast with creamy brie, cranberry spread, and arugula on a toasted baguette.',
      basePrice: 9.5,
      isAvailable: true,
      isFeatured: true,
    },
  ],
}

// ---------------------------------------------------------------------------
// Seed logic
// ---------------------------------------------------------------------------

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting café seed...\n')

  // Create categories
  const categoryMap = new Map<string, number>()

  for (const cat of categories) {
    const existing = await payload.find({
      collection: 'categories',
      where: { name: { equals: cat.name } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  ⏭  Category already exists: ${cat.name}`)
      categoryMap.set(cat.name, existing.docs[0].id)
      continue
    }

    const created = await payload.create({
      collection: 'categories',
      data: { name: cat.name, icon: cat.icon },
    })

    categoryMap.set(cat.name, created.id)
    console.log(`  ✅ Created category: ${cat.icon} ${cat.name}`)
  }

  console.log()

  // Create products
  let created = 0
  let skipped = 0

  for (const [categoryName, products] of Object.entries(productsByCategory)) {
    const categoryId = categoryMap.get(categoryName)

    if (!categoryId) {
      console.warn(`  ⚠️  No category ID found for "${categoryName}", skipping products.`)
      continue
    }

    console.log(`📦 Seeding products for: ${categoryName}`)

    for (const product of products) {
      const existing = await payload.find({
        collection: 'products',
        where: { name: { equals: product.name } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  ⏭  Already exists: ${product.name}`)
        skipped++
        continue
      }

      await payload.create({
        collection: 'products',
        data: {
          name: product.name,
          description: product.description,
          basePrice: product.basePrice,
          category: categoryId,
          isAvailable: product.isAvailable,
          isFeatured: product.isFeatured ?? false,
          sizeOptions: product.sizeOptions ?? [],
          addOns: product.addOns ?? [],
        },
      })

      console.log(`  ✅ Created: ${product.name} — $${product.basePrice}`)
      created++
    }

    console.log()
  }

  console.log(`\n🎉 Seed complete! Created ${created} products, skipped ${skipped} existing.`)
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
