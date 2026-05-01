// Seção Igrejas em Destaque — 3 cards com dados fictícios
import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'

const igrejas = [
  {
    slug:    'ia-frutificacao',
    nome:    'Igreja Adventista Frutificação',
    local:   'Boa Vista, Recife — PE',
    missao:  'Transformando vidas através da palavra e do amor ao próximo desde 2005',
    imagem:  '/images/igreja-1.jpg',
  },
  {
    slug:    'iemk-igreja',
    nome:    'IEMK Igreja',
    local:   'Casa Amarela, Recife — PE',
    missao:  'Uma comunidade de fé, esperança e serviço dedicada ao próximo',
    imagem:  '/images/igreja-2.jpg',
  },
  {
    slug:    'nova-alianca-olinda',
    nome:    'Igreja Nova Aliança',
    local:   'Olinda — PE',
    missao:  'Unidos pela fé, servindo com amor e transformando nossa região',
    imagem:  '/images/igreja-3.jpg',
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
              className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-card hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              {/* Imagem */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={igreja.imagem}
                  alt={`Foto da ${igreja.nome}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Corpo do card */}
              <div className="p-5">
                <h3 className="font-title font-semibold text-[18px] text-[#0F172A]">
                  {igreja.nome}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin size={14} className="text-[#4B5563] flex-shrink-0" />
                  <span className="font-sans text-[14px] text-[#4B5563]">{igreja.local}</span>
                </div>
                <p className="font-sans text-[14px] text-[#4B5563] mt-2 line-clamp-2 leading-relaxed">
                  {igreja.missao}
                </p>
              </div>

              {/* Rodapé com botões */}
              <div className="flex gap-3 px-5 py-4 border-t border-[#E5E7EB]">
                <Link
                  href={`/igrejas/${igreja.slug}`}
                  className="flex-1 py-2 rounded-lg border border-primary text-primary font-sans text-[14px] font-medium text-center hover:bg-primary-soft transition-all duration-200"
                >
                  Conhecer
                </Link>
                <Link
                  href={`/igrejas/${igreja.slug}/contribuir`}
                  className="flex-1 py-2 rounded-lg bg-accent text-white font-sans text-[14px] font-medium text-center hover:bg-accent-hover transition-all duration-200"
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
