import { createClient } from '@sanity/client'

// Valider le format du projectId (a-z, 0-9, tirets uniquement)
// Utilise un fallback si la valeur est invalide (ex: placeholder avec underscore)
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const projectId = /^[a-z0-9][a-z0-9-]*$/.test(rawProjectId) ? rawProjectId : 'placeholder'

export const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_READ_TOKEN,
})
