import type { CollectionConfig } from 'payload'

export const PaymentDetails: CollectionConfig = {
  slug: 'payment-details',
  admin: {
    useAsTitle: 'paymentDetailId',
    defaultColumns: [
      'paymentDetailId',
      'reservation',
      'paymentMethod',
      'amountDirectToOwner',
      'paymentDate',
      'status',
    ],
  },
  fields: [
    {
      name: 'paymentDetailId',
      type: 'text',
      required: true,
      unique: true,
      label: 'Payment Detail ID',
      admin: {
        description: 'Unique identifier for each payment record',
      },
    },
    // {
    //   name: 'reservation',
    //   type: 'relationship',
    //   relationTo: 'reservations',
    //   required: true,
    //   label: 'Reservation',
    //   admin: {
    //     description: 'The reservation this payment is for',
    //   },
    // },
    {
      name: 'paymentMethod',
      type: 'select',
      required: true,
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
        description: 'The method used for payment',
      },
    },
    {
      name: 'amountDirectToOwner',
      type: 'number',
      label: 'Amount Direct to Owner',
      admin: {
        description: "The exact amount if the payment went directly to the owner's account",
        step: 0.01,
      },
      min: 0,
    },
    {
      name: 'totalPaymentAmount',
      type: 'number',
      required: true,
      label: 'Total Payment Amount',
      admin: {
        description: 'The total amount of the payment',
        step: 0.01,
      },
      min: 0,
    },
    {
      name: 'paymentDate',
      type: 'date',
      required: true,
      label: 'Payment Date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Date and time when the payment was processed',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Payment Status',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' },
        { label: 'Partially Refunded', value: 'partially_refunded' },
        { label: 'Disputed', value: 'disputed' },
      ],
      defaultValue: 'pending',
      admin: {
        description: 'Current status of the payment',
      },
    },
    {
      name: 'transactionId',
      type: 'text',
      label: 'Transaction ID',
      admin: {
        description: 'External transaction ID from payment processor',
      },
    },
    {
      name: 'paymentProcessor',
      type: 'select',
      label: 'Payment Processor',
      options: [
        { label: 'Stripe', value: 'stripe' },
        { label: 'PayPal', value: 'paypal' },
        { label: 'Bank', value: 'bank' },
        { label: 'Beds24', value: 'beds24' },
        { label: 'Booking.com', value: 'booking' },
        { label: 'Airbnb', value: 'airbnb' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'The payment processor or platform used',
      },
    },
    {
      name: 'processingFee',
      type: 'number',
      label: 'Processing Fee',
      admin: {
        description: 'Fee charged by the payment processor',
        step: 0.01,
      },
      min: 0,
    },
    {
      name: 'netAmount',
      type: 'number',
      label: 'Net Amount',
      admin: {
        description: 'Amount after processing fees (Total Payment - Processing Fee)',
        step: 0.01,
      },
      min: 0,
    },
    {
      name: 'currency',
      type: 'select',
      label: 'Currency',
      options: [
        { label: 'EUR', value: 'EUR' },
        { label: 'USD', value: 'USD' },
        { label: 'GBP', value: 'GBP' },
        { label: 'RSD', value: 'RSD' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'EUR',
      admin: {
        description: 'Currency of the payment',
      },
    },
    {
      name: 'exchangeRate',
      type: 'number',
      label: 'Exchange Rate',
      admin: {
        description: 'Exchange rate used if different from base currency',
        step: 0.0001,
      },
      min: 0,
    },
    {
      name: 'refundDetails',
      type: 'group',
      label: 'Refund Details',
      fields: [
        {
          name: 'refundAmount',
          type: 'number',
          label: 'Refund Amount',
          admin: {
            step: 0.01,
          },
          min: 0,
        },
        {
          name: 'refundDate',
          type: 'date',
          label: 'Refund Date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'refundReason',
          type: 'textarea',
          label: 'Refund Reason',
        },
        {
          name: 'refundTransactionId',
          type: 'text',
          label: 'Refund Transaction ID',
        },
      ],
      admin: {
        condition: (data) => data.status === 'refunded' || data.status === 'partially_refunded',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Payment Notes',
      admin: {
        description: 'Additional notes about this payment',
      },
    },
  ],
}
