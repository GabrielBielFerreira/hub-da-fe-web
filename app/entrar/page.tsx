// Página de escolha de perfil — /entrar
// Ponto de entrada do fluxo de autenticação
import Link from 'next/link'
import { Heart, Church } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entrar — Hub da Fé',
  description: 'Escolha como quer acessar o Hub da Fé: como contribuinte ou como líder de igreja.',
}

export default function EscolhaPerfilPage() {
  return (
    <>
      <Header />

      <main className="bg-[#F5F5F7] min-h-[calc(100vh-72px)] flex items-center py-12">
        <div className="w-full max-w-[900px] mx-auto px-6">

          {/* Cabeçalho da seção */}
          <div className="text-center mb-10">
            <h1 className="font-title font-bold text-[28px] text-[#0F172A] text-balance">
              Como você quer entrar?
            </h1>
            <p className="font-sans text-[16px] text-[#4B5563] mt-2">
              Escolha seu perfil para continuar
            </p>
          </div>

          {/* Grid de cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Card 1 — Contribuinte */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-10 shadow-card hover:shadow-panel hover:-translate-y-0.5 transition-all duration-200 flex flex-col">

              {/* Ícone */}
              <div className="w-20 h-20 rounded-full bg-[#E3F0FF] flex items-center justify-center flex-shrink-0">
                <Heart size={40} className="text-[#215E9F]" />
              </div>

              {/* Texto */}
              <h2 className="font-title font-bold text-[22px] text-[#0F172A] mt-5">
                Quero Contribuir
              </h2>
              <p className="font-sans text-[16px] text-[#4B5563] mt-3 leading-relaxed">
                Encontre igrejas, conheça campanhas e faça contribuições via PIX de forma simples e segura.
              </p>

              {/* Ações */}
              <div className="mt-auto pt-8 flex flex-col gap-3">
                <Link
                  href="/entrar/contribuinte"
                  className="w-full py-3.5 rounded-[10px] bg-[#215E9F] text-white font-sans text-[15px] font-semibold text-center hover:bg-[#174472] transition-colors duration-200"
                >
                  Entrar como Contribuinte
                </Link>
                <Link
                  href="/entrar/contribuinte/cadastro"
                  className="font-sans text-[14px] text-[#215E9F] text-center hover:underline"
                >
                  Não tem conta? Cadastre-se
                </Link>
              </div>
            </div>

            {/* Card 2 — Líder */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-10 shadow-card hover:shadow-panel hover:-translate-y-0.5 transition-all duration-200 flex flex-col">

              {/* Ícone */}
              <div className="w-20 h-20 rounded-full bg-[#FFF4E6] flex items-center justify-center flex-shrink-0">
                <Church size={40} className="text-[#F97316]" />
              </div>

              {/* Texto */}
              <h2 className="font-title font-bold text-[22px] text-[#0F172A] mt-5">
                Tenho uma Igreja
              </h2>
              <p className="font-sans text-[16px] text-[#4B5563] mt-3 leading-relaxed">
                Cadastre sua igreja, gerencie campanhas e acompanhe as contribuições recebidas no seu painel.
              </p>

              {/* Ações */}
              <div className="mt-auto pt-8 flex flex-col gap-3">
                <Link
                  href="/entrar/lider"
                  className="w-full py-3.5 rounded-[10px] bg-[#F97316] text-white font-sans text-[15px] font-semibold text-center hover:bg-[#EA580C] transition-colors duration-200"
                >
                  Entrar como Líder
                </Link>
                <Link
                  href="/entrar/lider/cadastro"
                  className="font-sans text-[14px] text-[#F97316] text-center hover:underline"
                >
                  Não tem conta? Cadastre-se
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
