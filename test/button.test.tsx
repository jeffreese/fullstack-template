// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { Button } from '~/components/ui/button'
import { render, screen } from './test-utils'

describe('Button', () => {
  it('renders with text', async () => {
    await render(<Button>Click me</Button>)
    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument()
  })

  it('applies primary variant by default', async () => {
    await render(<Button>Primary</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-primary')
  })

  it('applies secondary variant', async () => {
    await render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-surface-raised')
  })

  it('can be disabled', async () => {
    await render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
