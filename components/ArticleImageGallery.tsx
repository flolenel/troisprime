'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { IconClose, IconChevronLeft, IconChevronRight } from './icons'

interface ArticleImage {
  _key?: string
  asset: { _ref: string }
  alt?: string
}

interface Props {
  images: ArticleImage[]
  title: string
}

// ─── Lightbox overlay ────────────────────────────────────────────────────────
function Lightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: ArticleImage[]
  initialIndex: number
  onClose: () => void
}) {
  const [current, setCurrent] = useState(initialIndex)

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setCurrent((c) => (c - 1 + images.length) % images.length)
    },
    [images.length]
  )

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setCurrent((c) => (c + 1) % images.length)
    },
    [images.length]
  )

  // Fermer avec Échap, naviguer avec les flèches clavier
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setCurrent((c) => (c - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') setCurrent((c) => (c + 1) % images.length)
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, images.length])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Croix fermer */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/25 transition-colors"
        aria-label="Fermer"
      >
        <IconClose className="w-6 h-6" />
      </button>

      {/* Compteur */}
      {images.length > 1 && (
        <span className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm">
          {current + 1} / {images.length}
        </span>
      )}

      {/* Image */}
      <div
        className="relative mx-4 max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={urlFor(images[current]).width(1920).url()}
          alt={images[current].alt || ''}
          width={1920}
          height={1440}
          className="max-h-[88vh] w-auto h-auto mx-auto rounded-xl"
        />
      </div>

      {/* Navigation flèches (si plusieurs images) */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25 transition-colors"
            aria-label="Précédent"
          >
            <IconChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25 transition-colors"
            aria-label="Suivant"
          >
            <IconChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  )
}

// ─── Galerie principale ───────────────────────────────────────────────────────
export function ArticleImageGallery({ images, title }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <div className="mb-8">
        {/* Image principale */}
        <div
          className="cursor-zoom-in"
          onClick={() => openLightbox(selectedIndex)}
          title="Cliquer pour agrandir"
        >
          <Image
            src={urlFor(images[selectedIndex]).width(1200).url()}
            alt={images[selectedIndex].alt || title}
            width={1200}
            height={900}
            className="w-full h-auto rounded-2xl shadow-md"
            priority
          />
        </div>

        {/* Miniatures (seulement si plusieurs images) */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={img._key || i}
                onClick={() => setSelectedIndex(i)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  i === selectedIndex
                    ? 'border-orouge opacity-100 scale-105'
                    : 'border-transparent opacity-50 hover:opacity-80'
                }`}
                aria-label={`Image ${i + 1}`}
              >
                <Image
                  src={urlFor(img).width(128).height(128).fit('crop').url()}
                  alt={img.alt || `${title} ${i + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}
