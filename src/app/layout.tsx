import type { Metadata } from 'next';
import { ThemeProvider, ThemeScript } from '@/components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Amala Okafor — Research & Advocacy',
  description:
    'Exploring women\'s negotiation skills, AI equity, and career outcomes through research and advocacy.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
