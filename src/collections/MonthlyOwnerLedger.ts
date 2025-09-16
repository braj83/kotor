import type { CollectionConfig } from 'payload'

export const MonthlyOwnerLedger: CollectionConfig = {
  slug: 'monthly-owner-ledger',
  admin: {
    useAsTitle: 'ledgerEntryId',
    defaultColumns: ['ledgerEntryId', 'owner', 'month', 'totalEarnings', 'netIncome', 'status'],
  },
  fields: [
    {
      name: 'ledgerEntryId',
      type: 'text',
      required: true,
      unique: true,
      label: 'Ledger Entry ID',
      admin: {
        description: 'Unique identifier for each ledger entry',
      },
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'owners',
      required: true,
      label: 'Owner',
      admin: {
        description: 'The owner this ledger entry belongs to',
      },
    },
    {
      name: 'month',
      type: 'date',
      required: true,
      label: 'Month',
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
        },
        description: 'The month and year for the ledger entry (e.g., "2023-08")',
      },
    },
    // {
    //   name: 'reservation',
    //   type: 'relationship',
    //   relationTo: 'reservations',
    //   label: 'Reservation',
    //   admin: {
    //     description: 'Specific reservation (can be null if not reservation-specific)',
    //   },
    // },
    {
      name: 'cleaningJob',
      type: 'relationship',
      relationTo: 'cleaning-jobs',
      label: 'Cleaning Job',
      admin: {
        description: 'Specific cleaning job (can be null)',
      },
    },
    {
      name: 'ownerExpense',
      type: 'relationship',
      relationTo: 'owner-expenses',
      label: 'Owner Expense',
      admin: {
        description: 'Specific owner expense (can be null)',
      },
    },
    {
      name: 'financialSummary',
      type: 'group',
      label: 'Financial Summary',
      fields: [
        {
          name: 'guestPaidAmount',
          type: 'number',
          label: 'Guest Paid Amount',
          admin: {
            description: "The guest's payment from the reservation",
            step: 0.01,
          },
          min: 0,
        },
        {
          name: 'siteCommissionAmount',
          type: 'number',
          label: 'Site Commission Amount',
          admin: {
            description: "The booking site's commission from the reservation",
            step: 0.01,
          },
          min: 0,
        },
        {
          name: 'totalOwnerCostForCleaning',
          type: 'number',
          label: 'Total Owner Cost for Cleaning',
          admin: {
            description: 'The cleaning cost passed to the owner',
            step: 0.01,
          },
          min: 0,
        },
        {
          name: 'otherExpensesAmount',
          type: 'number',
          label: 'Other Expenses Amount',
          admin: {
            description: 'The total of "Ostali troškovi" from the Owner Expenses table',
            step: 0.01,
          },
          min: 0,
        },
        {
          name: 'totalEarnings',
          type: 'number',
          required: true,
          label: 'Total Earnings',
          admin: {
            description: 'The calculated total earnings for the owner',
            step: 0.01,
          },
          min: 0,
        },
        {
          name: 'netIncome',
          type: 'number',
          required: true,
          label: 'Net Income',
          admin: {
            description: 'The calculated net income for the owner (Total Earnings - Total Costs)',
            step: 0.01,
          },
        },
      ],
    },
    {
      name: 'paymentDetails',
      type: 'group',
      label: 'Payment Details',
      fields: [
        {
          name: 'paymentMethod',
          type: 'select',
          label: 'Payment Method',
          options: [
            { label: 'Card', value: 'card' },
            { label: 'Link', value: 'link' },
            { label: 'Direct to Owner Account', value: 'direct_to_owner' },
            { label: 'Bank Transfer', value: 'bank_transfer' },
            { label: 'Cash', value: 'cash' },
            { label: 'PayPal', value: 'paypal' },
            { label: 'Other', value: 'other' },
          ],
          admin: {
            description: 'The payment method for the reservation',
          },
        },
        {
          name: 'amountDirectToOwner',
          type: 'number',
          label: 'Amount Direct to Owner',
          admin: {
            description: "Amount paid directly to the owner's account",
            step: 0.01,
          },
          min: 0,
        },
        {
          name: 'paymentDate',
          type: 'date',
          label: 'Payment Date',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
            description: 'Date when payment was made to owner',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Ledger Status',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending Review', value: 'pending_review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Paid', value: 'paid' },
        { label: 'Disputed', value: 'disputed' },
      ],
      defaultValue: 'draft',
      admin: {
        description: 'Current status of this ledger entry',
      },
    },
    {
      name: 'breakdown',
      type: 'group',
      label: 'Detailed Breakdown',
      fields: [
        {
          name: 'reservationCount',
          type: 'number',
          label: 'Number of Reservations',
          admin: {
            description: 'Total number of reservations for this month',
          },
          min: 0,
          defaultValue: 0,
        },
        {
          name: 'cleaningJobsCount',
          type: 'number',
          label: 'Number of Cleaning Jobs',
          admin: {
            description: 'Total number of cleaning jobs for this month',
          },
          min: 0,
          defaultValue: 0,
        },
        {
          name: 'expensesCount',
          type: 'number',
          label: 'Number of Expenses',
          admin: {
            description: 'Total number of expenses for this month',
          },
          min: 0,
          defaultValue: 0,
        },
        {
          name: 'averageStayLength',
          type: 'number',
          label: 'Average Stay Length (Nights)',
          admin: {
            description: 'Average number of nights per reservation',
            step: 0.1,
          },
          min: 0,
        },
        {
          name: 'occupancyRate',
          type: 'number',
          label: 'Occupancy Rate (%)',
          admin: {
            description: 'Percentage of time the apartment was occupied',
            step: 0.01,
          },
          min: 0,
          max: 100,
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Ledger Notes',
      admin: {
        description: 'Additional notes about this ledger entry',
      },
    },
    {
      name: 'generatedDate',
      type: 'date',
      label: 'Generated Date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Date when this ledger entry was generated',
      },
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'lastUpdated',
      type: 'date',
      label: 'Last Updated',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Date when this ledger entry was last updated',
      },
    },
  ],
}
