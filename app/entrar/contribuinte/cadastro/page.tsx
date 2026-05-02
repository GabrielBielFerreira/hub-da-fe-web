'use client'

// Página de cadastro do contribuinte — /entrar/contribuinte/cadastro
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserPlus, AlertCircle, Loader2 } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase/client'

export default function CadastroContribuintePage() {
  const router = useRouter()
  const [nome, setNome]           = useState('')
  const [email, setEmail]         = useState('')
  const [senha, setSenha]         = useState('')
  const [telefone, setTelefone]   = useState('')
  const [loading, setLoading]     = useState(false)
  const [erro, setErro]           = useState<string | null>(null)

  // Cadastro real com Supabase Auth
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErro(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          nome,
          telefone,
          intencao: 'contribuinte',
        },
      },
    })

    if (error) {
      setLoading(false)
      setErro(
        error.message === 'User already registered'
          ? 'Este e-mail já está em uso.'
          : error.message
      )
      return
    }

    // Cadastro bem-sucedido — redireciona para a home
    router.push('/')
    router.refresh()
  }

  return (
    <>
      <Header />

      <main className="bg-[#F5F5F7] min-h-[calc(100vh-72px)] flex items-center py-12 px-6">
        <div className="w-full max-w-[480px] mx-auto">

          {/* Card principal */}
          <div className="bg-white rounded-2xl shadow-card px-10 py-12 sm:px-12">

            {/* Topo do card */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#E3F0FF] flex items-center justify-center">
                <UserPlus size={32} className="text-[#215E9F]" />
              </div>
              <h1 className="font-title font-bold text-[24px] text-[#0F172A] mt-4 text-balance">
                Criar conta de Contribuinte
              </h1>
              <p className="font-sans text-[15px] text-[#4B5563] mt-2">
                É rápido e gratuito.
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5" noValidate>

              {/* Campo nome */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="nome" className="font-sans text-[14px] font-medium text-[#0F172A]">
                  Nome completo
                </label>
                <input
                  id="nome"
                  type="text"
                  placeholder="João da Silva"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] font-sans text-[16px] text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#215E9F] focus:ring-[3px] focus:ring-[#215E9F]/15 transition-all duration-150"
                />
              </div>

              {/* Campo e-mail */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="font-sans text-[14px] font-medium text-[#0F172A]">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] font-sans text-[16px] text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#215E9F] focus:ring-[3px] focus:ring-[#215E9F]/15 transition-all duration-150"
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
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] font-sans text-[16px] text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#215E9F] focus:ring-[3px] focus:ring-[#215E9F]/15 transition-all duration-150"
                />
                <p className="font-sans text-[12px] text-[#9CA3AF]">
                  Use ao menos 8 caracteres com letras e números.
                </p>
              </div>

              {/* Campo telefone (opcional) */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="telefone" className="font-sans text-[14px] font-medium text-[#0F172A]">
                  Telefone <span className="text-[#9CA3AF] font-normal">(opcional)</span>
                </label>
                <input
                  id="telefone"
                  type="tel"
                  placeholder="(81) 99999-9999"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] font-sans text-[16px] text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#215E9F] focus:ring-[3px] focus:ring-[#215E9F]/15 transition-all duration-150"
                />
              </div>

              {/* Mensagem de erro */}
              {erro && (
                <div className="flex items-center gap-2.5 bg-[#FEE2E2] border border-[#DC2626] rounded-lg px-4 py-3">
                  <AlertCircle size={16} className="text-[#DC2626] flex-shrink-0" />
                  <p className="font-sans text-[14px] text-[#DC2626]">{erro}</p>
                </div>
              )}

              {/* Botão primário */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-[10px] bg-[#215E9F] text-white font-sans text-[15px] font-semibold flex items-center justify-center gap-2 hover:bg-[#174472] disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200 mt-1"
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                {loading ? 'Criando conta...' : 'Criar minha conta'}
              </button>

              {/* Link de login */}
              <p className="font-sans text-[14px] text-[#4B5563] text-center">
                Já tem uma conta?{' '}
                <Link
                  href="/entrar/contribuinte"
                  className="text-[#215E9F] font-semibold hover:underline"
                >
                  Faça login
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
