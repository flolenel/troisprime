// Metadata & viewport must be exported from a server component.
// The actual studio is loaded client-side only (see StudioPageClient)
// because sanity's modules call React.createContext at init time,
// which is incompatible with React Server Components.
export { metadata, viewport } from 'next-sanity/studio'

export const dynamic = 'force-dynamic'

import StudioPageClient from './StudioPageClient'

export default function StudioPage() {
  return <StudioPageClient />
}
