import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let browserSupabaseClient: SupabaseClient | null = null

export const useSupabaseBrowserClient = () => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl
  const supabasePublishableKey = config.public.supabasePublishableKey

  if (!supabaseUrl || !supabasePublishableKey) {
    return null
  }

  if (!browserSupabaseClient) {
    browserSupabaseClient = createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  }

  return browserSupabaseClient
}
