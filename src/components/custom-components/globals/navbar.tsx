'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import ThemeToggle from '../theme-toggle'
import { useSettings } from '@/providers/settings-provider'
import type { Media } from '@/payload-types'
import { DEFAULTS } from '@/lib/defaults'
import WhatsAppContactIcon from '@/assets/whats-app-contact.svg'
import { getVersionedMediaUrl } from '@/lib/media'

export default function Navbar() {
  const settings = useSettings()
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
      setScrollProgress(progress)
    })
  }, [])

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const logo = settings?.logo as Media | null | undefined
  const logoUrl = getVersionedMediaUrl(logo)
  const restaurantName = settings?.restaurantName ?? DEFAULTS.restaurantName
  const deliveryNumber = settings?.deliveryNumber ?? DEFAULTS.deliveryNumber

  return (
    <>
      <nav className="w-full border-b border-gray-200 sticky top-0 z-50 bg-background">
        <div className="mx-auto flex h-16 container items-center justify-between px-4 xl:px-0">
          <div className="flex items-center">
            <Link href="/" aria-label={restaurantName}>
              {logoUrl ? (
                <NextImage
                  src={logoUrl}
                  alt={restaurantName}
                  width={160}
                  height={48}
                  className="h-10 w-auto object-contain"
                  priority
                />
              ) : (
                <span className="text-xl font-bold text-primary">{restaurantName}</span>
              )}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {deliveryNumber != null && (
              <Link
                href={`https://wa.me/${deliveryNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact us on WhatsApp"
              >
                <NextImage
                  src={WhatsAppContactIcon}
                  alt="WhatsApp"
                  width={45}
                  height={46}
                  className="h-[1.2rem] w-[1.2rem]"
                />
              </Link>
            )}
          </div>
        </div>

        <div
          className="h-[2px] bg-primary origin-left"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </nav>
    </>
  )
}
