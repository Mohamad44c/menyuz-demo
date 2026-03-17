import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

const FRONTEND_PATHS = ['/'] as const

const revalidateFrontendPaths = () => {
  FRONTEND_PATHS.forEach((path) => {
    revalidatePath(path)
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
