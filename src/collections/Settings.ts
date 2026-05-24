import type { CollectionConfig } from 'payload'
import { DEFAULTS } from '@/lib/defaults'
import { revalidateFrontendAfterChange } from '@/hooks/revalidate-frontend'

const Settings: CollectionConfig = {
  slug: 'settings',
  admin: {
    description: 'Global settings for the app',
    group: 'Settings & Users',
  },
  access: {
    read: () => true,
    update: () => true,
    create: async ({ req }) => {
      const { totalDocs } = await req.payload.count({
        collection: 'settings',
        overrideAccess: true,
      })
      return totalDocs === 0
    },
    delete: () => false,
  },
  fields: [
    // ─── Branding ───────────────────────────────────────────────────────────
    {
      type: 'row',
      fields: [
        {
          name: 'restaurantName',
          label: 'Restaurant / Cafe Name',
          type: 'text',
          required: true,
          defaultValue: DEFAULTS.restaurantName,
          admin: {
            description: 'Displayed in the navbar, footer, and browser tab title.',
            width: '50%',
          },
        },
        {
          name: 'tagline',
          label: 'Tagline',
          type: 'text',
          defaultValue: DEFAULTS.tagline,
          admin: {
            description: 'Short slogan shown in the footer (e.g. "Best burgers in town!").',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'description',
      label: 'Short Description',
      type: 'textarea',
      defaultValue: DEFAULTS.description,
      maxLength: 160,
      admin: {
        description:
          'A brief description of your establishment (max 160 characters). Shown in the footer and can be used for SEO meta tags. Great for hospitality, food & beverage, or service businesses.',
      },
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Navbar logo. If left empty the restaurant name text is shown instead. Recommended: transparent PNG, ~200x60 px.',
      },
    },
    // ─── Colors ─────────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Brand Colors',
      admin: {
        description:
          'Override the default theme colors. Click the swatch to open the color wheel, or type any CSS color value (hex, oklch, hsl, rgb). Dark mode falls back to the light value when left empty.',
        initCollapsed: false,
      },
      fields: [
        // Light mode
        {
          type: 'row',
          fields: [
            {
              name: 'primaryColor',
              label: 'Primary Color — Light',
              type: 'text',
              defaultValue: DEFAULTS.primaryColor,
              admin: {
                description: 'Main accent color (buttons, headings, icons) in light mode.',
                placeholder: 'e.g. #FFD700',
                width: '50%',
                components: {
                  Field: '@/components/admin/color-picker-field#ColorPickerField',
                },
              },
            },
            {
              name: 'primaryForegroundColor',
              label: 'Primary Foreground — Light',
              type: 'text',
              defaultValue: DEFAULTS.primaryForegroundColor,
              admin: {
                description: 'Text / icon color rendered on top of the primary color in light mode.',
                placeholder: 'e.g. #1a1a1a',
                width: '50%',
                components: {
                  Field: '@/components/admin/color-picker-field#ColorPickerField',
                },
              },
            },
          ],
        },
        // Dark mode
        {
          type: 'row',
          fields: [
            {
              name: 'primaryColorDark',
              label: 'Primary Color — Dark',
              type: 'text',
              defaultValue: DEFAULTS.primaryColorDark,
              admin: {
                description: 'Primary color in dark mode. Leave empty to reuse the light value.',
                placeholder: 'e.g. #FFD700',
                width: '50%',
                components: {
                  Field: '@/components/admin/color-picker-field#ColorPickerField',
                },
              },
            },
            {
              name: 'primaryForegroundColorDark',
              label: 'Primary Foreground — Dark',
              type: 'text',
              defaultValue: DEFAULTS.primaryForegroundColorDark,
              admin: {
                description: 'Foreground color in dark mode. Leave empty to reuse the light value.',
                placeholder: 'e.g. #1a1a1a',
                width: '50%',
                components: {
                  Field: '@/components/admin/color-picker-field#ColorPickerField',
                },
              },
            },
          ],
        },
      ],
    },
    // ─── Menu Configuration ──────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Menu Configuration',
      admin: { initCollapsed: false },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'currencySymbol',
              label: 'Currency Symbol',
              type: 'text',
              defaultValue: DEFAULTS.currencySymbol,
              admin: {
                description: 'Prepended to every price on the menu (e.g. £, $, €, LBP).',
                width: '50%',
              },
            },
            {
              name: 'showDealsSection',
              label: 'Show Deals Section',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Toggle to hide the deals/offers section from the menu.',
                width: '50%',
              },
            },
          ],
        },
      ],
    },
    // ─── Opening Hours ───────────────────────────────────────────────────────
    {
      name: 'openingHours',
      label: 'Opening Hours',
      type: 'group',
      admin: {
        description:
          'Optional. Configure when your business is open. Leave "Schedule" empty to hide opening hours from the menu entirely.',
      },
      fields: [
        // ── Preset picker ──────────────────────────────────────────────────
        {
          name: 'preset',
          label: 'Schedule',
          type: 'select',
          options: [
            { label: 'Every Day  —  same hours all week', value: 'everyday' },
            { label: 'Weekdays  —  Monday to Friday', value: 'weekdays' },
            { label: 'Weekends  —  Saturday & Sunday', value: 'weekends' },
            { label: 'Custom  —  set hours per day', value: 'custom' },
          ],
          admin: {
            isClearable: true,
            description: 'Pick a quick preset or "Custom" to configure each day individually.',
          },
        },
        // ── Shared open / close time (every day / weekdays / weekends) ─────
        {
          type: 'row',
          admin: {
            condition: (_, sib) => Boolean(sib?.preset && sib.preset !== 'custom'),
          },
          fields: [
            {
              name: 'openTime',
              label: 'Opens At',
              type: 'text',
              admin: {
                placeholder: '09:00',
                description: '24-hour format, e.g. 08:30',
                width: '50%',
              },
            },
            {
              name: 'closeTime',
              label: 'Closes At',
              type: 'text',
              admin: {
                placeholder: '22:00',
                description: '24-hour format, e.g. 23:00',
                width: '50%',
              },
            },
          ],
        },
        // ── Custom: per-day schedule ───────────────────────────────────────
        {
          name: 'monday',
          label: 'Monday',
          type: 'group',
          admin: { condition: (_, sib) => sib?.preset === 'custom' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'isOpen',
                  label: 'Open',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: { width: '20%' },
                },
                {
                  name: 'openTime',
                  label: 'Opens At',
                  type: 'text',
                  admin: {
                    placeholder: '09:00',
                    width: '40%',
                    condition: (_, sib) => Boolean(sib?.isOpen),
                  },
                },
                {
                  name: 'closeTime',
                  label: 'Closes At',
                  type: 'text',
                  admin: {
                    placeholder: '22:00',
                    width: '40%',
                    condition: (_, sib) => Boolean(sib?.isOpen),
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'tuesday',
          label: 'Tuesday',
          type: 'group',
          admin: { condition: (_, sib) => sib?.preset === 'custom' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'isOpen',
                  label: 'Open',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: { width: '20%' },
                },
                {
                  name: 'openTime',
                  label: 'Opens At',
                  type: 'text',
                  admin: {
                    placeholder: '09:00',
                    width: '40%',
                    condition: (_, sib) => Boolean(sib?.isOpen),
                  },
                },
                {
                  name: 'closeTime',
                  label: 'Closes At',
                  type: 'text',
                  admin: {
                    placeholder: '22:00',
                    width: '40%',
                    condition: (_, sib) => Boolean(sib?.isOpen),
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'wednesday',
          label: 'Wednesday',
          type: 'group',
          admin: { condition: (_, sib) => sib?.preset === 'custom' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'isOpen',
                  label: 'Open',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: { width: '20%' },
                },
                {
                  name: 'openTime',
                  label: 'Opens At',
                  type: 'text',
                  admin: {
                    placeholder: '09:00',
                    width: '40%',
                    condition: (_, sib) => Boolean(sib?.isOpen),
                  },
                },
                {
                  name: 'closeTime',
                  label: 'Closes At',
                  type: 'text',
                  admin: {
                    placeholder: '22:00',
                    width: '40%',
                    condition: (_, sib) => Boolean(sib?.isOpen),
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'thursday',
          label: 'Thursday',
          type: 'group',
          admin: { condition: (_, sib) => sib?.preset === 'custom' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'isOpen',
                  label: 'Open',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: { width: '20%' },
                },
                {
                  name: 'openTime',
                  label: 'Opens At',
                  type: 'text',
                  admin: {
                    placeholder: '09:00',
                    width: '40%',
                    condition: (_, sib) => Boolean(sib?.isOpen),
                  },
                },
                {
                  name: 'closeTime',
                  label: 'Closes At',
                  type: 'text',
                  admin: {
                    placeholder: '22:00',
                    width: '40%',
                    condition: (_, sib) => Boolean(sib?.isOpen),
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'friday',
          label: 'Friday',
          type: 'group',
          admin: { condition: (_, sib) => sib?.preset === 'custom' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'isOpen',
                  label: 'Open',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: { width: '20%' },
                },
                {
                  name: 'openTime',
                  label: 'Opens At',
                  type: 'text',
                  admin: {
                    placeholder: '09:00',
                    width: '40%',
                    condition: (_, sib) => Boolean(sib?.isOpen),
                  },
                },
                {
                  name: 'closeTime',
                  label: 'Closes At',
                  type: 'text',
                  admin: {
                    placeholder: '22:00',
                    width: '40%',
                    condition: (_, sib) => Boolean(sib?.isOpen),
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'saturday',
          label: 'Saturday',
          type: 'group',
          admin: { condition: (_, sib) => sib?.preset === 'custom' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'isOpen',
                  label: 'Open',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: { width: '20%' },
                },
                {
                  name: 'openTime',
                  label: 'Opens At',
                  type: 'text',
                  admin: {
                    placeholder: '09:00',
                    width: '40%',
                    condition: (_, sib) => Boolean(sib?.isOpen),
                  },
                },
                {
                  name: 'closeTime',
                  label: 'Closes At',
                  type: 'text',
                  admin: {
                    placeholder: '22:00',
                    width: '40%',
                    condition: (_, sib) => Boolean(sib?.isOpen),
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'sunday',
          label: 'Sunday',
          type: 'group',
          admin: { condition: (_, sib) => sib?.preset === 'custom' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'isOpen',
                  label: 'Open',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: { width: '20%' },
                },
                {
                  name: 'openTime',
                  label: 'Opens At',
                  type: 'text',
                  admin: {
                    placeholder: '09:00',
                    width: '40%',
                    condition: (_, sib) => Boolean(sib?.isOpen),
                  },
                },
                {
                  name: 'closeTime',
                  label: 'Closes At',
                  type: 'text',
                  admin: {
                    placeholder: '22:00',
                    width: '40%',
                    condition: (_, sib) => Boolean(sib?.isOpen),
                  },
                },
              ],
            },
          ],
        },
        // ── Optional note (shown whenever a preset is selected) ────────────
        {
          name: 'note',
          label: 'Note',
          type: 'text',
          maxLength: 80,
          admin: {
            placeholder: 'e.g. Closed on public holidays',
            description: 'Short note displayed alongside hours (max 80 characters).',
            condition: (_, sib) => Boolean(sib?.preset),
          },
        },
      ],
    },
    // ─── Contact & Location ──────────────────────────────────────────────────
    {
      name: 'deliveryNumber',
      label: 'WhatsApp / Delivery Number',
      type: 'number',
      required: true,
      defaultValue: DEFAULTS.deliveryNumber,
      min: 1,
      admin: {
        description: 'International format without the + (e.g. 96178830254).',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'locationTitle',
          label: 'Location Title',
          type: 'text',
          defaultValue: DEFAULTS.locationTitle,
          admin: {
            description: 'Display name for your store location (e.g. "Main Street Branch")',
            width: '50%',
          },
        },
        {
          name: 'locationUrl',
          label: 'Location (Google Maps)',
          type: 'text',
          defaultValue: DEFAULTS.locationUrl,
          admin: {
            description: 'Google Maps URL for the store (e.g. https://goo.gl/maps/...)',
            width: '50%',
          },
        },
      ],
    },
    // ─── Social Links ────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Social Media Links',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'tiktokUrl',
          label: 'TikTok URL',
          type: 'text',
          defaultValue: DEFAULTS.tiktokUrl,
          admin: {
            description: 'Your TikTok profile URL (e.g. https://tiktok.com/@username)',
          },
        },
        {
          name: 'facebookUrl',
          label: 'Facebook URL',
          type: 'text',
          defaultValue: DEFAULTS.facebookUrl,
          admin: {
            description: 'Your Facebook page URL (e.g. https://facebook.com/yourpage)',
          },
        },
        {
          name: 'instagramUrl',
          label: 'Instagram URL',
          type: 'text',
          defaultValue: DEFAULTS.instagramUrl,
          admin: {
            description: 'Your Instagram profile URL (e.g. https://instagram.com/username)',
          },
        },
      ],
    },
  ],
  versions: false,
  timestamps: true,
  endpoints: [],
  hooks: {
    afterChange: [revalidateFrontendAfterChange],
  },
}

export default Settings
