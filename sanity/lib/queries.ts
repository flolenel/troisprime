import { client } from './client'
import type { Article, Tag, CategoryId } from '@/types'

// Wrapper pour contourner les limitations de type du client Sanity
// avec les query strings construites dynamiquement (template literals)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function groq<T>(query: string, params?: Record<string, any>): Promise<T> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await client.fetch(query as any, params)
  } catch (err) {
    // En environnement de build sans credentials Sanity valides,
    // retourner une valeur vide plutôt que de faire échouer le build
    if (process.env.NODE_ENV === 'production' && !process.env.SANITY_API_READ_TOKEN?.startsWith('sk')) {
      return (Array.isArray([]) ? [] : null) as T
    }
    throw err
  }
}

// Fragment commun pour les cartes d'articles
const articleCardFragment = `
  _id,
  title,
  slug,
  description,
  category,
  publishedAt,
  status,
  images[] {
    _key,
    asset,
    alt
  },
  "tags": tags[]-> {
    _id,
    name,
    category
  }
`

// Fragment complet pour la page de détail
const articleDetailFragment = `
  ${articleCardFragment},
  content,
  link1Text,
  link1Url,
  link2Text,
  link2Url,
  link3Text,
  link3Url
`

// Tous les articles publiés
export async function getAllArticles(): Promise<Article[]> {
  try {
    return await groq<Article[]>(
      `*[_type == "article" && status == "published"] | order(publishedAt desc) {
        ${articleCardFragment}
      }`
    )
  } catch { return [] }
}

// Articles par catégorie (avec filtre tag optionnel)
export async function getArticlesByCategory(
  category: CategoryId,
  tag?: string
): Promise<Article[]> {
  try {
    if (tag) {
      return await groq<Article[]>(
        `*[_type == "article" && status == "published" && category == $category && $tag in tags[]->name] | order(publishedAt desc) {
          ${articleCardFragment}
        }`,
        { category, tag }
      )
    }
    return await groq<Article[]>(
      `*[_type == "article" && status == "published" && category == $category] | order(publishedAt desc) {
        ${articleCardFragment}
      }`,
      { category }
    )
  } catch { return [] }
}

// Article par slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    return await groq<Article | null>(
      `*[_type == "article" && slug.current == $slug][0] {
        ${articleDetailFragment}
      }`,
      { slug }
    )
  } catch { return null }
}

// Recherche full-text
export async function searchArticles(query: string): Promise<Article[]> {
  try {
    const searchQuery = `${query}*`
    return await groq<Article[]>(
      `*[_type == "article" && status == "published" && (
        title match $searchQuery ||
        description match $searchQuery ||
        $query in tags[]->name
      )] | order(publishedAt desc) {
        ${articleCardFragment}
      }`,
      { searchQuery, query }
    )
  } catch { return [] }
}

// Tags par catégorie
export async function getTagsByCategory(category: CategoryId): Promise<Tag[]> {
  try {
    return await groq<Tag[]>(
      `*[_type == "tag" && category == $category] | order(name asc) {
        _id,
        name,
        category
      }`,
      { category }
    )
  } catch { return [] }
}

// Tous les slugs (pour generateStaticParams)
export async function getAllArticleSlugs(): Promise<{ slug: string }[]> {
  try {
    return await groq<{ slug: string }[]>(
      `*[_type == "article" && status == "published"] {
        "slug": slug.current
      }`
    )
  } catch { return [] }
}
