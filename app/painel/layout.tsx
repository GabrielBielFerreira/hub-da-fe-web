import Sidebar from "@/components/layout/Sidebar"

export const metadata = {
  title: "Painel do Líder | Hub da Fé",
  description: "Gerencie sua igreja no Hub da Fé",
}

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Sidebar (fixa no desktop, drawer no mobile) */}
      <Sidebar />

      {/* Área de conteúdo */}
      <main className="lg:ml-[260px] pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
