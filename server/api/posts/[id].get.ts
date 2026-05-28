import { checkAdminAuth } from '~/server/utils/auth'
import { getMockPost, isUuid } from '~/server/utils/cmsData'
import { formatSupabaseError, getSupabaseClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const idOrSlug = getRouterParam(event, 'id') || ''
  const query = getQuery(event)
  const admin = query.admin === '1' ? await checkAdminAuth(event) : null
  const client = getSupabaseClient()

  if (!client) {
    const post = getMockPost(idOrSlug)
    if (!post) {
      throw createError({ statusCode: 404, statusMessage: `Post not found: ${idOrSlug}` })
    }
    return post
  }

  const field = isUuid(idOrSlug) ? 'id' : 'slug'
  let request = client
    .from('posts')
    .select('*')
    .eq(field, idOrSlug)

  if (!admin) {
    request = request.eq('status', 'published')
  }

  const { data, error } = await request.single()

  if (error) {
    const fallbackPost = error.code === 'PGRST116' ? getMockPost(idOrSlug) : null
    if (fallbackPost) return fallbackPost

    throw createError({
      statusCode: error.code === 'PGRST116' ? 404 : 503,
      statusMessage: error.code === 'PGRST116'
        ? `Post not found: ${idOrSlug}`
        : `Database Error: ${formatSupabaseError(error)}`
    })
  }

  return data
})
