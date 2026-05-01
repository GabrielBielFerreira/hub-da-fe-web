// Layout raiz — fontes DM Sans (títulos) + Inter (corpo) + metadados SEO
import type { Metadata } from 'next'
import { DM_Sans, Inter } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Hub da Fé — Conectando fé e comunidade',
  description:
    'O Hub da Fé conecta igrejas, campanhas e pessoas que querem fazer a diferença na sua comunidade. Contribua via PIX de forma segura e transparente.',
  keywords: ['igrejas', 'contribuição', 'PIX', 'comunidade', 'fé', 'Recife', 'Pernambuco'],
  openGraph: {
    title: 'Hub da Fé — Conectando fé e comunidade',
    description: 'Conectamos quem quer ajudar com quem faz a diferença.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${inter.variable} bg-white`}>
      <body className="font-sans antialiased text-[#0F172A]">
        {children}
      </body>
    </html>
  )
}
