```
Você vai configurar o projeto Hub da Fé do zero no Next.js 14 com App Router.
Este é um setup inicial — não crie nenhuma tela ainda.
Apenas configure a base do projeto com a estrutura, conexão com Supabase e componentes base.

---

## VARIÁVEIS DE AMBIENTE

Crie o arquivo `.env.local` na raiz do projeto com:

```env
NEXT_PUBLIC_SUPABASE_URL=https://yyrkgdrnwjelypworrqu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5cmtnZHJud2plbHlwd29ycnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMzUxNzAsImV4cCI6MjA5MjcxMTE3MH0.WQbIKARpBKhiOiLc4tSmebFyCOYCIRerqmTqzPybV9E
```

---

## ESTRUTURA DE PASTAS

Crie exatamente esta estrutura dentro de `src/`:

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx                              (deixar vazio por hora)
│   ├── igrejas/
│   │   ├── page.tsx                          (vazio)
│   │   └── [slug]/
│   │       ├── page.tsx                      (vazio)
│   │       └── contribuir/
│   │           └── page.tsx                  (vazio)
│   ├── entrar/
│   │   ├── page.tsx                          (vazio)
│   │   ├── contribuinte/
│   │   │   └── page.tsx                      (vazio)
│   │   └── lider/
│   │       └── page.tsx                      (vazio)
│   ├── minhas-contribuicoes/
│   │   └── page.tsx                          (vazio)
│   ├── painel/
│   │   ├── layout.tsx                        (vazio)
│   │   ├── page.tsx                          (vazio)
│   │   ├── onboarding-igreja/
│   │   │   └── page.tsx                      (vazio)
│   │   ├── campanhas/
│   │   │   └── page.tsx                      (vazio)
│   │   ├── minha-igreja/
│   │   │   └── page.tsx                      (vazio)
│   │   ├── contribuicoes/
│   │   │   └── page.tsx                      (vazio)
│   │   └── configuracoes/
│   │       └── page.tsx                      (vazio)
│   └── admin/
│       └── page.tsx                          (vazio)
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── Avatar.tsx
│   └── layout/
│       ├── Header.tsx
│       └── Footer.tsx
└── lib/
    ├── utils.ts
    └── supabase/
        ├── client.ts
        └── server.ts
```

---

## ARQUIVOS A CRIAR

### `src/lib/supabase/client.ts`
```typescript
// Cliente Supabase para uso no lado do cliente (browser)
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### `src/lib/supabase/server.ts`
```typescript
// Cliente Supabase para uso no lado do servidor (Server Components e Actions)
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignorado em Server Components — sem acesso a set
          }
        },
      },
    }
  )
}
```

### `src/lib/utils.ts`
```typescript
// Utilitário para mesclar classes Tailwind sem conflito
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Tokens de cor do Hub da Fé */
:root {
  --bg-base: #0A0B14;
  --bg-card: #12141F;
  --bg-elevated: #1C1F33;
  --bg-sidebar: #080910;
  --primary: #7C3AED;
  --primary-hover: #6D28D9;
  --primary-light: #A78BFA;
  --primary-subtle: rgba(124, 58, 237, 0.12);
  --accent: #4F46E5;
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --text-disabled: #64748B;
  --success: #22C55E;
  --warning: #F59E0B;
  --danger: #EF4444;
  --border: #1C1F33;
  --border-highlight: #2D2F4A;
}

/* Scrollbar customizada */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg-base); }
::-webkit-scrollbar-thumb { background: var(--bg-elevated); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--primary); }

/* Seleção de texto */
::selection {
  background: rgba(124, 58, 237, 0.3);
  color: #F8FAFC;
}

/* Transições globais suaves */
* { transition-property: color, background-color, border-color, opacity;
    transition-duration: 150ms; transition-timing-function: ease; }
```

### `src/app/layout.tsx`
```typescript
// Layout raiz — aplica fonte Inter e dark mode global
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hub da Fé',
  description: 'Plataforma de igrejas, campanhas e contribuições digitais',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} antialiased`}
        style={{ backgroundColor: '#0A0B14', color: '#F8FAFC' }}
      >
        {children}
      </body>
    </html>
  )
}
```

### `src/components/ui/Button.tsx`
```typescript
// Botão reutilizável com variantes e estado de loading
import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-[10px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#0A0B14]'

  const variants = {
    primary: 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-lg shadow-purple-900/30',
    secondary: 'bg-[#12141F] hover:bg-[#1C1F33] text-[#F8FAFC] border border-[#2D2F4A]',
    ghost: 'bg-transparent hover:bg-[#12141F] text-[#94A3B8] hover:text-[#F8FAFC]',
    danger: 'bg-[#EF4444] hover:bg-red-600 text-white',
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-6 py-3',
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Carregando...
        </span>
      ) : children}
    </button>
  )
}
```

