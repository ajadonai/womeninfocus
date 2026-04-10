import type { Metadata, Viewport } from 'next';
import { ThemeProvider, ThemeScript } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { ScrollToTop } from '@/components/ScrollToTop';
import { PageTransition } from '@/components/PageTransition';
import { SkipToContent } from '@/components/SkipToContent';
import { getSiteSettings } from '@/sanity/lib/fetch';
import './globals.css';

// Revalidate site settings every 60 seconds
export const revalidate = 60;

/* ═══════════════════════════════════════════════════
   SEO — Global metadata
   ═══════════════════════════════════════════════════ */

const siteUrl = 'https://womeninfocus.ng';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Women in Focus — Research & Advocacy',
    template: '%s | Women in Focus',
  },
  description:
    "Exploring women's negotiation skills, AI equity, and career outcomes through research and advocacy.",
  keywords: [
    'women negotiation',
    'AI equity',
    'career outcomes',
    'gender pay gap',
    'negotiation research',
    'Women in Focus',
    'women in tech',
    'workplace advocacy',
  ],
  authors: [{ name: 'Amala Okafor' }],
  creator: 'Amala Okafor',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Women in Focus',
    title: 'Women in Focus — Research & Advocacy',
    description:
      "Exploring women's negotiation skills, AI equity, and career outcomes through research and advocacy.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Women in Focus — Advancing women through research & technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Women in Focus — Research & Advocacy',
    description:
      "Exploring women's negotiation skills, AI equity, and career outcomes.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FDF6EC' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1A2E' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/* ═══════════════════════════════════════════════════
   ROOT LAYOUT
   ═══════════════════════════════════════════════════ */

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Font optimization: preconnect + preload for zero-delay font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <SkipToContent />
          <Header />
          <main id="main-content" className="flex-1" tabIndex={-1}>
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer settings={settings} />
          <BottomNav />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
