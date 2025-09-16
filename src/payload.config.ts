// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Owners } from './collections/Owners'
import { Apartments } from './collections/Apartments'
import { Reservations } from './collections/Reservations'
import { Cleaners } from './collections/Cleaners'
import { CleaningJobs } from './collections/CleaningJobs'
import { OwnerExpenses } from './collections/OwnerExpenses'
import { PaymentDetails } from './collections/PaymentDetails'
import { MonthlyOwnerLedger } from './collections/MonthlyOwnerLedger'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Owners,
    Apartments,
    Reservations,
    Cleaners,
    CleaningJobs,
    OwnerExpenses,
    PaymentDetails,
    MonthlyOwnerLedger,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
