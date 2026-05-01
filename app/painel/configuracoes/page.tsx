"use client"

import { useState } from "react"
import { Loader2, CheckCircle2 } from "lucide-react"

// Dados mock do líder
const liderMock = {
  nome: "Pastor João da Silva",
  email: "pastor.joao@gmail.com",
  telefone: "(81) 99999-1234",
}

export default function ConfiguracoesPage() {
  // Estados do formulário de dados pessoais
  const [dadosLoading, setDadosLoading] = useState(false)
  const [dadosSuccess, setDadosSuccess] = useState(false)
  const [dadosForm, setDadosForm] = useState(liderMock)

  // Estados do formulário de senha
  const [senhaLoading, setSenhaLoading] = useState(false)
  const [senhaSuccess, setSenhaSuccess] = useState(false)
  const [senhaForm, setSenhaForm] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  })

  const handleDadosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDadosForm({ ...dadosForm, [e.target.name]: e.target.value })
  }

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenhaForm({ ...senhaForm, [e.target.name]: e.target.value })
  }

  const handleDadosSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setDadosLoading(true)
    // Simula salvamento (será substituído por Supabase)
    await new Promise((r) => setTimeout(r, 1200))
    setDadosLoading(false)
    setDadosSuccess(true)
    setTimeout(() => setDadosSuccess(false), 3000)
  }

  const handleSenhaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (senhaForm.novaSenha !== senhaForm.confirmarSenha) {
      alert("As senhas não coincidem")
      return
    }
    setSenhaLoading(true)
    // Simula salvamento (será substituído por Supabase)
    await new Promise((r) => setTimeout(r, 1200))
    setSenhaLoading(false)
    setSenhaSuccess(true)
    setSenhaForm({ senhaAtual: "", novaSenha: "", confirmarSenha: "" })
    setTimeout(() => setSenhaSuccess(false), 3000)
  }

  return (
    <div>
      {/* Cabeçalho */}
      <div className="mb-6">
        <h1 className="font-title text-[28px] font-bold text-[#0F172A]">
          Configurações
        </h1>
        <p className="font-sans text-base text-[#4B5563] mt-1">
          Gerencie sua conta
        </p>
      </div>

      {/* Card 1: Dados Pessoais */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 md:p-8 shadow-[0_4px_12px_rgba(15,23,42,0.04)]">
        <h2 className="font-title text-lg font-semibold text-[#0F172A] mb-6">
          Dados Pessoais
        </h2>

        <form onSubmit={handleDadosSubmit} className="space-y-4">
          <div>
            <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
              Nome completo
            </label>
            <input
              type="text"
              name="nome"
              value={dadosForm.nome}
              onChange={handleDadosChange}
              required
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={dadosForm.email}
              disabled
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#9CA3AF] bg-[#F5F5F7] cursor-not-allowed"
            />
            <p className="font-sans text-xs text-[#9CA3AF] mt-1">
              Para alterar o email, entre em contato com o suporte.
            </p>
          </div>

          <div>
            <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
              Telefone
            </label>
            <input
              type="tel"
              name="telefone"
              value={dadosForm.telefone}
              onChange={handleDadosChange}
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={dadosLoading}
              className="bg-primary hover:bg-primary-hover disabled:opacity-70 text-white font-sans text-[15px] font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {dadosLoading && <Loader2 size={18} className="animate-spin" />}
              {dadosLoading ? "Salvando..." : "Salvar dados"}
            </button>
            {dadosSuccess && (
              <span className="flex items-center gap-1 font-sans text-sm text-[#16A34A]">
                <CheckCircle2 size={16} />
                Salvo com sucesso!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Card 2: Alterar Senha */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 md:p-8 shadow-[0_4px_12px_rgba(15,23,42,0.04)] mt-6">
        <h2 className="font-title text-lg font-semibold text-[#0F172A] mb-6">
          Alterar Senha
        </h2>

        <form onSubmit={handleSenhaSubmit} className="space-y-4">
          <div>
            <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
              Senha atual
            </label>
            <input
              type="password"
              name="senhaAtual"
              value={senhaForm.senhaAtual}
              onChange={handleSenhaChange}
              required
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
              Nova senha
            </label>
            <input
              type="password"
              name="novaSenha"
              value={senhaForm.novaSenha}
              onChange={handleSenhaChange}
              required
              minLength={6}
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
              Confirmar nova senha
            </label>
            <input
              type="password"
              name="confirmarSenha"
              value={senhaForm.confirmarSenha}
              onChange={handleSenhaChange}
              required
              minLength={6}
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={senhaLoading}
              className="bg-primary hover:bg-primary-hover disabled:opacity-70 text-white font-sans text-[15px] font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {senhaLoading && <Loader2 size={18} className="animate-spin" />}
              {senhaLoading ? "Alterando..." : "Alterar senha"}
            </button>
            {senhaSuccess && (
              <span className="flex items-center gap-1 font-sans text-sm text-[#16A34A]">
                <CheckCircle2 size={16} />
                Senha alterada!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
