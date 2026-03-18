'use client'

import { useState, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'

function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)

  const from = searchParams.get('from') || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push(from)
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Mot de passe incorrect.')
        setPassword('')
        inputRef.current?.focus()
      }
    } catch {
      setError('Une erreur est survenue. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-gray flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/logo-desktop.png"
            alt="TroisPrime"
            width={200}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-xl font-extrabold text-brand-green mb-1">Accès privé</h1>
          <p className="text-sm text-gray-400 mb-6">
            Entrez le mot de passe pour accéder au site.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-brand-green mb-1.5"
              >
                Mot de passe
              </label>
              <input
                ref={inputRef}
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoFocus
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl bg-brand-gray text-brand-green placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orouge/40 transition-all text-sm"
              />
            </div>

            {error && (
              <p className="text-sm text-orouge bg-orouge/5 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-xl font-bold text-white bg-orouge hover:bg-orouge/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 text-sm"
            >
              {loading ? 'Vérification…' : 'Entrer'}
            </button>
          </form>
        </div>

        {/* Footer discret */}
        <p className="text-center text-xs text-gray-300 mt-6">
          © {new Date().getFullYear()} TroisPrime
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-gray" />}>
      <LoginForm />
    </Suspense>
  )
}
