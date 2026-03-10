import { getAllArticles } from '@/sanity/lib/queries'
import { ArticleGrid } from '@/components/ArticleGrid'

export const revalidate = 60 // Revalider toutes les 60 secondes

export default async function HomePage() {
  const articles = await getAllArticles()

  return (
    <div className="animate-fade-in">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-brand-green mb-1">Tous les articles</h1>
        <p className="text-gray-400 text-sm">
          {articles.length} article{articles.length !== 1 ? 's' : ''} publiés
        </p>
      </div>

      <ArticleGrid
        articles={articles}
        emptyMessage="Aucun article publié pour l'instant."
      />
    </div>
  )
}
