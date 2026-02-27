# Styling

We use [Tailwind CSS v4](https://tailwindcss.com/) with a custom theme built on
the OKLCH color space. The theme is defined entirely in `app/app.css` using
Tailwind's `@theme` directive.

## Theme System

The theme lives in `app/app.css`. It uses semantic color tokens so you can
change the entire look of the app by editing a few values:

```css
@theme {
  --color-primary: oklch(0.6 0.2 260);
  --color-accent: oklch(0.7 0.15 180);
  --color-danger: oklch(0.6 0.2 25);
  --color-warning: oklch(0.75 0.15 85);
  --color-success: oklch(0.65 0.2 145);
  /* ... */
}
```

These tokens are used throughout the app as Tailwind utility classes:
`bg-primary`, `text-danger`, `border-border`, etc.

## OKLCH Colors

We use [OKLCH](https://oklch.com/) instead of hex or HSL because it's
perceptually uniform — a lightness of 0.6 looks equally bright regardless of
hue. This makes it much easier to create harmonious color palettes and ensure
accessible contrast ratios.

Each color token has three components:
- **Lightness** (0–1): How bright the color appears
- **Chroma** (0–0.4): How saturated/vivid the color is
- **Hue** (0–360): The color wheel position

## Semantic Tokens

The theme uses semantic names rather than color names. This makes it easy to
swap the entire palette without renaming classes:

| Token | Purpose |
|-------|---------|
| `primary` | Main brand color, primary buttons |
| `accent` | Secondary brand color, highlights |
| `danger` | Errors, destructive actions |
| `warning` | Warnings, caution states |
| `success` | Success states, confirmations |
| `surface` | Page backgrounds |
| `surface-raised` | Cards, elevated elements |
| `surface-hover` | Hover states |
| `surface-sunken` | Inset/recessed areas |
| `border` | Default borders |
| `text` | Primary text |
| `text-muted` | Secondary, less prominent text |

### Sidebar Tokens

The sidebar has its own set of tokens for independent theming:

| Token | Purpose |
|-------|---------|
| `sidebar` | Sidebar background |
| `sidebar-hover` | Sidebar item hover state |
| `sidebar-text` | Sidebar text |
| `sidebar-text-muted` | Sidebar secondary text |

## Customizing Colors

To rebrand the template, edit the `@theme` block in `app/app.css`. A good
approach:

1. Pick your primary color at [oklch.com](https://oklch.com/)
2. Adjust the hue for accent, keeping similar lightness and chroma
3. Keep danger/warning/success at conventional hues (red/yellow/green)
4. Adjust surface lightness values for your desired contrast

## Utility Helper

Use the `cn()` function from `~/lib/utils` to merge Tailwind classes
conditionally:

```tsx
import { cn } from '~/lib/utils'

<div className={cn('rounded-lg p-4', isActive && 'bg-primary text-white')} />
```

This uses `clsx` + `tailwind-merge` under the hood to handle class conflicts
correctly.

## Why Tailwind v4?

See [Decision 004 — Styling](./decisions/004-styling.md) for the full reasoning
behind choosing Tailwind with OKLCH tokens.
