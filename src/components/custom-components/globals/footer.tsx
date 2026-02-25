import Link from 'next/link'
import { Phone, MapPin, Coffee, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-foreground border-t border-gray-200">
      <div className="container mx-auto py-10 px-4 xl:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Cafe Info */}
          <div className="flex flex-col">
            <Link href="/" className="mb-2 text-xl font-bold text-primary">
              Chicken & Chips Menu
            </Link>
            <div className="mt-2 flex items-center">
              <div className="flex flex-col md:flex-row gap-2">
                <Coffee className="size-5 text-primary" />
              </div>
              <span className="ms-3 text-muted-foreground">
                Where great chicken meets chips!
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://wa.me/+96176425951"
                  className="flex items-center text-muted-foreground"
                >
                  <Phone className="h-5 w-5 me-2 text-muted-foreground" />
                  <span>+961 </span>
                </Link>
              </li>
              <li className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 me-2 text-primary-foreground" />
                <span>
                  Beirut, Lebanon
                </span>
              </li>
            </ul>
          </div>

          {/* Social Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href=""
                  className="flex items-center text-muted-foreground"
                >
                  <Instagram className="me-2 text-muted-foreground" />
                  <span>chicken_chips_menu</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-200 pt-8 md:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} <span className="font-semibold">Chicken & Chips Menu</span>. All rights
            reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">
              Designed & Developed by{' '}
              <Link
                href="https://www.nexus-techlb.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-[#e1bc1e] hover:underline"
              >
                POWERED BYNEXUS
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
