import { H3Event } from 'h3'
import { getSupabaseClient, getSupabaseRuntimeState } from './supabase'

export interface CheckedAdmin {
  email: string
  role: 'mock-admin' | 'admin'
  mode: 'mock' | 'production'
}

const getAdminEmailAllowlist = () => {
  const config = useRuntimeConfig()
  return String(config.adminEmails || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

/**
 * Validates request authorization header.
 * Throws 401 if missing/invalid, returns user session information on success.
 */
export const checkAdminAuth = async (event: H3Event): Promise<CheckedAdmin> => {
  const authHeader = getRequestHeader(event, 'authorization')

  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Missing Authorization Header'
    })
  }

  const token = authHeader.replace(/^Bearer\s+/, '')
  const runtime = getSupabaseRuntimeState()

  // Mock token validation is allowed only when Supabase is not fully configured.
  if (!runtime.isProductionMode && token === 'mock-jwt-token-local-dev') {
    return {
      email: 'admin@local.dev',
      role: 'mock-admin',
      mode: 'mock'
    }
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Invalid credentials or backend connection offline'
    })
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user || !user.email) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: Invalid Supabase Session Token'
      })
    }

    const allowlist = getAdminEmailAllowlist()
    const email = user.email.toLowerCase()

    if (allowlist.length === 0 || !allowlist.includes(email)) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden: Supabase user is not in NUXT_ADMIN_EMAILS allowlist'
      })
    }

    return {
      email: user.email,
      role: 'admin',
      mode: 'production'
    }
  } catch (e: any) {
    if (e?.statusCode) throw e
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Session Verification Exception'
    })
  }
}

export const getOptionalAdmin = async (event: H3Event) => {
  try {
    return await checkAdminAuth(event)
  } catch {
    return null
  }
}
