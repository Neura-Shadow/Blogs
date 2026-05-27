import { getMockProjects } from '~/server/utils/cmsData'
import { formatSupabaseError, getSupabaseClient } from '~/server/utils/supabase'

export default defineEventHandler(async () => {
  const client = getSupabaseClient()

  if (!client) {
    return getMockProjects()
  }

  const { data, error } = await client
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    throw createError({
      statusCode: 503,
      statusMessage: `Database Error: ${formatSupabaseError(error)}`
    })
  }

  return data || []
})
