import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'isActive'],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
      admin: {
        description: "User's full name",
      },
    },
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      admin: {
        description: "User's first name",
      },
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      admin: {
        description: "User's last name",
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      label: 'Role',
      options: [
        { label: 'Super Admin', value: 'super_admin' },
        { label: 'Property Manager', value: 'property_manager' },
        { label: 'Operations Manager', value: 'operations_manager' },
        { label: 'Reservation Specialist', value: 'reservation_specialist' },
        { label: 'Cleaning Coordinator', value: 'cleaning_coordinator' },
        { label: 'Financial Manager', value: 'financial_manager' },
        { label: 'Customer Service', value: 'customer_service' },
        { label: 'Maintenance Staff', value: 'maintenance_staff' },
        { label: 'Accountant', value: 'accountant' },
        { label: 'Read Only', value: 'read_only' },
      ],
      defaultValue: 'staff',
      admin: {
        description: "User's role in the system",
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      admin: {
        description: "User's contact phone number",
      },
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Address',
      admin: {
        description: "User's address",
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Is Active',
      defaultValue: true,
      admin: {
        description: 'Whether this user account is active',
      },
    },
    {
      name: 'lastLogin',
      type: 'date',
      label: 'Last Login',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Date and time of last login',
        readOnly: true,
      },
    },
    {
      name: 'profileImage',
      type: 'relationship',
      relationTo: 'media',
      label: 'Profile Image',
      admin: {
        description: "User's profile picture",
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notes',
      admin: {
        description: 'Additional notes about this user',
      },
    },
    {
      name: 'permissions',
      type: 'group',
      label: 'Permissions',
      admin: {
        description:
          'Permissions are automatically set based on role, but can be manually overridden',
      },
      fields: [
        {
          name: 'canManageOwners',
          type: 'checkbox',
          label: 'Can Manage Owners',
          defaultValue: false,
          admin: {
            description: 'Create, edit, and delete property owners',
          },
        },
        {
          name: 'canManageApartments',
          type: 'checkbox',
          label: 'Can Manage Apartments',
          defaultValue: false,
          admin: {
            description: 'Create, edit, and delete apartment listings',
          },
        },
        {
          name: 'canManageReservations',
          type: 'checkbox',
          label: 'Can Manage Reservations',
          defaultValue: false,
          admin: {
            description: 'Create, edit, and manage guest reservations',
          },
        },
        {
          name: 'canManageCleaners',
          type: 'checkbox',
          label: 'Can Manage Cleaners',
          defaultValue: false,
          admin: {
            description: 'Manage cleaning staff and their assignments',
          },
        },
        {
          name: 'canManageCleaningJobs',
          type: 'checkbox',
          label: 'Can Manage Cleaning Jobs',
          defaultValue: false,
          admin: {
            description: 'Schedule and manage cleaning tasks',
          },
        },
        {
          name: 'canManageExpenses',
          type: 'checkbox',
          label: 'Can Manage Expenses',
          defaultValue: false,
          admin: {
            description: 'Record and manage owner expenses',
          },
        },
        {
          name: 'canManagePayments',
          type: 'checkbox',
          label: 'Can Manage Payments',
          defaultValue: false,
          admin: {
            description: 'Process and manage payment records',
          },
        },
        {
          name: 'canViewReports',
          type: 'checkbox',
          label: 'Can View Reports',
          defaultValue: false,
          admin: {
            description: 'Access financial reports and analytics',
          },
        },
        {
          name: 'canManageUsers',
          type: 'checkbox',
          label: 'Can Manage Users',
          defaultValue: false,
          admin: {
            description: 'Create and manage user accounts',
          },
        },
        {
          name: 'canManageMedia',
          type: 'checkbox',
          label: 'Can Manage Media',
          defaultValue: false,
          admin: {
            description: 'Upload and manage images and documents',
          },
        },
        {
          name: 'canExportData',
          type: 'checkbox',
          label: 'Can Export Data',
          defaultValue: false,
          admin: {
            description: 'Export data to CSV, Excel, or other formats',
          },
        },
      ],
    },
  ],
}
