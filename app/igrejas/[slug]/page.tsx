// Página pública individual de cada igreja
// Busca o slug no array mock; quando Supabase for conectado, trocar por query real
import Link from 'next/link'
import {
  MapPin,
  Clock,
  Megaphone,
  Heart,
  Phone,
  Mail,
  Globe,
  Instagram,
  Facebook,
  CheckCircle2,
  Inbox,
  ArrowLeft,
} from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { igrejasMock } from '@/data/igrejas-mock'

// Gera iniciais para fallback de logo/banner
function iniciais(nome: string): string {
  return nome
    .split(' ')
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('')
}

export default async function IgrejaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const igreja = igrejasMock.find((i) => i.slug === slug && i.status === 'aprovada')

  // Página 404 simplificada se a igreja não existir ou não estiver aprovada
  if (!igreja) {
    return (
      <>
        <Header />
        <main className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-white px-6">
          <p className="font-title font-semibold text-[22px] text-[#0F172A]">
            Igreja não encontrada
          </p>
          <p className="font-sans text-[15px] text-[#4B5563]">
            A página que você procura não existe ou ainda não foi aprovada.
          </p>
          <Link
            href="/igrejas"
            className="flex items-center gap-2 mt-2 px-6 py-3 rounded-xl bg-[#215E9F] text-white
              font-sans text-[15px] font-semibold hover:bg-[#174472] transition-colors duration-200"
          >
            <ArrowLeft size={18} />
            Voltar para Igrejas
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  // Campanhas apenas ativas
  const campanhasAtivas = igreja.campanhas.filter((c) => c.status === 'ativa')

  return (
    <>
      <Header />

      <main className="bg-white">

        {/* ── Seção 1 — Banner + Logo + Nome ── */}
        <section aria-label="Identificação da igreja">
          {/* Banner grande */}
          <div className="relative w-full h-[300px] md:h-[300px] h-[200px] overflow-hidden">
            {igreja.banner ? (
              <img
                src={igreja.banner}
                alt={`Banner da ${igreja.nome}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#215E9F] to-[#174472]" />
            )}
          </div>

          {/* Logo sobreposta + info */}
          <div className="max-w-[960px] mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
              {/* Logo circular */}
              <div className="flex-shrink-0">
                {igreja.logo ? (
                  <img
                    src={igreja.logo}
                    alt={`Logo da ${igreja.nome}`}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                  />
                ) : (
                  <div
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md
                      bg-[#E3F0FF] flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="font-title font-bold text-[28px] text-[#215E9F]">
                      {iniciais(igreja.nome)}
                    </span>
                  </div>
                )}
              </div>

              {/* Nome, localização e badge */}
              <div className="pb-2">
                <h1 className="font-title font-bold text-[28px] text-[#0F172A] leading-tight text-balance">
                  {igreja.nome}
                </h1>
                <p className="flex items-center gap-1.5 font-sans text-[16px] text-[#4B5563] mt-1">
                  <MapPin size={16} className="text-[#9CA3AF]" aria-hidden="true" />
                  {igreja.bairro}, {igreja.cidade} — {igreja.estado}
                </p>
                {igreja.status === 'aprovada' && (
                  <div className="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#16A34A] rounded-full px-3 py-1 mt-2">
                    <CheckCircle2 size={14} aria-hidden="true" />
                    <span className="font-sans text-[12px] font-semibold">Aprovada</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Seção 2 — Missão e Visão ── */}
        <section className="bg-[#F5F5F7] py-10 mt-8" aria-labelledby="missao-titulo">
          <div className="max-w-[960px] mx-auto px-6">
            <h2 id="missao-titulo" className="font-title font-semibold text-[22px] text-[#0F172A]">
              Nossa Missão
            </h2>
            <p className="font-sans text-[16px] text-[#4B5563] mt-3 leading-relaxed">
              {igreja.missao}
            </p>

            {igreja.visao && (
              <>
                <h2 className="font-title font-semibold text-[22px] text-[#0F172A] mt-8">
                  Nossa Visão
                </h2>
                <p className="font-sans text-[16px] text-[#4B5563] mt-3 leading-relaxed">
                  {igreja.visao}
                </p>
              </>
            )}
          </div>
        </section>

        {/* ── Seção 3 — Horários de Culto ── */}
        <section className="bg-white py-10" aria-labelledby="horarios-titulo">
          <div className="max-w-[960px] mx-auto px-6">
            <h2
              id="horarios-titulo"
              className="flex items-center gap-2.5 font-title font-semibold text-[22px] text-[#0F172A]"
            >
              <Clock size={24} className="text-[#215E9F]" aria-hidden="true" />
              Horários de Culto
            </h2>

            <div className="mt-5 bg-white border border-[#E5E7EB] rounded-xl p-6">
              {igreja.horarios_culto ? (
                <p className="font-sans text-[16px] text-[#4B5563] leading-relaxed whitespace-pre-line">
                  {igreja.horarios_culto}
                </p>
              ) : (
                <p className="font-sans text-[14px] text-[#9CA3AF] italic">
                  Horários não informados
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── Seção 4 — Campanhas Ativas ── */}
        <section className="bg-white py-10 border-t border-[#E5E7EB]" aria-labelledby="campanhas-titulo">
          <div className="max-w-[960px] mx-auto px-6">
            <h2
              id="campanhas-titulo"
              className="flex items-center gap-2.5 font-title font-semibold text-[22px] text-[#0F172A]"
            >
              <Megaphone size={24} className="text-[#F97316]" aria-hidden="true" />
              Campanhas Ativas
            </h2>

            {campanhasAtivas.length > 0 ? (
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {campanhasAtivas.map((campanha) => (
                  <div
                    key={campanha.id}
                    className="bg-white border border-[#E5E7EB] rounded-xl p-5"
                  >
                    <h3 className="font-title font-semibold text-[16px] text-[#0F172A]">
                      {campanha.titulo}
                    </h3>
                    <p className="font-sans text-[14px] text-[#4B5563] mt-2 leading-relaxed line-clamp-2">
                      {campanha.descricao}
                    </p>
                    <div className="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#16A34A] rounded-full px-3 py-1 mt-3">
                      <span className="font-sans text-[12px] font-semibold">Ativa</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-12 text-center">
                <Inbox size={40} className="text-[#9CA3AF] mb-3" aria-hidden="true" />
                <p className="font-sans text-[15px] text-[#9CA3AF]">
                  Nenhuma campanha ativa no momento
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── Seção 5 — Botão grande Contribuir ── */}
        <section
          className="bg-[#F5F5F7] py-16 text-center"
          aria-labelledby="contribuir-titulo"
        >
          <div className="max-w-[960px] mx-auto px-6">
            <h2
              id="contribuir-titulo"
              className="font-title font-semibold text-[22px] text-[#0F172A]"
            >
              Faça sua contribuição
            </h2>
            <p className="font-sans text-[16px] text-[#4B5563] mt-2">
              Toda ajuda faz diferença na comunidade
            </p>

            <Link
              href={`/igrejas/${igreja.slug}/contribuir`}
              className="inline-flex items-center gap-3 mt-8 px-12 py-[18px] rounded-xl
                bg-[#F97316] text-white font-sans text-[18px] font-semibold
                hover:bg-[#EA580C] hover:shadow-[0_4px_12px_rgba(249,115,22,0.3)]
                transition-all duration-200"
            >
              <Heart size={20} aria-hidden="true" />
              Contribuir com esta Igreja
            </Link>
          </div>
        </section>

        {/* ── Seção 6 — Contato e Redes Sociais ── */}
        <section className="bg-white py-10" aria-labelledby="contato-titulo">
          <div className="max-w-[960px] mx-auto px-6">
            <h2
              id="contato-titulo"
              className="font-title font-semibold text-[22px] text-[#0F172A] mb-6"
            >
              Contato e Redes Sociais
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Endereço */}
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[#215E9F] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <p className="font-sans text-[15px] text-[#4B5563]">
                  {igreja.endereco}, {igreja.bairro}, {igreja.cidade} — {igreja.estado}
                  {igreja.cep && `, CEP ${igreja.cep}`}
                </p>
              </div>

              {/* Telefone */}
              {igreja.telefone && (
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-[#215E9F] flex-shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${igreja.telefone.replace(/\D/g, '')}`}
                    className="font-sans text-[15px] text-[#4B5563] hover:text-[#215E9F] transition-colors"
                  >
                    {igreja.telefone}
                  </a>
                </div>
              )}

              {/* E-mail */}
              {igreja.email && (
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-[#215E9F] flex-shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${igreja.email}`}
                    className="font-sans text-[15px] text-[#4B5563] hover:text-[#215E9F] transition-colors"
                  >
                    {igreja.email}
                  </a>
                </div>
              )}

              {/* Site */}
              {igreja.site && (
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-[#215E9F] flex-shrink-0" aria-hidden="true" />
                  <a
                    href={igreja.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[15px] text-[#4B5563] hover:text-[#215E9F] transition-colors"
                  >
                    {igreja.site.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}

              {/* Instagram */}
              {igreja.instagram && (
                <div className="flex items-center gap-3">
                  <Instagram size={20} className="text-[#215E9F] flex-shrink-0" aria-hidden="true" />
                  <a
                    href={`https://instagram.com/${igreja.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[15px] text-[#4B5563] hover:text-[#215E9F] transition-colors"
                  >
                    @{igreja.instagram}
                  </a>
                </div>
              )}

              {/* Facebook */}
              {igreja.facebook && (
                <div className="flex items-center gap-3">
                  <Facebook size={20} className="text-[#215E9F] flex-shrink-0" aria-hidden="true" />
                  <a
                    href={`https://facebook.com/${igreja.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[15px] text-[#4B5563] hover:text-[#215E9F] transition-colors"
                  >
                    {igreja.facebook}
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
