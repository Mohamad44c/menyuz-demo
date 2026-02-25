import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  admin: {
    group: 'Product Management',
  },
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
