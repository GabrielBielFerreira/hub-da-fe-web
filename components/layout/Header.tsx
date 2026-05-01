'use client'

// Header público reutilizável — sticky com sombra ao rolar, menu mobile drawer
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

// TODO: Quando o usuário estiver logado:
// - Contribuinte: "Entrar" vira "Minhas Contribuições" (href: /minhas-contribuicoes)
// - Líder: "Entrar" vira "Meu Painel" (href: /painel)
// - Botão "Cadastrar Minha Igreja" pode sumir

const navLinks = [
  { label: 'Quem Somos',        href: '/#quem-somos'   },
  { label: 'Como Funciona',     href: '/#como-funciona' },
  { label: 'Conhecer Igrejas',  href: '/igrejas'        },
]

export function Header() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuAberto,  setMenuAberto]  = useState(false)

  // Detecta scroll para adicionar sombra ao header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloqueia scroll do body quando menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuAberto ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuAberto])

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white border-b border-[#E5E7EB] transition-shadow duration-300 ${
          scrolled ? 'shadow-header' : ''
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[72px] md:h-[72px] h-[64px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
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

          {/* Ações — apenas desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/entrar"
              className="px-5 py-2 rounded-lg border border-primary text-primary font-sans text-[14px] font-medium hover:bg-primary-soft transition-all duration-200"
            >
              Entrar
            </Link>
            <Link
              href="/entrar/lider"
              className="px-5 py-2 rounded-lg bg-accent text-white font-sans text-[14px] font-medium hover:bg-accent-hover transition-all duration-200"
            >
              Cadastrar Minha Igreja
            </Link>
          </div>

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
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
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
              className="py-3.5 font-sans text-[16px] font-medium text-[#0F172A] border-b border-[#E5E7EB] last:border-b-0 hover:text-primary transition-colors"
              onClick={() => setMenuAberto(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Botões de ação */}
        <div className="flex flex-col gap-3 px-6 pt-6 mt-auto pb-8">
          <Link
            href="/entrar"
            className="w-full py-3 rounded-lg border border-primary text-primary font-sans text-[15px] font-medium text-center hover:bg-primary-soft transition-all duration-200"
            onClick={() => setMenuAberto(false)}
          >
            Entrar
          </Link>
          <Link
            href="/entrar/lider"
            className="w-full py-3 rounded-lg bg-accent text-white font-sans text-[15px] font-medium text-center hover:bg-accent-hover transition-all duration-200"
            onClick={() => setMenuAberto(false)}
          >
            Cadastrar Minha Igreja
          </Link>
        </div>
      </div>
    </>
  )
}
