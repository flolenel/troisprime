import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'TroisPrime — Veille & Partage',
  description: 'Site interne de veille et partage de contenus — TroisPrime',
  robots: { index: false, follow: false }, // Site privé, ne pas indexer
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  )
}
