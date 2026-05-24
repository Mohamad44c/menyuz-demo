'use client'

import { useState } from 'react'
import NextImage from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Share2,
  QrCode,
  Phone,
  MapPin,
  Mail,
  CheckCircle2,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

// ─── Inline social SVGs (no external deps needed) ────────────────────────────

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.734-8.835L1.254 2.25H8.08l4.264 5.634L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

const SOCIAL_ICON_MAP = {
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
  facebook: FacebookIcon,
  x: XIcon,
} as const

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BusinessSocial {
  platform: keyof typeof SOCIAL_ICON_MAP
  href: string
}

export interface BusinessProfileAccordionProps {
  name: string
  category: string
  phone?: string
  email?: string
  address?: string
  locationHref?: string
  logoSrc?: string
  isVerified?: boolean
  isOpenNow?: boolean
  openUntil?: string
  socials?: BusinessSocial[]
  onShare?: () => void
  onQrCode?: () => void
}

export interface CategoryNavbarProps {
  categories: string[]
  activeCategory: string
  onSelect: (category: string) => void
  /** px offset from viewport top — set to 64 when placed under the app navbar */
  stickyTop?: number
}

// ─── BusinessProfileAccordion ─────────────────────────────────────────────────

export function BusinessProfileAccordion({
  name,
  category,
  phone,
  email,
  address,
  locationHref,
  logoSrc,
  isVerified = true,
  isOpenNow = true,
  openUntil,
  socials = [],
  onShare,
  onQrCode,
}: BusinessProfileAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Small icon button shared style
  const iconBtn =
    'p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40'

  return (
    <div className="bg-black text-white w-full">
      {/* ── Logo ─────────────────────────────────────────────────────────────── */}
      <div className="flex justify-center pt-7 pb-4">
        {logoSrc ? (
          <div className="w-24 h-24 rounded-2xl overflow-hidden ring-1 ring-white/10">
            <NextImage
              src={logoSrc}
              alt={name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-2xl bg-neutral-800 ring-1 ring-white/10 flex items-center justify-center">
            <span className="text-4xl font-bold text-white select-none">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* ── Name + verified badge + category ─────────────────────────────────── */}
      <div className="text-center px-6 pb-4">
        <div className="flex items-center justify-center gap-1.5">
          <h1 className="text-[1.6rem] font-bold leading-tight tracking-tight text-white">
            {name}
          </h1>
          {isVerified && (
            <BadgeCheck
              className="w-6 h-6 shrink-0 text-yellow-500"
              aria-label="Verified"
            />
          )}
        </div>
        <p className="mt-1 text-sm text-neutral-500 tracking-wide">{category}</p>
      </div>

      {/* ── Action bar ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 pb-5 gap-2">
        {/* Left: utility icons */}
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            aria-label="Share"
            onClick={
              onShare ??
              (() => {
                if (typeof navigator !== 'undefined') {
                  if (navigator.share) {
                    navigator.share({ title: name, url: window.location.href }).catch(() => {})
                  } else {
                    navigator.clipboard.writeText(window.location.href).catch(() => {})
                  }
                }
              })
            }
            className={iconBtn}
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            aria-label="QR code"
            onClick={onQrCode}
            className={iconBtn}
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>

        {/* Center: contact + social action icons */}
        <div className="flex items-center gap-0.5 min-w-0">
          {phone && (
            <Link
              href={`tel:${phone}`}
              aria-label="Call us"
              className={iconBtn}
            >
              <Phone className="w-4 h-4" />
            </Link>
          )}
          {(address || locationHref) && (
            <Link
              href={locationHref ?? '#'}
              target={locationHref ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label="Location"
              className={iconBtn}
            >
              <MapPin className="w-4 h-4" />
            </Link>
          )}
          {socials.map(({ platform, href }) => {
            const Icon = SOCIAL_ICON_MAP[platform]
            return (
              <Link
                key={platform}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform.charAt(0).toUpperCase() + platform.slice(1)}
                className={iconBtn}
              >
                <Icon className="w-4 h-4" />
              </Link>
            )
          })}
        </div>

        {/* Right: expand toggle */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          className="shrink-0 flex items-center gap-1 text-xs font-medium text-neutral-400 hover:text-white transition-colors focus-visible:outline-none"
        >
          {isOpen ? (
            <>
              Show less
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              Show more
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* ── Expanded details (framer-motion accordion) ───────────────────────── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-neutral-800 px-5 py-4 space-y-3.5">
              {/* Open status */}
              <div className="flex items-center gap-3">
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 ${isOpenNow ? 'text-emerald-500' : 'text-neutral-500'}`}
                />
                <span className="text-sm text-neutral-300">
                  {isOpenNow ? 'Open now' : 'Closed'}
                  {openUntil && (
                    <span className="text-neutral-500"> · Closes at {openUntil}</span>
                  )}
                </span>
              </div>

              {/* Phone */}
              {phone && (
                <Link
                  href={`tel:${phone}`}
                  className="flex items-center gap-3 group"
                >
                  <Phone className="w-4 h-4 shrink-0 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
                  <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                    {phone}
                  </span>
                </Link>
              )}

              {/* Email */}
              {email && (
                <Link
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 group"
                >
                  <Mail className="w-4 h-4 shrink-0 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
                  <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                    {email}
                  </span>
                </Link>
              )}

              {/* Address */}
              {address && (
                <Link
                  href={locationHref ?? '#'}
                  target={locationHref ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
                  <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                    {address}
                  </span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── CategoryNavbar ───────────────────────────────────────────────────────────

export function CategoryNavbar({
  categories,
  activeCategory,
  onSelect,
  stickyTop = 64,
}: CategoryNavbarProps) {
  return (
    <div
      className="sticky z-40 bg-black border-t border-neutral-800"
      style={{ top: stickyTop }}
    >
      {/* Hide scrollbar cross-browser while keeping it scrollable */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 overflow-x-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {categories.map((cat) => {
          const active = cat === activeCategory
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={[
                'shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40',
                active
                  ? 'bg-white text-black'
                  : 'bg-transparent text-neutral-500 hover:text-white',
              ].join(' ')}
            >
              {cat}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Demo page ────────────────────────────────────────────────────────────────

const DEMO_CATEGORIES = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks']

const DEMO_SOCIALS: BusinessSocial[] = [
  { platform: 'instagram', href: 'https://instagram.com/menyuz' },
  { platform: 'whatsapp', href: 'https://wa.me/96178830254' },
  { platform: 'facebook', href: 'https://facebook.com/menyuz' },
  { platform: 'x', href: 'https://x.com/menyuz' },
]

export default function BusinessProfileSectionDemo() {
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <div className="min-h-screen bg-neutral-950">
      <BusinessProfileAccordion
        name="Menyuz"
        category="Restaurant & Café"
        phone="+961 78 830 254"
        email="hello@menyuz.com"
        address="Beirut, Lebanon"
        locationHref="https://maps.google.com/?q=Beirut,Lebanon"
        isVerified
        isOpenNow
        openUntil="11:00 PM"
        socials={DEMO_SOCIALS}
        onShare={() => {
          if (navigator.share) {
            navigator.share({ title: 'Menyuz', url: window.location.href })
          } else {
            navigator.clipboard.writeText(window.location.href)
          }
        }}
        onQrCode={() => alert('QR code coming soon!')}
      />

      <CategoryNavbar
        categories={DEMO_CATEGORIES}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
        stickyTop={0} // no app navbar in this demo
      />

      {/* Placeholder menu content */}
      <div className="px-4 py-8 space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-neutral-800/60 animate-pulse" />
        ))}
      </div>
    </div>
  )
}
