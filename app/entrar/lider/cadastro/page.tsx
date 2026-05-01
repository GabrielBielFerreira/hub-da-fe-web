'use client'

// Página de cadastro do líder — /entrar/lider/cadastro
import { useState } from 'react'
import Link from 'next/link'
import { Building2, AlertCircle, Loader2, Info, ArrowLeft } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function CadastroLiderPage() {
  const [nome, setNome]         = useState('')
  const [email, setEmail]       = useState('')
  const [senha, setSenha]       = useState('')
  const [telefone, setTelefone] = useState('')
  const [loading, setLoading]   = useState(false)
  const [erro, setErro]         = useState<string | null>(null)

  // Simula submissão — TODO: integrar com Supabase Auth
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErro(null)
    setTimeout(() => {
      setLoading(false)
      // setErro('Este e-mail já está em uso.') // descomente para testar estado de erro
    }, 1500)
  }

  return (
    <>
      <Header />

      <main className="bg-[#F5F5F7] min-h-[calc(100vh-72px)] flex items-center py-12 px-6">
        <div className="w-full max-w-[520px] mx-auto">

          {/* Card principal */}
          <div className="bg-white rounded-2xl shadow-card px-10 py-12 sm:px-12">

            {/* Link de volta */}
            <Link
              href="/entrar/lider"
              className="inline-flex items-center gap-1.5 font-sans text-[14px] text-[#4B5563] hover:text-[#0F172A] transition-colors duration-200 mb-6"
            >
              <ArrowLeft size={16} />
              Voltar para o login
            </Link>

            {/* Topo do card */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#FFF4E6] flex items-center justify-center">
                <Building2 size={32} className="text-[#F97316]" />
              </div>
              <h1 className="font-title font-bold text-[24px] text-[#0F172A] mt-4 text-balance">
                Cadastrar minha Igreja
              </h1>
              <p className="font-sans text-[15px] text-[#4B5563] mt-2">
                Crie sua conta de líder para começar.
              </p>
            </div>

            {/* Aviso de análise */}
            <div className="mt-6 flex items-start gap-3 bg-[#FFF4E6] border-l-4 border-[#F97316] rounded-lg px-4 py-3">
              <Info size={16} className="text-[#F97316] flex-shrink-0 mt-0.5" />
              <p className="font-sans text-[14px] text-[#4B5563] leading-relaxed">
                Após o cadastro, sua Igreja passará por uma análise de aprovação antes de aparecer na plataforma.
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5" noValidate>

              {/* Campo nome */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="nome" className="font-sans text-[14px] font-medium text-[#0F172A]">
                  Seu nome completo
                </label>
                <input
                  id="nome"
                  type="text"
                  placeholder="João da Silva"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] font-sans text-[16px] text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F97316] focus:ring-[3px] focus:ring-[#F97316]/15 transition-all duration-150"
                />
              </div>

              {/* Campo e-mail */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="font-sans text-[14px] font-medium text-[#0F172A]">
                  E-mail de acesso
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] font-sans text-[16px] text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F97316] focus:ring-[3px] focus:ring-[#F97316]/15 transition-all duration-150"
                />
              </div>

              {/* Campo senha */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="senha" className="font-sans text-[14px] font-medium text-[#0F172A]">
                  Senha
                </label>
                <input
                  id="senha"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] font-sans text-[16px] text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F97316] focus:ring-[3px] focus:ring-[#F97316]/15 transition-all duration-150"
                />
              </div>

              {/* Campo telefone */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="telefone" className="font-sans text-[14px] font-medium text-[#0F172A]">
                  Telefone
                </label>
                <input
                  id="telefone"
                  type="tel"
                  placeholder="(81) 99999-9999"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] font-sans text-[16px] text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F97316] focus:ring-[3px] focus:ring-[#F97316]/15 transition-all duration-150"
                />
              </div>

              {/* Mensagem de erro */}
              {erro && (
                <div className="flex items-center gap-2.5 bg-[#FEE2E2] border border-[#DC2626] rounded-lg px-4 py-3">
                  <AlertCircle size={16} className="text-[#DC2626] flex-shrink-0" />
                  <p className="font-sans text-[14px] text-[#DC2626]">{erro}</p>
                </div>
              )}

              {/* Botão acento laranja */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-[10px] bg-[#F97316] text-white font-sans text-[15px] font-semibold flex items-center justify-center gap-2 hover:bg-[#EA580C] disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200 mt-1"
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                {loading ? 'Criando conta...' : 'Criar conta e cadastrar minha Igreja'}
              </button>

              {/* Link de login */}
              <p className="font-sans text-[14px] text-[#4B5563] text-center">
                Já tem uma conta?{' '}
                <Link
                  href="/entrar/lider"
                  className="text-[#F97316] font-semibold hover:underline"
                >
                  Faça login como Líder
                </Link>
              </p>

              {/* Termos */}
              <p className="font-sans text-[12px] text-[#9CA3AF] text-center leading-relaxed">
                Ao criar sua conta, você concorda com nossos{' '}
                <Link href="#" className="underline hover:text-[#4B5563] transition-colors">
                  Termos de Uso
                </Link>
                {' '}e{' '}
                <Link href="#" className="underline hover:text-[#4B5563] transition-colors">
                  Política de Privacidade
                </Link>
                .
              </p>
            </form>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
