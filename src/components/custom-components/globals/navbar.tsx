'use client'

import { motion, useScroll } from 'framer-motion'
import Link from 'next/link'
import ThemeToggle from '../theme-toggle'

import Image from 'next/image'
import WhatsAppContactIcon from '@/assets/whats-app-contact.svg'

export default function Navbar() {
  const { scrollYProgress } = useScroll()

  return (
    <>
      <motion.nav className="w-full border-b border-gray-200 sticky top-0 z-50 bg-background">
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
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="h-[2px] bg-primary origin-left"
        />
      </motion.nav>
    </>
  )
}
