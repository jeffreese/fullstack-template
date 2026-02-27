import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

const url = process.env.DATABASE_URL || 'sqlite.db'
const sqlite = new Database(url)
sqlite.pragma('journal_mode = WAL')
const db = drizzle(sqlite, { schema })

async function seed() {
  console.log('Seeding database...')

  // Clear existing data
  db.delete(schema.posts).run()
  db.delete(schema.session).run()
  db.delete(schema.account).run()
  db.delete(schema.verification).run()
  db.delete(schema.user).run()

  console.log('Seed complete. Register a user through the app to get started.')
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
