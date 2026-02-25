import type { CollectionConfig } from 'payload'

export const Sauces: CollectionConfig = {
    slug: 'sauces',
    admin: {
        useAsTitle: 'name',
        group: 'Product Management',
        defaultColumns: ['name'],
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        }
    ],
}
