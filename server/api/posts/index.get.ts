import { checkAdminAuth } from '~/server/utils/auth'
import { getMockPosts } from '~/server/utils/cmsData'
import { formatSupabaseError, getSupabaseClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const admin = query.admin === '1' ? await checkAdminAuth(event) : null
  const client = getSupabaseClient()

  if (!client) {
    const posts = getMockPosts()
    return posts
  }

  let request = client
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (!admin) {
    request = request.eq('status', 'published')
  }

  const { data, error } = await request

  if (error) {
    throw createError({
      statusCode: 503,
      statusMessage: `Database Error: ${formatSupabaseError(error)}`
    })
  }

  const posts = data || []

  if (posts.length === 0) {
    return getMockPosts()
  }

  return posts
})
