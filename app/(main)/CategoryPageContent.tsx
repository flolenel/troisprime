'use client'

import { useRouter, usePathname } from 'next/navigation'
import type { Article, Tag, CategoryId } from '@/types'
import { CATEGORY_CONFIG } from '@/lib/constants'
import { ArticleGrid } from '@/components/ArticleGrid'
import { TagFilter } from '@/components/TagFilter'
import { IconNews, IconPart, IconCrea, IconOutils } from '@/components/icons'

const ICONS = { news: IconNews, part: IconPart, crea: IconCrea, outils: IconOutils }

interface CategoryPageContentProps {
  category: CategoryId
  articles: Article[]
  tags: Tag[]
  currentTag?: string
}

export function CategoryPageContent({ category, articles, tags, currentTag }: CategoryPageContentProps) {
  const config = CATEGORY_CONFIG[category]
  const Icon = ICONS[category]
  const router = useRouter()
  const pathname = usePathname()

  const handleTagClick = (tagName: string) => {
    if (currentTag === tagName) {
      router.push(pathname)
    } else {
      router.push(`${pathname}?tag=${encodeURIComponent(tagName)}`)
    }
  }

  return (
    <div className="animate-fade-in">
      {/* En-tête catégorie */}
      <div
        className="rounded-2xl p-6 mb-8 flex items-center gap-4"
        style={{ backgroundColor: config.lightColor }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: config.color }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: config.color }}>
            {config.label}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {articles.length} article{articles.length !== 1 ? 's' : ''}
            {currentTag && (
              <span> · Tag : <strong style={{ color: config.color }}>{currentTag}</strong></span>
            )}
          </p>
        </div>
      </div>

      {/* Filtres par tags */}
      {tags.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Filtrer
            </span>
            <TagFilter tags={tags} currentTag={currentTag} category={category} />
            {currentTag && (
              <button
                onClick={() => router.push(pathname)}
                className="text-xs text-gray-400 hover:text-gray-600 underline"
              >
                Effacer
              </button>
            )}
          </div>
        </div>
      )}

      {/* Grille articles */}
      <ArticleGrid
        articles={articles}
        emptyMessage={`Aucun article${currentTag ? ` avec le tag "${currentTag}"` : ''} dans cette catégorie.`}
      />
    </div>
  )
}
