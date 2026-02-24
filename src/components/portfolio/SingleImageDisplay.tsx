'use client'

import Image from 'next/image'

interface SingleImageDisplayProps {
  image: string
  title: string
  categoryColor?: string
  imageAlt?: string | undefined
}

const SingleImageDisplay = ({
  image,
  title,
  categoryColor = '#4CD787',
  imageAlt,
}: SingleImageDisplayProps) => {
  if (!image) return null

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">App Screenshot</h3>

      <div
        className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-neutral-900"
        style={{ boxShadow: `0 0 60px ${categoryColor}10` }}
      >
        <Image
          src={image}
          alt={imageAlt || `${title} screenshot`}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
          priority
        />
      </div>
    </div>
  )
}

export default SingleImageDisplay
