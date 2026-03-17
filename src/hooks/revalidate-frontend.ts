import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

const FRONTEND_PATHS = ['/'] as const

const revalidateFrontendPaths = () => {
  FRONTEND_PATHS.forEach((path) => {
    try {
      revalidatePath(path)
    } catch (error) {
      // `revalidatePath` requires a Next.js request/static-generation context.
      // During CLI scripts (e.g. seeds), that context does not exist.
      const message = error instanceof Error ? error.message : ''
      if (message.includes('Invariant: static generation store missing')) {
        return
      }
      throw error
    }
  })
}

export const revalidateFrontendAfterChange: CollectionAfterChangeHook = async ({ doc }) => {
  revalidateFrontendPaths()
  return doc
}

export const revalidateFrontendAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  revalidateFrontendPaths()
  return doc
}
