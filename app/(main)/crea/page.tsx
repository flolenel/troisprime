import { getArticlesByCategory, getTagsByCategory } from '@/sanity/lib/queries'
import { CategoryPageContent } from '../CategoryPageContent'

export const revalidate = 60

export default async function CreaPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}) {
  const { tag } = await searchParams
  const [articles, tags] = await Promise.all([
    getArticlesByCategory('crea', tag),
    getTagsByCategory('crea'),
  ])

  return (
    <CategoryPageContent
      category="crea"
      articles={articles}
      tags={tags}
      currentTag={tag}
    />
  )
}
