# CONTEXTO COMPLETO — HUB DA FÉ (v8 — 30/04/2026)
# Cole este documento no início de qualquer novo chat com qualquer IA.
# Este documento substitui todas as versões anteriores (v1 a v7).

---

## 1. QUEM É O DESENVOLVEDOR

**Nome:** Gabriel Ferreira
**Empresa:** Estagiário na EMPREL (Empresa Municipal de Informática do Recife)
**Nível técnico:** Básico/intermediário — sabe usar GitHub, Supabase e Next.js no nível básico
**Design:** Não tem experiência em design — a IA deve tomar todas as decisões visuais
**Postura:** Está aprendendo enquanto constrói. Precisa de orientação clara e decisões já tomadas.

---

## 2. O QUE É O PROJETO

**Nome:** Hub da Fé
**Tipo:** Plataforma web independente (sem vínculo com governo ou prefeitura)
**Missão:** Centralizar igrejas evangélicas/cristãs, suas campanhas comunitárias
e arrecadação digital via PIX — tudo em um único hub público.

### O problema que resolve
Igrejas não têm ferramentas digitais organizadas para:
- Ter uma página institucional pública
- Gerenciar campanhas comunitárias com meta de arrecadação
- Receber contribuições via PIX de forma transparente
- Mostrar impacto para a comunidade

### Referências visuais obrigatórias
| Referência | URL | O que herdar |
|---|---|---|
| Bora Impactar | boraimpactar.recife.pe.gov.br | Hub público, catálogo com filtros, cards institucionais, densidade de informação |
| Givelify | givelify.com | Visual moderno espiritual, paleta roxa/violeta, plataforma de doação para igrejas |

---

## 3. SITUAÇÃO ATUAL DO PROJETO

### Back-end (Supabase) — ~85% pronto
| Item | Status |
|---|---|
| Projeto Supabase criado e configurado | ✅ |
| Schema completo do banco (todas as tabelas) | ✅ |
| Enums criados | ✅ |
| Triggers e funções SQL | ✅ |
| Trigger promoção membro → líder | ✅ |
| Buckets Storage (logos/banners) com RLS | ✅ |
| Coluna `intencao` na tabela `perfis` | ✅ |
| Função `handle_new_user` atualizada | ✅ |
| RLS ativo | ✅ (políticas incompletas) |
| Políticas RLS completas | ⚠️ Em andamento |

### Front-end — 0% (não iniciado)
| Item | Status |
|---|---|
| Telas/páginas | ❌ Zero telas criadas |
| Design system | ❌ Não criado |
| Componentes | ❌ Não criados |

> O repositório `hub-da-fe-web` contém apenas o `package-lock.json` gerado
> pelo Bolt antes de atingir o limite. Nenhuma tela foi criada.

---

## 4. FERRAMENTA DE DESENVOLVIMENTO

**Editor principal:** Antigravid (VS Code com IA integrada)
- Funciona como VS Code com IA integrada e terminal
- Repositório `hub-da-fe-web` já clonado/importado do GitHub

**Repositório oficial:** github.com/GabrielBielFerreira/hub-da-fe-web
**Supabase URL:** yyrkgdrnwjelypworrqu.supabase.co

---

## 5. STACK TÉCNICA (NÃO MUDAR)

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14 App Router |
| Estilização | Tailwind CSS puro |
| Linguagem | TypeScript |
| Banco | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/senha) |
| Segurança | Row Level Security (RLS) |
| Storage | Supabase Storage |
| QR Code PIX | react-qrcode-pix |
| Ícones | Lucide Icons |
| Hospedagem | Azure Static Web Apps |
| Editor/IA | Antigravid (VS Code com IA) |
| Comentários no código | Sempre em Português |

---

## 6. IDENTIDADE VISUAL

**Modo:** Light mode obrigatório em todas as telas sem exceção
**Tom:** Acolhedor, espiritual, institucional — moderno e humano
**Inspiração:** Givelify (visual espiritual moderno) + Bora Impactar (institucional, hub público)

### Paleta de cores
| Token | Valor | Uso |
|---|---|---|
| bg-base | #FFFFFF | Fundo principal |
| bg-card | #F9FAFB | Cards e painéis |
| bg-elevated | #FFFFFF | Modais, dropdowns |
| bg-sidebar | #F9FAFB | Sidebar e nav |
| primary | #7C3AED | Cor primária — roxo espiritual |
| primary-hover | #6D28D9 | Hover de botões |
| primary-light | #C4B5FD | Destaques, ícones ativos, links |
| primary-subtle | rgba(124,58,237,0.08) | Backgrounds sutis, glow |
| accent | #4F46E5 | Indigo — cor de apoio, gradientes |
| text-main | #111827 | Títulos e corpo principal |
| text-muted | #6B7280 | Labels, descrições |
| text-disabled | #9CA3AF | Elementos desabilitados |
| success | #16A34A | Confirmações |
| warning | #D97706 | Alertas e pendências |
| danger | #DC2626 | Erros e reprovações |
| border | #E5E7EB | Bordas sutis |
| border-highlight | #D1D5DB | Bordas em hover/focus |

