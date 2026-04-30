// Proxy de sessão — atualiza cookies de autenticação do Supabase em cada request
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // Atualiza sessão do usuário em cada request
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims

  // Rotas protegidas — redireciona para /entrar se não estiver logado
  const rotasProtegidas = ['/painel', '/minhas-contribuicoes']
  const estaEmRotaProtegida = rotasProtegidas.some((rota) =>
    request.nextUrl.pathname.startsWith(rota)
  )

  if (estaEmRotaProtegida && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/entrar'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
