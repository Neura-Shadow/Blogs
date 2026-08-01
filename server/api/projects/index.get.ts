import { checkAdminAuth } from '~/server/utils/auth'
import { getMockProjects, mergePublicProjectRows } from '~/server/utils/cmsData'
import { formatSupabaseError, getSupabaseClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const client = getSupabaseClient()
  const admin = getQuery(event).admin === '1' ? await checkAdminAuth(event) : null

  if (!client) {
    return getMockProjects()
  }

  const { data, error } = await client
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    if (!admin) return getMockProjects()
    throw createError({
      statusCode: 503,
      statusMessage: `Database Error: ${formatSupabaseError(error)}`
    })
  }

  if (admin) return data || []
  return mergePublicProjectRows(data || [])
})