### Gradientes permitidos
- Hero: `from-[#FFFFFF] via-[#F3F4F6] to-[#FFFFFF]`
- Botão especial: `from-[#7C3AED] to-[#4F46E5]`
- Card de destaque: `from-[#F9FAFB] to-[#F3F4F6]`
- Overlay de banner: `from-black/60 via-black/30 to-transparent`

### Tipografia
| Uso | Tamanho | Peso |
|---|---|---|
| Títulos hero | 40–52px | 800 |
| Títulos de página | 28–32px | 700 |
| Títulos de seção | 20–24px | 600 |
| Corpo | 14–16px | 400 |
| Labels | 12–13px uppercase | 500 |
| Botões | 14px | 600 |

**Fonte:** Inter (Google Fonts)

### Componentes e estilo
- Border radius: cards 16px | botões 10px | inputs 10px | badges 9999px
- Sombras: `0 4px 24px rgba(124,58,237,0.15)` em cards flutuantes
- Glassmorphism: `backdrop-filter: blur(12px); background: rgba(255,255,255,0.85)`
- Animações: fade-in, slide-up em cards, hover scale 1.02 em cards clicáveis
- Ícones: Lucide Icons 18–20px
- Grid: 12 colunas desktop / 4 mobile / gap 16–24px
- Espaçamento: múltiplos de 4px

### Regras obrigatórias de UI
- Light mode em todas as telas sem exceção
- Mobile-first: funcionar em 375px
- Label sempre acima do input
- Feedback visual em todas as ações: loading, sucesso, erro
- Hierarquia: KPIs → gráficos → tabelas
- Nunca criar campo fora do schema do banco
- Comentários no código sempre em português

---

## 7. PERFIS DE USUÁRIO

| Perfil | Código | O que acessa |
|---|---|---|
| Visitante | — | Site público, catálogo, páginas de igrejas |
| Membro | membro | Contribui + histórico pessoal em /minhas-contribuicoes |
| Líder | lider | Painel completo: campanhas, financeiro, minha igreja |
| Admin | admin | /admin oculto — aprovação de igrejas |

**Regra de promoção:** Todo cadastro começa como `membro`.
Vira `lider` automaticamente via trigger no Supabase quando sua igreja é aprovada pelo admin.

---

## 8. FLUXO DE CADASTRO E AUTENTICAÇÃO

### Tela /entrar — escolha visual (sem formulário direto)
Exibe dois cards grandes e visuais:

```
[ 🙏 Quero contribuir com igrejas ]  →  /entrar/contribuinte
[ ⛪ Tenho uma Igreja               ]  →  /entrar/lider
```

### /entrar/contribuinte
- Formulário: nome, email, senha
- Cria usuário no Supabase Auth
- Cria perfil com: `perfil = 'membro'`, `intencao = 'contribuinte'`
- Após cadastro → redireciona para Home `/`

### /entrar/lider
- Formulário: nome, email, senha
- Cria usuário no Supabase Auth
- Cria perfil com: `perfil = 'membro'`, `intencao = 'lider'`
- Após cadastro → redireciona para `/painel/onboarding-igreja`

> A coluna `intencao` é apenas para redirecionamento do front-end.
> Não afeta permissões nem RLS.

---

## 9. ARQUITETURA DE ROTAS

```
/                              → Home pública
/igrejas                       → Catálogo com busca e filtros
/igrejas/[slug]                → Página pública da igreja (só se aprovada)
/igrejas/[slug]/contribuir     → Formulário + tela de sucesso com QR Code PIX
/entrar                        → Tela de escolha: 2 cards visuais
/entrar/contribuinte           → Cadastro/login do contribuinte
/entrar/lider                  → Cadastro/login do líder
/minhas-contribuicoes          → Histórico pessoal (protegida)
/painel                        → Dashboard do líder (protegida)
/painel/onboarding-igreja      → Wizard 3 passos — primeiro login do líder
/painel/campanhas              → CRUD de campanhas (protegida)
/painel/minha-igreja           → Dados da igreja (protegida)
/painel/contribuicoes          → Histórico financeiro (protegida)
/painel/configuracoes          → Dados da conta (protegida)
/admin                         → Área admin oculta — sem link público
```

---

## 10. SCHEMA DO BANCO (JÁ CRIADO — NÃO RECRIAR)

