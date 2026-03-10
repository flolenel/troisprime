import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_COOKIE } from '@/lib/constants'

// Routes publiques (pas de protection par mot de passe)
const PUBLIC_PATHS = ['/login', '/api/login', '/api/logout', '/studio']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Laisser passer les routes publiques et les assets statiques
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Vérifier le cookie d'authentification
  const authCookie = request.cookies.get(AUTH_COOKIE)
  const authSecret = process.env.AUTH_SECRET

  if (!authCookie || !authSecret || authCookie.value !== authSecret) {
    const loginUrl = new URL('/login', request.url)
    // Sauvegarder la destination pour rediriger après connexion
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Exclure les fichiers statiques et les internals Next.js
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)',
  ],
}
