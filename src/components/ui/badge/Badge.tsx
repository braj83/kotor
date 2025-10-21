import React from 'react'
import { Badge as BaseBadge } from '@/components/ui/badge'

type CompatProps = React.ComponentProps<typeof BaseBadge> & {
  size?: 'sm' | 'md' | 'lg'
  color?: 'success' | 'warning' | 'error' | string
}

export default function Badge({ size, color, children, ...rest }: CompatProps) {
  // map color to variant
  let variant: any = undefined
  if (color === 'success') variant = 'default'
  if (color === 'warning') variant = 'secondary'
  if (color === 'error') variant = 'destructive'

  return (
    <BaseBadge variant={variant} {...rest}>
      {children}
    </BaseBadge>
  )
}
