'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { IconClose } from './icons'

interface Props {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export function ClickableImage({ src, alt, width, height, className }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} cursor-zoom-in`}
        onClick={() => setOpen(true)}
        title="Cliquer pour agrandir"
      />

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/25 transition-colors"
            aria-label="Fermer"
          >
            <IconClose className="w-6 h-6" />
          </button>
          <div className="relative mx-4 max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={src}
              alt={alt}
              width={1920}
              height={1440}
              className="max-h-[88vh] w-auto h-auto mx-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  )
}
