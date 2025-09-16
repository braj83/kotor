import type { CollectionConfig } from 'payload'

export const Reservations: CollectionConfig = {
  slug: 'reservations',
  admin: {
    useAsTitle: 'reservationId',
    defaultColumns: [
      'reservationId',
      'apartment',
      'checkInDateTime',
      'checkOutDateTime',
      'numberOfAdults',
      'numberOfChildren',
      'isCancelled',
    ],
  },
  access: {
    read: () => true, // Allow public read access
  },
  fields: [
    {
      name: 'reservationId',
      type: 'text',
      required: true,
      unique: true,
      label: 'Reservation ID',
      admin: {
        description:
          'Unique identifier for the reservation (from Beds24 or other booking platform)',
      },
    },
    {
      name: 'apartment',
      type: 'relationship',
      relationTo: 'apartments',
      required: true,
      label: 'Apartment',
      admin: {
        description: 'The apartment being reserved',
      },
    },
    {
      name: 'checkInDateTime',
      type: 'date',
      required: true,
      label: 'Check-in Date & Time',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Date and time of guest arrival',
      },
    },
    {
      name: 'checkOutDateTime',
      type: 'date',
      required: true,
      label: 'Check-out Date & Time',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Date and time of guest departure',
      },
    },
    {
      name: 'numberOfNights',
      type: 'number',
      required: true,
      label: 'Number of Nights',
      admin: {
        description: 'Duration of the stay in nights',
      },
      min: 1,
    },
    {
      name: 'numberOfAdults',
      type: 'number',
      required: true,
      label: 'Number of Adults',
      admin: {
        description: 'Count of adult guests',
      },
      min: 1,
    },
    {
      name: 'numberOfChildren',
      type: 'number',
      label: 'Number of Children',
      admin: {
        description: 'Count of child guests',
      },
      min: 0,
      defaultValue: 0,
    },
    {
      name: 'cribNeeded',
      type: 'checkbox',
      label: 'Crib Needed',
      defaultValue: false,
      admin: {
        description: 'Indicates if a crib is required for a child',
      },
    },
    {
      name: 'guestPaidAmount',
      type: 'number',
      required: true,
      label: 'Guest Paid Amount',
      admin: {
        description: 'Total amount paid by the guest for the reservation',
        step: 0.01,
      },
      min: 0,
    },
    {
      name: 'siteCommissionPercentage',
      type: 'number',
      label: 'Site Commission Percentage',
      admin: {
        description: 'Commission percentage charged by the booking platform (e.g., Beds24)',
        step: 0.01,
      },
      min: 0,
      max: 100,
    },
    {
      name: 'siteCommissionAmount',
      type: 'number',
      label: 'Site Commission Amount',
      admin: {
        description: 'Actual monetary amount of the site commission',
        step: 0.01,
      },
      min: 0,
    },
    {
      name: 'isCancelled',
      type: 'checkbox',
      label: 'Is Cancelled',
      defaultValue: false,
      admin: {
        description: 'Flag to indicate if the reservation has been cancelled',
      },
    },
    {
      name: 'cancellationNotes',
      type: 'textarea',
      label: 'Cancellation Notes',
      admin: {
        description:
          'Specific instructions or notes for cancelled reservations (e.g., color-coding in the ledger)',
        condition: (data) => data.isCancelled,
      },
    },
    {
      name: 'confirmedArrivalTime',
      type: 'date',
      label: 'Confirmed Arrival Time',
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
        },
        description: "Guest's confirmed arrival time, provided closer to the stay",
      },
    },
    {
      name: 'earlyCheckInRequested',
      type: 'checkbox',
      label: 'Early Check-in Requested',
      defaultValue: false,
      admin: {
        description: 'Indicates if an early check-in was requested',
      },
    },
    {
      name: 'luggageStorageOffered',
      type: 'checkbox',
      label: 'Luggage Storage Offered',
      defaultValue: false,
      admin: {
        description: 'Indicates if luggage storage was offered to the guest',
      },
    },
    {
      name: 'guestDetails',
      type: 'group',
      label: 'Guest Information',
      fields: [
        {
          name: 'guestName',
          type: 'text',
          label: 'Guest Name',
        },
        {
          name: 'guestEmail',
          type: 'email',
          label: 'Guest Email',
        },
        {
          name: 'guestPhone',
          type: 'text',
          label: 'Guest Phone',
        },
        {
          name: 'specialRequests',
          type: 'textarea',
          label: 'Special Requests',
        },
      ],
    },
    {
      name: 'bookingSource',
      type: 'select',
      label: 'Booking Source',
      options: [
        {
          label: 'Beds24',
          value: 'beds24',
        },
        {
          label: 'Booking.com',
          value: 'booking',
        },
        {
          label: 'Airbnb',
          value: 'airbnb',
        },
        {
          label: 'Direct',
          value: 'direct',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      defaultValue: 'beds24',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Additional Notes',
      admin: {
        description: 'Any additional notes about this reservation',
      },
    },
  ],
}
