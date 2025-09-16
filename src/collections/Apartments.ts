import type { CollectionConfig } from 'payload'

export const Apartments: CollectionConfig = {
  slug: 'apartments',
  admin: {
    useAsTitle: 'apartmentName',
  },
  access: {
    read: () => true, // Allow public read access
  },
  fields: [
    {
      name: 'apartmentName',
      type: 'text',
      required: true,
      label: 'Apartment Name',
      admin: {
        description: 'The name of the apartment (e.g., "Noah," "Sunny," "Red," "Ocean")',
      },
    },
    {
      name: 'capacity',
      type: 'number',
      required: true,
      label: 'Maximum Capacity',
      admin: {
        description: 'The maximum number of guests the apartment can accommodate',
      },
      min: 1,
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'owners',
      required: true,
      label: 'Owner',
      admin: {
        description: 'The owner of this apartment',
      },
    },
    {
      name: 'hasAC',
      type: 'checkbox',
      label: 'Has Air Conditioning',
      defaultValue: false,
    },
    {
      name: 'hasIron',
      type: 'checkbox',
      label: 'Has Iron',
      defaultValue: false,
    },
    {
      name: 'hasIroningBoard',
      type: 'checkbox',
      label: 'Has Ironing Board',
      defaultValue: false,
    },
    {
      name: 'otherAmenities',
      type: 'json',
      label: 'Other Amenities',
      admin: {
        description: 'Additional amenities as JSON data (e.g., ["WiFi", "Parking", "Balcony"])',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Additional details about the apartment',
      },
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      label: 'Apartment Images',
      admin: {
        description: 'Upload images of the apartment',
      },
    },
  ],
}
