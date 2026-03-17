import type { CollectionConfig } from 'payload'
import {
  revalidateFrontendAfterChange,
  revalidateFrontendAfterDelete,
} from '@/hooks/revalidate-frontend'

export const Deals: CollectionConfig = {
  slug: 'deals',
  labels: {
    singular: 'Deal',
    plural: 'Deals',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'products', 'offerPrice', 'isActive'],
    group: 'Product Management',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    // Grouped Price Fields
    {
      type: 'row',
      fields: [
        {
          name: 'originalTotalPrice',
          type: 'number',
          admin: {
            description: 'Automatically calculated sum of original product prices',
            readOnly: true,
            width: '33%',
          },
          hooks: {
            beforeValidate: [
              async ({ data, siblingData, req }) => {
                if (data?.products && req.payload) {
                  const productDocs = await Promise.all(
                    data.products.map(async (productId: string) => {
                      const product = await req.payload.findByID({
                        collection: 'products',
                        id: productId,
                      })
                      return product
                    }),
                  )
                  const total = productDocs.reduce(
                    (sum, product) => sum + (product?.basePrice || 0),
                    0,
                  )
                  siblingData.originalTotalPrice = parseFloat(total.toFixed(2))
                }
                return data?.originalTotalPrice
              },
            ],
          },
        },
        {
          name: 'offerPrice',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            description: 'Special price for this bundle/deal',
            width: '33%',
          },
        },
        {
          name: 'discountPercentage',
          type: 'number',
          admin: {
            readOnly: true,
            description: 'Automatically calculated discount percentage',
            width: '33%',
          },
          hooks: {
            beforeValidate: [
              ({ data, siblingData }) => {
                if (data?.originalTotalPrice && data?.offerPrice) {
                  const discount =
                    ((data.originalTotalPrice - data.offerPrice) / data.originalTotalPrice) * 100
                  siblingData.discountPercentage = parseFloat(discount.toFixed(1))
                }
                return data?.discountPercentage
              },
            ],
          },
        },
      ],
    },
    // Grouped Date Fields
    {
      type: 'row',
      fields: [
        {
          name: 'validFrom',
          type: 'date',
          admin: {
            description: 'When this deal should become active',
            width: '50%',
          },
        },
        {
          name: 'validUntil',
          type: 'date',
          admin: {
            description: 'When this deal should expire',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Only active deals will be shown to customers',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.validFrom && data?.validUntil) {
          const now = new Date()
          const validFrom = new Date(data.validFrom)
          const validUntil = new Date(data.validUntil)
          data.isActive = now >= validFrom && now <= validUntil
        }
        return data
      },
    ],
    afterChange: [revalidateFrontendAfterChange],
    afterDelete: [revalidateFrontendAfterDelete],
  },
}
