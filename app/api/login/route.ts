import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AUTH_COOKIE, AUTH_COOKIE_MAX_AGE } from '@/lib/constants'

export async function POST(request: Request) {
  const { password } = await request.json()

  const sitePassword = process.env.SITE_PASSWORD
  const authSecret = process.env.AUTH_SECRET

  if (!sitePassword || !authSecret) {
    return NextResponse.json(
      { error: 'Configuration manquante sur le serveur.' },
      { status: 500 }
    )
  }

  if (password !== sitePassword) {
    return NextResponse.json(
      { error: 'Mot de passe incorrect.' },
      { status: 401 }
    )
  }

  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE, authSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: AUTH_COOKIE_MAX_AGE,
    path: '/',
  })

  return NextResponse.json({ success: true })
}
