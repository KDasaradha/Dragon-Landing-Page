import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NightFury - The Ultimate Experience',
  description: 'Discover NightFury, a powerful and innovative platform designed to elevate your digital experience.',
  generator: 'KDSR',
  applicationName: 'NightFury',
  authors: [{ name: 'KDSR', url: 'https://yourwebsite.com' }],
  keywords: ['NightFury', 'technology', 'innovation', 'digital experience'],
  openGraph: {
    title: 'NightFury - The Ultimate Experience',
    description: 'Discover NightFury, a powerful and innovative platform designed to elevate your digital experience.',
    url: 'https://yourwebsite.com',
    siteName: 'NightFury',
    images: [
      {
        url: '/images/toothless_logo.jpg', // Replace with actual Open Graph image
        width: 1200,
        height: 630,
        alt: 'NightFury Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NightFury - The Ultimate Experience',
    description: 'Discover NightFury, a powerful and innovative platform designed to elevate your digital experience.',
    images: ['/twitter-image.png'], // Replace with actual Twitter preview image
  },
}

// Move viewport and themeColor to a separate function
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/toothless_icon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/toothless_logo.jpg" />
      </head>
      <body>{children}</body>
    </html>
  )
}
