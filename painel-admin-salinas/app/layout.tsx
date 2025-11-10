import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// NOVO: Importe nosso AuthProvider
import { AuthProvider } from './authContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Painel Admin - Preço Bom Salinas',
  description: 'Painel de gerenciamento de ofertas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {/*
          NOVO: Envelopamos os 'children' (que são todas as nossas páginas)
          com o AuthProvider.
        */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}