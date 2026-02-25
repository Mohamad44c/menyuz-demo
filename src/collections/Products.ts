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
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
          required: true,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            width: '33%',
          },
        },
        // Pricing structure
        {
          name: 'basePrice',
          label: 'Price ($)',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            width: '33%',
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
          admin: {
            width: '100%',
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
        // Sauces
        {
          name: 'sauces',
          type: 'relationship',
          relationTo: 'sauces',
          hasMany: true,
          label: 'Available Sauces',
          admin: {
            description: 'Select one or multiple sauces available for this product',
          },
        },
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
