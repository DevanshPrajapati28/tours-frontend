import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type AuthState = { token: string; username: string } | null

interface AuthCtx {
  auth: AuthState
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const Ctx = createContext<AuthCtx>(null!)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    try { return JSON.parse(localStorage.getItem('bmdt_admin') ?? 'null') }
    catch { return null }
  })

  const login = async (username: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (!res.ok) throw new Error('Invalid credentials')
    const data = await res.json()
    const state = { token: data.token, username: data.username }
    setAuth(state)
    localStorage.setItem('bmdt_admin', JSON.stringify(state))
  }

  const logout = () => {
    setAuth(null)
    localStorage.removeItem('bmdt_admin')
  }

  return <Ctx.Provider value={{ auth, login, logout }}>{children}</Ctx.Provider>
}

export const useAuth = () => useContext(Ctx)

/** Authenticated fetch helper */
export function useApi() {
  const { auth } = useAuth()
  return (url: string, options: RequestInit = {}) =>
    fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth?.token ?? ''}`,
        ...(options.headers ?? {}),
      },
    })
}
