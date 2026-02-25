import React from 'react'
import './globals.css'

import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { RootProvider } from '@/providers/root-provider'
import Navbar from '@/components/custom-components/globals/navbar'
import Footer from '@/components/custom-components/globals/footer'

export const metadata = {
  description: 'Chicken & Chips Menu',
  title: 'Chicken & Chips Menu',
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={cn(poppins.variable, 'font-poppins antialiased')} suppressHydrationWarning>
      <body>
        <RootProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex flex-col justify-center items-center">

              {children}
            </main>
            <Footer />
          </div>

        </RootProvider>
      </body>
    </html>
  )
}
