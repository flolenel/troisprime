'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Article } from '@/types'
import { CATEGORY_CONFIG } from '@/lib/constants'
import { CategoryBadge } from './CategoryBadge'
import { urlFor } from '@/sanity/lib/image'

interface ArticleCardProps {
  article: Article
  onTagClick?: (tag: string) => void
}

export function ArticleCard({ article, onTagClick }: ArticleCardProps) {
  const [imageIndex, setImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const { title, slug, description, category, tags, images, publishedAt } = article

  const config = CATEGORY_CONFIG[category]
  const hasMultipleImages = images && images.length > 1

  // Défilement des images au survol
  const cycleImage = useCallback(() => {
    if (!hasMultipleImages) return
    setImageIndex((i) => (i + 1) % images.length)
  }, [hasMultipleImages, images?.length])

  useEffect(() => {
    if (!isHovered || !hasMultipleImages) return
    const interval = setInterval(cycleImage, 1400)
    return () => clearInterval(interval)
  }, [isHovered, hasMultipleImages, cycleImage])

  const handleMouseLeave = () => {
    setIsHovered(false)
    setImageIndex(0)
  }

  const formattedDate = new Date(publishedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const currentImage = images?.[imageIndex]

  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-row"
      style={{ borderLeft: `4px solid ${config?.color || '#FC431F'}` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Contenu */}
      <div className="p-4 flex flex-col flex-1 gap-2 min-w-0">
        {/* Badge + Date */}
        <div className="flex items-center justify-between gap-2">
          <CategoryBadge category={category} />
          <time className="text-xs text-gray-400 whitespace-nowrap">{formattedDate}</time>
        </div>

        {/* Titre */}
        <Link href={`/articles/${slug.current}`}>
          <h2 className="font-extrabold text-brand-green text-base leading-snug group-hover:text-orouge transition-colors duration-200 line-clamp-2">
            {title}
          </h2>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
          {description}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag) => (
              <button
                key={tag._id}
                onClick={(e) => {
                  e.preventDefault()
                  onTagClick?.(tag.name)
                }}
                className="text-xs px-2 py-0.5 rounded-full border transition-all duration-150 hover:shadow-sm"
                style={{
                  borderColor: config?.color,
                  color: config?.color,
                }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Image */}
      <Link href={`/articles/${slug.current}`} className="block relative w-48 shrink-0 overflow-hidden bg-brand-gray">
        {currentImage?.asset ? (
          <Image
            src={urlFor(currentImage).width(300).height(200).fit('crop').url()}
            alt={currentImage.alt || title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="192px"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: config?.lightColor || '#F1F1F1' }}
          >
            <span className="text-4xl opacity-30">📄</span>
          </div>
        )}

        {/* Indicateur images multiples */}
        {hasMultipleImages && (
          <div className="absolute bottom-2 right-2 flex gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === imageIndex ? 'white' : 'rgba(255,255,255,0.5)',
                }}
              />
            ))}
          </div>
        )}
      </Link>
    </article>
  )
}
