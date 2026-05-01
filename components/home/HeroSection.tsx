// Seção Hero — imagem de fundo com overlay gradiente e CTA
import Link from 'next/link'

export function HeroSection() {
  return (
    <section
      className="relative flex items-center min-h-[550px] md:min-h-[550px] min-h-[400px] overflow-hidden"
      aria-label="Seção principal"
    >
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-community.jpg')" }}
        role="img"
        aria-label="Comunidade cristã reunida"
      />

      {/* Overlay gradiente escuro */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-6 md:px-12 py-16">
        <div className="max-w-[700px]">
          {/* Título principal */}
          <h1 className="font-title font-bold text-white text-[32px] md:text-[40px] leading-tight text-pretty mb-5">
            Conectamos quem quer ajudar com quem faz a diferença
          </h1>

          {/* Subtítulo */}
          <p className="font-sans text-[16px] md:text-[18px] font-normal text-white/90 leading-relaxed max-w-[600px] mb-8">
            O Hub da Fé conecta igrejas, campanhas e pessoas que querem fazer a
            diferença na sua comunidade.
          </p>

          {/* CTA */}
          <Link
            href="/igrejas"
            className="inline-block bg-primary text-white font-sans text-[16px] font-semibold px-8 py-[14px] rounded-[10px] hover:bg-primary-hover transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Conhecer Igrejas
          </Link>
        </div>
      </div>
    </section>
  )
}
