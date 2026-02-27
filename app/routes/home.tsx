import type { Route } from './+types/home'

export function meta(_args: Route.MetaArgs) {
  return [
    { title: 'Fullstack Template' },
    {
      name: 'description',
      content: 'A fullstack React Router v7 project template.',
    },
  ]
}

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-text-muted mb-6">
        Welcome to the Fullstack Template. This is your starting point for
        building full-stack applications with React Router v7.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface-raised p-4">
          <h2 className="font-semibold mb-1">Authentication</h2>
          <p className="text-sm text-text-muted">
            Email/password auth powered by better-auth with session management.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface-raised p-4">
          <h2 className="font-semibold mb-1">Database</h2>
          <p className="text-sm text-text-muted">
            SQLite with Drizzle ORM for type-safe queries and migrations.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface-raised p-4">
          <h2 className="font-semibold mb-1">Forms</h2>
          <p className="text-sm text-text-muted">
            Conform + Zod for progressive enhancement and validation.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface-raised p-4">
          <h2 className="font-semibold mb-1">Styling</h2>
          <p className="text-sm text-text-muted">
            Tailwind CSS v4 with OKLCH semantic color tokens.
          </p>
        </div>
      </div>
    </div>
  )
}
