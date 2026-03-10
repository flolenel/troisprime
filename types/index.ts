export interface Tag {
  _id: string
  name: string
  category: CategoryId
}

export interface ArticleImage {
  _key: string
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface Article {
  _id: string
  title: string
  slug: { current: string }
  description: string
  content: PortableTextBlock[]
  category: CategoryId
  tags: Tag[]
  images: ArticleImage[]
  link1Text?: string
  link1Url?: string
  link2Text?: string
  link2Url?: string
  link3Text?: string
  link3Url?: string
  publishedAt: string
  status: 'draft' | 'published'
}

export type CategoryId = 'news' | 'part' | 'crea' | 'outils'

export interface CategoryConfig {
  id: CategoryId
  label: string
  path: string
  color: string
  lightColor: string
  icon: React.FC<{ className?: string }>
}

// Portable Text types
export interface PortableTextBlock {
  _type: string
  _key: string
  [key: string]: unknown
}
