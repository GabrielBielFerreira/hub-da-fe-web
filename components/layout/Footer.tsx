// Rodapé institucional
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-[#F9FAFB] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center">
              <span className="text-white font-bold text-xs">HF</span>
            </div>
            <span className="font-bold text-[#111827]">Hub da Fé</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-[#6B7280]">
            <Link href="/igrejas" className="hover:text-[#111827] transition-colors">Igrejas</Link>
            <Link href="/entrar" className="hover:text-[#111827] transition-colors">Entrar</Link>
          </nav>

          {/* Crédito */}
          <p className="text-xs text-[#9CA3AF]">
            © {new Date().getFullYear()} Hub da Fé. Plataforma independente.
          </p>
        </div>
      </div>
    </footer>
  )
}
