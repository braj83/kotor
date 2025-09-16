import type { CollectionConfig } from 'payload'

export const Owners: CollectionConfig = {
  slug: 'owners',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Owner Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Address',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Additional Notes',
    },
  ],
}
