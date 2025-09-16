'use client'

import * as React from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface RevenueChartProps {
  data: Array<{
    month: string
    revenue: number
  }>
}

export function RevenueChart({ data }: RevenueChartProps) {
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  // Transform data for the chart
  const chartData = React.useMemo(() => {
    if (!data || data.length === 0) {
      return []
    }

    return data.map((item, index) => ({
      date: item.month,
      current: item.revenue,
      previous: index > 0 ? data[index - 1]?.revenue || 0 : 0,
    }))
  }, [data])

  const filteredData = React.useMemo(() => {
    return chartData
  }, [chartData])

  // Only render chart on client side to avoid SSR issues
  if (!isClient) {
    return (
      <Card className="pt-0">
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
          <CardDescription>Loading chart...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] flex items-center justify-center text-muted-foreground">
            Loading chart...
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!filteredData || filteredData.length === 0) {
    return (
      <Card className="pt-0">
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] flex items-center justify-center text-muted-foreground">
            No revenue data available
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="pt-0">
      <CardHeader className="pb-3">
        <CardTitle>Revenue Trends</CardTitle>
        <CardDescription>Monthly revenue comparison over time</CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Tooltip
                contentStyle={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 8 }}
                labelStyle={{ color: '#6b7280', fontWeight: 500 }}
                formatter={(value: any, name: string) => [
                  value,
                  name === 'current' ? 'Current' : 'Previous',
                ]}
              />
              <Area
                type="monotone"
                dataKey="current"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary) / 0.1)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="previous"
                stackId="1"
                stroke="hsl(var(--muted-foreground))"
                fill="hsl(var(--muted-foreground) / 0.05)"
                strokeWidth={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
