'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import ThemeToggle from '../theme-toggle'

import Image from 'next/image'
import WhatsAppContactIcon from '@/assets/whats-app-contact.svg'

export default function Navbar() {
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

  return (
    <>
      <nav className="w-full border-b border-gray-200 sticky top-0 z-50 bg-background">
        <div className="mx-auto flex h-16 container items-center justify-between px-4 xl:px-0">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              Chicken & Chips Menu
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="https://wa.me/+96176425951" target="_blank">
              <Image
                src={WhatsAppContactIcon}
                alt="WhatsApp"
                width={45}
                height={46}
                className="h-[1.2rem] w-[1.2rem]"
              />
            </Link>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div
          className="h-[2px] bg-primary origin-left"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </nav>
    </>
  )
}
