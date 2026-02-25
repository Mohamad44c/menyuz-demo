import React from 'react'
import './globals.css'

import { Poppins, Amiri } from 'next/font/google'
import { cn } from '@/lib/utils'
import { RootProvider } from '@/providers/root-provider'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>
          <main>{children}</main>
        </RootProvider>
      </body>
    </html>
  )
}
