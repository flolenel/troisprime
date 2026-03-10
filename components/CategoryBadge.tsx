import { CATEGORY_CONFIG } from '@/lib/constants'
import type { CategoryId } from '@/types'
import { IconNews, IconPart, IconCrea, IconOutils } from './icons'

const CATEGORY_ICONS = {
  news: IconNews,
  part: IconPart,
  crea: IconCrea,
  outils: IconOutils,
}

interface CategoryBadgeProps {
  category: CategoryId
  size?: 'sm' | 'md'
}

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const config = CATEGORY_CONFIG[category]
  if (!config) return null

  const Icon = CATEGORY_ICONS[category]

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold uppercase tracking-wider rounded-full ${
        size === 'sm' ? 'text-xs px-2.5 py-1' : 'text-sm px-3 py-1.5'
      }`}
      style={{
        color: config.color,
        backgroundColor: config.lightColor,
      }}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      {config.label}
    </span>
  )
}
