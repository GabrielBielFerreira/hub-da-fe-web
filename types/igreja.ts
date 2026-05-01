// Interfaces TypeScript para os dados de igrejas e campanhas
// Quando o Supabase for conectado, estas interfaces refletirão as tabelas do banco

export interface Campanha {
  id: string
  titulo: string
  descricao: string
  status: 'ativa' | 'pausada' | 'encerrada'
}

export interface Igreja {
  id: string
  slug: string
  nome: string
  descricao: string
  missao: string
  visao?: string
  logo?: string         // URL da logo (fallback: iniciais sobre fundo primary-soft)
  banner?: string       // URL do banner (fallback: gradiente primary)
  bairro: string
  cidade: string
  estado: string
  endereco: string
  cep?: string
  telefone?: string
  email?: string
  site?: string
  instagram?: string
  facebook?: string
  horarios_culto?: string
  chave_pix: string
  status: 'aprovada' | 'pendente' | 'reprovada'
  campanhas: Campanha[]
}
