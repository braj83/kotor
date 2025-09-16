import type { CollectionConfig } from 'payload'

export const CleaningJobs: CollectionConfig = {
  slug: 'cleaning-jobs',
  admin: {
    useAsTitle: 'cleaningJobId',
    defaultColumns: [
      'cleaningJobId',
      'reservation',
      'apartment',
      'cleaner',
      'cleaningDate',
      'cleaningOrderPriority',
      'totalOwnerCostForCleaning',
    ],
  },
  access: {
    read: () => true, // Allow public read access
  },
  fields: [
    {
      name: 'cleaningJobId',
      type: 'text',
      required: true,
      unique: true,
      label: 'Cleaning Job ID',
      admin: {
        description: 'Unique identifier for each cleaning instance',
      },
    },
    // {
    //   name: 'reservation',
    //   type: 'relationship',
    //   relationTo: 'reservations',
    //   required: true,
    //   label: 'Reservation',
    //   admin: {
    //     description: 'The reservation this cleaning job is for',
    //   },
    // },
    {
      name: 'apartment',
      type: 'relationship',
      relationTo: 'apartments',
      required: true,
      label: 'Apartment',
      admin: {
        description: 'The apartment being cleaned',
      },
    },
    {
      name: 'cleaningDate',
      type: 'date',
      required: true,
      label: 'Cleaning Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'The date the cleaning is scheduled or performed',
      },
    },
    {
      name: 'cleaner',
      type: 'relationship',
      relationTo: 'cleaners',
      required: true,
      label: 'Cleaner',
      admin: {
        description: 'The cleaner assigned to this job',
      },
    },
    {
      name: 'cleaningOrderPriority',
      type: 'number',
      required: true,
      label: 'Cleaning Order Priority',
      admin: {
        description:
          'Priority level for cleaning tasks based on guest departure/arrival times (1 = highest priority)',
      },
      min: 1,
      defaultValue: 1,
    },
    {
      name: 'climateControlInstruction',
      type: 'select',
      label: 'Climate Control Instruction',
      options: [
        { label: 'Turn On', value: 'turn_on' },
        { label: 'Turn Off', value: 'turn_off' },
        { label: 'Leave As Is', value: 'leave_as_is' },
        { label: 'Set to Specific Temperature', value: 'set_temperature' },
      ],
      admin: {
        description: "Instructions regarding the apartment's climate control",
      },
    },
    {
      name: 'climateControlTemperature',
      type: 'number',
      label: 'Climate Control Temperature',
      admin: {
        description: 'Specific temperature setting (if applicable)',
        condition: (data) => data.climateControlInstruction === 'set_temperature',
      },
      min: 16,
      max: 30,
    },
    {
      name: 'toiletPaperRollsNeeded',
      type: 'number',
      label: 'Toilet Paper Rolls Needed',
      admin: {
        description: 'The number of toilet paper rolls to be provided',
      },
      min: 0,
      defaultValue: 0,
    },
    {
      name: 'additionalSofaTowelsLinen',
      type: 'checkbox',
      label: 'Additional Sofa Towels/Linen',
      defaultValue: false,
      admin: {
        description: 'Indicates if extra linen/towels for a sofa are needed',
      },
    },
    {
      name: 'doubleLinenTowelsNeeded',
      type: 'checkbox',
      label: 'Double Linen/Towels Needed',
      defaultValue: false,
      admin: {
        description:
          'Indicates if double linen/towels are required for longer stays (over 3-4 nights)',
      },
    },
    {
      name: 'linenDetails',
      type: 'group',
      label: 'Linen Details',
      fields: [
        {
          name: 'numberOfBeds',
          type: 'number',
          label: 'Number of Beds',
          min: 0,
          defaultValue: 0,
        },
        {
          name: 'numberOfSofas',
          type: 'number',
          label: 'Number of Sofas',
          min: 0,
          defaultValue: 0,
        },
        {
          name: 'linenWashingPrice',
          type: 'number',
          label: 'Linen Washing Price',
          admin: {
            description:
              'Calculated cost for washing and ironing linen, based on the number of beds/sofas',
            step: 0.01,
          },
          min: 0,
        },
      ],
    },
    {
      name: 'financialDetails',
      type: 'group',
      label: 'Financial Details',
      fields: [
        {
          name: 'totalOwnerCostForCleaning',
          type: 'number',
          required: true,
          label: 'Total Owner Cost for Cleaning',
          admin: {
            description:
              'The final amount the owner is charged for this specific cleaning, including linen',
            step: 0.01,
          },
          min: 0,
        },
        {
          name: 'cleanerEarnings',
          type: 'number',
          required: true,
          label: 'Cleaner Earnings',
          admin: {
            description: 'The amount earned by the cleaner for this job',
            step: 0.01,
          },
          min: 0,
        },
        {
          name: 'agencyMarginOnCleaning',
          type: 'number',
          label: 'Agency Margin on Cleaning',
          admin: {
            description: "The agency's margin on the cleaning fee",
            step: 0.01,
          },
          min: 0,
        },
        {
          name: 'laundryCost',
          type: 'number',
          label: 'Laundry Cost',
          admin: {
            description: 'The amount paid to the laundry service for linen',
            step: 0.01,
          },
          min: 0,
        },
        {
          name: 'agencyEarningsFromLinen',
          type: 'number',
          label: 'Agency Earnings from Linen',
          admin: {
            description: "The agency's earnings from linen services",
            step: 0.01,
          },
          min: 0,
        },
      ],
    },
    {
      name: 'jobStatus',
      type: 'select',
      label: 'Job Status',
      options: [
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Rescheduled', value: 'rescheduled' },
      ],
      defaultValue: 'scheduled',
      admin: {
        description: 'Current status of the cleaning job',
      },
    },
    {
      name: 'completionDetails',
      type: 'group',
      label: 'Completion Details',
      fields: [
        {
          name: 'actualStartTime',
          type: 'date',
          label: 'Actual Start Time',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
            description: 'When the cleaning actually started',
          },
        },
        {
          name: 'actualEndTime',
          type: 'date',
          label: 'Actual End Time',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
            description: 'When the cleaning was completed',
          },
        },
        {
          name: 'qualityCheckPassed',
          type: 'checkbox',
          label: 'Quality Check Passed',
          defaultValue: false,
        },
        {
          name: 'qualityCheckNotes',
          type: 'textarea',
          label: 'Quality Check Notes',
          admin: {
            description: 'Notes from quality inspection',
          },
        },
      ],
    },
    {
      name: 'specialInstructions',
      type: 'textarea',
      label: 'Special Instructions',
      admin: {
        description: 'Any special instructions for this cleaning job',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Additional Notes',
      admin: {
        description: 'Any additional notes about this cleaning job',
      },
    },
  ],
}
