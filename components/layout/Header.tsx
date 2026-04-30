// Header público — muda conforme estado de autenticação
'use client'

import Link from 'next/link'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'

interface HeaderProps {
  user?: { name: string } | null
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-[#FFFFFF]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#7C3AED] flex items-center justify-center">
              <span className="text-white font-bold text-sm">HF</span>
            </div>
            <span className="font-bold text-[#111827] text-lg hidden sm:block">Hub da Fé</span>
          </Link>

          {/* Nav central */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/igrejas" className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors">
              Explorar Igrejas
            </Link>
          </nav>

          {/* Ações */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/painel">
                  <Button variant="secondary" size="sm">Meu Painel</Button>
                </Link>
                <Avatar name={user.name} size="sm" />
              </div>
            ) : (
              <Link href="/entrar">
                <Button size="sm">Entrar</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
