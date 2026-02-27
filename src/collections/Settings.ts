import type { CollectionConfig } from 'payload'

const Settings: CollectionConfig = {
  slug: 'settings',
  admin: {
    description: 'Global settings for the app',
    group: 'Settings & Users',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'deliveryNumber',
      label: 'Delivery Number',
      type: 'number',
      required: true,
      min: 1,
    },
    {
      name: 'locationTitle',
      label: 'Location Title',
      type: 'text',
      admin: {
        description: 'Display name for your store location (e.g. "Main Street Branch")',
      },
    },
    {
      name: 'locationUrl',
      label: 'Location (Google Maps)',
      type: 'text',
      admin: {
        description:
          'Paste a Google Maps URL to display your store location for customers (e.g. https://maps.google.com/... or https://goo.gl/maps/...)',
      },
    },
    {
      name: 'tiktokUrl',
      label: 'TikTok URL',
      type: 'text',
      admin: {
        description: 'Your TikTok profile URL (e.g. https://tiktok.com/@username)',
      },
    },
    {
      name: 'facebookUrl',
      label: 'Facebook URL',
      type: 'text',
      admin: {
        description: 'Your Facebook page URL (e.g. https://facebook.com/yourpage)',
      },
    },
    {
      name: 'instagramUrl',
      label: 'Instagram URL',
      type: 'text',
      admin: {
        description: 'Your Instagram profile URL (e.g. https://instagram.com/username)',
      },
    },
  ],
  // Make this collection a singleton
  versions: false,
  timestamps: true,
  endpoints: [],
}

export default Settings
