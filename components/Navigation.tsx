'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { ALL_CATEGORIES } from '@/lib/constants'
import { SearchBar } from './SearchBar'
import { IconSearch, IconMenu, IconClose, IconLogout } from './icons'

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-gray shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/logo-desktop.png"
              alt="TroisPrime"
              height={36}
              width={140}
              className="hidden md:block object-contain"
              priority
            />
            <Image
              src="/logo-mobile.png"
              alt="TroisPrime"
              height={96}
              width={96}
              className="md:hidden object-contain"
              priority
            />
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/" active={isActive('/')}>Accueil</NavLink>
            {ALL_CATEGORIES.map((cat) => (
              <NavLink key={cat.id} href={cat.path} active={isActive(cat.path)} color={cat.color}>
                {cat.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions droite */}
          <div className="flex items-center gap-2">
            {/* Barre de recherche desktop */}
            <div className="hidden md:block w-56">
              {searchOpen ? (
                <SearchBar
                  autoFocus
                  onClose={() => setSearchOpen(false)}
                />
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-xl bg-brand-gray text-sm text-gray-400 hover:text-brand-green transition-colors"
                >
                  <IconSearch className="w-4 h-4" />
                  <span>Rechercher…</span>
                </button>
              )}
            </div>

            {/* Bouton recherche mobile */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-brand-gray transition-colors text-brand-green"
              onClick={() => { setSearchOpen(!searchOpen); setMobileOpen(false) }}
              aria-label="Rechercher"
            >
              <IconSearch className="w-5 h-5" />
            </button>

            {/* Déconnexion */}
            <button
              onClick={handleLogout}
              className="hidden md:flex p-2 rounded-lg hover:bg-brand-gray transition-colors text-gray-400 hover:text-orouge"
              aria-label="Se déconnecter"
              title="Se déconnecter"
            >
              <IconLogout className="w-4 h-4" />
            </button>

            {/* Bouton menu mobile */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-brand-gray transition-colors text-brand-green"
              onClick={() => { setMobileOpen(!mobileOpen); setSearchOpen(false) }}
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileOpen ? <IconClose className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Barre de recherche mobile */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <SearchBar autoFocus onClose={() => setSearchOpen(false)} />
          </div>
        )}
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="md:hidden border-t border-brand-gray bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            <MobileNavLink href="/" active={isActive('/')} onClick={() => setMobileOpen(false)}>
              Accueil
            </MobileNavLink>
            {ALL_CATEGORIES.map((cat) => (
              <MobileNavLink
                key={cat.id}
                href={cat.path}
                active={isActive(cat.path)}
                color={cat.color}
                onClick={() => setMobileOpen(false)}
              >
                {cat.label}
              </MobileNavLink>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-brand-gray transition-colors w-full text-left mt-2"
            >
              <IconLogout className="w-4 h-4" />
              Se déconnecter
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

function NavLink({
  href,
  active,
  color,
  children,
}: {
  href: string
  active: boolean
  color?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
        active
          ? 'bg-brand-gray text-brand-green'
          : 'text-gray-500 hover:text-brand-green hover:bg-brand-gray'
      }`}
      style={active && color ? { color } : undefined}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  active,
  color,
  onClick,
  children,
}: {
  href: string
  active: boolean
  color?: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
        active ? 'bg-brand-gray' : 'hover:bg-brand-gray'
      }`}
      style={active && color ? { color } : { color: active ? '#01525B' : '#6b7280' }}
    >
      {children}
    </Link>
  )
}
