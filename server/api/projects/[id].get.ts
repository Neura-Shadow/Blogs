import { getMockProject, isUuid } from '~/server/utils/cmsData'
import { formatSupabaseError, getSupabaseClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const idOrSlug = getRouterParam(event, 'id') || ''
  const client = getSupabaseClient()

  if (!client) {
    const project = getMockProject(idOrSlug)
    if (!project) {
      throw createError({ statusCode: 404, statusMessage: `Project not found: ${idOrSlug}` })
    }
    return project
  }

  const field = isUuid(idOrSlug) ? 'id' : 'slug'
  const { data, error } = await client
    .from('projects')
    .select('*')
    .eq(field, idOrSlug)
    .single()

  if (error) {
    throw createError({
      statusCode: error.code === 'PGRST116' ? 404 : 503,
      statusMessage: error.code === 'PGRST116'
        ? `Project not found: ${idOrSlug}`
        : `Database Error: ${formatSupabaseError(error)}`
    })
  }

  return data
})
