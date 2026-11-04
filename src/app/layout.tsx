import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/i18n/context';
import { AppShell } from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'PANGANOVA — Food Price & Economic Intelligence Platform',
  description:
    'National economic intelligence platform designed to monitor food price movements, compare commodity trends, and explore household consumption indicators in Indonesia.',
  keywords: [
    'Pangan',
    'Food Prices Indonesia',
    'Economic Intelligence',
    'Bahan Pokok',
    'Inflasi Pangan',
    'Harga Pangan Nasional',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-ivory-warm antialiased">
        <LanguageProvider>
          <AppShell>{children}</AppShell>
        </LanguageProvider>
      </body>
    </html>
  );
}

