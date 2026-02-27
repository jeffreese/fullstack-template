import type { ButtonHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

const variants = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary-dark focus-visible:ring-primary',
  secondary:
    'bg-surface-raised text-text border border-border hover:bg-surface-hover focus-visible:ring-primary',
  danger: 'bg-danger text-white hover:bg-danger/90 focus-visible:ring-danger',
  ghost:
    'text-text-muted hover:bg-surface-hover hover:text-text focus-visible:ring-primary',
} as const

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
}

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
