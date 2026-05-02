// Dados mock de igrejas — será substituído por chamadas ao Supabase futuramente
import type { Igreja } from '@/types/igreja'

export const igrejasMock: Igreja[] = [
  {
    id: '1',
    slug: 'frutificacao',
    nome: 'IA Frutificação',
    logo: '/images/frutificacao.jpg',
    descricao:
      'A Igreja Adventista Frutificação é uma comunidade cristã comprometida com o crescimento espiritual e o serviço ao próximo no coração de Boa Viagem.',
    missao: 'Levando a palavra de Deus e cultivando frutos de fé na comunidade.',
    visao:
      'Ser uma comunidade que transforma vidas através da fé, do amor fraterno e do serviço dedicado.',
    bairro: 'Boa Viagem',
    cidade: 'Recife',
    estado: 'PE',
    endereco: 'Av. Boa Viagem, 1234',
    cep: '51011-000',
    telefone: '(81) 3325-1234',
    email: 'contato@frutificacao.org.br',
    site: 'https://frutificacao.org.br',
    instagram: 'iafrutificacao',
    facebook: 'iafrutificacao',
    horarios_culto:
      'Culto de Adoração: Sábado às 10h\nEscola Sabatina: Sábado às 9h\nCulto de Oração: Quarta-feira às 19h30',
    chave_pix: 'pix@frutificacao.org.br',
    status: 'aprovada',
    campanhas: [
      {
        id: 'c1',
        titulo: 'Reforma do Templo',
        descricao:
          'Ajude-nos a reformar o salão principal para receber mais famílias com conforto e dignidade.',
        status: 'ativa',
      },
      {
        id: 'c2',
        titulo: 'Cesta Básica — Famílias Carentes',
        descricao:
          'Distribuição mensal de cestas básicas para 50 famílias em situação de vulnerabilidade social.',
        status: 'ativa',
      },
    ],
  },
  {
    id: '2',
    slug: 'kadosh',
    nome: 'Igreja Kadosh',
    logo: '/images/kadosh.jpg',
    descricao:
      'A Igreja Kadosh é um ministério dedicado à santidade e ao louvor, servindo a comunidade de Casa Amarela com amor e comprometimento.',
    missao: 'Uma comunidade de fé, esperança e serviço dedicada ao próximo.',
    visao: 'Ser luz e sal na região, impactando famílias através do evangelho e do serviço social.',
    bairro: 'Casa Amarela',
    cidade: 'Recife',
    estado: 'PE',
    endereco: 'Rua Padre Cícero, 456',
    cep: '52070-180',
    telefone: '(81) 3441-5678',
    email: 'contato@kadosh.org.br',
    instagram: 'igrejkadosh',
    horarios_culto:
      'Culto Dominical: Domingo às 9h e 19h\nCulto da Família: Quarta-feira às 19h30\nJovens: Sexta-feira às 20h',
    chave_pix: 'pix@kadosh.org.br',
    status: 'aprovada',
    campanhas: [
      {
        id: 'c3',
        titulo: 'Escola Bíblica Infantil',
        descricao:
          'Expansão da escola bíblica para atender mais crianças do bairro com materiais didáticos e lanche.',
        status: 'ativa',
      },
    ],
  },
  {
    id: '3',
    slug: 'nova-alianca',
    nome: 'Comunidade Nova Aliança',
    logo: '/images/nova-alianca.jpg',
    descricao:
      'A Comunidade Nova Aliança nasceu do desejo de servir a região de Olinda com amor genuíno, unindo famílias em torno da fé e da transformação social.',
    missao: 'Unidos pela fé, servindo com amor e transformando nossa região.',
    visao:
      'Ser uma comunidade referência em amor, servindo a Olinda e região metropolitana do Recife.',
    bairro: 'Rio Doce',
    cidade: 'Olinda',
    estado: 'PE',
    endereco: 'Rua das Amendoeiras, 789',
    cep: '53130-260',
    telefone: '(81) 3429-9012',
    email: 'contato@novaalianca.org.br',
    site: 'https://novaalianca.org.br',
    instagram: 'novaaliancaolinda',
    facebook: 'novaaliancaolinda',
    horarios_culto:
      'Culto Domingo: 9h e 18h\nEstudo Bíblico: Terça-feira às 19h\nLouvor e Adoração: Quinta-feira às 20h',
    chave_pix: 'cnarecife01@gmail.com',
    status: 'aprovada',
    campanhas: [
      {
        id: 'c4',
        titulo: 'Construção do Novo Templo',
        descricao:
          'Estamos construindo um novo templo para abrigar nossa crescente comunidade. Cada contribuição nos aproxima desse sonho.',
        status: 'ativa',
      },
      {
        id: 'c5',
        titulo: 'Projeto Adolescentes em Foco',
        descricao:
          'Programa de acompanhamento para adolescentes em situação de risco com atividades culturais e espirituais.',
        status: 'ativa',
      },
    ],
  },
  {
    id: '4',
    slug: 'batista-renascer',
    nome: 'Igreja Batista Renascer',
    descricao:
      'Uma comunidade batista comprometida com o evangelho e com o desenvolvimento integral das famílias de Jaboatão dos Guararapes.',
    missao:
      'Proclamar o evangelho de Jesus Cristo e discipular famílias para uma vida de fé e propósito.',
    bairro: 'Centro',
    cidade: 'Jaboatão dos Guararapes',
    estado: 'PE',
    endereco: 'Av. Barreto de Menezes, 321',
    cep: '54400-020',
    telefone: '(81) 3362-3456',
    email: 'secretaria@batistarenascer.org.br',
    instagram: 'batistarenascer',
    horarios_culto:
      'Culto da Manhã: Domingo às 9h\nCulto da Noite: Domingo às 19h\nEstudo Bíblico: Quarta-feira às 19h30',
    chave_pix: '47.123.456/0001-89',
    status: 'aprovada',
    campanhas: [],
  },
  {
    id: '5',
    slug: 'palavra-viva',
    nome: 'Ministério Palavra Viva',
    descricao:
      'O Ministério Palavra Viva é um ministério evangelístico focado em alcançar jovens e famílias em Paulista através de eventos, missões e louvor.',
    missao:
      'Levar a Palavra de Deus às famílias de Paulista através de ações evangelísticas e de discipulado.',
    bairro: 'Maranguape I',
    cidade: 'Paulista',
    estado: 'PE',
    endereco: 'Rua João Fernandes, 654',
    cep: '53440-065',
    telefone: '(81) 3435-7890',
    email: 'ministerio@palavraviva.com.br',
    instagram: 'palavravivapaulista',
    horarios_culto:
      'Culto Principal: Domingo às 18h\nCélulas de Casa: Terça e Quinta às 19h30\nJovens Unite: Sábado às 19h',
    chave_pix: 'pix@palavraviva.com.br',
    status: 'aprovada',
    campanhas: [
      {
        id: 'c6',
        titulo: 'Missão nas Comunidades',
        descricao:
          'Ação missionária nas comunidades carentes de Paulista com distribuição de alimentos e atendimento espiritual.',
        status: 'ativa',
      },
    ],
  },
  {
    id: '6',
    slug: 'nova-esperanca',
    nome: 'Assembleia de Deus Nova Esperança',
    descricao:
      'A AD Nova Esperança é uma congregação pentecostal comprometida com a obra de Deus e com o bem-estar da comunidade de Camaragibe.',
    missao:
      'Ser uma igreja que transforma vidas pelo poder do Espírito Santo e serve a comunidade com excelência.',
    visao: 'Estabelecer um centro de referência espiritual e social para toda a região de Camaragibe.',
    bairro: 'Centro',
    cidade: 'Camaragibe',
    estado: 'PE',
    endereco: 'Rua Belo Horizonte, 100',
    cep: '54768-060',
    telefone: '(81) 3458-1234',
    email: 'adnovaesperanca@gmail.com',
    facebook: 'adnovaesperancacmg',
    horarios_culto:
      'Escola Dominical: Domingo às 9h\nCulto de Celebração: Domingo às 19h\nCulto de Oração e Ensino: Quarta-feira às 19h30\nCulto de Jovens: Sexta-feira às 20h',
    chave_pix: '12.345.678/0001-99',
    status: 'aprovada',
    campanhas: [
      {
        id: 'c7',
        titulo: 'Sopão Solidário',
        descricao:
          'Distribuição semanal de refeições quentes para pessoas em situação de rua e famílias carentes.',
        status: 'ativa',
      },
    ],
  },
]
