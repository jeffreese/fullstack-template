# Deployment

The template includes a Docker setup for production deployment. Since we use
SQLite, there's no external database to configure — the database file lives
alongside the application.

## Docker

The `Dockerfile` uses a multi-stage build to keep the production image small:

1. **Base** — Node 22 Alpine with pnpm enabled via corepack
2. **Dependencies** — Installs production dependencies
3. **Build** — Runs the production build
4. **Production** — Copies only what's needed to run

Build and run:

```bash
docker build -t my-app .
docker run -p 3000:3000 \
  -e BETTER_AUTH_SECRET=your-secret-here \
  -e BETTER_AUTH_URL=http://localhost:3000 \
  my-app
```

### Persisting Data

SQLite stores data in a file. To persist it across container restarts, mount a
volume:

```bash
docker run -p 3000:3000 \
  -v ./data:/app/data \
  -e DATABASE_URL=data/sqlite.db \
  -e BETTER_AUTH_SECRET=your-secret-here \
  my-app
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | No | `sqlite.db` | Path to the SQLite database file |
| `BETTER_AUTH_SECRET` | Yes | — | Secret key for signing session cookies |
| `BETTER_AUTH_URL` | Yes | — | Public URL of the application |

### Generating a Secret

The setup script generates a random secret automatically. For production, use a
cryptographically random string:

```bash
openssl rand -base64 32
```

## Production Build

Without Docker, you can build and run directly:

```bash
pnpm build
pnpm start
```

The production server runs on port 3000 by default.

## Deployment Platforms

Since this is a Node.js server with SQLite, it works well on platforms that
support persistent file storage:

- **VPS / VM** — Any Linux server with Node 22 or Docker
- **Fly.io** — Supports persistent volumes for SQLite
- **Railway** — Supports persistent storage
- **DigitalOcean App Platform** — With persistent volumes

Serverless platforms (Vercel, Netlify, Cloudflare) are not a good fit because
SQLite needs persistent file access. If you need serverless deployment, you'd
want to swap SQLite for a hosted database.
