import type { Metadata } from 'next'
import { Poppins, Urbanist } from 'next/font/google'
import { Toaster } from '@hero/components/ui/sonner'
import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: '400',
})

const urbanist = Urbanist({
  variable: '--font-urbanist',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Hero - You new favorite place to find products',
  description:
    'Hero is a platform that helps you find the best products for your needs.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${urbanist.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
