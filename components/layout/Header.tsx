'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

const navLinks = [
  { label: 'Quem Somos',       href: '/#quem-somos'    },
  { label: 'Como Funciona',    href: '/#como-funciona'  },
  { label: 'Conhecer Igrejas', href: '/igrejas'         },
]

// -------------------------------------------------------------------
// Skeleton para o estado de loading dos botões de ação
// -------------------------------------------------------------------
function ActionsSkeleton() {
  return (
    <div className="hidden md:flex items-center gap-3">
      <div className="h-9 w-24 rounded-lg bg-[#E5E7EB] animate-pulse" />
      <div className="h-9 w-40 rounded-lg bg-[#E5E7EB] animate-pulse" />
    </div>
  )
}

// -------------------------------------------------------------------
// Ações: Deslogado
// -------------------------------------------------------------------
function ActionsDeslogado() {
  return (
    <div className="hidden md:flex items-center gap-3">
      <Link
        href="/entrar"
        className="px-5 py-2 rounded-lg border border-[#215E9F] text-[#215E9F] font-sans text-[14px] font-medium hover:bg-[#EFF4FB] transition-all duration-200"
      >
        Entrar
      </Link>
      <Link
        href="/entrar/lider"
        className="px-5 py-2 rounded-lg bg-[#F97316] text-white font-sans text-[14px] font-medium hover:bg-[#EA6A10] transition-all duration-200"
      >
        Cadastrar Minha Igreja
      </Link>
    </div>
  )
}

// -------------------------------------------------------------------
// Avatar com inicial do nome
// -------------------------------------------------------------------
function Avatar({ nome }: { nome: string }) {
  const inicial = nome ? nome.charAt(0).toUpperCase() : '?'
  return (
    <div
      aria-label={`Avatar de ${nome}`}
      className="w-9 h-9 rounded-full bg-[#EFF4FB] border border-[#DBEAFE] flex items-center justify-center flex-shrink-0"
    >
      <span className="font-sans font-semibold text-[14px] text-[#215E9F]">{inicial}</span>
    </div>
  )
}

// -------------------------------------------------------------------
// Ações: Contribuinte logado
// -------------------------------------------------------------------
function ActionsContribuinte({ nome, signOut }: { nome: string; signOut: () => void }) {
  return (
    <div className="hidden md:flex items-center gap-3">
      <Link
        href="/minhas-contribuicoes"
        className="px-5 py-2 rounded-lg border border-[#215E9F] text-[#215E9F] font-sans text-[14px] font-medium hover:bg-[#EFF4FB] transition-all duration-200"
      >
        Minhas Contribuições
      </Link>
      <Avatar nome={nome} />
      <button
        onClick={signOut}
        aria-label="Sair da conta"
        className="p-2 rounded-lg text-[#6B7280] hover:text-[#0F172A] hover:bg-[#F5F5F7] transition-colors duration-200"
      >
        <LogOut size={18} />
      </button>
    </div>
  )
}

// -------------------------------------------------------------------
// Ações: Líder logado
// -------------------------------------------------------------------
function ActionsLider({ nome, signOut }: { nome: string; signOut: () => void }) {
  return (
    <div className="hidden md:flex items-center gap-3">
      <Link
        href="/painel"
        className="px-5 py-2 rounded-lg bg-[#0F172A] text-white font-sans text-[14px] font-medium hover:bg-[#1E293B] transition-all duration-200"
      >
        Meu Painel
      </Link>
      <Avatar nome={nome} />
      <button
        onClick={signOut}
        aria-label="Sair da conta"
        className="p-2 rounded-lg text-[#6B7280] hover:text-[#0F172A] hover:bg-[#F5F5F7] transition-colors duration-200"
      >
        <LogOut size={18} />
      </button>
    </div>
  )
}

