'use client'

// Catálogo de igrejas — busca textual + filtros por cidade
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, MapPin, CheckCircle2, SearchX } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { igrejasMock } from '@/data/igrejas-mock'
import type { Igreja } from '@/types/igreja'

// Cidades disponíveis para filtro, derivadas dos dados mock
const FILTROS_CIDADE = ['Todas', 'Recife', 'Olinda', 'Jaboatão dos Guararapes', 'Paulista', 'Camaragibe']

// Gera as iniciais do nome da igreja para o fallback de banner/logo
function iniciais(nome: string): string {
  return nome
    .split(' ')
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('')
}

// Card individual de cada igreja no catálogo
function CardIgreja({ igreja }: { igreja: Igreja }) {
  return (
    <article
      className="group bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-300 hover:-translate-y-1
        hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:border-[#E3F0FF]
        flex flex-col"
    >
      {/* Banner */}
      <div className="relative h-[180px] overflow-hidden flex-shrink-0">
        {igreja.banner ? (
          <img
            src={igreja.banner}
            alt={`Banner da ${igreja.nome}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#215E9F] to-[#174472] flex items-center justify-center">
            <span className="font-title font-bold text-[36px] text-white select-none">
              {iniciais(igreja.nome)}
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 px-5 pt-5 pb-0">
        {/* Badge de status */}
        {igreja.status === 'aprovada' && (
          <div className="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#16A34A] rounded-full px-3 py-1 mb-3 self-start">
            <CheckCircle2 size={14} />
            <span className="font-sans text-[12px] font-semibold">Aprovada</span>
          </div>
        )}

        {/* Nome */}
        <h2 className="font-title font-semibold text-[18px] text-[#0F172A] leading-snug">
          {igreja.nome}
        </h2>

        {/* Localização */}
        <p className="flex items-center gap-1.5 font-sans text-[14px] text-[#4B5563] mt-1">
          <MapPin size={14} className="text-[#9CA3AF] flex-shrink-0" />
          {igreja.bairro}, {igreja.cidade} — {igreja.estado}
        </p>

        {/* Missão truncada em 2 linhas */}
        <p className="font-sans text-[14px] text-[#4B5563] mt-2 line-clamp-2 leading-relaxed">
          {igreja.missao}
        </p>
      </div>

      {/* Botões de ação */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-5">
        <Link
          href={`/igrejas/${igreja.slug}`}
          className="flex-1 py-2.5 rounded-[10px] border border-[1.5px] border-[#215E9F] text-[#215E9F]
            font-sans text-[14px] font-semibold text-center
            hover:bg-[#E3F0FF] transition-colors duration-200"
        >
          Conhecer
        </Link>
        <Link
          href={`/igrejas/${igreja.slug}/contribuir`}
          className="flex-1 py-2.5 rounded-[10px] bg-[#F97316] text-white
            font-sans text-[14px] font-semibold text-center
            hover:bg-[#EA580C] transition-colors duration-200"
        >
          Contribuir
        </Link>
      </div>
    </article>
  )
}

export default function IgrejasPage() {
  const [busca, setBusca] = useState('')
  const [cidadeFiltro, setCidadeFiltro] = useState('Todas')

  // Filtragem reativa: busca por nome/bairro + filtro de cidade
  const igrejasFiltradas = useMemo(() => {
    const termo = busca.toLowerCase().trim()
    return igrejasMock.filter((ig) => {
      const matchBusca =
        !termo ||
        ig.nome.toLowerCase().includes(termo) ||
        ig.bairro.toLowerCase().includes(termo)
      const matchCidade =
        cidadeFiltro === 'Todas' || ig.cidade === cidadeFiltro
      return matchBusca && matchCidade && ig.status === 'aprovada'
    })
  }, [busca, cidadeFiltro])

  return (
    <>
      <Header />

      <main className="bg-white min-h-screen pb-20">
        <div className="max-w-[1280px] mx-auto px-6">

          {/* Cabeçalho da página — busca */}
          <section className="max-w-[720px] mx-auto pt-10 mb-8 text-center">
            <h1 className="font-title font-bold text-[28px] text-[#0F172A] text-balance">
              Conhecer Igrejas
            </h1>
            <p className="font-sans text-[16px] text-[#4B5563] mt-2 leading-relaxed">
              Encontre igrejas próximas de você e faça a diferença na sua comunidade
            </p>

            {/* Barra de busca */}
            <div className="relative mt-6">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar igrejas por nome ou bairro..."
                className="w-full pl-[52px] pr-5 py-4 bg-white border border-[1.5px] border-[#E5E7EB] rounded-xl
                  font-sans text-[16px] text-[#0F172A] placeholder:text-[#9CA3AF]
                  focus:outline-none focus:border-[#215E9F] focus:shadow-[0_0_0_3px_rgba(33,94,159,0.12)]
                  transition-all duration-200"
                aria-label="Buscar igrejas"
              />
            </div>

            {/* Chips de filtro por cidade */}
            <div className="flex flex-wrap justify-center gap-2.5 mt-4" role="group" aria-label="Filtrar por cidade">
              {FILTROS_CIDADE.map((cidade) => (
                <button
                  key={cidade}
                  onClick={() => setCidadeFiltro(cidade)}
                  className={`px-[18px] py-2 rounded-full border font-sans text-[14px] font-medium
                    transition-all duration-200
                    ${
                      cidadeFiltro === cidade
                        ? 'bg-[#215E9F] text-white border-[#215E9F]'
                        : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F5F5F7] hover:border-[#D1D5DB]'
                    }`}
                  aria-pressed={cidadeFiltro === cidade}
                >
                  {cidade}
                </button>
              ))}
            </div>
          </section>

          {/* Grid de cards ou estado vazio */}
          {igrejasFiltradas.length > 0 ? (
            <section
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              aria-label="Lista de igrejas"
            >
              {igrejasFiltradas.map((ig) => (
                <CardIgreja key={ig.id} igreja={ig} />
              ))}
            </section>
          ) : (
            /* Estado vazio */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <SearchX size={48} className="text-[#9CA3AF] mb-4" aria-hidden="true" />
              <h2 className="font-title font-semibold text-[20px] text-[#0F172A]">
                Nenhuma igreja encontrada
              </h2>
              <p className="font-sans text-[14px] text-[#4B5563] mt-2">
                Tente buscar por outro nome ou bairro
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
