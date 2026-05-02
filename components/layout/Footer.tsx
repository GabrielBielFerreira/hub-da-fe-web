// Rodapé reutilizável — 4 colunas desktop, empilhado mobile
import Link from 'next/link'
import { Instagram } from 'lucide-react'

const colunas = [
  {
    titulo: 'Navegação',
    links: [
      { label: 'Início',           href: '/'              },
      { label: 'Conhecer Igrejas', href: '/igrejas'        },
      { label: 'Quem Somos',       href: '/#quem-somos'   },
      { label: 'Como Funciona',    href: '/#como-funciona' },
    ],
  },
  {
    titulo: 'Para Igrejas',
    links: [
      { label: 'Cadastrar Minha Igreja', href: '/entrar/lider' },
      { label: 'Acessar Painel',         href: '/painel'       },
    ],
  },
  {
    titulo: 'Institucional',
    links: [
      { label: 'Termos de Uso',          href: '#' },
      { label: 'Política de Privacidade', href: '#' },
      { label: 'Contato',                href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-[#F9FAFB]">
      <div className="max-w-[1280px] mx-auto px-6 pt-12 pb-8">

        {/* Grid de colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">

          {/* Coluna 1 — Marca */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">HF</span>
              </div>
              <span className="font-title font-bold text-[18px] text-[#F9FAFB]">Hub da Fé</span>
            </Link>
            <p className="font-sans text-[14px] text-[#F9FAFB]/70 leading-relaxed">
              Conectando fé e comunidade
            </p>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do Hub da Fé"
              className="w-fit text-[#F9FAFB]/70 hover:text-[#F9FAFB] transition-opacity duration-200"
            >
              <Instagram size={20} />
            </a>
          </div>

          {/* Colunas 2, 3 e 4 — Links */}
          {colunas.map((coluna) => (
            <div key={coluna.titulo} className="flex flex-col gap-3">
              <h3 className="font-title font-semibold text-[14px] text-[#F9FAFB]">
                {coluna.titulo}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {coluna.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-[14px] text-[#F9FAFB]/80 hover:text-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Linha inferior — copyright */}
        <div className="mt-10 pt-6 border-t border-[#F9FAFB]/10">
          <p className="text-center font-sans text-[12px] text-[#F9FAFB]/50">
            &copy; 2026 Hub da Fé. Plataforma independente.
          </p>
        </div>
      </div>
    </footer>
  )
}
