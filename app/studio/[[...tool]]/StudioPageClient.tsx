'use client'

import dynamic from 'next/dynamic'

// Both NextStudio AND sanity.config must be loaded client-side only.
// sanity's internals call React.createContext at module init time,
// which crashes in the RSC (server) context.
const StudioWithConfig = dynamic(
  async () => {
    const [{ NextStudio }, { default: config }] = await Promise.all([
      import('next-sanity/studio'),
      import('@/sanity.config'),
    ])
    function Studio() {
      return <NextStudio config={config} />
    }
    Studio.displayName = 'Studio'
    return Studio
  },
  { ssr: false }
)

export default function StudioPageClient() {
  return <StudioWithConfig />
}
