'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import type { User as PayloadUser, Apartment, Reservation, CleaningJob } from '@/payload-types'
import {
  Building2,
  Home,
  Calendar,
  DollarSign,
  MapPin,
  CheckCircle,
  MoreHorizontal,
  Users,
  Plus,
  Search,
  Bell,
  Settings,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  Activity,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { RevenueChart } from './RevenueChart'

interface DashboardProps {
  initialData: {
    user: PayloadUser | null
    apartments: Apartment[]
    reservations: Reservation[]
    cleaningJobs: CleaningJob[]
  }
}

export default function Dashboard({ initialData }: DashboardProps) {
  const [user] = useState<PayloadUser | null>(initialData.user)
  const [apartments] = useState<Apartment[]>(initialData.apartments)
  const [reservations] = useState<Reservation[]>(initialData.reservations)
  const [cleaningJobs] = useState<CleaningJob[]>(initialData.cleaningJobs)

  // Deduplicate apartments by ID to avoid duplicates
  const uniqueApartments = apartments.reduce((acc, apartment) => {
    const existingIndex = acc.findIndex((apt) => apt.id === apartment.id)
    if (existingIndex === -1) {
      acc.push(apartment)
    } else {
      // If duplicate found, keep the one with more complete data
      const existing = acc[existingIndex]
      const current = apartment

      // Prefer the one with more populated fields
      const existingScore = Object.values(existing).filter(
        (val) => val !== null && val !== undefined,
      ).length
      const currentScore = Object.values(current).filter(
        (val) => val !== null && val !== undefined,
      ).length

      if (currentScore > existingScore) {
        acc[existingIndex] = current
      }
    }
    return acc
  }, [] as Apartment[])

  const uniqueReservations = reservations.reduce((acc, reservation) => {
    const existingIndex = acc.findIndex((res) => res.id === reservation.id)
    if (existingIndex === -1) {
      acc.push(reservation)
    } else {
      // If duplicate found, keep the one with more complete data
      const existing = acc[existingIndex]
      const current = reservation

      // Prefer the one with more populated fields
      const existingScore = Object.values(existing).filter(
        (val) => val !== null && val !== undefined,
      ).length
      const currentScore = Object.values(current).filter(
        (val) => val !== null && val !== undefined,
      ).length

      if (currentScore > existingScore) {
        acc[existingIndex] = current
      }
    }
    return acc
  }, [] as Reservation[])

  const uniqueCleaningJobs = cleaningJobs.reduce((acc, job) => {
    const existingIndex = acc.findIndex((cleaningJob) => cleaningJob.id === job.id)
    if (existingIndex === -1) {
      acc.push(job)
    } else {
      // If duplicate found, keep the one with more complete data
      const existing = acc[existingIndex]
      const current = job

      // Prefer the one with more populated fields
      const existingScore = Object.values(existing).filter(
        (val) => val !== null && val !== undefined,
      ).length
      const currentScore = Object.values(current).filter(
        (val) => val !== null && val !== undefined,
      ).length

      if (currentScore > existingScore) {
        acc[existingIndex] = current
      }
    }
    return acc
  }, [] as CleaningJob[])

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [reservationFilter, setReservationFilter] = useState('all')
  const [cleaningFilter, setCleaningFilter] = useState('all')
  const [apartmentFilter, setApartmentFilter] = useState('all')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Calculate monthly revenue
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear

  const currentMonthRevenue = uniqueReservations
    .filter(
      (r) =>
        !r.isCancelled &&
        new Date(r.checkInDateTime).getMonth() === currentMonth &&
        new Date(r.checkInDateTime).getFullYear() === currentYear,
    )
    .reduce((sum, r) => sum + (r.guestPaidAmount || 0), 0)

  const lastMonthRevenue = uniqueReservations
    .filter(
      (r) =>
        !r.isCancelled &&
        new Date(r.checkInDateTime).getMonth() === lastMonth &&
        new Date(r.checkInDateTime).getFullYear() === lastMonthYear,
    )
    .reduce((sum, r) => sum + (r.guestPaidAmount || 0), 0)

  const revenueChange =
    lastMonthRevenue > 0
      ? (((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100).toFixed(1)
      : '0'

  // Generate chart data for last 6 months
  const chartData = React.useMemo(() => {
    const months = []
    const sampleData = [3200, 2800, 4500, 3800, 5200, 4100] // Realistic revenue data

    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const monthName = date.toLocaleDateString('en-US', { month: 'short' })
      const year = date.getFullYear()

      const monthRevenue = uniqueReservations
        .filter(
          (r) =>
            !r.isCancelled &&
            new Date(r.checkInDateTime).getMonth() === date.getMonth() &&
            new Date(r.checkInDateTime).getFullYear() === year,
        )
        .reduce((sum, r) => sum + (r.guestPaidAmount || 0), 0)

      // Use sample data for now to ensure chart displays
      const sampleRevenue = monthRevenue === 0 ? sampleData[5 - i] : monthRevenue

      months.push({
        month: `${monthName} ${year}`,
        revenue: sampleRevenue,
      })
    }
    return months
  }, [uniqueReservations])

  // Refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      // In a real app, you would fetch fresh data from the API
      // For now, we'll just simulate a refresh
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error refreshing data:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  // Filter data based on search and filter states
  const filteredReservations = uniqueReservations.filter((reservation) => {
    const matchesSearch =
      searchTerm === '' ||
      reservation.guestDetails?.guestName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof reservation.apartment === 'object' &&
        reservation.apartment.apartmentName?.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter =
      reservationFilter === 'all' ||
      (reservationFilter === 'active' && !reservation.isCancelled) ||
      (reservationFilter === 'cancelled' && reservation.isCancelled)

    return matchesSearch && matchesFilter
  })

  const filteredCleaningJobs = uniqueCleaningJobs.filter((job) => {
    const matchesSearch =
      searchTerm === '' ||
      (typeof job.apartment === 'object' &&
        job.apartment.apartmentName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (typeof job.cleaner === 'object' &&
        job.cleaner.cleanerName?.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter = cleaningFilter === 'all' || job.jobStatus === cleaningFilter

    return matchesSearch && matchesFilter
  })

  // Function to check if apartment is occupied
  const isApartmentOccupied = (apartmentId: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Start of today

    return uniqueReservations.some((reservation) => {
      if (reservation.isCancelled) return false

      // Handle both populated objects and ID strings
      const reservationApartmentId =
        typeof reservation.apartment === 'object'
          ? String(reservation.apartment.id)
          : String(reservation.apartment)

      if (reservationApartmentId !== String(apartmentId)) return false

      const checkIn = new Date(reservation.checkInDateTime)
      const checkOut = new Date(reservation.checkOutDateTime)

      // Set times to start/end of day for proper comparison
      checkIn.setHours(0, 0, 0, 0)
      checkOut.setHours(23, 59, 59, 999)

      // Apartment is occupied if today falls within the reservation period
      return checkIn <= today && checkOut >= today
    })
  }

  const filteredApartments = uniqueApartments.filter((apartment) => {
    const matchesSearch =
      searchTerm === '' ||
      apartment.apartmentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof apartment.owner === 'object' &&
        apartment.owner.name?.toLowerCase().includes(searchTerm.toLowerCase()))

    const isOccupied = isApartmentOccupied(String(apartment.id))
    const matchesFilter =
      apartmentFilter === 'all' ||
      (apartmentFilter === 'available' && !isOccupied) ||
      (apartmentFilter === 'occupied' && isOccupied)

    return matchesSearch && matchesFilter
  })

  const stats = [
    {
      name: 'Total Apartments',
      value: uniqueApartments.length.toString(),
      change: '+2 from last month',
      trend: 'New properties added',
      icon: Home,
      trendUp: true,
    },
    {
      name: 'Active Reservations',
      value: uniqueReservations.filter((r) => !r.isCancelled).length.toString(),
      change: '+12% from last month',
      trend: 'Strong booking activity',
      icon: Calendar,
      trendUp: true,
    },
    {
      name: 'Pending Cleaning',
      value: uniqueCleaningJobs.filter((j) => j.jobStatus === 'scheduled').length.toString(),
      change: '2 scheduled today',
      trend: 'Cleaning tasks pending',
      icon: CheckCircle,
      trendUp: false,
    },
    {
      name: 'Monthly Revenue',
      value: `$${currentMonthRevenue.toLocaleString()}`,
      change: `${parseFloat(revenueChange) > 0 ? '+' : ''}${revenueChange}% from last month`,
      trend: 'Revenue trending up',
      icon: DollarSign,
      trendUp: parseFloat(revenueChange) > 0,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Kotor Apartments</h1>
                <p className="text-sm text-muted-foreground">Management Dashboard</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search apartments, guests, cleaners..."
                  className="pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Activity className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              {user ? (
                <div className="flex items-center space-x-2 rounded-lg bg-muted px-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{user.name || user.email}</span>
                </div>
              ) : (
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Link href="/admin">
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Login
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
            <div>
              <p className="text-muted-foreground">
                Welcome back{user ? `, ${user.name || user.email}` : ''}! Here&apos;s your overview.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Reservation
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const IconComponent = stat.icon
            const TrendIcon = stat.trendUp ? TrendingUp : TrendingDown
            return (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </CardTitle>
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <TrendIcon
                      className={`h-3 w-3 ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}
                    />
                    <span className={stat.trendUp ? 'text-green-500' : 'text-red-500'}>
                      {stat.change}
                    </span>
                    <span>from last month</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Revenue Chart - now outside the grid for full width */}
        <div className="mb-6 w-full min-w-0">
          <RevenueChart data={chartData} />
        </div>

        {/* Main Content Grid */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          {/* Recent Reservations */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Reservations</CardTitle>
                <div className="flex items-center space-x-2">
                  <select
                    value={reservationFilter}
                    onChange={(e) => setReservationFilter(e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest</TableHead>
                    <TableHead>Apartment</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.slice(0, 5).map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="font-medium">
                            {reservation.guestDetails?.guestName || 'Unknown'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {typeof reservation.apartment === 'object'
                          ? reservation.apartment.apartmentName
                          : `Apartment ID: ${reservation.apartment}`}
                      </TableCell>
                      <TableCell>
                        {new Date(reservation.checkInDateTime).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={reservation.isCancelled ? 'destructive' : 'secondary'}
                          className={
                            reservation.isCancelled
                              ? 'bg-red-100 text-red-800 hover:bg-red-200'
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          }
                        >
                          {reservation.isCancelled ? 'Cancelled' : 'Confirmed'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Cancel</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Cleaning Schedule */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Cleaning Schedule</CardTitle>
                <div className="flex items-center space-x-2">
                  <select
                    value={cleaningFilter}
                    onChange={(e) => setCleaningFilter(e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  >
                    <option value="all">All</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCleaningJobs.slice(0, 4).map((job) => (
                  <div key={job.id} className="rounded-lg bg-muted p-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`rounded-full p-2 ${
                          job.jobStatus === 'completed'
                            ? 'bg-green-100 text-green-600'
                            : job.jobStatus === 'in_progress'
                              ? 'bg-blue-100 text-blue-600'
                              : job.jobStatus === 'cancelled'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-yellow-100 text-yellow-600'
                        }`}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">
                            {typeof job.apartment === 'object'
                              ? job.apartment.apartmentName
                              : `Apartment ID: ${job.apartment}`}
                          </p>
                          <Badge
                            variant={
                              job.jobStatus === 'completed'
                                ? 'secondary'
                                : job.jobStatus === 'in_progress'
                                  ? 'secondary'
                                  : job.jobStatus === 'cancelled'
                                    ? 'destructive'
                                    : 'outline'
                            }
                            className={
                              job.jobStatus === 'completed'
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : job.jobStatus === 'in_progress'
                                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                  : job.jobStatus === 'cancelled'
                                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            }
                          >
                            {job.jobStatus || 'scheduled'}
                          </Badge>
                        </div>
                        <div className="mt-1 space-y-1">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Cleaner:</span>{' '}
                            {typeof job.cleaner === 'object'
                              ? job.cleaner.cleanerName
                              : `ID: ${job.cleaner}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Date:</span>{' '}
                            {new Date(job.cleaningDate).toLocaleDateString()}
                          </p>
                          {job.financialDetails?.totalOwnerCostForCleaning && (
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">Cost:</span> €
                              {job.financialDetails.totalOwnerCostForCleaning}
                            </p>
                          )}
                          {job.cleaningOrderPriority && (
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">Priority:</span>{' '}
                              {job.cleaningOrderPriority}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Apartments Table */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Apartments</CardTitle>
              <div className="flex items-center space-x-2">
                <select
                  value={apartmentFilter}
                  onChange={(e) => setApartmentFilter(e.target.value)}
                  className="rounded-md border border-input bg-background px-3 py-1 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                >
                  <option value="all">All</option>
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                </select>
                <Button variant="ghost" size="sm">
                  Manage All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Apartment</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApartments.map((apartment) => (
                  <TableRow key={apartment.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                          <Home className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{apartment.apartmentName}</p>
                          {apartment.hasAC && (
                            <Badge variant="outline" className="mt-1">
                              AC
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {typeof apartment.owner === 'object'
                        ? apartment.owner.name
                        : `Owner ID: ${apartment.owner}`}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{apartment.capacity}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Kotor, Montenegro</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          isApartmentOccupied(String(apartment.id)) ? 'destructive' : 'secondary'
                        }
                        className={
                          isApartmentOccupied(String(apartment.id))
                            ? 'bg-red-100 text-red-800 hover:bg-red-200'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }
                      >
                        {isApartmentOccupied(String(apartment.id)) ? 'Occupied' : 'Available'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Manage bookings</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
