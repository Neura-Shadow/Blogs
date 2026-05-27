import { formatSupabaseError, getSupabaseClient, getSupabaseRuntimeState } from '~/server/utils/supabase'

export default defineEventHandler(async () => {
  const runtime = getSupabaseRuntimeState()
  const adminEmails = String(useRuntimeConfig().adminEmails || '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)

  if (!runtime.isProductionMode) {
    return {
      mode: 'mock',
      env: {
        publicConfigured: runtime.hasPublicConfig,
        serverConfigured: runtime.hasServerConfig
      },
      auth: {
        adminAllowlistConfigured: adminEmails.length > 0
      },
      database: {
        connected: false,
        error: 'Supabase public URL, publishable key, or server secret key is missing.'
      }
    }
  }

  const client = getSupabaseClient()
  if (!client) {
    return {
      mode: 'mock',
      env: {
        publicConfigured: runtime.hasPublicConfig,
        serverConfigured: runtime.hasServerConfig
      },
      auth: {
        adminAllowlistConfigured: adminEmails.length > 0
      },
      database: {
        connected: false,
        error: 'Supabase server client could not be initialized.'
      }
    }
  }

  const checks: Record<string, { ok: boolean; error?: string }> = {}

  for (const table of ['posts', 'projects', 'media_assets']) {
    const { error } = await client
      .from(table)
      .select('id')
      .limit(1)

    checks[table] = error
      ? { ok: false, error: formatSupabaseError(error) }
      : { ok: true }
  }

  const connected = Object.values(checks).every((check) => check.ok)

  return {
    mode: connected && adminEmails.length > 0 ? 'production' : 'degraded',
    env: {
      publicConfigured: runtime.hasPublicConfig,
      serverConfigured: runtime.hasServerConfig
    },
    auth: {
      adminAllowlistConfigured: adminEmails.length > 0
    },
    database: {
      connected,
      checks
    }
  }
})
