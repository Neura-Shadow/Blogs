import { checkAdminAuth } from '~/server/utils/auth'
import { isUuid } from '~/server/utils/cmsData'
import { formatSupabaseError, getSupabaseClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  await checkAdminAuth(event)
  const id = getRouterParam(event, 'id') || ''
  const client = getSupabaseClient()

  if (!client) {
    return {
      success: true,
      warning: 'Mock Mode: Supabase connection is offline. Changes are not persisted.',
      message: `Project ${id} deleted from local session cache.`
    }
  }

  const field = isUuid(id) ? 'id' : 'slug'
  const { error } = await client
    .from('projects')
    .delete()
    .eq(field, id)

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: `Database Delete Error: ${formatSupabaseError(error)}`
    })
  }

  return { success: true, message: `Project ${id} deleted successfully.` }
})
