import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { WardrobeProvider } from '@/lib/wardrobeContext';
import AppLayout from '@/components/AppLayout';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Collection It All — Smart Digital Wardrobe & Mall Companion',
  description:
    'Know everything you own in your pocket. Match outfits seamlessly, identify wardrobe gaps, and check before you buy at the mall.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen bg-[#FDFBF7] antialiased">
        <WardrobeProvider>
          <AppLayout>{children}</AppLayout>
        </WardrobeProvider>
      </body>
    </html>
  );
}
