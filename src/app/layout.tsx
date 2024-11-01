import { absoluteUrl } from '@/lib/utils'
import { Metadata } from 'next'
import '../styles/index.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://outstatic.com'),
  title: {
    default: 'Les Fous des Tours',
    template: '%s | Les Fous des Tours'
  },
  description: 'Les Fous Des Tours est l\'association universitaire d\'échecs et de jeux de plateau de Sorbonne Université. ',
  openGraph: {
    title: 'Les fous des Tours',
    description: 'A blog starter built with Outstatic.',
    url: absoluteUrl('/'),
    siteName: 'Next.js',
    images: [
      {
        url: absoluteUrl('/images/lfdt.png'), 
        width: 350,
        height: 397
      }
    ],
    locale: 'fr_FR',
    type: 'website'
  },
  icons: {
    icon: [{ url: '/favicon/favicon-32x32.png' }],
    apple: [{ url: '/favicon/apple-touch-icon.png' }]
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
