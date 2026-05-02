// Seção Igrejas em Destaque — 3 cards com dados fictícios
import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'

const igrejas = [
  {
    slug:    'frutificacao',
    nome:    'Igreja Adventista Frutificação',
    local:   'Boa Vista, Recife — PE',
    missao:  'Transformando vidas através da palavra e do amor ao próximo desde 2005',
    imagem:  '/images/frutificacao.jpg',
  },
  {
    slug:    'kadosh',
    nome:    'IEMK Igreja',
    local:   'Casa Amarela, Recife — PE',
    missao:  'Uma comunidade de fé, esperança e serviço dedicada ao próximo',
    imagem:  '/images/kadosh.jpg',
  },
  {
    slug:    'nova-alianca',
    nome:    'Igreja Nova Aliança',
    local:   'Olinda — PE',
    missao:  'Unidos pela fé, servindo com amor e transformando nossa região',
    imagem:  '/images/nova-alianca.jpg',
  },
]

export function IgrejasDestaque() {
  return (
    <section className="bg-white py-20 md:py-20 py-16" aria-labelledby="titulo-igrejas">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Cabeçalho da seção */}
        <div className="text-center mb-12">
          <h2
            id="titulo-igrejas"
            className="font-title font-bold text-[28px] text-[#0F172A] text-balance"
          >
            Igrejas em Destaque
          </h2>
          <p className="font-sans text-[16px] text-[#4B5563] mt-3">
            Conheça as igrejas que estão transformando suas comunidades
          </p>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {igrejas.map((igreja) => (
            <article
              key={igreja.slug}
              className="group bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden cursor-pointer
                transition-all duration-300 hover:-translate-y-1
                hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:border-[#E3F0FF]
                flex flex-col"
            >
              {/* Imagem */}
              <div className="relative h-[220px] overflow-hidden flex-shrink-0">
                <Image
                  src={igreja.imagem}
                  alt={`Foto da ${igreja.nome}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Corpo do card */}
              <div className="flex flex-col flex-1 px-5 pt-5 pb-0">
                <h3 className="font-title font-semibold text-[18px] text-[#0F172A] leading-snug">
                  {igreja.nome}
                </h3>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <MapPin size={14} className="text-[#9CA3AF] flex-shrink-0" />
                  <span className="font-sans text-[14px] text-[#4B5563]">{igreja.local}</span>
                </div>
                <p className="font-sans text-[14px] text-[#4B5563] mt-2.5 line-clamp-2 leading-relaxed">
                  {igreja.missao}
                </p>
              </div>

              {/* Rodapé com botões */}
              <div className="flex items-center gap-3 px-5 pt-5 pb-5">
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
          ))}
        </div>

        {/* Link "ver todas" */}
        <div className="text-center mt-8">
          <Link
            href="/igrejas"
            className="font-sans text-[16px] font-medium text-primary hover:underline transition-all duration-200"
          >
            Conhecer todas as igrejas &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
