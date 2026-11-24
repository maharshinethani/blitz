import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BLITZ 2026 - Premium Freshers Festival',
  description: 'Step into the Festival- vagdevi commerce college',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}