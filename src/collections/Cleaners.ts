import type { CollectionConfig } from 'payload'

export const Cleaners: CollectionConfig = {
  slug: 'cleaners',
  admin: {
    useAsTitle: 'cleanerName',
    defaultColumns: [
      'cleanerName',
      'assignedApartments',
      'fixedCleaningPricePerApartment',
      'cleaningEarningPercentage',
    ],
  },
  fields: [
    {
      name: 'cleanerName',
      type: 'text',
      required: true,
      label: 'Cleaner Name',
      admin: {
        description: 'The name of the cleaner (e.g., "Sandra," "Sneza," "Suada")',
      },
    },
    {
      name: 'assignedApartments',
      type: 'relationship',
      relationTo: 'apartments',
      hasMany: true,
      label: 'Assigned Apartments',
      admin: {
        description: 'Apartments this cleaner regularly maintains',
      },
    },
    {
      name: 'fixedCleaningPricePerApartment',
      type: 'number',
      required: true,
      label: 'Fixed Cleaning Price Per Apartment',
      admin: {
        description: 'The standard fixed price for cleaning an apartment',
        step: 0.01,
      },
      min: 0,
    },
    {
      name: 'cleaningEarningPercentage',
      type: 'number',
      required: true,
      label: 'Cleaning Earning Percentage',
      admin: {
        description: 'The percentage of cleaning fees the cleaner receives (e.g., 90%)',
        step: 0.01,
      },
      min: 0,
      max: 100,
      defaultValue: 90,
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Address',
        },
      ],
    },
    {
      name: 'availability',
      type: 'group',
      label: 'Availability',
      fields: [
        {
          name: 'isActive',
          type: 'checkbox',
          label: 'Is Active',
          defaultValue: true,
          admin: {
            description: 'Whether this cleaner is currently available for work',
          },
        },
        {
          name: 'preferredWorkingDays',
          type: 'select',
          hasMany: true,
          label: 'Preferred Working Days',
          options: [
            { label: 'Monday', value: 'monday' },
            { label: 'Tuesday', value: 'tuesday' },
            { label: 'Wednesday', value: 'wednesday' },
            { label: 'Thursday', value: 'thursday' },
            { label: 'Friday', value: 'friday' },
            { label: 'Saturday', value: 'saturday' },
            { label: 'Sunday', value: 'sunday' },
          ],
        },
        {
          name: 'notes',
          type: 'textarea',
          label: 'Availability Notes',
          admin: {
            description: 'Any special notes about availability or preferences',
          },
        },
      ],
    },
    {
      name: 'performance',
      type: 'group',
      label: 'Performance Tracking',
      fields: [
        {
          name: 'totalJobsCompleted',
          type: 'number',
          label: 'Total Jobs Completed',
          defaultValue: 0,
          admin: {
            readOnly: true,
            description: 'Automatically tracked total of completed cleaning jobs',
          },
        },
        {
          name: 'averageRating',
          type: 'number',
          label: 'Average Rating',
          admin: {
            description: 'Average performance rating (1-5)',
            step: 0.1,
          },
          min: 1,
          max: 5,
        },
        {
          name: 'lastCleaningDate',
          type: 'date',
          label: 'Last Cleaning Date',
          admin: {
            description: 'Date of the most recent cleaning job',
          },
        },
      ],
    },
  ],
}
