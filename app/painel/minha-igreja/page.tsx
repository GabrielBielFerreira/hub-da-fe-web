"use client"

import { useState } from "react"
import { Loader2, CheckCircle2 } from "lucide-react"

// Dados mock pré-preenchidos (como se a igreja já existisse)
const igrejaMock = {
  nome: "Igreja Batista Frutificação",
  descricao:
    "A Igreja Batista Frutificação é uma comunidade de fé comprometida com o amor ao próximo e a transformação de vidas através do evangelho.",
  missao:
    "Pregar o evangelho de Cristo, formar discípulos e servir à comunidade com amor.",
  endereco: "Rua das Flores, 123",
  bairro: "Boa Viagem",
  cidade: "Recife",
  estado: "PE",
  cep: "51020-000",
  telefone: "(81) 99999-1234",
  email: "contato@frutificacao.com.br",
  instagram: "@igrejafrutificacao",
  facebook: "facebook.com/igrejafrutificacao",
  site: "https://frutificacao.com.br",
  horarios: "Domingo 9h e 19h\nQuarta 19h30\nSábado 17h (jovens)",
  chavePix: "12.345.678/0001-90",
}

export default function MinhaIgrejaPage() {
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [form, setForm] = useState(igrejaMock)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simula salvamento (será substituído por Supabase)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div>
      {/* Cabeçalho */}
      <div className="mb-6">
        <h1 className="font-title text-[28px] font-bold text-[#0F172A]">
          Minha Igreja
        </h1>
        <p className="font-sans text-base text-[#4B5563] mt-1">
          Edite as informações da sua igreja
        </p>
      </div>

      {/* Toast de sucesso */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-[#DCFCE7] border border-[#16A34A]/20 rounded-lg px-4 py-3 flex items-center gap-2 shadow-lg animate-in slide-in-from-top-2 duration-300">
          <CheckCircle2 size={18} className="text-[#16A34A]" />
          <span className="font-sans text-sm text-[#16A34A] font-medium">
            Alterações salvas com sucesso!
          </span>
        </div>
      )}

      {/* Card com formulário */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 md:p-8 shadow-[0_4px_12px_rgba(15,23,42,0.04)]">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Seção: Dados da Igreja */}
          <div>
            <h2 className="font-title text-lg font-semibold text-[#0F172A] mb-4">
              Dados da Igreja
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
                  Nome da igreja *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
                  Descrição da igreja
                </label>
                <textarea
                  name="descricao"
                  value={form.descricao}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
                  Missão *
                </label>
                <textarea
                  name="missao"
                  value={form.missao}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Seção: Localização */}
          <div>
            <h2 className="font-title text-lg font-semibold text-[#0F172A] mb-4">
              Localização
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
                  Endereço
                </label>
                <input
                  type="text"
                  name="endereco"
                  value={form.endereco}
                  onChange={handleChange}
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
                  Bairro *
                </label>
                <input
                  type="text"
                  name="bairro"
                  value={form.bairro}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-[2]">
                  <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    name="cidade"
                    value={form.cidade}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
                    Estado *
                  </label>
                  <input
                    type="text"
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                    required
                    maxLength={2}
                    className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors uppercase"
                  />
                </div>
              </div>
              <div>
                <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
                  CEP
                </label>
                <input
                  type="text"
                  name="cep"
                  value={form.cep}
                  onChange={handleChange}
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Seção: Contato e Redes */}
          <div>
            <h2 className="font-title text-lg font-semibold text-[#0F172A] mb-4">
              Contato e Redes Sociais
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
                  Email de contato
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
                  Instagram
                </label>
                <input
                  type="text"
                  name="instagram"
                  value={form.instagram}
                  onChange={handleChange}
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
                  Facebook
                </label>
                <input
                  type="text"
                  name="facebook"
                  value={form.facebook}
                  onChange={handleChange}
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
                  Site
                </label>
                <input
                  type="url"
                  name="site"
                  value={form.site}
                  onChange={handleChange}
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Seção: Horários e PIX */}
          <div>
            <h2 className="font-title text-lg font-semibold text-[#0F172A] mb-4">
              Horários e Recebimento
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
                  Horários de culto
                </label>
                <textarea
                  name="horarios"
                  value={form.horarios}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block font-sans text-sm font-medium text-[#0F172A] mb-1">
                  Chave PIX *
                </label>
                <input
                  type="text"
                  name="chavePix"
                  value={form.chavePix}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <p className="font-sans text-xs text-[#9CA3AF] mt-1">
                  Esta chave será exibida aos contribuintes para envio de PIX.
                </p>
              </div>
            </div>
          </div>

          {/* Botão salvar */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary-hover disabled:opacity-70 text-white font-sans text-[15px] font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
