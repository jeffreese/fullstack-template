import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'

import type { Route } from './+types/root'
import './app.css'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = 'Something went wrong'
  let description = 'An unexpected error occurred. Please try again.'
  let is404 = false
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    is404 = error.status === 404
    title = is404 ? 'Page Not Found' : `Error ${error.status}`
    description = is404
      ? "The page you're looking for doesn't exist or has been removed."
      : error.statusText || description
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    description = error.message
    stack = error.stack
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-surface">
      <div className="text-center max-w-md mx-auto px-4">
        <div
          className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
            is404 ? 'bg-warning-light' : 'bg-danger-light'
          }`}
        >
          {is404 ? '?' : '!'}
        </div>
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-text-muted mb-6">{description}</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary-dark transition-colors"
        >
          Go to Dashboard
        </a>
        {stack && (
          <pre className="mt-6 p-4 rounded-lg bg-surface-raised text-left text-xs overflow-x-auto border border-border max-h-64 overflow-y-auto">
            <code className="text-danger">{stack}</code>
          </pre>
        )}
      </div>
    </main>
  )
}
