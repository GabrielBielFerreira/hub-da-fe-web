// Página Home pública — Server Component
// Composta por: Header, Hero, Igrejas em Destaque, Quem Somos, Como Funciona, Footer
import { Header }              from '@/components/layout/Header'
import { Footer }              from '@/components/layout/Footer'
import { HeroSection }         from '@/components/home/HeroSection'
import { IgrejasDestaque }     from '@/components/home/IgrejasDestaque'
import { QuemSomosSection }    from '@/components/home/QuemSomosSection'
import { ComoFuncionaSection } from '@/components/home/ComoFuncionaSection'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Igrejas em Destaque */}
        <IgrejasDestaque />

        {/* 3. Quem Somos */}
        <QuemSomosSection />

        {/* 4. Como Funciona + Para Líderes */}
        <ComoFuncionaSection />
      </main>

      <Footer />
    </div>
  )
}
