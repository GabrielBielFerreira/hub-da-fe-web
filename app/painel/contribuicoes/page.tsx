"use client"

import { useState } from "react"

// Dados mock das contribuições (mais dados que o dashboard)
const contribuicoesMock = [
  {
    data: "01/05/2026",
    contribuinte: "Maria Silva",
    valor: "R$ 150,00",
    status: "confirmada" as const,
    mensagem: "Deus abençoe!",
  },
  {
    data: "30/04/2026",
    contribuinte: null,
    valor: "R$ 50,00",
    status: "confirmada" as const,
    mensagem: null,
  },
  {
    data: "29/04/2026",
    contribuinte: "João Pedro Santos",
    valor: "R$ 200,00",
    status: "confirmada" as const,
    mensagem: "Para a campanha de alimentos",
  },
  {
    data: "28/04/2026",
    contribuinte: "Ana Beatriz",
    valor: "R$ 75,00",
    status: "pendente" as const,
    mensagem: "Com carinho",
  },
  {
    data: "27/04/2026",
    contribuinte: null,
    valor: "R$ 100,00",
    status: "confirmada" as const,
    mensagem: null,
  },
  {
    data: "25/04/2026",
    contribuinte: "Carlos Eduardo",
    valor: "R$ 300,00",
    status: "confirmada" as const,
    mensagem: "Contribuição mensal",
  },
  {
    data: "22/04/2026",
    contribuinte: "Fernanda Oliveira",
    valor: "R$ 80,00",
    status: "confirmada" as const,
    mensagem: null,
  },
  {
    data: "20/04/2026",
    contribuinte: null,
    valor: "R$ 250,00",
    status: "pendente" as const,
    mensagem: "Oferta especial",
  },
  {
    data: "18/04/2026",
    contribuinte: "Roberto Lima",
    valor: "R$ 120,00",
    status: "confirmada" as const,
    mensagem: "Reforma do templo",
  },
  {
    data: "15/04/2026",
    contribuinte: "Patricia Santos",
    valor: "R$ 95,00",
    status: "confirmada" as const,
    mensagem: null,
  },
]

// Estilos de badge por status
const statusStyles = {
  confirmada: {
    bg: "bg-[#DCFCE7]",
    text: "text-[#16A34A]",
    label: "Confirmada",
  },
  pendente: {
    bg: "bg-[#FEF3C7]",
    text: "text-[#F59E0B]",
    label: "Pendente",
  },
}

export default function ContribuicoesPainelPage() {
  const [periodo, setPeriodo] = useState("mes")
  const [statusFilter, setStatusFilter] = useState("todos")

  // Filtra contribuições (mock)
  const contribuicoesFiltradas = contribuicoesMock.filter((c) => {
    if (statusFilter === "todos") return true
    return c.status === statusFilter
  })

  // Calcula total
  const total = contribuicoesFiltradas.reduce((acc, c) => {
    const valor = parseFloat(
      c.valor.replace("R$ ", "").replace(".", "").replace(",", ".")
    )
    return acc + valor
  }, 0)

  return (
    <div>
      {/* Cabeçalho */}
      <div className="mb-6">
        <h1 className="font-title text-[28px] font-bold text-[#0F172A]">
          Contribuições
        </h1>
        <p className="font-sans text-base text-[#4B5563] mt-1">
          Histórico de contribuições recebidas pela sua igreja
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div>
          <label className="sr-only">Período</label>
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="border border-[#E5E7EB] rounded-lg px-4 py-2.5 font-sans text-sm text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          >
            <option value="mes">Este mês</option>
            <option value="3meses">Últimos 3 meses</option>
            <option value="ano">Último ano</option>
            <option value="tudo">Tudo</option>
          </select>
        </div>
        <div>
          <label className="sr-only">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-[#E5E7EB] rounded-lg px-4 py-2.5 font-sans text-sm text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          >
            <option value="todos">Todos</option>
            <option value="confirmada">Confirmada</option>
            <option value="pendente">Pendente</option>
          </select>
        </div>
      </div>

      {/* Card com tabela */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-[0_4px_12px_rgba(15,23,42,0.04)]">
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
                  Status
                </th>
                <th className="text-left px-4 py-3 font-sans text-[13px] font-semibold text-[#4B5563] uppercase">
                  Mensagem
                </th>
              </tr>
            </thead>
            <tbody>
              {contribuicoesFiltradas.map((c, index) => {
                const style = statusStyles[c.status]
                return (
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
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}
                      >
                        {style.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-sans text-sm text-[#4B5563]">
                      {c.mensagem || "—"}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Rodapé com total */}
          <div className="border-t border-[#E5E7EB] mt-4 pt-4 flex justify-end">
            <div className="text-right">
              <span className="font-sans text-sm text-[#4B5563]">Total: </span>
              <span className="font-title text-base font-bold text-[#0F172A]">
                R${" "}
                {total.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Cards Mobile */}
        <div className="md:hidden space-y-3">
          {contribuicoesFiltradas.map((c, index) => {
            const style = statusStyles[c.status]
            return (
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
                  <div className="text-right">
                    <span className="font-title text-sm font-semibold text-[#0F172A]">
                      {c.valor}
                    </span>
                    <span
                      className={`block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${style.bg} ${style.text}`}
                    >
                      {style.label}
                    </span>
                  </div>
                </div>
                {c.mensagem && (
                  <p className="font-sans text-sm text-[#4B5563]">
                    {c.mensagem}
                  </p>
                )}
              </div>
            )
          })}

          {/* Total mobile */}
          <div className="border-t border-[#E5E7EB] pt-4 mt-4 text-right">
            <span className="font-sans text-sm text-[#4B5563]">Total: </span>
            <span className="font-title text-base font-bold text-[#0F172A]">
              R${" "}
              {total.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
