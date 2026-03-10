'use client'

import { useRouter, usePathname } from 'next/navigation'
import type { Tag, CategoryId } from '@/types'
import { CATEGORY_CONFIG } from '@/lib/constants'

interface TagFilterProps {
  tags: Tag[]
  currentTag?: string
  category: CategoryId
}

export function TagFilter({ tags, currentTag, category }: TagFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const config = CATEGORY_CONFIG[category]

  if (!tags || tags.length === 0) return null

  const handleTagClick = (tagName: string) => {
    if (currentTag === tagName) {
      // Désélectionner le tag
      router.push(pathname)
    } else {
      router.push(`${pathname}?tag=${encodeURIComponent(tagName)}`)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isActive = currentTag === tag.name
        return (
          <button
            key={tag._id}
            onClick={() => handleTagClick(tag.name)}
            className="text-sm px-3 py-1.5 rounded-full border font-medium transition-all duration-150"
            style={
              isActive
                ? {
                    backgroundColor: config.color,
                    borderColor: config.color,
                    color: 'white',
                  }
                : {
                    backgroundColor: 'white',
                    borderColor: config.color,
                    color: config.color,
                  }
            }
          >
            {tag.name}
          </button>
        )
      })}
    </div>
  )
}
