// Set environment variables for seeding BEFORE importing anything
process.env.PAYLOAD_SECRET = 'your-secret-key-here-change-this-in-production'
process.env.DATABASE_URI = 'file:./payload.db'

import { getPayload } from 'payload'
import config from './payload.config'

const seed = async () => {
  const payload = await getPayload({ config })

  try {
    console.log('🌱 Starting database seeding...')

    // Create Admin User
    console.log('Creating admin user...')
    try {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@example.com',
          password: 'admin123',
          name: 'System Administrator',
          firstName: 'System',
          lastName: 'Administrator',
          role: 'super_admin',
          phone: '+381 64 000 0000',
          address: 'Belgrade, Serbia',
          isActive: true,
          permissions: {
            canManageOwners: true,
            canManageApartments: true,
            canManageReservations: true,
            canManageCleaners: true,
            canManageCleaningJobs: true,
            canManageExpenses: true,
            canManagePayments: true,
            canViewReports: true,
            canManageUsers: true,
          },
          notes: 'Main system administrator with full access',
        },
      })
      console.log('✅ Admin user created: admin@example.com / admin123')
    } catch (_error) {
      console.log('ℹ️ Admin user might already exist, continuing...')
    }

    // Create additional sample users
    console.log('Creating sample users...')
    try {
      await payload.create({
        collection: 'users',
        data: {
          email: 'manager@example.com',
          password: 'manager123',
          name: 'Property Manager',
          firstName: 'Property',
          lastName: 'Manager',
          role: 'property_manager',
          phone: '+381 64 111 1111',
          address: 'Belgrade, Serbia',
          isActive: true,
          permissions: {
            canManageOwners: true,
            canManageApartments: true,
            canManageReservations: true,
            canManageCleaners: true,
            canManageCleaningJobs: true,
            canManageExpenses: true,
            canManagePayments: true,
            canViewReports: true,
            canManageUsers: false,
          },
          notes: 'Property manager with management permissions',
        },
      })

      await payload.create({
        collection: 'users',
        data: {
          email: 'staff@example.com',
          password: 'staff123',
          name: 'Staff Member',
          firstName: 'Staff',
          lastName: 'Member',
          role: 'reservation_specialist',
          phone: '+381 64 222 2222',
          address: 'Belgrade, Serbia',
          isActive: true,
          permissions: {
            canManageOwners: false,
            canManageApartments: true,
            canManageReservations: true,
            canManageCleaners: true,
            canManageCleaningJobs: true,
            canManageExpenses: false,
            canManagePayments: false,
            canViewReports: true,
            canManageUsers: false,
          },
          notes: 'Staff member with limited permissions',
        },
      })

      await payload.create({
        collection: 'users',
        data: {
          email: 'cleaning@example.com',
          password: 'cleaning123',
          name: 'Cleaning Coordinator',
          firstName: 'Cleaning',
          lastName: 'Coordinator',
          role: 'cleaning_coordinator',
          phone: '+381 64 333 3333',
          address: 'Belgrade, Serbia',
          isActive: true,
          permissions: {
            canManageOwners: false,
            canManageApartments: true,
            canManageReservations: false,
            canManageCleaners: true,
            canManageCleaningJobs: true,
            canManageExpenses: false,
            canManagePayments: false,
            canViewReports: true,
            canManageUsers: false,
            canManageMedia: true,
            canExportData: false,
          },
          notes: 'Coordinates all cleaning operations and manages cleaning staff',
        },
      })

      await payload.create({
        collection: 'users',
        data: {
          email: 'finance@example.com',
          password: 'finance123',
          name: 'Financial Manager',
          firstName: 'Financial',
          lastName: 'Manager',
          role: 'financial_manager',
          phone: '+381 64 444 4444',
          address: 'Belgrade, Serbia',
          isActive: true,
          permissions: {
            canManageOwners: true,
            canManageApartments: false,
            canManageReservations: true,
            canManageCleaners: false,
            canManageCleaningJobs: false,
            canManageExpenses: true,
            canManagePayments: true,
            canViewReports: true,
            canManageUsers: false,
            canManageMedia: false,
            canExportData: true,
          },
          notes: 'Manages all financial aspects including payments and expenses',
        },
      })

      console.log(
        '✅ Sample users created: manager@example.com / manager123, staff@example.com / staff123, cleaning@example.com / cleaning123, finance@example.com / finance123',
      )
    } catch (_error) {
      console.log('ℹ️ Sample users might already exist, continuing...')
    }

    // Create Owners
    console.log('Creating owners...')
    const owner1 = await payload.create({
      collection: 'owners',
      data: {
        name: 'Marko Petrović',
        email: 'marko.petrovic@email.com',
        phone: '+381 64 123 4567',
        address: 'Knez Mihailova 15, Belgrade, Serbia',
        notes: 'Primary owner of multiple properties in Belgrade center',
      },
    })

    const owner2 = await payload.create({
      collection: 'owners',
      data: {
        name: 'Ana Jovanović',
        email: 'ana.jovanovic@email.com',
        phone: '+381 65 987 6543',
        address: 'Terazije 8, Belgrade, Serbia',
        notes: 'Owns luxury apartments in city center',
      },
    })

    const owner3 = await payload.create({
      collection: 'owners',
      data: {
        name: 'Dragan Kovačević',
        email: 'dragan.kovacevic@email.com',
        phone: '+381 63 555 1234',
        address: 'Vračar, Belgrade, Serbia',
        notes: 'Experienced property owner with multiple units',
      },
    })

    const owner4 = await payload.create({
      collection: 'owners',
      data: {
        name: 'Milica Stanković',
        email: 'milica.stankovic@email.com',
        phone: '+381 66 777 8888',
        address: 'New Belgrade, Belgrade, Serbia',
        notes: 'New property owner, first time working with us',
      },
    })

    const owner5 = await payload.create({
      collection: 'owners',
      data: {
        name: 'Ivan Đorđević',
        email: 'ivan.djordjevic@email.com',
        phone: '+381 64 999 0000',
        address: 'Zvezdara, Belgrade, Serbia',
        notes: 'Owns properties in residential areas',
      },
    })

    // Create Apartments
    console.log('Creating apartments...')
    const apartment1 = await payload.create({
      collection: 'apartments',
      data: {
        apartmentName: 'Sunny',
        capacity: 2,
        owner: owner1.id,
        hasAC: true,
        hasIron: false,
        hasIroningBoard: true,
        otherAmenities: ['WiFi', 'City View', 'Modern Kitchen'],
        description: 'Cozy studio apartment with amazing city views',
      },
    })

    const apartment2 = await payload.create({
      collection: 'apartments',
      data: {
        apartmentName: 'Ocean',
        capacity: 3,
        owner: owner1.id,
        hasAC: false,
        hasIron: true,
        hasIroningBoard: false,
        otherAmenities: ['WiFi', 'Sea View', 'Beach Access'],
        description: 'Charming apartment with ocean views and beach proximity',
      },
    })

    const apartment3 = await payload.create({
      collection: 'apartments',
      data: {
        apartmentName: 'Noah',
        capacity: 4,
        owner: owner2.id,
        hasAC: true,
        hasIron: true,
        hasIroningBoard: true,
        otherAmenities: ['WiFi', 'Parking', 'Balcony', 'Kitchen'],
        description: 'Beautiful 2-bedroom apartment in the heart of Belgrade with modern amenities',
      },
    })

    const apartment4 = await payload.create({
      collection: 'apartments',
      data: {
        apartmentName: 'Blue Lagoon',
        capacity: 5,
        owner: owner2.id,
        hasAC: true,
        hasIron: true,
        hasIroningBoard: true,
        otherAmenities: ['WiFi', 'Pool Access', 'Garden', 'BBQ Area'],
        description: 'Luxury apartment with pool and garden access',
      },
    })

    const apartment5 = await payload.create({
      collection: 'apartments',
      data: {
        apartmentName: 'City View',
        capacity: 3,
        owner: owner3.id,
        hasAC: true,
        hasIron: true,
        hasIroningBoard: true,
        otherAmenities: ['WiFi', 'City View', 'Balcony', 'Modern Kitchen'],
        description: 'Modern apartment with stunning city skyline views',
      },
    })

    const apartment6 = await payload.create({
      collection: 'apartments',
      data: {
        apartmentName: 'Garden Suite',
        capacity: 4,
        owner: owner3.id,
        hasAC: true,
        hasIron: false,
        hasIroningBoard: true,
        otherAmenities: ['WiFi', 'Private Garden', 'Terrace', 'Outdoor Seating'],
        description: 'Ground floor apartment with private garden access',
      },
    })

    const apartment7 = await payload.create({
      collection: 'apartments',
      data: {
        apartmentName: 'Mountain Nest',
        capacity: 6,
        owner: owner4.id,
        hasAC: false,
        hasIron: true,
        hasIroningBoard: true,
        otherAmenities: ['WiFi', 'Mountain View', 'Fireplace', 'Hiking Access'],
        description: 'Rustic apartment with mountain views and hiking trails nearby',
      },
    })

    const apartment8 = await payload.create({
      collection: 'apartments',
      data: {
        apartmentName: 'Riverside Retreat',
        capacity: 3,
        owner: owner5.id,
        hasAC: true,
        hasIron: true,
        hasIroningBoard: false,
        otherAmenities: ['WiFi', 'River View', 'Balcony', 'Fishing Access'],
        description: 'Peaceful apartment overlooking the river with fishing access',
      },
    })

    // Create Cleaners
    console.log('Creating cleaners...')
    const cleaner1 = await payload.create({
      collection: 'cleaners',
      data: {
        cleanerName: 'Sandra',
        assignedApartments: [apartment1.id, apartment2.id],
        fixedCleaningPricePerApartment: 25.0,
        cleaningEarningPercentage: 90,
        contactInfo: {
          phone: '+381 64 111 2222',
          email: 'sandra.cleaner@email.com',
          address: 'Zvezdara, Belgrade',
        },
        availability: {
          isActive: true,
          preferredWorkingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          notes: 'Available weekdays, prefers morning shifts',
        },
        performance: {
          totalJobsCompleted: 45,
          averageRating: 4.8,
          lastCleaningDate: '2024-01-15',
        },
      },
    })

    const cleaner2 = await payload.create({
      collection: 'cleaners',
      data: {
        cleanerName: 'Sneza',
        assignedApartments: [apartment3.id, apartment4.id],
        fixedCleaningPricePerApartment: 30.0,
        cleaningEarningPercentage: 85,
        contactInfo: {
          phone: '+381 65 333 4444',
          email: 'sneza.cleaner@email.com',
          address: 'New Belgrade, Belgrade',
        },
        availability: {
          isActive: true,
          preferredWorkingDays: ['tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
          notes: 'Flexible schedule, can work weekends',
        },
        performance: {
          totalJobsCompleted: 32,
          averageRating: 4.6,
          lastCleaningDate: '2024-01-14',
        },
      },
    })

    const _cleaner3 = await payload.create({
      collection: 'cleaners',
      data: {
        cleanerName: 'Suada',
        assignedApartments: [apartment5.id, apartment6.id],
        fixedCleaningPricePerApartment: 28.0,
        cleaningEarningPercentage: 88,
        contactInfo: {
          phone: '+381 63 777 8888',
          email: 'suada.cleaner@email.com',
          address: 'Vračar, Belgrade',
        },
        availability: {
          isActive: true,
          preferredWorkingDays: ['monday', 'wednesday', 'friday', 'saturday', 'sunday'],
          notes: 'Experienced cleaner, specializes in deep cleaning',
        },
        performance: {
          totalJobsCompleted: 67,
          averageRating: 4.9,
          lastCleaningDate: '2024-01-16',
        },
      },
    })

    const _cleaner4 = await payload.create({
      collection: 'cleaners',
      data: {
        cleanerName: 'Elena',
        assignedApartments: [apartment7.id, apartment8.id],
        fixedCleaningPricePerApartment: 32.0,
        cleaningEarningPercentage: 87,
        contactInfo: {
          phone: '+381 64 555 6666',
          email: 'elena.cleaner@email.com',
          address: 'Palilula, Belgrade',
        },
        availability: {
          isActive: true,
          preferredWorkingDays: ['monday', 'tuesday', 'thursday', 'friday', 'saturday'],
          notes: 'Specializes in luxury property cleaning',
        },
        performance: {
          totalJobsCompleted: 28,
          averageRating: 4.7,
          lastCleaningDate: '2024-01-13',
        },
      },
    })

    const _cleaner5 = await payload.create({
      collection: 'cleaners',
      data: {
        cleanerName: 'Marija',
        assignedApartments: [apartment1.id, apartment3.id, apartment5.id],
        fixedCleaningPricePerApartment: 26.0,
        cleaningEarningPercentage: 89,
        contactInfo: {
          phone: '+381 65 777 9999',
          email: 'marija.cleaner@email.com',
          address: 'Stari Grad, Belgrade',
        },
        availability: {
          isActive: true,
          preferredWorkingDays: [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
          ],
          notes: 'Most experienced cleaner, handles complex cleaning tasks',
        },
        performance: {
          totalJobsCompleted: 89,
          averageRating: 4.9,
          lastCleaningDate: '2024-01-17',
        },
      },
    })

    const _cleaner6 = await payload.create({
      collection: 'cleaners',
      data: {
        cleanerName: 'Jelena',
        assignedApartments: [apartment2.id, apartment4.id],
        fixedCleaningPricePerApartment: 27.0,
        cleaningEarningPercentage: 86,
        contactInfo: {
          phone: '+381 63 222 3333',
          email: 'jelena.cleaner@email.com',
          address: 'Savski Venac, Belgrade',
        },
        availability: {
          isActive: true,
          preferredWorkingDays: ['wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          notes: 'Weekend specialist, available for urgent cleanings',
        },
        performance: {
          totalJobsCompleted: 41,
          averageRating: 4.5,
          lastCleaningDate: '2024-01-12',
        },
      },
    })

    const _cleaner7 = await payload.create({
      collection: 'cleaners',
      data: {
        cleanerName: 'Ana',
        assignedApartments: [apartment6.id, apartment8.id],
        fixedCleaningPricePerApartment: 24.0,
        cleaningEarningPercentage: 91,
        contactInfo: {
          phone: '+381 64 444 5555',
          email: 'ana.cleaner@email.com',
          address: 'Čukarica, Belgrade',
        },
        availability: {
          isActive: true,
          preferredWorkingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          notes: 'New team member, eager to learn and improve',
        },
        performance: {
          totalJobsCompleted: 12,
          averageRating: 4.3,
          lastCleaningDate: '2024-01-11',
        },
      },
    })

    const _cleaner8 = await payload.create({
      collection: 'cleaners',
      data: {
        cleanerName: 'Katarina',
        assignedApartments: [apartment7.id],
        fixedCleaningPricePerApartment: 29.0,
        cleaningEarningPercentage: 88,
        contactInfo: {
          phone: '+381 65 666 7777',
          email: 'katarina.cleaner@email.com',
          address: 'Rakovica, Belgrade',
        },
        availability: {
          isActive: false,
          preferredWorkingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
          notes: 'Currently on maternity leave, will return in March',
        },
        performance: {
          totalJobsCompleted: 56,
          averageRating: 4.8,
          lastCleaningDate: '2023-12-20',
        },
      },
    })

    // Create Reservations
    console.log('Creating reservations...')
    const _reservation1 = await payload.create({
      collection: 'reservations',
      data: {
        reservationId: 'BEDS24-2024-001',
        apartment: apartment1.id,
        checkInDateTime: '2024-02-01T15:00:00.000Z',
        checkOutDateTime: '2024-02-05T11:00:00.000Z',
        numberOfNights: 4,
        numberOfAdults: 2,
        numberOfChildren: 1,
        cribNeeded: true,
        guestPaidAmount: 320.0,
        siteCommissionPercentage: 15.0,
        siteCommissionAmount: 48.0,
        isCancelled: false,
        confirmedArrivalTime: '2024-02-01T16:00:00.000Z',
        earlyCheckInRequested: false,
        luggageStorageOffered: true,
        guestDetails: {
          guestName: 'John Smith',
          guestEmail: 'john.smith@email.com',
          guestPhone: '+1 555 123 4567',
          specialRequests: 'Need baby crib and high chair',
        },
        bookingSource: 'beds24',
        notes: 'Family with young child, first time visitors to Belgrade',
      },
    })

    const _reservation2 = await payload.create({
      collection: 'reservations',
      data: {
        reservationId: 'BOOKING-2024-002',
        apartment: apartment2.id,
        checkInDateTime: '2024-02-10T14:00:00.000Z',
        checkOutDateTime: '2024-02-12T10:00:00.000Z',
        numberOfNights: 2,
        numberOfAdults: 2,
        numberOfChildren: 0,
        cribNeeded: false,
        guestPaidAmount: 180.0,
        siteCommissionPercentage: 18.0,
        siteCommissionAmount: 32.4,
        isCancelled: false,
        confirmedArrivalTime: '2024-02-10T15:00:00.000Z',
        earlyCheckInRequested: true,
        luggageStorageOffered: false,
        guestDetails: {
          guestName: 'Maria Garcia',
          guestEmail: 'maria.garcia@email.com',
          guestPhone: '+34 666 789 012',
          specialRequests: 'Early check-in requested',
        },
        bookingSource: 'booking',
        notes: 'Business travelers, need early check-in',
      },
    })

    const _reservation3 = await payload.create({
      collection: 'reservations',
      data: {
        reservationId: 'AIRBNB-2024-003',
        apartment: apartment3.id,
        checkInDateTime: '2024-02-15T16:00:00.000Z',
        checkOutDateTime: '2024-02-20T11:00:00.000Z',
        numberOfNights: 5,
        numberOfAdults: 4,
        numberOfChildren: 2,
        cribNeeded: true,
        guestPaidAmount: 450.0,
        siteCommissionPercentage: 12.0,
        siteCommissionAmount: 54.0,
        isCancelled: false,
        confirmedArrivalTime: '2024-02-15T17:00:00.000Z',
        earlyCheckInRequested: false,
        luggageStorageOffered: true,
        guestDetails: {
          guestName: 'David Johnson',
          guestEmail: 'david.johnson@email.com',
          guestPhone: '+44 7700 900123',
          specialRequests: 'Family with two children, need extra towels',
        },
        bookingSource: 'airbnb',
        notes: 'Large family, staying for 5 nights',
      },
    })

    // Create Cleaning Jobs
    console.log('Creating cleaning jobs...')
    const cleaningJob1 = await payload.create({
      collection: 'cleaning-jobs',
      data: {
        cleaningJobId: 'CLEAN-2024-001',
        apartment: apartment1.id,
        cleaningDate: '2024-02-05',
        cleaner: cleaner1.id,
        cleaningOrderPriority: 1,
        climateControlInstruction: 'turn_on',
        toiletPaperRollsNeeded: 4,
        additionalSofaTowelsLinen: false,
        doubleLinenTowelsNeeded: true,
        linenDetails: {
          numberOfBeds: 2,
          numberOfSofas: 1,
          linenWashingPrice: 15.0,
        },
        financialDetails: {
          totalOwnerCostForCleaning: 40.0,
          cleanerEarnings: 22.5,
          agencyMarginOnCleaning: 2.5,
          laundryCost: 12.0,
          agencyEarningsFromLinen: 3.0,
        },
        jobStatus: 'completed',
        completionDetails: {
          actualStartTime: '2024-02-05T09:00:00.000Z',
          actualEndTime: '2024-02-05T11:30:00.000Z',
          qualityCheckPassed: true,
          qualityCheckNotes: 'Excellent cleaning, all areas spotless',
        },
        specialInstructions: 'Family with baby, ensure all surfaces are sanitized',
        notes: 'Standard cleaning completed on time',
      },
    })

    const _cleaningJob2 = await payload.create({
      collection: 'cleaning-jobs',
      data: {
        cleaningJobId: 'CLEAN-2024-002',
        apartment: apartment2.id,
        cleaningDate: '2024-02-12',
        cleaner: cleaner2.id,
        cleaningOrderPriority: 2,
        climateControlInstruction: 'set_temperature',
        climateControlTemperature: 22,
        toiletPaperRollsNeeded: 2,
        additionalSofaTowelsLinen: false,
        doubleLinenTowelsNeeded: false,
        linenDetails: {
          numberOfBeds: 1,
          numberOfSofas: 0,
          linenWashingPrice: 8.0,
        },
        financialDetails: {
          totalOwnerCostForCleaning: 38.0,
          cleanerEarnings: 25.5,
          agencyMarginOnCleaning: 4.5,
          laundryCost: 6.0,
          agencyEarningsFromLinen: 2.0,
        },
        jobStatus: 'scheduled',
        specialInstructions: 'Business travelers, quick turnaround needed',
        notes: 'Scheduled for early morning cleaning',
      },
    })

    // Create Owner Expenses
    console.log('Creating owner expenses...')
    const expense1 = await payload.create({
      collection: 'owner-expenses',
      data: {
        ownerExpenseId: 'EXP-2024-001',
        owner: owner1.id,
        expenseDate: '2024-01-15',
        itemDescription: 'Toilet paper and cleaning supplies',
        expenseCategory: 'cleaning_supplies',
        baseCost: 25.0,
        agencyMargin: 10.0,
        totalCostToOwner: 27.5,
        supplier: 'Belgrade Supplies Co.',
        invoiceNumber: 'INV-2024-001',
        paymentStatus: 'paid',
        paymentDate: '2024-01-16',
        notes: 'Monthly supply restock for Noah and Sunny apartments',
      },
    })

    const _expense2 = await payload.create({
      collection: 'owner-expenses',
      data: {
        ownerExpenseId: 'EXP-2024-002',
        owner: owner2.id,
        expenseDate: '2024-01-20',
        itemDescription: 'AC maintenance and repair',
        expenseCategory: 'maintenance',
        baseCost: 120.0,
        agencyMargin: 15.0,
        totalCostToOwner: 138.0,
        supplier: 'Cool Air Services',
        invoiceNumber: 'INV-2024-002',
        paymentStatus: 'pending',
        notes: 'AC unit repair in Red apartment',
      },
    })

    // Create Payment Details
    console.log('Creating payment details...')
    const _payment1 = await payload.create({
      collection: 'payment-details',
      data: {
        paymentDetailId: 'PAY-2024-001',
        paymentMethod: 'card',
        amountDirectToOwner: 0,
        totalPaymentAmount: 320.0,
        paymentDate: '2024-01-25T10:30:00.000Z',
        status: 'completed',
        transactionId: 'TXN-123456789',
        paymentProcessor: 'stripe',
        processingFee: 9.6,
        netAmount: 310.4,
        currency: 'EUR',
        notes: 'Payment processed successfully via Stripe',
      },
    })

    const _payment2 = await payload.create({
      collection: 'payment-details',
      data: {
        paymentDetailId: 'PAY-2024-002',
        paymentMethod: 'direct_to_owner',
        amountDirectToOwner: 147.6,
        totalPaymentAmount: 180.0,
        paymentDate: '2024-01-28T14:15:00.000Z',
        status: 'completed',
        transactionId: 'TXN-987654321',
        paymentProcessor: 'booking',
        processingFee: 5.4,
        netAmount: 174.6,
        currency: 'EUR',
        notes: 'Direct payment to owner account after commission',
      },
    })

    // Create Monthly Owner Ledger
    console.log('Creating monthly owner ledger...')
    const _ledger1 = await payload.create({
      collection: 'monthly-owner-ledger',
      data: {
        ledgerEntryId: 'LEDGER-2024-01-001',
        owner: owner1.id,
        month: '2024-01-01',
        cleaningJob: cleaningJob1.id,
        ownerExpense: expense1.id,
        financialSummary: {
          guestPaidAmount: 320.0,
          siteCommissionAmount: 48.0,
          totalOwnerCostForCleaning: 40.0,
          otherExpensesAmount: 27.5,
          totalEarnings: 272.0,
          netIncome: 204.5,
        },
        paymentDetails: {
          paymentMethod: 'card',
          amountDirectToOwner: 0,
          paymentDate: '2024-01-25',
        },
        status: 'approved',
        breakdown: {
          reservationCount: 1,
          cleaningJobsCount: 1,
          expensesCount: 1,
          averageStayLength: 4.0,
          occupancyRate: 12.9,
        },
        notes: 'January 2024 ledger for Noah and Sunny apartments',
        generatedDate: '2024-01-31T23:59:59.000Z',
        lastUpdated: '2024-01-31T23:59:59.000Z',
      },
    })

    console.log('✅ Database seeding completed successfully!')
    console.log('📊 Created:')
    console.log(
      `   - ${5} users (admin@example.com, manager@example.com, staff@example.com, cleaning@example.com, finance@example.com)`,
    )
    console.log(
      `   - ${5} owners (Marko Petrović, Ana Jovanović, Dragan Kovačević, Milica Stanković, Ivan Đorđević)`,
    )
    console.log(
      `   - ${8} apartments (Sunny, Ocean, Noah, Blue Lagoon, City View, Garden Suite, Mountain Nest, Riverside Retreat)`,
    )
    console.log(`   - ${8} cleaners (Sandra, Sneza, Suada, Elena, Marija, Jelena, Ana, Katarina)`)
    console.log(`   - ${3} reservations`)
    console.log(`   - ${2} cleaning jobs`)
    console.log(`   - ${2} owner expenses`)
    console.log(`   - ${2} payment details`)
    console.log(`   - ${1} monthly ledger entry`)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    if (payload.db && payload.db.destroy) {
      await payload.db.destroy()
    }
  }
}

seed()
