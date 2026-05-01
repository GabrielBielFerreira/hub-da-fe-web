"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  Megaphone,
  Church,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"

// Itens de navegação do painel
const navItems = [
  { label: "Painel", href: "/painel", icon: LayoutDashboard },
  { label: "Campanhas", href: "/painel/campanhas", icon: Megaphone },
  { label: "Minha Igreja", href: "/painel/minha-igreja", icon: Church },
  { label: "Contribuições", href: "/painel/contribuicoes", icon: DollarSign },
  { label: "Configurações", href: "/painel/configuracoes", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Verifica se o item está ativo (match exato ou começa com href + /)
  const isActive = (href: string) => {
    if (href === "/painel") return pathname === "/painel"
    return pathname.startsWith(href)
  }

  // Conteúdo interno da sidebar (reutilizado desktop/mobile)
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <span className="font-title font-bold text-primary text-lg">HF</span>
        </div>
        <span className="font-title font-bold text-lg text-[#F9FAFB]">
          Hub da Fé
        </span>
      </Link>

      {/* Navegação principal */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${
                  active
                    ? "bg-primary text-white"
                    : "text-[#F9FAFB]/70 hover:text-[#F9FAFB] hover:bg-white/[0.08]"
                }
              `}
            >
              <Icon size={20} />
              <span className="font-sans text-[15px] font-medium">
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Separador */}
      <div className="h-px bg-white/15 my-4" />

      {/* Botão Sair */}
      <button
        onClick={() => {
          // TODO: Conectar ao Supabase auth.signOut()
          window.location.href = "/"
        }}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#F9FAFB]/50 hover:text-[#F9FAFB]/80 transition-all duration-200"
      >
        <LogOut size={20} />
        <span className="font-sans text-[15px] font-medium">Sair</span>
      </button>
    </div>
  )

  return (
    <>
      {/* Sidebar Desktop (lg+) */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[260px] bg-hubdark p-6 flex-col z-40">
        <SidebarContent />
      </aside>

      {/* Barra superior Mobile (<lg) */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-hubdark flex items-center justify-between px-4 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="font-title font-bold text-primary text-sm">HF</span>
          </div>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-[#F9FAFB] p-2"
          aria-label="Abrir menu"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Overlay + Drawer Mobile */}
      {mobileOpen && (
        <>
          {/* Overlay escuro */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-50"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <aside className="lg:hidden fixed left-0 top-0 h-screen w-[280px] bg-hubdark p-6 z-50 animate-in slide-in-from-left duration-300">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-[#F9FAFB]/70 hover:text-[#F9FAFB]"
              aria-label="Fechar menu"
            >
              <X size={24} />
            </button>
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  )
}
