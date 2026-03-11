import '@/app/globals.css'
import { Navigation } from '@/components/Navigation'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="border-t border-white/60 py-6 text-center text-sm text-gray-400">
        <span className="font-extrabold">
          <span className="text-orouge">Trois</span>
          <span className="text-brand-green">Prime</span>
        </span>
        {' '}— INTERNAL USE ONLY
      </footer>
    </div>
  )
}
