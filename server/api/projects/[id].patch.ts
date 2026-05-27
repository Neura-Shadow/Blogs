import { checkAdminAuth } from '~/server/utils/auth'
import { isUuid, normalizeProjectPayload } from '~/server/utils/cmsData'
import { formatSupabaseError, getSupabaseClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  await checkAdminAuth(event)
  const id = getRouterParam(event, 'id') || ''
  const body = await readBody(event)
  const client = getSupabaseClient()

  if (!client) {
    return {
      success: true,
      warning: 'Mock Mode: Supabase connection is offline. Changes are not persisted.',
      data: {
        id,
        ...body,
        updated_at: new Date().toISOString()
      }
    }
  }

  const field = isUuid(id) ? 'id' : 'slug'
  const { data, error } = await client
    .from('projects')
    .update({
      ...normalizeProjectPayload(body),
      updated_at: new Date().toISOString()
    })
    .eq(field, id)
    .select()
    .single()

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: `Database Update Error: ${formatSupabaseError(error)}`
    })
  }

  return { success: true, data }
})
