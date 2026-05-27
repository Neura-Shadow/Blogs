import { checkAdminAuth } from '~/server/utils/auth'
import { normalizePostPayload } from '~/server/utils/cmsData'
import { formatSupabaseError, getSupabaseClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  await checkAdminAuth(event)
  const body = await readBody(event)
  const client = getSupabaseClient()

  if (!client) {
    return {
      success: true,
      warning: 'Mock Mode: Supabase connection is offline. Changes are not persisted.',
      data: {
        id: `mock-uuid-${Date.now()}`,
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }
  }

  const { data, error } = await client
    .from('posts')
    .insert([normalizePostPayload(body)])
    .select()
    .single()

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: `Database Error: ${formatSupabaseError(error)}`
    })
  }

  return { success: true, data }
})
