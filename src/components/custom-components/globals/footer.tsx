import Link from 'next/link'
import { Phone, MapPin, Coffee, Gamepad2 } from 'lucide-react'
import Instagram from '@/assets/instagram.svg'
import Facebook from '@/assets/facebook.svg'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-foreground border-t border-gray-200">
      <div className="container mx-auto py-10 px-4 xl:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Cafe Info */}
          <div className="flex flex-col">
            <Link href="/" className="mb-2 text-xl font-bold text-primary">
              Paul&apos;s Cafe
            </Link>
            <div className="mt-2 flex items-center">
              <div className="flex flex-col md:flex-row gap-2">
                <Coffee className="size-5 text-primary" />
                <Gamepad2 className="size-5 text-primary" />
              </div>
              <span className="ms-3 text-muted-foreground">
                Where great coffee meets gaming excitement!
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
                  <span>+961 76 425 951</span>
                </Link>
              </li>
              <li className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 me-2 text-primary-foreground" />
                <span>
                  Tibnine, South Lebanon <br /> Beside Hometown Vets
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
                  href="https://www.instagram.com/cafe_pauls?igsh=MTl0dHppbzlmZW41NA=="
                  className="flex items-center text-muted-foreground"
                >
                  <Instagram className="me-2 text-muted-foreground" />
                  <span>cafe_pauls</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-200 pt-8 md:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} <span className="font-semibold">Paul&apos;s Cafe</span>. All rights
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
