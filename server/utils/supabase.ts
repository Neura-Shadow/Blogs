import { createClient } from '@supabase/supabase-js'

let supabaseClient: any = null

export const getSupabaseRuntimeState = () => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl
  const supabasePublishableKey = config.public.supabasePublishableKey
  const supabaseSecretKey = config.supabaseSecretKey

  const hasPublicConfig = !!(supabaseUrl && supabasePublishableKey)
  const hasServerConfig = !!(supabaseUrl && supabaseSecretKey)
  const isProductionMode = hasPublicConfig && hasServerConfig

  return {
    supabaseUrl,
    supabasePublishableKey,
    supabaseSecretKey,
    hasPublicConfig,
    hasServerConfig,
    isProductionMode,
    mode: isProductionMode ? 'production' : 'mock'
  }
}

/**
 * Initializes and returns a server-side Supabase client.
 * Uses the private SUPABASE_SECRET_KEY, which is only available on the server.
 */
export const getSupabaseClient = () => {
  if (supabaseClient) return supabaseClient

  const { supabaseUrl, supabaseSecretKey, hasServerConfig } = getSupabaseRuntimeState()

  if (!hasServerConfig) {
    console.warn(
      '[Supabase Server SDK Warning]: Missing NUXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in server environment. CMS routes will fall back to Mock Mode.'
    )
    return null
  }

  try {
    supabaseClient = createClient(supabaseUrl, supabaseSecretKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
    return supabaseClient
  } catch (error) {
    console.error('[Supabase Server SDK Init Error]:', error)
    return null
  }
}

export const getSupabasePublicConfig = () => {
  const { supabaseUrl, supabasePublishableKey, hasPublicConfig } = getSupabaseRuntimeState()
  return {
    supabaseUrl,
    supabasePublishableKey,
    hasPublicConfig
  }
}

export const formatSupabaseError = (error: any) => {
  if (!error) return 'Unknown Supabase error'
  const parts = [
    error.message,
    error.code ? `code: ${error.code}` : '',
    error.details ? `details: ${error.details}` : '',
    error.hint ? `hint: ${error.hint}` : ''
  ].filter(Boolean)

  return parts.length > 0
    ? parts.join(' | ')
    : 'Supabase returned an empty error response. Verify SUPABASE_SECRET_KEY, table grants, and RLS policies.'
}
