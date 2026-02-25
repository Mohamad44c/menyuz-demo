'use client'

import { motion, useScroll } from 'framer-motion'
import Link from 'next/link'
import ThemeToggle from '../theme-toggle'

export default function Navbar() {
  const { scrollYProgress } = useScroll()

  return (
    <>
      <motion.nav className="w-full border-b border-gray-200 sticky top-0 z-50 bg-background">
        <div className="mx-auto flex h-16 container items-center justify-between px-4 xl:px-0">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/en" className="text-xl font-bold text-primary">
              Chicken & Chips Menu
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="https://wa.me/+96176425951" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#25D366"
                viewBox="0 0 24 24"
              >
                <path d="M20.52 3.48A11.87 11.87 0 0 0 12 0C5.37 0 0 5.38 0 12a11.9 11.9 0 0 0 1.67 6.1L0 24l6.18-1.63A11.85 11.85 0 0 0 12 24c6.63 0 12-5.38 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22a9.88 9.88 0 0 1-5-1.34l-.35-.2-3.66.97.98-3.56-.23-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.13-7.4c-.28-.14-1.63-.8-1.88-.9-.25-.1-.43-.14-.61.14s-.7.9-.85 1.08c-.16.17-.31.2-.58.07a8.06 8.06 0 0 1-2.36-1.45 8.88 8.88 0 0 1-1.63-2.03c-.17-.3 0-.46.13-.6.14-.14.3-.37.45-.56.15-.2.2-.34.3-.56.1-.23.05-.43-.02-.6-.07-.16-.61-1.47-.84-2.02-.22-.53-.45-.45-.62-.46l-.52-.01c-.17 0-.44.07-.67.32s-.88.86-.88 2.1.9 2.44 1.03 2.61c.14.17 1.76 2.7 4.26 3.78.6.26 1.06.41 1.43.52.6.19 1.15.16 1.58.1.48-.07 1.63-.67 1.86-1.3.23-.64.23-1.18.17-1.3-.06-.12-.25-.19-.52-.33z" />
              </svg>
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
