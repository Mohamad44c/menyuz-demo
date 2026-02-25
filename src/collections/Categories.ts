import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  orderable: true,
  defaultSort: 'order',
  admin: {
    useAsTitle: 'name',
    group: 'Product Management',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
    },
  ],
}
