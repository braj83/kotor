import type { CollectionConfig } from 'payload'

export const OwnerExpenses: CollectionConfig = {
  slug: 'owner-expenses',
  admin: {
    useAsTitle: 'itemDescription',
    defaultColumns: [
      'ownerExpenseId',
      'owner',
      'expenseDate',
      'itemDescription',
      'baseCost',
      'totalCostToOwner',
    ],
  },
  fields: [
    {
      name: 'ownerExpenseId',
      type: 'text',
      required: true,
      unique: true,
      label: 'Owner Expense ID',
      admin: {
        description: 'Unique identifier for each expense entry',
      },
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'owners',
      required: true,
      label: 'Owner',
      admin: {
        description: 'The owner this expense is charged to',
      },
    },
    {
      name: 'expenseDate',
      type: 'date',
      required: true,
      label: 'Expense Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'The date the expense was incurred',
      },
    },
    {
      name: 'itemDescription',
      type: 'text',
      required: true,
      label: 'Item Description',
      admin: {
        description:
          'Description of the expense (e.g., "supplies purchase," "batteries," "toilet paper," "maintenance")',
      },
    },
    {
      name: 'expenseCategory',
      type: 'select',
      label: 'Expense Category',
      options: [
        { label: 'Supplies', value: 'supplies' },
        { label: 'Maintenance', value: 'maintenance' },
        { label: 'Utilities', value: 'utilities' },
        { label: 'Cleaning Supplies', value: 'cleaning_supplies' },
        { label: 'Toilet Paper', value: 'toilet_paper' },
        { label: 'Batteries', value: 'batteries' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Category of the expense for better organization',
      },
    },
    {
      name: 'baseCost',
      type: 'number',
      required: true,
      label: 'Base Cost',
      admin: {
        description: 'The initial cost of the item/service',
        step: 0.01,
      },
      min: 0,
    },
    {
      name: 'agencyMargin',
      type: 'number',
      required: true,
      label: 'Agency Margin',
      admin: {
        description: 'Predefined margin applied to the cost (as percentage)',
        step: 0.01,
      },
      min: 0,
      max: 100,
      defaultValue: 10,
    },
    {
      name: 'totalCostToOwner',
      type: 'number',
      required: true,
      label: 'Total Cost to Owner',
      admin: {
        description:
          'The final amount charged to the owner for this expense (Base Cost + Agency Margin)',
        step: 0.01,
      },
      min: 0,
    },
    {
      name: 'supplier',
      type: 'text',
      label: 'Supplier',
      admin: {
        description: 'Name of the supplier or vendor',
      },
    },
    {
      name: 'invoiceNumber',
      type: 'text',
      label: 'Invoice Number',
      admin: {
        description: 'Invoice or receipt number for record keeping',
      },
    },
    {
      name: 'paymentStatus',
      type: 'select',
      label: 'Payment Status',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Reimbursed', value: 'reimbursed' },
        { label: 'Disputed', value: 'disputed' },
      ],
      defaultValue: 'pending',
      admin: {
        description: 'Current payment status of this expense',
      },
    },
    {
      name: 'paymentDate',
      type: 'date',
      label: 'Payment Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'Date when the expense was paid or reimbursed',
        condition: (data) => data.paymentStatus === 'paid' || data.paymentStatus === 'reimbursed',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notes',
      admin: {
        description: 'Additional notes about this expense',
      },
    },
    {
      name: 'receipt',
      type: 'relationship',
      relationTo: 'media',
      label: 'Receipt/Invoice',
      admin: {
        description: 'Upload receipt or invoice document',
      },
    },
  ],
}
