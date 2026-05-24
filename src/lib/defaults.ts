/**
 * Fallback values used when the Settings document hasn't been created yet,
 * and as pre-filled defaultValue entries in the Payload admin form.
 *
 * Shadcn "zinc/neutral" primary colors:
 *   Light — near-black button, near-white text
 *   Dark  — near-white button, near-black text
 */
export const DEFAULTS = {
  restaurantName: 'Cafe Beirut',
  tagline: 'A taste of Lebanon',
  description: 'Authentic Lebanese cuisine crafted with fresh ingredients and traditional recipes. Dine in, takeaway, or order for delivery.',
  currencySymbol: '$',
  currencyLabel: 'USD',
  currencyPosition: 'before' as 'before' | 'after',
  secondaryCurrencyEnabled: false,
  secondaryCurrencySymbol: '',
  secondaryCurrencyLabel: '',
  secondaryCurrencyPosition: 'after' as 'before' | 'after',
  secondaryCurrencyConversionRate: 1,
  deliveryNumber: 96178830254,
  locationTitle: 'Beirut, Lebanon',
  locationUrl: 'https://maps.google.com/?q=Beirut,Lebanon',
  tiktokUrl: 'https://tiktok.com/',
  facebookUrl: 'https://facebook.com/',
  instagramUrl: 'https://instagram.com/',
  // Shadcn neutral defaults — kept in sync with globals.css :root / .dark
  primaryColor: 'oklch(0.205 0 0)',
  primaryForegroundColor: 'oklch(0.985 0 0)',
  primaryColorDark: 'oklch(0.922 0 0)',
  primaryForegroundColorDark: 'oklch(0.205 0 0)',
} as const
