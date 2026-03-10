import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getArticleBySlug, getAllArticleSlugs } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { CATEGORY_CONFIG } from '@/lib/constants'
import { CategoryBadge } from '@/components/CategoryBadge'
import { PortableTextRenderer } from '@/components/PortableTextRenderer'
import { IconArrowLeft, IconExternalLink } from '@/components/icons'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs()
  return slugs.map((item) => ({ slug: item.slug }))
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) notFound()

  const {
    title,
    description,
    category,
    tags,
    images,
    content,
    publishedAt,
    link1Text, link1Url,
    link2Text, link2Url,
    link3Text, link3Url,
  } = article

  const config = CATEGORY_CONFIG[category]
  const formattedDate = new Date(publishedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const links = [
    { text: link1Text, url: link1Url },
    { text: link2Text, url: link2Url },
    { text: link3Text, url: link3Url },
  ].filter((l) => l.text && l.url)

  return (
    <article className="animate-fade-in max-w-3xl mx-auto">
      {/* Bouton retour */}
      <div className="mb-6">
        <Link
          href={config ? config.path : '/'}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-brand-green transition-colors group"
        >
          <IconArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Retour à {config?.label || 'Accueil'}
        </Link>
      </div>

      {/* Images */}
      {images && images.length > 0 && (
        <div className="mb-8">
          {images.length === 1 ? (
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-brand-gray shadow-md">
              <Image
                src={urlFor(images[0]).width(1200).height(675).fit('crop').url()}
                alt={images[0].alt || title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {images.map((img, i) => (
                <div
                  key={img._key || i}
                  className={`relative rounded-2xl overflow-hidden bg-brand-gray shadow-md ${
                    i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'
                  }`}
                >
                  <Image
                    src={urlFor(img).width(900).height(i === 0 ? 506 : 450).fit('crop').url()}
                    alt={img.alt || title}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <CategoryBadge category={category} size="md" />
        {tags && tags.map((tag) => (
          <Link
            key={tag._id}
            href={`${config.path}?tag=${encodeURIComponent(tag.name)}`}
            className="text-sm px-3 py-1 rounded-full border font-medium transition-colors"
            style={{ borderColor: config.color, color: config.color }}
          >
            {tag.name}
          </Link>
        ))}
        <time className="text-sm text-gray-400 ml-auto">{formattedDate}</time>
      </div>

      {/* Titre */}
      <h1 className="text-3xl font-extrabold text-brand-green leading-tight mb-4">
        {title}
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-500 leading-relaxed mb-8 pb-8 border-b border-brand-gray">
        {description}
      </p>

      {/* Contenu riche */}
      {content && (
        <div className="prose-custom mb-8">
          <PortableTextRenderer content={content} />
        </div>
      )}

      {/* Section liens */}
      {links.length > 0 && (
        <div
          className="rounded-2xl p-6 mt-8"
          style={{ backgroundColor: config.lightColor }}
        >
          <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: config.color }}>
            Liens associés
          </h2>
          <div className="flex flex-col gap-2">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold hover:underline transition-colors"
                style={{ color: config.color }}
              >
                <IconExternalLink className="w-4 h-4 flex-shrink-0" />
                {link.text}
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
