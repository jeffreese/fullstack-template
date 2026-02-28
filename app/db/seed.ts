import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

const url = process.env.DATABASE_URL || 'sqlite.db'
const sqlite = new Database(url)
sqlite.pragma('journal_mode = WAL')
const db = drizzle(sqlite, { schema })

const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'sqlite', schema }),
  emailAndPassword: { enabled: true },
})

async function seed() {
  console.log('Seeding database...')

  // Clear existing data
  db.delete(schema.posts).run()
  db.delete(schema.session).run()
  db.delete(schema.account).run()
  db.delete(schema.verification).run()
  db.delete(schema.user).run()

  // Create test user via better-auth (handles password hashing)
  const result = await auth.api.signUpEmail({
    body: {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    },
  })

  if (!result) {
    throw new Error('Failed to create test user')
  }

  console.log('Created test user:')
  console.log('  Email:    test@example.com')
  console.log('  Password: password123')
  console.log('Seed complete.')
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
