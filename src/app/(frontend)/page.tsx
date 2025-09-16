import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { User as PayloadUser, Apartment, Reservation, CleaningJob } from '@/payload-types'
import Dashboard from './components/Dashboard'
import './styles.css'

export default async function HomePage() {
  let user: PayloadUser | null = null
  let apartments: Apartment[] = []
  let reservations: Reservation[] = []
  let cleaningJobs: CleaningJob[] = []

  try {
    const payload = await getPayload({ config })

    // Get current user
    try {
      const { user: currentUser } = await payload.auth({ headers: new Headers() })
      user = currentUser
    } catch (authError) {
      console.log('Auth failed, continuing without user:', authError)
      user = null
    }

    // Fetch data
    // Note: Populate is temporarily disabled due to TypeScript type issues
    // The relationships will be loaded as IDs instead of populated objects
    const [apartmentsResult, reservationsResult, cleaningJobsResult] = await Promise.all([
      payload.find({
        collection: 'apartments',
        limit: 50, // Increased to get more apartments
      }),
      payload.find({
        collection: 'reservations',
        limit: 20,
      }),
      payload.find({
        collection: 'cleaning-jobs',
        limit: 5,
      }),
    ])

    apartments = apartmentsResult.docs
    reservations = reservationsResult.docs
    cleaningJobs = cleaningJobsResult.docs

    console.log('Server-side data fetched:', {
      apartmentsCount: apartments.length,
      reservationsCount: reservations.length,
      cleaningJobsCount: cleaningJobs.length,
      user: user ? 'logged in' : 'not logged in',
    })

    // Debug: Log sample data to verify population
    if (reservations.length > 0) {
      console.log('Sample reservation:', {
        id: reservations[0].id,
        apartment: reservations[0].apartment,
        checkIn: reservations[0].checkInDateTime,
        checkOut: reservations[0].checkOutDateTime,
        isCancelled: reservations[0].isCancelled,
      })

      // Log all reservation apartment IDs
      console.log(
        'All reservation apartment IDs:',
        reservations.map((r) => ({
          id: r.id,
          apartmentId: typeof r.apartment === 'object' ? r.apartment.id : r.apartment,
        })),
      )
    }

    if (apartments.length > 0) {
      console.log('Sample apartment:', {
        id: apartments[0].id,
        name: apartments[0].apartmentName,
        owner: apartments[0].owner,
      })

      // Log all apartment IDs
      console.log(
        'All apartment IDs:',
        apartments.map((a) => ({
          id: a.id,
          name: a.apartmentName,
        })),
      )
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    // Set fallback empty arrays to prevent crashes
    apartments = []
    reservations = []
    cleaningJobs = []
  }

  return <Dashboard initialData={{ user, apartments, reservations, cleaningJobs }} />
}
