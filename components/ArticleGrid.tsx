'use client'

import { useState } from 'react'
import type { Article } from '@/types'
import { ArticleCard } from './ArticleCard'

const PAGE_SIZE = 12

interface ArticleGridProps {
  articles: Article[]
  emptyMessage?: string
}

export function ArticleGrid({ articles, emptyMessage = 'Aucun article trouvé.' }: ArticleGridProps) {
  const [visible, setVisible] = useState(PAGE_SIZE)

  if (!articles || articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="text-5xl mb-4">📭</span>
        <p className="text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    )
  }

  const shown = articles.slice(0, visible)
  const hasMore = visible < articles.length

  return (
    <div>
      <div className="flex flex-col gap-4">
        {shown.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="px-6 py-3 rounded-xl font-semibold text-sm border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white transition-all duration-150"
          >
            + d'articles ({articles.length - visible} restants)
          </button>
        </div>
      )}
    </div>
  )
}
