import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Slot Machine Game',
  description: 'Slot Machine Game on Pixi.js',
  authors: [{ name: 'Bogdan R' }],
  keywords: ['slots', 'Pixi', 'casino'],
  creator: 'Bogdan R',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Slot Machine Game</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
