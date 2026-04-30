// Layout raiz — aplica fonte Inter e dark mode global
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hub da Fé',
  description: 'Plataforma de igrejas, campanhas e contribuições digitais',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} antialiased`}
        style={{ backgroundColor: '#FFFFFF', color: '#111827' }}
      >
        {children}
      </body>
    </html>
  )
}
