import { checkAdminAuth } from '~/server/utils/auth'
import { getMockProject, isUuid, mergePublicProjectRow } from '~/server/utils/cmsData'
import { formatSupabaseError, getSupabaseClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const idOrSlug = getRouterParam(event, 'id') || ''
  const client = getSupabaseClient()
  const admin = getQuery(event).admin === '1' ? await checkAdminAuth(event) : null
  const localProject = getMockProject(idOrSlug)

  if (!client) {
    if (!localProject) {
      throw createError({ statusCode: 404, statusMessage: `Project not found: ${idOrSlug}` })
    }
    return localProject
  }

  const field = isUuid(idOrSlug) ? 'id' : 'slug'
  const { data, error } = await client
    .from('projects')
    .select('*')
    .eq(field, idOrSlug)
    .maybeSingle()

  if (error) {
    if (!admin && localProject) return localProject
    throw createError({
      statusCode: 503,
      statusMessage: `Database Error: ${formatSupabaseError(error)}`
    })
  }

  if (admin) {
    if (!data) throw createError({ statusCode: 404, statusMessage: `Project not found: ${idOrSlug}` })
    return data
  }
  if (localProject) return mergePublicProjectRow(localProject, data)
  throw createError({ statusCode: 404, statusMessage: `Project not found: ${idOrSlug}` })
})
