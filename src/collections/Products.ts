import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'basePrice', 'isAvailable'],
    group: 'Product Management',
  },
  fields: [
    // Basic information
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: {
            width: '50%',
            style: {
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              maxWidth: '100%',
            },
          },
        },
        {
          name: 'ingredients',
          type: 'textarea',
          localized: true,
          admin: {
            width: '50%',
            style: {
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              maxWidth: '100%',
            },
          },
        },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    // Pricing structure
    {
      type: 'row',
      fields: [
        {
          name: 'basePrice',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'cost',
          type: 'number',
          min: 0,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'profitMargin',
          type: 'number',
          admin: {
            description: 'Automatically calculated',
            readOnly: true,
            width: '33%',
          },
          hooks: {
            beforeChange: [
              ({ data }) => {
                if (data?.basePrice && data?.cost) {
                  return ((data.basePrice - data.cost) / data.cost) * 100
                }
                return undefined
              },
            ],
          },
        },
      ],
    },
    // Product status flags
    {
      type: 'row',
      fields: [
        {
          name: 'isAvailable',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'isFeatured',
          type: 'checkbox',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    // Product variations section with improved textarea handling
    {
      type: 'collapsible',
      label: 'Product Variations',
      fields: [
        // Size options
        {
          name: 'sizeOptions',
          type: 'array',
          label: 'Size Options',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'sizeName',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'priceModifier',
                  type: 'number',
                  defaultValue: 0,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'description',
              type: 'text',
              admin: {
                style: {
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  maxWidth: '100%',
                },
              },
            },
          ],
        },
        // Flavor options
        {
          name: 'flavorOptions',
          type: 'array',
          label: 'Flavor Options',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'flavorName',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '60%',
                  },
                },
                {
                  name: 'additionalCost',
                  type: 'number',
                  defaultValue: 0,
                  admin: {
                    width: '40%',
                  },
                },
              ],
            },
          ],
        },
        // Add-ons
        {
          name: 'addOns',
          type: 'array',
          label: 'Add-Ons',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  min: 0,
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'maxSelection',
                  type: 'number',
                  admin: {
                    width: '25%',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default Products
