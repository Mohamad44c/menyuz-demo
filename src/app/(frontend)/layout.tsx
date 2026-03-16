import React from 'react'
import './globals.css'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { DEFAULTS } from '@/lib/defaults'
import { RootProvider } from '@/providers/root-provider'
import { SettingsProvider } from '@/providers/settings-provider'
import Navbar from '@/components/custom-components/globals/navbar'
import Footer from '@/components/custom-components/globals/footer'
// import WhatsAppContact from '@/components/custom-components/globals/whats-app-contact'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

async function getSettings() {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'settings', limit: 1 })
  return result.docs[0] ?? null
}

export async function generateMetadata() {
  const settings = await getSettings()
  return {
    title: settings?.restaurantName ?? DEFAULTS.restaurantName,
    description: settings?.tagline ?? DEFAULTS.tagline,
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const settings = await getSettings()

  // Light values — fall through to globals.css defaults if unset
  const lightPrimary = settings?.primaryColor ?? ''
  const lightFg = settings?.primaryForegroundColor ?? ''
  // Dark values fall back to the light value when not explicitly set
  const darkPrimary = settings?.primaryColorDark ?? lightPrimary
  const darkFg = settings?.primaryForegroundColorDark ?? lightFg

  // Build a single CSS string — only render the <style> block when something is set
  const cssVars = [
    ':root {',
    lightPrimary ? `--primary:${lightPrimary};` : '',
    lightFg ? `--primary-foreground:${lightFg};` : '',
    '}',
    '.dark {',
    darkPrimary ? `--primary:${darkPrimary};` : '',
    darkFg ? `--primary-foreground:${darkFg};` : '',
    '}',
  ].join('')

  const hasColorOverride = lightPrimary || lightFg || darkPrimary || darkFg

  return (
    // suppressHydrationWarning is required because next-themes toggles the class on <html>
    <html lang="en" className={cn(poppins.variable, 'font-poppins antialiased')} suppressHydrationWarning>
      {/* No whitespace inside <head> — text nodes are invalid there and cause hydration errors */}
      <head>{hasColorOverride ? <style dangerouslySetInnerHTML={{ __html: cssVars }} /> : null}</head>
      <body>
        <RootProvider>
          <SettingsProvider settings={settings}>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex flex-col justify-center items-center">
                {children}
              </main>
              <Footer />
            {/* <WhatsAppContact deliveryNumber={settings?.deliveryNumber} /> */}
            </div>
          </SettingsProvider>
        </RootProvider>
      </body>
    </html>
  )
}
