"use client"

import { useState } from "react"
import Link from "next/link"
import { Church, Info, Upload, CheckCircle2, Loader2 } from "lucide-react"

export default function OnboardingIgrejaPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Estados do formulário
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    missao: "",
    endereco: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    telefone: "",
    email: "",
    instagram: "",
    facebook: "",
    site: "",
    horarios: "",
    chavePix: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simula envio (será substituído por Supabase)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSuccess(true)
  }

  // Tela de sucesso
  if (success) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-card p-12 max-w-md w-full text-center">
          <CheckCircle2 size={56} className="text-[#16A34A] mx-auto" />
          <h1 className="font-title text-2xl font-bold text-[#0F172A] mt-4">
            Igreja cadastrada com sucesso!
          </h1>
          <p className="font-sans text-base text-[#4B5563] mt-2 max-w-[400px] mx-auto">
            Sua igreja está em análise. Você receberá uma notificação quando for
            aprovada.
          </p>
          <Link
            href="/painel"
            className="inline-block mt-8 bg-primary hover:bg-primary-hover text-white font-sans text-base font-semibold py-4 px-8 rounded-lg transition-colors"
          >
            Ir para o Painel
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6 -m-6 lg:-m-8">
      <div className="bg-white rounded-2xl shadow-card p-8 md:p-12 max-w-[680px] w-full">
        {/* Cabeçalho */}
        <div className="text-center">
          <Church size={48} className="text-primary mx-auto" />
          <h1 className="font-title text-[28px] font-bold text-[#0F172A] mt-4">
            Cadastre sua Igreja
          </h1>
          <p className="font-sans text-base text-[#4B5563] mt-2">
            Preencha os dados abaixo para cadastrar sua igreja na plataforma.
          </p>
        </div>

        {/* Aviso */}
        <div className="mt-6 bg-primary-soft border-l-4 border-primary rounded-lg p-4 flex gap-3">
          <Info size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="font-sans text-sm text-[#4B5563]">
            Após o cadastro, sua igreja passará por uma análise de aprovação
            antes de aparecer publicamente na plataforma.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
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
                  placeholder="Ex: Igreja Batista da Esperança"
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                  placeholder="Conte um pouco sobre a história da sua igreja..."
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
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
                  placeholder="Qual é a missão da sua igreja?"
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
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
                  placeholder="Rua, número"
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                  placeholder="Ex: Boa Viagem"
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                    placeholder="Recife"
                    className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                    placeholder="PE"
                    maxLength={2}
                    className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors uppercase"
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
                  placeholder="50000-000"
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                  placeholder="(81) 99999-9999"
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                  placeholder="contato@suaigreja.com.br"
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                  placeholder="@suaigreja"
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                  placeholder="facebook.com/suaigreja"
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                  placeholder="https://suaigreja.com.br"
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                  placeholder="Ex: Domingo 9h e 19h, Quarta 19h30"
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
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
                  placeholder="CPF, CNPJ, email ou telefone"
                  className="w-full border border-[#E5E7EB] rounded-lg px-4 py-3 font-sans text-base text-[#0F172A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <p className="font-sans text-xs text-[#9CA3AF] mt-1">
                  Esta chave será exibida aos contribuintes para envio de PIX.
                </p>
              </div>
            </div>
          </div>

          {/* Seção: Upload */}
          <div>
            <h2 className="font-title text-lg font-semibold text-[#0F172A] mb-4">
              Imagens
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-sm font-medium text-[#0F172A] mb-2">
                  Logo da igreja (opcional)
                </label>
                <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
                  <Upload size={32} className="text-[#9CA3AF] mx-auto" />
                  <p className="font-sans text-sm text-[#9CA3AF] mt-2">
                    Arraste uma imagem ou clique para selecionar
                  </p>
                  <p className="font-sans text-xs text-[#9CA3AF] mt-1">
                    PNG, JPG. Max 2MB.
                  </p>
                </div>
              </div>
              <div>
                <label className="block font-sans text-sm font-medium text-[#0F172A] mb-2">
                  Banner da igreja (opcional)
                </label>
                <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
                  <Upload size={32} className="text-[#9CA3AF] mx-auto" />
                  <p className="font-sans text-sm text-[#9CA3AF] mt-2">
                    Arraste uma imagem ou clique para selecionar
                  </p>
                  <p className="font-sans text-xs text-[#9CA3AF] mt-1">
                    PNG, JPG. Max 2MB.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover disabled:opacity-70 text-white font-sans text-base font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={20} className="animate-spin" />}
              {loading ? "Cadastrando..." : "Cadastrar minha Igreja"}
            </button>
            <Link
              href="/painel"
              className="block text-center font-sans text-sm text-[#9CA3AF] hover:text-[#4B5563] mt-4 transition-colors"
            >
              Pular por enquanto &rarr;
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
