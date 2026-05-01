// Seção Quem Somos — 2 colunas: texto + imagem
import Image from 'next/image'

export function QuemSomosSection() {
  return (
    <section
      id="quem-somos"
      className="bg-[#F5F5F7] py-20 md:py-20 py-16"
      aria-labelledby="titulo-quem-somos"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Coluna esquerda — texto */}
          <div className="flex flex-col gap-5">
            <h2
              id="titulo-quem-somos"
              className="font-title font-bold text-[28px] text-[#0F172A] text-balance"
            >
              Quem Somos
            </h2>

            <p className="font-sans text-[16px] text-[#4B5563] leading-relaxed">
              O Hub da Fé nasceu com um propósito simples: conectar igrejas que fazem a
              diferença com pessoas que querem contribuir. Acreditamos que cada comunidade
              de fé tem o poder de transformar vidas.
            </p>

            <p className="font-sans text-[16px] text-[#4B5563] leading-relaxed">
              Nossa plataforma facilita contribuições via PIX de forma segura e
              transparente, permitindo que igrejas se concentrem no que realmente
              importa: servir suas comunidades e fortalecer a fé.
            </p>

            <p className="font-sans text-[16px] font-medium text-[#0F172A] leading-relaxed">
              Seja você um contribuinte ou líder de igreja, o Hub da Fé é o lugar onde
              a fé encontra a ação.
            </p>
          </div>

          {/* Coluna direita — imagem */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
            <Image
              src="/images/quem-somos.jpg"
              alt="Comunidade de fé reunida, sorrindo e ajudando uns aos outros"
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
