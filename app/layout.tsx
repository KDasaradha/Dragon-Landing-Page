import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AppProvider } from '@/lib/contexts/AppContext'
import { ErrorBoundary } from '@/components/custom/error-boundary'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: {
    default: 'Night Fury - Dragon Legends | Professional Frontend Showcase',
    template: '%s | Night Fury - Dragon Legends'
  },
  description: 'An immersive web experience showcasing the legendary Night Fury and dragon mythology. Built with Next.js, TypeScript, and modern web technologies.',
  generator: 'KDSR',
  applicationName: 'Night Fury - Dragon Legends',
  authors: [{ name: 'KDSR', url: 'https://github.com/kdsr' }],
  creator: 'KDSR',
  publisher: 'KDSR',
  keywords: [
    'Night Fury', 'Dragons', 'How to Train Your Dragon', 'Toothless',
    'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
    'Frontend Development', 'Web Development', 'Professional Portfolio'
  ],
  category: 'entertainment',
  classification: 'Interactive Web Experience',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://night-fury-dragons.vercel.app',
    siteName: 'Night Fury - Dragon Legends',
    title: 'Night Fury - Dragon Legends | Professional Frontend Showcase',
    description: 'An immersive web experience showcasing the legendary Night Fury and dragon mythology. Built with Next.js, TypeScript, and modern web technologies.',
    images: [
      {
        url: '/images/toothless_logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Night Fury - Dragon Legends Preview',
        type: 'image/jpeg',
      },
      {
        url: '/images/night-fury-1.jpg',
        width: 800,
        height: 600,
        alt: 'Night Fury in Flight',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@kdsr_dev',
    creator: '@kdsr_dev',
    title: 'Night Fury - Dragon Legends | Professional Frontend Showcase',
    description: 'An immersive web experience showcasing the legendary Night Fury and dragon mythology.',
    images: ['/images/toothless_logo.jpg'],
  },
  alternates: {
    canonical: 'https://night-fury-dragons.vercel.app',
  },
  other: {
    'msapplication-TileColor': '#10b981',
    'msapplication-config': '/browserconfig.xml',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#10b981' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicons */}
        <link rel="icon" href="/images/toothless_icon.ico" sizes="any" />
        <link rel="icon" href="/images/toothless_logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/toothless_logo.jpg" />
        
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/images/ai-generated-7702855_1280.jpg" as="image" />
        <link rel="preload" href="/images/toothless_logo.jpg" as="image" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Night Fury - Dragon Legends',
              description: 'An immersive web experience showcasing the legendary Night Fury and dragon mythology.',
              url: 'https://night-fury-dragons.vercel.app',
              author: {
                '@type': 'Person',
                name: 'KDSR',
                url: 'https://github.com/kdsr',
              },
              creator: {
                '@type': 'Person',
                name: 'KDSR',
              },
              keywords: 'Night Fury, Dragons, Frontend Development, Next.js, TypeScript',
              inLanguage: 'en-US',
              copyrightYear: new Date().getFullYear(),
              genre: 'Interactive Web Experience',
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AppProvider>
              {children}
            </AppProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
