import type { CategoryId } from '@/types'

export const CATEGORY_CONFIG: Record<CategoryId, {
  id: CategoryId
  label: string
  path: string
  color: string
  lightColor: string
  textColor: string
}> = {
  news: {
    id: 'news',
    label: 'Veille',
    path: '/news',
    color: '#FC431F',
    lightColor: '#FEF0ED',
    textColor: '#FC431F',
  },
  part: {
    id: 'part',
    label: "Part'",
    path: '/part',
    color: '#01525B',
    lightColor: '#E8F2F3',
    textColor: '#01525B',
  },
  crea: {
    id: 'crea',
    label: 'Créa',
    path: '/crea',
    color: '#9B2335',
    lightColor: '#F8EAEC',
    textColor: '#9B2335',
  },
  outils: {
    id: 'outils',
    label: 'Outils',
    path: '/outils',
    color: '#0E7C8A',
    lightColor: '#E3F5F7',
    textColor: '#0E7C8A',
  },
}

export const ALL_CATEGORIES = Object.values(CATEGORY_CONFIG)

export const AUTH_COOKIE = 'site_auth'
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 jours
