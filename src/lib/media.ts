import type { Media } from '@/payload-types'

const withVersion = (url: string, updatedAt?: string | null): string => {
  if (!updatedAt) return url

  const timestamp = Date.parse(updatedAt)
  if (Number.isNaN(timestamp)) return url

  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}v=${timestamp}`
}

export const getVersionedMediaUrl = (
  media?: Media | null,
  options?: { preferThumbnail?: boolean },
): string | null => {
  if (!media) return null

  const baseUrl = options?.preferThumbnail
    ? media.thumbnailURL ?? media.url ?? null
    : media.url ?? media.thumbnailURL ?? null

  if (!baseUrl) return null

  return withVersion(baseUrl, media.updatedAt)
}
