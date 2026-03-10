'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { IconSearch, IconClose } from './icons'

interface SearchBarProps {
  initialQuery?: string
  onClose?: () => void
  autoFocus?: boolean
}

export function SearchBar({ initialQuery = '', onClose, autoFocus }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    onClose?.()
  }

  const handleClear = () => {
    setQuery('')
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center w-full">
      <IconSearch className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un article…"
        autoFocus={autoFocus}
        className="w-full pl-9 pr-9 py-2.5 bg-brand-gray rounded-xl text-sm text-brand-green placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orouge/40 transition-all"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Effacer la recherche"
        >
          <IconClose className="w-4 h-4" />
        </button>
      )}
    </form>
  )
}
