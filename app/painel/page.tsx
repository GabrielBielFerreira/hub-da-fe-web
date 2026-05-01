"use client"

import Link from "next/link"
import {
  DollarSign,
  Heart,
  Megaphone,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

// Dados mock dos KPIs
const kpis = [
  {
    label: "Total Arrecadado",
    value: "R$ 4.250,00",
    variation: "+18% este mês",
    positive: true,
    icon: DollarSign,
    iconBg: "#DCFCE7",
    iconColor: "#16A34A",
  },
  {
    label: "Contribuições",
    value: "47",
    variation: "+8% este mês",
    positive: true,
    icon: Heart,
    iconBg: "#E3F0FF",
    iconColor: "#215E9F",
  },
  {
    label: "Campanhas Ativas",
    value: "3",
    variation: null,
    positive: null,
    icon: Megaphone,
    iconBg: "#FFF4E6",
    iconColor: "#F97316",
  },
  {
    label: "Ticket Médio",
    value: "R$ 90,43",
    variation: "+5% este mês",
    positive: true,
    icon: TrendingUp,
    iconBg: "#E3F0FF",
    iconColor: "#215E9F",
  },
]

// Dados mock do gráfico (últimos 6 meses)
const chartData = [
  { month: "Dez", value: 2100 },
  { month: "Jan", value: 3400 },
  { month: "Fev", value: 2800 },
  { month: "Mar", value: 3900 },
  { month: "Abr", value: 4250 },
  { month: "Mai", value: 3700 },
]

// Valor máximo para calcular altura proporcional das barras
const maxValue = Math.max(...chartData.map((d) => d.value))

// Dados mock das últimas contribuições
const contribuicoes = [
  {
    data: "01/05/2026",
    contribuinte: "Maria Silva",
    valor: "R$ 150,00",
    mensagem: "Deus abençoe!",
  },
  {
    data: "30/04/2026",
    contribuinte: null,
    valor: "R$ 50,00",
    mensagem: null,
  },
  {
    data: "29/04/2026",
    contribuinte: "João Pedro Santos",
    valor: "R$ 200,00",
    mensagem: "Para a campanha de alimentos",
  },
  {
    data: "28/04/2026",
    contribuinte: "Ana Beatriz",
    valor: "R$ 75,00",
    mensagem: "Com carinho",
  },
  {
    data: "27/04/2026",
    contribuinte: null,
    valor: "R$ 100,00",
    mensagem: null,
  },
]

export default function PainelPage() {
  return (
    <div>
      {/* Cabeçalho */}
      <div className="mb-6">
        <h1 className="font-title text-[28px] font-bold text-[#0F172A]">
          Painel
        </h1>
        <p className="font-sans text-base text-[#4B5563] mt-1">
          Bem-vindo de volta! Aqui está o resumo da sua igreja.
        </p>
      </div>

      {/* Grid de KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div
              key={kpi.label}
              className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-[0_4px_12px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: kpi.iconBg }}
                >
                  <Icon size={20} style={{ color: kpi.iconColor }} />
                </div>
                <span className="font-sans text-sm text-[#4B5563]">
                  {kpi.label}
                </span>
              </div>
              <p className="font-title text-[28px] font-bold text-[#0F172A] mt-3">
                {kpi.value}
              </p>
              {kpi.variation && (
                <div className="flex items-center gap-1 mt-1">
                  {kpi.positive ? (
                    <TrendingUp size={14} className="text-[#16A34A]" />
                  ) : (
                    <TrendingDown size={14} className="text-[#DC2626]" />
                  )}
                  <span
                    className={`font-sans text-[13px] ${
                      kpi.positive ? "text-[#16A34A]" : "text-[#DC2626]"
                    }`}
                  >
                    {kpi.variation}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Gráfico de barras */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mt-8 shadow-[0_4px_12px_rgba(15,23,42,0.04)]">
        <div className="mb-4">
          <h2 className="font-title text-lg font-semibold text-[#0F172A]">
            Evolução de Contribuições
          </h2>
          <p className="font-sans text-[13px] text-[#9CA3AF]">
            Últimos 6 meses
          </p>
        </div>

        {/* Barras do gráfico (CSS puro) */}
        <div className="flex items-end justify-between gap-4 h-[200px] pt-8">
          {chartData.map((item) => {
            const heightPercent = (item.value / maxValue) * 100
            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center gap-2"
              >
                {/* Valor acima da barra */}
                <span className="font-sans text-xs font-semibold text-[#0F172A]">
                  R$ {(item.value / 1000).toFixed(1)}k
                </span>
                {/* Barra */}
                <div
                  className="w-full bg-primary rounded-t-md transition-all duration-300 hover:bg-primary-hover"
                  style={{ height: `${heightPercent}%`, minHeight: "20px" }}
                />
                {/* Label do mês */}
                <span className="font-sans text-xs text-[#9CA3AF]">
                  {item.month}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tabela de últimas contribuições */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mt-8 shadow-[0_4px_12px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-title text-lg font-semibold text-[#0F172A]">
            Últimas Contribuições
          </h2>
          <Link
            href="/painel/contribuicoes"
            className="font-sans text-sm text-primary hover:text-primary-hover transition-colors"
          >
            Ver todas &rarr;
          </Link>
        </div>

        {/* Tabela Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F5F5F7]">
                <th className="text-left px-4 py-3 font-sans text-[13px] font-semibold text-[#4B5563] uppercase">
                  Data
                </th>
                <th className="text-left px-4 py-3 font-sans text-[13px] font-semibold text-[#4B5563] uppercase">
                  Contribuinte
                </th>
                <th className="text-left px-4 py-3 font-sans text-[13px] font-semibold text-[#4B5563] uppercase">
                  Valor
                </th>
                <th className="text-left px-4 py-3 font-sans text-[13px] font-semibold text-[#4B5563] uppercase">
                  Mensagem
                </th>
              </tr>
            </thead>
            <tbody>
              {contribuicoes.map((c, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-[#F5F5F7]"}
                >
                  <td className="px-4 py-3 font-sans text-sm text-[#0F172A]">
                    {c.data}
                  </td>
                  <td className="px-4 py-3 font-sans text-sm">
                    {c.contribuinte ? (
                      <span className="text-[#0F172A]">{c.contribuinte}</span>
                    ) : (
                      <span className="text-[#9CA3AF] italic">Anônimo</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-title text-sm font-semibold text-[#0F172A]">
                    {c.valor}
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-[#4B5563]">
                    {c.mensagem || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards Mobile */}
        <div className="md:hidden space-y-3">
          {contribuicoes.map((c, index) => (
            <div
              key={index}
              className="bg-[#F5F5F7] rounded-lg p-4 space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-sans text-xs text-[#9CA3AF]">{c.data}</p>
                  {c.contribuinte ? (
                    <p className="font-sans text-sm text-[#0F172A] font-medium">
                      {c.contribuinte}
                    </p>
                  ) : (
                    <p className="font-sans text-sm text-[#9CA3AF] italic">
                      Anônimo
                    </p>
                  )}
                </div>
                <span className="font-title text-sm font-semibold text-[#0F172A]">
                  {c.valor}
                </span>
              </div>
              {c.mensagem && (
                <p className="font-sans text-sm text-[#4B5563]">
                  {c.mensagem}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
