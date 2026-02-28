import React from 'react'
import './globals.css'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { RootProvider } from '@/providers/root-provider'
import Navbar from '@/components/custom-components/globals/navbar'
import Footer from '@/components/custom-components/globals/footer'
// import WhatsAppContact from '@/components/custom-components/globals/whats-app-contact'

export const metadata = {
  description: 'Chicken & Chips Menu',
  title: 'Chicken & Chips Menu',
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const payload = await getPayload({ config })
  const settingsResult = await payload.find({ collection: 'settings', limit: 1 })
  const settings = settingsResult.docs[0] ?? null

  return (
    <html lang="en" className={cn(poppins.variable, 'font-poppins antialiased')} suppressHydrationWarning>
      <body>
        <RootProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex flex-col justify-center items-center">

              {children}
            </main>
            <Footer settings={settings} />
            {/* <WhatsAppContact deliveryNumber={settings?.deliveryNumber} /> */}
          </div>

        </RootProvider>
      </body>
    </html>
  )
}
