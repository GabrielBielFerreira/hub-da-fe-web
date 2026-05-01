// Seção Como Funciona — 3 passos + bloco "Para Líderes"
import Link from 'next/link'
import Image from 'next/image'
import { Search, Heart, QrCode, Check } from 'lucide-react'

const passos = [
  {
    icone:    Search,
    titulo:   'Encontre',
    descricao: 'Busque igrejas por nome, bairro ou cidade e descubra comunidades perto de você',
  },
  {
    icone:    Heart,
    titulo:   'Escolha',
    descricao: 'Conheça a missão da igreja, suas campanhas ativas e como você pode ajudar',
  },
  {
    icone:    QrCode,
    titulo:   'Contribua',
    descricao: 'Faça sua contribuição via PIX de forma rápida, segura e transparente',
  },
]

const beneficios = [
  'Dashboard com métricas em tempo real',
  'Criação e gestão de campanhas',
  'Histórico completo de contribuições',
]

export function ComoFuncionaSection() {
  return (
    <section
      id="como-funciona"
      className="bg-white py-20 md:py-20 py-16"
      aria-labelledby="titulo-como-funciona"
    >
      <div className="max-w-[1280px] mx-auto px-6">

        {/* ── Parte A: Como Funciona ── */}
        <div className="text-center mb-12">
          <h2
            id="titulo-como-funciona"
            className="font-title font-bold text-[28px] text-[#0F172A] text-balance"
          >
            Como Funciona
          </h2>
          <p className="font-sans text-[16px] text-[#4B5563] mt-3">
            Contribuir com igrejas nunca foi tão fácil
          </p>
        </div>

        {/* Grid de 3 passos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {passos.map((passo) => {
            const Icone = passo.icone
            return (
              <div
                key={passo.titulo}
                className="flex flex-col items-center text-center gap-4"
              >
                {/* Círculo com ícone */}
                <div className="w-16 h-16 rounded-full bg-primary-soft flex items-center justify-center flex-shrink-0">
                  <Icone size={24} className="text-primary" />
                </div>
                {/* Título do passo */}
                <h3 className="font-title font-semibold text-[20px] text-[#0F172A]">
                  {passo.titulo}
                </h3>
                {/* Descrição */}
                <p className="font-sans text-[14px] text-[#4B5563] leading-relaxed max-w-[280px]">
                  {passo.descricao}
                </p>
              </div>
            )
          })}
        </div>

        {/* ── Parte B: Para Líderes ── */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Coluna esquerda — texto */}
          <div className="flex flex-col gap-5">
            {/* Label laranja */}
            <span className="font-sans text-[13px] font-medium uppercase tracking-widest text-accent">
              Para Igrejas
            </span>

            <h3 className="font-title font-bold text-[28px] text-[#0F172A] text-balance">
              Gerencie sua igreja com um painel profissional
            </h3>

            <p className="font-sans text-[16px] text-[#4B5563] leading-relaxed">
              Cadastre sua igreja, crie campanhas de arrecadação e acompanhe todas as
              contribuições em tempo real. Nosso painel foi feito para ser simples e
              eficiente.
            </p>

            {/* Lista de benefícios */}
            <ul className="flex flex-col gap-3" aria-label="Benefícios para igrejas">
              {beneficios.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-[#16A34A]" />
                  </span>
                  <span className="font-sans text-[15px] text-[#0F172A]">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-2">
              <Link
                href="/entrar/lider"
                className="inline-block bg-accent text-white font-sans text-[16px] font-semibold px-8 py-[14px] rounded-[10px] hover:bg-accent-hover transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Cadastrar Minha Igreja
              </Link>
            </div>
          </div>

          {/* Coluna direita — mockup do dashboard */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-panel md:[transform:perspective(1000px)_rotateY(-5deg)]">
            <Image
              src="/images/dashboard-mockup.jpg"
              alt="Mockup do painel de gestão de igrejas com gráficos e métricas"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
