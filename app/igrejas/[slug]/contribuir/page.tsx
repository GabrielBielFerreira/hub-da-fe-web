'use client'

// Formulário de contribuição + tela de sucesso com QR Code PIX
// Controle de etapas via useState — sem processamento de pagamento real
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  QrCode,
  Loader2,
  CheckCircle2,
  Copy,
  Check,
  Printer,
} from 'lucide-react'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { igrejasMock } from '@/data/igrejas-mock'
import { PixSVG, payload } from 'react-qrcode-pix'

// Formata input para exibir como "R$ 0,00"
function formatarValor(raw: string): string {
  // Remove tudo que não é dígito
  const nums = raw.replace(/\D/g, '')
  if (!nums) return ''
  const centavos = parseInt(nums, 10)
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(centavos / 100)
}

// Extrai o número puro em centavos para validação
function valorEmCentavos(formatado: string): number {
  return parseInt(formatado.replace(/\D/g, '') || '0', 10)
}

export default function ContribuirPage() {
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : ''
  const igreja = igrejasMock.find((i) => i.slug === slug && i.status === 'aprovada')

  // Estados do formulário
  const [valorFormatado, setValorFormatado] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [etapa, setEtapa] = useState<'formulario' | 'sucesso'>('formulario')
  const [pixPayloadStr, setPixPayloadStr] = useState('')

  // Estado do botão copiar chave PIX
  const [copiado, setCopiado] = useState(false)

  // Handler do input de valor — formata em tempo real
  function handleValor(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value
    setValorFormatado(formatarValor(raw))
    if (erro) setErro('')
  }

  // Copia o payload do PIX Copia e Cola para o clipboard e troca o ícone por 2s
  async function copiarChave() {
    if (!pixPayloadStr) return
    try {
      await navigator.clipboard.writeText(pixPayloadStr)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      // Fallback silencioso para ambientes sem permissão de clipboard
    }
  }

  // Gera o PIX (mock) — em produção chamará a API real
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (valorEmCentavos(valorFormatado) === 0) {
      setErro('Informe um valor válido para a contribuição.')
      return
    }

    setLoading(true)
    
    // Gera a string do PIX Copia e Cola
    const numValor = valorEmCentavos(valorFormatado) / 100
    try {
      const pixString = payload({
        pixkey: igreja.chave_pix,
        merchant: igreja.nome.substring(0, 25),
        city: igreja.cidade || 'Recife',
        amount: numValor,
      })
      setPixPayloadStr(pixString)
    } catch (err) {
      console.error(err)
    }

    // Simula chamada assíncrona
    await new Promise((res) => setTimeout(res, 800))
    setLoading(false)
    setEtapa('sucesso')
  }

  // Igreja não encontrada
  if (!igreja) {
    return (
      <>
        <Header />
        <main className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-[#F5F5F7] px-6">
          <p className="font-title font-semibold text-[22px] text-[#0F172A]">
            Igreja não encontrada
          </p>
          <Link
            href="/igrejas"
            className="px-6 py-3 rounded-xl bg-[#215E9F] text-white font-sans text-[15px] font-semibold
              hover:bg-[#174472] transition-colors duration-200"
          >
            Voltar para Igrejas
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F5F5F7] flex items-center justify-center py-12 px-6">
        <div
          className="w-full max-w-[520px] bg-white rounded-2xl p-10
            shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
        >

          {/* ── Etapa 1 — Formulário ── */}
          {etapa === 'formulario' && (
            <>
              {/* Link de volta */}
              <Link
                href={`/igrejas/${slug}`}
                className="inline-flex items-center gap-1.5 font-sans text-[14px] text-[#4B5563]
                  hover:text-[#215E9F] transition-colors duration-200"
              >
                &#8592; Voltar para {igreja.nome}
              </Link>

              {/* Ícone + título */}
              <div className="flex flex-col items-center text-center mt-6">
                <QrCode size={40} className="text-[#F97316]" aria-hidden="true" />
                <h1 className="font-title font-bold text-[24px] text-[#0F172A] mt-4">
                  Contribuição
                </h1>
                <p className="font-sans text-[16px] text-[#4B5563] mt-1">
                  Para {igreja.nome}
                </p>
              </div>

              {/* Formulário */}
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6" noValidate>

                {/* Campo valor */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="valor"
                    className="font-sans text-[13px] font-medium text-[#4B5563] uppercase tracking-wide"
                  >
                    Valor (R$)
                  </label>
                  <input
                    id="valor"
                    type="text"
                    inputMode="numeric"
                    value={valorFormatado}
                    onChange={handleValor}
                    placeholder="R$ 0,00"
                    className={`w-full px-4 py-3.5 bg-white border rounded-lg
                      font-title font-bold text-[24px] text-[#0F172A] placeholder:font-sans placeholder:text-[16px] placeholder:font-normal placeholder:text-[#9CA3AF]
                      focus:outline-none transition-all duration-200
                      ${
                        erro
                          ? 'border-[#DC2626] focus:border-[#DC2626] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.12)]'
                          : 'border-[#E5E7EB] focus:border-[#215E9F] focus:shadow-[0_0_0_3px_rgba(33,94,159,0.12)]'
                      }`}
                    aria-invalid={!!erro}
                    aria-describedby={erro ? 'valor-erro' : undefined}
                  />
                  {erro && (
                    <p id="valor-erro" className="font-sans text-[13px] text-[#DC2626]" role="alert">
                      {erro}
                    </p>
                  )}
                </div>

                {/* Campo mensagem opcional */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="mensagem"
                    className="font-sans text-[13px] font-medium text-[#4B5563] uppercase tracking-wide"
                  >
                    Deixe uma mensagem (opcional)
                  </label>
                  <textarea
                    id="mensagem"
                    rows={3}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Escreva uma palavra de carinho..."
                    className="w-full px-4 py-3.5 bg-white border border-[#E5E7EB] rounded-lg
                      font-sans text-[16px] text-[#0F172A] placeholder:text-[#9CA3AF]
                      resize-y focus:outline-none focus:border-[#215E9F]
                      focus:shadow-[0_0_0_3px_rgba(33,94,159,0.12)]
                      transition-all duration-200"
                  />
                </div>

                {/* Botão gerar PIX */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2.5 w-full py-4 rounded-[10px]
                    bg-[#F97316] text-white font-sans text-[16px] font-semibold
                    hover:bg-[#EA580C] disabled:opacity-60 disabled:cursor-not-allowed
                    transition-colors duration-200"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                      Gerando PIX...
                    </>
                  ) : (
                    <>
                      <QrCode size={20} aria-hidden="true" />
                      Gerar PIX
                    </>
                  )}
                </button>
              </form>

              {/* Nota de segurança */}
              <p className="font-sans text-[12px] text-[#9CA3AF] text-center mt-5 leading-relaxed">
                O Hub da Fé não processa pagamentos. O PIX é feito diretamente para a igreja.
              </p>
            </>
          )}

          {/* ── Etapa 2 — Sucesso / QR Code ── */}
          {etapa === 'sucesso' && (
            <div className="flex flex-col items-center text-center">
              {/* Ícone de sucesso */}
              <CheckCircle2 size={56} className="text-[#16A34A] mb-4" aria-hidden="true" />
              <h1 className="font-title font-bold text-[24px] text-[#0F172A]">
                PIX gerado com sucesso!
              </h1>
              <p className="font-sans text-[16px] text-[#4B5563] mt-2 leading-relaxed">
                Escaneie o QR Code abaixo para concluir sua contribuição
              </p>

              {/* Card do QR Code */}
              <div className="mt-8 w-full border-2 border-dashed border-[#E5E7EB] rounded-2xl p-8">
                <div
                  className="mx-auto flex flex-col items-center justify-center gap-2"
                  role="img"
                  aria-label="QR Code PIX para contribuição"
                >
                  {pixPayloadStr ? (
                    <PixSVG
                      pixkey={igreja.chave_pix}
                      merchant={igreja.nome.substring(0, 25)}
                      city={igreja.cidade || 'Recife'}
                      amount={valorEmCentavos(valorFormatado) / 100}
                      size={220}
                    />
                  ) : (
                    <div className="w-[200px] h-[200px] bg-[#F5F5F7] rounded-lg flex flex-col items-center justify-center">
                      <QrCode size={64} className="text-[#215E9F]" />
                    </div>
                  )}
                </div>
                <p className="font-sans text-[12px] text-[#9CA3AF] mt-4">
                  Escaneie o QR Code com o aplicativo do seu banco
                </p>
              </div>

              {/* Detalhes da contribuição */}
              <div className="w-full mt-6 flex flex-col gap-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[16px] text-[#4B5563]">Valor:</span>
                  <span className="font-sans text-[16px] font-bold text-[#0F172A]">
                    {valorFormatado}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[16px] text-[#4B5563]">Igreja:</span>
                  <span className="font-sans text-[16px] text-[#0F172A]">{igreja.nome}</span>
                </div>
                <div className="flex items-center justify-between gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-[#E5E7EB] mt-2">
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-sans text-[12px] font-medium text-[#64748B] uppercase tracking-wide">
                      PIX Copia e Cola
                    </span>
                    <span className="font-sans text-[14px] text-[#0F172A] truncate mt-1">
                      {pixPayloadStr || igreja.chave_pix}
                    </span>
                  </div>
                  <button
                    onClick={copiarChave}
                    className="flex-shrink-0 p-3 rounded-lg bg-white border border-[#E5E7EB] hover:border-[#215E9F] hover:text-[#215E9F] text-[#4B5563] shadow-sm transition-all duration-200"
                    aria-label={copiado ? 'Chave copiada' : 'Copiar PIX copia e cola'}
                    title={copiado ? 'Copiado!' : 'Copiar PIX copia e cola'}
                  >
                    {copiado ? (
                      <Check size={16} className="text-[#16A34A]" aria-hidden="true" />
                    ) : (
                      <Copy size={16} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="w-full mt-8 flex flex-col gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl
                    border border-[1.5px] border-[#215E9F] text-[#215E9F]
                    font-sans text-[15px] font-semibold
                    hover:bg-[#E3F0FF] transition-colors duration-200"
                >
                  <Printer size={18} aria-hidden="true" />
                  Imprimir comprovante
                </button>

                <Link
                  href={`/igrejas/${slug}`}
                  className="font-sans text-[14px] text-[#215E9F] text-center py-2
                    hover:underline transition-colors duration-200"
                >
                  Voltar para {igreja.nome}
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
