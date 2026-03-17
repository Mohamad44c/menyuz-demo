import type { CollectionConfig } from 'payload'
import {
  revalidateFrontendAfterChange,
  revalidateFrontendAfterDelete,
} from '@/hooks/revalidate-frontend'

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
  hooks: {
    afterChange: [revalidateFrontendAfterChange],
    afterDelete: [revalidateFrontendAfterDelete],
  },
}
