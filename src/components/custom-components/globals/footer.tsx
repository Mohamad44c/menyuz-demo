'use client'

import Link from 'next/link'
import { Phone, MapPin, UtensilsCrossed, Instagram, Facebook } from 'lucide-react'
import { useSettings } from '@/providers/settings-provider'

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

export default function Footer() {
  const settings = useSettings()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto py-10 px-4 xl:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Cafe Info */}
          <div className="flex flex-col">
            <Link
              href="/"
              className="mb-2 text-xl font-bold text-foreground transition-colors hover:text-primary"
            >
              Chicken & Chips Menu
            </Link>
            <div className="mt-2 flex items-center">
              <div className="flex flex-col md:flex-row gap-2">
                <UtensilsCrossed className="size-5 text-primary" />
              </div>
              <span className="ms-3 text-muted-foreground">
                Where great chicken meets chips!
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Contact Us</h3>
            <ul className="space-y-3">
              {settings?.deliveryNumber != null && (
                <li>
                  <Link
                    href={`https://wa.me/${settings.deliveryNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Phone className="h-5 w-5 me-2 shrink-0 text-primary" />
                    <span>+{settings.deliveryNumber}</span>
                  </Link>
                </li>
              )}
              {settings?.locationTitle && (
                <li className="flex items-center">
                  <MapPin className="h-5 w-5 me-2 shrink-0 text-primary" />
                  {settings.locationUrl ? (
                    <Link
                      href={settings.locationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                      {settings.locationTitle}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">{settings.locationTitle}</span>
                  )}
                </li>
              )}
            </ul>
          </div>

          {/* Social Info */}
          <div className="flex flex-col items-center">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Follow Us</h3>
            <ul className="flex flex-row items-center justify-center gap-4">
              {settings?.tiktokUrl && (
                <li>
                  <Link
                    href={settings.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="TikTok"
                  >
                    <TikTokIcon className="size-5" />
                  </Link>
                </li>
              )}
              {settings?.facebookUrl && (
                <li>
                  <Link
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Facebook"
                  >
                    <Facebook className="size-5" />
                  </Link>
                </li>
              )}
              {settings?.instagramUrl && (
                <li>
                  <Link
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Instagram"
                  >
                    <Instagram className="size-5" />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear}{' '}
            <span className="font-semibold text-foreground">Chicken & Chips Menu</span>. All rights
            reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link
              href="https://www.nexus-techlb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-black text-muted-foreground transition-colors hover:text-foreground hover:underline"
            >
              POWERED BY NEXUS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
