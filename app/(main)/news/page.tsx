import { getArticlesByCategory, getTagsByCategory } from '@/sanity/lib/queries'
import { CategoryPageContent } from '../CategoryPageContent'

export const revalidate = 60

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}) {
  const { tag } = await searchParams
  const [articles, tags] = await Promise.all([
    getArticlesByCategory('news', tag),
    getTagsByCategory('news'),
  ])

  return (
    <CategoryPageContent
      category="news"
      articles={articles}
      tags={tags}
      currentTag={tag}
    />
  )
}
