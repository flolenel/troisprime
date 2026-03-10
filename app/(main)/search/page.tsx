import { searchArticles } from '@/sanity/lib/queries'
import { ArticleGrid } from '@/components/ArticleGrid'
import { SearchBar } from '@/components/SearchBar'
import { IconSearch } from '@/components/icons'

export const dynamic = 'force-dynamic'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q?.trim() || ''

  const articles = query ? await searchArticles(query) : []

  return (
    <div className="animate-fade-in">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-brand-green mb-4">Recherche</h1>
        <div className="max-w-xl">
          <SearchBar initialQuery={query} autoFocus={!query} />
        </div>
      </div>

      {/* Résultats */}
      {query ? (
        <div>
          <p className="text-sm text-gray-400 mb-6">
            {articles.length} résultat{articles.length !== 1 ? 's' : ''} pour{' '}
            <strong className="text-brand-green">&ldquo;{query}&rdquo;</strong>
          </p>
          <ArticleGrid
            articles={articles}
            emptyMessage={`Aucun article trouvé pour "${query}".`}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <IconSearch className="w-12 h-12 text-gray-300 mb-4" />
          <p className="text-gray-400 text-lg">Tapez un mot-clé pour rechercher dans les articles.</p>
        </div>
      )}
    </div>
  )
}
