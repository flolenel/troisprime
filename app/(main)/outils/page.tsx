import { getArticlesByCategory, getTagsByCategory } from '@/sanity/lib/queries'
import { CategoryPageContent } from '../CategoryPageContent'

export const revalidate = 60

export default async function OutilsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}) {
  const { tag } = await searchParams
  const [articles, tags] = await Promise.all([
    getArticlesByCategory('outils', tag),
    getTagsByCategory('outils'),
  ])

  return (
    <CategoryPageContent
      category="outils"
      articles={articles}
      tags={tags}
      currentTag={tag}
    />
  )
}
