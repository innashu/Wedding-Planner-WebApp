import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Wedding Planner 💒',
  description: 'Inna & Joe\'s Wedding Planner',
  manifest: '/manifest.json',
  themeColor: '#db2777',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Wedding Planner',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Navigation />
        <main className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
