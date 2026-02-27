# Fullstack Template

An opinionated full-stack project template built with React Router v7, TypeScript, and modern tooling. Designed as a starting point for new applications.

## Quick Start

```bash
# Clone the template
git clone https://github.com/your-username/fullstack-template.git my-app
cd my-app

# Run setup (renames project, creates .env, installs deps, migrates DB)
./setup.sh my-app

# Start developing
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to see the app.

## Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | React Router v7 (SSR) | Unified loader/action model, SSR out of the box |
| Language | TypeScript 5 (strict) | Type safety across the full stack |
| Build | Vite | Fast dev server, optimized production builds |
| Styling | Tailwind CSS v4 | Utility-first with OKLCH color system |
| Database | Drizzle ORM + SQLite | TypeScript-native schemas, zero codegen |
| Auth | better-auth | Batteries-included, session-based auth |
| Forms | Conform + Zod | Progressive enhancement, server validation |
| State | Zustand | Lightweight client UI state |
| Linting | Biome | Single tool for formatting and linting |
| Testing | Vitest + Testing Library | Fast, modern test runner |
| Icons | Lucide React | Consistent, tree-shakeable icon set |

## Commands

```bash
pnpm dev           # Start dev server
pnpm build         # Production build
pnpm start         # Run production server
pnpm lint          # Check code with Biome
pnpm lint:fix      # Auto-fix and format
pnpm typecheck     # TypeScript check
pnpm test          # Run tests
pnpm test:watch    # Tests in watch mode
pnpm db:generate   # Generate migrations
pnpm db:migrate    # Run migrations
pnpm db:push       # Push schema (dev shortcut)
pnpm db:studio     # Open Drizzle Studio GUI
pnpm db:seed       # Seed database
```

## Project Structure

```
app/
├── root.tsx            # HTML shell and error boundary
├── app.css             # Tailwind theme with OKLCH color tokens
├── routes.ts           # Route configuration
├── routes/             # Page routes (login, register, etc.)
├── components/ui/      # Reusable UI components
├── db/                 # Database schema, singleton, and seed
├── lib/                # Auth, sessions, validation, utilities
└── stores/             # Zustand client state
```

## Customization

### Colors

Edit the `@theme` block in `app/app.css` to change the color palette. Colors use OKLCH for perceptual uniformity. Key tokens:

- `--color-primary` — Main brand color
- `--color-accent` — Secondary brand color
- `--color-surface` — Background colors
- `--color-text` — Text colors

### Database

Add tables to `app/db/schema.ts` using Drizzle's `sqliteTable` helper, then run:

```bash
pnpm db:generate  # Create migration files
pnpm db:migrate   # Apply migrations
```

### Auth

better-auth supports plugins for OAuth providers, two-factor auth, passkeys, and more. See the [better-auth docs](https://www.better-auth.com/docs) to extend.

### Adding Routes

1. Create a file in `app/routes/`
2. Add the route to `app/routes.ts`
3. Add navigation links in `app/routes/layout.tsx`

## Deployment

### Docker

```bash
docker build -t my-app .
docker run -p 3000:3000 -e BETTER_AUTH_SECRET=your-secret my-app
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | SQLite database path (default: `sqlite.db`) |
| `BETTER_AUTH_SECRET` | Session encryption secret |
| `BETTER_AUTH_URL` | App URL for auth callbacks |

## AI Development

This template includes a `CLAUDE.md` file that provides structured context for AI tools like Claude Code. It documents all commands, patterns, conventions, and project structure to enable effective AI-assisted development.
