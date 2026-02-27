import { Shield } from 'lucide-react'
import { useLoaderData } from 'react-router'
import { requireSession } from '~/lib/session.server'
import type { Route } from './+types/protected'

export function meta() {
  return [{ title: 'Protected — Fullstack Template' }]
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await requireSession(request)
  return {
    user: session.user,
  }
}

export default function Protected() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <div className="mx-auto max-w-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Protected Page</h1>
      </div>

      <div className="rounded-lg border border-border bg-surface-raised p-6">
        <h2 className="font-semibold mb-4">Your Profile</h2>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-text-muted">Name</dt>
            <dd className="font-medium">{user.name}</dd>
          </div>
          <div>
            <dt className="text-text-muted">Email</dt>
            <dd className="font-medium">{user.email}</dd>
          </div>
          <div>
            <dt className="text-text-muted">User ID</dt>
            <dd className="font-mono text-xs text-text-light">{user.id}</dd>
          </div>
        </dl>
      </div>

      <p className="mt-4 text-sm text-text-muted">
        This page is only accessible to authenticated users. Unauthenticated
        visitors are redirected to the login page.
      </p>
    </div>
  )
}
