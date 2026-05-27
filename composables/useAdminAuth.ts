import { computed, onMounted, ref } from 'vue'

export interface AdminSession {
  email: string
  role: string
  token: string
  mode: 'mock' | 'production'
  expiresAt?: number
}

export const useAdminAuth = () => {
  const sessionKey = 'admin_auth_session'
  const tokenCookie = useCookie<string | null>('admin_access_token', {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7
  })
  const session = useState<AdminSession | null>('admin-auth-session', () => null)
  const isInitialized = useState('admin-auth-initialized', () => false)
  const isRefreshing = ref(false)

  const config = useRuntimeConfig()
  const cmsHealth = useState<any>('cms-health', () => null)
  const hasPublicSupabaseConfig = computed(() => {
    return !!(config.public.supabaseUrl && config.public.supabasePublishableKey)
  })

  // Initialize session on the client side
  const initSession = () => {
    if (process.client && !isInitialized.value) {
      const stored = localStorage.getItem(sessionKey)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (!parsed.expiresAt || parsed.expiresAt > Date.now()) {
            session.value = parsed
          } else {
            localStorage.removeItem(sessionKey)
          }
        } catch (e) {
          localStorage.removeItem(sessionKey)
        }
      }
      isInitialized.value = true
    }
  }

  const isAuthenticated = computed(() => {
    initSession()
    return !!session.value
  })

  const isProductionAuthMode = computed(() => {
    return hasPublicSupabaseConfig.value && cmsHealth.value?.mode !== 'mock'
  })

  const persistSession = (nextSession: AdminSession) => {
    session.value = nextSession
    tokenCookie.value = nextSession.token
    if (process.client) {
      localStorage.setItem(sessionKey, JSON.stringify(nextSession))
    }
  }

  const clearSession = () => {
    session.value = null
    tokenCookie.value = null
    if (process.client) {
      localStorage.removeItem(sessionKey)
    }
  }

  // Mock Credentials
  const MOCK_EMAIL = 'admin@local.dev'
  const MOCK_PASSWORD = 'local-admin-demo'

  const refreshSession = async () => {
    initSession()

    if (!process.client || !isProductionAuthMode.value) {
      return session.value
    }

    const supabase = useSupabaseBrowserClient()
    if (!supabase || isRefreshing.value) {
      return session.value
    }

    isRefreshing.value = true
    try {
      const { data, error } = await supabase.auth.getSession()
      const activeSession = data.session

      if (error || !activeSession?.access_token || !activeSession.user?.email) {
        if (session.value?.mode === 'production') {
          clearSession()
        }
        return session.value
      }

      const expiresAt = activeSession.expires_at
        ? activeSession.expires_at * 1000
        : Date.now() + 60 * 60 * 1000

      const nextSession: AdminSession = {
        email: activeSession.user.email,
        role: 'admin',
        token: activeSession.access_token,
        mode: 'production',
        expiresAt
      }
      persistSession(nextSession)
      return nextSession
    } finally {
      isRefreshing.value = false
    }
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    initSession()

    if (isProductionAuthMode.value) {
      const supabase = useSupabaseBrowserClient()
      if (!supabase) {
        return { success: false, error: 'Supabase public configuration is missing.' }
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error || !data.session?.access_token || !data.user?.email) {
        return { success: false, error: error?.message || 'Supabase Auth login failed.' }
      }

      persistSession({
        email: data.user.email,
        role: 'admin',
        token: data.session.access_token,
        mode: 'production',
        expiresAt: data.session.expires_at ? data.session.expires_at * 1000 : Date.now() + 60 * 60 * 1000
      })

      return { success: true }
    }

    // Check if the credentials match mock credentials
    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      const mockSession: AdminSession = {
        email: MOCK_EMAIL,
        role: 'mock-admin',
        token: 'mock-jwt-token-local-dev',
        mode: 'mock'
      }
      persistSession(mockSession)
      return { success: true }
    }

    return { success: false, error: 'Invalid credentials. For local development, use: admin@local.dev / local-admin-demo' }
  }

  const logout = async () => {
    if (process.client && isProductionAuthMode.value) {
      const supabase = useSupabaseBrowserClient()
      await supabase?.auth.signOut()
    }
    clearSession()
    navigateTo('/admin/login')
  }

  const getAuthHeaders = () => {
    initSession()
    const token = session.value?.token
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  // Hook to fetch session state
  onMounted(() => {
    initSession()
    refreshSession()
  })

  return {
    session,
    isAuthenticated,
    isProductionAuthMode,
    refreshSession,
    getAuthHeaders,
    login,
    logout,
    MOCK_EMAIL
  }
}
