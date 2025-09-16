import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Kotor Apartments Management Dashboard',
  title: 'Kotor Apartments Dashboard',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
