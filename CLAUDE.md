# CLAUDE.md — Fullstack Template

This file provides context for AI development tools working in this codebase.
For detailed documentation, see the [`docs/`](./docs) folder.

## Quick Reference

```bash
pnpm dev          # Start dev server (localhost:5173)
pnpm build        # Production build
pnpm start        # Run production server
pnpm lint         # Check with Biome
pnpm lint:fix     # Auto-fix lint + format
pnpm typecheck    # TypeScript check
pnpm test         # Run tests once
pnpm test:watch   # Run tests in watch mode
pnpm db:generate  # Generate Drizzle migrations
pnpm db:migrate   # Run migrations
pnpm db:push      # Push schema directly (dev)
pnpm db:studio    # Open Drizzle Studio
pnpm db:seed      # Seed database
```

## Development Workflow

**All changes go through pull requests. Never push directly to `main`.**

1. `git checkout -b feature/short-description` from latest `main`
2. Write code, tests, and update relevant documentation
3. Run `pnpm lint:fix && pnpm typecheck && pnpm test` before committing
4. Push the branch and create a PR with `gh pr create`
5. After merge: `git checkout main && git pull origin main`

- All features must have tests
- Documentation must be updated when behavior, structure, or commands change
- Use `db:generate` + `db:migrate` (not `db:push`) for committed schema changes
- Commit messages: imperative mood, explain why, <70 char summary line

See [Development Workflow](./docs/development-workflow.md) for full details.

## Tech Stack

- **Framework:** React Router v7 (SSR, framework mode)
- **Language:** TypeScript 5 (strict)
- **Build:** Vite
- **Styling:** Tailwind CSS v4 (OKLCH tokens via `:root` + `@theme inline` in `app/app.css`)
- **Components:** shadcn/ui (Radix UI + Tailwind, copy-paste model)
- **Database:** Drizzle ORM + better-sqlite3 (SQLite)
- **Auth:** better-auth (email/password, session-based)
- **Forms:** Conform + Zod (progressive enhancement)
- **State:** Zustand (client UI state only)
- **Linting:** Biome (formatting + linting)
- **Testing:** Vitest + Testing Library
- **Icons:** Lucide React

## Project Structure

```
app/
├── root.tsx                 # HTML shell, error boundary
├── app.css                  # Tailwind theme (OKLCH tokens)
├── routes.ts                # Route config
├── routes/
│   ├── layout.tsx           # Sidebar layout (auth-aware)
│   ├── home.tsx             # Dashboard
│   ├── login.tsx            # Login form (Conform)
│   ├── register.tsx         # Registration form (Conform)
│   ├── logout.tsx           # Logout action
│   ├── protected.tsx        # Auth-guarded example
│   └── api.auth.$.ts        # better-auth API handler
├── components/
│   ├── ui/                  # shadcn/ui + custom components
│   └── error-display.tsx    # Route error display component
├── db/
│   ├── index.server.ts      # DB singleton (GlobalThis pattern)
│   ├── schema.ts            # Drizzle schema (auth + app tables)
│   └── seed.ts              # Seed script
├── lib/
│   ├── auth.server.ts       # better-auth config
│   ├── auth.client.ts       # Client auth (signIn, signUp, signOut)
│   ├── session.server.ts    # requireSession / getOptionalSession
│   ├── schemas.ts           # Zod validation schemas
│   └── utils.ts             # cn() class merge helper
└── stores/
    └── ui-store.ts          # Zustand sidebar state
docs/
├── README.md                # Documentation hub
├── getting-started.md       # Setup and first run
├── routing.md               # React Router v7 conventions
├── database.md              # Drizzle ORM + SQLite
├── authentication.md        # better-auth setup and usage
├── forms.md                 # Conform + Zod patterns
├── styling.md               # Tailwind v4 + shadcn/ui theme
├── ui-patterns.md           # UI patterns (toasts, dialogs, tables)
├── state-management.md      # Server state vs client state
├── testing.md               # Vitest + Testing Library
├── linting.md               # Biome configuration
├── deployment.md            # Docker and production
└── decisions/               # Architecture decision records (ADRs)
```

## Key Patterns

### Server-only files
Files ending in `.server.ts` are excluded from client bundles. Use for database
access, auth config, and session helpers.

### Database
- Schema defined in `app/db/schema.ts` using Drizzle's `sqliteTable`
- GlobalThis singleton prevents multiple connections during HMR
- WAL mode enabled for concurrent reads
- After schema changes: `pnpm db:generate && pnpm db:migrate`

### Authentication
- better-auth handles all auth via `/api/auth/*` splat route
- Server: `requireSession(request)` redirects to `/login` if unauthenticated
- Server: `getOptionalSession(request)` returns session or null
- Client: `signIn.email()`, `signUp.email()`, `signOut()` from `auth.client.ts`

### Forms (Conform + Zod)
- Define schemas in `app/lib/schemas.ts`
- Use `parseWithZod(formData, { schema })` in route actions
- **Import from `@conform-to/zod/v4`**, not `@conform-to/zod` (required for
  Zod v4 compatibility)
- Use `useForm()` with `onValidate` for client-side validation
- Forms use progressive enhancement (work without JS)

### Styling & Components
- Tailwind v4 with `:root` + `@theme inline` in `app/app.css`
- shadcn/ui components in `app/components/ui/` (owned source code, not npm)
- OKLCH color tokens using shadcn naming: `background`, `foreground`, `card`,
  `muted`, `destructive`, `accent`, etc.
- Custom tokens: `warning`, `success`, `primary-light`, `destructive-light`, etc.
- Use `cn()` from `~/lib/utils` to merge class names
- Add new shadcn components: `pnpm dlx shadcn@latest add <component>`
- Config in `components.json` (aliases, style, CSS path)

### State Management
- Server state: React Router loaders/actions (no client cache needed)
- Client UI state: Zustand stores in `app/stores/`

### Route Conventions
- Loaders fetch data, actions handle mutations
- Use `redirect()` for navigation after mutations
- Forward `set-cookie` headers from better-auth responses

## Code Style

- No semicolons, single quotes, 2-space indent
- 80 char line width, trailing commas
- Biome handles all formatting and linting
- Run `pnpm lint:fix` before committing
- Path alias: `~/` maps to `app/`

## Testing

- Vitest config is separate from Vite (`vitest.config.ts`)
- Use `// @vitest-environment jsdom` directive for component tests
- Test utils in `test/test-utils.tsx` provide wrapped render with `act()`
- Unit tests don't need the jsdom directive

## Known Issues

- pnpm requires `node-linker=hoisted` in `.npmrc` for React Router SSR
  compatibility (prevents duplicate React instances via symlinks)
- `@conform-to/zod` default export is incompatible with Zod v4 — always use
  the `/v4` subpath import