```sql
-- ENUMS
perfil_usuario:    admin | lider | membro
status_igreja:     pendente | aprovada | reprovada | suspensa
status_campanha:   ativa | encerrada | pausada
tipo_contribuicao: dizimo | oferta | campanha
status_transacao:  confirmada | pendente | cancelada

-- perfis (ligada ao auth.users)
id uuid PK | nome varchar | email varchar
perfil perfil_usuario DEFAULT 'membro'
intencao varchar DEFAULT 'contribuinte'   -- 'contribuinte' | 'lider'
telefone varchar | foto_url text
criado_em timestamptz | atualizado_em timestamptz

-- igrejas
id uuid PK | nome varchar | slug varchar UNIQUE
descricao text | cnpj varchar
endereco text | cidade varchar | estado char | cep varchar | bairro text
telefone varchar | email_contato varchar
site_url text | foto_url text | logo_url text | banner_url text
chave_pix varchar
status status_igreja DEFAULT 'pendente'
lider_id uuid → perfis(id)
instagram text | facebook text
missao text | visao text | horarios_culto text
criado_em timestamptz | atualizado_em timestamptz

-- campanhas
id uuid PK | igreja_id uuid → igrejas(id)
titulo varchar | descricao text
meta_valor numeric   -- NULLABLE: se NULL, sem barra de progresso
data_inicio date | data_fim date
status status_campanha DEFAULT 'ativa'
foto_url text | visivel_publico boolean DEFAULT true
criado_em timestamptz | atualizado_em timestamptz

-- transacoes
id uuid PK
igreja_id uuid → igrejas(id)
campanha_id uuid → campanhas(id)       -- NULLABLE
contribuinte_id uuid → perfis(id)      -- NULLABLE = contribuição anônima
tipo tipo_contribuicao DEFAULT 'dizimo'
valor numeric CHECK (valor > 0)
status status_transacao DEFAULT 'confirmada'
observacao text | mensagem text
data_transacao date DEFAULT CURRENT_DATE
criado_em timestamptz

-- membros_igrejas
id uuid PK | usuario_id uuid → perfis(id)
igreja_id uuid → igrejas(id)
ativo boolean DEFAULT true | criado_em timestamptz

-- aprovacoes_igreja
id uuid PK | igreja_id uuid → igrejas(id)
admin_id uuid → perfis(id)
status status_igreja | observacao text
criado_em timestamptz
```

### Funções e recursos já existentes no banco
- Trigger: promoção automática membro → lider ao aprovar igreja
- Trigger: set_updated_at em todas as tabelas
- Função: `handle_new_user` — salva perfil + intencao ao criar usuário
- Função: `buscar_igrejas(termo)` — busca em nome, bairro e endereço
- View: `view_impacto_hub` — contadores públicos (security_invoker = true)
- Buckets Storage: `logos` e `banners` com RLS ativo

---

## 11. REGRAS DE NEGÓCIO (NÃO PODEM MUDAR)

1. Hub da Fé **não processa dinheiro** — apenas exibe QR Code e registra intenção
2. Chave PIX aparece **SOMENTE na tela de sucesso** — nunca na página pública
3. Contribuição anônima: `contribuinte_id = NULL`, exibe "Anônimo"
4. Barra de progresso só aparece se `meta_valor` for não-nulo
5. Slug gerado automaticamente — nunca editável pelo líder
6. Líder começa como `membro`, vira `lider` via trigger ao ter igreja aprovada
7. Igreja com `status ≠ aprovada` em URL pública → 404 amigável
8. Toda contribuição é registrada no banco, anônima ou não
9. Status padrão de transação: `confirmada` (sem validação real no MVP)
10. "Campanha Específica" só aparece no formulário se houver campanha ativa e visível

---

## 12. DECISÕES FECHADAS (não reabrir)

| # | Decisão |
|---|---|
| 1 | Repositório: `hub-da-fe-web` |
| 2 | Editor: Antigravid (VS Code com IA) |
| 3 | Back-end: 100% Supabase já configurado — não recriar |
| 4 | Cor primária: roxo `#7C3AED` — sem verde como primária |
| 5 | Light mode obrigatório |
| 6 | Auth: email + senha via Supabase Auth |
| 7 | QR Code: `react-qrcode-pix` |
| 8 | Cadastro: /entrar com 2 cards → rotas separadas |
| 9 | Wizard: salva progresso, retoma onde parou |
| 10 | Ordenação padrão do catálogo: Mais recentes |
| 11 | Exportar contribuições: fora do MVP |
| 12 | Foto de perfil: avatar com iniciais no MVP |
| 13 | Email de login: somente leitura no MVP |
| 14 | Notificações: banner no painel (sem email no MVP) |
| 15 | Limite de campanhas ativas: ilimitado no MVP |
| 16 | Logo no wizard: opcional, máx 2MB, PNG/JPEG |
| 17 | Tela de sucesso: `window.print()`, sem email |
| 18 | meta_valor: opcional; sem meta = sem barra de progresso |
| 19 | suspensa ≠ reprovada: reprovada = nunca aprovada; suspensa = foi aprovada e tirada do ar |

---

## 13. REGRAS PARA A IA QUE LER ESTE DOCUMENTO

1. Não recriar o banco — ele já existe no Supabase
2. Usar sempre `lib/supabase/client.ts` para chamadas ao banco
3. Nunca criar campos que não existem no schema da seção 10
4. Comentários no código sempre em português
5. Light mode obrigatório — nenhuma tela pode ser escura
6. Nunca expor a chave PIX na página pública da igreja
7. Nunca reabrir decisões da seção 12

---

*Contexto gerado em 30/04/2026 — Hub da Fé v8 | Uso com Antigravid, Claude ou qualquer IA*
