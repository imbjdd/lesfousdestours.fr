import { absoluteUrl } from '@/lib/utils'
import { Metadata } from 'next'
import '../styles/index.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://lfdt.vercel.app'),
  title: {
    default: 'Les Fous des Tours',
    template: '%s | Les Fous des Tours'
  },
  description: 'Les Fous Des Tours est l\'association universitaire d\'échecs et de jeux de plateau de Sorbonne Université.',
  openGraph: {
    title: 'Les Fous des Tours',
    description: 'Les Fous Des Tours est l\'association universitaire d\'échecs et de jeux de plateau de Sorbonne Université.',
    url: absoluteUrl('/'),
    siteName: 'Les Fous des Tours',
    images: [
      {
        url: 'https://lfdt.vercel.app/images/tags_update.png', 
        width: 1200, 
        height: 630
      }
    ],
    locale: 'fr_FR',
    type: 'website'
  },
  themeColor: '#E9D056',
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
      <body className="bg-[#FEF5E4]">{children}</body>
    </html>
  )
}
