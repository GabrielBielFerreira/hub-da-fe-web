"use client"

import { useState } from "react"
import { Plus, Pencil, Pause, Play, XCircle } from "lucide-react"

// Dados mock das campanhas
const campanhasMock = [
  {
    id: "1",
    titulo: "Campanha de Alimentos",
    status: "ativa" as const,
    dataInicio: "01/04/2026",
    dataFim: "30/06/2026",
  },
  {
    id: "2",
    titulo: "Reforma do Templo",
    status: "pausada" as const,
    dataInicio: "15/03/2026",
    dataFim: "15/09/2026",
  },
  {
    id: "3",
    titulo: "Natal Solidário 2025",
    status: "encerrada" as const,
    dataInicio: "01/11/2025",
    dataFim: "25/12/2025",
  },
]

// Estilos de badge por status
const statusStyles = {
  ativa: {
    bg: "bg-[#DCFCE7]",
    text: "text-[#16A34A]",
    label: "Ativa",
  },
  pausada: {
    bg: "bg-[#FEF3C7]",
    text: "text-[#F59E0B]",
    label: "Pausada",
  },
  encerrada: {
    bg: "bg-[#FEE2E2]",
    text: "text-[#DC2626]",
    label: "Encerrada",
  },
}

export default function CampanhasPage() {
  const [campanhas, setCampanhas] = useState(campanhasMock)

  // Alterna status entre ativa/pausada
  const togglePause = (id: string) => {
    setCampanhas((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            status: c.status === "ativa" ? "pausada" : "ativa",
          }
        }
        return c
      })
    )
  }

  // Encerra campanha
  const encerrar = (id: string) => {
    setCampanhas((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return { ...c, status: "encerrada" as const }
        }
        return c
      })
    )
  }

  return (
    <div>
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="font-title text-[28px] font-bold text-[#0F172A]">
          Campanhas
        </h1>
        <button className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-sans text-[15px] font-semibold py-3 px-5 rounded-lg transition-colors">
          <Plus size={16} />
          Criar Nova Campanha
        </button>
      </div>

      {/* Card com tabela */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-[0_4px_12px_rgba(15,23,42,0.04)]">
        {/* Tabela Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F5F5F7]">
                <th className="text-left px-4 py-3 font-sans text-[13px] font-semibold text-[#4B5563] uppercase">
                  Título
                </th>
                <th className="text-left px-4 py-3 font-sans text-[13px] font-semibold text-[#4B5563] uppercase">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-sans text-[13px] font-semibold text-[#4B5563] uppercase">
                  Data Início
                </th>
                <th className="text-left px-4 py-3 font-sans text-[13px] font-semibold text-[#4B5563] uppercase">
                  Data Fim
                </th>
                <th className="text-left px-4 py-3 font-sans text-[13px] font-semibold text-[#4B5563] uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {campanhas.map((c, index) => {
                const style = statusStyles[c.status]
                return (
                  <tr
                    key={c.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#F5F5F7]"}
                  >
                    <td className="px-4 py-3 font-sans text-sm font-medium text-[#0F172A]">
                      {c.titulo}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}
                      >
                        {style.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-sans text-sm text-[#4B5563]">
                      {c.dataInicio}
                    </td>
                    <td className="px-4 py-3 font-sans text-sm text-[#4B5563]">
                      {c.dataFim}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          title="Editar"
                          className="p-2 rounded-lg hover:bg-[#E3F0FF] text-primary transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        {c.status !== "encerrada" && (
                          <>
                            <button
                              title={c.status === "ativa" ? "Pausar" : "Retomar"}
                              onClick={() => togglePause(c.id)}
                              className="p-2 rounded-lg hover:bg-[#FEF3C7] text-[#F59E0B] transition-colors"
                            >
                              {c.status === "ativa" ? (
                                <Pause size={16} />
                              ) : (
                                <Play size={16} />
                              )}
                            </button>
                            <button
                              title="Encerrar"
                              onClick={() => encerrar(c.id)}
                              className="p-2 rounded-lg hover:bg-[#FEE2E2] text-[#DC2626] transition-colors"
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Cards Mobile */}
        <div className="md:hidden space-y-4">
          {campanhas.map((c) => {
            const style = statusStyles[c.status]
            return (
              <div
                key={c.id}
                className="bg-[#F5F5F7] rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-sans text-sm font-medium text-[#0F172A]">
                    {c.titulo}
                  </h3>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}
                  >
                    {style.label}
                  </span>
                </div>
                <div className="flex gap-4 text-xs text-[#4B5563]">
                  <span>Início: {c.dataInicio}</span>
                  <span>Fim: {c.dataFim}</span>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-[#E5E7EB]">
                  <button
                    title="Editar"
                    className="p-2 rounded-lg hover:bg-white text-primary transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  {c.status !== "encerrada" && (
                    <>
                      <button
                        title={c.status === "ativa" ? "Pausar" : "Retomar"}
                        onClick={() => togglePause(c.id)}
                        className="p-2 rounded-lg hover:bg-white text-[#F59E0B] transition-colors"
                      >
                        {c.status === "ativa" ? (
                          <Pause size={16} />
                        ) : (
                          <Play size={16} />
                        )}
                      </button>
                      <button
                        title="Encerrar"
                        onClick={() => encerrar(c.id)}
                        className="p-2 rounded-lg hover:bg-white text-[#DC2626] transition-colors"
                      >
                        <XCircle size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
