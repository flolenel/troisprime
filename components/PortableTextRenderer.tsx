import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@/types'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { IconExternalLink } from './icons'

interface PortableTextRendererProps {
  content: PortableTextBlock[]
}

const components = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-xl font-extrabold text-brand-green mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-lg font-bold text-brand-green mt-6 mb-2">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-orouge pl-4 py-1 my-4 italic text-gray-500 bg-brand-gray/50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-brand-green">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    underline: ({ children }: { children?: React.ReactNode }) => (
      <span className="underline decoration-orouge decoration-2">{children}</span>
    ),
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-orouge hover:underline font-medium"
      >
        {children}
        <IconExternalLink className="w-3 h-3 inline flex-shrink-0" />
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-1.5 mb-4 text-gray-700">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-1.5 mb-4 text-gray-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string } }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-6">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-brand-gray">
            <Image
              src={urlFor(value).width(1200).height(675).fit('crop').url()}
              alt={value.alt || ''}
              fill
              className="object-cover"
            />
          </div>
          {value.alt && (
            <figcaption className="text-center text-sm text-gray-400 mt-2">{value.alt}</figcaption>
          )}
        </figure>
      )
    },
  },
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  if (!content) return null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <PortableText value={content as any} components={components} />
}
