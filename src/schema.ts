import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const paidUsers = pgTable('paid-users', {
  id: serial('id').primaryKey(),
  variantId: varchar('variant_id', { length: 256 }),
  paidAt: timestamp('paid_at').defaultNow(),
  userId: varchar('user_id', { length: 256 }),
})

export const schema = {
  paidUsers,
}
