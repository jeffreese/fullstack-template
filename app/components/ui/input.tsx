import type { InputHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export function Input({ error, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'flex w-full rounded-lg border bg-surface-raised px-3 py-2.5 text-sm transition-colors placeholder:text-text-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
        error
          ? 'border-danger focus-visible:ring-danger'
          : 'border-border hover:border-primary/40',
        className,
      )}
      {...props}
    />
  )
}