### `src/components/ui/Input.tsx`
```typescript
// Input com label acima e suporte a erro e dica
import { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          'w-full bg-[#12141F] border border-[#1C1F33] rounded-[10px] px-4 py-2.5',
          'text-sm text-[#F8FAFC] placeholder-[#64748B]',
          'focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]',
          'transition-colors duration-150',
          error && 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]',
          className
        )}
        {...props}
      />
      {hint && !error && <p className="text-xs text-[#64748B]">{hint}</p>}
      {error && <p className="text-xs text-[#EF4444]">{error}</p>}
    </div>
  )
}
```

### `src/components/ui/Card.tsx`
```typescript
// Card base reutilizável com variante elevada
import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean
  hover?: boolean
}

export function Card({ elevated = false, hover = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-6',
        elevated
          ? 'bg-[#1C1F33] border-[#2D2F4A]'
          : 'bg-[#12141F] border-[#1C1F33]',
        hover && 'hover:border-[#7C3AED]/40 hover:shadow-lg hover:shadow-purple-900/20 hover:scale-[1.01] transition-all duration-200 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

### `src/components/ui/Badge.tsx`
```typescript
// Badge de status colorido
import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'primary' | 'neutral'
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  const variants = {
    success: 'bg-green-900/30 text-green-400 border border-green-800/50',
    warning: 'bg-yellow-900/30 text-yellow-400 border border-yellow-800/50',
    danger: 'bg-red-900/30 text-red-400 border border-red-800/50',
    primary: 'bg-purple-900/30 text-purple-300 border border-purple-700/50',
    neutral: 'bg-[#1C1F33] text-[#94A3B8] border border-[#2D2F4A]',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
```

### `src/components/ui/Avatar.tsx`
```typescript
// Avatar com iniciais do nome — sem foto no MVP
interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({ name, size = 'md' }: AvatarProps) {
  // Pega iniciais: primeiro e último nome
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')

  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
  }

  return (
    <div
      className={`${sizes[size]} rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center font-semibold text-[#A78BFA] flex-shrink-0`}
    >
      {initials}
    </div>
  )
}
```

### `src/components/layout/Header.tsx`
```typescript
// Header público — muda conforme estado de autenticação
'use client'

import Link from 'next/link'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'

interface HeaderProps {
  user?: { name: string } | null
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#1C1F33] bg-[#0A0B14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#7C3AED] flex items-center justify-center">
              <span className="text-white font-bold text-sm">HF</span>
            </div>
            <span className="font-bold text-[#F8FAFC] text-lg hidden sm:block">Hub da Fé</span>
          </Link>

          {/* Nav central */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/igrejas" className="text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              Explorar Igrejas
            </Link>
          </nav>

          {/* Ações */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/painel">
                  <Button variant="secondary" size="sm">Meu Painel</Button>
                </Link>
                <Avatar name={user.name} size="sm" />
              </div>
            ) : (
              <Link href="/entrar">
                <Button size="sm">Entrar</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
```

### `src/components/layout/Footer.tsx`
```typescript
// Rodapé institucional
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[#1C1F33] bg-[#080910] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center">
              <span className="text-white font-bold text-xs">HF</span>
            </div>
            <span className="font-bold text-[#F8FAFC]">Hub da Fé</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-[#64748B]">
            <Link href="/igrejas" className="hover:text-[#94A3B8] transition-colors">Igrejas</Link>
            <Link href="/entrar" className="hover:text-[#94A3B8] transition-colors">Entrar</Link>
          </nav>

          {/* Crédito */}
          <p className="text-xs text-[#64748B]">
            © {new Date().getFullYear()} Hub da Fé. Plataforma independente.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

---

## DEPENDÊNCIAS A INSTALAR

Execute no terminal:

```bash
npm install @supabase/ssr @supabase/supabase-js clsx tailwind-merge react-qrcode-pix lucide-react
```

---

## REGRAS FIXAS DO PROJETO (nunca mudar)

1. Dark mode obrigatório — fundo sempre `#0A0B14`, nunca tela clara
2. Cor primária: roxo `#7C3AED` — não usar verde como primária
3. Comentários no código sempre em português
4. Nunca criar campos que não existem no banco Supabase
5. Usar sempre `src/lib/supabase/client.ts` para chamadas ao banco
6. Nunca expor a chave PIX na página pública da igreja
7. Mobile-first: funcionar em 375px

---

Após criar tudo, confirme que:
- A estrutura de pastas foi criada corretamente
- As dependências foram instaladas sem erro
- Os componentes base estão nos lugares certos

Não crie nenhuma tela ainda. Aguarde o próximo prompt.
```
