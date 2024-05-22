// drizzle.config.ts
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  out: './drizzle',
  schema: './src/schema.ts',
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL as string,
  },
})
