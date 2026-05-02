'use client'

// Página de login do líder — /entrar/lider
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Church, AlertCircle, Loader2, ArrowLeft } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase/client'

export default function LoginLiderPage() {
  const router = useRouter()
  const [email, setEmail]     = useState('')
  const [senha, setSenha]     = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro]       = useState<string | null>(null)

  // Login real com Supabase Auth
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErro(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })

    if (error) {
      setLoading(false)
      setErro(
        error.message === 'Invalid login credentials'
          ? 'E-mail ou senha inválidos.'
          : error.message
      )
      return
    }

    // Login bem-sucedido — redireciona para o painel
    router.push('/painel')
    router.refresh()
  }

  return (
    <>
      <Header />

      <main className="bg-[#F5F5F7] min-h-[calc(100vh-72px)] flex items-center py-12 px-6">
        <div className="w-full max-w-[480px] mx-auto">

          {/* Card principal */}
          <div className="bg-white rounded-2xl shadow-card px-10 py-12 sm:px-12">

            {/* Link de volta */}
            <Link
              href="/entrar"
              className="inline-flex items-center gap-1.5 font-sans text-[14px] text-[#4B5563] hover:text-[#0F172A] transition-colors duration-200 mb-6"
            >
              <ArrowLeft size={16} />
              Voltar para escolha de perfil
            </Link>

            {/* Topo do card */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#FFF4E6] flex items-center justify-center">
                <Church size={32} className="text-[#F97316]" />
              </div>
              <h1 className="font-title font-bold text-[24px] text-[#0F172A] mt-4 text-balance">
                Entrar como Líder
              </h1>
              <p className="font-sans text-[15px] text-[#4B5563] mt-2">
                Gerencie sua igreja e suas contribuições.
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5" noValidate>

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
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] font-sans text-[16px] text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#F97316] focus:ring-[3px] focus:ring-[#F97316]/15 transition-all duration-150"
                />
              </div>

              {/* Campo senha */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="senha" className="font-sans text-[14px] font-medium text-[#0F172A]">
                    Senha
                  </label>
                  <Link
                    href="/entrar/esqueci-minha-senha"
                    className="font-sans text-[13px] text-[#F97316] hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <input
                  id="senha"
                  type="password"
                  placeholder="Sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
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
                {loading ? 'Entrando...' : 'Entrar'}
              </button>

              {/* Separador */}
              <div className="relative flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-[#E5E7EB]" />
                <span className="font-sans text-[13px] text-[#9CA3AF]">ou</span>
                <div className="flex-1 h-px bg-[#E5E7EB]" />
              </div>

              {/* Link de cadastro */}
              <p className="font-sans text-[14px] text-[#4B5563] text-center">
                Ainda não cadastrou sua igreja?{' '}
                <Link
                  href="/entrar/lider/cadastro"
                  className="text-[#F97316] font-semibold hover:underline"
                >
                  Cadastrar agora
                </Link>
              </p>
            </form>

            {/* Rodapé de segurança */}
            <p className="font-sans text-[12px] text-[#9CA3AF] text-center mt-6">
              Seus dados são protegidos com criptografia.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
