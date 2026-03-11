import type { CategoryId } from '@/types'

export const CATEGORY_CONFIG: Record<CategoryId, {
  id: CategoryId
  label: string
  description: string
  path: string
  color: string
  lightColor: string
  textColor: string
}> = {
  news: {
    id: 'news',
    label: 'Veille',
    description: "De la créativité, des techno, de la science, de l'art ... de quoi ouvrir nos chakras et nourrir nos Brainsto... et nos recos !",
    path: '/news',
    color: '#FC431F',
    lightColor: '#FEF0ED',
    textColor: '#FC431F',
  },
  part: {
    id: 'part',
    label: "Part'",
    description: "Parce que sans de bons partenaires on serait moins bons ! Vous trouverez ici des studios, des artistes, des dévs, et bien d'autres presta à découvrir !",
    path: '/part',
    color: '#7C3AED',
    lightColor: '#F3EEFF',
    textColor: '#7C3AED',
  },
  crea: {
    id: 'crea',
    label: 'PGI',
    description: 'Mettons à l\'honneur notre cher PGI <3 Découvrez des travaux de recos, de prod et les "capsules" de notre grand maitre Jass',
    path: '/crea',
    color: '#9B2335',
    lightColor: '#F8EAEC',
    textColor: '#9B2335',
  },
  outils: {
    id: 'outils',
    label: 'Outils',
    description: "Découvrez des outils qui pourrait vous être utile dans votre quotidien de CDP, de l'IA, de sites pour vous faire gagner du temps, etc...",
    path: '/outils',
    color: '#0E7C8A',
    lightColor: '#E3F5F7',
    textColor: '#0E7C8A',
  },
}

export const ALL_CATEGORIES = Object.values(CATEGORY_CONFIG)

export const AUTH_COOKIE = 'site_auth'
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 jours
