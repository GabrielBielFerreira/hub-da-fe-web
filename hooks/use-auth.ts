'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

type Perfil = 'contribuinte' | 'lider' | null

interface UseAuthReturn {
  user: User | null
  perfil: Perfil
  nome: string
  loading: boolean
  signOut: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [perfil, setPerfil] = useState<Perfil>(null)
  const [nome, setNome] = useState<string>('')
  const [loading, setLoading] = useState(true)

  const fetchPerfil = useCallback(async (userId: string) => {
    const supabase = createClient()
    const { data } = await supabase
      .from('perfis')
      .select('perfil, nome')
      .eq('id', userId)
      .single()

    if (data) {
      setPerfil(data.perfil as Perfil)
      setNome(data.nome ?? '')
    }
  }, [])

  useEffect(() => {
    const supabase = createClient()

    // Carrega sessão inicial
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchPerfil(session.user.id)
      }
      setLoading(false)
    })

    // Escuta mudanças de auth (login / logout / refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchPerfil(session.user.id)
        } else {
          setPerfil(null)
          setNome('')
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [fetchPerfil])

  const signOut = useCallback(async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    setPerfil(null)
    setNome('')
    router.push('/')
  }, [router])

  return { user, perfil, nome, loading, signOut }
}
