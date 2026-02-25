import Link from 'next/link'
import { Phone, MapPin, UtensilsCrossed, Instagram } from 'lucide-react'
import type { Setting } from '@/payload-types'

interface FooterProps {
  settings: Setting | null
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-border">
      <div className="container mx-auto py-10 px-4 xl:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Cafe Info */}
          <div className="flex flex-col">
            <Link href="/" className="mb-2 text-xl font-bold text-primary">
              Chicken & Chips Menu
            </Link>
            <div className="mt-2 flex items-center">
              <div className="flex flex-col md:flex-row gap-2">
                <UtensilsCrossed className="size-5 text-primary" />
              </div>
              <span className="ms-3 text-primary/90">
                Where great chicken meets chips!
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">Contact Us</h3>
            <ul className="space-y-3">
              {settings?.deliveryNumber != null && (
                <li>
                  <Link
                    href={`https://wa.me/${settings.deliveryNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary/90"
                  >
                    <Phone className="h-5 w-5 me-2 text-primary" />
                    <span>+{settings.deliveryNumber}</span>
                  </Link>
                </li>
              )}
              {settings?.locationTitle && (
                <li className="flex items-center text-primary/90">
                  <MapPin className="h-5 w-5 me-2 text-primary shrink-0" />
                  {settings.locationUrl ? (
                    <Link
                      href={settings.locationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {settings.locationTitle}
                    </Link>
                  ) : (
                    <span>{settings.locationTitle}</span>
                  )}
                </li>
              )}
            </ul>
          </div>

          {/* Social Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">Follow Us</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href=""
                  className="flex items-center text-primary/90"
                >
                  <Instagram className="me-2 size-5 text-primary" />
                  <span>chicken_chips_menu</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-primary/80">
            &copy; {currentYear} <span className="font-semibold">Chicken & Chips Menu</span>. All rights
            reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-primary/80">
              <Link
                href="https://www.nexus-techlb.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-primary hover:underline"
              >
                POWERED BY NEXUS
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