// -------------------------------------------------------------------
// Header principal
// -------------------------------------------------------------------
export function Header() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)

  const { user, perfil, nome, loading, signOut } = useAuth()

  // Sombra ao rolar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloqueia scroll do body quando drawer mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuAberto ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuAberto])

  // Renderiza as ações corretas para desktop
  function renderActionsDesktop() {
    if (loading) return <ActionsSkeleton />
    if (!user)   return <ActionsDeslogado />
    if (perfil === 'lider') return <ActionsLider nome={nome} signOut={signOut} />
    return <ActionsContribuinte nome={nome} signOut={signOut} />
  }

  // Renderiza os botões de ação no drawer mobile
  function renderActionsMobile() {
    if (loading) {
      return (
        <div className="flex flex-col gap-3 px-6 pt-6 mt-auto pb-8">
          <div className="h-12 w-full rounded-lg bg-[#E5E7EB] animate-pulse" />
          <div className="h-12 w-full rounded-lg bg-[#E5E7EB] animate-pulse" />
        </div>
      )
    }

    if (!user) {
      return (
        <div className="flex flex-col gap-3 px-6 pt-6 mt-auto pb-8">
          <Link
            href="/entrar"
            className="w-full py-3 rounded-lg border border-[#215E9F] text-[#215E9F] font-sans text-[15px] font-medium text-center hover:bg-[#EFF4FB] transition-all duration-200"
            onClick={() => setMenuAberto(false)}
          >
            Entrar
          </Link>
          <Link
            href="/entrar/lider"
            className="w-full py-3 rounded-lg bg-[#F97316] text-white font-sans text-[15px] font-medium text-center hover:bg-[#EA6A10] transition-all duration-200"
            onClick={() => setMenuAberto(false)}
          >
            Cadastrar Minha Igreja
          </Link>
        </div>
      )
    }

    if (perfil === 'lider') {
      return (
        <div className="flex flex-col gap-3 px-6 pt-6 mt-auto pb-8">
          <div className="flex items-center gap-3 py-3 border-b border-[#E5E7EB]">
            <Avatar nome={nome} />
            <span className="font-sans text-[15px] font-medium text-[#0F172A]">{nome}</span>
          </div>
          <Link
            href="/painel"
            className="w-full py-3 rounded-lg bg-[#0F172A] text-white font-sans text-[15px] font-medium text-center hover:bg-[#1E293B] transition-all duration-200"
            onClick={() => setMenuAberto(false)}
          >
            Meu Painel
          </Link>
          <button
            onClick={() => { setMenuAberto(false); signOut() }}
            className="w-full py-3 rounded-lg border border-[#E5E7EB] text-[#6B7280] font-sans text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-[#F5F5F7] transition-all duration-200"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      )
    }

    // Contribuinte logado
    return (
      <div className="flex flex-col gap-3 px-6 pt-6 mt-auto pb-8">
        <div className="flex items-center gap-3 py-3 border-b border-[#E5E7EB]">
          <Avatar nome={nome} />
          <span className="font-sans text-[15px] font-medium text-[#0F172A]">{nome}</span>
        </div>
        <Link
          href="/minhas-contribuicoes"
          className="w-full py-3 rounded-lg border border-[#215E9F] text-[#215E9F] font-sans text-[15px] font-medium text-center hover:bg-[#EFF4FB] transition-all duration-200"
          onClick={() => setMenuAberto(false)}
        >
          Minhas Contribuições
        </Link>
        <button
          onClick={() => { setMenuAberto(false); signOut() }}
          className="w-full py-3 rounded-lg border border-[#E5E7EB] text-[#6B7280] font-sans text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-[#F5F5F7] transition-all duration-200"
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    )
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white border-b border-[#E5E7EB] transition-shadow duration-300 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[64px] md:h-[72px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-[#215E9F] flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-wide">HF</span>
            </div>
            <span className="font-title font-bold text-[20px] text-[#0F172A]">Hub da Fé</span>
          </Link>

          {/* Navegação — apenas desktop */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[14px] font-medium text-[#4B5563] hover:text-[#0F172A] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Ações — desktop */}
          {renderActionsDesktop()}

          {/* Botão hamburger — apenas mobile */}
          <button
            className="md:hidden p-2 rounded-lg text-[#4B5563] hover:text-[#0F172A] hover:bg-[#F5F5F7] transition-colors"
            onClick={() => setMenuAberto(true)}
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Overlay do menu mobile */}
      {menuAberto && (
        <div
          className="fixed inset-0 z-[60] bg-black/20"
          onClick={() => setMenuAberto(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer mobile */}
      <div
        className={`fixed inset-0 z-[70] bg-white flex flex-col transition-transform duration-300 md:hidden ${
          menuAberto ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        {/* Cabeçalho do drawer */}
        <div className="flex items-center justify-between px-6 h-[64px] border-b border-[#E5E7EB] flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setMenuAberto(false)}
          >
            <div className="w-9 h-9 rounded-lg bg-[#215E9F] flex items-center justify-center">
              <span className="text-white font-bold text-sm">HF</span>
            </div>
            <span className="font-title font-bold text-[20px] text-[#0F172A]">Hub da Fé</span>
          </Link>
          <button
            className="p-2 rounded-lg text-[#4B5563] hover:text-[#0F172A] hover:bg-[#F5F5F7] transition-colors"
            onClick={() => setMenuAberto(false)}
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Links de navegação */}
        <nav className="flex flex-col px-6 pt-6 gap-1" aria-label="Navegação mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3.5 font-sans text-[16px] font-medium text-[#0F172A] border-b border-[#E5E7EB] last:border-b-0 hover:text-[#215E9F] transition-colors"
              onClick={() => setMenuAberto(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Botões de ação mobile */}
        {renderActionsMobile()}
      </div>
    </>
  )
}
