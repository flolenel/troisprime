import '@/app/globals.css'
import { Navigation } from '@/components/Navigation'
import ClickSpark from '@/components/ClickSpark'
import Image from 'next/image'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClickSpark
      sparkColor="#FC431F"
      sparkCount={8}
      sparkSize={12}
      sparkRadius={22}
      duration={500}
      className="min-h-screen flex flex-col"
    >
      <Navigation />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="border-t border-white/60 py-6 text-center text-sm text-gray-400">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Image
            src="/TroisPrime.png"
            alt="TroisPrime"
            height={24}
            width={90}
            className="object-contain"
          />
        </div>
        INTERNAL USE ONLY
      </footer>
    </ClickSpark>
  )
}
